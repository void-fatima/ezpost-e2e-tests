# فهرست گزارش‌ها EZPost

**گزارش جامع امروز، ۱۸ نوامبر ۲۰۲۶:** [گزارش روزانهٔ QA](EZPOST_QA_DAILY_REPORT_2026-11-18.md)؛ رگرسیون اولیه۶تلاش/۲PASS/۴FAIL، rerun هدفمند۲PASS، و دو تلاش جداگانهٔ SQ-01 هرکدام runner FAIL / shipping BLOCKED با restoration تأییدشده. جمع تلاش‌ها، تعداد case مستقل یا یک suite یکپارچه نیست. guide و source/evidence قابل‌انتقال همراه گزارش تحویل می‌شوند؛ private runtime و latchها محلی‌اند و نبودشان در clone جدید مجوز تکرار run نیست.

**نقطهٔ ادامهٔ جاری — اجرای تازهٔ SQ-01 با guard اصلاح‌شده، ۱۸ نوامبر ۲۰۲۶:** [گزارش sq18b](EZPOST_QA_SQ01_FRESH_EXECUTION_2026-11-18.md)، [خلاصهٔ اجرا](../Evidence/SQ01-Live-2026-11-18/chrome-sq18b/execution-summary.json)، [اولین علت guard](../Evidence/SQ01-Live-2026-11-18/chrome-sq18b/driver-24160-1795033553255/first-guard-rejection.json) و [restoration مستقل](../Evidence/SQ01-Live-2026-11-18/chrome-sq18b/independent-restoration.json) مرجع جاری‌اند. **runner صفر PASS/یک FAIL؛ SQ-01 BLOCKED/NOT EVALUATED؛ cleanup VERIFIED.** کد این تلاش `SHIPPING_POSTAL_NOT_LAST` در `awaiting-address` است؛ علت رویدادی کامل معلوم نیست و علت تاریخی sq18a همچنان UNKNOWN می‌ماند. صفر shipping quote مجاز و صفر response؛ assertionهای نمایش اجرا نشدند. همان قلم تست با UI حذف و هویت/سبد/draft بعد حذف تأیید شد؛ assertion ایمنی آخر hook جدا FAIL ماند. latch تازه جدا و هر دو latch محفوظ‌اند؛ retry یا run تازه آغاز نشود. کدها و گزارش‌ها محلی و commit/pushنشده‌اند.

## checkpoint تاریخی — بررسی محلی guard

**نقطهٔ ادامهٔ جاری — بررسی محلی guard SQ-01، ۱۸ نوامبر ۲۰۲۶:** [گزارش بررسی guard](EZPOST_QA_SQ01_GUARD_REVIEW_2026-11-18.md)، [نتایج local/VM](../Evidence/SQ01-Guard-Review-2026-11-18/local-verification.json)، [فهرست reason codeها](../Evidence/SQ01-Guard-Review-2026-11-18/rejection-codebook.json)، [حفظ تاریخچه با hash](../Evidence/SQ01-Guard-Review-2026-11-18/preservation-verification.json) و [راهنمای ادامه](EZPOST_QA_CONTINUATION_GUIDE.md) مرجع جاری‌اند. علت دقیق رد `chrome-sq18a` **UNKNOWN**؛ runner اصلی **صفر PASS/یک FAIL**؛ SQ-01 **BLOCKED/NOT EVALUATED** و restoration موفق محفوظ‌اند. ابزار فقط کد/category/مرحله و flagهای بی‌مقدار خصوصی ثبت می‌کند و اولین رخداد را از cleanup جدا حفظ می‌کند. checker محلی۳۰سناریو/۱۸۹۴assertion/۲۴مقایسهٔ محدود با آرشیو و diagnostics۲۰مثبت/۲۲منفی PASS شدند؛ این‌ها live E2E نیستند. هر۶۰فایل تاریخی دست‌نخورده و safety rules، assertionها و timeoutها محفوظ‌اند. OTP، cart mutation، quote و اجرای Cypress تازه صفر؛ latch reset نشده و commit/push انجام نشده است.

## checkpoint تاریخی — اجرای SQ-01

**نقطهٔ ادامهٔ جاری — اجرای SQ-01، ۱۸ نوامبر ۲۰۲۶:** [گزارش اجرا](EZPOST_QA_SQ01_EXECUTION_2026-11-18.md)، [خلاصهٔ نتیجه](../Evidence/SQ01-Live-2026-11-18/chrome-sq18a/execution-summary.json)، [restoration مستقل](../Evidence/SQ01-Live-2026-11-18/chrome-sq18a/independent-restoration.json) و [راهنمای ادامه](EZPOST_QA_CONTINUATION_GUIDE.md) مرجع جاری‌اند. **بررسی shipping برابر BLOCKED/NOT EVALUATED؛ runner واقعی صفر PASS/یک FAIL؛ quote مجاز واقعی صفر؛ retry صفر؛ سبد/draft restored.** یک عملیات به‌وسیلهٔ guard رد شد، ولی code/category دقیق آن ثبت نشد؛ علت را حدس نزنید و باگ برنامه اعلام نکنید. assertion ایمنی آخر hook جدا FAIL ماند، پس کل hook را PASS ننامید. تعرفه طبق دستور جدید مفروض و خارج از scope است. source۳۹فایلی اجرا آرشیو شده؛ نتایج قبلی و issueهای باز محفوظ‌اند؛ این الحاق محلی منتشر نشده است.

## checkpoint تاریخی — preflight نمونهٔ SQ-01

**نقطهٔ ادامهٔ جدید — SQ-01، ۱۸ نوامبر ۲۰۲۶:** [پیش‌بررسی نمونهٔ دو بسته](EZPOST_QA_SQ01_PREFLIGHT_2026-11-18.md)، [۹ GET عمومی و facts محصول](../Evidence/SQ01-Preflight-2026-11-18/preflight-summary.json)، [گزیده‌های نگاشت client](../Evidence/SQ01-Preflight-2026-11-18/client-contract-excerpts.json) و [verification محلی](../Evidence/SQ01-Preflight-2026-11-18/local-verification.json) مرجع جدیدند. بسته۶۳/۱۴۰لیبل در کاتالوگ فعلی موجود است؛ quantity۲ و وزن در سبد تازه اجرا/احراز نشده‌اند. **SQ-01.A display consistency: NOT RUN؛ SQ-01.B independent pricing: BLOCKED.** محیط/provider مجاز، دادهٔ خصوصی مناسب، بودجهٔ auto/manual request، side effect/cleanup و reference مستقل مالی مستند نیستند؛ پیش از OTP/cart/address/quote توقف شد. client اکنون `{address}`، نگاشت `shipping_irr`/`total_irr` و نمایش ریال را نشان می‌دهد؛ این شاهد cart binding، وزن و tariff مصوب نیست. shipping spec یا browser test تازه‌ای ایجاد/اجرا نشده است. مبنا `5c24c5cf1c7cc4aad00e3e8f0d6ddc1c90b05b02`؛ الحاق محلی منتشر نشده است. نتایج تاریخی و issueهای باز محفوظ‌اند. بند آماده‌سازی بلافاصلهٔ بعد، checkpoint تاریخی پیش از این preflight است.

**checkpoint historical shipping preparation:** [گزارش طراحی و مرزها](EZPOST_QA_SHIPPING_QUOTE_PREPARATION_2026-11-18.md)، [شش case SQ-01…06](../Test-Cases/EZPOST_QA_SHIPPING_QUOTE_TEST_CASES.md)، [خلاصهٔ preparation](../Evidence/Shipping-Quote-Preparation-2026-11-18/preparation-summary.json)، [هشت بررسی محلی موفق](../Evidence/Shipping-Quote-Preparation-2026-11-18/local-verification.json) و [راهنمای ادامه](EZPOST_QA_CONTINUATION_GUIDE.md) مرجع جاری‌اند. شش case با blocker طراحی شده‌اند؛ **shipping spec=۰، live=۰، controlled-response shipping=۰**. schema و production checkout آفلاین کامل موجود نیست؛ mock برنامهٔ ساختگی ساخته نشده و guard تغییر نکرده است. completeness و بازیابی draft می‌توانند بدون کلیک، quote خودکار بسازند؛ side effect provider و مرجع مستقل قیمت/total هنوز روشن نیستند. مبنا `69a0baf4514a6be4627bddbfbc651a46e7b2bfdf` است؛ SHA نهایی این الحاق از remote main گرفته شود. دو PASS اخیر و failureهای تاریخی محفوظ‌اند؛ `CF-INV01` و `P10-ORD01/02` بازند. هیچ OTP/cart/address/quote/submit/order/payment در این batch اجرا نشد.

**checkpoint تاریخی — اجرای rerun هدفمند، ۱۸ نوامبر ۲۰۲۶:** [گزارش اجرای واقعی](EZPOST_QA_CHECKOUT_TARGETED_RERUN_EXECUTION_2026-11-18.md)، [خلاصهٔ evidence](../Evidence/Checkout-Targeted-Rerun-2026-11-18/execution-summary.json)، [gate تأییدشدهٔ همین بازه](../Evidence/Checkout-Targeted-Rerun-2026-11-18/execution-gate.json)، [بررسی‌های محلی](../Evidence/Checkout-Targeted-Rerun-2026-11-18/static-verification.json) و [راهنمای ادامه](EZPOST_QA_CONTINUATION_GUIDE.md) مرجع همان checkpoint هستند. **۲ تست live، ۲ PASS، صفر FAIL / pending / skipped / NOT RUN:** Chrome `ACO-H01` (`chrome-r18h1`) و سپس Firefox `CF-F01` (`firefox-r18f1`)، در Cypress نمایان `16.2.1`. ورود هر دو manual-assisted بود؛ بررسی‌های پس از ورود و cleanup خودکار بودند. یک Add و یک Remove متعلق به هر run، session و `/me` بعد حذف، سبد اولیه و draft همگی تأیید شدند؛ recovery دستی لازم نشد. این PASSها تاریخچهٔ ۶ تلاشِ قبلی با ۲ PASS / ۴ FAIL را تغییر نمی‌دهند.

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
| EZPOST_QA_DAILY_REPORT_2026-11-18.md | [Open](EZPOST_QA_DAILY_REPORT_2026-11-18.md) |
| EZPOST_QA_SQ01_FRESH_EXECUTION_2026-11-18.md | [Open](EZPOST_QA_SQ01_FRESH_EXECUTION_2026-11-18.md) |
| EZPOST_QA_SQ01_GUARD_REVIEW_2026-11-18.md | [Open](EZPOST_QA_SQ01_GUARD_REVIEW_2026-11-18.md) |
| EZPOST_QA_SQ01_EXECUTION_2026-11-18.md | [Open](EZPOST_QA_SQ01_EXECUTION_2026-11-18.md) |
| EZPOST_QA_SQ01_PREFLIGHT_2026-11-18.md | [Open](EZPOST_QA_SQ01_PREFLIGHT_2026-11-18.md) |
| EZPOST_QA_SHIPPING_QUOTE_PREPARATION_2026-11-18.md | [Open](EZPOST_QA_SHIPPING_QUOTE_PREPARATION_2026-11-18.md) |
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
| EZPOST_QA_SHIPPING_QUOTE_TEST_CASES.md | [Open](../Test-Cases/EZPOST_QA_SHIPPING_QUOTE_TEST_CASES.md) |
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
