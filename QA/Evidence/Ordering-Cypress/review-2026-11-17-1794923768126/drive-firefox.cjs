// Select existing specs in the actual visible Cypress open Firefox runner.
const {RDP}=require('../visible-1794688649725/firefox-rdp.cjs');
const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const out=path.join(__dirname,'firefox');
const specs=process.argv.slice(2).length?process.argv.slice(2):["controlled/quote-presentation.cy.js","QA/Evidence/Ordering-Cypress/review-2026-11-17-1794923768126/unwrapped.cy.js"];
const pause=ms=>new Promise(r=>setTimeout(r,ms));
function screenshot(name){execFileSync('powershell.exe',['-NoProfile','-ExecutionPolicy','Bypass','-File',path.join(__dirname,'capture-runner.ps1'),'-OutputFile',path.join(out,name),'-RunnerProcessId','3912'],{windowsHide:true});}
(async()=>{
 const r=new RDP;const connection=await r.init();fs.writeFileSync(path.join(out,'connection.json'),JSON.stringify(connection,null,2));
 screenshot('runner-before.png');
 const results=[];
 for(const spec of specs){
  const relative=spec.startsWith('QA/')?spec:'cypress/e2e/ordering/'+spec;
  await r.evaluate(`(()=>{const a=document.querySelector('a[href="#/specs"]');if(location.hash!=='#/specs')a.click();return true})()`);
  await wait(async()=>await r.evaluate(`!!document.querySelector('a[href="#/specs/runner?file=${relative}"]')`));
  await r.evaluate(`document.querySelector('a[href="#/specs/runner?file=${relative}"]').click();true`);
  console.log('VISIBLE FIREFOX SPEC LOADED: '+relative);
  await wait(async()=>await r.evaluate(`!!(window.Cypress?.spec?.relative.replaceAll('\\\\','/')===${JSON.stringify(relative)})`));
  await r.evaluate(`(()=>{window.orderingDiagnostics=[];window.reviewNetwork=[];Cypress.on('test:after:run',test=>{window.reviewNetwork.push({title:test.title,state:test.state,requests:Object.values(Cypress.state('routes')||{}).flatMap(route=>Object.values(route.requests||{}).map(q=>({method:q.request?.method,path:q.request?.url?new URL(q.request.url).pathname:null,input:q.request?.url?.includes('/quote')?q.request.body:undefined,status:q.response?.statusCode,error:q.error?.message})))})});Cypress.on('fail',error=>{let autUrl;try{autUrl=Cypress.state('window')?.location.href}catch{};window.orderingDiagnostics.push({error:error.message,stack:error.stack,autUrl,at:new Date().toISOString()});throw error});return true})()`);
  let screenshots=0;
  await wait(async()=>{
   const state=JSON.parse(await r.evaluate(`JSON.stringify({failures:window.orderingDiagnostics||[],done:!!(Cypress.mocha?.getRunner()?.stats?.end&&Cypress.mocha.getRunner().state==='stopped')})`));
  if(state.failures.length>screenshots){screenshots=state.failures.length;fs.writeFileSync(path.join(out,path.basename(relative)+'-diagnostics-'+process.pid+'.json'),JSON.stringify(state.failures,null,2));screenshot('failure-'+process.pid+'-'+path.basename(relative)+'-'+screenshots+'.png');}
   return state.done;
  },180000);
  const result=JSON.parse(await r.evaluate(`JSON.stringify((()=>{const runner=Cypress.mocha.getRunner(),tests=[];function visit(suite,parents){const prefix=suite.title?[...parents,suite.title]:parents;suite.tests.forEach(t=>tests.push({title:[...prefix,t.title],state:t.state,duration:t.duration,error:t.err?.message,stack:t.err?.stack}));suite.suites.forEach(s=>visit(s,prefix))}visit(runner.suite,[]);let autUrl;try{autUrl=Cypress.state('window')?.location.href}catch{};const reporter=[...document.querySelectorAll('iframe')].find(f=>f.name==='Cypress Reporter');const routes=Cypress.state('routes')||{};const network=Object.values(routes).flatMap(route=>Object.values(route.requests||{}).map(q=>({method:q.request?.method,path:q.request?.url?new URL(q.request.url).pathname:null,input:q.request?.url?.includes('/quote')?q.request.body:undefined,status:q.response?.statusCode,error:q.error?.message})));return {spec:Cypress.spec.relative,stats:runner.stats,tests,isInteractive:Cypress.config('isInteractive'),browser:Cypress.browser,runnerUrl:location.href,autUrl,capturedAt:new Date().toISOString(),reporterText:reporter?.contentDocument?.body?.innerText,network,diagnostics:window.orderingDiagnostics,testNetwork:window.reviewNetwork,lifecycleObserver:Cypress.expose('quoteLifecycleObserver')!==false}})())`));
  const tag=path.basename(relative)+'-'+Date.now();screenshot(tag+'.png');result.screenshot=tag+'.png';
  fs.writeFileSync(path.join(out,tag+'.json'),JSON.stringify(result,null,2));results.push(result);fs.writeFileSync(path.join(out,'visible-results-'+process.pid+'.json'),JSON.stringify(results,null,2));
  console.log(JSON.stringify({spec,stats:result.stats,browser:result.browser,errors:result.tests.filter(t=>t.state==='failed').map(t=>({title:t.title,error:t.error}))}));
 }
 r.sock.end();process.exit(0); // Keep Cypress + Firefox open.
 async function wait(condition,timeout=30000){const end=Date.now()+timeout;while(Date.now()<end){if(await condition())return;await pause(250)}throw Error('Cypress UI completion condition timed out');}
})().catch(e=>{fs.writeFileSync(path.join(out,'driver-error-'+Date.now()+'.txt'),e.stack);console.error(e);process.exit(1)});
