// Read-only discovery, not a Cypress test. Generated 2026-11-14.
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('C:/Users/LOCAL_USER/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
const root = __dirname;
const origin = 'http://172.16.30.198:5800';
const runtime = path.join(root, 'runtime');
fs.mkdirSync(runtime, { recursive: true });
process.env.TEMP = runtime; // This Node process only; includes Playwright temp profiles.
process.env.TMP = runtime;
const data = { capturedAt: new Date().toISOString(), purpose: 'Authoring discovery only; no Cypress execution', pages: [], requests: [], blocked: [], errors: [] };
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: false, downloadsPath: path.join(root, 'downloads'), tracesDir: path.join(root, 'traces'), env: { ...process.env, TEMP: runtime, TMP: runtime } });
  try {
    const context = await browser.newContext({ viewport: { width: 1366, height: 900 }, acceptDownloads: false });
    await context.route('**/*', async route => {
      const req = route.request();
      const url = new URL(req.url());
      const safe = ['GET', 'HEAD', 'OPTIONS'].includes(req.method()) || (url.origin === origin && req.method() === 'POST' && /^\/api\/v1\/products\/[^/]+\/quote$/.test(url.pathname));
      if (!safe) { data.blocked.push({ method: req.method(), url: req.url() }); return route.abort('blockedbyclient'); }
      return route.continue();
    });
    const page = await context.newPage();
    await page.screenshot({ path: path.join(root, 'output-root-probe.png') });
    fs.writeFileSync(path.join(root, 'OUTPUT_ROOT.json'), JSON.stringify({ verifiedAt: new Date().toISOString(), root, probeExists: fs.existsSync(path.join(root, 'output-root-probe.png')), isolatedGuest: true, browser: browser.version(), temp: runtime }, null, 2));
    page.on('pageerror', err => data.errors.push(err.message));
    page.on('response', async response => {
      const req = response.request();
      if (response.url().includes('/api/')) {
        const item = { method: req.method(), url: response.url(), status: response.status() };
        // Only public quote/session/catalog data, never cookies or auth headers.
        try { item.body = await response.json(); if (req.method() === 'POST') item.input = req.postDataJSON(); } catch {}
        data.requests.push(item);
      }
    });
    async function capture(label) {
      const dom = await page.evaluate(() => ({ url: location.href, title: document.title, text: document.querySelector('main')?.innerText, controls: [...document.querySelectorAll('main input, main select, main button, main a, main label, main [role]')].map(el => ({ tag: el.tagName, text: el.innerText, attrs: Object.fromEntries([...el.attributes].filter(a => !['class','style'].includes(a.name)).map(a => [a.name,a.value])), value: el.value, checked: el.checked, visible: !!el.getClientRects().length })), headings: [...document.querySelectorAll('main h1, main h2, main h3, main h4')].map(el => ({tag:el.tagName,text:el.innerText})), images: [...document.querySelectorAll('main img')].map(el => ({alt:el.alt,src:el.getAttribute('src')})) }));
      fs.writeFileSync(path.join(root, label + '.json'), JSON.stringify(dom, null, 2));
      fs.writeFileSync(path.join(root, label + '.aria.txt'), await page.locator('main').ariaSnapshot());
      fs.writeFileSync(path.join(root, label + '.html'), await page.locator('main').evaluate(el => el.outerHTML));
      data.pages.push({ label, url: page.url() });
    }
    await page.goto(origin + '/shop');
    await page.locator('main article a[href^="/products/"]').first().waitFor();
    await capture('shop');
    await page.goto(origin + '/products/blackfri-01');
    await page.locator('main input[type="number"]').waitFor();
    await page.waitForResponse(r => r.url().endsWith('/quote') && r.status() === 200).catch(err => data.errors.push('quote readiness: ' + err.message));
    await capture('product-initial');
    await page.goto(origin + '/cart');
    await page.locator('main h1').waitFor();
    await capture('cart');
    await page.goto(origin + '/checkout');
    await page.locator('#mobile').waitFor();
    await capture('guest-checkout-login');
    await page.goto(origin + '/login');
    await page.locator('#mobile').waitFor();
    await capture('login');
    await context.close();
  } finally {
    fs.writeFileSync(path.join(root, 'discovery.json'), JSON.stringify(data, null, 2));
    await browser.close();
  }
})().catch(err => { console.error(err); process.exitCode = 1; });
