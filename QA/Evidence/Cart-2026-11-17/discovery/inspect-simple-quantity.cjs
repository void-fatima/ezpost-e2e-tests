const fs=require('node:fs'),path=require('node:path');const {chromium}=require('C:/Users/LOCAL_USER/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
(async()=>{const b=await chromium.connectOverCDP('http://127.0.0.1:64197');const c=b.contexts()[0],p=c.pages().find(p=>p.url().includes('/products/simple'));const quotes=[];
 await c.route('**/api/v1/products/simple/quote',r=>r.continue());
 p.on('response',async r=>{if(new URL(r.url()).pathname.endsWith('/quote'))quotes.push({path:new URL(r.url()).pathname,input:r.request().postDataJSON(),status:r.status(),body:await r.json()})});
 const response=p.waitForResponse(r=>new URL(r.url()).pathname==='/api/v1/products/simple/quote');await p.locator('main button[aria-label="افزایش تعداد بسته"]').click();await response;
 const product=await p.locator('main').evaluate(main=>({text:main.innerText,html:main.outerHTML}));
 fs.writeFileSync(path.join(__dirname,'simple-product.json'),JSON.stringify({at:new Date().toISOString(),product,quotes},null,2));console.log(JSON.stringify({quotes,text:product.text}));process.exit();
})().catch(e=>{console.error(e);process.exit(1)});
