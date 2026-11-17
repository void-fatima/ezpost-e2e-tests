// Verify recorded execution and preservation; this never launches Cypress.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../../../..');
const read=p=>JSON.parse(fs.readFileSync(path.join(__dirname,p),'utf8'));
const chrome=[...read('chrome/visible-results-8220.json').slice(0,2),...read('chrome/visible-results-4248.json')];
const firefox=[...read('firefox/visible-results.json').slice(0,3),...read('firefox/visible-results-11748.json')];
const summary={};
for(const [browser,results]of Object.entries({chrome,firefox})){
 assert.equal(results.length,4);const tests=results.flatMap(r=>r.tests);assert.equal(tests.length,24);
 assert.equal(new Set(tests.map(t=>t.title.at(-1).match(/^([A-Z]\d{2}-ORD\d{2})/)[1])).size,18);
 for(const result of results){assert.equal(result.isInteractive,true);assert.equal(result.browser.name,browser);assert.equal(result.browser.isHeaded,true);assert.equal(result.browser.isHeadless,false);assert.ok(result.stats.end);}
 const live=results.filter(r=>r.spec.replaceAll('\\','/').includes('/browser/')).flatMap(r=>r.tests);
 const controlled=results.filter(r=>r.spec.replaceAll('\\','/').includes('/controlled/')).flatMap(r=>r.tests);
 assert.equal(live.length,20);assert.equal(controlled.length,4);assert.ok(live.every(t=>t.state==='passed'));
 assert.deepEqual(controlled.filter(t=>t.state==='failed').map(t=>t.title.at(-1).split(' ')[0]),['P10-ORD01','P10-ORD02']);
 summary[browser]={version:results[0].browser.version,live:{passed:20,failed:0},controlled:{passed:2,failed:2},total:{passed:22,failed:2,pending:0,skipped:0,notRun:0}};
}
const before=read('preservation-before.json'),after={},changed=[];
const allowed=new Set(['cypress/support/ordering.js','cypress/e2e/ordering/browser/product-selection.cy.js','cypress/e2e/ordering/controlled/quote-presentation.cy.js']);
for(const [file,hash]of Object.entries(before)){const current=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex');after[file]=current;if(current!==hash){assert.ok(allowed.has(file),'Unrelated modification: '+file);changed.push(file);}}
assert.equal(changed.length,3);
fs.writeFileSync(path.join(__dirname,'preservation-after.json'),JSON.stringify({verifiedAt:new Date().toISOString(),baselineFiles:Object.keys(before).length,changedFiles:changed,unchangedFiles:Object.keys(before).length-changed.length,sha256:after},null,2));
const report=fs.readFileSync(path.join(root,'QA/Reports/EZPOST_QA_ORDERING_EXECUTION_2026-11-14.md'),'utf8');
for(const table of report.matchAll(/(?:^\|.*\|\r?\n)+/gm)){const widths=table[0].trim().split(/\r?\n/).map(line=>line.split('|').length);assert.ok(widths.every(n=>n===widths[0]),'Report Markdown table width');}
for(const result of chrome)assert.ok(fs.existsSync(path.join(__dirname,'chrome',result.screenshot)));
for(const result of firefox)assert.ok(fs.existsSync(path.join(__dirname,'firefox',result.screenshot)));
const output={verifiedAt:new Date().toISOString(),status:'RECORDED RESULTS AND PRESERVATION VERIFIED; NO TEST EXECUTION BY THIS CHECK',finalResults:summary,baselineFiles:Object.keys(before).length,changedFiles:changed,reportTableWidths:true};
fs.writeFileSync(path.join(__dirname,'final-verification.json'),JSON.stringify(output,null,2));
console.log(JSON.stringify(output,null,2));
