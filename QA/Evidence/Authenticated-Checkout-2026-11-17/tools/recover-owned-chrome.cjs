// Authorized normal UI cleanup only after a failed test's teardown.
// Requires private ownership already established by the actual suite guard.
const fs = require('node:fs'), path = require('node:path');
const [port, directory] = process.argv.slice(2);
const evidenceRoot = path.resolve(__dirname, '..'), out = path.resolve(directory || '');
if (!/^\d+$/.test(port || '') || !path.relative(evidenceRoot, out) ||
    path.relative(evidenceRoot, out).startsWith('..')) throw Error('CHECKOUT_RECOVERY_ARGUMENTS');
const cache = path.join(process.env.LOCALAPPDATA, 'npm-cache', '_npx');
const modulePath = fs.readdirSync(cache).map(p => path.join(cache, p, 'node_modules/playwright'))
  .find(p => fs.existsSync(path.join(p, 'package.json')));
(async () => {
  const browser = await require(modulePath).chromium.connectOverCDP('http://127.0.0.1:' + port);
  const page = browser.contexts().flatMap(c => c.pages()).find(p => p.url().includes('/__/#/specs/runner'));
  if (!page) throw Error('CHECKOUT_RECOVERY_RUNNER_REQUIRED');
  const before = await page.evaluate(async () => {
    const gate = Cypress[Symbol.for('ezpost.authenticated-checkout.private-runtime')], win = Cypress.state('window');
    if (!gate || gate.status.phase !== 'cleanup' || gate.ownedId() === undefined ||
        gate.counts().removeCount !== 0 || win.location.pathname !== '/cart') return false;
    const session = await (await win.fetch('/api/v1/auth/session')).json();
    if (!gate.sameSession(session.user)) return false;
    const cart = await (await win.fetch('/api/v1/cart')).json();
    const target = cart.items?.filter(p => p.id === gate.ownedId());
    if (!target || target.length !== 1 || target[0].product_slug !== 'blackfri-01' ||
        cart.items.filter(p => p.product_slug === 'blackfri-01').length !== 1) return false;
    const project = items => JSON.stringify(items.map(p => [p.id, p.product_slug, p.package_id, p.artwork_id ?? null, p.quantity]).sort());
    Cypress[Symbol.for('ezpost.checkout.cleanup-recovery')] = { baseline: project(cart.items.filter(p => p.id !== gate.ownedId())), project };
    return true;
  });
  if (!before) throw Error('CHECKOUT_RECOVERY_OWNERSHIP_NOT_CONFIRMED');
  const frame = page.frames().find(f => /^http:\/\/172\.16\.30\.198:5800\/cart$/.test(f.url()));
  if (!frame) throw Error('CHECKOUT_RECOVERY_CART_FRAME_REQUIRED');
  const row = frame.locator('[data-cy="cart-item"]').filter({ has: frame.locator('img[src*="/products/blackfri-01/images/"]') });
  if (await row.count() !== 1) throw Error('CHECKOUT_RECOVERY_UNIQUE_OWNED_ROW_REQUIRED');
  const response = page.waitForResponse(r => r.request().method() === 'POST' && /\/api\/v1\/cart\/items\/[^/]+\/remove$/.test(new URL(r.url()).pathname));
  await row.getByRole('button', { name: '\u062d\u0630\u0641', exact: true }).click();
  const removed = await response;
  const result = await page.evaluate(async () => {
    const gate = Cypress[Symbol.for('ezpost.authenticated-checkout.private-runtime')], win = Cypress.state('window');
    const recovery = Cypress[Symbol.for('ezpost.checkout.cleanup-recovery')];
    const cart = await (await win.fetch('/api/v1/cart')).json();
    const session = await (await win.fetch('/api/v1/auth/session')).json();
    const value = { intendedOrdinaryIdentity: gate.sameSession(session.user),
      ownedIdAbsent: !cart.items.some(p => p.id === gate.ownedId()),
      unaffectedIntentPreserved: recovery.project(cart.items) === recovery.baseline,
      checkoutDraftAbsent: win.sessionStorage.getItem('ezpost_checkout_address') === null,
      activeOrderDraftAbsent: win.sessionStorage.getItem('ezpost_active_order_id') === null,
      guardRemoveCountOne: gate.counts().removeCount === 1 };
    delete Cypress[Symbol.for('ezpost.checkout.cleanup-recovery')];
    return value;
  });
  result.removeResponseSuccessful = removed.ok();
  result.allRecoveryChecksPassed = Object.values(result).every(v => v === true);
  fs.writeFileSync(path.join(out, 'cleanup-recovery.json'), JSON.stringify({ at: new Date().toISOString(),
    method: 'Normal visible UI Remove; no direct mutation request, state injection or unowned removal',
    originalTestRemainsFailed: true, ...result }, null, 2));
  console.log(JSON.stringify(result));
  process.exit(result.allRecoveryChecksPassed ? 0 : 1);
})().catch(() => { console.error('CHECKOUT_RECOVERY_FAILED_NO_RAW_DETAILS'); process.exit(1); });
