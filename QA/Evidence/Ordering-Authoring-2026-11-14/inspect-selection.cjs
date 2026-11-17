// Read-only UI discovery. Does not import Cypress or mutate application records.
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('C:/Users/LOCAL_USER/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
const root = __dirname;
process.env.TEMP = path.join(root, 'runtime');
process.env.TMP = process.env.TEMP;
const origin = 'http://172.16.30.198:5800';
const result = { capturedAt: new Date().toISOString(), steps: [], quotes: [], blocked: [], console: [] };
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: false, downloadsPath: path.join(root, 'downloads'), tracesDir: path.join(root, 'traces'), env: { ...process.env, TEMP: path.join(root, 'runtime'), TMP: path.join(root, 'runtime') } });
  try {
    const context = await browser.newContext({ viewport: { width: 1366, height: 900 }, acceptDownloads: false });
    await context.route('**/*', route => {
      const req = route.request(); const url = new URL(req.url());
      if (!['GET','HEAD','OPTIONS'].includes(req.method()) && !(url.origin === origin && req.method() === 'POST' && /^\/api\/v1\/products\/[^/]+\/quote$/.test(url.pathname))) {
        result.blocked.push({ method:req.method(), url:req.url() }); return route.abort();
      }
      return route.continue();
    });
    const page = await context.newPage();
    page.on('console', msg => { if (['error','warning'].includes(msg.type())) result.console.push({type:msg.type(),text:msg.text()}); });
    async function capture(label) {
      result.steps.push({label,url:page.url(),snapshot:await page.locator('main').ariaSnapshot()});
      fs.writeFileSync(path.join(root,label+'.html'),await page.locator('main').evaluate(el=>el.outerHTML));
    }
    async function quoteAction(label, action) {
      const pending = page.waitForResponse(r=>r.url().endsWith('/blackfri-01/quote') && r.request().method()==='POST');
      await action(); const response=await pending;
      result.quotes.push({label,input:response.request().postDataJSON(),status:response.status(),body:await response.json()});
      // Wait for browser rendering a known response identity, not network-idle guesses.
      const q=result.quotes.at(-1).body;
      await page.locator('main input[aria-label="تعداد بسته"]').waitFor();
      await page.waitForFunction(({quantity,labels})=>{
        const text=document.querySelector('.summary-line-header')?.textContent.replace(/[۰-۹]/g,c=>String(c.charCodeAt(0)-1776));
        return text?.includes(String(quantity)+' بستهٔ '+String(labels)+' لیبلی');
      },{quantity:q.quantity,labels:q.labels_per_package});
      await capture(label);
    }
    await quoteAction('selection-default',()=>page.goto(origin+'/products/blackfri-01'));
    await quoteAction('selection-increment-2',()=>page.getByRole('button',{name:'افزایش تعداد بسته',exact:true}).click());
    await quoteAction('selection-increment-3',()=>page.getByRole('button',{name:'افزایش تعداد بسته',exact:true}).click());
    await quoteAction('selection-decrement-2',()=>page.getByRole('button',{name:'کاهش تعداد بسته',exact:true}).click());
    await quoteAction('selection-package-240',()=>page.getByRole('button',{name:/بسته ۲۴۰ لیبلی/}).click());
    await page.getByRole('button',{name:'مشاهده تصویر 2',exact:true}).focus();
    await page.keyboard.press('Enter');
    await page.locator('button[aria-label="بزرگنمایی تصاویر بلک فرایدی"] img[src$="/56"]').waitFor();
    await capture('selection-gallery-keyboard');
    await page.setViewportSize({width:390,height:844});
    await capture('selection-narrow');
    await page.screenshot({path:path.join(root,'selection-narrow.png'),fullPage:true});
    await page.goto(origin+'/cart');
    await page.getByRole('heading',{name:'سبد هنوز خالی است.',exact:true}).waitFor();
    await capture('cart-ready');
    // All current public catalog product routes; no hidden links or direct APIs used for discovery.
    await page.goto(origin+'/shop');
    const paths=await page.locator('main article a[href^="/products/"]').evaluateAll(links=>links.map(a=>a.getAttribute('href')));
    for (const product of paths) {
      await page.goto(origin+product);
      await page.locator('main input[type="number"]').waitFor();
      result.steps.push({label:'customization-discovery',url:page.url(),controls:await page.locator('main').evaluate(main=>[...main.querySelectorAll('input,select,textarea,button,a')].map(el=>({tag:el.tagName,text:el.textContent.trim(),type:el.getAttribute('type'),href:el.getAttribute('href'),aria:el.getAttribute('aria-label'),visible:!!el.getClientRects().length && getComputedStyle(el).visibility!=='hidden'})))});
    }
    await context.close();
  } finally {
    fs.writeFileSync(path.join(root,'selection-discovery.json'),JSON.stringify(result,null,2));
    await browser.close();
  }
})().catch(err=>{console.error(err);process.exitCode=1;});
