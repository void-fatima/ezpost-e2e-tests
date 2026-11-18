# فهرست گزارش‌ها EZPost

**نقطهٔ ادامهٔ جاری — اجرای rerun هدفمند، ۱۸ نوامبر ۲۰۲۶:** [گزارش اجرای واقعی](EZPOST_QA_CHECKOUT_TARGETED_RERUN_EXECUTION_2026-11-18.md)، [خلاصهٔ evidence](../Evidence/Checkout-Targeted-Rerun-2026-11-18/execution-summary.json)، [gate تأییدشدهٔ همین بازه](../Evidence/Checkout-Targeted-Rerun-2026-11-18/execution-gate.json)، [بررسی‌های محلی](../Evidence/Checkout-Targeted-Rerun-2026-11-18/static-verification.json) و [راهنمای ادامه](EZPOST_QA_CONTINUATION_GUIDE.md) مرجع جاری‌اند. **۲ تست live، ۲ PASS، صفر FAIL / pending / skipped / NOT RUN:** Chrome `ACO-H01` (`chrome-r18h1`) و سپس Firefox `CF-F01` (`firefox-r18f1`)، در Cypress نمایان `16.2.1`. ورود هر دو manual-assisted بود؛ بررسی‌های پس از ورود و cleanup خودکار بودند. یک Add و یک Remove متعلق به هر run، session و `/me` بعد حذف، سبد اولیه و draft همگی تأیید شدند؛ recovery دستی لازم نشد. این PASSها تاریخچهٔ ۶ تلاشِ قبلی با ۲ PASS / ۴ FAIL را تغییر نمی‌دهند.

source مبنا `1aca2f77a879d182994b96ed0b528c40ac5d888f` است؛ SHA نهایی انتشار از remote main گرفته شود. assertionها، timeoutها، fixtureها و guardها تغییر نکردند. مرزهای Firefox ۱۲۱→۱۲۰ و ۳۰۱→۳۰۰ در این اجرا موفق‌اند؛ علل failureهای قبلی ثابت نشده‌اند. `CF-INV01` و `P10-ORD01/02` بازند. هیچ form submit، shipping quote، customer/profile/address save، سفارش یا پرداختی انجام نشده است. observer با failure تازه مواجه نشد؛ این batch اثبات liveِ ثبت failure نیست. runtime خصوصی منتشر نمی‌شود. هر اجرای آینده single-writer تازه و baseline/ownership زنده می‌خواهد؛ HTTP429 موجب توقف OTP می‌شود.

**checkpoint تاریخی — آمادگی rerun هدفمند، ۱۸ نوامبر ۲۰۲۶:** از [گزارش آمادگی](EZPOST_QA_CHECKOUT_TARGETED_RERUN_PREPARATION_2026-11-18.md)، [شواهد آمادگی](../Evidence/Checkout-Rerun-Preparation-2026-11-18/) و [راهنمای ادامه](EZPOST_QA_CONTINUATION_GUIDE.md) شروع کنید. مبنا `e044f7c386041894a50d3a6a717890a80378de6b` است؛ SHA نهایی این الحاق پس از انتشار باید از remote main گرفته شود. هیچ launcher، OTP، cart write یا E2E تازه شروع نشده؛ وضعیت تازه **۰ PASS / ۰ FAIL / ۲ NOT RUN** برای Chrome `ACO-H01` handoff و سپس Firefox `CF-F01` form است، نه auth-setup FAIL.

دو پیش‌نیاز هنوز تأیید نشده‌اند: **تأیید صریح تیم EZPost دربارهٔ بازیابی پشتیبانی‌شدهٔ OTP یا retry مجاز برای همان هویت تعیین‌شده**، و **single-writer تازه برای بازهٔ اجرای جدید**. پس از آنها نیز ورود manual-assisted، baseline زندهٔ preAdd و ownership/session/draft داخل guard لازم‌اند؛ تأیید اجرای قبلی کافی نیست. هر HTTP429 آینده موجب توقف بدون resend است. observer فقط local/VM بررسی شده؛ برای این آمادگی تغییر spec/support/fixture لازم نیست و هیچ PASS live از بررسی محلی ساخته نمی‌شود. `CF-INV01` و `P10-ORD01/02` بازند.

[diagnostic-checks](../Evidence/Checkout-Rerun-Preparation-2026-11-18/diagnostic-checks.json) دو PASS محلیِ ۱۸۰ assertion/۱۸ گروه و ۶۷ assertion/۶ گروه، [product-preflight](../Evidence/Checkout-Rerun-Preparation-2026-11-18/product-preflight.json) جمع چهار GET عمومی با ۲۰۰ و تطابق identity/package، و [execution-gate](../Evidence/Checkout-Rerun-Preparation-2026-11-18/execution-gate.json) دو تأیید missing را مستند می‌کنند. این‌ها DOM، قیمت مستقل یا رفع rate limit را ثابت نمی‌کنند؛ اختلاف نام package API با عنوان UI تاریخ‌دار نیز به‌خودی‌خود defect یا مجوز تغییر assertion نیست.

**checkpoint تاریخی — investigation، ۱۸ نوامبر ۲۰۲۶:** از [بررسی شکست‌های checkout](EZPOST_QA_CHECKOUT_FAILURE_INVESTIGATION_2026-11-18.md) و بخش جدید [راهنمای ادامه](EZPOST_QA_CONTINUATION_GUIDE.md) شروع کنید. مبنا `bba38588f2a25f21d9e4a03cf0a22a63464acb31` است؛ SHA نهایی پس از انتشار از آخرین remote main گرفته شود. [شواهد جدید](../Evidence/Checkout-Investigation-2026-11-18/) شامل [preflight عمومی](../Evidence/Checkout-Investigation-2026-11-18/product-preflight.json) است: سه GET نهاییِ ثبت‌شده و سه GET اولیهٔ probe، جمعاً شش GET، بدون OTP/cart write یا اجرای E2E. sourceهای spec/support/fixture و نتایج تاریخی تغییر نکرده‌اند؛ batch قبلی همچنان **۲ PASS / ۴ FAIL از ۶ تلاش** است.

در Chrome، `/cart` ثبت‌شده در progress bookkeeping است و مسیر واقعی لحظهٔ شکست/redirect را ثابت نمی‌کند. در Firefox، نخستین عملیات تأییدنشده **line119 پاک‌کردن آدرس** است؛ رسیدن به province menu یا Enter ثابت نشده. primary failure، hydration، hook animation، visibility پس از تست و recovery مستقل جدا بررسی شده‌اند؛ recovery یک PASS تازه نیست. روش پشتیبانی‌شدهٔ رفع HTTP429 هنوز نامعلوم است. ادامهٔ هدفمند Chrome H01 و Firefox CF به همان identity، ورود تازهٔ manual-assisted، single-writer واقعیِ تازه و پنجرهٔ visible نیاز دارد. diagnostics خارجی فقط محلی بررسی شده و live-certified نیست؛ `CF-INV01` و `P10-ORD01/02` بازند و اجرای جدیدی خودکار آغاز نشده است.

## checkpointهای تاریخی محفوظ

نقطهٔ تحویل: ۱۷ نوامبر ۲۰۲۶. همهٔ پیوندها نسبت به همین مخزن هستند.

از [راهنمای ادامهٔ کار](EZPOST_QA_CONTINUATION_GUIDE.md) شروع کنید. گزارش‌های تاریخی، وضعیت همان زمان را حفظ می‌کنند؛ PASS جدید، شکست قبلی را حذف نمی‌کند.

**افزودهٔ تاریخی — رگرسیون، ۱۸ نوامبر ۲۰۲۶:** از [اجرای regression checkout](EZPOST_QA_CHECKOUT_REGRESSION_EXECUTION_2026-11-18.md) و [بازبینی guard/ownership](EZPOST_QA_CHECKOUT_GUARD_REVIEW_2026-11-18.md) شروع کنید. شش attempt تکمیل‌شدهٔ دو case موجود،۲ PASS و۴ FAIL دارند؛ آخرین retryِ Firefox در OTP-start با HTTP429 متوقف شد و ورود/فرم آن اجرا نشد. OTP تازه خودکار فرستاده نشود. تاریخ و شمار فایل‌های جدول evidence پایین، snapshot تحویل تاریخی۱۷ نوامبر هستند و inventory جدید تلقی نشوند.

## گزارش‌ها و اسناد بازبینی

| File | Location |
|---|---|
| EZPOST_QA_CHECKOUT_TARGETED_RERUN_EXECUTION_2026-11-18.md | [Open](EZPOST_QA_CHECKOUT_TARGETED_RERUN_EXECUTION_2026-11-18.md) |
| EZPOST_QA_CHECKOUT_TARGETED_RERUN_PREPARATION_2026-11-18.md | [Open](EZPOST_QA_CHECKOUT_TARGETED_RERUN_PREPARATION_2026-11-18.md) |
| EZPOST_QA_CHECKOUT_FAILURE_INVESTIGATION_2026-11-18.md | [Open](EZPOST_QA_CHECKOUT_FAILURE_INVESTIGATION_2026-11-18.md) |
| EZPOST_QA_CHECKOUT_PUBLICATION_2026-11-18.md | [Open](EZPOST_QA_CHECKOUT_PUBLICATION_2026-11-18.md) |
| EZPOST_QA_CHECKOUT_GUARD_REVIEW_2026-11-18.md | [Open](EZPOST_QA_CHECKOUT_GUARD_REVIEW_2026-11-18.md) |
| EZPOST_QA_CHECKOUT_REGRESSION_EXECUTION_2026-11-18.md | [Open](EZPOST_QA_CHECKOUT_REGRESSION_EXECUTION_2026-11-18.md) |
| EZPOST_QA_AUTHENTICATED_CHECKOUT_AUTHORING_REVIEW_2026-11-17.md | [Open](EZPOST_QA_AUTHENTICATED_CHECKOUT_AUTHORING_REVIEW_2026-11-17.md) |
| EZPOST_QA_AUTHENTICATED_CHECKOUT_EXECUTION_2026-11-17.md | [Open](EZPOST_QA_AUTHENTICATED_CHECKOUT_EXECUTION_2026-11-17.md) |
| EZPOST_QA_AUTHENTICATED_SESSION_EXECUTION_2026-11-17.md | [Open](EZPOST_QA_AUTHENTICATED_SESSION_EXECUTION_2026-11-17.md) |
| EZPOST_QA_AUTHENTICATION_EXECUTION_2026-11-17.md | [Open](EZPOST_QA_AUTHENTICATION_EXECUTION_2026-11-17.md) |
| EZPOST_QA_CART_COVERAGE_MATRIX.md | [Open](EZPOST_QA_CART_COVERAGE_MATRIX.md) |
| EZPOST_QA_CART_DELIVERY_2026-11-17.md | [Open](EZPOST_QA_CART_DELIVERY_2026-11-17.md) |
| EZPOST_QA_CART_EDIT_REMOVE_EXECUTION_2026-11-17.md | [Open](EZPOST_QA_CART_EDIT_REMOVE_EXECUTION_2026-11-17.md) |
| EZPOST_QA_CART_HANDOFF_EXECUTION_2026-11-17.md | [Open](EZPOST_QA_CART_HANDOFF_EXECUTION_2026-11-17.md) |
| EZPOST_QA_CART_PUBLICATION_AUDIT_2026-11-17.md | [Open](EZPOST_QA_CART_PUBLICATION_AUDIT_2026-11-17.md) |
| EZPOST_QA_CART_READINESS_REGRESSION_2026-11-17.md | [Open](EZPOST_QA_CART_READINESS_REGRESSION_2026-11-17.md) |
| EZPOST_QA_CONTINUATION_GUIDE.md | [Open](EZPOST_QA_CONTINUATION_GUIDE.md) |
| EZPOST_QA_CUSTOMER_FORM_AUTHORING_REVIEW_2026-11-17.md | [Open](EZPOST_QA_CUSTOMER_FORM_AUTHORING_REVIEW_2026-11-17.md) |
| EZPOST_QA_CUSTOMER_FORM_EXECUTION_2026-11-17.md | [Open](EZPOST_QA_CUSTOMER_FORM_EXECUTION_2026-11-17.md) |
| EZPOST_QA_ORDERING_COVERAGE_AUDIT_2026-11-14.md | [Open](EZPOST_QA_ORDERING_COVERAGE_AUDIT_2026-11-14.md) |
| EZPOST_QA_ORDERING_COVERAGE_MATRIX.md | [Open](EZPOST_QA_ORDERING_COVERAGE_MATRIX.md) |
| EZPOST_QA_ORDERING_EXECUTION_2026-11-14.md | [Open](EZPOST_QA_ORDERING_EXECUTION_2026-11-14.md) |
| EZPOST_QA_ORDERING_IMPLEMENTATION_2026-11-14.md | [Open](EZPOST_QA_ORDERING_IMPLEMENTATION_2026-11-14.md) |
| EZPOST_QA_P10_STALE_QUOTE_BUG_2026-11-17.md | [Open](EZPOST_QA_P10_STALE_QUOTE_BUG_2026-11-17.md) |
| EZPOST_QA_P10_TEST_CORRECTNESS_2026-11-17.md | [Open](EZPOST_QA_P10_TEST_CORRECTNESS_2026-11-17.md) |
| EZPOST_QA_PORTABILITY_VERIFICATION_2026-11-17.md | [Open](EZPOST_QA_PORTABILITY_VERIFICATION_2026-11-17.md) |
| EZPOST_QA_PHASE2_M01_AUTOMATION_COVERAGE.md | [Open](EZPOST_QA_PHASE2_M01_AUTOMATION_COVERAGE.md) |
| EZPOST_QA_PHASE2_M01_CYPRESS_EXECUTION_2026-11-14.md | [Open](EZPOST_QA_PHASE2_M01_CYPRESS_EXECUTION_2026-11-14.md) |
| EZPOST_QA_PHASE2_M01_DECISIONS.md | [Open](EZPOST_QA_PHASE2_M01_DECISIONS.md) |
| EZPOST_QA_PHASE2_M01_FINAL_REVIEW.md | [Open](EZPOST_QA_PHASE2_M01_FINAL_REVIEW.md) |
| EZPOST_QA_PHASE2_M01_INTERACTIVE_EXECUTION_2026-11-14.md | [Open](EZPOST_QA_PHASE2_M01_INTERACTIVE_EXECUTION_2026-11-14.md) |
| M01-AUTHORING-STATIC-VERIFICATION.json | [Open](M01-AUTHORING-STATIC-VERIFICATION.json) |
| MIGRATION_MANIFEST.md | [Open](MIGRATION_MANIFEST.md) |
| P10-ORD01_BRANCH.md | [Open](P10-ORD01_BRANCH.md) |
| P10-ORD02_BRANCH.md | [Open](P10-ORD02_BRANCH.md) |
| PUBLICATION_MANIFEST.md | [Open](PUBLICATION_MANIFEST.md) |

## برنامه‌ریزی و کیس‌های تست

| File | Location |
|---|---|
| EZPOST_QA_PHASE1_REVIEW.md | [Open](../../QA/Planning/EZPOST_QA_PHASE1_REVIEW.md) |
| EZPOST_QA_AUTHENTICATED_CHECKOUT_TEST_CASES.md | [Open](../../QA/Test-Cases/EZPOST_QA_AUTHENTICATED_CHECKOUT_TEST_CASES.md) |
| EZPOST_QA_AUTHENTICATED_SESSION_TEST_CASES.md | [Open](../../QA/Test-Cases/EZPOST_QA_AUTHENTICATED_SESSION_TEST_CASES.md) |
| EZPOST_QA_AUTHENTICATION_TEST_CASES.md | [Open](../../QA/Test-Cases/EZPOST_QA_AUTHENTICATION_TEST_CASES.md) |
| EZPOST_QA_CART_TEST_CASES.md | [Open](../../QA/Test-Cases/EZPOST_QA_CART_TEST_CASES.md) |
| EZPOST_QA_CUSTOMER_FORM_TEST_CASES.md | [Open](../../QA/Test-Cases/EZPOST_QA_CUSTOMER_FORM_TEST_CASES.md) |
| EZPOST_QA_ORDERING_TEST_CASES.md | [Open](../../QA/Test-Cases/EZPOST_QA_ORDERING_TEST_CASES.md) |
| EZPOST_QA_PHASE2_M01_TEST_CASES.md | [Open](../../QA/Test-Cases/EZPOST_QA_PHASE2_M01_TEST_CASES.md) |

## پوشه‌های شواهد محفوظ

شمارش زیر مربوط به ۶۹۶ فایل evidence ثبت‌شده در Git در نقطهٔ تحویل است؛ runtime یا پروفایل خصوصی در آن نیست.

| Evidence folder | Tracked files |
|---|---|
| [.playwright-mcp](../Evidence/.playwright-mcp/) | 15 |
| [Auth-2026-11-17](../Evidence/Auth-2026-11-17/) | 38 |
| [Authenticated-Checkout-2026-11-17](../Evidence/Authenticated-Checkout-2026-11-17/) | 100 |
| [Authenticated-Session-2026-11-17](../Evidence/Authenticated-Session-2026-11-17/) | 33 |
| [Cart-2026-11-17](../Evidence/Cart-2026-11-17/) | 20 |
| [Cart-Cypress](../Evidence/Cart-Cypress/) | 114 |
| [Cart-Readiness-2026-11-17](../Evidence/Cart-Readiness-2026-11-17/) | 54 |
| [M01-Authoring-2026-11-11](../Evidence/M01-Authoring-2026-11-11/) | 5 |
| [M01-Cypress](../Evidence/M01-Cypress/) | 93 |
| [M01-Final-Review-2026-11-11](../Evidence/M01-Final-Review-2026-11-11/) | 10 |
| [Ordering-Authoring-2026-11-14](../Evidence/Ordering-Authoring-2026-11-14/) | 38 |
| [Ordering-Coverage-Audit-2026-11-14](../Evidence/Ordering-Coverage-Audit-2026-11-14/) | 25 |
| [Ordering-Cypress](../Evidence/Ordering-Cypress/) | 151 |

پروفایل‌های خصوصی، مقادیر OTP/session، اطلاعات ورود، dependencyهای دانلودشده و نسخه‌های خصوصی بازبینی انتشار در مخزن نیستند. خواندن گزارش‌ها و اجرای بررسی‌های ایستای مستند به این فایل‌های خصوصی نیاز ندارد.

## شواهد افزودهٔ ۱۸ نوامبر

[Checkout-Regression-2026-11-18](../Evidence/Checkout-Regression-2026-11-18/) شامل قرارداد عمومی resend، بررسی404 محصولات تاریخی، DOM/قرارداد عمومی محصول جاری و آرشیو hashدار source تاریخی است. evidence اجرای تازه با labelهای `chrome-regression-20261118-*`، `firefox-f18h`، `firefox-f18c` و `firefox-f18r` زیر [پوشهٔ checkout موجود](../Evidence/Authenticated-Checkout-2026-11-17/) حفظ شده‌اند؛ تاریخ نام پوشه به‌تنهایی تاریخ اجرا نیست. source manifest، زمان result و گزارش جدید مرجع هر attempt هستند. recovery جداگانهٔ Firefox جای failure تست را نگرفته است؛ فایل‌های خصوصی runtime و session همچنان excluded هستند.
