# گزارش روزانهٔ QA ایزی‌پست — ۱۸ نوامبر ۲۰۲۶

تاریخ گزارش بر اساس `America/Los_Angeles` است. مخزن: <https://github.com/void-fatima/ezpost-e2e-tests>؛ شاخهٔ تحویل `main`. این گزارش نتیجه‌های ثبت‌شدهٔ امروز را جمع‌بندی می‌کند؛ آزمون زندهٔ تازه‌ای برای تهیه یا انتشار گزارش اجرا نشده است.

**وضعیت پایان روز:** rerun هدفمندِ handoff و فرم، دو PASS معتبر با cleanup تأییدشده دارد. دو تلاش بعدی SQ-01 هرکدام در runner FAIL و از نظر نمایش shipping برابر BLOCKED هستند. هیچ quote واقعی shipping از guard عبور نکرده و مقایسهٔ مبلغ ارسال، final total و واحد ریال هنوز اجرا نشده است. بازگردانی سبد و draft هر دو تلاش SQ-01 مستقلاً تأیید شد.

## نتیجه‌های اجرایی؛ batchها جدا نگه داشته شده‌اند

| batch | تعداد تلاش completed | PASS | FAIL | نتیجه و مرز پوشش |
|---|---:|---:|---:|---|
| [رگرسیون اولیهٔ checkout](EZPOST_QA_CHECKOUT_REGRESSION_EXECUTION_2026-11-18.md) | ۶ | ۲ | ۴ | تلاش‌های تکراری ACO-H01 و CF-F01؛ شامل یک شکست setup احراز هویت با HTTP429. شکست setup، نتیجهٔ فرم یا shipping نیست. |
| [rerun هدفمند](EZPOST_QA_CHECKOUT_TARGETED_RERUN_EXECUTION_2026-11-18.md) | ۲ | ۲ | ۰ | Chrome: ACO-H01 با label `r18h1`؛ Firefox: CF-F01 با label `r18f1`. ورود manual-assisted، assertionهای بعد ورود و cleanup خودکار. |
| [SQ-01، تلاش `chrome-sq18a`](EZPOST_QA_SQ01_EXECUTION_2026-11-18.md) | ۱ | ۰ | ۱ | SQ-01: **BLOCKED / NOT EVALUATED**؛ نوع و شرط دقیق عملیات ردشده **UNKNOWN**. |
| [SQ-01، تلاش `chrome-sq18b`](EZPOST_QA_SQ01_FRESH_EXECUTION_2026-11-18.md) | ۱ | ۰ | ۱ | SQ-01: **BLOCKED / NOT EVALUATED**؛ کد `SHIPPING_POSTAL_NOT_LAST` در `awaiting-address` ثبت شد. |

جمع حسابی ردیف‌ها **۱۰ تلاش completed، ۴ PASS و۶ FAIL** است؛ این عدد، اجرای یک suite ده‌تستی یا ده case مستقل نیست. سه ID اصلی در sourceها و تلاش‌های جدا تکرار شده‌اند. startup ناموفق Firefox که spec را اجرا نکرد، داخل این شمارش نیست. صفر بودن Mocha not-run در یک testcase شکست‌خورده، به‌معنای اجرای assertionهای مراحل بعدی نیست.

نسخه‌های ثبت‌شده: Cypress۱۶.۲.۱، Chrome۱۵۷.۰.۸۱۰۳.۷۹ و Firefox۱۶۰.۰، در اجرای interactive و نمایان. آخرین SQ-01 فقط در Chrome اجرا شد؛ نتیجه‌ای برای shipping در Firefox نداریم. ورود و OTP کاملاً خودکار گزارش نمی‌شوند و از شواهد sanitized تعیین نشده که flow وارد حساب موجود شده یا حساب تازه ساخته است.

## کارهای تکمیل‌شدهٔ امروز

۱. شکست‌های checkout با source و شواهد همان runها بررسی شدند. نبودن فرم Chrome در assertion چهارثانیه‌ای، الزام latency محصول تلقی نشد. failure فرم Firefox از failure teardown/animation و recovery جدا شد؛ علت تاریخی province menu یا ترتیب commandها بدون شاهد اعلام نشد.

۲. پس از مجوز retry تیم و تأیید تازهٔ single-writer، Chrome ACO-H01 و Firefox CF-F01 با source موردنظر دوباره اجرا و PASS شدند. ownership قلم، session و `/me` بعد Remove و baseline سبد/draft تأیید شدند. این PASSها شکست‌های قبلی را حذف یا علتشان را اثبات نمی‌کنند.

۳. [شش case ارسال و totals](../Test-Cases/EZPOST_QA_SHIPPING_QUOTE_TEST_CASES.md)، شامل quote معتبر، نشانی ناقص، تغییر نیازمند محاسبهٔ دوباره، پاسخ خارج از ترتیب، failure/recovery و اختلاف quote با نمایش، طراحی شدند. [آماده‌سازی shipping](EZPOST_QA_SHIPPING_QUOTE_PREPARATION_2026-11-18.md) فقدان setup مستقلِ آفلاینِ مناسب برای production checkout را ثبت می‌کند؛ PASS ساختگی shipping ساخته نشد. SQ-02 تا SQ-06 اجرا نشده‌اند.

۴. [پیش‌بررسی خواندنی SQ-01](EZPOST_QA_SQ01_PREFLIGHT_2026-11-18.md) package۶۳ با۱۴۰لیبل، destination تهران/تهران، contract `{address}` و نگاشت `shipping_irr`/`total_irr` به نمایش ریال را مستند کرد. وزن حدس زده نشد؛ ورودی وزن در فرم کشف نشد و client مقدار نمایشی را از `weight_grams` می‌گیرد. quote محصول، quote ارسال نیست و API→UI فقط consistency نمایش است.

۵. spec اختصاصی SQ-01، guard، بودجهٔ یک quote شامل auto trigger، launcher نمایان، source hashing و آرشیو source اجرا ساخته شدند. عملیات مجاز به auth عادی، Add دقیق و Remove قلم proven-owned و همان quote تک‌درخواستی محدود ماند. submit، ذخیرهٔ نشانی در حساب، order و payment مجاز نشدند.

۶. پس از تلاش sq18a، [diagnostics guard](EZPOST_QA_SQ01_GUARD_REVIEW_2026-11-18.md) با کدهای ثابت و فاقد اطلاعات خصوصی تکمیل شد. اولین rejection پیش از تغییر phase/throw/destroy حفظ می‌شود و cleanup آن را بازنویسی نمی‌کند. تلاش جداگانهٔ مجاز sq18b، latch مستقل با `wx` داشت؛ latch و شواهد sq18a reset یا overwrite نشدند.

## دو تلاش SQ-01 و نتیجهٔ آخرین تلاش

| موضوع | sq18a | sq18b |
|---|---|---|
| نمونهٔ cart | package۶۳×۲، هر بسته۱۴۰لیبل | همان نمونه؛ انتخاب محصول، مقدار و ownership زنده بررسی شد. |
| اولین رد | یک blocked operation؛ category/شرط دقیق ثبت نشده است. | `shipping-quote`، source=`request`، reason=`SHIPPING_POSTAL_NOT_LAST`، phase=`awaiting-address` |
| quote مجاز / response / retry | ۰ / ۰ / ۰ | ۰ / ۰ / ۰ |
| مقایسهٔ fee/total/ریال | اجرا نشده | اجرا نشده |
| بازگردانی سبد و draft | مستقلاً تأیید شد. | مستقلاً تأیید شد. |
| آخرین assertion hook | `noForbiddenWriteAttempted` برابر FAIL | همان assertion برابر FAIL؛ سایر بررسی‌های Remove و restoration موفق‌اند. |

در sq18b کد ثبت‌شده فقط شرط `lastPrivateEdit !== 'postal-code'` را هنگام request ثابت می‌کند. ترتیب کامل eventها و مقدار خصوصی فیلدها ثبت نشده‌اند؛ علت رویدادی یا اشتباه کاربر اثبات نشده است. تأییدهای دستی کاربر دربارهٔ ورود و تکمیل اطلاعات نیز جدا در گزارش آن run آمده‌اند. علت sq18b را به sq18a تعمیم نمی‌دهیم؛ علت تاریخی sq18a همچنان UNKNOWN است.

در sq18b کنترل‌های تهران/تهران تأیید شدند، ولی guard پیش از مقایسهٔ body مقصد خصوصی متوقف شد؛ تطبیق دقیق request با مقصد نارمک اجرا نشده است. هیچ مبلغ قبلی یا subtotal به‌عنوان final total پذیرفته نشد. **صحت تعرفه طبق دستور کاربر مفروض و خارج از scope است؛ ادعای PASS مستقل قیمت نداریم.**

هر دو run قلم متعلق به خود را از UI عادی حذف کردند. session و `/me` بعد Remove، سبد خالی اولیه و نبود draft نشانی/active-order داخل تست و با سه GET مستقل تأیید شدند. assertion ایمنی نهایی به‌علت blocked operation شکست خورد و label خام `removing-owned` باقی ماند؛ نتیجهٔ FAIL یا label تاریخی به PASS تغییر نکرده است.

## بررسی‌های محلی؛ جدا از live E2E

| بررسی ثبت‌شده | نتیجه |
|---|---|
| middleware/DOM guard واقعی در VM با ورودی مصنوعی | PASS؛۳۰سناریو،۱۸۹۴assertion و۲۴مقایسهٔ محدود با نسخهٔ آرشیوشده |
| diagnostics، privacy و نگهداری اولین علت | PASS؛۲۰بررسی مثبت و۲۲منفی |
| oracle نمایش و budget | PASS؛۱۶مثبت و۱۴۶منفی |
| config/launcher و latch تلاش تازه در VM | PASS؛۲۸سناریو و۲۰۱assertion، بدون filesystem واقعیِ reservation یا browser |
| source و تاریخچه | هر۶۰فایل تاریخیِ انتخاب‌شده بدون تغییر؛ آرشیو۴۱فایلی source تازه با manifest منطبق |

syntax و diff checkهای گزارش‌های مرتبط موفق‌اند. [شواهد بررسی guard](../Evidence/SQ01-Guard-Review-2026-11-18/local-verification.json) و [بررسی‌های پس از sq18b](../Evidence/SQ01-Live-2026-11-18/chrome-sq18b/post-run-static-checks.json) مرجع اعداد بالاست. این نتیجه‌ها browser test، real quote یا اثبات جامع نبود false positive نیستند.

در انتشار امروز، [شش فرمان محلی/VM/portability](../Evidence/Daily-Publication-2026-11-18/local-checks.json) دوباره موفق بودند. [بازبینی staged snapshot](../Evidence/Daily-Publication-2026-11-18/staged-review.json)، syntax۷۴فایل، parse۷۶JSON و تطابق SHA-256 هر۸۰فایل source آرشیوشدهٔ دو run را تأیید می‌کند؛ هیچ مسیر خصوصی یا فایل بزرگ نامناسب در آن snapshot نبود. `git diff --cached --check` کامل،۱۲هشدارِ سطر خالی انتهای فایل‌های آرشیوی داد؛ همان bytes تاریخی عمداً حفظ شدند. بررسی diff خارج از آرشیوهای immutable با exit۰ موفق بود. این استثنای whitespace و خروجی خام بررسی در همان JSON ثبت شده است؛ نتیجهٔ کامل به‌دروغ PASS گزارش نمی‌شود.

## موارد باز و قدم بعد

- علت event/tracker مربوط به postal-last هنوز نیاز به بررسی دارد؛ guard برای سبزشدن تست ضعیف نشده است. تلاش تازه فقط با دستور جداگانه و label تازه مطرح می‌شود.
- `CF-INV01` و `P10-ORD01/02` بازند؛ PASSهای بعدی، defectهای باز یا علت failureهای تاریخی را خودکار حل نمی‌کنند.
- shipping موفق، recalculation، stale shipping response، failure/recovery و مقایسهٔ fee/final-total/ریال هنوز پوشش اجرایی ندارند.
- submit checkout، ذخیرهٔ پروفایل/نشانی، ایجاد سفارش و پرداخت خارج از اجرای این روز مانده‌اند؛ این مجموعه journey کامل سفارش/پرداخت نیست.

## تحویل عمومی و ادامه روی سیستم دیگر

گزارش روزانه همراه با چهار گزارش SQ-01، evidenceهای sanitized، sourceهای آرشیوشده، کد و ابزارهای همان اجراها و [راهنمای ادامه](EZPOST_QA_CONTINUATION_GUIDE.md) برای انتشار روی main آماده شده است. شکست‌ها و sourceهای تاریخی حفظ شده‌اند. شناسهٔ دقیق تحویل نهایی باید از `origin/main` پس از push گرفته شود؛ SHA مبنای پیش از انتشار `5c24c5cf1c7cc4aad00e3e8f0d6ddc1c90b05b02` است و SHA تحویل نهایی نیست.

فایل‌های خصوصی `.publication/` شامل پروفایل‌ها و هر دو latch، credentials، OTP، cookie/token، دادهٔ حساب/نشانی و session به Git منتقل نمی‌شوند؛ `node_modules` و cacheها نیز محلی می‌مانند. هیچ screenshot، recording یا capture خام شبکه به این انتشار افزوده نشده است. اصل فایل‌های محلی حذف نمی‌شود.

برای ادامه، full clone با `core.autocrlf=false`، تنظیم long paths مخصوص همان مخزن در Windows، نسخه‌های Node/Cypress و lockfile موجود، دسترسی شبکهٔ شرکت و راهنمای ادامه لازم است. هویت تعیین‌شده، OTP و نشانی مجاز به‌صورت خصوصی و دستی فراهم می‌شوند. **نبود latch خصوصی در clone جدید، مجوز تکرار sq18a یا sq18b نیست.** این labelها مصرف‌شده و متوقف‌اند؛ اجرای بعدی مجوز تازه، label تازه، تأیید single-writer تازه و baseline/ownership زنده می‌خواهد. PID و port تاریخی و پروفایل خصوصی به سیستم دیگر منتقل یا دوباره استفاده نمی‌شوند.
