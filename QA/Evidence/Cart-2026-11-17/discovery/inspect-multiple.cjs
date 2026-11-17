const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');const {chromium}=require('C:/Users/LOCAL_USER/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
(async()=>{const b=await chromium.connectOverCDP('http://127.0.0.1:64197'),p=b.contexts()[0].pages().find(p=>p.url().includes('/cart'));
 assert.equal(await p.locator('[data-cy="cart-item"]').count(),0);
 async function add(slug,packTitle,quantity){const response=p.waitForResponse(r=>new URL(r.url()).pathname===`/api/v1/products/${slug}/quote`);await p.goto(`http://172.16.30.198:5800/products/${slug}`);await response;if(packTitle){const changed=p.waitForResponse(r=>new URL(r.url()).pathname.endsWith('/quote'));await p.getByRole('button',{name:new RegExp(packTitle)}).click();await changed;}for(let i=1;i<quantity;i++){const changed=p.waitForResponse(r=>new URL(r.url()).pathname.endsWith('/quote'));await p.locator('main button[aria-label="افزایش تعداد بسته"]').click();await changed;}await p.locator('[data-cy="add-to-cart"]').click();await p.waitForURL('**/cart');await p.locator('[data-cy="cart-item"]').first().waitFor({state:'visible'});}
 await add('blackfri-01',null,2);await add('simple',null,1);
 const differentProducts=await p.locator('main').evaluate(e=>({text:e.innerText,html:e.outerHTML}));
 for(let i=0;i<2;i++)await p.locator('[data-cy="cart-item"]').first().getByRole('button',{name:'حذف',exact:true}).click();await p.locator('.commerce-empty').waitFor({state:'visible'});
 await add('blackfri-01',null,2);await add('blackfri-01','بسته ۲۴۰ لیبلی',1);
 const differentPackages=await p.locator('main').evaluate(e=>({text:e.innerText,html:e.outerHTML}));
 for(let i=0;i<2;i++)await p.locator('[data-cy="cart-item"]').first().getByRole('button',{name:'حذف',exact:true}).click();await p.locator('.commerce-empty').waitFor({state:'visible'});
 fs.writeFileSync(path.join(__dirname,'multiple-configurations.json'),JSON.stringify({at:new Date().toISOString(),differentProducts,differentPackages,cleanupVerified:true},null,2));console.log(JSON.stringify({differentProducts:differentProducts.text,differentPackages:differentPackages.text,cleanupVerified:true}));process.exit();
})().catch(e=>{console.error(e);process.exit(1)});
