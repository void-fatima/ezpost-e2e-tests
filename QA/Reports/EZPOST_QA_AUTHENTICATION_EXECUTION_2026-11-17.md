# احراز هویت EZPost — پوشش عمومی اجراشده و پیش‌نیاز ورود واقعی

تاریخ: ۱۷ نوامبر ۲۰۲۶. Workspace مستقل EZPost؛ branch: `test/authentication-flow`؛ baseline و main دریافت‌شده: `da9d8ddd21e4c90993796529cc1b06276febbe66`. مخزن: `https://github.com/void-fatima/ezpost-e2e-tests`. AGENTS.md قابل‌اعمالی در پروژه/اجداد پیدا نشد؛ baseline پاک و remote اصلی تأیید شد. هیچ فایل Tapin/Python یا dependency تغییر نکرد.

**نتیجهٔ واقعی:** ۹ تست عمومیِ بدون submit در Chrome و همان ۹ تست در Firefox نمایان PASS شدند؛ مجموع۱۸ PASS و صفر FAIL/pending/skipped/not-run. این‌ها native validation و رسیدن از محصول/سبد به فرم login هستند. **ورود واقعی، setup دستی و assertion هویت پس از ورود اجرا نشدند.** هدف ordinary-user authentication هنوز تکمیل نشده است.

## ۱. مجوز فعلی و علت توقف پیش از OTP

کاربر شمارهٔ تحت کنترل خود و دریافت SMS برای همان شماره را مجاز کرد و خواست شماره/OTP را مستقیماً در Cypress وارد کند. سپس در پاسخ به سؤال مشخص دربارهٔ حساب موجود گفت: **«موجودبودن حساب را تأیید نمی‌کنم».** شماره یا کانال SMS مفقود نیست؛ پیش‌نیاز غایب، حساب عادیِ موجود و قابل تأیید است.

درخواست اصلی ایجاد حساب را فقط با مجوز صریح، هویت اختصاصی و روش reset مجاز می‌داند. UI فعلی «ورود یا ثبت نام» مشترک است؛ شواهد خواندنی ثابت نمی‌کنند که درخواست challenge یا verify برای شمارهٔ ناشناخته هیچ حسابی ایجاد نمی‌کند. بنابراین هیچ auth POST، OTP، resend یا verify برای اجرا مجاز/فعال نشد. ابزار مقدار شماره یا OTP را نخواند یا ثبت نکرد. همین پاسخ مجوز ساخت حساب تازه تلقی نشد. دو تلاش UI پس از پایان تست‌ها که محافظ مسدود کرد، جداگانه در بند بعد ثبت شده‌اند؛ «صفر اجرای احراز هویت» به معنی نبود این تلاش‌های مسدودشده نیست.

| نوع فعالیت | وضعیت فعلی |
|---|---|
| public/native و account-link browser tests | اجراشده؛ ۱۸ PASS محدود به قراردادهای زیر |
| manual-assisted login setup | **۰ اجرا؛ متوقف پیش از ارسال** |
| درخواست challenge یا verification واقعی | **۰ اجرا** |
| assertion خودکار ordinary identity، post-login return و cart merge | **۰ اجرا؛ پیش‌نیاز فراهم نیست** |
| controlled/mock authentication | **۰ اجرا؛ هیچ موفقیت ساختگی پیاده‌سازی نشد** |
| registration/customer/address/order/payment | اجرا نشد؛ خارج مجوز فعلی |

فرم ورود در آخرین runner واقعی باز گذاشته شده است؛ این به معنی آماده‌بودن مجوز ارسال OTP نیست. محافظ درخواست‌های تغییر‌دهنده فعال است. بازشدن برنامه، بارگذاری spec و تکمیل تست‌ها جدا ثبت شده‌اند.

**رویداد پس از تکمیل تست‌ها:** [کنترل نهایی runner](../Evidence/Auth-2026-11-17/final-visible-state.json) دو تلاش UI برای `POST /api/v1/auth/otp/start` در `17:20:30.589` و `17:20:31.902 UTC` ثبت می‌کند؛ هر دو پس از پایان آخرین تست در `17:19:31.830` بوده‌اند. محافظ موجود خطای منع mutation ایجاد کرده و هر دو request در وضعیت `Errored` و بدون response مانده‌اند. این‌ها اجرای testcase، challenge موفق، ارسال SMS تأییدشده یا setup دستی نیستند و نتایج ذخیره‌شدهٔ ۱۸ تست را تغییر نمی‌دهند. مقدار input یا body خوانده/ذخیره نشد؛ دیگر ادعا نمی‌شود فرم فعلی خالی است. کنترل نهایی همچنان Firefox نمایان، runner متوقف و نتیجهٔ دو تست آخر را ۲PASS/۰FAIL نشان می‌دهد. تا رفع پیش‌نیاز حساب موجود، فرم نباید submit شود.

## ۲. شواهد جاری، بدون تبدیل مشاهده به policy

[public-dom.json](../Evidence/Auth-2026-11-17/entry-inspection/public-dom.json) از مرورگر اختصاصیِ مهمان و read-only، مسیرهای `/login`، `/products/simple` و `/cart` را ثبت کرده است. header desktop روی محصول و cart یک لینک با `aria-label="حساب کاربری"` و `href="/login"` دارد. فرم فعلی همان `[data-cy="login-form"]` و `#mobile` با label متصل، heading login و attrs native موجود است. مقدار/placeholder شماره ذخیره نشده؛ فقط خالی‌بودن و وجود placeholder ثبت شده است. cart اولیه خالی و session واقعی `user:null` بود.

[client-route-literals.json](../Evidence/Auth-2026-11-17/route-inspection/client-route-literals.json) مسیرهای `/api/v1/auth/otp/start`، `/api/v1/auth/otp/verify`، `/api/v1/auth/session`، `/api/v1/auth/me` و `/api/v1/auth/logout` را در module عمومیِ تحویل‌شده به همان مرورگر یافته است. این **شاهد wiring سمت client است، نه اجرای endpoint یا تصویب lifecycle/backend policy**. هیچ‌یک از auth POSTها به allowlist اضافه نشدند. OTP screen، ordinary session schema و logout UI با ورود واقعی مشاهده نشدند.

مقصد `/login` در تست‌های تازه، baseline لینک صریح account است؛ این تست‌ها Next/Previous، empty-cart eligibility، پس از ورود `next`، fallback یا cart retention/merge را تأیید نمی‌کنند. normalization، TTL، cooldown، attempts و متن خطای تجاری از implementation فرض نشده‌اند.

## ۳. کد و قراردادهای پیاده‌شده

فایل `cypress.auth.config.cjs` فقط دو spec عمومی را با support جدا انتخاب می‌کند. `cypress/support/authentication.js` محافظ **بدون تغییر** `e2e.js` را استفاده می‌کند؛ هیچ auth mutation مجاز نیست. محافظ POST اختصاصی در auth-entry قبلی نیز حفظ شده است. screenshot/video خاموش‌اند؛ stdout/stderr خام Cypress فقط در `runtime/` خصوصی و ignored ذخیره می‌شود.

`cypress/support/authentication-helpers.js` پیش از visit، session GET واقعی را intercept می‌کند و قبل از تعامل، `200` و `user:null` را به‌صورت boolean بررسی می‌کند. نمایش SSR فرم به‌تنهایی readiness فرض نمی‌شود. برای کنترل guest بعد از کلیک لینک از GET واقعیِ مشاهده‌شده استفاده می‌شود؛ هیچ response یا identity جعل نشده است. خطاها فقط boolean دارند و session body/identity چاپ نمی‌شود.

در `cypress/e2e/ordering/browser/auth-entry.cy.js` فقط چهار محل setup از visit مستقیم به `visitGuest` تغییر کرده‌اند. **تمام assertionهای اصلی، IDها، دو viewport و منع auth POST حفظ شده‌اند.** checker جدید، بازگرداندن صرف همین تغییرات setup را با bytes baseline مقایسه و حفظ بقیهٔ کد را تأیید می‌کند. هیچ timeout یا expectation برای گرفتن PASS تغییر نکرد.

دو تست تازه در `cypress/e2e/authentication/shopping-entry.cy.js` نوشته شدند. [cases و نگاشت کامل](../Test-Cases/EZPOST_QA_AUTHENTICATION_TEST_CASES.md) پیش‌شرط، اقدام، انتظار، منبع و خطای قابل رد هر slice را مشخص می‌کند.

| ID / mapping محفوظ | پوشش واقعاً اجراشده | Chrome | Firefox | رفتار غلطی که باید fail شود |
|---|---|---|---|---|
| A01-ORD01 → AUTH-01/A01/QUALITY-01 | فرم/heading/label و attrs native؛ desktop و narrow | ۲PASS | ۲PASS | کنترل یا label اشتباه، نبود required/pattern/length و فرم نادرست |
| A01-ORD02 → AUTH-01/A01 | empty/invalid/length و clear بدون submit؛ دو viewport | ۲PASS | ۲PASS | validity یا مقدار native خلاف baseline و ارسال ناخواسته |
| A01-ORD04 → AUTH-01/A01 | invalid→format-native-valid→invalid→empty؛ دو viewport | ۲PASS | ۲PASS | correction بی‌اثر یا validity transition نادرست؛ format-valid به معنی حساب معتبر نیست |
| A01-ORD03 → AUTH-01/A01/U05 | Tab از field به submit، بدون فعال‌سازی | ۱PASS | ۱PASS | focus کنترل دیگر یا درخواست auth ناخواسته |
| AUTH-ENTRY01 → AUTH-01/AUTH-07؛ A01/A09، guest half | Simple واقعی→لینک صریح header→فرم صحیحِ خالی→guest؛ desktop | ۱PASS | ۱PASS | لینک اشتباه/بی‌اثر، مقصد یا فرم غلط، session غیرمهمان |
| AUTH-ENTRY02 → AUTH-01/AUTH-07؛ reference GATE-01/T07 | cart واقعاً خالی→account link→فرم صحیحِ خالی→guest؛ desktop | ۱PASS | ۱PASS | precondition خالی برقرار نباشد، کلیک Next جای account، فرم/مقصد غلط |

دو entry تازه فقط desktop هستند؛ narrow فعلی از هفت native test پوشش محدود دارد و narrow shopping-entry یا post-login را ادعا نمی‌کند. ۳۰ ID اصلی M01، هشت ID سبد و mappingهای ordering حذف یا renumber نشدند.

## ۴. اجرای نمایان روی یک نسخهٔ ثابت

Cypress محلی **16.2.1**، Chrome **157.0.8103.78**، Firefox **160.0**. launcher از همین پروژه `cypress open --e2e --browser … --config-file cypress.auth.config.cjs` را اجرا کرد. هیچ headless substitute یا نصب/ارتقای dependency انجام نشد.

```powershell
node scripts/open-authentication.cjs chrome final-01
node QA/Evidence/Auth-2026-11-17/tools/drive-chrome.cjs <absolute-Chrome-run-directory> 58183 22272
node scripts/open-authentication.cjs firefox final-01
node QA/Evidence/Auth-2026-11-17/tools/drive-firefox.cjs <absolute-Firefox-run-directory> 6000 19556
```

۲۳ فایل executable/config/support/fixture/launcher پیش از اجرای هر مرورگر freeze و قبل/بعد هر spec بررسی شدند؛ هیچ‌کدام در فاصلهٔ دو مرورگر تغییر نکردند. [manifest Chrome](../Evidence/Auth-2026-11-17/chrome-final-01/source-manifest.json) و [manifest Firefox](../Evidence/Auth-2026-11-17/firefox-final-01/source-manifest.json):

```text
SHA-256 source ID:
57c400d6aacd060fdf37e83107e30fdeb0382993c6a3acd1615dc4af00a292bd
```

baseline SHA به‌تنهایی نسخهٔ اجرا نیست، چون کد تازه هنگام freeze هنوز commit نشده بود؛ manifest bytes دقیق را ثبت می‌کند. ابزارهای observation خارج از source ID هستند و outcome را تغییر نمی‌دهند.

| مرورگر / spec | بازهٔ UTC | PASS | FAIL | pending | skipped | not-run |
|---|---|---:|---:|---:|---:|---:|
| Chrome / auth-entry | 17:16:33–17:16:47 | ۷ | ۰ | ۰ | ۰ | ۰ |
| Chrome / shopping-entry | 17:16:48–17:16:53 | ۲ | ۰ | ۰ | ۰ | ۰ |
| Firefox / auth-entry | 17:19:10–17:19:25 | ۷ | ۰ | ۰ | ۰ | ۰ |
| Firefox / shopping-entry | 17:19:27–17:19:31 | ۲ | ۰ | ۰ | ۰ | ۰ |
| کل live read-only | ۶ ID، ۹ تست در هر مرورگر | **۱۸** | **۰** | **۰** | **۰** | **۰** |

برای هر مرورگر، پنجرهٔ اختصاصی با `IsWindowVisible`، runner document و حالت interactive تأیید شد. loaded.json هر spec بارگذاری را ثبت می‌کند؛ نتیجهٔ نهایی فقط پس از Mocha `stats.end` و توقف runner نوشته شده است. Chrome پس از ثبت نتیجه برای تعویض مرورگر بسته شد؛ Cypress/Firefox نهایی باز ماندند. هیچ دخالتی در مرورگر شخصی انجام نشد.

شواهد نتیجه، بدون تصویر/شماره/session:

- [Chrome auth-entry](../Evidence/Auth-2026-11-17/chrome-final-01/driver-15872-1794935789525/auth-entry-results.json) و [Chrome shopping-entry](../Evidence/Auth-2026-11-17/chrome-final-01/driver-15872-1794935789525/shopping-entry-results.json)
- [Firefox auth-entry](../Evidence/Auth-2026-11-17/firefox-final-01/driver-21672-1794935947028/auth-entry-results.json) و [Firefox shopping-entry](../Evidence/Auth-2026-11-17/firefox-final-01/driver-21672-1794935947028/shopping-entry-results.json)
- [تطبیق counts/IDs/source](../Evidence/Auth-2026-11-17/execution-verification.json)

هیچ test failure یا rerun جدید مرورگری در این batch رخ نداد؛ دو خطای guard پس از completion جدا ثبت شده‌اند. نتایج تاریخی سبد، failure قدیمی CART-E01 و defectهای **P10 باز و بدون rerun** حفظ شدند. نتیجهٔ فعلی را با اجرای تاریخی یا pricing مستقل جمع نمی‌کنیم.

## ۵. correctness، static و privacy

[بازبینی مستقل assertionها](../Evidence/Auth-2026-11-17/assertion-review.md) پرسش «آیا رفتار خراب می‌تواند هنوز پاس شود؟» را برای هر subset بررسی کرده است. معیار فقط وجود element/HTTP200 نیست؛ کنترل یکتا، href، کلیک واقعی، route، فرم صحیح، مقدار خالی و guest با هم بررسی می‌شوند. این‌ها هویت ordinary، backend OTP یا return/cart policy را اثبات نمی‌کنند. هیچ placeholder test، skip پنهان، mock success، forced interaction، sleep عددی یا suppression خطا اضافه نشد.

[static-checks.json](../Evidence/Auth-2026-11-17/static-checks.json): checker اختصاصی auth روی۱۳ فایل، حفظ assertionهای قبلی/guard/cart/config/dependencies و syntax؛ سپس checker موجود M01 با حفظ۳۰ ID، همگی موفق. بررسی اولیهٔ static یک literal import داخل checker تازه را اشتباهاً import واقعی پنداشت؛ فقط همان checker تازه با regex اصلاح شد و [شکست اولیه](../Evidence/Auth-2026-11-17/static-initial-failure.json) حفظ است. این مشکل ابزار بود، نه defect برنامه؛ executable source مرورگر پس از freeze تغییر نکرد. `git diff --check` و `git diff --cached --check` موفق بودند. ۴۹ فایل staged، شامل۳۱ JSON، برای انتشار بررسی شدند؛ هیچ runtime/private path یا تطبیق high-confidence secret در آن‌ها پیدا نشد و bytes هر۲۳ فایل source در index با manifest اجرا یکسان بود. این اسکن جای بازبینی انسانی metadata را نمی‌گیرد. checker hashنویس تاریخی اجرا نشد.

هیچ شمارهٔ واقعی، OTP، cookie، token، session body یا screenshot ذخیره/منتشر نشد. public observer فقط عنوان/وضعیت تست و خطای سانیتایزشده را ثبت می‌کند؛ در صورت failure، pathname، طول/خالی‌بودن input، validityهای boolean و وجود auth POST را بدون مقدار field/body نگه می‌دارد. screenshot/video به‌طور کامل خاموش‌اند. raw process log و runtime/profile تحت ignore دقیق خصوصی باقی می‌مانند؛ clean filter موجود فقط metadata را سانیتایز می‌کند و نسخه‌های محلی حفظ می‌شوند.

هیچ cart item، account، customer/profile/address یا order در این stage تغییر نکرد؛ cleanup دادهٔ برنامه لازم نشد. یک مرورگر diagnostic اختصاصیِ باقی‌مانده از task قبلی پنج رویداد background به فایل تاریخی خود افزوده بود؛ نسخهٔ تازه خصوصی نگهداری، prefix قدیمی با bytes baseline تطبیق و دقیقاً حفظ، و همان پنجرهٔ قدیمی بسته شد. این رویدادها جزو نتایج auth نیستند؛ [یادداشت حفظ تاریخچه](../Evidence/Auth-2026-11-17/previous-run-background.json).

## ۶. تصمیم‌های واقعاً باقی‌مانده و قدم بعد

پیش‌نیاز شروع ورود واقعی، **یک حساب عادیِ موجود و قابل تأیید برای همان ورود دستی** است. اگر قرار است حساب تازه ساخته شود، مجوز ایجاد یک هویت اختصاصی و روش پشتیبانی‌شدهٔ reset جدا لازم است. پاسخ فعلی کاربر هیچ‌یک را فراهم نمی‌کند؛ سؤال عمومیِ تکراری دربارهٔ شماره/کانال لازم نیست.

پس از رفع همین وابستگی، درخواست‌ها و schema واقعی identity/session باید از UI مشروع کشف و allowlist دقیق همان slice بازبینی شود. ورود دستی manual-assisted ثبت می‌شود؛ فقط post-checkهای واقعاً اجراشده می‌توانند automated PASS داشته باشند. منبع مستقل identity شمارهٔ واردشدهٔ خود کاربر در حافظهٔ خصوصی خواهد بود، نه API در برابر خودش؛ هرگز مقدار آن به evidence/Git نمی‌رود.

برای تکمیل sliceهای بعدی، قواعد دقیق `next`/fallback و eligibility؛ وضعیت اولیهٔ cart حساب و retention/merge/cleanup؛ و فقط برای negative OTP، lifecycle/TTL/attempt/cooldown و fixture امن لازم‌اند. هیچ‌کدام از رفتار فعلی به‌عنوان معیار مصوب استخراج نشدند. بدون ورود مشروع، customer/address page نیز با حساب واقعی inspection نشد؛ مرز ذخیرهٔ profile/address و ایجاد order پیش از task بعد باید روشن شود. مرحلهٔ فعلی سفارش یا پرداخت E2E کامل نیست.
