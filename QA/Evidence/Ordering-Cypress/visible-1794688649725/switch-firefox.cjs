const fs=require('node:fs'),path=require('node:path');
const {chromium}=require('C:/Users/LOCAL_USER/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
(async()=>{fs.mkdirSync(path.join(__dirname,'firefox'),{recursive:true});const b=await chromium.connectOverCDP('http://127.0.0.1:58367');const p=b.contexts()[0].pages().find(p=>p.url().includes('/__/'));
await p.getByText('Firefox',{exact:true}).click();
fs.writeFileSync(path.join(__dirname,'firefox','selection.json'),JSON.stringify({at:new Date().toISOString(),action:'Actual Cypress open browser picker: Firefox Version 160 clicked; launch is not execution'},null,2));
process.exit(0);})().catch(e=>{console.error(e);process.exit(1)});
