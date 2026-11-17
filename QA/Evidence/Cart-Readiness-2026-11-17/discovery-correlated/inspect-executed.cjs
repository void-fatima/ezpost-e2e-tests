// Read-only browser observation. No state injection or application source changes.
const fs = require('node:fs'), path = require('node:path');
const { chromium } = require('C:/Users/LOCAL_USER/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
const out = path.resolve(__dirname, '../discovery-correlated');
fs.mkdirSync(path.join(out, 'runtime'), { recursive: true });
process.env.TEMP = path.join(out, 'runtime'); process.env.TMP = process.env.TEMP;
const origin = 'http://172.16.30.198:5800', events = [], started = Date.now();
const record = value => { events.push({ ms: Date.now() - started, ...value });
  fs.writeFileSync(path.join(out, 'timeline.json'), JSON.stringify(events, null, 2)); };
(async () => {
  const context = await chromium.launchPersistentContext(path.join(out, 'runtime/browser-profile'), {
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: false,
    viewport: { width: 1366, height: 900 }, args: ['--remote-debugging-port=64207']
  });
  await context.route(origin + '/**', route => {
    const req = route.request(), pathname = new URL(req.url()).pathname;
    const allowed = ['GET', 'HEAD', 'OPTIONS'].includes(req.method()) ||
      (req.method() === 'POST' && /^\/api\/v1\/products\/[^/]+\/quote$/.test(pathname));
    if (!allowed) { record({ kind: 'blocked-mutation', method: req.method(), path: pathname }); return route.abort(); }
    return route.continue();
  });
  const page = context.pages()[0];
  page.on('pageerror', error => record({ kind: 'browser-error', message: error.message.slice(0, 1000) }));
  page.on('console', msg => { if (msg.type() === 'error') record({ kind: 'console-error', message: msg.text().slice(0, 1000) }); });
  page.on('request', req => {
    const pathname = new URL(req.url()).pathname;
    if (pathname.startsWith('/api/') || req.isNavigationRequest()) record({ kind: 'request', method: req.method(), path: pathname,
      input: pathname.endsWith('/quote') ? req.postDataJSON() : undefined });
  });
  page.on('response', async res => {
    const pathname = new URL(res.url()).pathname;
    if (pathname.endsWith('/quote')) record({ kind: 'quote-response', path: pathname, status: res.status(), body: await res.json() });
    if (pathname === '/api/v1/auth/session') record({ kind: 'session-response', status: res.status(), guest: (await res.json()).user === null });
  });
  page.on('requestfailed', req => record({ kind: 'request-failed', method: req.method(), path: new URL(req.url()).pathname, error: req.failure()?.errorText }));
  for (const slug of ['simple', 'blackfri-01', 'simple']) {
    const defaultReply = page.waitForResponse(res => new URL(res.url()).pathname === '/api/v1/products/' + slug + '/quote' &&
      res.request().postDataJSON().quantity === 1);
    const document = await page.goto(origin + '/products/' + slug);
    const html = await document.text();
    const ssr = { slug, rootHasMountedMarkerInServerHTML: /id="__nuxt"[^>]*data-v-app/.test(html),
      hasProductHeading: html.includes(slug === 'simple' ? 'طرح ساده' : 'بلک فرایدی'),
      hasQuoteFields: ['line_total_irr', 'package_id', 'labels_per_package', 'labels_total'].map(field => ({ field, present: html.includes(field) })) };
    const payload = await page.locator('script#__NUXT_DATA__').textContent().catch(() => null);
    if (payload) {
      const parsed = JSON.parse(payload);
      ssr.payloadArrayLength = parsed.length;
      ssr.quoteRelatedEntries = parsed.map((value, index) => ({ index, value })).filter(row => row.value &&
        typeof row.value === 'object' && !Array.isArray(row.value) &&
        Object.keys(row.value).some(key => ['line_total_irr', 'labels_per_package', 'labels_total'].includes(key)));
    }
    record({ kind: 'server-document', ...ssr });
    const snapshot = await page.locator('main').evaluate(main => ({ path: location.pathname,
      mountedMarker: document.querySelector('#__nuxt')?.hasAttribute('data-v-app'),
      h1: main.querySelector('h1')?.textContent, quantity: main.querySelector('input[aria-label="تعداد بسته"]')?.value,
      selected: [...main.querySelectorAll('.package-options-grid button.is-selected .package-card-title')].map(e => e.textContent),
      summary: main.querySelector('.summary-line-header')?.textContent, total: main.querySelector('.total-value')?.textContent,
      buttons: [...main.querySelectorAll('[data-cy="add-to-cart"], button.mobile-bar-cta')].map(e => ({
        text: e.textContent, visible: e.getClientRects().length > 0, disabled: e.disabled })) }));
    record({ kind: 'after-load-snapshot', ...snapshot });
    const initial = await defaultReply;
    const initialBody = await initial.json();
    record({ kind: 'correlated-initial-quote-observed', slug, status: initial.status(),
      packageId: initialBody.package_id, quantity: initialBody.quantity });
    // Real read-only UI interaction discriminates SSR-only content from a usable client.
    const reply = page.waitForResponse(res => new URL(res.url()).pathname === '/api/v1/products/' + slug + '/quote' &&
      res.request().postDataJSON().quantity === 2);
    await page.locator('main button[aria-label="افزایش تعداد بسته"]').click(); await reply;
    record({ kind: 'usable-quantity-control', slug, requestedQuantity: 2 });
  }
  record({ kind: 'complete', noCartActions: true });
  console.log(JSON.stringify({ output: out, events: events.length, browser: await context.browser().version() }));
  await context.close();
})().catch(error => { record({ kind: 'driver-error', message: error.message }); console.error(error); process.exit(1); });
