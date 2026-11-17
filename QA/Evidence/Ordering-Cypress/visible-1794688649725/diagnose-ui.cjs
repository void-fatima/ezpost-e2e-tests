// Read-only diagnostic outside test counts. Operates a separate temporary tab.
const fs=require('node:fs'),path=require('node:path');
const {chromium}=require('C:/Users/LOCAL_USER/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
(async()=>{
const b=await chromium.connectOverCDP('http://127.0.0.1:58367');
const p=await b.contexts()[0].newPage();
const output={purpose:'Read-only diagnosis; NOT Cypress test results',at:new Date().toISOString()};
const initial=p.waitForResponse(r=>r.url().endsWith('/api/v1/products/blackfri-01/quote')&&r.request().method()==='POST');
await p.goto('http://172.16.30.198:5800/products/blackfri-01');
await initial;
await p.locator('main .total-value').filter({hasText:'ریال'}).waitFor();
await p.waitForFunction(()=>document.querySelector('main .total-value')?.textContent.match(/[۰-۹0-9]/));
await p.evaluate(()=>{window.diagnosticEvents=[];for(const type of ['keydown','keypress','keyup','click'])window.addEventListener(type,e=>window.diagnosticEvents.push({type,key:e.key,keyCode:e.keyCode,charCode:e.charCode,code:e.code,trusted:e.isTrusted,target:e.target.tagName,label:e.target.getAttribute('aria-label')}),true);});
await p.locator('button[aria-label="مشاهده تصویر 2"]').focus();
await p.keyboard.press('Enter');
await p.waitForFunction(()=>document.querySelector('main .product-gallery__main-img')?.getAttribute('src')===document.querySelector('button[aria-label="مشاهده تصویر 2"] img')?.getAttribute('src'));
output.nativeEnter={success:true,events:await p.evaluate(()=>window.diagnosticEvents)};
let release;
const gate=new Promise(resolve=>{release=resolve});
let gotRequest;
const requested=new Promise(resolve=>{gotRequest=resolve});
await p.route('**/api/v1/products/blackfri-01/quote',async route=>{gotRequest();await gate;await route.continue();});
await p.locator('main button[aria-label="افزایش تعداد بسته"]').click();
await requested;
output.pending=await p.evaluate(()=>({quantity:document.querySelector('main input[aria-label="تعداد بسته"]').value,controls:[...document.querySelectorAll('main button[aria-label="افزایش تعداد بسته"],main .package-options-grid button,main input[aria-label="تعداد بسته"]')].map(el=>({tag:el.tagName,label:el.getAttribute('aria-label'),disabled:el.disabled,text:el.tagName==='BUTTON'?el.innerText:null}))}));
await p.screenshot({path:path.join(__dirname,'chrome','diagnostic-pending.png')});
release();
await p.waitForFunction(()=>document.querySelector('main .summary-line-header')?.textContent.includes('۲'));
fs.writeFileSync(path.join(__dirname,'chrome','read-only-diagnosis.json'),JSON.stringify(output,null,2));
console.log(JSON.stringify(output,null,2));
await p.close(); // Only this temporary diagnostic tab.
process.exit(0);
})().catch(e=>{console.error(e);process.exit(1)});
