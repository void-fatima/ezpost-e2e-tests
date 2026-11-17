# اجرای Cypress — Phase 2 / M01 — ۱۴ نوامبر ۲۰۲۶

فضای کار بررسی‌شده: `C:\Users\LOCAL_USER\Desktop\EZPost`. برنامه: `http://172.16.30.198:5800/`.
مجوز درخواست جدید، محدودیت‌های قدیمیِ عدم پیاده‌سازی/اجرا را برای تست‌های مهمان و بدون تغییر داده جایگزین کرد؛ نیازمندی‌های حل‌نشده همچنان تصویب نشده‌اند.

**نتیجهٔ آخرین مجموعه‌ها:** Chrome: ۴۰ موفق / ۲ ناموفق از ۴۲ تست؛ Firefox: ۳۹ موفق / ۳ ناموفق از ۴۲ تست. این شمار تست و زیرمجموعه است، نه تعداد کیس کاملِ پاس‌شده. اجرای تشخیصیِ جداگانهٔ تاریخچه در Firefox نیز ۱ شکست داشت. هیچ نتیجه‌ای از اجراهای قبلی حذف نشده است.

## محیط و دسترسی

| مورد | مقدار تأییدشده |
|---|---|
| Node / npm | 24.19.0 / 11.17.0 |
| Cypress محلی / binary | 16.2.1 / 16.2.1؛ نصب npm محلی با lockfile واقعی |
| سازگاری اعلام‌شدهٔ Node | engines نسخهٔ 16.2.1 شامل Node 24 است؛ metadata registry ثبت شد |
| Chrome اجراشده | 157.0.8103.78 |
| Firefox اجراشده | 160.0 |
| سیستم | Windows 11 Enterprise، x64 |
| دسترسی | TCP پورت 5800 موفق؛ GET ریشه HTTP 200؛ مرور و اجرای واقعی Cypress موفق |
| viewport | desktop 1366×900؛ باریک 390×844 برای منو/بخش‌ها و TOP؛ شبیه‌سازی viewport، نه دستگاه واقعی |
| دستور محلی | AGENTS.md در پروژه/QA و مسیرهای والد بررسی‌شده یافت نشد |
| evidence | همهٔ خروجی‌های عمدی این کار زیر `QA/Evidence/M01-Cypress/2026-11-14/` |

نصب از setup موجود استفاده کرد: `npm.cmd install --cache .npm-cache --no-audit --no-fund`؛ ۱۷۱ بستهٔ محلی اضافه شد. هیچ dependency نامرتبط، plugin جدید، تنظیم سراسری یا تنظیم امنیت مرورگر تغییر نکرد. npm برای postinstall تأییدنشده هشدار داد؛ binary قبلی 16.2.1 موجود بود و اجرای واقعی آن موفق شد. تأیید سراسری script انجام نشد.

`npm --version` از طریق npm.ps1 با خطای ExecutionPolicy روبه‌رو شد؛ از `npm.cmd` استفاده شد و policy سیستم تغییر نکرد. اولین `node scripts/run-m01.cjs smoke chrome smoke-chrome-initial` بدون اجرای تست، با `Could not find Cypress test run results` و failures=3221225501 پایان یافت. `cypress.cmd verify` خطای `bad option: --smoke-test / --ping=651` داد. DEBUG نشان داد `ELECTRON_RUN_AS_NODE=1` از محیط IDE ارث رسیده است؛ runner فقط همین متغیر را در پردازش خودش حذف می‌کند. اجرای مجدد smoke هر ۴ تست را پاس کرد. logها در پوشهٔ setup حفظ شده‌اند.

## نتایج واقعی و مرز شمارش

| اجرا | مرورگر | Tests | Passed | Failed | Pending | Skipped |
|---|---|---:|---:|---:|---:|---:|
| smoke-chrome-retry1، نخستین smoke موفق | Chrome | 4 | 4 | 0 | 0 | 0 |
| safe-chrome-initial، پیش از اصلاح روش Enter | Chrome | 38 | 35 | 3 | 0 | 0 |
| safe-chrome-final، آخرین مجموعهٔ guest | Chrome | 38 | 36 | 2 | 0 | 0 |
| controlled-chrome-initial | Chrome | 4 | 4 | 0 | 0 | 0 |
| safe-firefox-initial، آخرین مجموعهٔ guest | Firefox | 38 | 35 | 3 | 0 | 0 |
| controlled-firefox-initial | Firefox | 4 | 4 | 0 | 0 | 0 |
| history-firefox-repro، تشخیص متمرکز | Firefox | 1 | 0 | 1 | 0 | 0 |

جمع ۴۲ برای هر مرورگر فقط آخرین guest و controlled است؛ smoke و rerun دوباره به آن اضافه نمی‌شوند. تشخیص متمرکز هم در آن جمع نیست. **۸ تست موجود در requirements اجرا نشده‌اند**: سه بخش سیاست ناوبری N08-TC01–03، سه ترکیب دیگر نقش/سبد در N08-TC04، مرجع N06-TC04 و manifest مربوط به N09-TC01. آن‌ها به دلیل پیش‌نیاز حل‌نشده کنار گذاشته شدند، نه با it.skip؛ مقدار Pending واقعی Mocha صفر است.

۲۶ شناسهٔ اصلی در عنوان تست‌های اجراشده حضور مستقیم دارند؛ N06-TC01 فقط assertion مشترک لینک اینماد در تست N06-TC02 دارد و اجرای مستقل ندارد. سه کیس N06-TC04، N08-TC04 و N09-TC01 هیچ بخش اجرایی در این نوبت ندارند. تمام ۳۰ ID و والدهای آن‌ها محفوظ‌اند.

## نگاشت هر ۳۰ کیس

نام فایل‌ها نسبت به `cypress/e2e/m01/` است؛ متن دقیق عنوان هر تست، error و screenshot در results.json و execution-summary.json موجود است. P/F فقط نتیجهٔ assertionهای subset نوشته‌شده است؛ این جدول هیچ کیس را کامل تأیید نمی‌کند.

| Case ID / Parent | Spec/test | دامنهٔ اجراشده | Chrome | Firefox |
|---|---|---|---|---|
| N01-TC01 / N01 | browser/smoke | ورود مستقیم مهمان، URL و hero متمایز | 1P | 1P |
| N01-TC02 / N01 | browser/smoke | reload ریشه و هویت صفحه | 1P | 1P |
| N01-TC03 / N01 | browser/navigation | ROOT→LOGIN→ROOT مستقیم؛ فرم بدون ورود داده | 1P | 1P |
| N02-TC01 / N02 | browser/navigation | سه مقصد header در desktop و منوی narrow | 6P | 6P |
| N02-TC02 / N02 | browser/navigation | heroهای anchor و دو CTA صفحهٔ SHOP | 4P | 4P |
| N02-TC03 / N02 | browser/navigation | ورود مستقیم به دو fragment، URL و heading مقصد | 2P | 2P |
| N02-TC04 / N02 | browser/navigation | header محصول→SHOP و دو بخش ریشه | 1P / 2F | 1P / 2F |
| N02-TC05 / N02 | browser/navigation | focus برنامه‌ای روی لینک واقعی و native Enter با cy.press | 1P | 1P |
| N03-TC01 / N03 | browser/navigation | لوگوی محصول→هویت متمایز ROOT | 1P | 1P |
| N03-TC02 / N03 | browser/navigation | breadcrumb خانه و فروشگاه، main مستقل | 2P | 2P |
| N03-TC03 / N03 | browser/navigation | خروج امن از LOGIN به ROOT بدون submit | 1P | 1P |
| N03-TC04 / N03 | browser/navigation | TOP در دو viewport؛ قرارگیری hero در viewport | 2P | 2P |
| N04-TC01 / N04 | browser/navigation | لینک واقعی محصول و Back/Forward با هویت‌های مستقل | 1P | 1P |
| N04-TC02 / N04 | browser/navigation | ورود مستقیم محصول و refresh | 1P | 1P |
| N05-TC01 / N05 | browser/smoke؛ helper مشترک | نمایش شماره↔URI؛ بدون تماس | 1P | 1P |
| N05-TC02 / N05 | browser/smoke | نمایش ایمیل↔recipient؛ بدون ارسال | 1P | 1P |
| N05-TC03 / N05 | browser/contact-trust + controlled/handoff | نمایش/URI و دو لغو harness؛ نه handler بومی | 3P | 3P |
| N06-TC01 / N06 | مشترک با browser/contact-trust: N06-TC02 | کنترل href اولیه/نام/خواص لینک؛ بدون اعتبارسنجی تاجر | مشترک موفق؛ مستقل اجرا نشده | مشترک موفق؛ مستقل اجرا نشده |
| N06-TC02 / N06 | browser/contact-trust + controlled/handoff | baseline لینک و handoff لغوشده | 2P | 2P |
| N06-TC03 / N06 | controlled/handoff | fetch آزمایشیِ خراب‌شده و ادامهٔ ناوبری داخلی | 1P کنترل‌شده | 1P کنترل‌شده |
| N06-TC04 / N06 | requirements/references | کد مقایسه موجود؛ مرجع مستقل تأمین نشده | BLOCKED / NOT EXECUTED | BLOCKED / NOT EXECUTED |
| N07-TC01 / N07 | browser/navigation | مسیر ناموجود و متن خطا/بازیابی | 1P | 1P |
| N07-TC02 / N07 | browser/navigation | بازیابی به ROOT و جایگزینی main خطا | 1P | 1P |
| N07-TC03 / N07 | browser/navigation | reload خطا و حفظ امکان بازیابی | 1P | 1P |
| N07-TC04 / N07 | browser/navigation؛ diagnostics/history | suffix واقعی ROOT→PRODUCT→MISSING و Back/Forward؛ بدون history API injection | 1P | 1F؛ تشخیص جدا نیز 1F |
| N08-TC01 / N08 | browser/stages | ترتیب چهار مرحله، disabled semantics فعلی و href محلی | 1P subset | 1P subset |
| N08-TC02 / N08 | browser/stages | سبد مهمان خالی و Previous محلی؛ لغو کنترل‌شده | 1P subset | 1P subset |
| N08-TC03 / N08 | browser/stages | session واقعی مهمان/empty، Next محلی و لغو کنترل‌شده | 1P subset | 1P subset |
| N08-TC04 / N08 | requirements/navigation | سه تست داده‌محور موجود؛ هیچ role جعلی اجرا نشده | BLOCKED / NOT EXECUTED | BLOCKED / NOT EXECUTED |
| N09-TC01 / N09 | requirements/references | کد مقایسهٔ manifest موجود؛ allowlist نداریم | BLOCKED / NOT EXECUTED | BLOCKED / NOT EXECUTED |

سه تست guest stage فقط UI/semantics و لغو امن را پوشش می‌دهند؛ کلیک واقعی Next/Previous برای تعیین سیاست checkout انجام نشده است. keyboard test اثبات Tab traversal یا کیفیت بصری focus نیست. TOP و هندسه، ارزیابی انسانی/دسترس‌پذیری کامل نیستند.

## یافته‌ها و تفکیک علت

**M01-RUN-01 — اختلاف ناوبری anchor در Cypress، نیازمند بررسی runner/app interaction.**
در N02-TC04 از PRODUCT، دو کلیک header به URL درست `/#how-it-works` و `/#contact` و main صحیح ROOT می‌رسند، اما heading مقصد در viewport دیده نمی‌شود. Chrome مقدار top حدود 2346 و 2851 در برابر ارتفاع 900 دارد؛ Firefox نیز مشابه است. همان کنترل از ROOT و ورود مستقیم fragment در هر دو مرورگر موفق است.

این شکست در دو اجرای Chrome و اجرای Firefox حفظ شد. با این حال inspection مستقل Chrome خارج از Cypress برای هر دو مسیر موفق بود: scrollY=2266/top≈113 و scrollY=2735/top≈149. بنابراین **باگ قطعی محصول یا معیار پذیرش تصویب‌شده اعلام نمی‌شود**؛ تفاوت مسیر Cypress/رفتار برنامه هنوز نیازمند تشخیص است. assertion هندسه برای سبزشدن حذف یا به scrollIntoView دستی تبدیل نشد. معیار Q03 و قصد نهایی mapping همچنان تصمیم جدا هستند. timeout پیش‌فرض ۴ ثانیه ابزار، SLA محصول نیست.

شواهد: screenshotهای N02-TC04 در safe-chrome-final و safe-firefox-initial؛ `inspection/nested-anchor-independent.json` و دو تصویر مستقل nested-*.

**M01-RUN-02 — خطای قابل تکرار نمایش محصول هنگام تاریخچهٔ Firefox.**
در N07-TC04 پس از native Back به PRODUCT، URL درست است ولی به‌جای عنوان محصول، `صفحه نمایش داده نشد.` و نمای خطای 500 دیده شد؛ پیام خطا `error loading dynamically imported module: .../_nuxt/assets/css/products/[slug]/product-page.css` است. این **نمای خطای 500 است؛ ادعای HTTP 500 برای درخواست محصول نشده**. Chrome همین sequence را پاس کرد. اجرای متمرکز Firefox شکست را دوباره ثبت کرد.

`history-firefox-repro/history-assets.json` پاسخ‌های HTTP 200 برای همان URL با content-typeهای text/css و text/javascript ثبت می‌کند. این شاهد برای تعیین قطعی علت server/cache/proxy کافی نیست؛ تحویل asset و تعامل محیط dev با runner باید بررسی شود. مشکل به‌عنوان خطای نمایش مشاهده‌شده در Firefox/Cypress ثبت می‌شود؛ سرور تغییر نکرد و خطا suppress نشد. Cypress در انتهای تشخیص هشدار EPERM هنگام پاک‌کردن profile اختصاصی خودش داد؛ نتایج و فایل asset قبلاً ذخیره شده بودند. هیچ پاک‌سازی دستی یا تغییر permission انجام نشد.

**M01-TEST-01 — نقص روش تست Enter، اصلاح‌شده.**
در اجرای اولیهٔ Chrome، type('{enter}') روی anchor، hash را تغییر نداد. با مراجعه به مستندات جاری، cy.press(Cypress.Keyboard.Keys.ENTER) جایگزین شد. زیرمجموعهٔ مربوطه در آخرین Chrome و Firefox پاس شد؛ شکست اولیه حذف نشده است.

## چهار اصلاح navigation

چهار اصلاح در سند کیس فعلی اعمال شد، بدون تغییر ID/والد: N02-TC01، N02-TC02 و N02-TC04 اکنون «page یا section» را بیان می‌کنند؛ N03-TC02 مقایسهٔ path و fragment فقط در صورت وجود آن را روشن می‌کند. بستهٔ header، closing/all-packages و breadcrumb فروشگاه در baseline تاریخ‌دار /shop هستند؛ hero بسته همچنان /#products است. SHOP با input جست‌وجو و nav دسته‌بندی مستقل از hero ریشه تشخیص داده می‌شود؛ heading مشترک به‌تنهایی oracle نیست.

این اجراها **regression علیه baseline صریح پیش از کلیک** هستند، نه تصویب K1 توسط QA. اگر محصول مقصد دیگری می‌خواهد، انتخاب مقصد هنوز باید اعلام شود. تاریخچهٔ گزارش تصمیم‌ها و گزارش نهایی تغییر نکرده است.

## باقی‌ماندهٔ همان ۹ کیس

| Case | بخش انجام‌شده | پیش‌نیاز دقیق بخش باقی‌مانده |
|---|---|---|
| N05-TC03 | قرارداد browser و cancellation harness در هر دو مرورگر موفق | preview/cancel واقعی OS در محیط بدون تماس/ارسال/ذخیره؛ مرجع صحت شماره/ایمیل |
| N06-TC02 | href/target/rel/referrer و cancellation harness موفق | جریان واقعی external tab/redirect/return بررسی نشده؛ آن را با attribute check اثبات نمی‌کنیم |
| N06-TC03 | failure دقیق fetch آزمایشی و بقای ناوبری داخلی موفق | خرابی/بازیابی واقعی سرویس و تب خارجی پوشش داده نشده؛ fetch را harness می‌سازد |
| N06-TC04 | کد مقایسهٔ association URL حفظ شد؛ اجرا نشد | merchantReference مستقل با source/version/approvedBy و معنی identity/status/date؛ DOM صفحهٔ رسمی نیز هنوز baseline ندارد |
| N08-TC01 | نمایش/semantics فعلی موفق | سیاست Previous مرحلهٔ اول و Next بدون add؛ productNext مصوب و هویت مقصد |
| N08-TC02 | قرارداد browser و cancel موفق | cartPrevious پس از PRODUCT و fallback ورود مستقیم؛ نه فرض SHOP، نه فرض محصول قبلی |
| N08-TC03 | مهمان/empty واقعی و لینک browser موفق | تصمیم navigate/disabled/feedback برای سبد خالی؛ مقصد یا feedback دقیق |
| N08-TC04 | کد داده‌محور حفظ شد؛ هیچ mock نقش اجرا نشد | سه ترکیب دیگر با سیاست و fixture امن؛ در این scope فقط مهمان واقعی مجاز است. schema/marker مصنوعی هم تأمین نشده؛ mock هرگز server authorization را ثابت نمی‌کند |
| N09-TC01 | comparator موجود؛ اجرا نشد | manifest مجاز نسخه‌دار، audience و scope مستقل ROOT featured/SHOP؛ محتوا یا شمار فعلی تأیید خودکار نشده است |

مستندات جاری Cypress دربارهٔ intercept، origin، press و trade-offs بررسی و ارجاع‌ها در setup ذخیره شدند. راهنمای جاری برای چند تب، @cypress/puppeteer را معرفی می‌کند؛ بنابراین پشتیبانی تب «ناممکن» اعلام نمی‌شود. این قابلیت اختیاری در پروژهٔ حداقلی نصب/پیکربندی نشده و جریان واقعی خارجی در این نوبت اجرا نشده است.

## فایل‌های تغییرکرده، اجرا و حفظ کار

ایجاد: browser/smoke.cy.js، browser/navigation.cy.js، support/navigation.js، diagnostics/history.cy.js، scripts/run-m01.cjs و cypress/README.md.
به‌روزرسانی: package.json، ایجاد package-lock.json واقعی و node_modules محلی؛ config فقط برای حفظ artifactهای قبلی؛ script بررسی ایستا؛ سند کیس با چهار اصلاح و الحاقیهٔ تاریخ‌دار. specهای requirements و fixtureهای null، گزارش‌های تاریخی، شواهد قدیمی و فایل‌های Tapin تغییر نکرده‌اند.

دستورهای اجراشده، از ریشهٔ EZPost:

```powershell
node scripts/run-m01.cjs smoke chrome smoke-chrome-initial
node scripts/run-m01.cjs smoke chrome smoke-chrome-retry1
node scripts/run-m01.cjs safe chrome safe-chrome-initial
node scripts/run-m01.cjs controlled chrome controlled-chrome-initial
node scripts/run-m01.cjs safe firefox safe-firefox-initial
node scripts/run-m01.cjs safe chrome safe-chrome-final
node scripts/run-m01.cjs controlled firefox controlled-firefox-initial
node scripts/run-m01.cjs history firefox history-firefox-repro
npm.cmd run check:static
```

برای تکرار، label آخر را به مقدار تازه مثل safe-chrome-next تغییر دهید؛ runner عمداً results.json موجود را بازنویسی نمی‌کند. README همین selectionها را شرح می‌دهد. Cloud recording غیرفعال است. test isolation حفظ شده و guard درخواست‌های تغییردهنده را مسدود می‌کند؛ استثنای مشاهده‌شدهٔ POST quote فقط محاسبهٔ خودکار قیمت هنگام بارگیری محصول است. هیچ add/cart mutation، submit فرم، SMS/OTP، حساب، پرداخت، سفارش، cookie شخصی، session ساختگی، source تغییرکرده، Git یا M02 استفاده نشد.

`results.json` هر پوشه، stdout/stderr در `setup/*.log`، `execution-summary.json`، inspectionهای DOM و screenshotهای موفق/ناموفق شواهد اصلی‌اند. نسخهٔ قدیمی گزارش coverage وضعیت تألیف ۱۱ نوامبر را حفظ می‌کند؛ این گزارش و Appendix C وضعیت اجرای ۱۴ نوامبر را تعیین می‌کنند.

بررسی ایستا syntax همهٔ JS/CJS، JSONهای package/fixture، resolve import، مسیرهای evidence، حفظ ۳۰ ID/والد، ۸ فایل spec، نبود skip/only و wait عددی را بررسی کرد. SHA-256 هر ۲۹ ورودی تاریخیِ غیر از سند کیس قابل اصلاح با snapshot قبلی برابر ماند. بررسی‌های نهایی در `verification.json` پوشهٔ evidence ثبت می‌شوند. بررسی ایستا نتیجهٔ runtime نیست.

**اقدام بعدی پیشنهادی:** بررسی تحویل asset `product-page.css` در بازگشت تاریخچهٔ Firefox با استفاده از history-assets.json و تصویر خطا، سپس تکرار همان تست N07-TC04؛ بدون تغییر انتظار یا غیرفعال‌کردن امنیت مرورگر.

