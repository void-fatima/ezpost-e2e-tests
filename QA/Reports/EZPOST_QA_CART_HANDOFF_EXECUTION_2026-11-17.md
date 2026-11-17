# EZPost — اجرای انتقال محصول به سبد، ۱۷ نوامبر ۲۰۲۶

چهار تست `CART-H01…H04` در spec `cypress/e2e/cart/cart-handoff.cy.js` نوشته و در Cypress واقعیِ interactive اجرا شدند. آخرین اجرای کامل پس از اصلاح دو اشکال ابزار تست، در **Chrome: ۴ PASS / ۰ FAIL** و **Firefox: ۴ PASS / ۰ FAIL** ثبت شد؛ در هر مرورگر pending، skipped و not-run صفر است. cleanup هر هشت اجرای نهایی تأیید شد و تلاش‌های اولیه جدا حفظ شدند. این موفقیت محدود به انتقال settled محصول/بسته/تعداد، composition سبد، summary تعداد بسته، ارائهٔ مبلغ quote در cart و cleanup همان اقلام است؛ قیمت مستقل تجاری، تمام رفتارهای سبد یا سفارش/پرداخت کامل تأیید نشده‌اند.

Workspace مستقل: `C:\Users\LOCAL_USER\Desktop\EZPost`؛ برنامه: `http://172.16.30.198:5800/`؛ دسترسی شبکهٔ شرکت لازم است. اجرای cart isolated، branch/commit/push و ادغام batch مجازند. شخصی/ادمین، OTP/SMS، حساب تازه، customer forms، checkout submission، سفارش و پرداخت اجرا نشده‌اند. guard قبلی fail-closed تغییر نکرده است.

## ۱. قرارداد، inventory و فایل‌های اجرا

قراردادها پیش از کد در [کیس‌های سبد](../Test-Cases/EZPOST_QA_CART_TEST_CASES.md) و [ماتریس مرحلهٔ سبد](EZPOST_QA_CART_COVERAGE_MATRIX.md) ثبت شدند. ۳۰ ID اصلی M01، ۱۸ ID قبلی ordering و نگاشت‌های `CART-01…08`، `GATE-01/02` و `ASYNC-03` حفظ شدند. این batch چهار ID جدید handoff را اجرا می‌کند؛ `CART-E01…E04` هنوز برنامهٔ batch بعدی‌اند و در این گزارش اجراشده محسوب نمی‌شوند.

| فایل | نقش و حد ادعا |
|---|---|
| `cypress/e2e/cart/cart-handoff.cy.js` | چهار تست مستقل live، با شروع guest/empty و cleanup عادی |
| `cypress/support/cart.js` | verify واقعی session guest، selection/quote correlated، Add واقعی desktop/mobile، snapshot cart و cleanup owned-only |
| `cypress/support/cart-contract.cjs` | validator خالص همان snapshot؛ expectation از intent جدا، نه مقادیر cart |
| `cypress/fixtures/cart-observed.json` | نام/slug/package/labels واقعی تاریخ‌دارِ Black Friday و Simple، بدون schedule مصوب قیمت |
| `scripts/open-cart.cjs` | launcher فقط `cypress open`؛ config موجود با override محدود spec/output و `watchForFileChanges:false` |
| `scripts/check-cart-static.cjs` | syntax/traceability و کنترل نبود skip/only، force، wait عددی، API mutation یا تعامل hidden select |
| `scripts/check-cart-contract.cjs` | دو نمونهٔ صحیح و۱۳ نمونهٔ نادرست علیه همان validator؛ این بررسی برنامه را اجرا نمی‌کند |
| `QA/Evidence/Cart-Cypress/2026-11-17/tools/` | ابزار مشاهده و انتخاب runner visible، جمع‌آوری outcome، diagnostics و capture محدود همان پنجره |

## ۲. محیط و شواهد visible

| جزء | نسخه / روش واقعی |
|---|---|
| Cypress پروژه | 16.2.1؛ نسخهٔ project-local موجود، بدون نصب یا upgrade |
| Chrome | 157.0.8103.78؛ `isHeaded:true` و `isHeadless:false` در raw result |
| Firefox | 160.0؛ headed و interactive در raw اجرای اولیه و نهایی |
| config | `cypress.config.cjs` موجود، `testIsolation:true`، support موجود و mutation guard قبلی |
| viewport | H01/H03/H04:1366×900؛ H02:390×844؛ narrow شبیه‌سازی viewport است، نه physical device |
| evidence root | `QA/Evidence/Cart-Cypress/2026-11-17/` و discovery زیر `QA/Evidence/Cart-2026-11-17/`؛ runtime/profile محلی ignored |

فرمان واقعی launcher در هر تلاش از این الگو استفاده کرد:

```text
node scripts/open-cart.cjs handoff chrome initial
node scripts/open-cart.cjs handoff chrome startup-retry
node scripts/open-cart.cjs handoff chrome cleanup-retry
node scripts/open-cart.cjs handoff firefox initial
node scripts/open-cart.cjs handoff chrome correlated-final
node scripts/open-cart.cjs handoff firefox correlated-final
```

launcher همان executable محلی Cypress را با `open --e2e --browser chrome|firefox --project <EZPost> --config-file cypress.config.cjs` و override مخصوص همان spec فراخواند. آرگومان‌های دقیق، زمان و مسیر هر تلاش در `launch.json` همان directory نگه داشته شده‌اند. سپس ابزار runner، app/headed browser را به‌صورت visible تأیید و spec واقعی را در UI انتخاب کرد؛ `runner-connected.json` و `spec-loaded.json` این مراحل را از صرف launch جدا می‌کنند. موفقیت اجرای تست فقط از end state واقعی runner و raw result خوانده شده است، نه از process launch یا بازشدن browser.

## ۳. نتیجهٔ هر تلاش؛ history حذف نشده است

در ستون‌ها «pending» به state واقعی Cypress اشاره می‌کند؛ تستی که به علت hook قبلی body آن اجرا نشده در «not-run» آمده است. هیچ `it.skip` یا skip عمدی برای سبزشدن وجود ندارد. شمارنده‌های خام یک hook failure گاهی یک تست را هم در pass و هم failure event می‌شمارند؛ این جدول outcome نهایی هر **case** را می‌شمارد و اعداد خام را پنهان نمی‌کند.

| تلاش / مرورگر | application-opened | spec-loaded | وضعیت execution واقعی | PASS | FAIL | pending | skipped عمدی | not-run از۴ | دلیل و evidence |
|---|---|---|---|---:|---:|---:|---:|---:|---|
| `handoff-chrome-initial` | پنجرهٔ Cypress باز | خیر؛ config initialization متوقف | هیچ تست اجرا نشد | 0 | 0 | 0 | 0 | 4 | stuck initialization/IPC؛ `initializing.png`، `startup-ui-diagnostic.json`، `startup-config-state.json` و log؛ failure برنامه نیست |
| `handoff-chrome-startup-retry` | بله | بله | H01 body به assertions cart رسید، اما afterEach شکست؛ H02–04 اجرا نشدند | 0 | 1 | 0 | 0 | 3 | `visible-results-4920.json`؛ raw stats برای همان یک case passes1/failures1 دارد؛ case نهایی failed است |
| `handoff-chrome-cleanup-retry` | بله | بله | H01 با cleanup پاس؛ H02 در beforeEach page-load fail؛ H03/H04 اجرا نشدند | 1 | 1 | 0 | 0 | 2 | `diagnostics-8572.json`، `failure-8572-1.png`؛ observer/probe outcome را دید ولی screenshot driver متوقف شد و final result JSON ساخته نشد؛ این محدودیت حفظ شده است |
| `handoff-firefox-initial` | بله | بله | H01/H02 PASS؛ H03/H04 FAIL ابزار correlation | 2 | 2 | 0 | 0 | 0 | `visible-results-15648.json` و دو failure screenshot؛ cleanup هر چهار test ثبت شده |
| `handoff-chrome-correlated-final` | بله | بله | هر چهار ID کامل و cleanup verified | 4 | 0 | 0 | 0 | 0 | `visible-results-21188.json`؛ start15:37:29.672Z، end15:38:12.404Z؛ screenshot و window metadata |
| `handoff-firefox-correlated-final` | بله | بله | هر چهار ID کامل و cleanup verified | 4 | 0 | 0 | 0 | 0 | `visible-results-9928.json`؛ start15:39:17.046Z، end15:39:55.854Z؛ screenshot و window metadata |

فایل‌های تلاش اولیه با اصلاح setup جایگزین نشده‌اند. این تلاش‌ها را برای محاسبهٔ تعداد requirementهای پوشش‌داده‌شده جمع نمی‌کنیم؛ هر ID فقط همان subset مشخص خود را دارد. چهار تست جدید live هستند؛ در batch حاضر هیچ quote mock/fabricated success یا controlled-response E2E اجرا نشده است. negative controls خالصِ بخش۶ outcome برنامه نیستند.

## ۴. پوشش واقعی چهار کیس

| ID / نگاشت | intent مستقل و اقدام | assertions واقعی و خطایی که باید رد کند | آخرین Chrome | آخرین Firefox |
|---|---|---|---|---|
| CART-H01 / P14,T02؛ CART-02/03 | guest/empty، Black Friday package49/۱۲۰ درq2؛ desktop Add visible | نام و slug محصول،۱۲۰ در هر بسته، q2، composition بدون missing/extra، summary2، مبلغ cart برابر quote settled correlated؛ wrong product/variant، reset به۱ و مبلغ stale را رد می‌کند | PASS + cleanup | PASS + cleanup؛ initial PASS |
| CART-H02 / P14,T02,U03؛ CART-02/03 | guest/empty، package50/۲۴۰ درq2، mobile CTA واقعی390×844 | desktop CTA باید hidden و mobile unique/visible/enabled باشد؛ cart همان محصول،۲۴۰ در هر بسته وq2، summary2 و amount transfer؛ default۱۲۰ یا quantity reset را رد می‌کند | PASS + cleanup | PASS + cleanup؛ initial PASS |
| CART-H03 / P14,T02؛ CART-02/03 | Black Friday120/q2 سپس Simple25/q1 با دو quote/selection مستقل | هر دو گروه slug+labels با نام درست و quantity مستقل حفظ، summary3، amount هر intent از quote متناظر؛ جایگزینیA باB، crossed identity و lost/extra item را رد می‌کند | PASS + cleanup | PASS + cleanup؛ initial FAIL ابزار alias محفوظ |
| CART-H04 / P14,T02؛ CART-02/03 | همان محصول: package49/۱۲۰ درq2 سپس package50/۲۴۰ درq1 | دو association distinct با quantities2/1 و summary3؛ variant overwrite، collapse بدون تمایز یا جابه‌جایی quantity را رد می‌کند؛ تعداد عمومی line یا policy merge تصویب نشده | PASS + cleanup | PASS + cleanup؛ initial FAIL ابزار alias محفوظ |

در Chrome نهایی، H03 checkpoint گروه‌های `(blackfri-01,120,q2)` و `(simple,25,q1)`، و H04 گروه‌های `(blackfri-01,120,q2)` و `(blackfri-01,240,q1)` را با intent مقایسه کرد. تمام snapshotها یکپارچه‌اند؛ قطعات DOM از زمان‌های متفاوت نمی‌توانند جداگانه test را پاس کنند. مقدار `تعداد بسته` از جمع quantities intent می‌آید، نه جمع دوبارهٔ همان cart display.

cart فقط **labels در هر بسته** نشان می‌دهد. package_id و cart total-label به‌صورت visible ادعا نشده‌اند. مقایسهٔ مبلغ quote با cart ارائهٔ سازگار را بررسی می‌کند؛ صحت مستقل pricing، تخفیف، rounding، tax یا shipping را اثبات نمی‌کند. مبلغ summary subtotal/payable و معنای badge در این batch assert نشده‌اند.

## ۵. تحلیل failures و اصلاح محدود ابزار

| شناسهٔ رخداد | evidence و assertion شکست‌خورده | تشخیص مستند و اصلاح | نتیجه و حد باقی‌مانده |
|---|---|---|---|
| SETUP-STARTUP | initial Chrome روی config initialization ماند؛ state diagnostic خطای GraphQL `Cannot query field "message" on type "ErrorWrapper"` را ثبت کرده است | این diagnostic به‌تنهایی علت قطعی IPC را ثابت نمی‌کند. تلاش تازهٔ launcher با directory جدید انجام شد؛ تستی در تلاش اول اجرا نشد | رخداد setup/tooling؛ defect cart نیست و به PASS تبدیل نشده |
| SETUP-CLEANUP-HYDRATION | startup-retry H01 afterEach: `Expected to find element: main .commerce-empty, but never found it`؛ پس از visit، synchronous نگاه به cart پیش از hydration empty تشخیص داد | cleanup اکنون منتظر state rendered واقعی و visible یعنی `.commerce-empty` یا `[data-cy="cart-item"]` می‌ماند، سپس مالکیت تمام اقلام را پیش از Remove بررسی می‌کند؛ timeout افزایش نیافت | cleanup اولیه ناموفق بود؛ manual recovery عادی همان BlackFriday120/q2 با before1→after0 و empty ثبت شد؛ Chrome وFirefox نهایی هر کدام چهار cleanup موفق دارند |
| ENV-PAGE-LOAD | cleanup-retry H02 beforeEach: page `load` در60000ms fire نشد؛ URL=`/cart`، diagnostics asset requests را ثبت کرده | page-load timeout حفظ شد؛ expectation یا click force نشد. failure پیش از action اصلی است؛ علت دقیق network/service/browser در این evidence تعیین نشده | failure محیط/بارگذاری حل‌شدهٔ قطعی اعلام نمی‌شود؛ اجرای بعدی مستقل موفق شد. driver screenshot نیز stall شد، لذا برای این تلاش final JSON نداریم |
| SETUP-QUOTE-ALIAS | Firefox اولیه H03: expected quote path `/simple/quote` ولی exchange قبلی `/blackfri-01/quote` مصرف شد؛ H04 expectedq1 ولی request قدیمیq2 دریافت شد | cart اقلام قبلی را دوباره quote می‌کند؛ alias queue مشترک با visit قبلی اشتباه بود. هر selection visit اکنون alias یکتا دارد؛ assertions دقیق path/package_id/quantity و response identity همگی حفظ شدند | Chrome وFirefox نهایی H03/H04 پاس؛ mismatch اولیه به‌عنوان defect برنامه گزارش نشده |
| TOOL-CAPTURE | Chrome cleanup-retry capture/driver متوقف شد و final JSON ذخیره نشد | driver اکنون outcome JSON را پیش از capture می‌نویسد؛ capture همان window/PID به‌صورت optional ثبت می‌شود و خطای capture از outcome جداست | failure artifacts اولیه باقی‌اند؛ هیچ result file فرضی برای تلاش ناقص ساخته نشده |

در این batch، شواهد موجود defect تازهٔ محصول را اثبات نمی‌کنند. دو شکست معتبر قدیمی P10-ORD01/02 همچنان بازند؛ تست‌های cart آنها را rerun نکرده‌اند و PASSED cart به معنی رفع stale-response نیست. landing/M01 و N02-TC04 rerun نشدند.

## ۶. بررسی صحت تست و static واقعی

بازبینی دوم کد پرسید: «اگر رفتار مورد ادعا خراب باشد، آیا تست هنوز می‌تواند پاس شود؟» برای handoff، فقط وجود button/route/HTTP۲۰۰ کافی نیست: قبل Add، H1 محصول و selection و quote exact correlate می‌شوند؛ بعد Add، snapshot محصول/labels/quantity/composition/summary/amount intent را کنترل می‌کند. برای H03/H04، assertion پس از اولین Add و پس از Add دوم اجرا می‌شود؛ حذف اولین intent در Add دوم قابل عبور نیست. alias یکتا مانع پاس یا شکست اشتباه به‌خاطر queue قبلی می‌شود.

validator همان کدی است که `assertCart` روی DOM واقعی فراخوانی می‌کند. اجرای `node scripts/check-cart-contract.cjs` دو نمونهٔ صحیح و۱۳ نمونهٔ نادرست را بررسی کرد. نمونه‌های نادرست ردشده: slug اشتباه، association نام/slug اشتباه، labels variant غلط، reset quantity به۱، summary غلط، configuration مفقود، extra configuration، duplicate با aggregate quantity غلط، مبلغ stale quote→cart، هدف حذف هنوز حاضر، قلم unaffected حذف‌شده، empty هم‌زمان با populated، و destination اشتباه. نمونهٔ صحیح split-row نیز پذیرفته شد تا line-merge policy اختراع نشود. این checks وابستگی به همان validator را ثابت می‌کنند؛ ادعای نبود همهٔ false-positiveهای ممکن ندارند.

| فرمان واقعاً اجراشده | نتیجه و scope |
|---|---|
| `npm.cmd run check:static` | PASS؛ ۲۸ فایلJS،۸JSON،۸ spec M01 و حفظ۳۰ case؛ این فرمان Cypress اجرا نمی‌کند |
| `node scripts/check-cart-static.cjs` | PASS؛۱۵ فایل،۱cart spec،۴ test و هر چهار ID؛ guard unchanged، صفر application request از static |
| `node scripts/check-cart-contract.cjs` | PASS؛۲positive و۱۳negative خالص؛ مستقل از application E2E |

کد skip/only، wait عددی، forced click، hidden select interaction یا direct API/cart reset ندارد. استثناها به‌طور عمومی suppress نشده‌اند. cleanup پس از failure فقط اقلام احراز‌شدهٔ متعلق به suite را حذف می‌کند؛ اگر prerequisite guest/empty اصلاً تأیید نشود، cleanup فعال نمی‌شود. visibility/uniqueness خود کنترل هدف assert شده است.

## ۷. cleanup، ایمنی و evidence

Chrome وFirefox نهایی برای هر چهار ID، مجموعاً هشت اجرا، مقدار `cartCleanup.state = verified-empty-after-normal-remove` و `storageResetUsed:false` ثبت کرده‌اند. ownership برای H01/H02 یک configuration و H03/H04 هر دو configuration همان تست است. zero item و `.commerce-empty` visible پس از Remove عادی بررسی شدند. raw after-test DOM گاهی به‌علت test isolation به `about:blank` رسیده است؛ ادعای cleanup از checkpoint خود hook و assertions آن می‌آید، نه از خالی‌بودن about:blank.

startup-retry cleanup defect با [recovery-cleanup.json](../Evidence/Cart-Cypress/2026-11-17/handoff-chrome-startup-retry/recovery-cleanup.json) به‌صورت جدا مستند است: تنها قلمِ suite-owned، before1، Remove عادی، after0، empty visible و بدون storage reset. Firefox اولیه و نهایی نیز cleanup هر چهار تست را ثبت کرده‌اند؛ نتیجهٔ نهایی تاریخچهٔ اولیه را جایگزین نکرده است.

مسیرهای اصلی evidence:

- [Chrome نهایی — raw result](../Evidence/Cart-Cypress/2026-11-17/handoff-chrome-correlated-final/visible-results-21188.json) و [screenshot پنجرهٔ runner](../Evidence/Cart-Cypress/2026-11-17/handoff-chrome-correlated-final/runner-final-21188.png).
- [Firefox نهایی — raw result](../Evidence/Cart-Cypress/2026-11-17/handoff-firefox-correlated-final/visible-results-9928.json) و [screenshot پنجرهٔ runner](../Evidence/Cart-Cypress/2026-11-17/handoff-firefox-correlated-final/runner-final-9928.png).
- [Firefox اولیه — raw result](../Evidence/Cart-Cypress/2026-11-17/handoff-firefox-initial/visible-results-15648.json)، [failureH03](../Evidence/Cart-Cypress/2026-11-17/handoff-firefox-initial/failure-15648-1.png)، [failureH04](../Evidence/Cart-Cypress/2026-11-17/handoff-firefox-initial/failure-15648-2.png).
- [Chrome cleanup failure اولیه](../Evidence/Cart-Cypress/2026-11-17/handoff-chrome-startup-retry/visible-results-4920.json) و [screenshot](../Evidence/Cart-Cypress/2026-11-17/handoff-chrome-startup-retry/failure-4920-1.png).
- [page-load diagnostic تلاش ناقص](../Evidence/Cart-Cypress/2026-11-17/handoff-chrome-cleanup-retry/diagnostics-8572.json) و [screenshot](../Evidence/Cart-Cypress/2026-11-17/handoff-chrome-cleanup-retry/failure-8572-1.png).
- discovery تازه: `QA/Evidence/Cart-2026-11-17/discovery/`، شامل simple، mobile، multiple-configurations و cleanup واقعی؛ inspection معادل PASS Cypress نیست.

request diagnostics فقط method/path/status و ورودی product/package/quantity مجاز را نگه می‌دارد؛ cookie/token/credential export انجام نشده است. نام routeهای `/admin` یا checkout در prefetch/module resources به معنی ورود به آن session یا اجرای action آن stage نیست. audit عمومی فایل‌های تازه پیش از stage، ۱۰۴ فایل و۱۶PNG حدود۳MB را بررسی کرد؛ sanitize موجود برای publication اعمال می‌شود و profile/runtime/caches محلی منتشر نمی‌شوند. این گزارش commit/push را پیشاپیش انجام‌شده اعلام نمی‌کند.

## ۸. محدودیت‌های واقعی و نشر batch

H01…H04 فقط subset settled isolated guest را اجرا می‌کنند. E01…E04 هنوز در این checkpoint نوشته/اجرا نشده‌اند. repeated identical add/merge، badge unit، zero/negative/decimal/localized و حدود cart، persistence/lifetime/login merge، pending/failed Add، real rejection/lost-response/retry، repricing/availability و multi-view conflict به policy یا fixture/capability دقیق فهرست‌شده در inventory نیاز دارند. هیچ blanket حذف تمام والدهای آنها انجام نشده است.

قیمت مستقل، ownership account، session expiry، checkout form، order، payment و fulfillment خارج این اجرای cart هستند. dependency یا application source تغییر نکرده است. تاریخچهٔ failures دست‌نخورده مانده و test برای سبزشدن ضعیف نشده است.

branch batch: `test/cart-handoff`. baseline پیش از cart: `0aedea47684ead451755d1988c54d71e4daef0f7`. commit/push و integration-to-main این batch در checkpoint حاضر **هنوز انجام‌شده گزارش نمی‌شوند**؛ پس از audit/staging/normal push و fresh remote inspection، SHA و وضعیت دقیق باید ثبت شود. approvalِ کلی M01 یا journey کامل از این گزارش حاصل نمی‌شود.
