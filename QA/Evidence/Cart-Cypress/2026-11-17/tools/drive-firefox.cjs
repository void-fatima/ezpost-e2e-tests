// Select the focused cart spec in an already open, visible Cypress Firefox runner.
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { RDP } = require('./firefox-rdp.cjs');
const { installObserver, currentState, collectResult } = require('./runner-observer.cjs');
const [requestedDir, suppliedPort = '6000', suppliedPid] = process.argv.slice(2);
if (!requestedDir || !/^\d+$/.test(suppliedPort) || !/^\d+$/.test(suppliedPid || '')) {
  throw new Error('Usage: node tools/drive-firefox.cjs <run-directory> <Firefox-RDP-port> <dedicated-Firefox-window-process-id>');
}
const dir = path.resolve(requestedDir), evidenceRoot = path.resolve(__dirname, '..');
const relative = path.relative(evidenceRoot, dir);
if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) throw new Error('Run directory must stay within this EZPost cart evidence root');
const launch = JSON.parse(fs.readFileSync(path.join(dir, 'launch.json'), 'utf8'));
if (launch.browser !== 'firefox' || !/^cypress\/e2e\/cart\/cart-(?:handoff|edit-remove)\.cy\.js$/.test(launch.spec)) throw new Error('Focused Firefox cart launch required');
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const call = (rdp, fn) => rdp.evaluate('JSON.stringify((' + fn.toString() + ')())').then(JSON.parse);
function screenshot(name) {
  const output = execFileSync('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File',
    path.join(__dirname, 'capture-runner.ps1'), '-OutputFile', path.join(dir, name), '-RunnerProcessId', suppliedPid],
    { windowsHide: true, encoding: 'utf8' });
  fs.writeFileSync(path.join(dir, name.replace(/\.png$/, '-window.json')), output);
}
(async () => {
  const rdp = new RDP(Number(suppliedPort));
  const connection = await rdp.init();
  screenshot('runner-before.png');
  fs.writeFileSync(path.join(dir, 'runner-connected.json'), JSON.stringify({
    at: new Date().toISOString(), connection, dedicatedWindowProcessId: Number(suppliedPid),
    state: 'dedicated Firefox runner connected and own window captured; spec execution still unverified'
  }, null, 2));
  await rdp.evaluate(`(()=>{if(location.hash!=='#/specs')document.querySelector('a[href="#/specs"]').click();return true})()`);
  const selector = 'a[href="#/specs/runner?file=' + launch.spec + '"]';
  await wait(async () => await rdp.evaluate('Boolean(document.querySelector(' + JSON.stringify(selector) + '))'));
  await rdp.evaluate('document.querySelector(' + JSON.stringify(selector) + ').click();true');
  await wait(async () => await rdp.evaluate('window.Cypress?.spec?.relative.replaceAll("\\\\", "/")===' + JSON.stringify(launch.spec)));
  console.log('VISIBLE FIREFOX SPEC LOADED ' + launch.spec);
  fs.writeFileSync(path.join(dir, 'spec-loaded.json'), JSON.stringify({ at: new Date().toISOString(), spec: launch.spec }, null, 2));
  await rdp.evaluate('(' + installObserver.toString() + ')()');
  let failureCount = 0;
  await wait(async () => {
    const state = await call(rdp, currentState);
    if (state.spec !== launch.spec) throw new Error('Runner changed to an unauthorized spec');
    if (state.failures.length > failureCount) {
      failureCount = state.failures.length;
      fs.writeFileSync(path.join(dir, 'diagnostics-' + process.pid + '.json'), JSON.stringify(state.failures, null, 2));
      screenshot('failure-' + process.pid + '-' + failureCount + '.png');
    }
    return state.done;
  }, 180000);
  const result = await call(rdp, collectResult);
  fs.writeFileSync(path.join(dir, 'visible-results-' + process.pid + '.json'), JSON.stringify(result, null, 2));
  const finalScreenshot = 'runner-final-' + process.pid + '.png';
  screenshot(finalScreenshot); result.screenshot = finalScreenshot;
  fs.writeFileSync(path.join(dir, 'visible-results-' + process.pid + '.json'), JSON.stringify(result, null, 2));
  console.log(JSON.stringify({ spec: result.spec, browser: result.browser, stats: result.stats,
    interactive: result.isInteractive, recordedTestEvidence: result.testEvidence.length,
    errors: result.tests.filter(test => test.state === 'failed').map(test => ({ title: test.title, error: test.error })) }));
  rdp.sock.end(); process.exit(0); // Leave Cypress and Firefox open.
  async function wait(condition, timeout = 30000) {
    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) { if (await condition()) return; await pause(250); }
    throw new Error('Visible Firefox Cypress completion condition timed out');
  }
})().catch(error => {
  fs.writeFileSync(path.join(dir, 'driver-error-' + Date.now() + '.txt'), error.stack);
  console.error(error); process.exit(1);
});
