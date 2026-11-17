// Read-only reconciliation of already-recorded visible results. Never run Cypress.
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const { verify } = require('./source-state.cjs');
const root = path.resolve(__dirname, '../../../..'), base = path.resolve(__dirname, '..');
const specs = ['cart-handoff', 'cart-edit-remove'];
const expectedIds = ['CART-H01', 'CART-H02', 'CART-H03', 'CART-H04', 'CART-E01', 'CART-E02', 'CART-E03', 'CART-E04'];
const rows = [], manifestIds = new Set();
for (const browser of ['chrome', 'firefox']) {
  const dir = path.join(base, browser + '-final-01');
  const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'source-manifest.json')));
  manifestIds.add(manifest.sourceId);
  const source = verify(root, manifest);
  const attempts = fs.readdirSync(dir).filter(name => name.startsWith('driver-'));
  assert.equal(attempts.length, 1, 'one final driver attempt; do not silently select a passing retry');
  const attempt = path.join(dir, attempts[0]);
  const ids = [];
  for (const spec of specs) {
    const file = path.join(attempt, spec + '-results.json');
    const result = JSON.parse(fs.readFileSync(file));
    assert.equal(result.sourceId, manifest.sourceId);
    assert.equal(result.browser.name, browser);
    assert.equal(result.browser.isHeaded, true);
    assert.equal(result.browser.isHeadless, false);
    assert.equal(result.isInteractive, true);
    assert.equal(result.observerInstalled, true);
    assert.equal(result.tests.length, 4);
    assert.equal(result.testEvidence.length, 4, 'all afterEach outcomes recorded');
    const tests = result.tests.map(test => {
      const title = test.title.at(-1), id = title.match(/^CART-[HE]\d{2}/)?.[0];
      assert.ok(id, title); ids.push(id);
      const evidence = result.testEvidence.find(entry => entry.title === title);
      assert.ok(evidence, 'matching per-test evidence for ' + id);
      return { id, state: test.state, durationMs: test.duration,
        cleanup: evidence.cleanup, cartCheckpoints: evidence.cartCheckpoints.length };
    });
    const counted = { passed: 0, failed: 0, pending: 0, skipped: 0, notRun: 0 };
    for (const test of tests) {
      if (['passed', 'failed', 'pending'].includes(test.state)) counted[test.state]++;
      else counted.notRun++;
    }
    assert.deepEqual(result.counts, counted);
    rows.push({ browser, version: result.browser.version, spec: result.spec,
      result: path.relative(root, file).replaceAll('\\', '/'), counts: result.counts,
      source, tests, startedAt: result.stats.start, completedAt: result.stats.end });
  }
  assert.deepEqual(ids.sort(), [...expectedIds].sort());
}
assert.equal(manifestIds.size, 1, 'both browsers must share the exact frozen source');
console.log(JSON.stringify({ kind: 'Recorded visible regression reconciliation; NOT a new E2E run',
  checkedAt: new Date().toISOString(), sourceId: [...manifestIds][0], rows }, null, 2));
