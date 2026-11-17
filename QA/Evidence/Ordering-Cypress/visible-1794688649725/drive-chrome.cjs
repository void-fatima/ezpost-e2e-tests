const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('C:/Users/LOCAL_USER/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
const out = path.join(__dirname, 'chrome');
const specs = process.argv.slice(2).length ? process.argv.slice(2) : ['browser/auth-entry.cy.js','browser/cart-recovery.cy.js','browser/product-selection.cy.js','controlled/quote-presentation.cy.js'];
(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:58367');
  const page = browser.contexts().flatMap(c=>c.pages()).find(p=>p.url().includes('/__/#/specs'));
  if (!page) throw Error('Actual Cypress Chrome runner not found');
  const results = [];
  const diagnosticEvents=[];
  await page.exposeFunction('orderingDiagnostic', async event=>{
    diagnosticEvents.push({...event,capturedAt:new Date().toISOString()});
    fs.writeFileSync(path.join(out,'diagnostics-'+process.pid+'.json'),JSON.stringify(diagnosticEvents,null,2));
    if(event.kind==='failure') await page.screenshot({path:path.join(out,'failure-'+process.pid+'-'+Date.now()+'.png')});
  });
  let network = [];
  page.on('response', response => {
    const request=response.request();
    const url = new URL(response.url());
    if (!url.pathname.startsWith('/api/')) return;
    network.push({at:new Date().toISOString(),method:request.method(),path:url.pathname,status:response.status()});
  });
  page.on('requestfailed',request=>{
    const url=new URL(request.url());
    if(url.pathname.startsWith('/api/'))network.push({at:new Date().toISOString(),method:request.method(),path:url.pathname,failure:request.failure()?.errorText});
  });
  await page.screenshot({path:path.join(out,'runner-before.png')});
  for (const spec of specs) {
    network=[];
    if (!page.url().endsWith('/specs')) await page.locator('a[href="#/specs"]').first().click();
    const relative='cypress/e2e/ordering/'+spec;
    await page.locator('a[href="#/specs/runner?file='+relative+'"]').click();
    console.log('VISIBLE SPEC LOADED: '+relative);
    await page.waitForFunction(relative=>window.Cypress?.spec?.relative.replaceAll('\\','/')===relative,relative);
    await page.evaluate(()=>{
      const events=[];
      Cypress.on('window:before:load',win=>{
        for(const type of ['keydown','keypress','keyup','click'])win.addEventListener(type,event=>{
          const el=event.target;
          events.push({type,key:event.key,code:event.code,trusted:event.isTrusted,target:el?.tagName,label:el?.getAttribute?.('aria-label'),focused:win.document.activeElement===el,defaultPrevented:event.defaultPrevented});
        },true);
      });
      Cypress.on('fail',error=>{
        let autUrl;try{autUrl=Cypress.state('window')?.location.href;}catch{}
        window.orderingDiagnostic({kind:'failure',error:error.message,stack:error.stack,autUrl,events:events.splice(0)});
        throw error;
      });
      Cypress.on('test:after:run',test=>{window.orderingDiagnostic({kind:'test-end',title:test.title,state:test.state,error:test.err?.message,events:events.splice(0)});});
    });
    await page.waitForFunction(relative=>{
      if(!window.Cypress?.mocha || !Cypress.spec) return false;
      const runner=Cypress.mocha.getRunner();
      return Cypress.spec.relative.replaceAll('\\','/')===relative && runner.stats?.end && runner.state==='stopped';
    },relative,{timeout:180000});
    const result=await page.evaluate(()=>{
      const runner=Cypress.mocha.getRunner(), tests=[];
      function visit(suite,parents){const prefix=suite.title?[...parents,suite.title]:parents;
        suite.tests.forEach(t=>tests.push({title:[...prefix,t.title],state:t.state,duration:t.duration,error:t.err?.message,stack:t.err?.stack}));
        suite.suites.forEach(s=>visit(s,prefix));}
      visit(runner.suite,[]);
      let autUrl;try{autUrl=Cypress.state('window')?.location.href;}catch{}
      return {spec:Cypress.spec.relative,stats:runner.stats,tests,isInteractive:Cypress.config('isInteractive'),browser:Cypress.browser,runnerUrl:location.href,autUrl,capturedAt:new Date().toISOString()};
    });
    const reporter=page.frames().find(f=>f.name()==='Cypress Reporter');
    result.reporterText=reporter?await reporter.locator('body').innerText():null;
    result.network=network;
    const tag=spec.replaceAll('/','-')+'-'+Date.now();
    await page.screenshot({path:path.join(out,tag+'.png')});
    result.screenshot=tag+'.png';
    fs.writeFileSync(path.join(out,tag+'.json'),JSON.stringify(result,null,2));
    results.push(result);
    fs.writeFileSync(path.join(out,'visible-results-'+process.pid+'.json'),JSON.stringify(results,null,2));
    console.log(JSON.stringify({spec,stats:result.stats,interactive:result.isInteractive,errors:result.tests.filter(t=>t.state==='failed').map(t=>({title:t.title,error:t.error}))}));
  }
  // Detach this client only; keep the visible Cypress and Chrome windows open.
  process.exit(0);
})().catch(error=>{fs.writeFileSync(path.join(out,'driver-error-'+Date.now()+'.txt'),error.stack);console.error(error);process.exit(1);});
