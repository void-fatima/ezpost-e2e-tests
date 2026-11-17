// Discovery only, not a Cypress test. All mutations remain blocked until their
// exact user-triggered cart request has been observed and narrowly permitted.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/LOCAL_USER/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
const dir=__dirname,origin='http://172.16.30.198:5800',events=[];
const runtime=path.join(dir,'runtime');fs.mkdirSync(runtime,{recursive:true});
process.env.TEMP=runtime;process.env.TMP=runtime;
const policy=path.join(runtime,'allowed-cart-requests.json');
if(!fs.existsSync(policy))fs.writeFileSync(policy,'[]\n');
function save(){fs.writeFileSync(path.join(dir,'network-events.json'),JSON.stringify(events,null,2));}
function safeBody(request){
 const body=request.postDataJSON();
 if(!body||typeof body!=='object')return{kind:typeof body};
 return Object.fromEntries(Object.entries(body).map(([key,value])=>[key,/^(?:product_id|package_id|quantity|item_id|product_slug)$/.test(key)?value:'[value omitted; schema only]']));
}
(async()=>{
 const context=await chromium.launchPersistentContext(path.join(runtime,'browser-profile'),{
  executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:false,
  viewport:{width:1366,height:900},args:['--remote-debugging-port=64197']
 });
 await context.route(origin+'/**',async route=>{
  const request=route.request(),pathname=new URL(request.url()).pathname;
  const readOnly=['GET','HEAD','OPTIONS'].includes(request.method())||(request.method()==='POST'&&pathname==='/api/v1/products/blackfri-01/quote');
  const allowed=JSON.parse(fs.readFileSync(policy,'utf8')).some(row=>row.method===request.method()&&row.path===pathname);
  if(!readOnly){events.push({at:new Date().toISOString(),kind:allowed?'allowed-owned-cart-request':'blocked-unverified-mutation',method:request.method(),path:pathname,input:safeBody(request)});save();}
  if(!readOnly&&!allowed){await route.abort();return;}
  await route.continue();
 });
 const page=context.pages()[0];page.on('response',response=>{
  const request=response.request(),pathname=new URL(response.url()).pathname;
  if(pathname.startsWith('/api/')){events.push({at:new Date().toISOString(),kind:'response',method:request.method(),path:pathname,status:response.status()});save();}
 });
 await page.screenshot({path:path.join(dir,'output-root-probe.png')});
 fs.writeFileSync(path.join(dir,'OUTPUT_ROOT.json'),JSON.stringify({at:new Date().toISOString(),root:dir,probe:path.join(dir,'output-root-probe.png'),temporaryRoot:runtime,profile:path.join(runtime,'browser-profile'),verifiedBeforeApplicationVisit:true},null,2));
 const session=page.waitForResponse(response=>new URL(response.url()).pathname==='/api/v1/auth/session');
 await page.goto(origin+'/cart');const sessionBody=await(await session).json();
 assert.equal(sessionBody.user,null,'must be a fresh unauthenticated guest');
 await page.locator('main .commerce-empty').waitFor({state:'visible'});
 fs.writeFileSync(path.join(dir,'initial-empty.json'),JSON.stringify({at:new Date().toISOString(),url:page.url(),guestConfirmed:true,mainText:await page.locator('main').innerText(),cartStartsEmpty:true},null,2));
 const quote=page.waitForResponse(response=>new URL(response.url()).pathname==='/api/v1/products/blackfri-01/quote');
 await page.goto(origin+'/products/blackfri-01');assert.equal((await quote).status(),200);
 await page.locator('[data-cy="add-to-cart"]').waitFor({state:'visible'});
 await page.locator('main input[aria-label="تعداد بسته"]').focus();
 const q2=page.waitForResponse(response=>new URL(response.url()).pathname.endsWith('/quote')&&response.request().postDataJSON()?.quantity===2);
 await page.keyboard.press('ArrowUp');await page.keyboard.press('Tab');await q2;
 const alternate=page.locator('main .package-options-grid button').filter({hasText:'بسته ۲۴۰ لیبلی'});assert.equal(await alternate.count(),1);
 const variant=page.waitForResponse(response=>new URL(response.url()).pathname.endsWith('/quote')&&response.request().postDataJSON()?.package_id===50);
 await alternate.click();await variant;
 await page.locator('[data-cy="add-to-cart"]').waitFor({state:'visible'});
 await page.waitForFunction(()=>!document.querySelector('[data-cy="add-to-cart"]').disabled);
 fs.writeFileSync(path.join(dir,'product-before-add.json'),JSON.stringify({at:new Date().toISOString(),url:page.url(),text:await page.locator('main').innerText()},null,2));
 await page.locator('[data-cy="add-to-cart"]').click();
 await page.waitForFunction(()=>location.pathname==='/cart'||!document.querySelector('[data-cy="add-to-cart"]')?.disabled);
 if(new URL(page.url()).pathname!=='/cart'){const cart=page.locator('main a[href="/cart"]');assert.equal(await cart.count(),1);await cart.click();}
 await page.waitForURL(origin+'/cart');await page.locator('main h1').waitFor({state:'visible'});
 await page.screenshot({path:path.join(dir,'after-first-add.png')});
 const snapshot=await page.locator('main').evaluate(main=>({url:location.href,text:main.innerText,html:main.outerHTML,
  controls:[...main.querySelectorAll('button,input,a')].map(e=>({tag:e.tagName,text:e.textContent.trim(),type:e.getAttribute('type'),ariaLabel:e.getAttribute('aria-label'),dataCy:e.getAttribute('data-cy'),href:e.getAttribute('href'),value:e.tagName==='INPUT'&&e.type==='number'?e.value:undefined,disabled:e.disabled,visible:e.getClientRects().length>0}))}));
 fs.writeFileSync(path.join(dir,'after-first-add.json'),JSON.stringify({at:new Date().toISOString(),kind:'discovery only; no pass claim',snapshot,blockedRequests:events.filter(e=>e.kind==='blocked-unverified-mutation')},null,2));
 console.log(JSON.stringify({discoveryReady:true,debugPort:64197,url:page.url(),text:snapshot.text,controls:snapshot.controls,blocked:events.filter(e=>e.kind==='blocked-unverified-mutation')}));
 // Keep this dedicated isolated browser alive for adaptive discovery + UI cleanup.
 await new Promise(()=>{});
})().catch(error=>{fs.writeFileSync(path.join(dir,'discovery-error.txt'),error.stack);console.error(error);process.exit(1)});
