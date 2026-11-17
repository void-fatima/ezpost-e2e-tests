// 2026-11-14: operate only the visible Cypress-owned Chrome UI.
// Tests themselves execute in Cypress open, not in this Playwright client.
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('C:/Users/LOCAL_USER/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
const expected = ['browser/contact-trust.cy.js', 'browser/stages.cy.js', 'controlled/handoff.cy.js', 'browser/navigation.cy.js'];
const captures = [];
(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:60360');
  const page = browser.contexts().flatMap(c => c.pages()).find(p => p.url().includes('/__/#/specs'));
  if (!page) throw new Error('Visible Cypress runner page not found');
  async function capture(spec) {
    const relative = 'cypress/e2e/m01/' + spec;
    await page.waitForFunction(relative => {
      if (!window.Cypress || !Cypress.mocha || !Cypress.spec) return false;
      const actual = Cypress.spec.relative.replaceAll('\\', '/');
      const runner = Cypress.mocha.getRunner();
      return actual === relative && runner.stats?.end && runner.state === 'stopped';
    }, relative, { timeout: 180000 });
    const result = await page.evaluate(() => {
      const runner = Cypress.mocha.getRunner();
      const tests = [];
      function visit(suite, parents) {
        const prefix = suite.title ? [...parents, suite.title] : parents;
        suite.tests.forEach(t => tests.push({ title: [...prefix, t.title], state: t.state, duration: t.duration, error: t.err?.message }));
        suite.suites.forEach(s => visit(s, prefix));
      }
      visit(runner.suite, []);
      return { spec: Cypress.spec.relative, stats: runner.stats, tests, isInteractive: Cypress.config('isInteractive'), browser: Cypress.browser, url: location.href };
    });
    const reporter = page.frames().find(f => f.name() === 'Cypress Reporter');
    result.reporterText = reporter ? await reporter.locator('body').innerText() : null;
    captures.push(result);
    fs.writeFileSync(path.join(__dirname, 'visible-results.json'), JSON.stringify(captures, null, 2));
    await page.screenshot({ path: path.join(__dirname, spec.replaceAll('/', '-') + '.png') });
    console.log(JSON.stringify({ spec, stats: result.stats, interactive: result.isInteractive }));
  }
  await capture('browser/smoke.cy.js');
  for (const spec of expected) {
    await page.locator('a[href="#/specs"]').first().click();
    await page.locator('a[href="#/specs/runner?file=cypress/e2e/m01/' + spec + '"]').click();
    console.log('VISIBLE SPEC LOADED: ' + spec);
    await capture(spec);
  }
  fs.writeFileSync(path.join(__dirname, 'completed.json'), JSON.stringify({ status: 'visible Cypress execution completed', leftOpen: true, specs: captures.length }, null, 2));
  // Exit only this CDP client. Never close Cypress or its Chrome browser.
  process.exit(0);
})().catch(error => {
  fs.writeFileSync(path.join(__dirname, 'ui-automation-error.txt'), error.stack || String(error));
  console.error(error);
  process.exit(1);
});
