// Read-only public third-option fixture discovery. No Cypress execution.
const fs=require('node:fs'),path=require('node:path');
process.env.TEMP=path.join(__dirname,'runtime');process.env.TMP=process.env.TEMP;
const {chromium}=require('C:/Users/LOCAL_USER/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:false,downloadsPath:path.join(__dirname,'downloads'),tracesDir:path.join(__dirname,'traces')});
try{const context=await browser.newContext({acceptDownloads:false});await context.route('**/*',route=>{const req=route.request(),u=new URL(req.url());return ['GET','HEAD','OPTIONS'].includes(req.method())||(req.method()==='POST'&&u.origin==='http://172.16.30.198:5800'&&u.pathname==='/api/v1/products/blackfri-01/quote')?route.continue():route.abort();});const page=await context.newPage();
let response=page.waitForResponse(r=>r.url().endsWith('/blackfri-01/quote'));await page.goto('http://172.16.30.198:5800/products/blackfri-01');await response;
response=page.waitForResponse(r=>r.url().endsWith('/blackfri-01/quote')&&r.request().postDataJSON().quantity===2);await page.getByRole('button',{name:'افزایش تعداد بسته',exact:true}).click();await response;
response=page.waitForResponse(r=>r.url().endsWith('/blackfri-01/quote'));await page.getByRole('button',{name:/بسته ۳۶۰ لیبلی/}).click();const r=await response;
const data={capturedAt:new Date().toISOString(),source:'read-only current UI selection',input:r.request().postDataJSON(),status:r.status(),body:await r.json(),packageTitle:'بسته ۳۶۰ لیبلی'};
fs.writeFileSync(path.join(__dirname,'third-package.json'),JSON.stringify(data,null,2));console.log(JSON.stringify({packageId:data.input.package_id,quantity:data.input.quantity,labels:data.body.labels_per_package}));await context.close();
}finally{await browser.close();}})().catch(error=>{console.error(error);process.exitCode=1;});
