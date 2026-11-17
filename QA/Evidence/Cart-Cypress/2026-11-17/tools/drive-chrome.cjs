// Select the focused cart spec in an already open, visible Cypress Chrome runner.
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { chromium } = require('C:/Users/LOCAL_USER/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
const { installObserver, currentState, collectResult } = require('./runner-observer.cjs');
const [requestedDir, port, suppliedPid, suppliedMode] = process.argv.slice(2);
const collectStopped = suppliedMode === '--collect-stopped';
if (!requestedDir || !/^\d+$/.test(port || '') ||
    (suppliedPid && !/^\d+$/.test(suppliedPid)) ||
    (suppliedMode && !collectStopped)) {
  throw new Error('Usage: node tools/drive-chrome.cjs <run-directory> <Chrome-CDP-port> [dedicated-Chrome-window-PID] [--collect-stopped]');
}
const dir = path.resolve(requestedDir);
const evidenceRoot = path.resolve(__dirname, '..');
const relative = path.relative(evidenceRoot, dir);
if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) throw new Error('Run directory must stay within this EZPost cart evidence root');
const launch = JSON.parse(fs.readFileSync(path.join(dir, 'launch.json'), 'utf8'));
if (launch.browser !== 'chrome' || !/^cypress\/e2e\/cart\/cart-(?:handoff|edit-remove)\.cy\.js$/.test(launch.spec)) throw new Error('Focused Chrome cart launch required');
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const captureErrors = [];
async function screenshot(page, name) {
  // A capture failure is tooling evidence, never a reason to discard completed
  // Cypress results or alter an application/test failure. Exit nonzero at end.
  try {
    if (suppliedPid) {
      const output = execFileSync('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File',
        path.join(__dirname, 'capture-runner.ps1'), '-OutputFile', path.join(dir, name),
        '-RunnerProcessId', suppliedPid], { windowsHide: true, encoding: 'utf8', timeout: 15000 });
      fs.writeFileSync(path.join(dir, name.replace(/\.png$/, '-window.json')), output);
    } else {
      await page.screenshot({ path: path.join(dir, name), timeout: 10000 });
    }
    return name;
  } catch (error) {
    captureErrors.push({ at: new Date().toISOString(), attemptedScreenshot: name,
      dedicatedWindowProcessId: suppliedPid ? Number(suppliedPid) : undefined,
      error: error.message, stack: error.stack });
    fs.writeFileSync(path.join(dir, 'capture-errors-' + process.pid + '.json'), JSON.stringify(captureErrors, null, 2));
    console.error('Screenshot tooling failure; Cypress outcomes remain unchanged: ' + error.message);
    return null;
  }
}
(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:' + port);
  const page = browser.contexts().flatMap(context => context.pages()).find(candidate => candidate.url().includes('/__/#/specs'));
  if (!page) throw new Error('Actual Cypress-owned Chrome runner page not found');
  await page.bringToFront();
  const visible = await page.evaluate(() => document.visibilityState === 'visible');
  if (!visible) throw new Error('Cypress Chrome runner document is not visible');
  fs.writeFileSync(path.join(dir, collectStopped ? 'stopped-runner-connected-' + process.pid + '.json' : 'runner-connected.json'), JSON.stringify({
    at: new Date().toISOString(), browserConnected: true, documentVisible: visible,
    runnerUrl: page.url(), requestedSpec: launch.spec,
    state: collectStopped ? 'collect existing stopped runner only; no selection, reload or test execution requested' :
      'runner page connected and brought to front; spec execution still unverified'
  }, null, 2));
  if (collectStopped) {
    const state = await page.evaluate(currentState);
    if (state.spec !== launch.spec || !state.done) throw new Error('Capture-only mode requires the exact expected spec already stopped');
    console.log('COLLECTING EXISTING STOPPED CHROME RUNNER ' + launch.spec + '; no rerun');
  } else {
    await screenshot(page, 'runner-before.png');
    if (new URL(page.url()).hash !== '#/specs') await page.locator('a[href="#/specs"]').first().click();
    await page.locator('a[href="#/specs/runner?file=' + launch.spec + '"]').click();
    await page.waitForFunction(spec => window.Cypress?.spec?.relative.replaceAll('\\', '/') === spec, launch.spec);
    console.log('VISIBLE CHROME SPEC LOADED ' + launch.spec);
    fs.writeFileSync(path.join(dir, 'spec-loaded.json'), JSON.stringify({ at: new Date().toISOString(), spec: launch.spec, runnerUrl: page.url() }, null, 2));
    await page.evaluate(installObserver);
    let failureCount = 0;
    const deadline = Date.now() + 180000;
    while (true) {
      const state = await page.evaluate(currentState);
      if (state.spec !== launch.spec) throw new Error('Runner changed to an unauthorized spec');
      if (state.failures.length > failureCount) {
        failureCount = state.failures.length;
        fs.writeFileSync(path.join(dir, 'diagnostics-' + process.pid + '.json'), JSON.stringify(state.failures, null, 2));
        // Save a complete current result before attempting capture. Even an OS
        // capture failure cannot lose the failing assertion or per-test records.
        const partialResult = await page.evaluate(collectResult);
        fs.writeFileSync(path.join(dir, 'in-progress-results-' + process.pid + '.json'), JSON.stringify(partialResult, null, 2));
        await screenshot(page, 'failure-' + process.pid + '-' + failureCount + '.png');
      }
      if (state.done) break;
      if (Date.now() > deadline) throw new Error('Visible Cypress completion condition timed out');
      await pause(250); // Driver polling only; no test sleep or application state injection.
    }
  }
  const result = await page.evaluate(collectResult);
  result.collectionMode = collectStopped ? 'existing stopped runner; no rerun' : 'visible runner selection and completion';
  const resultFile = path.join(dir, 'visible-results-' + process.pid + '.json');
  fs.writeFileSync(resultFile, JSON.stringify(result, null, 2));
  const capturedScreenshot = await screenshot(page, 'runner-final-' + process.pid + '.png');
  result.screenshot = capturedScreenshot;
  result.captureErrors = captureErrors;
  fs.writeFileSync(resultFile, JSON.stringify(result, null, 2));
  console.log(JSON.stringify({ spec: result.spec, browser: result.browser, stats: result.stats,
    interactive: result.isInteractive, recordedTestEvidence: result.testEvidence.length,
    errors: result.tests.filter(test => test.state === 'failed').map(test => ({ title: test.title, error: test.error })) }));
  process.exit(captureErrors.length ? 1 : 0); // Detach only; leave Cypress and Chrome open.
})().catch(error => {
  fs.writeFileSync(path.join(dir, 'driver-error-' + Date.now() + '.txt'), error.stack);
  console.error(error); process.exit(1);
});
