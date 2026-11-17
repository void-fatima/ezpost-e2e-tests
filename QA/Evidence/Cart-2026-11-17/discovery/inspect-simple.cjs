const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/LOCAL_USER/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
(async()=>{
 const browser=await chromium.connectOverCDP('http://127.0.0.1:64197');const context=browser.contexts()[0],page=context.pages().find(p=>p.url().includes('172.16.30.198'));
 await context.route('**/api/v1/products/simple/quote',route=>route.continue());
 const quotes=[];page.on('response',async r=>{if(new URL(r.url()).pathname==='/api/v1/products/simple/quote')quotes.push({input:r.request().postDataJSON(),status:r.status(),body:await r.json()})});
 const reply=page.waitForResponse(r=>new URL(r.url()).pathname==='/api/v1/products/simple/quote');await page.goto('http://172.16.30.198:5800/products/simple');await reply;
 await page.locator('main [data-cy="add-to-cart"]').waitFor({state:'visible'});
 const product=await page.locator('main').evaluate(main=>({text:main.innerText,html:main.outerHTML}));
 fs.writeFileSync(path.join(__dirname,'simple-product.json'),JSON.stringify({at:new Date().toISOString(),product,quotes},null,2));
 console.log(JSON.stringify({quotes,text:product.text}));process.exit(0);
})().catch(e=>{console.error(e);process.exit(1)});
