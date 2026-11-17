# EZPost — بازگشت خلاصه و مبلغ نمایشی به پاسخ quote قدیمی

تاریخ بررسی: **۱۷ نوامبر ۲۰۲۶، America/Los_Angeles**. شناسه‌های بازتولید: **P10-ORD01 و P10-ORD02 / والد P10**؛ دو مسیر بازتولید یک مشکل سازگاری پاسخ قدیمی، نه دو باگ مستقلِ سفارش/پرداخت.

در اجرای تعاملی جدید، پس از آنکه انتخاب تازه با خلاصه و مبلغ درستِ fixture نمایش داده شد، آزادکردن پاسخ قدیمی مجموع لیبل و مبلغ نمایش‌داده‌شده را به مقادیر انتخاب قبلی برگرداند. خود تعداد ورودی یا بستهٔ منتخبِ جدید باقی ماند. این ناسازگاری frontend در هر دو مرورگر و با حذف wrapper مشاهدهٔ fetch نیز بازتولید شد.

محیط: workspace مستقل `C:\Users\LOCAL_USER\Desktop\EZPost`؛ Cypress محلی **16.2.1**، Chrome **157.0.8103.78** و Firefox **160.0**؛ `cypress open`، E2E، `isHeaded=true` و `isHeadless=false`. صفحه و assetها واقعی‌اند؛ پاسخ‌های quote از capture تاریخی بازپخش و ترتیب تکمیل آن‌ها کنترل شده است. URL هر دو شکست: `http://172.16.30.198:5800/products/blackfri-01`؛ تنها درخواست مرتبط `POST /api/v1/products/blackfri-01/quote` خواندنی است.

**قرارداد و منبع انتظار:** S1 در [کیس‌های سفارش](../Test-Cases/EZPOST_QA_ORDERING_TEST_CASES.md)، اهداف P03/P10 در [Phase 1](../Planning/EZPOST_QA_PHASE1_REVIEW.md) و دستور صریح کاربر دربارهٔ حفظ آخرین انتخاب. بعد از پایان پاسخ قدیمی و فرصت render، هویت محصول، بستهٔ منتخب، تعداد، لیبل و ارائهٔ پاسخ تازه باید با هم باقی بمانند. حذف پاسخ منسوخ، خواندن و دورریختن آن یا لغو واقعی درخواست، همگی می‌توانند این قرارداد را برآورده کنند؛ مصرف body توسط برنامه الزام نیست. مبلغ‌های زیر oracle ارائهٔ همان fixture هستند و صحت مستقل قیمت یا تصویب schedule تجاری را ثابت نمی‌کنند.

پیش‌شرط مشترک: context مهمان مستقل و `testIsolation=true`؛ محصول `blackfri-01` با نام «بلک فرایدی»، package49 با ۱۲۰ لیبل و package50 با ۲۴۰ لیبل؛ fixtureهای ثبت‌شده در [ordering-quotes.json](../../cypress/fixtures/ordering-quotes.json) و [ordering-audit-quotes.json](../../cypress/fixtures/ordering-audit-quotes.json). شروع هر مسیر، پاسخ اولیهٔ `{"package_id":49,"quantity":1}` و نمایش صحیح آن است؛ هیچ سبد، login یا order ساخته نمی‌شود.

| مسیر | اقدام کاربر و ترتیب دقیق پاسخ‌ها | انتظار بعد از پایان پاسخ قدیمی | نتیجهٔ مشاهده‌شدهٔ جدید |
|---|---|---|---|
| P10-ORD01 | دکمهٔ افزایش، q1→q2؛ درخواست `{"package_id":49,"quantity":2}` نگه داشته می‌شود. با ورودی واقعی ArrowUp/Tab، q3 انتخاب می‌شود؛ `{"package_id":49,"quantity":3}` با 200 کامل و presentation آن تأیید می‌شود؛ سپس پاسخ قدیمی q2 با 200 آزاد می‌شود. | همان محصول، package49 یکتای منتخب و input=3؛ `3 × 120 = 360`؛ مبلغ fixture تازه **14,100,000 ریال**. | input=3 و بستهٔ ۱۲۰ لیبلی حفظ‌اند؛ خلاصه `3 بستهٔ 120 لیبلی = 240 لیبل`؛ مبلغ به **9,400,000 ریال** برمی‌گردد. |
| P10-ORD02 | افزایش به q2؛ درخواست `{"package_id":49,"quantity":2}` نگه داشته می‌شود. دکمهٔ واقعی بستهٔ ۲۴۰ لیبلی انتخاب می‌شود؛ `{"package_id":50,"quantity":2}` با 200 کامل و presentation/selected package آن تأیید می‌شود؛ سپس پاسخ قدیمی package49/q2 با 200 آزاد می‌شود. | همان محصول، package50 یکتای منتخب و input=2؛ `2 × 240 = 480`؛ مبلغ fixture تازه **16,400,000 ریال**، هر بسته **8,200,000** و هر لیبل **34,166 ریال**. | input=2 و بستهٔ ۲۴۰ لیبلی حفظ‌اند؛ خلاصه `2 بستهٔ 240 لیبلی = 240 لیبل`؛ مبلغ **9,400,000 ریال**، هر بسته **4,700,000** و هر لیبل **39,166 ریال** متعلق به پاسخ قدیمی‌اند. |

assertion نهایی جدید یک snapshot واحد از DOM می‌گیرد؛ بنابراین خطای لیبل، مبلغ و هویت هم‌زمان گزارش می‌شوند. در اجرای ۱۴ نوامبر، assertion خلاصه زودتر fail می‌شد و assertion پولیِ پس از آن اجرا نمی‌شد؛ آن شواهد قدیمی به‌تنهایی rollback مبلغ را ثابت نمی‌کردند. گزارش فعلی این نتیجهٔ اضافی را از اجرای جدید می‌گیرد و نتیجهٔ تاریخی را بازنویسی نمی‌کند.

**نتیجهٔ اجرای قابل مشاهده:** هر ردیف چهار تست P08/P10/P10/P11 را در بر می‌گیرد؛ P08 و P11 موفق و هر دو P10 با مقدار نادرست ۲۴۰ ناموفق شدند. pending صفر است؛ هیچ‌یک از دو P10 skip یا به success تبدیل نشده‌اند.

| مرورگر / مسیر اجرا | بازهٔ UTC در ۱۷ نوامبر | passed / failed | نتیجهٔ دو P10 |
|---|---|---|---|
| Chrome، spec اصلی | 14:04:51–14:05:12 | 2 / 2 | هر دو FAIL با rollback لیبل و مبلغ |
| Chrome، diagnostic بدون wrapper | 14:05:14–14:05:36 | 2 / 2 | همان دو FAIL |
| Firefox، spec اصلی | 14:09:30–14:09:53 | 2 / 2 | همان دو FAIL |
| Firefox، diagnostic بدون wrapper | 14:09:54–14:10:15 | 2 / 2 | همان دو FAIL |

محدودیت instrumentation تاریخی: helper قبلی مصرف body توسط برنامه یا body-read AbortError را شرط پایان می‌گرفت؛ برنامهٔ درست می‌تواند پاسخ منسوخ را پیش از خواندن کنار بگذارد. این محدودیت تست اصلاح شده و انتظار ۳۶۰/۴۸۰ حفظ شده است. observer جدید promise اصلی fetch را به برنامه برمی‌گرداند و clone پاسخ را جداگانه می‌خواند. در اجرای diagnostic، wrapper fetch/response کلاً غیرفعال بود و همان assertion نهایی بعد از تکمیل interception و فرصت render شکست خورد. بنابراین شکست حاضر صرفاً به wrapper مصرف پاسخ وابسته نیست؛ کنترل ترتیب پاسخ با Cypress همچنان بخشی از آزمایش است. این شواهد علت داخلی کد برنامه یا نبود هر اثر ابزار را به‌طور مطلق اثبات نمی‌کنند؛ مشاهدهٔ محدود render نیز تضمین نبود هر کار زمان‌بندی‌شدهٔ آینده نیست.

شواهد جدید، نسبت به [ریشهٔ اجرای ۱۷ نوامبر](../Evidence/Ordering-Cypress/review-2026-11-17-1794923768126/):

- [نتایج Chrome اصلی و بدون wrapper](../Evidence/Ordering-Cypress/review-2026-11-17-1794923768126/chrome/visible-results-8736.json) و [diagnostics هر چهار شکست](../Evidence/Ordering-Cypress/review-2026-11-17-1794923768126/chrome/diagnostics-8736.json).
- [نتایج Firefox اصلی و بدون wrapper](../Evidence/Ordering-Cypress/review-2026-11-17-1794923768126/firefox/visible-results-16532.json)، [خطاهای spec اصلی](../Evidence/Ordering-Cypress/review-2026-11-17-1794923768126/firefox/quote-presentation.cy.js-diagnostics-16532.json) و [خطاهای بدون wrapper](../Evidence/Ordering-Cypress/review-2026-11-17-1794923768126/firefox/unwrapped.cy.js-diagnostics-16532.json).
- تصاویر Firefox برای [P10-ORD01](../Evidence/Ordering-Cypress/review-2026-11-17-1794923768126/firefox/failure-16532-quote-presentation.cy.js-1.png) و [P10-ORD02](../Evidence/Ordering-Cypress/review-2026-11-17-1794923768126/firefox/failure-16532-quote-presentation.cy.js-2.png)؛ تفسیر تصویر همراه JSON و chronology است، زیرا runner ممکن است به تست بعدی رفته باشد.
- [قرارداد ثبت‌شده پیش از اصلاح](../Evidence/Ordering-Cypress/review-2026-11-17-1794923768126/contracts-before-authoring.md)، [diagnostic بدون wrapper](../Evidence/Ordering-Cypress/review-2026-11-17-1794923768126/unwrapped.cy.js) و [self-checkهای oracle](../Evidence/Ordering-Cypress/review-2026-11-17-1794923768126/oracle-self-checks.json). self-checkها آزمون assertion با دادهٔ جدا هستند و اجرای رفتار محصول محسوب نمی‌شوند.

سوابق حفظ‌شده: [گزارش اجرای ۱۴ نوامبر](EZPOST_QA_ORDERING_EXECUTION_2026-11-14.md)، [Chrome historical runtime](../Evidence/Ordering-Cypress/visible-1794688649725/chrome/visible-results-4248.json) و [Firefox historical runtime](../Evidence/Ordering-Cypress/visible-1794688649725/firefox/visible-results-11748.json). این مدارک در زمان خود دو شکست لیبل را ثبت کرده‌اند؛ فایل‌های تاریخی تغییر نکرده‌اند.

اثر اثبات‌شده محدود به **ناسازگاری خلاصه و presentation مبلغ frontend تحت ترتیب پاسخ کنترل‌شده** است. اولویت سناریوی P10، P0 ریسک خرید است؛ شدت مالی downstream از این آزمایش تعیین نمی‌شود. صحت قیمت server، سبد اشتباه، سفارش یا charge اشتباه بررسی نشده‌اند. هیچ add/edit/remove cart، ارسال ورود/OTP، سفارش یا پرداخت در این بازتولید انجام نشده است. بررسی/اصلاح application source خارج از این مخزن QA و نیازمند پیگیری مالک برنامه است؛ این گزارش محلی است و issue خارجی ایجاد نشده است.
