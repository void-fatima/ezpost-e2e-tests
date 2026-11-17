const fs=require('node:fs'),path=require('node:path');
const {chromium}=require('C:/Users/LOCAL_USER/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
const dir=path.join(__dirname,'chrome');const port=process.argv[2];
const specs=process.argv.slice(3).length?process.argv.slice(3):['cypress/e2e/ordering/controlled/quote-presentation.cy.js',path.relative(path.resolve(__dirname,'../../../..'),path.join(__dirname,'unwrapped.cy.js')).replaceAll('\\','/')];
(async()=>{
 const browser=await chromium.connectOverCDP('http://127.0.0.1:'+port);
 const page=browser.contexts().flatMap(c=>c.pages()).find(p=>p.url().includes('/__/#/specs'));
 if(!page)throw Error('Actual visible Cypress Chrome runner not found');
 const session={at:new Date().toISOString(),browserConnected:true,runnerUrl:page.url(),requestedSpecs:specs};
 fs.writeFileSync(path.join(dir,'runner-connected.json'),JSON.stringify(session,null,2));
 await page.bringToFront();await page.screenshot({path:path.join(dir,'runner-before.png')});
 const results=[],diagnostics=[];
 await page.exposeFunction('reviewDiagnostic',async event=>{
  diagnostics.push({...event,capturedAt:new Date().toISOString()});
  fs.writeFileSync(path.join(dir,'diagnostics-'+process.pid+'.json'),JSON.stringify(diagnostics,null,2));
  if(event.kind==='failure')await page.screenshot({path:path.join(dir,'failure-'+process.pid+'-'+Date.now()+'.png')});
 });
 for(const spec of specs){
  if(!page.url().endsWith('/specs'))await page.locator('a[href="#/specs"]').first().click();
  await page.locator('a[href="#/specs/runner?file='+spec+'"]').click();
  console.log('VISIBLE SPEC LOADED '+spec);
  await page.waitForFunction(spec=>window.Cypress?.spec?.relative.replaceAll('\\','/')===spec,spec);
  await page.evaluate(()=>{
   Cypress.on('fail',error=>{
    const win=Cypress.state('window'),doc=win?.document;
    const dom={url:win?.location.href,h1:doc?.querySelector('main h1')?.textContent,
     quantity:doc?.querySelector('main input[aria-label="تعداد بسته"]')?.value,
     summary:doc?.querySelector('main .summary-line-header')?.textContent,
     selectedTitles:[...doc?.querySelectorAll('main .package-options-grid button.is-selected .package-card-title')||[]].map(e=>e.textContent),
     total:doc?.querySelector('main .total-value')?.textContent};
    window.reviewDiagnostic({kind:'failure',error:error.message,stack:error.stack,dom});
    throw error;
   });
  });
  await page.waitForFunction(spec=>Cypress.spec.relative.replaceAll('\\','/')===spec&&Cypress.mocha?.getRunner()?.stats?.end&&Cypress.mocha.getRunner().state==='stopped',spec,{timeout:180000});
  const result=await page.evaluate(()=>{
   const runner=Cypress.mocha.getRunner(),tests=[];
   function visit(suite,parents){const prefix=suite.title?[...parents,suite.title]:parents;suite.tests.forEach(t=>tests.push({title:[...prefix,t.title],state:t.state,duration:t.duration,error:t.err?.message,stack:t.err?.stack}));suite.suites.forEach(s=>visit(s,prefix))}
   visit(runner.suite,[]);
   const routes=Cypress.state('routes')||{};
   const network=Object.values(routes).flatMap(route=>Object.values(route.requests||{}).map(q=>({method:q.request?.method,path:q.request?.url?new URL(q.request.url).pathname:null,input:q.request?.url?.includes('/quote')?q.request.body:undefined,status:q.response?.statusCode,error:q.error?.message})));
   const reporter=[...document.querySelectorAll('iframe')].find(f=>f.name==='Cypress Reporter');
   return {spec:Cypress.spec.relative,stats:runner.stats,tests,isInteractive:Cypress.config('isInteractive'),browser:Cypress.browser,runnerUrl:location.href,autUrl:Cypress.state('window')?.location.href,capturedAt:new Date().toISOString(),reporterText:reporter?.contentDocument?.body?.innerText,network,lifecycleObserver:Cypress.expose('quoteLifecycleObserver')!==false};
  });
  const tag=path.basename(spec)+'-'+Date.now();await page.screenshot({path:path.join(dir,tag+'.png')});result.screenshot=tag+'.png';
  fs.writeFileSync(path.join(dir,tag+'.json'),JSON.stringify(result,null,2));results.push(result);
  fs.writeFileSync(path.join(dir,'visible-results-'+process.pid+'.json'),JSON.stringify(results,null,2));
  console.log(JSON.stringify({spec:result.spec,stats:result.stats,interactive:result.isInteractive,errors:result.tests.filter(t=>t.state==='failed').map(t=>({title:t.title,error:t.error}))}));
 }
 process.exit(0); // Disconnect driver only. Leave actual visible Cypress/Chrome open.
})().catch(error=>{fs.writeFileSync(path.join(dir,'driver-error-'+Date.now()+'.txt'),error.stack);console.error(error);process.exit(1)});
