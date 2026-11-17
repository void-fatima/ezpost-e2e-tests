// Browser-side diagnostics only. Never change application state or test results.
function installObserver() {
  if (window.cartReviewObserverCypress === Cypress) return true;
  window.cartReviewObserverCypress = Cypress;
  window.cartReviewObserverInstalled = true;
  window.cartReviewDiagnostics = [];
  window.cartReviewTests = [];
  const network = () => Object.values(Cypress.state('routes') || {}).flatMap(route =>
    Object.values(route.requests || {}).map(exchange => {
      const request = exchange.request;
      const pathname = request?.url ? new URL(request.url).pathname : null;
      const quote = request?.method === 'POST' && /^\/api\/v1\/products\/[^/]+\/quote$/.test(pathname || '');
      const body = quote && request.body && typeof request.body === 'object' ? request.body : {};
      return {
        method: request?.method, path: pathname,
        input: quote ? { package_id: body.package_id, quantity: body.quantity } : undefined,
        status: exchange.response?.statusCode, error: exchange.error?.message
      };
    }));
  const dom = () => {
    const win = Cypress.state('window');
    const main = win?.document?.querySelector('main');
    return {
      url: win?.location.href,
      h1: main?.querySelector('h1')?.textContent,
      productQuantity: main?.querySelector('input[aria-label="تعداد بسته"]')?.value,
      productSummary: main?.querySelector('.summary-line-header')?.textContent,
      productTotal: main?.querySelector('.total-value')?.textContent,
      empty: Boolean(main?.querySelector('.commerce-empty')),
      items: [...main?.querySelectorAll('[data-cy="cart-item"]') || []].map(item => ({
        product: item.querySelector('h2')?.textContent,
        imagePath: item.querySelector('img')?.getAttribute('src')?.split('?')[0],
        labelsPerPackage: item.querySelector('.cart-item__info small')?.textContent,
        quantity: item.querySelector('.cart-quantity-val')?.textContent,
        price: item.querySelector('.cart-item__price')?.textContent
      })),
      summary: main?.querySelector('.order-summary')?.textContent
    };
  };
  Cypress.on('test:after:run', test => {
    window.cartReviewTests.push({ title: test.title, state: test.state,
      at: new Date().toISOString(), cleanup: Cypress.expose('cartCleanup'),
      cartCheckpoints: Cypress.expose('cartCheckpoints'),
      readiness: Cypress.expose('cartReadiness'), quoteEvidence: Cypress.expose('cartQuoteEvidence'),
      dom: dom(), network: network() });
  });
  Cypress.on('fail', error => {
    window.cartReviewDiagnostics.push({ error: error.message, stack: error.stack,
      at: new Date().toISOString(), readiness: Cypress.expose('cartReadiness'),
      quoteEvidence: Cypress.expose('cartQuoteEvidence'), dom: dom(), network: network() });
    throw error;
  });
  return true;
}

function currentState() {
  return {
    spec: window.Cypress?.spec?.relative?.replaceAll('\\', '/'),
    failures: window.cartReviewDiagnostics || [],
    done: Boolean(window.Cypress?.mocha?.getRunner()?.stats?.end && Cypress.mocha.getRunner().state === 'stopped')
  };
}

function collectResult() {
  const runner = Cypress.mocha.getRunner(), tests = [];
  function visit(suite, parents) {
    const prefix = suite.title ? [...parents, suite.title] : parents;
    suite.tests.forEach(test => tests.push({ title: [...prefix, test.title], state: test.state,
      duration: test.duration, error: test.err?.message, stack: test.err?.stack }));
    suite.suites.forEach(child => visit(child, prefix));
  }
  visit(runner.suite, []);
  const counts = { passed: 0, failed: 0, pending: 0, skipped: 0, notRun: 0 };
  for (const test of tests) {
    if (test.state === 'passed') counts.passed++;
    else if (test.state === 'failed') counts.failed++;
    else if (test.state === 'pending') counts.pending++;
    else counts.notRun++;
  }
  const reporter = [...document.querySelectorAll('iframe')].find(frame => frame.name === 'Cypress Reporter');
  return {
    spec: Cypress.spec.relative.replaceAll('\\', '/'), stats: runner.stats, tests, counts,
    isInteractive: Cypress.config('isInteractive'), browser: Cypress.browser,
    runnerUrl: location.href, autUrl: Cypress.state('window')?.location.href,
    capturedAt: new Date().toISOString(), reporterText: reporter?.contentDocument?.body?.innerText,
    diagnostics: window.cartReviewDiagnostics || [], testEvidence: window.cartReviewTests || [],
    observerInstalled: window.cartReviewObserverInstalled === true,
    scope: 'Visible guest-cart E2E only; quote money consistency is not independent business-price verification'
  };
}
module.exports = { installObserver, currentState, collectResult };
