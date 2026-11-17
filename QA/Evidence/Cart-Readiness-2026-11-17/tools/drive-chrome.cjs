// Select both existing specs in the actual visible Cypress Chrome UI.
const { chromium } = require('C:/Users/LOCAL_USER/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
const { setup } = require('./driver-common.cjs');
const { installObserver, currentState, collectResult } = require('./runner-observer.cjs');
const [requestedDir, port, suppliedPid] = process.argv.slice(2);
if (!/^\d+$/.test(port || '')) throw Error('Usage: node drive-chrome.cjs <run-directory> <CDP-port> <dedicated-Chrome-window-PID>');
const run = setup(requestedDir, 'chrome', suppliedPid);
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:' + port);
  const page = browser.contexts().flatMap(context => context.pages()).find(item => item.url().includes('/__/#/specs'));
  if (!page) throw Error('Actual Cypress Chrome runner not found');
  await page.bringToFront();
  const visible = await page.evaluate(() => document.visibilityState === 'visible');
  if (!visible) throw Error('Cypress Chrome runner document is not visible');
  run.write('runner-connected.json', { at: new Date().toISOString(), runnerUrl: page.url(), documentVisible: visible,
    dedicatedWindowProcessId: Number(suppliedPid), state: 'actual runner connected; spec execution still unverified' });
  run.capture('runner-before.png');
  const results = [];
  for (const spec of run.specs) {
    run.sourceCheck('before ' + spec);
    if (new URL(page.url()).hash !== '#/specs') await page.locator('a[href="#/specs"]').first().click();
    await page.locator('a[href="#/specs/runner?file=' + spec + '"]').click();
    await page.waitForFunction(spec => window.Cypress?.spec?.relative.replaceAll('\\', '/') === spec, spec);
    const prefix = spec.split('/').pop().replace('.cy.js', '');
    run.write(prefix + '-loaded.json', { at: new Date().toISOString(), spec, runnerUrl: page.url(), sourceId: run.manifest.sourceId });
    console.log('VISIBLE CHROME SPEC LOADED ' + spec);
    await page.evaluate(installObserver);
    let failureCount = 0;
    const deadline = Date.now() + 240000;
    while (true) {
      const state = await page.evaluate(currentState);
      if (state.spec !== spec) throw Error('Runner changed to an unauthorized spec');
      if (state.failures.length > failureCount) {
        failureCount = state.failures.length;
        run.write(prefix + '-diagnostics.json', state.failures);
        run.write(prefix + '-in-progress.json', await page.evaluate(collectResult));
        run.capture(prefix + '-failure-' + failureCount + '.png');
      }
      if (state.done) break;
      if (Date.now() > deadline) throw Error('Visible Chrome completion condition timed out');
      await pause(250); // Driver polling only; no test sleep.
    }
    const result = run.result(spec, await page.evaluate(collectResult));
    results.push(result); run.write('regression-summary.json', results);
    console.log(JSON.stringify(result));
  }
  run.sourceCheck('all Chrome specs completed');
  process.exit(run.captureErrors.length ? 1 : 0); // Detach only; leave real Cypress/Chrome open.
})().catch(error => { run.write('driver-error.json', { at: new Date().toISOString(), error: error.stack }); console.error(error); process.exit(1); });
