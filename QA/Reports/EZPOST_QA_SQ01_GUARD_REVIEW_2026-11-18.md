# بررسی محلی guard اجرای SQ-01 — ۱۸ نوامبر ۲۰۲۶

محدوده: ادامهٔ بررسی اجرای تاریخی `chrome-sq18a` در workspace مستقل `C:\Users\LOCAL_USER\Desktop\EZPost`. مبنای repository همچنان `5c24c5cf1c7cc4aad00e3e8f0d6ddc1c90b05b02` است. این تغییرها محلی‌اند؛ commit، push، اجرای Cypress یا درخواست زندهٔ تازه انجام نشد.

**نتیجه: علت دقیق رد تاریخی UNKNOWN است؛ runner اصلی همچنان صفر PASS / یک FAIL و نتیجهٔ SQ-01 همچنان BLOCKED / NOT EVALUATED است.** ثبت علت‌های guard اصلاح و فقط با ورودی مصنوعی بررسی شد. نتیجهٔ محلی، PASS تست shipping در برنامه نیست. بازگردانی موفق سبد/draft و failure جداگانهٔ assertion ایمنی آخر hook نیز بدون تغییر محفوظ‌اند.

## شواهد تاریخی چه چیزی را ثابت می‌کنند

مراجع: [گزارش اجرای اصلی](EZPOST_QA_SQ01_EXECUTION_2026-11-18.md)، [خلاصهٔ اجرا](../Evidence/SQ01-Live-2026-11-18/chrome-sq18a/execution-summary.json)، [اولین main failure](../Evidence/SQ01-Live-2026-11-18/chrome-sq18a/driver-7656-1795030784901/first-main-failure.json)، [hook failure](../Evidence/SQ01-Live-2026-11-18/chrome-sq18a/driver-7656-1795030784901/first-hook-failure.json)، [restoration مستقل](../Evidence/SQ01-Live-2026-11-18/chrome-sq18a/independent-restoration.json) و [source manifest همان اجرا](../Evidence/SQ01-Live-2026-11-18/chrome-sq18a/source-manifest.json).

| موضوع | نتیجهٔ پشتیبانی‌شده توسط شواهد |
|---|---|
| عملیات ردشده | یک blocked operation ثبت شده؛ نوع دقیق آن ثبت نشده و UNKNOWN می‌ماند. |
| شرط رد | ثبت نشده؛ UNKNOWN. از focus روی street-address نمی‌توان postal-last، mismatch نشانی یا submit را نتیجه گرفت. |
| اولین failure | `2026-11-18T19:42:44.988Z`، خطای `Error` با `errorCode:null`؛ مسیر واقعی `/checkout` و فرم موجود بود. زمان به UTC است. |
| shipping | صفر درخواست shipping از guard عبور کرده، response صفر و retry صفر؛ مقایسهٔ مبلغ و واحد اجرا نشده است. |
| hook | assertion آخر `noForbiddenWriteAttempted` به‌علت `blockedMutations=1` FAIL ماند؛ این به‌تنهایی نوع عملیات ردشده را مشخص نمی‌کند. |
| بازگردانی | Remove قلم proven-owned، هویت session و `/me` پس از حذف و baseline سبد/draft تأیید شدند؛ بررسی مستقل سه GET همان نتیجه را تأیید کرد. label خام `removing-owned` بازنویسی نشده است. |
| تشخیص باگ | این شواهد علت خرابی provider، قیمت، نشانی یا خود برنامه را ثابت نمی‌کنند. |

source تاریخی با شناسهٔ `f0d4e0dd4147527ecc339d69c391eb59fbf3e65f73f3b4f664de5e9e1d64601e` و guard با SHA-256 برابر `84b47604d47de5651ca398c03690f0dab3e23f36a1bf199906e4809f1f959661` مرجع بازسازی‌اند. تغییر diagnostics نمی‌تواند اطلاعات ثبت‌نشدهٔ آن اجرا را بازیابی کند.

## قرارداد و تغییر محدود ابزار

شروع مجازِ مصنوعی: reservation موفق، همان auth sequence عادی، single-writer، Add دقیق و ownership، snapshot تک‌خطی package۶۳ با quantity۲، مقصد منطبق و ویرایش trusted همهٔ فیلدهای خصوصی با postal در آخر، فرم و محصول/تعداد منطبق روی `/checkout`. اقدام: تحویل request دقیق به middleware واقعی با transport ساختگی. انتظار: فقط درخواست اول اجازهٔ عبور بگیرد و بودجه پیش از response مصرف شود. منبع انتظار، محدودیت صریح یک quote کاربر و guard آرشیوشده است؛ این ترتیب ورود فیلد، محدودیت ابزار است و سیاست محصول محسوب نمی‌شود.

در [support اختصاصی SQ-01](../../cypress/support/shipping-quote.js)، پیش از تغییر phase، throw یا destroy، علت به‌صورت کد ثابت ثبت می‌شود. اولین رخداد در closure حفظ می‌شود و تغییر phase یا failure بعدی cleanup آن را بازنویسی نمی‌کند. journal به ۱۶ رخداد آخر محدود است؛ اولین رخداد جدا می‌ماند و تعداد حذف‌شده‌ها ثبت می‌شود.

[ماژول diagnostics](../../cypress/support/shipping-guard-diagnostics.cjs) فقط این فیلدها را صادر می‌کند: `ordinal`، `reasonCode`، `operation`، `source`، `phase` پیش از شکست، `quoteCount`، `destinationArmed`، `cartSnapshotPresent`، `ownershipEstablished` و `blockedMutation`. فقط enum ثابت، شمارنده و boolean مجازند؛ body، URL خام، پیام exception، هویت/شناسهٔ خصوصی، نشانی و اطلاعات ورود صادر نمی‌شوند. کد ناشناخته به `SHIPPING_UNCLASSIFIED_GUARD_REJECTION` تبدیل می‌شود.

| مسیر رد در guard | کد تشخیصی ثابت |
|---|---|
| مقصد هنوز arm نشده | `SHIPPING_DESTINATION_NOT_ARMED` |
| snapshot سبد آماده نیست | `SHIPPING_CART_SNAPSHOT_MISSING` |
| ownership برای quote برقرار نیست | `SHIPPING_OWNERSHIP_REQUIRED` |
| درخواست shipping دوم، حتی پیش از response اول | `SHIPPING_QUOTE_BUDGET_EXHAUSTED` |
| مرحلهٔ اجرا برای quote آماده نیست | `SHIPPING_PHASE_NOT_READY` |
| آخرین ویرایش خصوصی postal نبوده | `SHIPPING_POSTAL_NOT_LAST` |
| ویرایش trusted همهٔ فیلدهای خصوصی ثبت نشده | `SHIPPING_MANUAL_FIELDS_INCOMPLETE` |
| مسیر checkout یا query نامنطبق | `SHIPPING_CHECKOUT_ROUTE_MISMATCH` |
| body مقصد/گیرنده، فرم یا مجموعهٔ کلیدها منطبق نیست | `SHIPPING_PRIVATE_DESTINATION_MISMATCH` |
| تعداد ردیف summary نامنطبق | `SHIPPING_CART_ROW_COUNT_MISMATCH` |
| محصول summary نامنطبق | `SHIPPING_RENDERED_PRODUCT_MISMATCH` |
| تعداد بستهٔ summary نامنطبق | `SHIPPING_RENDERED_QUANTITY_MISMATCH` |
| آماده‌سازی سبد تک‌خطی/owned انجام نشده | `SHIPPING_REQUIRES_EXACT_SINGLE_LINE_CART`، `SHIPPING_REQUIRES_OWNED_CART` یا کد ثابت oracle مالکیت |
| submit فرم checkout | `SHIPPING_CHECKOUT_SUBMISSION_FORBIDDEN`؛ همچنان `preventDefault` و `stopImmediatePropagation` اعمال می‌شوند. |
| درخواست تغییردهنده به `/api/v1/checkout` | `SHIPPING_CHECKOUT_REQUEST_FORBIDDEN` |
| URL غیرقابل‌تجزیه یا write خارجی | `SHIPPING_REQUEST_URL_INVALID`، `SHIPPING_EXTERNAL_WRITE_FORBIDDEN` |
| OTP-start تکراری در این slice | `SHIPPING_AUTH_RETRY_NOT_PERMITTED` |
| سایر عملیات خارج از محدوده | `AUTH_SCOPE_FORBIDS_NON_AUTH_MUTATION` با category ثابت عملیات |
| Add/Remove، auth، resend یا ownership نامعتبر | کدهای ثابت `CHECKOUT_*` و `AUTH_*` از قراردادهای موجود، با ثبت source و operation؛ fail همچنان منتقل می‌شود. |
| auth response ناموفق | `AUTH_START_RESPONSE_FAILED` یا `AUTH_VERIFY_RESPONSE_FAILED` با `source:response`؛ به‌عنوان blocked mutation شمارش نمی‌شود. |
| reservation تکراری یا خطای filesystem | `SHIPPING_RUN_ALREADY_RESERVED` یا `SHIPPING_RESERVATION_UNAVAILABLE`؛ خطای خام filesystem صادر نمی‌شود. |

[فهرست کدها](../Evidence/SQ01-Guard-Review-2026-11-18/rejection-codebook.json) شامل ۷۷ کد مجاز، از جمله کدهای موروثی و legacy است؛ این عدد تعداد branchهای اجراشده یا rejectionهای واقعی نیست. مسیرهای explicit guard ثبت می‌شوند؛ برای هر assertion معمولی یا exception غیرمنتظرهٔ JavaScript ادعای علت دقیق نداریم.

[observer مستقل](../../scripts/shipping-guard-observer.cjs) در [driver موجود](../../scripts/drive-shipping-visible.cjs) داده را دوباره allowlist می‌کند. در یک اجرای مجاز آینده، `guard-rejections.json` و `first-guard-rejection.json` داخل خروجی اختصاصی همان run ذخیره خواهند شد؛ فایل first فقط یک‌بار نوشته می‌شود. نگهداری اولین رخداد در guard پیش از teardown است؛ ثبت پایدار فایل به اتصال observer و دسترسی خروجی هنگام sampling وابسته است. در این بررسی driver یا مرورگر به اجرا درنیامد.

مجوزها گسترش نیافته‌اند: guard مشترک read-only/auth/checkout، spec، assertionها، timeoutها، fixtureها و dependencyها تغییر نکرده‌اند. postal-last، trusted edits، snapshot/ownership، یک quote شامل automatic trigger، ممنوعیت retry و submit/save/order/payment حفظ شده‌اند. reservation همچنان exclusive `wx`، `retries:0` و `watchForFileChanges:false` است. فایل latch واقعی نه خوانده، نه اجرا، نه پاک و نه reset شد.

## بررسی‌های واقعاً اجراشده، فقط محلی

[خروجی دقیق فرمان‌ها](../Evidence/SQ01-Guard-Review-2026-11-18/local-verification.json) در workspace EZPost ثبت شده است. تمام فرمان‌های زیر exit۰ دارند:

| فرمان | نتیجه و معنای محدود آن |
|---|---|
| `node scripts/check-shipping-guard.cjs` | PASS؛ ۳۰ سناریو، ۱۸۹۴ assertion و ۲۴ مقایسهٔ محدود با guard و dependencyهای آرشیوشده. middleware و listener واقعی با DOM/transport/reservation مصنوعی اجرا شدند. |
| `node scripts/check-shipping-guard-diagnostics.cjs` | PASS؛ ۲۰ بررسی مثبت و ۲۲ منفی دربارهٔ privacy، immutability، retention، serialization و expression/writer واقعی observer با writer ساختگی. |
| `node scripts/check-shipping-quote-contract.cjs` | PASS؛ ۱۶ بررسی مثبت و ۱۴۶ منفی oracle/budget موجود. |
| `node scripts/check-checkout-qa-static.cjs` | PASS؛ syntax۱۵فایل و وجود source referenceهای fixture؛ بدون اجرای browser. |
| `node --check` برای ۸ فایل اختصاصیِ تغییرکرده/جدید | PASS؛ config، support، diagnostics، driver، observer، source hashing و دو checker. مسیر تک‌تک فایل‌ها در JSON فرمان‌هاست. |
| `git diff --check` | PASS؛ بررسی whitespace تغییرهای tracked. فایل‌های جدید جداگانه syntax و بازبینی شده‌اند. |

چالش‌های منفی با انتظار صریح بررسی شدند:

- درخواست اول دقیق مجاز شد؛ پیش از response، count برابر۱ بود و responseSeen همچنان false ماند. callback ساختگی response جدا مرحلهٔ بعدی را فعال کرد.
- درخواست دوم هم هنگام pending و هم پس از response با کد budget رد و transport آن destroy شد؛ count از۱ بیشتر نشد.
- postal/recipient/city نامنطبق، کلید اضافه در body/address، مسیر یا query غلط، فرم غایب، ردیف اضافی/غایب و محصول/تعداد غلط رد شدند. package غلط در Add یا آماده‌سازی سبد نیز اجازهٔ ایجاد readiness نگرفت.
- تغییر product/package/quantity/line در snapshot رد شد. این چالشِ prerequisite داخل QA است؛ body واقعی shipping فقط `{address}` دارد و این بررسی، binding سمت server را ثابت نمی‌کند.
- DOM submit و checkout POST جدا مسدود شدند؛ default و propagation فرم هر دو متوقف شدند. OTP نامنطبق، retry و نبود single-writer/ownership نیز مجوز نگرفتند.
- تغییر کپی status یا failure بعدی در cleanup نتوانست اولین علت را بازنویسی کند؛ canaryهای خصوصی مصنوعی از خروجی حذف ماندند.
- task واقعی config فقط در VM با filesystem ساختگی برای success، latch موجود و خطای mkdir/write آزمایش شد؛ هیچ reservation واقعی اجرا نشد.
- expression و writer واقعی observer با ورودی آلودهٔ مصنوعی بررسی شدند؛ اولین فایل حفظ شد، snapshot بدون رخداد فایل rejection نساخت، snapshot یکسان خروجی تکراری نساخت و خطای writer پنهان نشد.

۲۴ مقایسهٔ permission و بازبینی مستقل diff، برای ورودی‌های انتخاب‌شده relaxation نشان ندادند؛ برابری کامل برای همهٔ ورودی‌ها یا نبود همهٔ false positiveها ثابت نشده است. fake DOM، رفتار مرورگر واقعی، رویداد native، اتصال شبکه یا موفقیت quote زنده را اثبات نمی‌کند.

## حفظ تاریخچه و نقطهٔ توقف

[manifest پیش از اصلاح](../Evidence/SQ01-Guard-Review-2026-11-18/historical-manifest.json) و [بررسی SHA-256 پس از اصلاح](../Evidence/SQ01-Guard-Review-2026-11-18/preservation-verification.json) نشان می‌دهند هر۶۰فایل تاریخیِ انتخاب‌شده، شامل evidence، source آرشیوشده و گزارش اجرای SQ-01، byte-for-byte دست‌نخورده‌اند. از۳۹فایل source جاریِ قابل‌مقایسه با اجرای قبلی، فقط چهار مسیر اختصاصیِ موردانتظار تغییر کرده‌اند: support SQ-01، config SQ-01، driver SQ-01 و فهرست source hashing. ماژول‌های diagnostics/observer و دو checker جدید هستند. گزارش اصلی، نتیجه‌های قبلی و source manifest تاریخی بازنویسی نشده‌اند.

در این batch تعداد OTP، cart mutation، shipping quote، اجرای browser و اجرای Cypress همگی صفر است. گزارش فعلی، index و راهنمای ادامه به این بررسی اشاره می‌کنند؛ commit/push انجام نشده است. دو PASS هدفمند قبلی، failureهای تاریخی، `CF-INV01` و `P10-ORD01/02` محفوظ و issueها بازند. صحت تعرفه طبق دستور کاربر مفروض و خارج از scope است.

**اجرای زندهٔ بعدی، فقط اگر جداگانه مجاز شود:** می‌تواند نخستین category/code رد، phase پیش از شکست، وضعیت budget و readiness را بدون اطلاعات خصوصی نشان دهد و rejection اصلی را از rejection بعدی cleanup جدا نگه دارد. این قابلیت، علت تاریخی UNKNOWN را تغییر نمی‌دهد و موفقیت اجرای بعدی را تضمین نمی‌کند. در صورت عبور دقیقاً یک quote تازه، مقایسهٔ UI با `shipping_irr` و `total_irr` و نمایش ریال همچنان همان assertionهای قبلی خواهند بود؛ در این batch اجرا نشده‌اند. latch فعلی reset نشده و این بررسی مجوز تلاش تازه یا مصرف مجدد بودجه نیست. اکنون بدون اقدام زنده متوقف می‌شویم.
