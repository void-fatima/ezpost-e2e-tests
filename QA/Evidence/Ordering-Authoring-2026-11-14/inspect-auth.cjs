// Safe no-submit form inspection. Never activates the SMS control.
const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require('C:/Users/LOCAL_USER/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
process.env.TEMP=path.join(__dirname,'runtime');
process.env.TMP=process.env.TEMP;
(async()=>{
  const browser=await chromium.launch({channel:'chrome',headless:false,downloadsPath:path.join(__dirname,'downloads'),tracesDir:path.join(__dirname,'traces'),env:{...process.env,TEMP:path.join(__dirname,'runtime'),TMP:path.join(__dirname,'runtime')}});
  const evidence={capturedAt:new Date().toISOString(),kind:'Read-only native form observation, not Cypress execution or approved mobile grammar',viewports:[],blocked:[]};
  try{
    const context=await browser.newContext({acceptDownloads:false});
    await context.route('**/*',route=>{
      const req=route.request();
      if(!['GET','HEAD','OPTIONS'].includes(req.method())) { evidence.blocked.push({method:req.method(),url:req.url()});return route.abort(); }
      return route.continue();
    });
    const page=await context.newPage();
    for(const width of [1366,390]){
      await page.setViewportSize({width,height:width===390?844:900});
      await page.goto('http://172.16.30.198:5800/login');
      const input=page.locator('#mobile');await input.waitFor();
      const row={width,values:[]};
      async function snapshot(label){row.values.push({label,...await input.evaluate(el=>({value:el.value,valueMissing:el.validity.valueMissing,patternMismatch:el.validity.patternMismatch,valid:el.checkValidity(),formValid:el.form.checkValidity()}))});}
      await snapshot('empty');
      for(const value of ['abcdefghijk','09','abcdefghijkl']){
        await input.fill('');await input.pressSequentially(value);await snapshot(value);
      }
      await input.fill('');await input.focus();await page.keyboard.press('Tab');
      row.tabFocus=await page.evaluate(()=>({tag:document.activeElement.tagName,type:document.activeElement.getAttribute('type'),text:document.activeElement.textContent.trim(),pathname:location.pathname}));
      evidence.viewports.push(row);
    }
    await context.close();
  }finally{
    fs.writeFileSync(path.join(__dirname,'auth-native-observation.json'),JSON.stringify(evidence,null,2));
    await browser.close();
  }
})().catch(err=>{console.error(err);process.exitCode=1;});
