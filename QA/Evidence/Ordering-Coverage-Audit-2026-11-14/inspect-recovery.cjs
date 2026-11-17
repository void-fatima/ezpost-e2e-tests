// Reversible browser-only failure discovery; no company networking changes.
const fs=require('node:fs'),path=require('node:path');
process.env.TEMP=path.join(__dirname,'runtime');process.env.TMP=process.env.TEMP;
const {chromium}=require('C:/Users/LOCAL_USER/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
const base='http://172.16.30.198:5800',quote='/api/v1/products/blackfri-01/quote';
const evidence={capturedAt:new Date().toISOString(),kind:'Isolated guest, browser-only quote interruption; no Cypress execution',snapshots:[],network:[],blocked:[]};
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:false,downloadsPath:path.join(__dirname,'downloads'),tracesDir:path.join(__dirname,'traces')});
try{
 const context=await browser.newContext({acceptDownloads:false,viewport:{width:1366,height:900}});
 let failQuantity2=false;
 await context.route('**/*',route=>{const r=route.request(),u=new URL(r.url());
  if(!['GET','HEAD','OPTIONS'].includes(r.method())&&!(u.origin===base&&u.pathname===quote&&r.method()==='POST')){evidence.blocked.push({method:r.method(),url:r.url()});return route.abort();}
  if(u.pathname===quote&&r.method()==='POST'&&failQuantity2&&r.postDataJSON().quantity===2){evidence.network.push({event:'simulated-abort',input:r.postDataJSON()});return route.abort('failed');}
  return route.continue();});
 const page=await context.newPage();
 async function frames(){await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));}
 async function capture(label){await frames();const item={label,url:page.url(),main:await page.locator('main').ariaSnapshot(),dialogs:await page.getByRole('dialog').evaluateAll(ds=>ds.map(d=>({html:d.outerHTML,images:[...d.querySelectorAll('img')].map(e=>({src:e.getAttribute('src'),alt:e.alt})),focused:document.activeElement.outerHTML}))),focused:await page.evaluate(()=>document.activeElement.outerHTML)};evidence.snapshots.push(item);fs.writeFileSync(path.join(__dirname,label+'.html'),await page.locator('body').evaluate(e=>e.outerHTML));}
 const initial=page.waitForResponse(r=>r.url().endsWith(quote));await page.goto(base+'/products/blackfri-01');await initial;await frames();
 await page.getByRole('button',{name:'بزرگنمایی تصاویر بلک فرایدی',exact:true}).click();await page.getByRole('dialog').waitFor();await capture('gallery-open-ready');
 await page.getByRole('dialog').getByRole('button',{name:'تصویر بعدی',exact:true}).click();await frames();await capture('gallery-next');
 await page.getByRole('dialog').getByRole('button',{name:'تصویر قبلی',exact:true}).click();await frames();await capture('gallery-previous');
 await page.getByRole('dialog').getByRole('tab',{name:'تصویر ۲',exact:true}).click();await frames();await capture('gallery-tab2');
 await page.getByRole('button',{name:'بستن گالری',exact:true}).click();await page.getByRole('dialog').waitFor({state:'hidden'});await capture('gallery-closed');
 await page.getByRole('button',{name:'بزرگنمایی تصاویر بلک فرایدی',exact:true}).click();await page.getByRole('dialog').waitFor();await page.keyboard.press('Escape');await page.getByRole('dialog').waitFor({state:'hidden'});await capture('gallery-escape-ready');
 failQuantity2=true;const failed=page.waitForEvent('requestfailed',r=>r.url().endsWith(quote));await page.getByRole('button',{name:'افزایش تعداد بسته',exact:true}).click();await failed;await capture('quote-failed-q2');
 const recovery=page.waitForResponse(r=>r.url().endsWith(quote)&&r.request().postDataJSON().quantity===3);await page.getByRole('button',{name:'افزایش تعداد بسته',exact:true}).click();const r=await recovery;evidence.network.push({event:'real-recovery',input:r.request().postDataJSON(),status:r.status(),body:await r.json()});await capture('quote-recovered-q3');
 await context.close();
}finally{fs.writeFileSync(path.join(__dirname,'recovery-discovery.json'),JSON.stringify(evidence,null,2));await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
