// Read-only discovery; not Cypress execution and not populated-cart coverage.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/LOCAL_USER/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
const dir=path.join(__dirname,'inspection');fs.mkdirSync(path.join(dir,'runtime'),{recursive:true});
process.env.TEMP=path.join(dir,'runtime');process.env.TMP=path.join(dir,'runtime');
const origin='http://172.16.30.198:5800';
(async()=>{
 const context=await chromium.launchPersistentContext(path.join(dir,'browser-profile'),{
  executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:false,viewport:{width:1366,height:900}
 });
 const blocked=[],network=[];
 await context.route(origin+'/**',async route=>{
  const request=route.request(),url=new URL(request.url());
  const allowed=['GET','HEAD','OPTIONS'].includes(request.method())||
   (request.method()==='POST'&&url.pathname==='/api/v1/products/blackfri-01/quote');
  if(!allowed){blocked.push({method:request.method(),path:url.pathname});await route.abort();return}
  await route.continue();
 });
 const page=context.pages()[0];
 page.on('response',response=>{
  const request=response.request(),url=new URL(response.url());
  if(url.pathname.startsWith('/api/'))network.push({method:request.method(),path:url.pathname,status:response.status()});
 });
 const quote=page.waitForResponse(response=>new URL(response.url()).pathname==='/api/v1/products/blackfri-01/quote');
 await page.goto(origin+'/products/blackfri-01');
 assert.equal((await quote).status(),200);
 await page.getByRole('heading',{name:'بلک فرایدی',exact:true}).waitFor();
 await page.getByRole('button',{name:'افزودن به سبد خرید',exact:true}).waitFor({state:'visible'});
 const product=await page.locator('main').evaluate(main=>({
  url:location.href,h1:main.querySelector('h1')?.textContent,
  quantity:main.querySelector('input[aria-label="تعداد بسته"]')?.value,
  summary:main.querySelector('.summary-line-header')?.textContent,
  addControls:[...main.querySelectorAll('button')].filter(e=>e.textContent.includes('افزودن به سبد خرید')).map(e=>({
   text:e.textContent.trim(),type:e.type,disabled:e.disabled,visible:e.getClientRects().length>0,
   attributes:Object.fromEntries([...e.attributes].map(a=>[a.name,a.value]))
  })),
  cartLinks:[...main.querySelectorAll('a[href="/cart"]')].map(e=>({text:e.textContent.trim(),title:e.title,ariaLabel:e.getAttribute('aria-label'),visible:e.getClientRects().length>0}))
 }));
 await page.screenshot({path:path.join(dir,'product-add-not-activated.png')});
 const link=page.locator('main a[href="/cart"]');assert.equal(await link.count(),1);
 await link.click();await page.waitForURL(origin+'/cart');
 await page.locator('main .commerce-empty').waitFor({state:'visible'});
 const cart=await page.locator('main').evaluate(main=>({
  url:location.href,h1:main.querySelector('h1')?.textContent,emptyHeading:main.querySelector('.commerce-empty h2')?.textContent,
  recovery:[...main.querySelectorAll('.commerce-empty a')].map(a=>({text:a.textContent.trim(),href:a.getAttribute('href')}))
 }));
 await page.screenshot({path:path.join(dir,'empty-cart-after-navigation.png')});
 assert.deepEqual(blocked,[],'no application mutation should be attempted');
 fs.writeFileSync(path.join(dir,'cart-boundary.json'),JSON.stringify({
  inspectedAt:new Date().toISOString(),kind:'read-only hydrated UI discovery, not Cypress and not an add',
  evidenceRoot:dir,product,cart,network,blockedMutations:blocked,addActivated:false,populatedCartObserved:false,
  limitations:['Navigating to /cart does not add the selection','No authorized disposable cart or supported cleanup supplied','Populated line/edit/remove controls and mutation contract remain unobserved']
 },null,2));
 await context.close();console.log(JSON.stringify({product:product.h1,addActivated:false,cart:cart.url,emptyHeading:cart.emptyHeading,blockedMutations:blocked.length}));
})().catch(error=>{fs.writeFileSync(path.join(dir,'inspection-error.txt'),error.stack);console.error(error);process.exit(1)});
