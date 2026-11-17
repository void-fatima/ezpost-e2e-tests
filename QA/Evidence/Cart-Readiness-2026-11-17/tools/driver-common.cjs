// Diagnostics/own-window capture only. Never change AUT state or test outcomes.
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { verify } = require('./source-state.cjs');
const specs = ['cypress/e2e/cart/cart-handoff.cy.js', 'cypress/e2e/cart/cart-edit-remove.cy.js'];
function setup(requestedDir, browser, suppliedPid) {
  if (!requestedDir || !/^\d+$/.test(suppliedPid || '')) throw Error('Expected run directory and dedicated browser window PID');
  const dir = path.resolve(requestedDir), evidenceRoot = path.resolve(__dirname, '..');
  const relative = path.relative(evidenceRoot, dir);
  if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) throw Error('Run must stay inside this EZPost evidence root');
  const root = path.resolve(__dirname, '../../../..');
  const launch = JSON.parse(fs.readFileSync(path.join(dir, 'launch.json'), 'utf8'));
  const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'source-manifest.json'), 'utf8'));
  if (launch.browser !== browser || JSON.stringify(launch.specs) !== JSON.stringify(specs) || launch.sourceId !== manifest.sourceId) {
    throw Error('Exact two-spec cart regression launch required');
  }
  const checks = [], captureErrors = [];
  const attempt = path.join(dir, 'driver-' + process.pid + '-' + Date.now());
  fs.mkdirSync(attempt);
  function sourceCheck(stage) {
    const check = { stage, ...verify(root, manifest) };
    checks.push(check);
    write('source-checks.json', checks);
    return check;
  }
  function write(file, value) {
    fs.writeFileSync(path.join(attempt, file), JSON.stringify(value, null, 2));
  }
  function capture(name) {
    try {
      const output = execFileSync('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File',
        path.join(__dirname, 'capture-runner.ps1'), '-OutputFile', path.join(attempt, name),
        '-RunnerProcessId', suppliedPid], { windowsHide: true, encoding: 'utf8', timeout: 15000 });
      fs.writeFileSync(path.join(attempt, name.replace(/\.png$/, '-window.json')), output);
      return name;
    } catch (error) {
      captureErrors.push({ at: new Date().toISOString(), screenshot: name, error: error.message });
      write('capture-errors.json', captureErrors);
      console.error('Own-window capture failed; recorded Cypress outcomes are preserved: ' + error.message);
      return null;
    }
  }
  function result(spec, value) {
    const prefix = path.basename(spec, '.cy.js');
    const file = prefix + '-results.json';
    const result = { ...value, sourceId: manifest.sourceId, sourceCheck: sourceCheck('after ' + spec) };
    write(file, result); // Outcomes must survive an independent capture failure.
    result.screenshot = capture(prefix + '-final.png');
    result.captureErrors = captureErrors;
    write(file, result);
    return { spec, file, counts: result.counts, browser: result.browser, sourceId: manifest.sourceId };
  }
  sourceCheck('driver start');
  return { dir, attempt, launch, manifest, specs, checks, captureErrors, write, capture, sourceCheck, result };
}
module.exports = { setup };
