# آمادگی استعلام ارسال و مبلغ نهایی EZPost — ۱۸ نوامبر ۲۰۲۶

نتیجهٔ این مرحله، طراحی محدود شش case در [EZPOST_QA_SHIPPING_QUOTE_TEST_CASES.md](../Test-Cases/EZPOST_QA_SHIPPING_QUOTE_TEST_CASES.md) و تعیین پیش‌نیازهای واقعی است. **هیچ تست shipping پیاده‌سازی یا اجرا نشده است: صفر live و صفر controlled-response shipping.** قابلیت لازم برای اجرای کاملاً آفلاین در برابر checkout واقعی و قرارداد کامل shipping در workspace موجود نیست؛ به‌جای آن برنامهٔ ساختگی، mock موفقیت یا placeholder سبز ساخته نشده است.

کار فقط در workspace مستقل Desktop EZPost انجام شد. در این preparation هیچ browser/application request، OTP، تغییر سبد، shipping quote، save/submit مشتری یا نشانی، سفارش و پرداخت انجام نشد. مجوز ورود و test-owned cart در مراحل قبلی، مجوز shipping POST یا trigger خودکار آن نیست. [خلاصهٔ preparation](../Evidence/Shipping-Quote-Preparation-2026-11-18/preparation-summary.json) و [verification محلی](../Evidence/Shipping-Quote-Preparation-2026-11-18/local-verification.json) شواهد همین مرحله‌اند.

## وضعیت‌ها و سابقهٔ محفوظ

| محور | وضعیت این مرحله |
|---|---|
| Design readiness | شش proposal با ID ثابت `SQ-01…SQ-06`؛ قرارداد/fixture/oracle لازم هنوز کامل نیست |
| Authorization | اجرای live shipping، ازجمله auto-trigger و بودجهٔ provider، به مجوز صریح مرحلهٔ آینده نیاز دارد |
| Implementation / execution | shipping specs نوشته نشده‌اند؛ live=۰ و controlled=۰؛ هیچ PASS/FAIL shipping ایجاد نشده است |
| Application defects | این preparation باگ جدیدی تأیید نمی‌کند؛ blocker یا نبود fixture به‌معنی defect برنامه نیست |

[اجرای هدفمند اخیر](EZPOST_QA_CHECKOUT_TARGETED_RERUN_EXECUTION_2026-11-18.md)، Chrome `ACO-H01` و Firefox `CF-F01` را با **۲ PASS** ثبت کرده است. این دو نتیجه مربوط به handoff/form و cleanup‌اند و shipping را شامل نمی‌شوند. batch قبلیِ [regression](EZPOST_QA_CHECKOUT_REGRESSION_EXECUTION_2026-11-18.md) با **۶ تلاش completed، ۲ PASS و ۴ FAIL** و [investigation شکست‌ها](EZPOST_QA_CHECKOUT_FAILURE_INVESTIGATION_2026-11-18.md) بدون بازنویسی محفوظ‌اند. `CF-INV01` و `P10-ORD01/02` باز می‌مانند؛ PASS فرم یا طراحی shipping آنها را مختومه نمی‌کند.

## شواهد موجود چه چیزی را پشتیبانی می‌کنند

| منبع موجود | استفادهٔ معتبر | محدودیت |
|---|---|---|
| [Phase 1، P08/J01 و B03/B05](../Planning/EZPOST_QA_PHASE1_REVIEW.md) | traceability ریسکِ قیمت، نشانی، ارسال و final review؛ ضرورت oracle مستقل | proposalها schedule قیمت، fee/tax یا eligibility مصوب نیستند |
| [بازبینی فرم](EZPOST_QA_CUSTOMER_FORM_AUTHORING_REVIEW_2026-11-17.md) و [caseهای CF](../Test-Cases/EZPOST_QA_CUSTOMER_FORM_TEST_CASES.md) | metadata مشاهده‌شدهٔ fieldها، province/city، draft و خطر trigger shipping با تکمیل نشانی | validity مرورگر، نشانی قابل‌تحویل، سیاست provider یا acceptance سرور نیست |
| [excerpt عمومی checkout](../Evidence/Checkout-Regression-2026-11-18/checkout-form-render-contract.json)، GET تاریخی با۲۰۰ در `2026-11-18T15:18:36.301Z` | branch وابسته به کامل‌بودن نشانی و `scheduleAutoQuote`؛ نمایش مبتنی بر `shipping_irr` و `total_irr` | فایل گزینشی و تاریخی است؛ schema کامل shipping، منطق freshness و formula صحیح total را ثابت نمی‌کند |
| [spec H01](../../cypress/e2e/checkout/authenticated-cart-checkout.cy.js) و [spec CF](../../cypress/e2e/checkout/customer-form.cy.js)، با نتایج هدفمند اخیر | وجود button مرزی shipping، فرم واقعی و بررسی‌های محدود UI؛ owned cart و restore واقعی | button shipping و submit کلیک نشده‌اند؛ نشانی عمداً ناقص بوده و quote ارسال نشده است |
| GET مشاهده‌شدهٔ locations در journey فرم | consistency شهرها با استان انتخاب‌شده و response همان اجرا | مرجع مستقل جغرافیا، کدپستی، قابلیت ارسال یا قیمت مقصد نیست |
| [fixture محصول جاری](../../cypress/fixtures/checkout-observed-2026-11-18.json) و [quoteهای تاریخی محصول](../../cypress/fixtures/ordering-quotes.json) | هویت مستقل انتخاب و presentation محصول در دامنهٔ تاریخ‌دار مربوط | shipping fixture و schedule مصوب قیمت نیستند؛ API response نمی‌تواند oracle مستقل خودش باشد |

excerpt عمومی فقط **۲۱۴ خط** از بازه‌های `1–11`، `53–71`، `77–173`، `261–291`، `319–340`، `342–360` و `486–500` را حفظ کرده است. بخش‌های shipping در فاصلهٔ `174–260`، ادامهٔ rendering totals و module اجرایی services/commerce کامل موجود نیستند. اشاره به endpoint یا توضیح تاریخی auto-trigger، body/schema کامل یا بی‌اثربودن درخواست برای provider را ثابت نمی‌کند. مشاهدهٔ تاریخی نیز تأیید رفتار فعلی shipping نیست.

### نقشهٔ اقدام و اثر جانبی

این تفکیک بر excerpt بالا و [روایت تاریخی handoff](EZPOST_QA_AUTHENTICATED_CHECKOUT_EXECUTION_2026-11-17.md) متکی است؛ در این preparation هیچ‌یک از اقدام‌ها اجرا نشده است.

| اقدام یا branch | شاهد و اثر معلوم | آنچه هنوز معلوم نیست |
|---|---|---|
| GET `/api/v1/shipping/locations` | خواندن دادهٔ province/city در journey قبلی | پاسخ locations، تعرفه، اعتبار postal یا آمادگی provider را ثابت نمی‌کند |
| ویرایش fieldهای نشانی | draft محلی browser از UI ساخته می‌شود؛ comparison synthetic در CF موجود است | وجود draft محلی به‌تنهایی عدم persistence/side effect سرور را ثابت نمی‌کند |
| کامل‌شدن نشانی در edit | روایت inspection قبلی auto-quote با debounce۵۰۰ms را توصیف می‌کند | این عدد SLA مصوب یا timer تأییدشدهٔ رفتار فعلی نیست؛ predicate و handler کامل حفظ نشده‌اند |
| mount و نشانی کاملِ بازیابی‌شده | خطوط۱۳۴–۱۴۱ excerpt می‌توانند `scheduleAutoQuote(state_address.value)` را بدون کلیک فعال کنند | مجوز صرفاً «کلیک shipping» این trigger را پوشش نمی‌دهد؛ تعداد/زمان request تازه هنوز قرارداد لازم دارد |
| pending order منطبق | خطوط۱۳۵–۱۳۸ و۱۶۲–۱۶۶ می‌توانند quote را از shipping/total سفارش قبلی پر کنند | ظاهر quote موفق، اثبات درخواست shipping تازه یا correlation با اقدام همین case نیست |
| دکمهٔ shipping | type=button و حضور مرز آن در inventory فرم بررسی شده‌اند | handler کامل، request body، شمار ارسال و side effect آن capture نشده‌اند |
| POST `/api/v1/shipping/quote` | نام مسیر در روایت قبلی inspection آمده است؛ guard فعلی آن را مجاز نمی‌کند | اثر backend/provider، هزینه، persistence و restore معلوم نیست؛ نام quote مجوز read-onlyبودن نیست |
| submit و checkout | روایت قبلی از `POST /api/v1/checkout` در مسیر عادی ایجاد سفارش می‌گوید؛ branch pending در خطوط۲۷۳–۲۷۷ draft/order ID را ذخیره و به payment route می‌رود | payload و timing دقیق مسیر عادی موجود نیست؛ رفتن به route پرداخت در branch pending، ایجاد سفارش تازه را ثابت نمی‌کند. هیچ submit مجاز نیست |
| Remove عادی خط owned | cleanup موجود، حذف همان خط و بازگردانی cart/local draft و identity را بررسی می‌کند | حذف قلم تست، restoreشدن quote/provider یا اطلاعات احتمالی ذخیره‌شدهٔ سرور را ثابت نمی‌کند |

## قابلیت محلی و علت اجرا‌نشدن controlled shipping

[package.json](../../package.json) و [lockfile](../../package-lock.json) فقط Cypress16.2.1 را به‌عنوان dependency مستقیم دارند؛ Vue/Nuxt/Vite، `@cypress/vue`، jsdom و happy-dom در dependencyهای موجود نصب نیستند. configها E2E هستند و [baseUrl](../../cypress.config.cjs) به برنامهٔ واقعی شرکت اشاره می‌کند؛ build یا dev server محلی checkout وجود ندارد. [آرشیو source](../Evidence/Checkout-Regression-2026-11-18/historical-source/manifest.json) مربوط به QA harness/config/fixture است، نه frontend اجرایی محصول.

نمونهٔ [controlled quote محصول](../../cypress/e2e/ordering/controlled/quote-presentation.cy.js) از `cy.intercept()` برای پاسخ استفاده می‌کند، اما با `cy.visit()` صفحه و assets واقعی را از شبکه می‌گیرد. پس وجود این نمونه، امکان shipping E2E کاملاً آفلاین را ثابت نمی‌کند. [guard checkout](../../cypress/support/authenticated-checkout.js) نیز shipping POST را fail-closed رد می‌کند و برای این preparation باز نشده است.

اجرای آفلاینِ معتبر به production build/module graph واقعی و runtime آن، قرارداد request/response و fixtureهای مجاز نیاز دارد. بازنویسی fragment به یک checkout آزمایشی یا ساخت state machine تازه و آزمودن پاسخ‌های آن، پوشش برنامهٔ واقعی ایجاد نمی‌کند. native-input probe، observer VM و pure oracleهای موجود نیز چنین جایگاهی ندارند. می‌توان correctness خودِ ابزار آزمون را محلی challenge کرد؛ نتیجه باید با عنوان harness/oracle check گزارش شود، نه PASS shipping UI یا backend.

## شش case پیشنهادی و مانع اصلی

| ID | هدف محدود | پیش‌نیاز تعیین‌کننده |
|---|---|---|
| SQ-01 | ورودی مجاز و ارتباط intent با quote و نمایش نهایی | قرارداد واقعی، fixture امن، totals DOM و oracle مستقل |
| SQ-02 | رفتار نشانی ناقص و مرز request/feedback | تعریف completeness و سیاست trigger/عدم trigger؛ به‌جای فرض عمومی از یک sentinel قبلی |
| SQ-03 | محاسبهٔ مجدد پس از تغییر ورودی مؤثر | ورودی‌های مؤثر، freshness/invalidation و انتظار display/pending مصوب |
| SQ-04 | پاسخ‌های خارج از ترتیب | کنترل واقعی زمان پاسخ روی production SUT، correlation intent و قرارداد latest-result؛ cancellation مشروع نباید failure مصنوعی بسازد |
| SQ-05 | failure و recovery کنترل‌شده | schema خطا، سیاست retry، حفظ/ابطال quote قبلی و محیط fault-safe |
| SQ-06 | آشکارکردن اختلاف quote/intent/display | oracle مستقل و assertions هم‌زمان روی هویت، input و totals؛ بدون تغییر انتظار به پاسخ نادرست |

این جدول تصویب expected behavior نیست. schema، مبلغ نمونه، selector، پیام دقیق یا formula مالی برای پرکردن خلأها اختراع نشده است. IDها و traceability تفصیلی در سند caseها نگه‌داری می‌شوند؛ هیچ‌یک از این ردیف‌ها PASS یا اجرای آمادهٔ بدون شرط محسوب نمی‌شود.

## ثبت کامل blockerها

| کلید | اطلاعات یا قابلیت مفقود | اثر بر ادامه |
|---|---|---|
| SQ-B01 | قرارداد کامل client/serviceِ shipping، method/path/body، success/error response و correlation واقعی | replay یا assertion schema بدون حدس ممکن نیست |
| SQ-B02 | production checkout اجرایی آفلاین همراه runtime/module graph و assets | controlled shipping کاملاً آفلاین در برابر AUT واقعی قابل اجرا نیست |
| SQ-B03 | مرجع مستقل مصوب قیمت، currency، اجزای total، tax/fee/discount و rounding | مبلغ صحیح یا رابطهٔ تجاری subtotal/payable قابل تصویب از پاسخ خود برنامه نیست |
| SQ-B04 | readiness، trigger/recalculation، freshness، pending display، invalidation و retry policy | مشاهدهٔ implementation جای expected behavior مصوب را نمی‌گیرد |
| SQ-B05 | نشانی synthetic، cart و fixtureهای provider-safe مورد تأیید تیم | نشانی یا دادهٔ سرویس واقعی/جعلیِ مناسب نباید اختراع شود |
| SQ-B06 | محیط مجاز، شناخت side effectهای provider و restore پشتیبانی‌شده | read-onlyبودن احتمالی POST یا بی‌هزینه‌بودن quote فرض نمی‌شود |
| SQ-B07 | مجوز صریح live quote آینده، شامل auto-trigger و بودجهٔ محدود درخواست | ورود/سبد مجاز قبلی، اجازهٔ shipping نیست؛ اکنون هیچ quote ارسال نشود |
| SQ-B08 | single-writer تازه، ورود دستی همان identity، preAdd baseline، ownership و postRemove oracle | اجرای آینده نباید از نشست/تأیید قبلی یا cart ناشناس برای restored استفاده کند |
| SQ-B09 | قرارداد کامل DOM و rendering واحد پول و تمام components مبلغ نهایی | وجود shipping button و fieldها، inventory کامل totals یا selectorهای آنها نیست |

مرجع مصوب shipping/pricing یا سیاست مالی مستقل در اسناد و fixtureهای workspace پیدا نشد؛ این نتیجه محدود به فایل‌های موجود است و ادعای نبود چنین مرجعی نزد تیم محصول نیست. **SQ-B02 فقط prerequisite اجرای کاملاً آفلاین است و شرط لازم برای live روی برنامهٔ واقعی نیست.** در اولین live subset معتبر، قرارداد trigger/readiness مرتبط از B04 لازم است؛ تمام سیاست‌های failure/recovery برای همین subset پیش‌شرط نمی‌شوند و caseهای خطا تا روشن‌شدن policy خودشان جدا blocked می‌مانند. نبود B03 نیز لایهٔ monetary correctness را محدود می‌کند؛ correlation/presentation پس از حل blockerهای فنی مرتبط به‌صورت مستقل قابل‌تفکیک‌اند. برای simulation، role/session ساختگی باید صریحاً شبیه‌سازی نامیده شود و proof دسترسی واقعی سرور نیست.

## verification و نقطهٔ ادامه

در [local-verification.json](../Evidence/Shipping-Quote-Preparation-2026-11-18/local-verification.json)، ساعت `2026-11-18T17:56:43.302Z`، هر **۸ بررسی موجود با exit code صفر** ثبت شده‌اند. Node برابر24.19.0 و Cypress نصب‌شده16.2.1 است؛ application requests، browser tests و shipping tests هر سه صفر هستند. dependency نصب یا ارتقا داده نشده است.

| فرمان واقعاً اجراشده | نتیجهٔ محلی و حد آن |
|---|---|
| `node scripts/check-portability.cjs` | PASS؛ سازگاری انتقال/تنظیمات و تاریخچهٔ موجود، بدون بررسی شبکه یا اجرای browser |
| `node scripts/check-authenticated-checkout-static.cjs` | PASS؛ syntax و حفاظت source/guardهای قبلی؛ بدون اجرای checkout |
| `node scripts/check-authenticated-checkout-contract.cjs` | PASS؛ ۳۱ check مثبت و۸۲ منفیِ pure ownership/restoration؛ نه shipping یا قیمت |
| `node scripts/check-customer-form-static.cjs` | PASS؛ assertionهای ایستای فرم و حفظ محدودیت native input/عدم submit؛ نه اجرای فرم تازه |
| `node scripts/check-checkout-auth-sequence.cjs` | PASS؛ ۴۷ check مثبت و۴۳ منفیِ pure؛ نه تحویل SMS یا ورود تازه |
| `node scripts/check-checkout-failure-diagnostics.cjs` | PASS؛ ۱۸۰ assertion در۱۸ گروه؛ correctness ابزار diagnostics، نه capture خطای live shipping |
| `node scripts/check-checkout-observer.cjs` | PASS؛ ۶۷ assertion در۶ گروه VM؛ نه رفتار shipping UI |
| `node scripts/check-checkout-regression-evidence.cjs` | PASS؛ سازگاری artifactهای شش تلاش تاریخی۲ PASS/۴ FAIL؛ هیچ‌یک دوباره اجرا نشده‌اند |

همچنین ۱۶ فایل source/history محافظت‌شده با مبنا تطبیق دارند؛ artifactهای دو PASS اخیر hash ثابت و manifestهای۳۲فایلی محفوظ دارند. این بررسی‌ها ادعای نتیجهٔ تازه برای caseهای shipping یا اثبات قیمت/response handling/recovery برنامه ایجاد نمی‌کنند. آزمون harness/oracle با دادهٔ حافظه یا VM، جای اجرای production shipping client نیست.

تصمیم‌های واقعیِ باقی‌مانده در سه بسته جمع می‌شوند: **قرارداد و expected behavior** شامل B01/B03/B04/B09؛ **setup و دادهٔ امن** شامل B02/B05/B06؛ و **مجوز و prerequisite اجرای live** شامل B07/B08. دریافت این اطلاعات از تیم و ارائهٔ setup واقعی، قدم بعدی است. تا آن زمان شش case در سطح طرح باقی می‌مانند و **controlled shipping پیاده‌سازی‌شده=۰، controlled shipping اجراشده=۰ و live shipping=۰** حفظ می‌شود. ارسال نشانی، shipping quote، سفارش، پرداخت یا M02 خودکار آغاز نمی‌شود.

حداقل checklist پیش از نخستین live quote، در دامنهٔ معتبر و محدود:

1. محیط دقیق و provider مجاز مشخص شوند؛ اثر/هزینهٔ quote و persistence احتمالی و روش restore پشتیبانی‌شده روشن باشد. فقط Remove قلم سبد، restore سرویس shipping نیست.
2. `A1/A2`، گیرنده و موبایل synthetic مجاز، postal/province/city مناسب provider و cart با package/quantity/وزن معلوم فراهم شوند؛ مقدار واقعی یا نشانی مناسب از روی حدس ساخته نشود.
3. قرارداد request/response و DOM/واحد totals مشخص باشد؛ reference مستقل قیمت برای claim صحت مبلغ آماده شود. اگر فقط presentation اجرا می‌شود، همین محدودیت صریحاً ثبت شود.
4. مجوز صریح تکمیل نشانی و triggerهای auto از edit/mount و مسیر دستی، همراه سقف محدود requestها برقرار باشد؛ بدون submit/save/order/payment و بدون retry خودکار نامحدود.
5. همان هویت عادی با ورود manual-assisted تازه، single-writer همان بازه، preAdd baseline و نبود pending order/draft ناشناخته، ownership و postRemove session/me/cart/draft در guard واقعی احراز شوند؛ تأیید و PASS گذشته جای این شروط را نمی‌گیرد.
