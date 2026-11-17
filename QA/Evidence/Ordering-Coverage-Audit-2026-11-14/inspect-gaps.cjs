// Read-only coverage discovery. No Cypress execution or live mutation.
const fs=require('node:fs'),path=require('node:path');
process.env.TEMP=path.join(__dirname,'runtime');process.env.TMP=process.env.TEMP;
const {chromium}=require('C:/Users/LOCAL_USER/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
const origin='http://172.16.30.198:5800';
const evidence={capturedAt:new Date().toISOString(),snapshots:[],quotes:[],blocked:[]};
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:false,downloadsPath:path.join(__dirname,'downloads'),tracesDir:path.join(__dirname,'traces')});
 try{
 const context=await browser.newContext({viewport:{width:1366,height:900},acceptDownloads:false});
 await context.route('**/*',route=>{
  const r=route.request(),u=new URL(r.url());
  if(!['GET','HEAD','OPTIONS'].includes(r.method()) && !(u.origin===origin&&r.method()==='POST'&&/^\/api\/v1\/products\/[^/]+\/quote$/.test(u.pathname))){evidence.blocked.push({method:r.method(),url:r.url()});return route.abort();}
  return route.continue();
 });
 const page=await context.newPage();
 await page.screenshot({path:path.join(__dirname,'output-root-probe.png')});
 fs.writeFileSync(path.join(__dirname,'OUTPUT_ROOT.json'),JSON.stringify({capturedAt:new Date().toISOString(),root:__dirname,temp:require('node:os').tmpdir(),probeExists:true,browser:browser.version(),isolatedGuest:true},null,2));
 async function capture(label){const item={label,url:page.url(),aria:await page.locator('body').ariaSnapshot(),controls:await page.locator('body').evaluate(b=>[...b.querySelectorAll('input,button,[role="dialog"],dialog')].map(e=>({tag:e.tagName,text:e.textContent.trim(),attrs:Object.fromEntries([...e.attributes].filter(a=>a.name!=='class'&&a.name!=='style').map(a=>[a.name,a.value])),value:e.value,visible:!!e.getClientRects().length}))),};evidence.snapshots.push(item);fs.writeFileSync(path.join(__dirname,label+'.html'),await page.locator('body').evaluate(e=>e.outerHTML));}
 async function quoteAction(label,action){const pending=page.waitForResponse(r=>r.url().endsWith('/blackfri-01/quote')&&r.request().method()==='POST');await action();const r=await pending;const q=await r.json();evidence.quotes.push({label,input:r.request().postDataJSON(),status:r.status(),body:q});await page.waitForFunction(({q,l})=>{const t=document.querySelector('.summary-line-header')?.textContent.replace(/[۰-۹]/g,c=>String(c.charCodeAt(0)-1776));return t?.includes(q+' بستهٔ '+l+' لیبلی');},{q:q.quantity,l:q.labels_per_package});await capture(label);}
 await quoteAction('default',()=>page.goto(origin+'/products/blackfri-01'));
 await page.getByRole('button',{name:'بزرگنمایی تصاویر بلک فرایدی',exact:true}).click();
 await capture('zoom-open');
 await page.keyboard.press('Escape');
 await capture('zoom-escape');
 await quoteAction('keyboard-quantity-2',async()=>{await page.getByRole('spinbutton',{name:'تعداد بسته'}).focus();await page.keyboard.press('ArrowUp');await page.keyboard.press('Tab');});
 await quoteAction('package-alternate',()=>page.getByRole('button',{name:/بسته ۲۴۰ لیبلی/}).click());
 await quoteAction('package-return',()=>page.getByRole('button',{name:/بسته ۱۲۰ لیبلی/}).click());
 await page.goto(origin+'/login');await page.locator('#mobile').waitFor();
 await page.locator('#mobile').fill('abc');
 const invalid=await page.locator('#mobile').evaluate(e=>({valid:e.checkValidity(),patternMismatch:e.validity.patternMismatch}));
 await page.locator('#mobile').fill('09'+'0'.repeat(9));
 const valid=await page.locator('#mobile').evaluate(e=>({length:e.value.length,valid:e.checkValidity(),formValid:e.form.checkValidity()}));
 await page.locator('#mobile').fill('09');
 const incomplete=await page.locator('#mobile').evaluate(e=>({valid:e.checkValidity(),patternMismatch:e.validity.patternMismatch}));
 evidence.nativeCorrection={inputKind:'synthetic native format only, no identity or submission',invalid,valid,incomplete};
 await page.locator('#mobile').fill('');
 await context.close();
 }finally{fs.writeFileSync(path.join(__dirname,'discovery.json'),JSON.stringify(evidence,null,2));await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
