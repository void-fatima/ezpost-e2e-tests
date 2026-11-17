# EZPost — تحویل مرحلهٔ سبد، ۱۷ نوامبر ۲۰۲۶

هر دو batch پیاده‌سازی، در Cypress واقعیِ interactive اجرا، بازبینی، روی branch مستقل push و با merge معمولی به `main` ادغام شدند. repository: https://github.com/void-fatima/ezpost-e2e-tests . نویسندهٔ commitهای این مرحله `void fatima <vantafatima@gmail.com>` است؛ تنظیم identity فقط repository-local است.

| batch / branch | commit پیاده‌سازی و evidence | merge ثبت‌شده روی remote main |
|---|---|---|
| `test/cart-handoff` | `f10ce157c9165e935effb4d3d9bf87a771425b9a` | `34a56d654e3217d8e0fa5b97bc28cadcc1771146` |
| `test/cart-edit-remove` | `52893b75cc55d739bc398b93e21ece113097bdc9` | `6e67b23ddafdb5e02e51472d6815133abe2fd327` |

`git ls-remote` پس از push، SHA هر دو branch و `main` را تأیید کرد. هر دو commit پیاده‌سازی در ancestry این main قرار دارند. این سند، checkpoint پس از تحویل کد و قبل از commit متادیتای همین سند است؛ merge بعدیِ همین متادیتا نیز باید هر دو batch را حفظ کند. عبارت‌های «نشر هنوز انجام نشده» در گزارش‌های اجرای قبلی مربوط به checkpoint پیش از publication آنها هستند؛ وضعیت نشر جدید این جدول است.

| اجرای آخر ثبت‌شدهٔ هر batch | Chrome157 / Cypress16.2.1 | Firefox160 / Cypress16.2.1 |
|---|---|---|
| H01…H04 انتقال settled | ۴PASS،۰FAIL | ۴PASS،۰FAIL |
| E01…E04 ویرایش/حذف/recovery | ۳PASS،۱FAIL | ۴PASS،۰FAIL |

pending، skipped عمدی و not-run در اجرای آخر هر batch صفر بود. Hها در نسخهٔ batch اول اجرا شدند؛ بعد از سخت‌گیری‌های helper مشترک در batch دوم دوباره اجرا نشدند. بنابراین جمع۷/۱ در Chrome و۸/۰ درFirefox، یک run واحد روی آخرین commit نیست. تمام موارد live و محدود به اقلام guest متعلق به suite بودند؛ controlled-response E2E تازه اجرا نشد. دو positive و۱۵negative خالص validator از outcome برنامه جدا هستند.

تنها failure باقی‌ماندهٔ این مرحله `CART-E01` در Chrome است: پیش از تغییر quantity، request quote محصول دوم Simple در timeout موجود مشاهده نشد. علت test/setup/environment/application هنوز تعیین نشده؛ Firefox همان کد را پاس کرد، ولی آن failure را حذف یا رفع‌شده نمی‌کند. شواهد اولیهٔ شکست‌های setup، alias، overlay link، readiness و page-load حفظ‌اند. defect تازهٔ محصول از آنها نتیجه‌گیری نشده است. دو failure تاریخی معتبر P10 همچنان بازند و در این مرحله rerun نشدند.

cleanup تمام۱۶ اجرای نهاییِ دو batch در دو مرورگر با حذف عادی اقلام owned، zero item و empty تأیید شد؛ E01 شکست‌خورده نیز cleanup شد. دو cleanup failure اولیه با recovery عادیِ دقیقاً همان اقلام ثبت شدند. هیچ storage reset برای نمایش موفقیت journey، OTP، account، checkout submission، order یا payment استفاده نشد. mutation guard، dependencies و application code تغییر نکردند.

پوشش باقی‌مانده: قرارداد repeated identical-add/merge و badge unit؛ min/max/zero/localized input؛ schedule مستقل قیمت/rounding؛ persistence/login merge؛ eligibility هنگام quote pending/failed؛ fixture قیمت/موجودی متغیر؛ accepted-response-lost/retry و conflict چند view. اینها sliceهای مشخص inventory هستند و از والدهای اصلی حذف نشده‌اند. برای resilience/persistence فاقد قرارداد، branch یا test خالی ساخته نشد.

انتشار عمومی، code، fixtures، launcher، گزارش‌ها و شواهد بررسی‌شده را حفظ کرده است. profile/runtime/cache و فایل‌های audit خصوصی ignored و محلی‌اند. مسیر نام کاربر در نسخهٔ عمومی metadata با filter موجود sanitize می‌شود؛ originals محلی حفظ شدند. فقط چهار خط shutdown طبیعی به log قبلی Firefox اضافه شد؛ outcomeهای تاریخی بازنویسی نشده‌اند. `git diff --check` برای کد/اسناد و بررسی کامل staged با `core.whitespace=cr-at-eol` برای حفظ CRLF خام evidence انجام شد؛ syntax/traceability و۲positive/۱۵negative موفق بودند.

پنجرهٔ نهایی Cypress و Firefox پس از اجرا باز ماندند. `final-window-state.json` وجود پنجرهٔ visible را تأیید می‌کند؛ Windows foreground=false گزارش کرد، بنابراین نمایش دائمی روی تمام پنجره‌ها ادعا نمی‌شود. اجرای headless جایگزین نشد. این مرحله کل سفر سفارش/پرداخت را تکمیل نمی‌کند.

منابع:

- [قرارداد کیس‌ها](../Test-Cases/EZPOST_QA_CART_TEST_CASES.md) و [ماتریس پوشش](EZPOST_QA_CART_COVERAGE_MATRIX.md).
- [اجرای handoff و تمام تلاش‌های اولیه](EZPOST_QA_CART_HANDOFF_EXECUTION_2026-11-17.md).
- [اجرای edit/remove و failure باقی‌مانده](EZPOST_QA_CART_EDIT_REMOVE_EXECUTION_2026-11-17.md).
- [audit انتشار عمومی](EZPOST_QA_CART_PUBLICATION_AUDIT_2026-11-17.md).
