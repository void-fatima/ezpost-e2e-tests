// Read-only transport discovery, not a Cypress execution.
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('C:/Users/LOCAL_USER/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
process.env.TEMP = path.join(__dirname, 'runtime');
process.env.TMP = process.env.TEMP;
(async () => {
  const browser = await chromium.launch({channel:'chrome',headless:false,downloadsPath:path.join(__dirname,'downloads'),tracesDir:path.join(__dirname,'traces'),env:{...process.env,TEMP:path.join(__dirname,'runtime'),TMP:path.join(__dirname,'runtime')}});
  try {
    const context = await browser.newContext({acceptDownloads:false});
    await context.route('**/*',route=>{
      const req=route.request();const url=new URL(req.url());
      return ['GET','HEAD','OPTIONS'].includes(req.method()) || (url.origin==='http://172.16.30.198:5800' && req.method()==='POST' && url.pathname==='/api/v1/products/blackfri-01/quote') ? route.continue():route.abort();
    });
    await context.addInitScript(()=>{
      window.__qaQuoteConsumption=[];
      const fetch=window.fetch.bind(window);
      window.fetch=(...args)=>fetch(...args).then(response=>{
        if(new URL(response.url).pathname!=='/api/v1/products/blackfri-01/quote')return response;
        for(const method of ['text','json']) {
          const read=response[method].bind(response);
          response[method]=(...params)=>read(...params).then(value=>{
            const body=method==='json'?value:JSON.parse(value);
            window.__qaQuoteConsumption.push({method,quantity:body.quantity,package_id:body.package_id});
            return value;
          });
        }
        return response;
      });
    });
    const page=await context.newPage();
    await page.goto('http://172.16.30.198:5800/products/blackfri-01');
    await page.waitForFunction(()=>window.__qaQuoteConsumption.some(x=>x.quantity===1));
    await page.getByRole('button',{name:'افزایش تعداد بسته',exact:true}).click();
    await page.waitForFunction(()=>window.__qaQuoteConsumption.some(x=>x.quantity===2));
    fs.writeFileSync(path.join(__dirname,'transport-observation.json'),JSON.stringify({capturedAt:new Date().toISOString(),note:'Native fetch response consumption observed; no controlled responses or Cypress tests executed',observations:await page.evaluate(()=>window.__qaQuoteConsumption)},null,2));
    await context.close();
  }finally {await browser.close();}
})().catch(err=>{console.error(err);process.exitCode=1;});
