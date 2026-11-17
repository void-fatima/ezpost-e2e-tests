# بررسی CART-E01 و رگرسیون یکپارچهٔ سبد — ۱۷ نوامبر ۲۰۲۶

هر هشت تست سبد در **Cypress open نمایان، ابتدا Chrome و سپس Firefox، با یک نسخهٔ ثابت** اجرا شدند: در هر مرورگر ۸ PASS و صفر FAIL/pending/skipped/not-run. CART-E01 این بار آماده‌سازی Simple و مراحل واقعی افزایش/کاهش را کامل اجرا کرد. **علت شکست تاریخی quote اولیهٔ Simple هنوز قطعی نیست؛ پاس جدید آن شکست را حذف یا حل‌شده اعلام نمی‌کند.**

Workspace مستقل EZPost؛ مخزن `https://github.com/void-fatima/ezpost-e2e-tests`؛ branch این batch: `test/cart-readiness-regression`؛ مبنای HEAD و remote main هنگام شروع و fetch مجدد: `bc271152eec693b0286232c822c14ef237933aee`. دستور AGENTS.md قابل‌اعمالی در پروژه/اجداد پیدا نشد. کار در Tapin/Python انجام نشد. تغییرات آزمون، وابستگی، برنامه، account، OTP، order و payment انجام نشدند؛ فقط عملیات UI سبد مهمانِ مجاز و متعلق به تست اجرا شد.

## ۱. نتیجهٔ بررسی prerequisite

failure تاریخی در `cy.wait('@cartSelectionQuote2')` و مهلت موجود ۵۰۰۰ms، **پیش از Add محصول Simple و پیش از edit** اتفاق افتاده بود. مسیر `/products/simple`، عنوان «طرح ساده»، q1، ۲۵ لیبل و ۵٬۰۰۰٬۰۰۰ ریال در DOM دیده می‌شد، اما ledger ثبت‌شدهٔ routeهای Cypress quote محصول Simple نداشت. این فقط گم‌شدن alias ثبت‌شده نبود؛ در عین حال capture مستقل و زمان‌دار شبکه، خطاهای کامل مرورگر یا شاهد initialization همان visit موجود نیست.

| فرضیه | نتیجهٔ مبتنی بر شواهد |
|---|---|
| bootstrap/hydration دیرهنگام یا ناموفق | ظاهر SSR می‌تواند زودتر از quote و کارکرد کنترل‌ها دیده شود؛ وقوع همین علت در failure تاریخی ثابت نشده است |
| اشکال intercept/correlation | quote Simple در route ledger تاریخی نیست؛ alias queue به‌تنهایی علت اثبات‌شده نیست. نقص instrumentation نیز با شواهد ناقص قبلی کاملاً رد نشده است |
| quote معتبر از SSR/payload | metadata بسته و قیمت اولیه موجود است، اما quote کاملِ جاری با `package_id`/`quantity`/`labels_total`/`line_total_irr` به‌عنوان fallback اثبات نشد. مبلغ visible کافی نیست |
| quote اولیه باید رخ دهد ولی در آن تلاش رخ نداد | در مهلت تست قبلی مشاهده نشد. اجرای فعلی quote واقعی همان محصول را نشان می‌دهد؛ نبود دائمی quote یا defect قطعی برنامه اثبات نشده است |

شاهد تاریخی بدون تغییر: [diagnostics-16172.json](../Evidence/Cart-Cypress/2026-11-17/edit-remove-chrome-reviewed-final/diagnostics-16172.json)، [نتیجهٔ قبلی](../Evidence/Cart-Cypress/2026-11-17/edit-remove-chrome-reviewed-final/visible-results-16172.json)، [گزارش edit/remove](EZPOST_QA_CART_EDIT_REMOVE_EXECUTION_2026-11-17.md).

چهار تلاش تشخیصی تازه جدا حفظ شدند؛ هیچ‌کدام تست cart محسوب نمی‌شوند:

| تلاش | نتیجه و محدودیت |
|---|---|
| [discovery](../Evidence/Cart-Readiness-2026-11-17/discovery/timeline.json) | BlackFriday SSR درms2181، quoteq1 در4236→4263؛ کلیک پیش از احراز initialization به q2 نرسید. ابزار به Simple نرسید؛ این defect کنترلِ آماده را ثابت نمی‌کند |
| [discovery-mounted](../Evidence/Cart-Readiness-2026-11-17/discovery-mounted/timeline.json) | quote واقعی آمد ولی `data-v-app` نیامد؛ timeout انتظار حدسی ابزار بود. این marker وارد تست نشد |
| [discovery-correlated](../Evidence/Cart-Readiness-2026-11-17/discovery-correlated/timeline.json) | Simple و BlackFriday q1/q2 واقعی ثبت شدند؛ probe به‌علت خواندن body پس از navigation کامل نشد. این خطای ابزار با انتظار body پیش از navigation در probe بعدی اصلاح شد |
| [discovery-final](../Evidence/Cart-Readiness-2026-11-17/discovery-final/timeline.json) | Simple→BlackFriday→Simple، هر visit با quoteq1 و کلیک واقعی افزایش→quoteq2؛ complete درms12794، بدون cart action. Simple اول SSR در3255 و quoteq1 در4446→4482؛ بازدید دوم نیز quote جاری داشت |

نتیجهٔ عملی: **هیچ اصلاح readiness در spec/helper توجیه نداشت و اعمال نشد.** `cy.wait`، timeout، request/response correlation، assertionهای presentation، انتخاب بسته، quantity، Add واقعی و validator سبد حفظ شدند. نه SSR price جای quote نشست، نه marker حدسی اضافه شد و نه شکست پنهان شد. اگر همان quote دوباره نیاید، انتظار موجود همچنان fail می‌شود. [تحلیل مستقل شواهد](../Evidence/Cart-Readiness-2026-11-17/evidence-analysis.md) محدودیت علت‌یابی را دقیق‌تر ثبت می‌کند.

## ۲. نسخهٔ ثابت و اجرای واقعی نمایان

Cypress محلی **16.2.1**؛ Chrome **157.0.8103.78**؛ Firefox **160.0**. فقط دو spec موجود اجرا شدند:

- `cypress/e2e/cart/cart-handoff.cy.js`
- `cypress/e2e/cart/cart-edit-remove.cy.js`

launcher جدید `scripts/open-cart-regression.cjs` هر دو spec را با config موجود، `watchForFileChanges:false` و پوشهٔ خروجی تازه انتخاب می‌کند. هیچ spec/helper/config/dependency آزمون تغییر نکرد. ۲۰ ورودی شامل دو spec، تمام support/fixtureها، config، package/lock و launcher پیش از اجرا freeze و قبل/بعد هر spec دوباره بررسی شدند. [manifest Chrome](../Evidence/Cart-Readiness-2026-11-17/chrome-final-01/source-manifest.json) و [manifest Firefox](../Evidence/Cart-Readiness-2026-11-17/firefox-final-01/source-manifest.json) یکسان‌اند:

```text
SHA-256 source ID:
e0fa394750cf19ab766ef3813f13007dbab78a4d00d78518cde2af3c5164a505
cart.js:
e15f3c752f8224aafd19e8b4eb126d4cecd5ae4e22297d1842b661088c57c1cd
cart-contract.cjs:
fed1a9cd78db9423416a3ec8bb38a4a08d152def33ad0fb2e24383fba38d5d0d
```

این hashها bytes محلیِ اجراشده را مشخص می‌کنند. manifest شامل launcher تازه و uncommitted است؛ صرف baseline SHA به‌عنوان نسخهٔ کامل اجرا ادعا نشده است. ابزارهای diagnostics خارج از source ID هستند و test outcome را تغییر نمی‌دهند.

فرمان‌های واقعی و انتخاب runner:

```powershell
node scripts/open-cart-regression.cjs chrome final-01
node QA/Evidence/Cart-Readiness-2026-11-17/tools/drive-chrome.cjs <EZPost>/QA/Evidence/Cart-Readiness-2026-11-17/chrome-final-01 58226 968
node scripts/open-cart-regression.cjs firefox final-01
node QA/Evidence/Cart-Readiness-2026-11-17/tools/drive-firefox.cjs <EZPost>/QA/Evidence/Cart-Readiness-2026-11-17/firefox-final-01 6000 2324
```

`<EZPost>` در فرمان driver، مسیر absolute همین workspace بود. driver فقط پنجرهٔ اختصاصی runner را کنترل کرد؛ Chrome از CDP و Firefox از RDP استفاده کردند. کلیک spec واقعی، اجرا و assertionها در desktop نمایان بود؛ headless اجرا نشد. ابزارهای تشخیصی Playwright از نسخهٔ cache موجود استفاده کردند، چیزی نصب نشد؛ مسیر cache وابسته به این ماشین است و به معنای dependency عمومی پروژه نیست.

| مرورگر | application-opened | spec-loaded | tests-executed | پایان |
|---|---|---|---|---|
| Chrome | Cypress PID8520 و Chrome PID968؛ پنجره و document visible تأیید شدند | هر دو فایل، loaded.json مستقل | Mocha نهایی + نتیجهٔ هر تست و cleanup ثبت شد | پس از ثبت و تصویر، Cypress قدیمی همین اجرای Chrome برای تعویض مرورگر بسته شد |
| Firefox | Cypress PID5360 و Firefox اختصاصی PID2324؛ پنجره تأیید شد | هر دو فایل، loaded.json مستقل | Mocha نهایی + نتیجهٔ هر تست و cleanup ثبت شد | Cypress و آخرین runner باز گذاشته شدند؛ مرورگر شخصی دست‌نخورده ماند |

| مرورگر / spec | بازهٔ UTC | PASS | FAIL | pending | skipped | not-run |
|---|---|---:|---:|---:|---:|---:|
| Chrome / handoff | 16:32:40–16:33:22 | 4 | 0 | 0 | 0 | 0 |
| Chrome / edit-remove | 16:33:24–16:34:04 | 4 | 0 | 0 | 0 | 0 |
| Firefox / handoff | 16:35:21–16:35:58 | 4 | 0 | 0 | 0 | 0 |
| Firefox / edit-remove | 16:35:59–16:36:37 | 4 | 0 | 0 | 0 | 0 |
| کل live، ۸ ID در دو مرورگر | یک source ID | **16** | **0** | **0** | **0** | **0** |
| controlled-response Cypress در این batch | اجرا نشد | 0 | 0 | 0 | 0 | 0 |

این batch یک تلاش نهایی برای هر spec/مرورگر دارد؛ retry ناموفقِ این regression حذف نشده است، زیرا failure جدیدی در اجرای cart رخ نداد. تلاش‌های تشخیصی ناموفق بالا مستقل حفظ‌اند. نتیجهٔ تاریخی E01 Chrome همچنان FAIL prerequisite است؛ با نتیجهٔ جدید جمع یا بازنویسی نشده است.

## ۳. پوشش اجراشده و رفتارهای غلطی که رد می‌شوند

در همهٔ ردیف‌ها ابتدا session واقعی `user:null` و cart خالی بررسی شد. quote با path محصول، package، quantity و labels هم‌بسته شد؛ cart با قصد مستقل نام/slug/بسته/quantity/composition/summary و مبلغ انتقالی مقایسه شد. این PASSها مربوط به subset تعریف‌شده‌اند، نه PASS کامل والدهای P14/T01–T08.

| ID / traceability محفوظ | subset واقعاً اجراشده | Chrome | Firefox | خطای قابل رد |
|---|---|---|---|---|
| CART-H01 → P14/T02؛ CART-02/03 | desktop، BlackFriday120/q2→cart | PASS | PASS | محصول/بستهٔ دیگر، resetq1، قلم مفقود/اضافه، مبلغ انتقالی قدیمی |
| CART-H02 → P14/T02/U03؛ CART-02/03 | narrow390×844، CTA واقعی mobile، BlackFriday240/q2 | PASS | PASS | عمل‌نکردن CTA، انتقال default120 یا تعداد/مبلغ اشتباه؛ شبیه‌سازی viewport، نه دستگاه واقعی |
| CART-H03 → P14/T02؛ CART-02/03 | BlackFriday120/q2 و Simple25/q1 در یک cart | PASS | PASS | ازدست‌رفتن محصول اول، اختلاط دو محصول، count/composition اشتباه |
| CART-H04 → P14/T02؛ CART-02/03 | دو package120/q2 و240/q1 یک محصول | PASS | PASS | یکی‌شدن پیکربندی‌های متمایز یا جابه‌جایی quantity؛ policy repeated-identical-add را تصویب نمی‌کند |
| CART-E01 → T03/T02؛ CART-04/03 | BlackFriday120/q2→q3→q2؛ Simple25/q1 کامل حفظ شد | PASS | PASS | تغییر خط اشتباه، جهش/بی‌اثرشدن stepper، تغییر یا حذف قلم unaffected؛ چهار checkpoint cart در هر مرورگر |
| CART-E02 → T03/T02؛ CART-04/03 | حذف BlackFriday و حفظ کامل Simple25/q1 | PASS | PASS | باقی‌ماندن هدف، حذف قلم دیگر، quantity/مبلغ/summary غلط |
| CART-E03 → T03/T01؛ CART-04/01 | حذف آخرین Simple→empty→shop→Simple select-ready؛ توقف پیش از Add مجدد | PASS | PASS | empty جعلی همراه item، recovery اشتباه، محصول/quote/selection غلط |
| CART-E04 → T03/U01/U03؛ CART-04 | narrow BlackFriday240/q2→q3→q2 | PASS | PASS | تغییر بسته/خط/تعداد یا مبلغ انتقالی غلط؛ حدود تجاری/ورودی نامعتبر را پوشش نمی‌دهد |

cleanup هر **۱۶ اجرای تست**: `verified-empty-after-normal-remove` و `storageResetUsed:false`. حذف فقط از UI واقعی و پس از احراز ownership محصول/بسته انجام شد. teardown موفق، test body ناموفق را پاس نمی‌کند. fail-closed mutation guard تغییر نکرد؛ هیچ OTP/account/customer-details/checkout/order/payment اجرا نشد. در دادهٔ network ذخیره‌شده، فقط خواندن و quoteهای مجاز دیده شد؛ ledger routeها ممکن است یک exchange را چند بار نمایش دهد و شمار خام آن request یکتا نیست.

مراجع نتایج و تصاویر:

- [Chrome handoff JSON](../Evidence/Cart-Readiness-2026-11-17/chrome-final-01/driver-20988-1794933156207/cart-handoff-results.json)، [تصویر](../Evidence/Cart-Readiness-2026-11-17/chrome-final-01/driver-20988-1794933156207/cart-handoff-final.png)
- [Chrome edit/remove JSON](../Evidence/Cart-Readiness-2026-11-17/chrome-final-01/driver-20988-1794933156207/cart-edit-remove-results.json)، [تصویر](../Evidence/Cart-Readiness-2026-11-17/chrome-final-01/driver-20988-1794933156207/cart-edit-remove-final.png)
- [Firefox handoff JSON](../Evidence/Cart-Readiness-2026-11-17/firefox-final-01/driver-15468-1794933317656/cart-handoff-results.json)، [تصویر](../Evidence/Cart-Readiness-2026-11-17/firefox-final-01/driver-15468-1794933317656/cart-handoff-final.png)
- [Firefox edit/remove JSON](../Evidence/Cart-Readiness-2026-11-17/firefox-final-01/driver-15468-1794933317656/cart-edit-remove-results.json)، [تصویر](../Evidence/Cart-Readiness-2026-11-17/firefox-final-01/driver-15468-1794933317656/cart-edit-remove-final.png)
- [تطبیق شمارش، IDs، cleanup و freeze](../Evidence/Cart-Readiness-2026-11-17/regression-verification.json)

## ۴. correctness، static و محدودیت‌ها

[بازبینی مستقل assertionها](../Evidence/Cart-Readiness-2026-11-17/assertion-review.md) برای هر تست پرسش «اگر رفتار موردادعا خراب باشد، آیا هنوز پاس می‌شود؟» را بررسی کرده است. کنترل‌های validator خالص: **۲ مثبت و ۱۵ منفی موفق**؛ از جمله product/name/slug/package/quantity غلط، summary نادرست، configuration اضافه/مفقود، حذف ناقص، ازدست‌رفتن unaffected، stale amount و **undefined/NaN**. این کنترل‌ها E2E یا controlled-response مرورگر نیستند.

`npm.cmd run check:static`، `node scripts/check-cart-static.cjs`، `node scripts/check-cart-contract.cjs` و syntax check ابزارهای تازه موفق بودند؛ [خروجی static](../Evidence/Cart-Readiness-2026-11-17/static-checks.json) ثبت است. ۳۰ ID اصلی M01 و mappingها دست‌نخورده‌اند. checker تاریخی hashنویس اجرا نشد. `git diff --check` موفق بود؛ raw evidence دارای CRLF است و بررسی کل staged با `git -c core.whitespace=cr-at-eol diff --cached --check` موفق شد. این استثنا فقط برای همان فرمان است؛ اصل شواهد و تنظیمات global تغییر نکردند. هیچ نصب یا ارتقای dependency انجام نشد.

حدود oracle روشن‌اند: quote→UI/cart **presentation consistency** است و صحت مستقل price/tier/rounding/fees را ثابت نمی‌کند. summary بررسی‌شده تعداد بسته است، نه grand total مالی. هویت package در cart با labels شناسایی می‌شود و variant فرضی با labels یکسان را تفکیک نمی‌کند. checkpointهای render زمان محدود دارند. **دو defect باز P10 تغییری نکرده‌اند و rerun نشدند.** landing/M01 و N02-TC04 اجرا نشدند. این پوشش، E2E کامل سفارش/پرداخت نیست.

تفکیک وضعیت: failure تاریخی E01 علت حل‌نشده دارد؛ defect برنامه یا setup defect قطعی اعلام نشده است. probe نشانگر و خطای خواندن body، خطای ابزار تشخیصی‌اند و با outcome برنامه مخلوط نمی‌شوند. هنگام بستن Cypress باقی‌مانده از batch قبلی، چهار خط EPERM مربوط به پاک‌سازی profile به log قدیمی اضافه شد؛ همان suffix در [previous-run-shutdown.log](../Evidence/Cart-Readiness-2026-11-17/previous-run-shutdown.log) منتقل و prefix قدیمی با bytes قبلی و baseline سانیتایزشده تطبیق و حفظ شد؛ نتیجهٔ تاریخی عوض نشد.

## ۵. محدودهٔ انتشار و قدم بعد

فایل‌های جدید این batch: launcher اجرای دو spec، ابزار freeze/driver/observer/تصویر/تطبیق نتیجه، timelineهای هر تلاش و source اجراشدهٔ probe، نتایج/تصاویر اجرای واقعی، دو بازبینی مستقل و این گزارش. فقط checkpoint تازه به cases/matrix اضافه می‌شود؛ تاریخچه حذف نمی‌شود. runtime/profile/cache تحت ignore دقیق همین evidence root محلی می‌مانند. clean filter موجود فقط metadata عمومی را سانیتایز می‌کند و originals محلی حفظ می‌شوند؛ code تست/fixture/config/lockfile فیلتر یا تغییر نشده‌اند. انتشار branch و ادغام عادی در main طبق مجوز همین درخواست انجام می‌شود؛ SHA تحویل پس از remote verification اعلام می‌شود.

بازبینی مستقل staged: ۵۹ فایل شامل ۵۳ متن و ۶ PNG؛ هر۳۰ JSON parse شد، staged blobها با originals و فقط تبدیل sanitizer تطبیق داشتند و هیچ اختلاف توضیح‌داده‌نشده یا credential/session/PII پیدا نشد. شش تصویر پنجرهٔ اختصاصی نیز بصری بررسی شدند. فایل بزرگ غیرعادی و runtime/profile در مجموعهٔ انتشار نیست. این بررسی تضمین نبود همهٔ داده‌های حساس نیست؛ مبنای انتشار، دامنهٔ محدود capture و کنترل محتواست.

حداقل پیش‌نیازهای مرحلهٔ بعد؛ در این task پیاده‌سازی نمی‌شود:

1. تأیید محیط و عملیات auth مجاز، یک هویت ordinary تست اختصاصی و کانال OTP امن/روش ورود پشتیبانی‌شده؛ حساب/کوکی شخصی یا admin لازم نیست و نباید فرستاده شود. هویت دوم فقط برای isolation لازم می‌شود.
2. eligibility مصوب guest/customer×empty/populated، مقصد برگشت و guest→customer merge/retention. redirect فعلی policy مصوب نیست.
3. روش پشتیبانی‌شدهٔ بازگردانی سبد و داده‌هایی که فرم مشتری واقعاً ذخیره می‌کند؛ مجوز guest cart معادل customer/profile writes نیست.
4. مرز دقیق ذخیرهٔ address/profile و ایجاد order، پیش از هر submit؛ دامنهٔ اولیه پیش از order/payment متوقف شود. پس از دسترسی مجاز، inventory واقعی فرم را می‌توان مستقلاً بررسی کرد و نیازی به حدس selector از طرف کاربر نیست.

قواعد OTP منقضی/غلط/resend و فیلدهای واقعی/ارسال/مبالغ فقط وقتی همان slice وارد دامنه شود لازم‌اند. مراجع: [Phase 1، B02/B04/B05/B07 و M05/M08](../Planning/EZPOST_QA_PHASE1_REVIEW.md)، [ماتریس سبد](EZPOST_QA_CART_COVERAGE_MATRIX.md)، [cases سبد](../Test-Cases/EZPOST_QA_CART_TEST_CASES.md).
