# تحویل checkpoint مربوط به checkout — ۱۸ نوامبر ۲۰۲۶

کد، قراردادهای کیس، گزارش‌های اجرای نمایان و شواهد سانیتایزشدهٔ این مرحله در مخزن عمومی <https://github.com/void-fatima/ezpost-e2e-tests> منتشر شدند. برای ادامه روی سیستم دیگر، از [راهنمای ادامه](EZPOST_QA_CONTINUATION_GUIDE.md)، [نتیجهٔ اجرای این مرحله](EZPOST_QA_CHECKOUT_REGRESSION_EXECUTION_2026-11-18.md) و [بازبینی correctness ابزار](EZPOST_QA_CHECKOUT_GUARD_REVIEW_2026-11-18.md) شروع کنید. آخرین مانع واقعی OTP پاسخ HTTP429 است؛ هیچ OTP یا اجرای مرورگر دیگری در مرحلهٔ انتشار آغاز نشد.

## شناسه‌های انتشار و حد این سند

| جزء | مقدار تأییدشده |
|---|---|
| مبنای شروع | `146df24ebe66f24022b1b99d58160b32111ceb52` |
| commit کد، evidence و نتیجه‌ها | [`106733a62f10ee7d1355bd0dbed6562ef3c02098`](https://github.com/void-fatima/ezpost-e2e-tests/commit/106733a62f10ee7d1355bd0dbed6562ef3c02098) |
| شاخهٔ همان commit | [`test/checkout-auth-guard`](https://github.com/void-fatima/ezpost-e2e-tests/tree/test/checkout-auth-guard) |
| ادغام عادیِ source در main | [`9576ed8e2af3107c5c23e7132565a1017ef105db`](https://github.com/void-fatima/ezpost-e2e-tests/commit/9576ed8e2af3107c5c23e7132565a1017ef105db)؛ با `git ls-remote` و clone تازه تأیید شد |
| نویسندهٔ repository-local | `void fatima <vantafatima@gmail.com>`؛ تنظیم global تغییر نکرد |
| بستهٔ راهنما و همین سند | شاخهٔ `test/checkout-regression-handoff`؛ بعد از checkpoint بالا اضافه می‌شود. SHA بالا HEAD نهاییِ شامل خود این سند نیست |

HEAD واقعی تحویل را با `git ls-remote origin refs/heads/main` و SHA دریافت‌شدهٔ local را با `git rev-parse HEAD` بگیرید. انتشار source با push عادی و merge دارای تاریخچه انجام شد؛ force-push یا بازنویسی history انجام نشد. ادغام در worktree خصوصیِ زیر همان EZPost انجام شد تا source مرورگر باز هنگام checkout موقت تغییر نکند. پروژه در root مخزن باقی است و Tapin یا پروژهٔ دیگری وارد این تحویل نشده است.

## محتوای بسته و نتایج محفوظ

commit کد ۱۴۱ فایل تغییرکرده/افزوده، مجموعاً۸۵۳٬۲۶۵ بایت محتوای public، دارد: دو spec موجود `ACO-H01` و `CF-F01`، guard ورود محدود، lifecycle مالکیت، cleanup با بررسی مستقل هویت پس از Remove، fixture تاریخ‌دار checkout، driver/observer محدود، کنترل‌های خالص/ایستا، دو سند کیس با traceability محفوظ، دو گزارش و evidence تمام تلاش‌های این batch. این شمار، تعداد test یا کل فایل‌های مخزن نیست.

شواهد شامل۶نتیجهٔ completed واقعی، startup ناقصِ جدا، recovery مستقل Firefox، پاسخ۴۲۹، source manifestها و۳۶آرشیو source با SHA-256 مطابق نام فایل هستند. fixture تاریخی، failureهای قبلی، گزارش‌های M01 و دو P10 تغییر نکرده‌اند. [بازبینی staged بستهٔ کد](../Evidence/Checkout-Regression-2026-11-18/publication-review.json) فهرست، اندازه و SHA-256 همین۱۴۱blob عمومی را ثبت می‌کند؛ این snapshot ادعای inventory نهاییِ سندهای الحاقی ندارد.

| مرورگر | تلاش completed | PASS | FAIL | توضیح |
|---|---:|---:|---:|---|
| Chrome157.0.8103.79 | ۳ | ۱ | ۲ | H01 اولیه۴۰۴؛ H01 نهایی فرم را در checkpoint ندید؛ CF کاملِ subset فعلی PASS |
| Firefox160.0 | ۳ | ۱ | ۲ | H01 PASS؛ CF در assertion و سپس hook شکست خورد؛ retryِ CF در auth-start با۴۲۹ متوقف شد |
| مجموع | ۶ | ۲ | ۴ | دو case ID؛ ورود manual-assisted؛ صفر controlled-response browser test در این batch |

pending/skipped/not-run در سطح Mocha هر شش result صفر است؛ subsetهای پس از failure واقعاً اجرا نشده‌اند. startup ناقص Firefox داخل این۶تلاش نیست. cleanup خودکار در سه Add موفق و recovery دستی/خودکارِ جدا برای Add چهارم، identity/session/me، baseline و draft را پس از Remove تأیید کردند. recovery نتیجهٔ FAIL را عوض نکرد. resend واقعی صفر بود؛ قابلیت resend فقط با کنترل‌های خالص challenge شد.

`CF-INV01` باز است: Chrome۱۲۱→۱۲۰ و۳۰۱→۳۰۰ را با diagnostic موفق ثبت کرد؛ Firefox به این maximumها نرسید و علت۱۱۸تاریخی روشن نشده است. P10-ORD01/02 بازند و rerun نشدند. assertion اصلی Firefox CF دقیقاً در خروجی حفظ نشده؛ علت قطعی به keyboard یا hidden بودن پنجره منتسب نمی‌شود. این بسته پوشش کامل سفارش/پرداخت نیست.

## clone مستقل، بررسی‌ها و تنظیم Git

[خروجی کامل clone تازه](../Evidence/Checkout-Regression-2026-11-18/clean-clone-verification.json) روی main با SHA `9576ed8e2af3107c5c23e7132565a1017ef105db`، Node24.19.0 و تاریخچهٔ کامل ثبت شد. هر۹بررسی زیر **PASS** بود؛ `node_modules`، cache یا session خصوصی کپی نشد و وابستگی نصب نشد. clone پس از بررسی clean بود.

```powershell
node scripts/check-m01-static.cjs
node scripts/check-portability.cjs
node scripts/check-authenticated-checkout-static.cjs
node scripts/check-authenticated-checkout-contract.cjs
node scripts/check-customer-form-static.cjs
node scripts/check-checkout-auth-sequence.cjs
node scripts/check-checkout-qa-static.cjs
node scripts/check-authenticated-checkout-evidence.cjs --complete
node scripts/check-checkout-regression-evidence.cjs
```

این بررسی‌ها application request یا مرورگر اجرا نکردند. کنترل auth برابر۴۷مثبت/۴۳منفی و کنترل ownership/restoration برابر۳۱مثبت/۸۲منفی است؛ به۶تلاش E2E اضافه نمی‌شوند. artifact checkerها تاریخچه و نتیجه‌های تازه و sourceهای ثابت را جدا بررسی کردند. نصب Cypress و دسترسی شبکهٔ شرکت در سیستم بعد برای اجرای مرورگر لازم است.

در checkout اولیهٔ worktree، Git به‌علت required بودن filter موجود و نبود command `smudge` متوقف شد؛ merge یا push ناقص، موفق گزارش نشد. پس از اثبات idempotent بودن sanitizer روی۸۸metadata عمومیِ بسته، همان command موجود به‌صورت **repository-local** برای smudge نیز تعیین و merge عادی موفق شد. در سیستم مقصد هر سه خط زیر را همراه تنظیمات محلی راهنما اعمال کنید:

```powershell
git config --local filter.ezpost-public.clean "node scripts/publication-sanitize.cjs"
git config --local filter.ezpost-public.smudge "node scripts/publication-sanitize.cjs"
git config --local filter.ezpost-public.required true
```

`git diff --cached --check` کاملِ بستهٔ کد، فقط برای۶آرشیو source تاریخی، blank line در EOF گزارش کرد. بایت‌های این آرشیوهای SHAدار trim یا بازنویسی نشدند. بررسی diff برای تمام فایل‌های فعال و metadata با کنارگذاشتن دقیق همان پوشهٔ آرشیو PASS شد؛ SHA-256 هر۳۶آرشیو نیز PASS است. ادعای «full staged diff بدون notice» نمی‌شود. نتیجهٔ static-verification پیش از staging تاریخی محفوظ مانده است.

## حفاظت از داده و ادامه

بررسی مستقل candidateها و بازبینی تک‌تک blobهای staged، credential/phone/OTP/token/session payload قابل شناسایی یا فایل بزرگ/باینری تازه پیدا نکرد؛ این بررسی تضمین کشف هر راز ممکن نیست. نام کاربر در metadata مسیر محلیِ دو سند QA فقط در نسخهٔ public با فیلتر موجود به `LOCAL_USER` تبدیل شد. source اجرایی، fixture و آرشیوهای SHAدار فیلتر نمی‌شوند و بایت‌هایشان تغییر نکردند. originals محلی با manifest خصوصی و SHA-256 حفظ شدند.

browser profile، runtime، raw authenticated output، session/cookie/OTP، screenshot شخصی، recording، crash dump و cacheها منتشر نشدند و خصوصی باقی ماندند. هیچ session برای سیستم بعد منتقل نمی‌شود. هیچ فایل اصلی برای انتشار حذف نشد.

قدم بعدی ارسال فوری OTP نیست. ابتدا بازیابی پشتیبانی‌شدهٔ محدودیت واقعی کانال روشن شود؛ سپس investigation خواندنیِ readiness فرم Chrome و ثبت exact assertion سانیتایزشدهٔ Firefox، با پنجرهٔ visible/focused انجام شود. برای mutation بعدی، single-writer واقعیِ بازهٔ تازه، baseline سالم، غیبت محصول تست و ورود دستی fresh لازم است. تغییر source مشترک، اجرای دوبارهٔ subset متأثر در هر دو مرورگر با manifest جدید می‌خواهد. shipping quote، submit/save مشتری/نشانی/profile، سفارش و پرداخت خارج این مرحله‌اند.
