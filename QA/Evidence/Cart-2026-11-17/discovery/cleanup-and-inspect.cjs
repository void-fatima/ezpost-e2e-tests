const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/LOCAL_USER/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
(async()=>{
 const browser=await chromium.connectOverCDP('http://127.0.0.1:64197');
 const page=browser.contexts()[0].pages().find(p=>new URL(p.url()).pathname==='/cart');
 assert.ok(page,'dedicated owned cart page');
 const item=page.locator('[data-cy="cart-item"]');assert.equal(await item.count(),1);
 assert.equal(await item.locator('h2').innerText(),'بلک فرایدی');
 assert.equal(await item.locator('.cart-quantity-val').innerText(),'۲');
 assert.equal(await item.locator('.cart-item__info small').innerText(),'۲۴۰ بارکد در هر بسته');
 await item.getByRole('button',{name:'حذف',exact:true}).click();
 await page.locator('main .commerce-empty').waitFor({state:'visible'});
 assert.equal(await page.locator('[data-cy="cart-item"]').count(),0);
 fs.writeFileSync(path.join(__dirname,'cleanup-first-owned-item.json'),JSON.stringify({at:new Date().toISOString(),method:'normal visible Remove on the single verified suite-owned line',expectedProduct:'blackfri-01',packageId:50,quantity:2,itemsAfter:0,emptyVisible:true,storageResetUsed:false},null,2));
 await page.setViewportSize({width:390,height:844});
 const quote=page.waitForResponse(r=>new URL(r.url()).pathname.endsWith('/quote'));
 await page.goto('http://172.16.30.198:5800/products/blackfri-01');await quote;
 await page.waitForFunction(()=>!document.querySelector('main .product-mobile-bar button')?.disabled);
 const mobile=await page.locator('main').evaluate(main=>({
  text:main.innerText,buttons:[...main.querySelectorAll('button')].filter(e=>e.textContent.includes('افزودن به سبد خرید')).map(e=>({text:e.textContent.trim(),className:e.className,dataCy:e.getAttribute('data-cy'),visible:e.getClientRects().length>0,disabled:e.disabled}))
 }));
 fs.writeFileSync(path.join(__dirname,'mobile-add-control.json'),JSON.stringify({at:new Date().toISOString(),viewport:{width:390,height:844},mobile},null,2));
 await page.setViewportSize({width:1366,height:900});await page.goto('http://172.16.30.198:5800/shop');
 await page.locator('main a[href^="/products/"]').first().waitFor({state:'visible'});
 const catalog=await page.locator('main a[href^="/products/"]').evaluateAll(links=>links.map(a=>({href:a.getAttribute('href'),text:a.innerText.trim()})));
 fs.writeFileSync(path.join(__dirname,'catalog-product-links.json'),JSON.stringify({at:new Date().toISOString(),catalog},null,2));
 console.log(JSON.stringify({cleanupVerified:true,mobile:mobile.buttons,catalog}));
 process.exit(0); // Detach; dedicated discovery browser remains available.
})().catch(error=>{console.error(error);process.exit(1)});
