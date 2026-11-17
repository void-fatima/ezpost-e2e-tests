// Isolated rapid native-key probe — 2026-11-17.
// New incognito about:blank only. Never read/change the company AUT or session.
const fs = require('node:fs');
const path = require('node:path');
const [port = '53048'] = process.argv.slice(2);
if (!/^\d+$/.test(port)) throw Error('Owned Chrome CDP port required');
const output = path.join(__dirname, 'rapid-results.json');
if (fs.existsSync(output)) throw Error('Preserve existing probe output');
async function main() {
  const cache = path.join(process.env.LOCALAPPDATA, 'npm-cache', '_npx');
  const modulePath = fs.readdirSync(cache).map(name => path.join(cache, name, 'node_modules', 'playwright'))
    .find(name => fs.existsSync(path.join(name, 'package.json')));
  if (!modulePath) throw Error('Cached driver required');
  const { chromium } = require(modulePath);
  const browser = await chromium.connectOverCDP('http://127.0.0.1:' + port);
  const context = await browser.newContext();
  try {
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    const cases = [];
    for (let trial = 1; trial <= 5; trial++) {
      for (const method of ['exact-cypress-cdp-params', 'playwright-keyboard-type']) {
        await page.setContent('<!doctype html><title>Isolated rapid native input probe</title>' +
          '<label for="probe">Synthetic sample</label><input id="probe" type="text" required minlength="2" maxlength="120">');
        if (page.url() !== 'about:blank') throw Error('Disposable page must remain blank');
        await page.evaluate(() => {
          window.probeCounts = { keydown: 0, keypress: 0, beforeinput: 0, input: 0, keyup: 0, untrusted: 0 };
          const input = document.querySelector('#probe');
          for (const kind of ['keydown', 'keypress', 'beforeinput', 'input', 'keyup']) {
            input.addEventListener(kind, event => { window.probeCounts[kind]++; if (!event.isTrusted) window.probeCounts.untrusted++; });
          }
        });
        await page.locator('#probe').focus();
        if (method === 'exact-cypress-cdp-params') {
          for (let index = 0; index < 121; index++) {
            await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'X', text: 'X' });
            await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'X' });
          }
        } else {
          await page.keyboard.type('X'.repeat(121));
        }
        const state = await page.evaluate(() => {
          const input = document.querySelector('#probe');
          return { length: input.value.length, maxLength: input.maxLength, minLength: input.minLength,
            allCharactersMatchSyntheticFixture: /^X*$/.test(input.value), tooShort: input.validity.tooShort,
            tooLong: input.validity.tooLong, nativeValid: input.validity.valid,
            reachedExpectedMaximum: input.value.length === 120,
            focusedIntendedInput: document.activeElement === input,
            eventCounts: window.probeCounts, allEventsTrusted: window.probeCounts.untrusted === 0 };
        });
        cases.push({ trial, method, attemptedNativeCharacters: 121, ...state });
      }
    }
    const result = { capturedAt: new Date().toISOString(),
      kind: 'isolated sequential native-key behavior; NOT company app or Cypress runner test',
      browserVersion: browser.version(), isolatedContext: true, remainedAboutBlank: page.url() === 'about:blank',
      companyNavigation: false, companySessionRead: false, arbitrarySleeps: false,
      cdpParams: { keyDown: { type: 'keyDown', key: 'X', text: 'X' }, keyUp: { type: 'keyUp', key: 'X' } },
      cases };
    fs.writeFileSync(output, JSON.stringify(result, null, 2), { flag: 'wx' });
    console.log(JSON.stringify(result));
  } finally {
    await context.close(); // Only this blank probe; preserve failed runner/browser.
  }
  process.exit(0);
}
main().catch(() => { console.error('ISOLATED_RAPID_PROBE_FAILED; no private values/raw errors recorded'); process.exit(1); });
