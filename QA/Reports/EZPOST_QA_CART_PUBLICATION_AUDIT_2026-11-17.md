# EZPost — بررسی انتشار عمومیِ افزوده‌های مرحلهٔ سبد

تاریخ: ۱۷ نوامبر ۲۰۲۶. این checkpoint مستقل و خواندنی، candidateهای تازهٔ مرحلهٔ cart را پیش از staging بررسی کرد. هیچ Git mutation، اجرای مرورگر/تست، تغییر برنامه یا دست‌کاری شواهد توسط این بررسی انجام نشد. نتایج runtime و commit/push باید جدا از این گزارش ثبت شوند.

در زمان شمارش، ۵۰ فایل nonignored تازه/تغییریافته، شامل `.gitignore`، کد cart، fixture، scripts، دو سند پوشش/کیس و evidence جدید، مجموعاً حدود ۲۸۰ کیلوبایت بودند. بزرگ‌ترین فایل ۳۴٬۷۳۹ بایت بود. این شمارش مربوط به checkpoint بررسی است؛ فایل‌های debug و خروجی‌های اجرای بعدی در session فعال می‌توانند اضافه یا بزرگ‌تر شوند و پیش از push نیازمند بازبینی فهرست staged هستند.

| حوزهٔ بررسی | شاهد و نتیجه | محدودیت/اقدام انتشار |
|---|---|---|
| مرز پروژه | تمام candidateهای خوانده‌شده زیر Desktop EZPost بودند؛ فهرست از `git ls-files --others --exclude-standard` و وضعیت تغییرات همین repo گرفته شد | فایل‌های unrelated یا parent repository وارد این بررسی/تغییر نشدند |
| credential/session | جست‌وجوی candidateهای متنی برای کلید خصوصی، tokenهای رایج، JWT، credential assignment، cookie/auth header و email؛ مقدار credential یا session واقعی پیدا نشد | نبودِ match تضمین نبودِ هر نوع secret نیست؛ خروجی‌های تازه باید دوباره بررسی شوند |
| network evidence | discovery فقط method/path/status و inputهای محدود محصول/بسته/quantity را ثبت می‌کند؛ `auth/session` نام route است؛ `initial-empty.json` فقط guestConfirmed/empty را ثبت می‌کند | cookie/header/auth state یا response body حساب شخصی منتشر نشود |
| debug log | match مربوط به `socketIoCookie: '__socket'` در log startup-retry، نام گزینهٔ Cypress است، نه مقدار session cookie؛ `env` و `expose` ثبت‌شده خالی بودند | اگر debug log بعداً دادهٔ احراز هویت واقعی گرفت، اصل خصوصی بماند و فقط نسخهٔ sanitizeشده منتشر شود |
| runtime/profile | دو الگوی دقیق `.gitignore` برای `Cart-2026-11-17/discovery/runtime/` و `Cart-Cypress/2026-11-17/*/runtime/` بررسی شدند؛ `git check-ignore` هر دو نمونه را ignored شناخت | browser profile، cache و allowlist runtime محلی بمانند؛ QA/Evidence یا JSON/Markdown به‌طور کلی ignore نشده‌اند |
| مسیر Windows | metadata و ابزارهای آرشیوی QA شامل path محلی هستند؛ attribute موجود `filter=ezpost-public` برای JSON/CJS/Markdown نمونه‌ها برقرار است و clean filter مسیر account را به `LOCAL_USER` تبدیل می‌کند | اصل working-tree محلی حفظ می‌شود؛ کد اجرایی `cypress/` و root scripts از این filter عبور نمی‌کنند و در بررسی حاضر path شخصی hardcoded نداشتند |
| تصویر | سه PNG موجود در checkpoint با مشاهدهٔ تصویر بررسی شدند: probe سفید، guest storefront cart در loading، و Cypress در Initializing config | تصویر شخصی، account information یا desktop unrelated دیده نشد؛ loading screenshot سند اجرای موفق یا populated oracle نیست |
| حجم و binary | فایل‌های candidate کوچک‌اند؛ binary تازه فقط PNGهای evidence بررسی‌شده بود | node_modules، Cypress/browser binaries، profile/cache و nested Git metadata در candidate list نبودند |
| نتیجه‌های تاریخی | outcome قدیمی، failure یا assertion تغییر نکرد | sanitize نباید failure را success کند یا scope/execution claim را عوض کند |

در این checkpoint exclusion تازه‌ای افزون بر runtime/profileهای دقیق لازم نشد. قبل از commit نهایی باید staged file list، staged diff، اندازهٔ فایل‌ها، پاک‌بودن header/session fields و تصاویر تازهٔ runner بازبینی و `git diff --check` انجام شود. این سند اجازهٔ ضمنی برای انتشار دادهٔ خصوصیِ احتمالیِ خروجی‌های آینده نیست.

## بازبینی افزوده پس از اجرای visible — batch انتقال

در 15:40 UTC همان روز، candidateهای فعلی دوباره به‌طور کامل خوانده و اسکن شدند؛ `git diff --check` موفق بود. checkpoint این بار ۱۰۰ فایل و حدود ۲٫۸۱ مگابایت داشت؛ خروجی نهایی Firefox هم‌زمان به فهرست اضافه شد، بنابراین عدد فایل و بایت پیش از staging باید از فهرست نهایی گرفته شود. بزرگ‌ترین فایل ثبت‌شده در شمارش ۳۷۳٬۸۲۰ بایت بود و large-file مانعی دیده نشد. گزارش خودش و فایل‌های run فعال جزو داده‌های در حال رشد هستند.

شمارش تکمیلی در `2026-11-17T15:41:09Z`، پیش از افزودن متن همین checkpoint، **۱۰۴ candidate، ۳٬۱۴۷٬۳۲۹ بایت و ۱۶ PNG** ثبت کرد. final result هر دو Chrome و Firefox موجود بود؛ هر کدام ۴ تست، ۴ pass، صفر fail و صفر pending را با `isInteractive=true` ثبت کرده بودند. initial resultهای مخالف نیز در پوشه‌های مستقل باقی ماندند.

۱۶ PNG در contact sheet خصوصیِ ignored زیر `.publication/cart-audit/handoff-contact.png` به‌صورت بصری بررسی شدند. اصل هیچ تصویری ویرایش نشد. تصاویر بررسی‌شده دقیقاً این گروه‌ها بودند:

- discovery: `after-first-add.png` و `output-root-probe.png`.
- `handoff-chrome-initial`: تصویر `initializing.png`.
- `handoff-chrome-startup-retry`: before، failure و final runner.
- `handoff-chrome-cleanup-retry`: before و failure runner.
- `handoff-chrome-correlated-final`: before و final runner.
- `handoff-firefox-initial`: before، دو failure و final runner.
- `handoff-firefox-correlated-final`: before و final runner.

تصاویر، پنجرهٔ runner/Cypress یا storefront مهمان را نشان می‌دادند؛ هیچ حساب شخصی، credential، cookie/token value، OTP، فرم اطلاعات مشتری یا بخش unrelated از desktop مشاهده نشد. خطاهای اولیهٔ hook cleanup، queue همبستگی quote و بارگذاری صفحه در evidence حفظ‌اند؛ این audit آنها را حذف، سبز یا application defect تلقی نکرد.

اسکن مجدد متن‌های candidate و diagnostics/results مقدار credential، JWT، token یا email شخصی پیدا نکرد. matchهای credential-shaped همچنان همان نام تنظیم `socketIoCookie` در debug log و نقلِ توضیحی آن در این گزارش بودند. شبکهٔ ثبت‌شده method/path/status و package/quantity مربوط به quote دارد؛ پاسخ private account یا header/session value در این candidateها دیده نشد. مسیر account محلی در stack/metadata همچنان از clean filter موجود برای نسخهٔ public می‌گذرد و اصل خصوصی working tree حفظ می‌شود.

دو نتیجهٔ final Chrome/Firefox به‌عنوان outcome واقعیِ batch باید به گزارش اجرای والد ارجاع داده شوند؛ auditِ انتشار ادعای پوشش یا pass جدید ایجاد نمی‌کند. بازبینی نهایی staged file list و filtered diff توسط ناشر پس از پایان نوشتن گزارش‌ها لازم است. هیچ exclusion اضافه‌ای برای این snapshot لازم نشد و تمام runtime/profile/cacheها باید ignored بمانند.
