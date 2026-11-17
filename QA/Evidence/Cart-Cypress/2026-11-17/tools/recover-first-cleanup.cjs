const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');const {chromium}=require('C:/Users/LOCAL_USER/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
(async()=>{const b=await chromium.connectOverCDP('http://127.0.0.1:65431'),c=b.contexts()[0],p=await c.newPage();
 await p.route('http://172.16.30.198:5800/**',r=>['GET','HEAD','OPTIONS'].includes(r.request().method())?r.continue():r.abort());
 await p.goto('http://172.16.30.198:5800/cart');await p.locator('main .commerce-empty,main [data-cy="cart-item"]').first().waitFor({state:'visible'});
 const items=p.locator('[data-cy="cart-item"]'),before=await items.count();assert.ok(before===0||before===1,'known initial failed test created at most one item');
 if(before===1){assert.equal(await items.locator('h2').innerText(),'بلک فرایدی');assert.equal(await items.locator('small').innerText(),'۱۲۰ بارکد در هر بسته');assert.equal(await items.locator('.cart-quantity-val').innerText(),'۲');await items.getByRole('button',{name:'حذف',exact:true}).click();}
 await p.locator('.commerce-empty').waitFor({state:'visible'});assert.equal(await items.count(),0);
 const result={at:new Date().toISOString(),source:'manual recovery in dedicated Cypress browser after cleanup-hook hydration defect',before,normalRemoveUsed:before===1,itemsAfter:0,emptyVisible:true,storageResetUsed:false,scope:'sole intended BlackFriday120/q2 item only'};
 fs.writeFileSync(path.resolve('QA/Evidence/Cart-Cypress/2026-11-17/handoff-chrome-startup-retry/recovery-cleanup.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));await p.close();process.exit();
})().catch(e=>{console.error(e);process.exit(1)});
