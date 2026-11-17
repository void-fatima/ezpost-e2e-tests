// Select both existing specs in the actual visible Cypress Firefox UI.
const { RDP } = require('./firefox-rdp.cjs');
const { setup } = require('./driver-common.cjs');
const { installObserver, currentState, collectResult } = require('./runner-observer.cjs');
const [requestedDir, port = '6000', suppliedPid] = process.argv.slice(2);
if (!/^\d+$/.test(port)) throw Error('Usage: node drive-firefox.cjs <run-directory> <RDP-port> <dedicated-Firefox-window-PID>');
const run = setup(requestedDir, 'firefox', suppliedPid);
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const call = (rdp, fn) => rdp.evaluate('JSON.stringify((' + fn.toString() + ')())').then(JSON.parse);
(async () => {
  const rdp = new RDP(Number(port));
  const connection = await rdp.init();
  run.write('runner-connected.json', { at: new Date().toISOString(), connection,
    dedicatedWindowProcessId: Number(suppliedPid), state: 'actual dedicated Firefox runner connected; spec execution still unverified' });
  run.capture('runner-before.png');
  const results = [];
  for (const spec of run.specs) {
    run.sourceCheck('before ' + spec);
    await rdp.evaluate(`(()=>{if(location.hash!=='#/specs')document.querySelector('a[href="#/specs"]').click();return true})()`);
    const selector = 'a[href="#/specs/runner?file=' + spec + '"]';
    await wait(async () => await rdp.evaluate('Boolean(document.querySelector(' + JSON.stringify(selector) + '))'));
    await rdp.evaluate('document.querySelector(' + JSON.stringify(selector) + ').click();true');
    await wait(async () => await rdp.evaluate('window.Cypress?.spec?.relative.replaceAll("\\\\", "/")===' + JSON.stringify(spec)));
    const prefix = spec.split('/').pop().replace('.cy.js', '');
    run.write(prefix + '-loaded.json', { at: new Date().toISOString(), spec, sourceId: run.manifest.sourceId });
    console.log('VISIBLE FIREFOX SPEC LOADED ' + spec);
    await rdp.evaluate('(' + installObserver.toString() + ')()');
    let failureCount = 0;
    await wait(async () => {
      const state = await call(rdp, currentState);
      if (state.spec !== spec) throw Error('Runner changed to an unauthorized spec');
      if (state.failures.length > failureCount) {
        failureCount = state.failures.length;
        run.write(prefix + '-diagnostics.json', state.failures);
        run.write(prefix + '-in-progress.json', await call(rdp, collectResult));
        run.capture(prefix + '-failure-' + failureCount + '.png');
      }
      return state.done;
    }, 240000);
    const result = run.result(spec, await call(rdp, collectResult));
    results.push(result); run.write('regression-summary.json', results);
    console.log(JSON.stringify(result));
  }
  run.sourceCheck('all Firefox specs completed');
  rdp.sock.end(); process.exit(run.captureErrors.length ? 1 : 0); // Keep Cypress/Firefox open.
  async function wait(condition, timeout = 30000) {
    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) { if (await condition()) return; await pause(250); }
    throw Error('Visible Firefox completion condition timed out');
  }
})().catch(error => { run.write('driver-error.json', { at: new Date().toISOString(), error: error.stack }); console.error(error); process.exit(1); });
