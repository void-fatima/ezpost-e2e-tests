const {chromium}=require('C:/Users/LOCAL_USER/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
(async()=>{const b=await chromium.connectOverCDP('http://127.0.0.1:64197');for(const p of b.contexts()[0].pages())console.log(JSON.stringify({url:p.url(),text:(await p.locator('body').innerText()).slice(0,5000)}));process.exit()})().catch(e=>{console.error(e);process.exit(1)});
