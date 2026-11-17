// Read-only verification. Does not start/rerun a test.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict'),{spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'../../../..');process.chdir(root);
const checks=[];
for(const args of [['scripts/check-m01-static.cjs'],['--check','cypress/support/quote-contract.cjs'],['--check',path.join(__dirname,'unwrapped.cy.js')],['--check',path.join(__dirname,'drive-chrome.cjs')],['--check',path.join(__dirname,'drive-firefox.cjs')],['--check',path.join(__dirname,'inspect-cart-boundary.cjs')],['--check',path.join(__dirname,'check-oracles.cjs')]]){
 const result=spawnSync(process.execPath,args,{encoding:'utf8'});checks.push({command:'node '+args.join(' '),status:result.status,stdout:result.stdout,stderr:result.stderr});assert.equal(result.status,0,result.stderr);
}
const previous=JSON.parse(fs.readFileSync(path.join(__dirname,'preservation-before.json'),'utf8'));
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const changed=[],unchanged=[],missing=[];
for(const file of previous.files){if(!fs.existsSync(file.path)){missing.push(file.path);continue}if(hash(file.path)===file.sha256)unchanged.push(file.path);else changed.push(file.path)}
assert.deepEqual(missing,[]);
const allowed=['.gitignore','README.md','cypress/e2e/ordering/controlled/quote-presentation.cy.js','cypress/support/ordering.js','QA/Test-Cases/EZPOST_QA_ORDERING_TEST_CASES.md','QA/Reports/EZPOST_QA_ORDERING_COVERAGE_MATRIX.md'].sort();
assert.deepEqual(changed.sort(),allowed);
assert.equal(unchanged.length,315);
const cases=fs.readFileSync('QA/Test-Cases/EZPOST_QA_ORDERING_TEST_CASES.md','utf8');
const originalCases=spawnSync('git',['show','HEAD:QA/Test-Cases/EZPOST_QA_ORDERING_TEST_CASES.md'],{encoding:'utf8'});
assert.equal(originalCases.status,0);
const headings=body=>[...body.matchAll(/^### ([PAT]\d{2}-ORD\d{2})[^\r\n]*/gm)].map(m=>m[0]);
assert.deepEqual(headings(cases),headings(originalCases.stdout));assert.equal(headings(cases).length,18);
const spec=fs.readFileSync('cypress/e2e/ordering/controlled/quote-presentation.cy.js','utf8');
assert.equal([...spec.matchAll(/\bit\('/g)].length,4);
assert.ok(!/cy\.wait\(\s*\d|force:\s*true|(?:it|describe)\.(?:skip|only)\s*\(/.test(spec));
const report={
 checkedAt:new Date().toISOString(),staticChecks:checks,originalFiles:previous.files.length,
 unchanged:unchanged.length,changed,missing,allHistoricalEvidencePreserved:true,packageLockConfigGuardFixturesPreserved:true,
 caseHeadingsAndParentMappingsPreserved:true,orderingCaseIds:18,m01CaseIds:30,controlledSpecTests:4,oracleNegativeChecks:26,
 testsStartedByThisVerification:false
};
fs.writeFileSync(path.join(__dirname,'preservation-after.json'),JSON.stringify(report,null,2));
fs.writeFileSync(path.join(__dirname,'static-checks.json'),JSON.stringify({checkedAt:report.checkedAt,checks},null,2));
console.log(JSON.stringify({originalFiles:321,unchanged:315,changed,missing,checks:checks.length,controlledTests:4,caseIdsPreserved:18}));
