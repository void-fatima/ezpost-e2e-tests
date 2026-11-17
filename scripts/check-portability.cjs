// Repository portability preflight only. No browser, app requests or file writes.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const git = args => execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

assert.equal(fs.realpathSync(git(['rev-parse', '--show-toplevel']).trim()), fs.realpathSync(root),
  'Run this from a standalone EZPost Git clone, not a parent repository');
assert.equal(git(['rev-parse', '--is-shallow-repository']).trim(), 'false',
  'Full Git history is required; use a full clone or git fetch --unshallow');
const baselines = ['da9d8ddd21e4c90993796529cc1b06276febbe66',
  '1cbea9d94cab1a48c62b95aa69e3b2f3f2ff0977',
  '3c8fe2033745ba831ecc11455775777c371b03bc', 'bfafd21b77ebdd947c9860168e4461f8359ead7c'];
for (const commit of baselines) git(['cat-file', '-e', commit + '^{commit}']);
assert.equal(git(['config', '--get', 'core.autocrlf']).trim(), 'false',
  'Clone with -c core.autocrlf=false; historical source checks compare exact bytes');

const required = ['package.json', 'package-lock.json', '.node-version', 'README.md',
  'QA/Reports/EZPOST_QA_CONTINUATION_GUIDE.md', 'QA/Reports/REPORT_INDEX.md',
  'QA/Planning/EZPOST_QA_PHASE1_REVIEW.md',
  'QA/Test-Cases/EZPOST_QA_PHASE2_M01_TEST_CASES.md',
  'QA/Test-Cases/EZPOST_QA_CUSTOMER_FORM_TEST_CASES.md',
  'QA/Reports/EZPOST_QA_CUSTOMER_FORM_EXECUTION_2026-11-17.md',
  'scripts/publication-sanitize.cjs', 'scripts/open-ordering.cjs',
  'scripts/open-cart-regression.cjs', 'scripts/open-authenticated-session.cjs',
  'scripts/open-authenticated-checkout.cjs'];
for (const file of required) assert.ok(fs.existsSync(path.join(root, file)), 'Missing ' + file);
const pkg = JSON.parse(read('package.json')), lock = JSON.parse(read('package-lock.json'));
assert.equal(pkg.devDependencies.cypress, '16.2.1');
assert.equal(lock.packages[''].devDependencies.cypress, pkg.devDependencies.cypress);
assert.equal(lock.packages['node_modules/cypress'].version, pkg.devDependencies.cypress);

const tracked = git(['ls-files', '-z']).split('\0').filter(Boolean);
for (const file of tracked) {
  assert.ok(fs.existsSync(path.join(root, file)), 'Missing tracked file: ' + file);
  assert.ok(!/(?:^|\/)(?:node_modules|runtime|browser-profile|browser-profiles|\.publication|\.git)(?:\/|$)/.test(file),
    'Private/generated path is tracked: ' + file);
  assert.ok(!/(?:^|\/)\.env(?:\.|$)/.test(file), 'Environment credentials must remain local');
}

const privatePaths = ['QA/Evidence/M01-Cypress/interactive-portability/runtime/profile',
  'QA/Evidence/Ordering-Cypress/interactive-live-portability/runtime/profile',
  'QA/Evidence/Ordering-Cypress/interactive-controlled-portability/runtime/profile',
  'QA/Evidence/Authenticated-Session-2026-11-17/chrome-portability/runtime/profile',
  'QA/Evidence/Authenticated-Checkout-2026-11-17/firefox-portability/runtime/profile'];
const ignored = execFileSync('git', ['check-ignore', '--stdin'], { cwd: root, encoding: 'utf8',
  input: privatePaths.join('\n') + '\n' }).trim().split(/\r?\n/);
for (const file of privatePaths) assert.ok(ignored.includes(file), 'Private runtime must be ignored: ' + file);
for (const name of ['cypress.config.cjs', 'cypress.auth.config.cjs',
  'cypress.authenticated.config.cjs', 'cypress.checkout.config.cjs']) {
  const config = require(path.join(root, name));
  assert.equal(config.e2e.baseUrl, 'http://172.16.30.198:5800');
  assert.ok(fs.existsSync(path.join(root, config.e2e.supportFile)), name + ': missing support file');
  for (const key of ['screenshotsFolder', 'videosFolder', 'downloadsFolder']) {
    const relative = path.relative(path.join(root, 'QA/Evidence'), config[key]);
    assert.ok(relative && !relative.startsWith('..') && !path.isAbsolute(relative), name + ': evidence root');
  }
}
const installed = path.join(root, 'node_modules/cypress/package.json');
const installedVersion = fs.existsSync(installed) ? JSON.parse(fs.readFileSync(installed, 'utf8')).version : null;
if (installedVersion !== null) assert.equal(installedVersion, pkg.devDependencies.cypress);
let filterConfigured = false;
try {
  filterConfigured = git(['config', '--local', '--get', 'filter.ezpost-public.clean']).trim() === 'node scripts/publication-sanitize.cjs' &&
    git(['config', '--local', '--get', 'filter.ezpost-public.required']).trim() === 'true';
} catch { /* Missing optional local publication setup is reported, never hidden. */ }
console.log(JSON.stringify({ kind: 'STATIC PORTABILITY CHECK; no Cypress/application execution',
  trackedFiles: tracked.length,
  reports: tracked.filter(file => file.startsWith('QA/Reports/')).length,
  evidenceFiles: tracked.filter(file => file.startsWith('QA/Evidence/')).length,
  specs: tracked.filter(file => file.startsWith('cypress/e2e/') && file.endsWith('.cy.js')).length,
  fullHistoryAvailable: true, historicalBaselinesAvailable: baselines.length,
  checkoutByteConversionDisabled: true, privateRuntimePathsIgnored: privatePaths.length,
  recordedNode: read('.node-version').trim(), currentNode: process.version,
  lockedCypress: pkg.devDependencies.cypress, installedCypress: installedVersion,
  dependencyInstallationNeeded: installedVersion === null,
  publicationFilterConfigured: filterConfigured,
  nextSetup: installedVersion === null ? 'npm.cmd ci (Windows), or npm ci; not run by this checker' : null,
  publicationSetup: filterConfigured ? null : 'Configure the repository-local publication filter as documented before staging new evidence',
  companyNetworkChecked: false, browserAvailabilityChecked: false, authenticatedSessionTransferred: false,
  applicationRequests: 0, browsersStarted: 0, dependenciesInstalled: 0 }, null, 2));
