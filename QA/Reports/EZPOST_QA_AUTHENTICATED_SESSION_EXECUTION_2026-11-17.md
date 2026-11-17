# EZPost — ورود واقعی با کمک کاربر و بررسی خودکار نشست عادی

تاریخ: ۱۷ نوامبر ۲۰۲۶، `America/Los_Angeles`. Workspace: Desktop EZPost؛ مخزن `https://github.com/void-fatima/ezpost-e2e-tests`؛ شاخهٔ این batch: `test/authenticated-session`. baseline دریافت‌شده و محفوظ: `1cbea9d94cab1a48c62b95aa69e3b2f3f2ff0977`. دستور AGENTS.md قابل‌اعمالی در workspace یا اجداد یافت نشد. Git identity فقط در همین repository، `void fatima <vantafatima@gmail.com>` است.

**نتیجهٔ واقعی:** `AUTH-SESSION01` در Chrome و سپس Firefox نمایان، هرکدام **۱PASS و صفر FAIL/pending/skipped/not-run** داشت. در هر مرورگر، کاربر شماره و OTP را مستقیم وارد کرد؛ سپس assertionهای واقعی هویت عادی، رابط حساب، reload و حفظ سبد خودکار اجرا شدند. این **دو setup از نوع MANUAL-ASSISTED** هستند؛ تعداد تست OTP کاملاً خودکار و controlled/mock authentication هر دو صفر است. نُه تست عمومی batch قبلی جایگزین این کار نشدند و در این batch دوباره اجرا نشدند.

## مجوز و نتیجهٔ ورود در برابر ایجاد حساب

مجوز تازهٔ کاربر، ساخت حساب عادی برای همان شماره از مسیر طبیعی OTP و نگه‌داشتن حساب را نیز شامل شد و محدودیت existing-only را برای این batch جایگزین کرد. ایجاد حساب دوباره سؤال نشد. هویت دیگر، admin، profile/customer/address submit، cart write، سفارش و پرداخت مجاز نشدند.

در هر مرورگر دقیقاً یک `POST /api/v1/auth/otp/start` و یک `POST /api/v1/auth/otp/verify` واقعی با ورودی مستقیم کاربر ثبت شد. هویت session و me با شمارهٔ submitشدهٔ همان مرورگر، فقط در حافظه، تطبیق یافت؛ role هر دو `customer` و badge واقعی UI «مشتری» بود. این‌ها ورود موفق عادی را ثابت می‌کنند، نه صرف HTTP200 یا تغییر URL.

**ایجاد حساب جدید در برابر ورود حساب قبلی از شواهد این batch تفکیک نشد.** در قرارداد مصرف‌شدهٔ frontend و پاسخ verify بررسی‌شده، discriminator قابل‌اتکای ایجاد حساب احراز نشد؛ بنابراین نه «حتماً حساب جدید ساخته شد» و نه «حتماً حساب از قبل موجود بود» ادعا می‌شود. مسیر ورود/ایجاد مجاز با موفقیت به حساب عادی رسیده و حساب طبق خواست کاربر باقی مانده است. شماره یا شناسهٔ حساب در artifact عمومی ذخیره نشده و برابری شناسهٔ دو مرورگر جداگانه ادعا نمی‌شود؛ anchor هرکدام ورودی مستقیم کاربر در همان مرورگر بوده است.

## قرارداد اجرا و محدودیت guard

[سند کیس‌ها](../Test-Cases/EZPOST_QA_AUTHENTICATED_SESSION_TEST_CASES.md) پیش‌شرط، action، oracle مستقل، خطای قابل رد و traceability را ثبت می‌کند. یک journey اجرایی داریم؛ `AS-*` checkpoint هستند و test اضافی شمرده نمی‌شوند. ۳۰ ID اصلی M01 و inventory قبلی ordering/cart/auth بدون حذف یا renumber حفظ شدند.

پیش از handoff، session واقعی مهمان، DOM سبد خالی و خالی‌بودن منبع واقعی guest sync در کلید `ezpost_guest_cart_v1` بررسی شد. storage فقط خوانده شد؛ چیزی پاک یا inject نشد. خالی‌بودن منبع پیش از start و verify دوباره کنترل شد تا sync عادیِ login هیچ cart-item یا artwork write نسازد.

فایل جدید `cypress.authenticated.config.cjs` فقط spec همین مرحله و support جدا را انتخاب می‌کند. guard عمومی `cypress/support/e2e.js`، تنظیمات و support خواندنی قبلی، specs سبد و وابستگی‌ها عوض نشدند. guard جدید فقط دو POST دقیق OTP با کلیدهای مشاهده‌شدهٔ `{mobile}` و `{mobile,code}` را اضافه می‌کند و DOM ورودی را با payload همان action correlate می‌کند. هر مرورگر حداکثر یک start و یک verify دارد؛ این cap ابزار اجراست، نه ادعای سیاست retry اپ. استثنای موجود quote محصول، read-only و مطابق guard قبلی است؛ مجوز cart mutation نیست. تمام cart/shipping/customer/profile/order/payment/logout writes بسته ماندند؛ شمارندهٔ mutation غیرمجاز در هر دو اجرای نهایی صفر بود.

اشتراک runtime بین bundleهای support و spec فقط یک handle خصوصی در Cypress است؛ state موفق در AUT، cookie یا session تزریق نشد. شماره و OTP فقط برای correlation ضروری در حافظهٔ خصوصی مرورگر استفاده شدند. خروجی‌های عمومی صرفاً boolean، شمارش، مسیرهای ازپیش‌بررسی‌شده و metadata نسخه/پنجره هستند.

## اجراهای واقعی روی یک نسخهٔ ثابت

Cypress محلی **16.2.1**؛ Chrome **157.0.8103.78**؛ Firefox **160.0**. هر دو با `cypress open --e2e` و مرورگر واقعی Windows اجرا شدند؛ headless جایگزین نشد. دیالوگ اولیهٔ خود Cypress با Continue بسته شد و spec در UI واقعی انتخاب شد. بازشدن application، بارگذاری spec و تکمیل تست در artifactهای جدا ثبت شدند.

```powershell
node scripts/open-authenticated-session.cjs chrome ready-01
node QA/Evidence/Authenticated-Session-2026-11-17/tools/drive-chrome.cjs <Chrome-run-directory> 49428 5276
node scripts/open-authenticated-session.cjs firefox ready-01
node QA/Evidence/Authenticated-Session-2026-11-17/tools/drive-firefox.cjs <Firefox-run-directory> 6000 6492
```

| مرورگر / spec | زمان محلی PST؛ معادل UTC در artifact | PASS | FAIL | pending | skipped | not-run | setup دستی |
|---|---|---:|---:|---:|---:|---:|---:|
| Chrome / `authenticated-session.cy.js` | ۱۰:۲۳:۱۶–۱۰:۲۶:۰۹؛ 18:23:16–18:26:09 UTC | ۱ | ۰ | ۰ | ۰ | ۰ | ۱ |
| Firefox / همان spec | ۱۰:۲۹:۱۲–۱۰:۲۹:۵۹؛ 18:29:12–18:29:59 UTC | ۱ | ۰ | ۰ | ۰ | ۰ | ۱ |
| مجموع journeyهای اجراشده | زمان‌ها شامل انتظار ورود انسان‌اند؛ metric سرعت اپ نیستند | **۲** | **۰** | **۰** | **۰** | **۰** | **۲** |

۲۵ فایل spec/support/fixture/config/package/launcher پیش از هر مرورگر freeze و پس از اجرا بررسی شدند؛ bytes آن‌ها در فاصلهٔ دو مرورگر عوض نشد. شناسهٔ source مشترک:

```text
9270bd409dab815c22529844783b498896497307cf1996afaa66743cb3823d5b
```

شواهد اصلی:

- [نتیجهٔ Chrome](../Evidence/Authenticated-Session-2026-11-17/chrome-ready-01/driver-17268-1794939791970/authenticated-session-results.json) و [progress همان اجرا](../Evidence/Authenticated-Session-2026-11-17/chrome-ready-01/driver-17268-1794939791970/progress.json)
- [نتیجهٔ Firefox](../Evidence/Authenticated-Session-2026-11-17/firefox-ready-01/driver-19700-1794940149599/authenticated-session-results.json) و [progress همان اجرا](../Evidence/Authenticated-Session-2026-11-17/firefox-ready-01/driver-19700-1794940149599/progress.json)
- [manifest Chrome](../Evidence/Authenticated-Session-2026-11-17/chrome-ready-01/source-manifest.json)، [manifest Firefox](../Evidence/Authenticated-Session-2026-11-17/firefox-ready-01/source-manifest.json) و [تطبیق نهایی نتایج/source](../Evidence/Authenticated-Session-2026-11-17/execution-verification.json)

launch اولیهٔ Chrome پیش از انتخاب spec فقط application/browser را باز کرده بود؛ قبل از اجرای تست، اشتراک bundleهای support/spec اصلاح شد و launch تازهٔ ready-01 نسخهٔ نهایی را freeze کرد. [launch اولیهٔ اجرا‌نشده](../Evidence/Authenticated-Session-2026-11-17/chrome-initial-01/launch-not-executed.json) و manifest آن حفظ شدند. آن launch تست failed/skipped/not-run شمرده نمی‌شود، چون spec اصلاً انتخاب نشد. هیچ failure یا rerun تست مرورگری در دو اجرای نهایی رخ نداد.

## پوشش assertion و observation

| checkpoint | آنچه واقعاً بررسی شد | نتیجه و مرز |
|---|---|---|
| AS-SETUP01 | ورودی مستقیم انسان؛ requestها با همان inputها correlate شدند؛ یک start و verify | دو setup موفق MANUAL-ASSISTED؛ automated OTP PASS نیست |
| AS-IDENTITY01 / AS-ROLE01 | session دارای ID مثبت و امن، شماره برابر anchor مستقل و role دقیق customer؛ me مستقیم با همان anchor و role | assertionهای خودکار در هر دو PASS؛ `/me.id` به‌دلیل اثبات‌نشدن قراردادش assertion ندارد |
| AS-UI01 | header account به `/account`، کلیک همان لینک، account-dashboard و شمارهٔ rendered برابر anchor، badge مشتری | PASS در هر دو؛ صفحهٔ غلط، guest، هویت دیگر و نقش privileged با HTTP200 پاس نمی‌شوند |
| AS-RELOAD01 | reload واقعی، session دوباره با همان ID/anchor/role و UI مطابق آن | PASS در هر دو؛ فقط continuity فوری، نه TTL/expiry/restart |
| AS-CART-OBS01 | دریافت واقعی cart، تطبیق تعداد lineهای UI، حفظ هویت و snapshot اقلام قبل/بعد inspection | سبد حساب در هر دو خالی بود؛ snapshot ثابت ماند. صحت مستقل قیمت/محصول/merge یا retention کلی ادعا نمی‌شود |
| AS-CUSTOMER-OBS01 | GET معمول `/checkout` بدون order query و بدون restorationِ address/order، هیچ field entry یا submit | inspection مسیر انجام شد؛ پس از settled UI به `/cart` برگشت، سبد خالی و فرم نشانی مشاهده نشد. فرم مشتری/ثبت اطلاعات PASS نشده است |

مقصد اولیهٔ پس از verify در هر دو `/account` مشاهده شد؛ سپس لینک صریح account جداگانه کلیک و UI آن assert شد. این observation، policy عمومی `next` یا fallback را تصویب نمی‌کند. همچنین test در لحظهٔ دریافت دادهٔ cart، pathname موقت `/checkout` را ثبت کرد؛ بررسیِ جدا پس از پایان بارگذاری، مقصد پایدار `/cart` را تأیید کرد. [مشاهدهٔ نهایی Chrome](../Evidence/Authenticated-Session-2026-11-17/chrome-ready-01/settled-readonly-inspection.json) و [Firefox](../Evidence/Authenticated-Session-2026-11-17/firefox-ready-01/settled-readonly-inspection.json) این تفاوت زمانی را حفظ می‌کنند؛ این probeها Cypress test اضافی نیستند و نبود فرم در یک checkpoint به معنای defect یا eligibility مصوب نیست.

## correctness، static، privacy و حفظ تاریخچه

بررسی دوم کد و ۱۲ negative case مستقل روی oracle خالص نشان دادند wrong identity، نقش admin/print/warehouse/ناشناخته، mobile غایب و ID نامعتبر رد می‌شوند. این markerهای مصنوعی فقط در حافظهٔ checker بودند و به اپ ارسال نشدند؛ controlled authentication یا تست backend محسوب نمی‌شوند. این بازبینی تضمین نبود همهٔ false positiveهای ممکن نیست. در وضعیت واقعی، assertionهای identity، role، UI و reload نیز همگی اجرا شدند؛ branch مربوط به inspection اختیاری، assertion اصلی احراز هویت را حذف نمی‌کند.

[static-checks.json](../Evidence/Authenticated-Session-2026-11-17/static-checks.json): syntax دوازده فایل، حفظ دوازده فایل حساس تاریخی، checker موجود با حفظ۳۰ ID و `git diff --check` موفق بودند. checker موجود ابتدا یک string مسیر import در checker تازه را import واقعی پنداشت؛ فقط همان checker جدید با regex اصلاح شد. [شکست اولیهٔ static](../Evidence/Authenticated-Session-2026-11-17/static-initial-failure.json) حفظ است. spec/support/config/launcher اجراشده پس از freeze تغییر نکرد؛ اصلاح checker خارج source ID بود. یک محدودیت تشخیصی آتی: denial guard خطا را throw می‌کند، اما property جداگانهٔ `error.code` تعیین نمی‌کند؛ observer عمومی ممکن است فقط Error/null و شمارندهٔ blocked را ثبت کند. در این batch denial رخ نداد؛ برای تغییر diagnostic، نسخهٔ اجراشده دستکاری نشد.

هیچ شماره، OTP، cookie، token، session body، تصویر authenticated، recording یا profile وارد evidence عمومی یا Git نمی‌شود. screenshot/video خاموش‌اند؛ raw stdout/stderr برنامه discard می‌شود؛ observer متن raw خطا/console/DOM/network را صادر نمی‌کند. TEMP/APPDATA و profileهای همین اجرا زیر runtime خصوصی و ignored هستند. فیلتر موجود metadata تنها هنگام staging، مسیر محلی حساب Windows را sanitize می‌کند؛ اصل محلی حفظ می‌شود. dependency، application code، Tapin/Python یا پروژهٔ دیگر تغییر نکرد.

حساب حذف، logout یا reset نشد؛ سبد از ابتدا تا پایان بدون اقلام بود و هیچ اقلام قبلی پاک/تغییر نکرد. تمام نتایج تاریخی، دو تلاش OTP مسدود batch قدیمی و defectهای باز **P10 بدون rerun** محفوظ‌اند. Chrome پس از ذخیرهٔ نتیجه برای تعویض مرورگر بسته شد؛ Cypress و Firefox نهایی برای بررسی باز ماندند.

## موارد باقیمانده

برای همین مسیر ورود عادی blocker حساب موجود رفع شده و بررسی‌های بالا کامل‌اند. ایجاد حساب جدید از ورود حساب قبلی همچنان outcome تفکیک‌نشده است. قواعد return/eligibility و cart merge/retention تصویب نشده‌اند؛ negative/expired/reused OTP، resend/cooldown/lockout، expiry/logout، narrow viewport و account isolation دو هویتی اجرا نشده‌اند. صفحهٔ نشانی با cart پُر، fixture/intent مجاز و قواعد مستقل لازم دارد؛ در حالت فعلی empty، فرم مشاهده نشد. هیچ customer/address/profile submit، order یا payment در این batch انجام نشد. این نتیجه پایان ordering/payment E2E کامل نیست.

انتشارِ scoped branch و ادغام عادی روی main طبق مجوز کاربر، پس از بازبینی فایل‌های staged و مقایسهٔ bytes منتشرشونده با source manifest انجام می‌شود؛ SHA نهایی با inspection تازهٔ remote در پاسخ تحویل اعلام خواهد شد.
