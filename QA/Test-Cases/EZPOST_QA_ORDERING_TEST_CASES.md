# EZPost — کیس‌های جزئی مسیر سفارش

> **یادداشت وضعیت فعلی — ۱۷ نوامبر ۲۰۲۶:** متن WRITTEN / NOT EXECUTED و محدودیت مصرف body در checkpointهای تألیف پایین، سوابق زمان تألیف‌اند. در [گزارش اجرای ۱۴ نوامبر](../Reports/EZPOST_QA_ORDERING_EXECUTION_2026-11-14.md)، کل suite با ۲۴ تست برای هر مرورگر، ۲۲ PASS / ۲ FAIL ثبت شد. در [بررسی صحت و اجرای focused جدید](../Reports/EZPOST_QA_P10_TEST_CORRECTNESS_2026-11-17.md)، فقط چهار controlled موجود در Chrome و Firefox rerun شدند: هر کدام ۲ PASS / ۲ FAIL؛ replay تشخیصی بدون wrapper هم همان نتیجه را داشت. ۲۰ live و unrelated M01 این بار rerun نشدند.
>
> P10-ORD01/02 همچنان ۲۴۰ را به‌جای ۳۶۰/۴۸۰ رد می‌کنند. oracle نهایی اکنون محصول/بسته/تعداد/لیبل و مبلغ را هم‌زمان می‌سنجد؛ discard پیش از خواندن body یا cancellation بومی مجاز است و مصرف body شرط موفقیت نیست. clone-complete و دو render، checkpoint محدودِ مسیر مشاهده‌شده‌اند. [گزارش یکپارچهٔ باگ](../Reports/EZPOST_QA_P10_STALE_QUOTE_BUG_2026-11-17.md) rollback مبلغ نمایشی را از شواهد جدید گزارش می‌کند؛ این ادعا به مدارک قدیمی نسبت داده نمی‌شود. شماره‌ها و parent mappingها حفظ‌اند؛ اجرای subset معادل PASS کل والد نیست.
>
> کاربر تأیید کرده که آزمایشی‌بودن محیط، test cart/account و cleanup هنوز تأیید نشده‌اند. inspection جدید فقط CTA و navigation به سبد خالی را بررسی کرد؛ هیچ add/edit/remove، OTP، order یا payment انجام نشد و تست populated-cart نوشته نشده است.

تاریخ: ۱۴ نوامبر ۲۰۲۶. Workspace: `C:\Users\LOCAL_USER\Desktop\EZPost`.

این کیس‌ها **پیش از نوشتن specهای سفارش** تهیه شدند. وضعیت تمام تست‌های جدید: **WRITTEN / NOT EXECUTED** پس از پیاده‌سازی؛ هیچ اجرای Cypress در این مأموریت مجاز نیست. inspection خواندنی برای انتخاب کنترل/تعیین مرزها، اجرای این کیس‌ها محسوب نمی‌شود.

این سند M02 نیست. والدها از Phase 1 حفظ شده‌اند: M03 برای P01–P03؛ M04 برای P04/P08/P10؛ M05 برای A01؛ M06 برای T01. پسوند `ORD` شناسهٔ جزئی جدید همین سند است؛ ۳۰ شناسه و نگاشت M01 تغییر نمی‌کنند. N08 همچنان مالک indicator و سیاست Next/Previous است؛ assertionهای آن در اینجا تکرار نمی‌شوند.

## منابع و قرارداد پوشش

- R1: `QA/Planning/EZPOST_QA_PHASE1_REVIEW.md`، بخش‌های ۳.۳–۳.۶، ۷.۴، ۸ و B02–B11. P03/P10 خواستار سازگاری انتخاب/خلاصه‌اند؛ P08 نیاز به oracle مستقل قیمت دارد.
- R2: درخواست جاری کاربر: پوشش معنی‌دار انتخاب، سازگاری، فرم/کیبورد و viewport، بدون اجرای Cypress یا تغییر داده؛ رفتار مشاهده‌شده قانون تجاری مصوب نیست.
- O1: `QA/Evidence/Ordering-Authoring-2026-11-14/discovery.json` همراه فایل‌های `shop`، `product-initial`، `login` و `guest-checkout-login`؛ inspection خواندنی جدید Chrome 157، مهمان مستقل.
- O2: همان پوشه، `selection-discovery.json` و HTMLهای `selection-*` / `cart-ready.html`؛ انتخاب ۱۲۰/۲۴۰ لیبلی، تعداد ۱→۲→۳→۲، gallery با Enter و viewport 390×844. پاسخ‌های quote فقط با اقدام خواندنی مرورگر ثبت شدند.
- O3: `OUTPUT_ROOT.json` و `output-root-probe.png`؛ probe قبل از ورود به برنامه ثبت شد. TEMP/TMP و خروجی‌های صریح زیر EZPost هستند.
- O4: `auth-native-observation.json`؛ نگهداری رشته‌های نامعتبر، truncation native و مقصد Tab بدون submit در هر دو viewport تازه مشاهده شد. این baseline مرورگر است، نه تصویب grammar تجاری.
- O5: `transport-observation.json`؛ مصرف پاسخ quote توسط native fetch و `response.json()` برای q1/q2 مشاهده شد؛ هیچ race شبیه‌سازی یا Cypress در این inspection اجرا نشد.
- O6: `QA/Evidence/Ordering-Coverage-Audit-2026-11-14/discovery.json`؛ baseline تازهٔ انتخاب پیش‌فرض، ArrowUp و تغییر برگشتی بسته و native-format correction بدون submit.
- O7: همان پوشه، `recovery-discovery.json` و HTMLهای `gallery-*` / `quote-*`؛ dialog واقعی گالری و next/previous/tab/close/Escape با انتظار semantic، و قطع مرورگرمحور quote q2 سپس پاسخ واقعی q3. خروجی اولیهٔ `zoom-escape` در O6 نمونهٔ زودهنگام است؛ نبودن dialog پس از semantic wait در O7 ملاک بستن است. این بررسی Cypress نبود.
- O8: همان پوشه، `third-package.json`؛ انتخاب خواندنی گزینهٔ سوم با package_id=51 و ۳۶۰ لیبل در qty2؛ فقط association/contract، نه قیمت مصوب.

O1/O2 baseline تاریخ‌دار و قرارداد واقعی پاسخ‌اند، نه تصویب قیمت، موجودی، سقف تعداد، eligibility، shipping یا محتوای تجاری. مقایسهٔ snapshot quote و DOM فقط صحت ارائهٔ همان پاسخ را می‌سنجد؛ oracle قیمت مستقل نیست. تازگی و در دسترس بودن fixture پیش از اجرای آینده باید تأیید شود. اعداد package_id از ترافیک عمومی ثبت شده‌اند و حساب/شناسهٔ سفارش ساختگی نیستند.

قرارداد سازگاری S1: بعد از پایان پاسخ مربوط به انتخاب، مقدار input، گزینهٔ بسته و تعداد لیبل خلاصه باید همان انتخاب کاربر را نشان دهند؛ پاسخ قدیمی نباید آن را برگرداند. منبع S1 درخواست جاری + اهداف P03/P10 است؛ روش spinner/disabled/debounce یا سیاست cart از S1 نتیجه نمی‌شود. این معیار فنی، تصویب قواعد قیمت نیست.

پیش‌شرط مشترک اجرا: همان Cypress محلی 16.2.1، config و support موجود، testIsolation=true، دسترسی runner به origin واقعی، نشست مهمان تازه بدون دادهٔ شخصی، fixture عمومی O1/O2 هنوز موجود. تنها POST مجاز در support موجود quote خواندنی است. add-to-cart، submit ورود/اطلاعات مشتری، OTP، order و payment در هیچ کیس زیر فعال نمی‌شوند. هیچ fixture احراز هویت/سبد پُر/موفقیت پرداخت ساخته نشده است.

## کیس‌های دقیق قبل از کد

### P01-ORD01 — M03/P01؛ سازگاری هویت کارت و صفحهٔ جزئیات

- نقش/شروع: مهمان جدا، `/shop`؛ fixture: محصول عمومی `blackfri-01` با نام ثبت‌شدهٔ `بلک فرایدی`؛ بدون cart/account/payment.
- اقدام: یافتن کارت همین محصول و فعال‌سازی لینک واقعی جزئیات؛ انتظار برای quote اولیهٔ خواندنی.
- انتظار/منبع: href ثبت‌شده، pathname و H1 جزئیات با هویت کارت منطبق باشند (R1/P01، O1). بدون assertion قیمت/تعداد کل محصولات/درستی shipping.
- اثبات: URL + H1 قابل مشاهده + کنترل تعداد؛ endpoint quote فقط همگام‌سازی readiness است.
- نوع: live E2E خواندنی؛ spec: `browser/product-selection.cy.js`، عنوان شامل همین ID.
- باقی‌مانده: صحت تجاری اطلاعات نیاز به B03 دارد؛ این کیس آن را کامل نمی‌کند.

### P02-ORD01 — M03/P02؛ گالری با Enter

- نقش/شروع: مهمان، محصول چندتصویری O2، quote اولیه کامل؛ هیچ state از کیس دیگر.
- اقدام: focus روی دکمهٔ واقعی «مشاهده تصویر 2»، Enter، سپس دکمهٔ تصویر 1 و Enter.
- انتظار/منبع: تصویر اصلی هر بار به src thumbnail منتخب تغییر کند و load موفق داشته باشد (P02/R2/O2). تصویر اول و دوم باید متفاوت باشند؛ zoom feature موضوع این کیس نیست.
- اثبات: focus واقعی، src و `naturalWidth > 0` تصویر اصلی پس از هر تغییر.
- نوع/spec: live E2E؛ `browser/product-selection.cy.js`.
- باقی‌مانده: معنی/درستی تصویر و alt دستی؛ fallback خراب/کند نیاز به معیار پذیرفته‌شده دارد.

### P03-ORD01 — M03/P03؛ تغییر بسته در تعداد ۲

- نقش/شروع: مهمان، محصول O2، تعداد پیش‌فرض ۱ و بستهٔ ۱۲۰ لیبلی؛ fixture قیمت لازم نیست.
- اقدام: + تا ۲، انتظار پاسخ؛ انتخاب دکمهٔ واقعی بستهٔ ۲۴۰، انتظار پاسخ همان انتخاب.
- انتظار/منبع: H1 ثابت، input=2، گزینهٔ ۲۴۰ منتخب و تنها گزینهٔ منتخب؛ خلاصه «۲ بستهٔ ۲۴۰ لیبلی = ۴۸۰ لیبل» (S1/O2). request مشاهده‌شده باید package_id=50 و quantity=2 داشته باشد؛ پاسخ فقط همگام‌سازی و تطبیق هویت است.
- اثبات: کنترل، state منتخب DOM، خلاصه و currency-label ریال؛ بدون اثبات مبلغ/discount.
- همگام‌سازی: helper پس از network، ارائهٔ فیلدهای پاسخ جاری را نیز انتظار می‌کشد تا متن label زودهنگام به اشتباه «render کامل» تلقی نشود؛ این تطبیق فقط presentation است.
- نوع/spec: live E2E؛ `browser/product-selection.cy.js`.
- باقی‌مانده: handoff به cart=P14، selection retention=P12 و صحت پول=P08 همچنان جدا هستند.

### P03-ORD02 — M03/P03؛ انتخاب بسته با Enter در نمای باریک

- نقش/شروع: مهمان تازه، 390×844، محصول O2؛ quote اولیه کامل.
- اقدام: focus و Enter روی بستهٔ ۲۴۰ در تعداد ۱.
- انتظار/منبع: input=1، بستهٔ منتخب ۲۴۰ و خلاصه ۲۴۰ لیبل (S1/R2 و کنترل button مشاهده‌شده). تمرکز برنامه‌ریزی‌شده و Enter بخش کیبورد را می‌سنجد، نه پوشش کامل ترتیب Tab/دسترس‌پذیری.
- اثبات: focus، تغییر هویت درخواست و خلاصهٔ نهایی؛ بدون click افزودن.
- نوع/spec: live E2E؛ `browser/product-selection.cy.js`؛ ثانویه U01/U05.
- باقی‌مانده: device/کیبورد native و screen reader دستی‌اند.

### P03-ORD03 — M03/P03؛ هماهنگی نوار خرید باریک

- نقش/شروع: مهمان، 390×844، محصول O2 و quote اولیه.
- اقدام: افزایش از ۱ به ۲؛ انتظار quote همین انتخاب.
- انتظار/منبع: خلاصهٔ اصلی و نوار پایین هر دو ۲۴۰ لیبل؛ هر دو مبلغ قابل ارائه با واحد ریال داشته باشند و نمایش مبلغ دو سطح برابر باشد (S1/O2، ثانویه U03). این مقایسهٔ UI با UI فقط سازگاری نمایش است، نه صحت پول.
- اثبات: input، متن لیبل و مبلغ، visibility نوار و دکمهٔ آن. دکمه فعال نمی‌شود؛ readiness/امکان افزودن نتیجه‌گیری نمی‌شود.
- نوع/spec: live E2E؛ `browser/product-selection.cy.js`.
- باقی‌مانده: overlap فیزیکی، pending CTA و cart handoff پوشش کامل ندارند.

### P04-ORD01 — M04/P04؛ قرارداد فعلی stepper در پایین دامنه

- نقش/شروع: مهمان، محصول O2؛ input با min=1/max=50 و value=1 در baseline همین محصول.
- اقدام: بررسی قرارداد native و کاهش disabled؛ + به ۲ و سپس − به ۱، هر بار انتظار quote مربوط.
- انتظار/منبع: type=number، aria-label ثبت‌شده، min/max فعلی و رفتار ۱→۲→۱؛ کاهش در ۱ disabled و در ۲ enabled (O1/O2). این **baseline محصول مشخص** است؛ قانون مصوب ۱–۵۰ برای محصول یا سایر محصولات نیست.
- اثبات: attributeها، value، disabled و خلاصهٔ نهایی سازگار.
- نوع/spec: live E2E؛ `browser/product-selection.cy.js`.
- باقی‌مانده: max business، invalid/decimal/localized input، server enforcement و P05/P06 نیازمند B03؛ هیچ assertion حد تجاری اختراع نشده است.

### P08-ORD01 — M04/P08؛ فقط ارائهٔ snapshot واقعی quote

- نقش/شروع: مهمان، محصول O2 با همان package_id؛ fixture `ordering-quotes.json` از پاسخ دقیق عمومی `selection-default`.
- اقدام: interception مرورگر برای POST quote؛ تأیید ورودی دقیق ثبت‌شده و replay پاسخ بدون دست‌کاری ارقام.
- انتظار/منبع: UI unit/line/per-label همان مقدار پاسخ را با واحد ریال و قالب فارسی ثبت‌شده ارائه کند (O2؛ subset ارائهٔ P08). qty/labels نیز با انتخاب منطبق باشند.
- اثبات: سه فیلد نمایش پول و خلاصه؛ مبلغ از fixture ارائه می‌آید و **oracle مستقل محاسبه نیست**.
- نوع/spec: controlled-response UI؛ `controlled/quote-presentation.cy.js`؛ صفحه/assetها زنده‌اند، quote شبیه‌سازی است.
- باقی‌مانده: schedule/rounding/tax/discount correctness و تسویه به B03/B08 وابسته‌اند. snapshot مجوز تأیید قیمت نیست.

### P10-ORD01 — M04/P10؛ پاسخ قدیمی بعد از انتخاب جدید

- نقش/شروع: مهمان، محصول O2؛ replay پاسخ واقعی q1/q2/q3 از fixture، بدون تغییر body.
- اقدام: پاسخ q1؛ + به ۲ و نگه‌داشتن پاسخ q2 تا مشاهدهٔ درخواست؛ + به ۳؛ تکمیل q3؛ بررسی خلاصه؛ آزادسازی q2؛ بررسی دوباره.
- انتظار/منبع: input=3 و خلاصه ۳ بستهٔ ۱۲۰ = ۳۶۰ و مبلغ نمایش q3 بعد از پایان هر دو باقی بماند (S1/P10/R2). لغو درخواست قدیمی هم مجاز است؛ نتیجهٔ wait قدیمی باید response یا error قابل مشاهده داشته باشد. خطای قدیمی به‌تنهایی تشخیص علت لغو نیست.
- اثبات: ورود درخواست‌ها با quantity/package واقعی، completion کنترل‌شده، مصرف body پاسخ قدیمی یا AbortError خواندن آن، سپس دو فرصت واقعی rendering و DOM نهایی؛ network completion به‌تنهایی کافی نیست. بدون prescriptive spinner/disabled و بدون click CTA.
- نوع/spec: controlled-response UI؛ `controlled/quote-presentation.cy.js`؛ Promise فقط داخل route handler، نه ترکیب با زنجیرهٔ cy.
- باقی‌مانده: backend race/retry واقعی، failure UX، cart/order/charge اثبات نمی‌شوند؛ هیچ نتیجهٔ نقص I4 از نوشتن تست حاصل نشده است.
- پیش‌شرط فنی instrumentation: مسیر فعلی native fetch/json از O5؛ اگر پیاده‌سازی بعداً پاسخ قدیمی را پیش از خواندن body کاملاً discard کند، نیاز به شاهد completion همان مسیر و تطبیق ابزار انتظار وجود دارد. timeout این ابزار به‌تنهایی نقص برنامه نیست؛ مجبور کردن برنامه به خواندن پاسخ قدیمی معیار پذیرش نیست.

### A01-ORD01 — M05/A01؛ قرارداد فرم ورود بدون ارسال

- نقش/شروع: مهمان، `/login`؛ دو اجرای مستقل 1366×900 و 390×844؛ بدون شماره/حساب واقعی.
- اقدام: مشاهدهٔ heading، فرم و label/input/submit واقعی؛ هیچ submit.
- انتظار/منبع: قرارداد O1: `#mobile` با type tel، required، pattern، maxlength=11، inputmode=numeric، autocomplete=tel، dir=ltr؛ label به همین input متصل؛ form data-cy و submit قابل مشاهده.
- اثبات: هویت صفحه و attributeهای DOM؛ نه server-validation/OTP/auto-registration.
- نوع/spec: live E2E؛ `browser/auth-entry.cy.js`، دو پارامتر viewport.
- باقی‌مانده: grammar مصوب، normalization و مسیر server به B04/B07 وابسته‌اند.

### A01-ORD02 — M05/A01؛ native validity ورودی نامعتبر، بدون submit

- نقش/شروع: مهمان، فرم تازه و خالی؛ دو viewport مستقل؛ دادهٔ مصنوعی نامعتبر `abcdefghijk` و `09` و دوازده حرف؛ هیچ شمارهٔ تماس واقعی.
- اقدام: بررسی validity خالی؛ type حروف سپس `09`؛ بررسی patternMismatch؛ type دوازده حرف و بررسی طول ۱۱؛ clear.
- انتظار/منبع: `valueMissing` خالی، patternMismatch برای دو رشته، maxlength سمت browser و بازگشت به خالی (O1/O4 و native HTML contract). متن خطای native با زبان/مرورگر hardcode نمی‌شود.
- اثبات: validity input و `form.checkValidity()`، مقدار نهایی خالی؛ شمار درخواست POST auth صفر.
- نوع/spec: live E2E؛ `browser/auth-entry.cy.js`.
- باقی‌مانده: رد server/پیامک و همهٔ equivalenceهای موبایل هنوز پوشش ندارند.

### A01-ORD03 — M05/A01؛ حرکت focus به submit بدون فعال‌سازی

- نقش/شروع: مهمان desktop، فرم خالی O1.
- اقدام: focus روی input؛ Tab؛ بدون Enter/Space/click submit.
- انتظار/منبع: focus به submit واقعی می‌رسد (R2، ترتیب کنترل مشاهده‌شده O1/O4)؛ field خالی باقی می‌ماند و ارسال انجام نمی‌شود.
- اثبات: `cy.focused()`، URL `/login`، مقدار خالی و شمار auth POST صفر.
- نوع/spec: live E2E؛ `browser/auth-entry.cy.js`؛ ثانویه U05.
- باقی‌مانده: ترتیب کامل Tab و assistive technology در دامنه نیست.

### T01-ORD01 — M06/T01؛ سبد خالی و recovery انتخاب محصول

- نقش/شروع: context مهمان مستقل، `/cart`؛ session واقعی user=null؛ بدون seed/add/reset؛ دو viewport مستقل.
- اقدام: انتظار هویت سبد خالی؛ لینک «انتخاب بسته» داخل empty section؛ سپس لینک محصول واقعی در shop.
- انتظار/منبع: H1/H2 و لینک recovery ثبت‌شدهٔ `cart-ready.html`، مقصد `/shop` و heading فروشگاه، سپس محصول دارای H1 درست (T01/R1/O1/O2). این لینک recovery است، **نه** سیاست مرحلهٔ Previous/Next یا مجاز بودن checkout.
- اثبات: session user=null، empty-state مشخص، pathname+destination content و quote محصول؛ هیچ cart write.
- نوع/spec: live E2E؛ `browser/cart-recovery.cy.js`؛ استفادهٔ مجدد از helper موجود `emptyGuest`.
- باقی‌مانده: badge و populated cart/merge/edit/remove/retention/gates طبق B05/B06؛ فقدان fixture باعث ساخت آن‌ها نشده است.

## شاخه‌های فاقد پیش‌شرط؛ حفظ مالکیت بدون placeholder

| والد/ماژول | assertionهایی که هنوز نوشته نشده‌اند | پیش‌شرط دقیق |
|---|---|---|
| P01/P12/P13، M03 | صحت محتوا/shipping، retention/عدم carryover، availability transition | محتوای نسخه‌دار و policy retention؛ fixture availability با روش پشتیبانی‌شده |
| P04–P09، M04 | grammar/min/max تجاری، invalid/localized input، tier، discount، محاسبه/rounding مستقل | schedule/currency/rounding/quantity مصوب برای محصول/بسته؛ پاسخ quote oracle نیست |
| P10/P11، M04 | pending CTA acceptance، retry همان انتخاب، timeout/invalid-data و race واقعی backend | policy readiness/error و fault capability امن؛ P11-ORD01 فقط alert و recovery با انتخاب جدید و P10ها فقط race شبیه‌سازی خواندنی را کد می‌کنند |
| J04، M07 | choices/default/validation/edit/preservation/upload/preview | تصمیم صاحب محصول دربارهٔ entry واقعی، محصول/نقش/مرحله و file/print contract؛ لینک مخفی مجوز این قواعد نیست |
| P14/T02–T08، M06 | exact cart item/options/totals، edit/remove آخرین خط، merge، retention، stock/price changes، role×cart، duplicate/concurrency | محیط امن و داده/حساب مجاز، populated DOM واقعی، policy cart و reset پشتیبانی‌شده؛ هیچ API/data فرضی |
| A02–A12، M05 | acceptance formats، OTP/login/registration، expiry/logout/return/ownership | identities عادی مجاز، کانال OTP امن، policy session/redirect/normalization؛ بدون cookies شخصی/ادمین |
| J01، M08 | required fields/limits/validation، delivery، review/totals، back/next retention | دسترسی عادی و cart امن، مشاهدهٔ form واقعی، قواعد fees/shipping/address و مرز ایجاد order |
| J02، M09 | loading/duplicate/retry، success/fail/cancel/timeout/return/reload، order timing/amount، confirmation فوری و cart-after-order | sandbox رسمی + قرارداد provider + outcome مستقل قابل reconciliation؛ disabled/request count اثبات عدم duplicate نیست |
| J03، M10 | history/details/tracking identity/status، owned/other-owned resources | سفارش‌های از پیش آمادهٔ مجاز برای دو مشتری و status/ownership policy؛ بدون order ID/status ساختگی |

برای این شاخه‌ها `it.skip`، تست خالی یا fixture موفقیت ساختگی وجود ندارد. design readiness subsetهای بالا به معنی تصویب M01 یا پرداخت/سفارش کامل نیست؛ اجرای آینده مجوز جدا می‌خواهد. دو شکست N02-TC04 و شواهد تاریخی حفظ می‌شوند و موضوع این سند نیستند.

## افزوده‌های audit پوشش — تعریف پیش از کد

۱۵ تست اولیه حفظ شده‌اند. شناسه‌های زیر جدیدند و با همان مالکیت قبلی اضافه می‌شوند؛ وضعیت تمام تست‌ها همچنان WRITTEN / NOT EXECUTED است. matrix مستقل رفتارها در `QA/Reports/EZPOST_QA_ORDERING_COVERAGE_MATRIX.md` قرار می‌گیرد و صرفاً از این فهرست تست استخراج نشده است.

### P02-ORD02 — M03/P02؛ چرخهٔ dialog بزرگنمایی واقعی

- نقش/شروع/fixture: مهمان تازه، محصول چندتصویری فعلی؛ desktop و 390×844 مستقل؛ بدون cart/account/payment.
- اقدام: فعال‌سازی trigger واقعی با Enter؛ next، previous و tab تصویر ۲؛ بستن با دکمه؛ بازکردن مجدد و Escape.
- انتظار/منبع: O7 و affordance واقعی dialog: role/aria-modal/نام محصول، focus اولیه روی close، تصویر و tab منتخب منطبق، تنها یک tab منتخب، عدم وجود dialog پس از هر روش بستن؛ qty و بسته تغییری نکنند. wrap انتهای تصاویر و restore شدن focus پس از close الزام نشده‌اند.
- اثبات: `role=dialog`، `aria-selected`، src/load تصویر، absence پس از close/Escape و identity/summary محصول.
- نوع/spec: live خواندنی، `browser/product-selection.cy.js`؛ دو viewport. focus-return/trap و screen reader همچنان gap جدا هستند.

### P03-ORD04 — M03/P03؛ یکتایی پیش‌فرض و انتخاب برگشتی

- نقش/شروع: مهمان، محصول O6 در q1؛ بدون state کیس دیگر.
- اقدام: assert گزینهٔ پیش‌فرض یکتا؛ + به۲؛ انتخاب alternate۲۴۰، سوم۳۶۰، سپس default۱۲۰.
- انتظار/منبع: O6/O8/S1؛ qty=2 حفظ شود، هر بار تنها گزینهٔ واقعی منتخب و summary همان بسته باشد. این retention بین routeها نیست.
- اثبات: request/response identity، input، selectedPackage و labels؛ live در `browser/product-selection.cy.js`.
- باقی‌مانده: محصول تک‌گزینه‌ای، cross-product و retention هنوز پوشش کامل ندارند؛ نمونهٔ تک‌گزینه‌ای در catalog بررسی‌شده فراهم نشد، به معنی N/A نیست. پوشش سه گزینهٔ این fixture در qty2 پوشش تمام محصول‌ها/quantityها نیست.

### P04-ORD02 — M04/P04؛ مسیر مستقل کیبورد در quantity

- نقش/شروع: مهمان در q1/default؛ desktop و narrow مستقل؛ همان O6.
- اقدام: focus input؛ ArrowUp و Tab؛ انتظار quote q2.
- انتظار/منبع: رفتار O6 و درخواست کیبورد؛ q2/default/۲۴۰ لیبل و presentation نهایی؛ بدون استفاده از دکمهٔ + و بدون submit.
- اثبات: input، quote identity، selectedPackage و summary؛ live در `browser/product-selection.cy.js`.
- باقی‌مانده: typing/paste مستقیم، max، zero/negative/decimal/empty/malformed/excessive و قواعد تجاری جدا باز هستند.

### A01-ORD04 — M05/A01؛ correction فقط در قرارداد native فرم

- نقش/شروع: مهمان، login تازه؛ desktop و narrow مستقل؛ بدون حساب واقعی.
- اقدام: حروف نامعتبر؛ جایگزینی با رشتهٔ تولیدشدهٔ `'09' + '0'.repeat(9)` که فقط الگوی HTML فعلی را ارضا می‌کند؛ سپس کوتاه‌کردن به `09` و clear.
- انتظار/منبع: O6.nativeCorrection؛ invalid→native valid→invalid→required empty. هیچ claim پذیرش server/وجود حساب یا مالکیت شماره نیست و هیچ submit رخ نمی‌دهد.
- اثبات: validity input/form، طول ۱۱، absence patternMismatch در حالت وسط، required empty در پایان و صفر auth POST.
- نوع/spec: live browser/native baseline، `browser/auth-entry.cy.js`؛ دو viewport؛ grammar تجاری و OTP همچنان باز.

### P10-ORD02 — M04/P10؛ race ترکیبی هویت بسته و تعداد

- نقش/شروع: مهمان، replay q1/default؛ fixture جدید `ordering-audit-quotes.json` فقط نسخهٔ دقیق پاسخ واقعی package50/q2 در O2 است.
- اقدام: + به q2/default و نگه‌داشتن پاسخ؛ انتخاب alternate در همان q2؛ تکمیل alternate؛ آزادکردن پاسخ قدیمی default.
- انتظار/منبع: S1/O2؛ qty2 و selected package50 و ۴۸۰ لیبل/ارائهٔ پاسخ alternate پس از پاسخ قدیمی ثابت بماند. صرف quantity مشترک برای correlation کافی نیست؛ packageId نیز کنترل می‌شود.
- اثبات: ورودی دقیق هر پاسخ، consumption با جفت packageId/quantity یا abort خواندن، دو render opportunity، selectedPackage و summary نهایی.
- نوع/spec: controlled UI، `controlled/quote-presentation.cy.js`؛ همان محدودیت fetch/json/discard پیش از read مانند P10-ORD01، بدون ادعای backend race یا cart/order.

### P11-ORD01 — M04/P11؛ قطع quote و بازیابی با انتخاب جدید

- نقش/شروع: مهمان و صفحهٔ زنده، replay پاسخ‌های واقعی q1/q3؛ فقط درخواست q2 در browser با forceNetworkError قطع می‌شود.
- اقدام: q1 کامل؛ + به۲ و شکست شبکهٔ شبیه‌سازی؛ مشاهدهٔ alert واقعی؛ + به۳ و تکمیل پاسخ q3.
- انتظار/منبع: O7 (baseline مرورگر، نه تصویب سیاست outage): alert «ارتباط برقرار نشد. دوباره تلاش کنید.»، هویت محصول/بسته و مقدار۲ باقی بماند؛ پس از تغییر جدید، qty3 و summary/presentation پاسخ q3 کامل شود.
- اثبات: interception error، alert قابل مشاهده، request q3 واقعی در قرارداد ثبت‌شده، selectedPackage و summary نهایی. پاک‌شدن خودکار toast، پنهان‌شدن قیمت قدیم، CTA disabled یا دکمهٔ retry فرض نشده‌اند.
- نوع/spec: controlled browser fault، `controlled/quote-presentation.cy.js`؛ شرکت/سرور offline نمی‌شوند؛ retry همان انتخاب، timeout، backend outage و accepted-response-lost پوشش داده نمی‌شوند.

اصلاح‌های همان شناسه‌های قبلی: P03-ORD03 و P10-ORD01 اکنون selected-package را صریح بررسی می‌کنند؛ P08-ORD01 علاوه بر numeric/currency، glyph/grouping فارسیِ snapshot فعلی را واقعاً assert می‌کند. این‌ها case جدید یا افزایش پوشش مالی مستقل نیستند.
