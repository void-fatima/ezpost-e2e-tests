# EZPost — پیاده‌سازی زیرمجموعه‌های مسیر سفارش

تاریخ: ۱۴ نوامبر ۲۰۲۶، America/Los_Angeles. محل همهٔ تغییرات: `C:\Users\LOCAL_USER\Desktop\EZPost`.

**۱۲ کیس جزئی با ۱۵ تست در چهار spec نوشته شد: ۱۳ تست live خواندنی و دو تست controlled-response. وضعیت همگی `WRITTEN / NOT EXECUTED` است.** inspection خواندنی برنامه و static validation انجام شد؛ هیچ spec برنامه‌محور Cypress، قدیم یا جدید، در این مأموریت اجرا یا به runner بارگذاری نشد.

| موضوع | وضعیت دقیق |
|---|---|
| Design readiness | subsetهای عمومی زیر مستند و پیاده‌سازی شده‌اند؛ رفتار runtime Cypress هنوز تأیید نشده است |
| مجوز پیاده‌سازی | درخواست جاری نوشتن تست و بررسی static را مجاز کرده است؛ مجوز فراگیر مرحله‌ها/سفارش کامل نیست |
| مجوز/وضعیت اجرا | در این مأموریت اجرا ممنوع بود؛ دستورهای اجرای آینده در انتهای گزارش صرفاً پیشنهاد هستند |
| نقص برنامه | هیچ نقص تازهٔ تأییدشده یا نتیجهٔ pass/fail از این تست‌های جدید وجود ندارد؛ blocked branch و timeout ابزار به‌تنهایی defect نیست |
| کار قبلی | M01، ۳۰ شناسهٔ آن و نتایج تاریخی از جمله دو شکست N02-TC04 دست‌نخورده‌اند؛ موضوع scroll بررسی نشده است |

## مسیر مشاهده‌شده و مرز شواهد

Inspection جدید با Chrome 157 در context مهمان جدا انجام شد. صفحات شخصی/ادمین و session موجود Cypress برای این discovery استفاده نشدند. navigation فقط خواندنی بود؛ تنها POST مجاز، quote خودکارِ خواندنی محصول بود. guard مرورگر درخواست‌های دیگرِ نوشتنی را می‌بست؛ هیچ تلاش مسدودشده‌ای در دادهٔ ثبت‌شده دیده نشد. هیچ add/remove/save/submit/OTP/order/payment انجام نشد.

| گام | مشاهدهٔ فعلی | آنچه هنوز requirement/شاهد مستقل ندارد |
|---|---|---|
| انتخاب محصول | `/shop` دارای کارت و لینک واقعی محصول است؛ fixture محدود این suite، `blackfri-01` با H1 «بلک فرایدی» است | کل موجودی/محتوای مجاز release و صحت متن/ارسال؛ تعداد محصولات assertion نشده است |
| بسته و تعداد | بسته‌های قابل انتخاب، input تعداد و summary وجود دارند؛ ۱→۲→۳→۲ و تغییر بستهٔ ۱۲۰→۲۴۰ خواندنی مشاهده شد | دامنه/grammar تجاری، discount/tier/rounding و schedule مستقل؛ min=1/max=50 فقط baseline همین محصول است |
| گالری و نمای باریک | تغییر تصویر با Enter و نوار خرید در 390×844 مشاهده شدند | درستی معنایی تصاویر، دستگاه فیزیکی، screen reader و پوشش کامل accessibility |
| customization | روی لینک‌های عمومی محصولات فعلی discovery انجام شد؛ کنترل قابل استفادهٔ editor/upload در صفحات مهمان بررسی‌شده پیدا نشد؛ لینک درخواست خارجی در DOM مخفی بود و باز/ارسال نشد | availability به محصول/نقش/مرحله، entry رسمی، editor در برابر درخواست خارجی، قواعد فایل/چاپ؛ absence در این نمونه‌ها نبود feature در همه‌جا را ثابت نمی‌کند |
| ورود به cart | لینک محصول به `/cart` در DOM هست؛ cart با direct navigation فقط در حالت مهمان خالی مشاهده شد | add handoff، populated cart، merge/edit/remove/badge/totals/retention؛ هیچ‌کدام از empty UI استنتاج نمی‌شوند |
| احراز هویت/checkout | direct navigation مهمان خالی به `/checkout` به `/login?next=/checkout` رسید؛ فرم موبایل و native validation بدون submit مشاهده شد | این مشاهده تصویب empty-cart eligibility یا نقش‌های دیگر نیست؛ ورود و return پس از آن آزمایش نشده‌اند |
| customer/delivery/review | فقط نام مرحله در indicator قبلی وجود دارد؛ screen واقعی بعد از login در این مأموریت در دسترس قرار نگرفت | هیچ field، postcode، fee، tax، روش ارسال یا retention فرض نشده است |
| پرداخت/تأیید/جزئیات | مسیر authenticated و sandbox/سفارش مجاز عرضه نشده است | gateway، success/fail/cancel/timeout/return/retry، order timing/id/status/amount، reconciliation و cart پس از order |

بنابراین مسیر کامل add→checkout→payment→confirmation هنوز E2E پوشش داده نشده است. نبود fixture پایین‌دست مانع نوشتن تست‌های عمومی مستقل نشد. این کار M02 نیست: مالکیت از M03/M04/M05/M06 موجود گرفته شده است؛ J04/J01/J02/J03 به ترتیب همچنان M07/M08/M09/M10 هستند.

شواهد جدید زیر `QA/Evidence/Ordering-Authoring-2026-11-14/` هستند:

- `OUTPUT_ROOT.json` و `output-root-probe.png`: خروجی probe پیش از ورود به برنامه؛ artifact/download/trace صریح زیر EZPost. از MCP دارای root قدیمی استفاده نشد. scriptهای inspection، TEMP/TMP فرزند و در نسخهٔ نهایی process محلی Node را به `runtime` همین پوشه محدود می‌کنند؛ هیچ setting عمومی تغییر نکرد.
- `discovery.json` و فایل‌های `shop` / `product-initial` / `login` / `guest-checkout-login`: DOM، aria snapshot و ترافیک عمومی بدون cookie/header احراز هویت.
- `selection-discovery.json` و HTMLهای `selection-*` / `cart-ready.html`: انتخاب و quoteهای واقعی، gallery، نمای باریک و cart آماده. `cart.json` نمونهٔ زودهنگام loading است و oracle سبد خالی نیست؛ `cart-ready.html` مبنای این قسمت است.
- `auth-native-observation.json`: رشته‌های نامعتبر و truncation/Tab در هر دو viewport، بدون شمارهٔ تماس واقعی یا submit.
- `transport-observation.json`: native fetch و مصرف `response.json()` برای quote؛ بدون اجرای race/Cypress.
- console در `selection-discovery.json` هشدار hydration در لینک مرحلهٔ cart ثبت کرد. این به عنوان مشاهده نگه داشته شد؛ علت، severity یا نقض policy از آن اعلام نشده و policy مرحله به رفتار موجود تبدیل نشده است.

همهٔ این موارد شواهد تاریخ‌دارند، نه تضمین رفتار آینده یا acceptance تجاری. evidence/reviewهای قبلی و manifest مهاجرت تغییر نکردند.

## کیس ← کد ← منبع انتظار ← fixture

سند دقیق کیس‌ها، شامل نقش/شروع، اقدام، خروجی، اثبات و پیش‌شرط، **پیش از کد** در `QA/Test-Cases/EZPOST_QA_ORDERING_TEST_CASES.md` نوشته شد. نام هر describe والد/ماژول و نام هر it همان ID جزئی را دارد. تمام ردیف‌های زیر `WRITTEN / NOT EXECUTED` هستند.

مسیر کوتاه specها در جدول نسبت به `cypress/e2e/ordering/` است. R1/R2 و O1–O5 در سند کیس تعریف شده‌اند.

| ID / مالک | spec / تعداد it پس از پارامترسازی | assertion پیاده‌شده | نوع | منبع انتظار / fixture | قسمت باقیمانده |
|---|---|---|---|---|---|
| P01-ORD01 / M03/P01 | `browser/product-selection.cy.js` / ۱ | کارت انتخاب‌شده→href/URL/H1 محصول و readiness quote | live | R1/P01 + O1؛ محصول عمومی ثبت‌شده | صحت تجاری محتوا/shipping |
| P02-ORD01 / M03/P02 | همان / ۱ | Enter تصویر دوم و اول، focus، src متفاوت/منتخب و load تصویر | live | R1/P02 + O2؛ gallery چندتصویری | alt/معنی تصویر دستی، fallback |
| P03-ORD01 / M03/P03 | همان / ۱ | qty=2، بستهٔ ۲۴۰ منتخب و یکتا، خلاصه ۴۸۰ لیبل، هویت محصول و واحد | live | S1/R2 + O2؛ package_idهای عمومی ثبت‌شده | cart handoff، retention و money correctness |
| P03-ORD02 / M03/P03؛ U01/U05 | همان / ۱ | Enter انتخاب بسته در 390×844، identity و summary انتخاب جدید | live | S1 + button واقعی O2 | دستگاه و assistive tech دستی |
| P03-ORD03 / M03/P03؛ U03 | همان / ۱ | نوار پایین قابل مشاهده و هماهنگی label/money با summary نهایی؛ بدون CTA click | live | S1/O2؛ q2 واقعی | pending CTA، overlap فیزیکی و cart |
| P04-ORD01 / M04/P04 | همان / ۱ | type/min/max فعلی و disabled پایین دامنه، ۱→۲→۱ | live baseline | O1/O2؛ فقط همین محصول، نه range مصوب | bounds/invalid/normalized/server grammar |
| A01-ORD01 / M05/A01 | `browser/auth-entry.cy.js` / ۲ | heading/form/label و type/required/pattern/maxlength/inputmode/autocomplete/dir در دو viewport | live baseline | O1؛ فرم بدون دادهٔ حساب | قبول/رد server، grammar مصوب |
| A01-ORD02 / M05/A01 | همان / ۲ | required خالی، patternMismatch ورودی نامعتبر، maxlength native و clear؛ بدون ارسال | live baseline | O1/O4؛ فقط `abcdefghijk`، `09` و دوازده حرف | normalization و OTP/server path |
| A01-ORD03 / M05/A01؛ U05 | همان / ۱ | Tab از input به submit بدون فعال‌سازی؛ فیلد خالی/URL و صفر auth POST | live | R2/O4؛ فرم خالی | keyboard/accessibility کامل |
| T01-ORD01 / M06/T01 | `browser/cart-recovery.cy.js` / ۲ | session مهمان واقعی، empty H1/H2، recovery به shop و محصول قابل انتخاب | live | R1/T01 + O1/O2؛ cart خالی طبیعی | populated model و role×cart |
| P08-ORD01 / M04/P08 | `controlled/quote-presentation.cy.js` / ۱ | replay دقیق quote ثبت‌شده و ارائهٔ unit/line/per-label/quantity/currency | controlled UI | O2؛ `ordering-quotes.json`، بدون تغییر ارقام | قیمت/rounding مستقل به‌طور کامل باز است |
| P10-ORD01 / M04/P10 | همان / ۱ | q2 نگه‌داشته‌شده، q3 کامل، آزادسازی q2 و حفظ آخرین selection/presentation | controlled UI | S1 + O2/O5؛ q1/q2/q3 واقعی replayشده | backend race/retry، cart/order؛ محدودیت instrumentation زیر |

`waitForQuote` از پاسخ واقعی برای انتظار پایان ارائهٔ همان پاسخ استفاده می‌کند؛ این آزمون محاسبهٔ مستقل پول نیست. label arithmetic از تعداد انتخابی و محتوای بسته انجام می‌شود. مقایسهٔ main/mobile نیز صرفاً سازگاری دو سطح نمایش است. هیچ count/stock/discount ثابتِ فهرست یا قیمت موقت به عنوان شرط تجاری hardcode نشده است؛ ارقام replay همان snapshot دقیقِ برچسب‌خورده هستند.

P10 فقط waiting شبکه ندارد: مصرف body quote قدیمی یا AbortError خواندن آن مشاهده می‌شود و سپس دو فرصت rendering واقعی قبل از assertion نهایی طی می‌شود. این hook فقط native response را می‌خواند و bytes/rejection را عوض نمی‌کند. خطای interception به‌تنهایی دلیل «لغو توسط برنامه» نیست. اگر راهبرد برنامه بعداً پاسخ قدیمی را قبل از خواندن body عمداً discard کند، ابزار completion باید برای آن شاهد جدید داشته باشد؛ timeout ابزار به معنی bug نیست و الزام خواندن پاسخ قدیمی requirement محصول نیست. این محدودیت runtime صریح است؛ arbitrary sleep یا hook داخلی برنامه جایگزین نشده است.

هیچ placeholder، `it.skip`، تست خالی، forced click، suppress exception، API setup، حساب/سبد/سفارش/پرداخت ساختگی وجود ندارد. helper موجود `emptyGuest` و digits دوباره استفاده شدند؛ indicator/Previous/Next متعلق به N08 تکرار نشد. classهای summary/selected/mobile فقط وقتی selector معنایی/data-cy وجود نداشت از DOM بازرسی‌شده گرفته شدند؛ افزودن data-cy به این بخش‌ها در آینده قابلیت نگهداری را بهتر می‌کند، اما هیچ کد برنامه تغییر نکرد.

## فایل‌ها و حفظ پروژه

تمام فایل‌های زیر جدیدند؛ هیچ فایل موجودِ پروژه ویرایش نشده است:

- `QA/Test-Cases/EZPOST_QA_ORDERING_TEST_CASES.md` و همین گزارش.
- چهار spec زیر `cypress/e2e/ordering/browser/` و `controlled/` مطابق جدول.
- `cypress/support/ordering.js`: helper مخصوص همین specها؛ support جهانی موجود تغییر نکرد.
- `cypress/fixtures/ordering-observed.json` و `ordering-quotes.json`: baseline و replay عمومی بدون PII/credential؛ سه response با evidence مقایسهٔ دقیق شدند.
- `scripts/check-ordering-static.cjs`: syntax/import/traceability/fixture/preservation بدون Cypress.
- `scripts/open-ordering.cjs`: launcher آیندهٔ `cypress open` با config موجود و override دامنه/evidence فقط در process؛ این launcher در این مأموریت اجرا نشد.
- پوشهٔ evidence جدید شامل scriptهای inspection، DOM/aria/JSON و شواهد بررسی static/preservation است.

`package.json`، lockfile، config اصلی، همهٔ specهای M01، support قبلی، planning/cases/reports قبلی در مجموعهٔ ۲۹ فایل SHA-256 پیش/پس یکسان ماندند. static checker قبلی نیز ۳۰ ID و نگاشت M01 و هشت spec اصلی را تأیید کرد. مقادیر requirementهای حل‌نشدهٔ M01 دست‌نخورده‌اند. نصب/upgrade، Git، source/server/DB یا فایل Tapin تغییر داده نشد.

Config موجود عمداً همچنان فقط M01 را discover می‌کند؛ تغییر آن یا support مشترک می‌توانست runner تعاملی قدیمی را rerun کند. spec/helperهای جدید در import graph M01 نیستند. launcher جدید همان config و Cypress محلی 16.2.1 را با `specPattern` موقت ordering باز می‌کند؛ پروژه یا config رقیب ساخته نشده است. به IDE/session قدیمی عنوان «workspace عوض شد» نسبت داده نمی‌شود؛ تمام عملیات فایل با workdir صریح Desktop EZPost انجام شد.

## شاخه‌های باز و تصمیم/دادهٔ لازم

این موارد سؤال‌های فنیِ قابل حل از مستندات نیستند؛ داده/سیاست هنوز عرضه نشده است. جزئیات مالکیت و assertionهای مفقود در جدول انتهای سند کیس موجود است.

| نیاز واقعاً مفقود | والدها و پوشش اثرپذیر | راه تکمیل مجاز در آینده |
|---|---|---|
| schedule قیمت، currency/rounding/fee و quantity grammar/min/max به تفکیک بسته/محصول | P04–P09 و پول در cart/review | مرجع مستقل نسخه‌دار صاحب محصول؛ quote خودش مرجع مستقل نیست |
| مدل cart و eligibility/retention/merge/edit/remove/retry/concurrency | P12/P14/T02–T08، N08 مرتبط | policy مصوب + مشاهدهٔ populated UI با دادهٔ امن، reset پشتیبانی‌شده؛ بدون hidden setup API |
| محیط و دادهٔ امن ordinary-user و OTP/session/return | A02–A12، T04/T07 و downstream | دو هویت عادی اختصاصی و کانال OTP امن؛ هرگز cookie شخصی/ادمین |
| entry و قرارداد customization/file/print | J04 و configuration handoff | تصمیم فعال بودن feature و دسترسی به کنترل واقعی؛ بدون upload/save پیش از مجوز |
| form واقعی customer/delivery/review و مرز ایجاد order | J01 | دسترسی امن پایین‌دست، field/rule inventory واقعی، fees و retention مصوب |
| sandbox رسمی و outcomes/reconciliation و duplicate oracle | J02 | قرارداد provider، دادهٔ تست رسمی و منبع مستقل نتیجهٔ order/charge؛ disabled/request count کافی نیست |
| orderهای مالکیت‌دار و status/confirmation/cart policy | J03/A12 | fixture مجاز برای دو مشتری و صفحات واقعی؛ بدون order ID/status حدسی |

هیچکدام از این گیت‌ها به معنی تأیید bug، تصویب معیار پذیرش از طرف کاربر یا حذف دائمی branch نیستند. این مأموریت به طور خاص ثبت دادهٔ زنده برای فراهم‌کردنشان را مجاز نکرده بود.

## بررسی‌های انجام‌شده و محدودیت آن‌ها

سه بررسی متمایز انجام شد: بازبینی مستقل traceability/ownership، بازبینی مستقل کیفیت کد و سپس reconciliation/static validation. بازبینی کد دو مشکل زمانی در طراحی انتظار render و یک گپ شاهد فرم را پیدا کرد؛ انتظار ارائهٔ پاسخ، callback retry مشترک main/mobile، شاهد native form و consumption/render barrier اصلاح شدند. edge لغو body در P10 و پیش‌شرط discard قبل از read نیز صریح شدند.

دستورهای واقعاً اجراشده، فقط static:

```powershell
node .\scripts\check-ordering-static.cjs
npm.cmd run check:static
```

نتیجهٔ static: چهار spec، ۱۲ ID با bijection سند/کد، ۱۵ it پارامترشده طبق بازبینی کد، syntax/importهای محلی، JSONهای fixture، سه response replay دقیق و SHA-256 یکسانِ ۲۹ فایل قبلی. `check:static` همچنین config/isolation/evidence paths، ۳۰ ID و نگاشت M01 و ممنوعیت ساخت policy خیالی در fixture اصلی را بررسی کرد. در package پروژه lint/typecheck مستقل تنظیم نشده است؛ چنین اجرایی ادعا نشده است. مراجع رسمی Cypress برای intercept Promise، should و press بررسی شدند؛ `cypress-reference-check.json` URL/status/excerpt را نگه می‌دارد.

`static-verification.json` و `preservation-before.json` / `preservation-after.json` اثبات بررسی static و preservation هستند. موفقیت syntax یا inspection موفق، **pass تست برنامه نیست**. رفتار Cypress/runtime همین specها هنوز باید پس از مجوز اجرا ارزیابی شود.

## نخستین اجرای آینده، فقط به صورت قابل مشاهده

این دستورها در این مأموریت اجرا نشده‌اند. اجرای آیندهٔ همین زیرمجموعه‌های خواندنی نیاز به درخواست جدا دارد. قبل از آن محصول/بسته‌های baseline، دسترسی runner به origin، نشست مهمان تازه و مسیر native fetch/json باید برقرار باشند. نتیجهٔ session قدیمی M01 باید حفظ شود و اگر Cypress پروژه را از قبل باز تشخیص داد، همان پروژه ابتدا از UI قبلی بسته/آزاد شود؛ هیچ runner قبلی خودکار بسته نشد.

برای specهای live، با همان installation/config موجود:

```powershell
Set-Location -LiteralPath 'C:\Users\LOCAL_USER\Desktop\EZPost'
node .\scripts\open-ordering.cjs live
```

در Cypress تعاملی E2E، Chrome انتخاب می‌شود؛ اگر انتخاب UI نمایش داده شد Chrome را انتخاب و Start E2E Testing را بزنید. سپس هرکدام از `product-selection.cy.js`، `auth-entry.cy.js` و `cart-recovery.cy.js` را از لیست Specs انتخاب کنید. باز شدن process، تأیید پنجره نیست؛ باز بودن Cypress، بارگذاری spec و اجرای واقعی assertions باید جدا ثبت شوند. پنجره و Chrome پس از اجرا خودکار بسته نمی‌شوند.

برای controlled-response در نوبت جدا و بدون گزارش‌کردن آن به عنوان backend E2E:

```powershell
Set-Location -LiteralPath 'C:\Users\LOCAL_USER\Desktop\EZPost'
node .\scripts\open-ordering.cjs controlled
```

سپس `quote-presentation.cy.js` انتخاب شود. این wrapper عملاً `cypress open --e2e --browser chrome --project ... --config-file cypress.config.cjs` را با specPattern موقت و artifact root زیر `QA/Evidence/Ordering-Cypress/interactive-...` فراخوانی می‌کند. flag موروثی Electron و TEMP/TMP فقط برای process فرزند تنظیم می‌شوند. هیچ headless/run helper جایگزین این دستورها نیست. برای پایین‌دست state-changing، این آمادگی خواندنی کافی نیست و محیط/fixtures/مجوزهای جدول بالا جدا لازم‌اند.
