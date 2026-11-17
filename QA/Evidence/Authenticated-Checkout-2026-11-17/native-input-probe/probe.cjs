// Isolated native constraint probe — 2026-11-17.
// Connect only to the owned Chrome. New incognito about:blank context, no AUT.
// No private input, cookies, session, network bodies, screenshots or raw errors.
const fs = require('node:fs');
const path = require('node:path');
const [port = '65259'] = process.argv.slice(2);
if (!/^\d+$/.test(port)) throw Error('Numeric owned Chrome CDP port required');
const output = path.join(__dirname, 'results.json');
if (fs.existsSync(output)) throw Error('Probe result already exists; preserve it');
async function main() {
  const cache = path.join(process.env.LOCALAPPDATA, 'npm-cache', '_npx');
  const modulePath = fs.readdirSync(cache).map(name => path.join(cache, name, 'node_modules', 'playwright'))
    .find(name => fs.existsSync(path.join(name, 'package.json')));
  if (!modulePath) throw Error('Existing cached driver required');
  const { chromium } = require(modulePath);
  const browser = await chromium.connectOverCDP('http://127.0.0.1:' + port);
  const context = await browser.newContext();
  try {
    const page = await context.newPage();
    const sample = '<!doctype html><title>Isolated native input constraint probe</title>' +
      '<label for="probe">Synthetic sample</label><input id="probe" type="text" required minlength="2" maxlength="120">';
    const cases = [];
    async function reset() {
      await page.setContent(sample);
      if (page.url() !== 'about:blank') throw Error('Disposable page must remain about:blank');
      await page.evaluate(() => {
        window.probeEvents = [];
        document.querySelector('#probe').addEventListener('input', event =>
          window.probeEvents.push({ isTrusted: event.isTrusted, inputType: event.inputType || null }));
      });
    }
    async function snapshot(name) {
      const state = await page.evaluate(() => {
        const input = document.querySelector('#probe');
        return { valueLength: input.value.length, required: input.required,
          minLength: input.minLength, maxLength: input.maxLength,
          valueMissing: input.validity.valueMissing, tooShort: input.validity.tooShort,
          tooLong: input.validity.tooLong, nativeValid: input.validity.valid,
          checkValidity: input.checkValidity(), events: window.probeEvents };
      });
      cases.push({ name, ...state });
    }
    await reset(); await snapshot('empty-required');
    await reset();
    await page.evaluate(() => {
      const input = document.querySelector('#probe');
      input.value = 'X'; input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await snapshot('dom-assignment-and-synthetic-input');
    await reset();
    await page.evaluate(() => {
      const input = document.querySelector('#probe');
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(input, 'X');
      input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: 'X' }));
    });
    await snapshot('prototype-setter-and-synthetic-input');
    await reset();
    await page.locator('#probe').focus();
    await page.keyboard.type('X');
    await snapshot('real-keyboard-short-input');
    await page.keyboard.type('Y');
    await snapshot('real-keyboard-valid-length');
    const result = { capturedAt: new Date().toISOString(), kind: 'isolated native HTML constraint probe; NOT company application E2E',
      browserVersion: browser.version(), isolatedContext: true, pageRemainedAboutBlank: page.url() === 'about:blank',
      companyNavigation: false, privateSessionRead: false, cases };
    fs.writeFileSync(output, JSON.stringify(result, null, 2), { flag: 'wx' });
    console.log(JSON.stringify(result));
  } finally {
    await context.close(); // Only the disposable probe context; leave runner open.
  }
  process.exit(0); // Disconnect from the existing browser without closing it.
}
main().catch(() => { console.error('ISOLATED_NATIVE_PROBE_FAILED; no raw error or values recorded'); process.exit(1); });
