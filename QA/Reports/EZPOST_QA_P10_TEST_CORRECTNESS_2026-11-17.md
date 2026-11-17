# EZPost — بررسی صحت تست‌های stale-response و وضعیت فعلی

تاریخ: **۱۷ نوامبر ۲۰۲۶، America/Los_Angeles**. Workspace مستقل: Desktop/EZPost. baseline محلی در شروع کار: branch main، HEAD برابر 6c666ece589f4af1eab45fa886afa2874e5ed9b8، working tree تمیز و origin همان https://github.com/void-fatima/ezpost-e2e-tests. هیچ reset، commit، push، نصب یا تغییر dependency انجام نشد.

دو تست **P10-ORD01 و P10-ORD02 همچنان به‌درستی شکست می‌خورند**. هر دو در Chrome و Firefox، هم با observer جدید و هم بدون wrapper fetch/response، نتیجهٔ نادرست ۲۴۰ را رد کردند. assertion یکپارچهٔ جدید برگشت مبلغ نمایشی به quote قدیمی را هم نشان داد. این نتیجه، frontend تحت پاسخ کنترل‌شده است؛ صحت مستقل قیمت یا پیامد سبد/سفارش/پرداخت از آن نتیجه نمی‌شود.

## قرارداد پیش از تغییر کد

قراردادها پیش از اصلاح در [contracts-before-authoring.md](../Evidence/Ordering-Cypress/review-2026-11-17-1794923768126/contracts-before-authoring.md) ثبت شدند. منبع انتظار، S1 در [کیس‌های سفارش](../Test-Cases/EZPOST_QA_ORDERING_TEST_CASES.md)، P03/P10 در Phase 1 و دستور صریح کاربر است. quote تاریخی منبع قیمت تجاری مستقل نیست.

| مورد | شروع و پیش‌نیاز | اقدام | انتظار قابل مشاهده و رفتار نادرستی که باید رد شود |
|---|---|---|---|
| P10-ORD01 / P10 | مهمان جدا؛ محصول blackfri-01؛ package49 با ۱۲۰ لیبل؛ quote اولیهٔ q1؛ fixture عمومی هنوز با UI منطبق | افزایش به q2 و نگه‌داشتن پاسخ؛ ArrowUp/Tab واقعی به q3؛ تکمیل و نمایش صحیح q3؛ سپس آزادکردن پاسخ قدیمی | همان محصول، بستهٔ ۱۲۰ لیبلی منتخب یکتا، input=3، مجموع **360** و presentation مبلغ **14,100,000** با هم باقی بمانند. **240** یا **9,400,000** نتیجهٔ نامعتبر است. |
| P10-ORD02 / P10 | همان شروع؛ بستهٔ دوم package50 با ۲۴۰ لیبل | q2 با پاسخ package49 معلق؛ انتخاب واقعی package50 در q2؛ تکمیل و نمایش صحیح انتخاب جدید؛ سپس پاسخ قدیمی | همان محصول، بستهٔ ۲۴۰ لیبلی منتخب یکتا، input=2، مجموع **480** و presentation مبلغ **16,400,000** باقی بمانند. **240**، بستهٔ قبلی یا مبلغ **9,400,000** رد شود. |

هر درخواست با ورودی کامل captureشده تطبیق دارد. fixture خروجی نیز باید با **ورودی مورد انتظار** از نظر package و quantity و با quantity×labels از نظر مجموع لیبل منطبق باشد؛ body پاسخ به‌تنهایی انتخاب مورد انتظار را تعیین نمی‌کند. اعتبار قیمت، tier، tax و rounding مصوب همچنان به oracle مستقل نیاز دارد.

## اصلاح محدود ابزار و oracle

- شرط اشتباه «برنامه باید body پاسخ قدیمی را بخواند یا read آن AbortError بدهد» حذف شد؛ برنامهٔ درست می‌تواند پاسخ قدیمی را پیش از خواندن کنار بگذارد.
- observer جدید همان promise اصلی fetch را به برنامه برمی‌گرداند؛ متدهای text/json پاسخ اصلی را تغییر نمی‌دهد. یک clone مستقل، پایان تحویل body را ثبت می‌کند. abort بومی یا signal واقعاً aborted پذیرفته می‌شود؛ NetworkError عمومی معادل cancellation موفق نیست.
- آزادسازی gate فقط بعد از assertion کامل انتخاب جدید انجام می‌شود. در حالت اصلی، تحویل کامل clone یا abort بومیِ همان ورودی قدیمی انتظار کشیده می‌شود؛ شرط ضروری، مصرف body توسط برنامه نیست. درخواست واقعاً لغوشده دوباره reply نمی‌شود.
- مسیر تشخیصی جدا، observer را خاموش می‌کند؛ پس از interception تکمیل‌شده و دو فرصت render همان oracle را اجرا می‌کند. این مسیر برای بازتولید پاسخ تحویل‌شده است؛ مرجع اثبات cancellation واقعی نیست.
- snapshot نهایی، path/H1، بستهٔ منتخب یکتا و قابل مشاهده، quantity، خلاصهٔ لیبل، line total، unit و per-label را **در یک callback** بررسی می‌کند. تطبیق قطعه‌های UI در زمان‌های متفاوت دیگر کافی نیست.
- old helper بدون مصرف‌کننده حذف شد؛ guard مشترک، fixtureها، قیمت‌ها و expectedهای ۳۶۰/۴۸۰ تغییر نکردند. هیچ force click، arbitrary sleep، exception suppression یا skip اضافه نشد.

محدودیت صریح: پایان clone، پایان **تحویل داده** را نشان می‌دهد؛ پایان تمام کارهای احتمالی برنامه را ثابت نمی‌کند. دو render فرصت محدود برای handler مشاهده‌شده‌اند، نه تضمین علیه هر کار عمداً معوقِ آینده. بازتولید بدون wrapper وابستگی شکست به wrapper مصرف body را کاهش می‌دهد، ولی نبود هر اثر instrumentation را اثبات نمی‌کند.

## اجرای واقعی و قابل مشاهده

نسخه‌ها: Cypress **16.2.1** محلی، Chrome **157.0.8103.78** و Firefox **160.0**. دستور launcher موجود با config اصلی و specPattern محدود در [launch.cjs](../Evidence/Ordering-Cypress/review-2026-11-17-1794923768126/launch.cjs) استفاده شد:

    node QA/Evidence/Ordering-Cypress/review-2026-11-17-1794923768126/launch.cjs chrome

این launcher فقط node_modules/cypress/bin/cypress open --e2e --browser chrome را با project/config موجود اجرا می‌کند. specها در UI واقعی انتخاب شدند؛ سپس Firefox از browser picker همان Cypress انتخاب شد. app-opened با handle واقعی پنجره و تصویر runner؛ spec-loaded با مسیر Cypress.spec؛ tests-executed با Mocha end/state، state هر تست و reporter تأیید شدند. isInteractive=true، isHeaded=true، isHeadless=false. هیچ اجرای headless انجام نشد.

| مرورگر | spec / نوع | Passed | Failed | Pending | Skipped | Not run در همین spec |
|---|---|---:|---:|---:|---:|---:|
| Chrome | quote-presentation.cy.js / controlled اصلی | 2 | 2 | 0 | 0 | 0 |
| Chrome | unwrapped.cy.js / diagnostic همان چهار تست | 2 | 2 | 0 | 0 | 0 |
| Firefox | quote-presentation.cy.js / controlled اصلی | 2 | 2 | 0 | 0 | 0 |
| Firefox | unwrapped.cy.js / diagnostic همان چهار تست | 2 | 2 | 0 | 0 | 0 |

P08-ORD01 و P11-ORD01 موفق؛ P10-ORD01 و P10-ORD02 در هر چهار ردیف ناموفق‌اند. جدول **۱۶ نتیجهٔ ثبت‌شدهٔ اجرای نهایی برای چهار ID موجود** است، نه ۱۶ کیس جدید. suite اصلی سفارش همچنان ۲۰ live + ۴ controlled = ۲۴ تست دارد. **هیچ‌یک از ۲۰ تست live هر مرورگر یا تست‌های unrelated M01 در این کار rerun نشدند**؛ نتایج کامل ۱۴ نوامبر تاریخی باقی‌اند. inspection خواندنی جدا، تست Cypress یا populated-cart execution نیست.

در تلاش اول از API حذف‌شدهٔ Cypress.env استفاده شد؛ دو P10 قبل از بازتولید با خطای setup شکست خوردند، P08/P11 موفق شدند. با مراجعه به declaration نصب‌شدهٔ Cypress 16، این flag غیرحساس به Cypress.expose اصلاح شد. شاهد اولیه [initial-api-setup-failure.json](../Evidence/Ordering-Cypress/review-2026-11-17-1794923768126/chrome/initial-api-setup-failure.json) و تصویر کنار آن حفظ است؛ این شکست‌ها باگ برنامه شمرده نشده‌اند. خطاهای collector میانی در driver-error و diagnostics محفوظ‌اند. auto-watch هنگام ویرایش فعال بود؛ جدول بالا شمارش تمام rerunهای خودکار/تلاش‌های میانی نیست. نتایج نهایی عمداً از rawهای کامل نام‌برده استخراج شده‌اند.

## یافته‌های نهایی

| ID | انتخاب جدیدِ تأییدشده پیش از release | پس از پاسخ قدیمی؛ هر دو مرورگر، هر دو مسیر |
|---|---|---|
| P10-ORD01 | package49/q3؛ ۳۶۰ لیبل، 14,100,000 ریال | input=3 حفظ؛ خلاصه ۲۴۰؛ مبلغ 9,400,000 ریال |
| P10-ORD02 | package50/q2؛ ۴۸۰ لیبل، 16,400,000 ریال | package50 و input=2 حفظ؛ خلاصه ۲۴۰؛ مبلغ 9,400,000، unit=4,700,000 و per-label=39,166 ریال متعلق به package49 |

گزارش یکپارچهٔ باگ با expected/actual، دو روش بازتولید و لینک‌ها: [EZPOST_QA_P10_STALE_QUOTE_BUG_2026-11-17.md](EZPOST_QA_P10_STALE_QUOTE_BUG_2026-11-17.md). در شواهد تاریخی، assertion لیبل قبل از assertion مبلغ fail می‌شد؛ اثبات rollback مبلغ صرفاً متعلق به اجرای جدید با oracle اتمیک است.

## بررسی منفی و بازبینی دوم

[check-oracles.cjs](../Evidence/Ordering-Cypress/review-2026-11-17-1794923768126/check-oracles.cjs) همان validator استفاده‌شده در Cypress را با دادهٔ مستقل اجرا کرد: **۲۶ بررسی موفق، صفر شکست**. نتیجه در [oracle-self-checks.json](../Evidence/Ordering-Cypress/review-2026-11-17-1794923768126/oracle-self-checks.json) است. برای هر P10: snapshot صحیح پذیرفته؛ path/product/package/quantity/summary240/total/unit/per-label اشتباه رد؛ fixture با package یا quantity ناهماهنگ رد. چهار probe جدا، body نخوانده، body خوانده‌شده، AbortError و NetworkError را با promise اصلی و متدهای پاسخ دست‌نخورده بررسی کردند. این‌ها تست oracle/lifecycle هستند؛ اجرای برنامه یا پوشش جدید business نیستند.

بازبینی دوم جداگانهٔ کد توسط reviewer دیگر و بررسی نهایی نویسنده انجام شد:

| تست بحرانی | آیا خرابی ادعاشده می‌تواند همچنان PASS شود؟ | نتیجه/مرز ادعا |
|---|---|---|
| P10-ORD01 | ۲۴۰، محصول/بسته/تعداد غلط یا مبلغ ناسازگار در snapshot مشاهده‌شده، PASS نمی‌شود؛ failure واقعی همین را نشان داد | deferred overwrite خارج از checkpoint محدود همچنان ممکن است از مشاهده بیرون بماند |
| P10-ORD02 | بستهٔ قبلی، selected مخفی/غیریکتا، تعداد/۴۸۰ غلط یا مبلغ قدیمی در همان snapshot، PASS نمی‌شود | equality fixture صحت مالی مستقل نیست؛ DOM extraction واقعی هم با snapshot و failure runtime بررسی شد |
| مسیر terminal | خواندن body منسوخ الزامی نیست؛ abort بومی پذیرفته و NetworkError عمومی کافی نیست | fixture فعلی از fetch با JSON init استفاده می‌کند؛ تغییر transport نیاز به بازبینی observer دارد |

در بازبینی دوم، وابستگی quantity مورد انتظار به body و نبود assertion visibility بستهٔ منتخب شناسایی و **پیش از اجرای نهایی** اصلاح شدند. این بازبینی ادعای ناممکن‌بودن تمام false positiveها نیست.

## پیشروی خواندنی تا مرز سبد

[cart-boundary.json](../Evidence/Ordering-Cypress/review-2026-11-17-1794923768126/inspection/cart-boundary.json) از Chrome مستقل با profile جدید و output زیر همین Evidence تهیه شد. محصول hydrated، CTA قابل مشاهدهٔ افزودن، CTA مخفی جدا، quote اولیه و لینک واقعی cart بررسی شدند؛ لینک main a[href="/cart"] واقعاً به سبد خالی رفت. **هیچ CTA افزودن فعال نشد**؛ این navigation عمل add را ثابت نمی‌کند. صفر درخواست تغییردهنده ارسال یا تلاش شد. مرورگر inspection خودش بسته شد؛ runner Cypress باقی ماند.

طبق پاسخ صریح کاربر، آزمایشی‌بودن محیط، حساب/سبد اختصاصی و cleanup **تأیید نشده‌اند**. هیچ‌کدام موجود فرض نشد. populated DOM، edit/remove controls و request contract واقعی هنوز دیده نشده‌اند؛ **تست populated-cart نوشته یا اجرا نشد** تا کنترل/انتظار خیالی وارد suite نشود.

حداقل اطلاعات برای قدم بعدی، یک‌جا:

1. تأیید محیط مجاز برای cart mutation و دامنهٔ دقیق مجوز add/edit/remove.
2. یک guest cart واقعاً دورریختنی یا ordinary test identity اختصاصی؛ بدون کوکی/رمز شخصی.
3. روش پشتیبانی‌شدهٔ برگرداندن همان سبد به وضعیت شروع، از UI یا روشی که مالک محیط معرفی کند؛ API ساختگی فرض نمی‌شود.

بعد از این‌ها، ابتدا کنترل‌های واقعی populated و requestهای مرتبط کشف می‌شوند. test تک‌خطی می‌تواند هویت محصول/بسته/تعداد/لیبل را بررسی کند؛ merge، badge، zero، retention و مبلغ مستقل فقط وقتی policy مربوط لازم شد نیاز به تصمیم جدا دارند. guard موجود اکنون دست‌نخورده است؛ اجازهٔ آینده صرفاً باید verified requestهای همان عملیات را باریک allowlist کند. سفارش، OTP و پرداخت همچنان خارج‌اند.

## شواهد، حفاظت و static

ریشهٔ جدید: [review-2026-11-17-1794923768126](../Evidence/Ordering-Cypress/review-2026-11-17-1794923768126/). شواهد تاریخی و گزارش اجرای ۱۴ نوامبر بازنویسی نشدند.

- [Chrome raw نهایی](../Evidence/Ordering-Cypress/review-2026-11-17-1794923768126/chrome/visible-results-8736.json)، همراه diagnostics و تصاویر.
- [Firefox raw نهایی](../Evidence/Ordering-Cypress/review-2026-11-17-1794923768126/firefox/visible-results-16532.json)، شامل شبکهٔ sanitized به‌تفکیک تست و diagnostics.
- before-changes و preservation-before/after برای مقایسهٔ SHA-256 محلی؛ fixtureها، lockfile، config، mutation guard و شواهد تاریخی باید unchanged بمانند.
- تصاویر Chrome از صفحهٔ اختصاصی runner و Firefox با PrintWindow روی handle پنجرهٔ اختصاصی گرفته شدند؛ snapshot ممکن است به گذار تست بعدی تعلق داشته باشد و باید با raw/URL خوانده شود.
- npm.cmd run check:static و node --check برای oracle CJS/ابزارهای جدید اجرا شدند؛ archival checker نوشتنی ordering اجرا نشد. خروجی نهایی در static-checks.json ثبت می‌شود.

کیس‌های ۳۰گانهٔ M01 و نگاشت‌هایشان حفظ‌اند. توسعهٔ landing/gallery، M02، source برنامه، dependency، Git commit/push، account، SMS/OTP، cart mutation، order یا payment انجام نشد. window نهایی Cypress و Firefox برای بررسی باز نگه داشته می‌شوند؛ وضعیت لحظهٔ تحویل جداگانه در final-runner-state.json ثبت می‌شود.
