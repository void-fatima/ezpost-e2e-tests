# راهنمای ادامهٔ EZPost روی سیستم دیگر

تاریخ تحویل: ۱۷ نوامبر ۲۰۲۶. مخزن عمومی: <https://github.com/void-fatima/ezpost-e2e-tests>؛ شاخهٔ اصلی `main`. مبنای پیش از افزودن این بستهٔ راهنما `e36a419` است؛ commit تحویل شامل خود این راهنما بعد از آن می‌آید. برای ادامه، آخرین `main` را بگیرید و SHA واقعی دریافت‌شده را ثبت کنید؛ این شناسهٔ مبنا، ادعای SHA نهایی انتشار نیست.

Workspace اصلی قبلی `C:\Users\LOCAL_USER\Desktop\EZPost` بود. روی سیستم مقصد نیز پروژه را در پوشه‌ای مستقل از Tapin، Python و repositoryهای دیگر باز کنید؛ تمام فایل‌های تازهٔ پروژه و evidence باید زیر همان clone باشند. فایل‌های عمومی، گزارش‌های شکست، نتیجه‌های تاریخی، IDها و traceability حفظ شده‌اند. design-ready، مجوز اجرا، نتیجهٔ اجرا و defect محصول چهار وضعیت جدا هستند.

## ۱. دریافت کامل و آماده‌سازی سیستم مقصد

تاریخچهٔ کامل Git لازم است؛ بعضی بررسی‌های ایستا به commitهای گذشته مراجعه می‌کنند. clone کم‌عمق با `--depth` یا انتقال صرف فایل ZIP جایگزین مناسبی نیست. فرمان‌های زیر برای **سیستم مقصد** هستند؛ این سند آن‌ها را اجرا نمی‌کند. از پوشهٔ والد مستقل اجرا کنید؛ اگر `EZPost` از قبل وجود دارد، روی آن overwrite نکنید.

```powershell
git -c core.longpaths=true -c core.autocrlf=false clone --branch main https://github.com/void-fatima/ezpost-e2e-tests.git EZPost
Set-Location -LiteralPath '.\EZPost'
git config --local core.longpaths true
git config --local core.autocrlf false
git config --local user.name "void fatima"
git config --local user.email "vantafatima@gmail.com"
git config --local filter.ezpost-public.clean "node scripts/publication-sanitize.cjs"
git config --local filter.ezpost-public.required true
git rev-parse --show-toplevel
git remote -v
git status --short --branch
git rev-parse HEAD
```

`core.longpaths=true` برای نام‌های بلند تاریخی Windows و `core.autocrlf=false` از زمان clone برای حفظ bytes فایل‌های source و تطبیق manifestهای SHA-256 لازم‌اند. تنظیم فقط local است؛ global تغییر نکند. اگر clone قبلاً با تبدیل line-ending ساخته شده، hash mismatch را شکست برنامه ننامید و manifest تاریخی را برای سبزشدن بازنویسی نکنید؛ ابتدا clone مستقلِ درست تهیه کنید و تغییرات محلی را حفظ کنید.

خواندن مخزن عمومی به نشست GitHub قبلی نیاز ندارد. برای push از سیستم مقصد، ورود GitHub همان سیستم را با روش معمول خودتان انجام دهید؛ تنظیم نام/email نویسنده، احراز هویت GitHub نیست. token یا فایل credential کامپیوتر قبلی را به پروژه یا Git کپی نکنید.

مبنای ابزار موجود **Node 24.19.0** و dependency قفل‌شدهٔ **Cypress 16.2.1** است. مرورگرهای آخرین اجرای ثبت‌شده Chrome **157.0.8103.78** و Firefox **160.0** بودند؛ نسخهٔ نصب‌شدهٔ سیستم مقصد باید مستقلاً ثبت و سازگاری آن بررسی شود. dependencyها را upgrade نکنید.

```powershell
node --version
npm.cmd ci
node scripts/check-portability.cjs
npm.cmd run check:static
```

`npm.cmd ci` فقط دستور نصب در سیستم مقصد از `package-lock.json` موجود است؛ این تحویل dependency نصب/تغییر نمی‌دهد. Cypress ممکن است binary خود را جدا دانلود کند. `node_modules`، binaryها و cacheها در Git نیستند. `check-portability.cjs` بررسی انتقال و `check:static` بررسی ایستا هستند؛ هیچ‌کدام نتیجهٔ جدید E2E یا مجوز ارسال SMS/تغییر سبد نیستند.

`scripts/check-ordering-static.cjs` را برای بررسی جاری clone اجرا نکنید: ابزار تاریخیِ وابسته به hash فایل‌های خصوصی اولیه است و خروجی audit تاریخی می‌نویسد. دستورهای قدیمی گزارش‌ها، سند اجرای همان زمان‌اند و نباید دسته‌جمعی تکرار شوند. فیلتر انتشار فقط مسیرهای حساب محلی را در metadata مشخص‌شده سانیتایز می‌کند؛ scanner رازها نیست. پیش از انتشار هر artifact تازه، محتوای آن جدا بررسی شود؛ originals خصوصی حفظ شوند. جزئیات در [manifest انتشار](PUBLICATION_MANIFEST.md) و [README اصلی](../../README.md) آمده است.

## ۲. وضعیت واقعی در نقطهٔ توقف

این ردیف‌ها batchهای جدا با source و زمان اجرای متفاوت‌اند؛ با جمع آن‌ها ادعای یک suite کامل با source یکسان ساخته نشود. `CP`ها checkpointهای یک journey هستند، نه test مستقل.

| پوشش ثبت‌شده | Chrome | Firefox | تفسیر و مرجع |
|---|---|---|---|
| ordering کامل تاریخی، ۱۴ نوامبر؛ ۲۰ live خواندنی + ۴ controlled | live:۲۰ PASS؛ controlled:۲ PASS/۲ FAIL | همان شمارش | ۲۴ test از۱۸ case ID در هر مرورگر؛ جمع۲۲ PASS/۲ FAIL. [اجرای ordering](EZPOST_QA_ORDERING_EXECUTION_2026-11-14.md) |
| بازبینی P10، ۱۷ نوامبر؛ چهار controlled موجود | ۲ PASS/۲ FAIL | ۲ PASS/۲ FAIL | P08/P11 موفق؛ P10-ORD01/02 ناموفق. replay تشخیصی بدون wrapper نیز همین نتیجه دارد و چهار case تازه نیست. ۲۰ live در این follow-up rerun نشدند. [correctness](EZPOST_QA_P10_TEST_CORRECTNESS_2026-11-17.md)، [باگ stale quote](EZPOST_QA_P10_STALE_QUOTE_BUG_2026-11-17.md) |
| رگرسیون سبد مهمان؛ CART-H01…H04 و CART-E01…E04 | ۸ PASS؛ صفر FAIL/pending/skipped/not-run | همان شمارش | هر دو spec با یک source ثابت در دو مرورگر. علت failure تاریخی prerequisiteِ CART-E01 هنوز حل‌نشده است؛ PASS جدید آن را پاک/مختومه نمی‌کند. [رگرسیون سبد](EZPOST_QA_CART_READINESS_REGRESSION_2026-11-17.md) |
| ورود واقعی ordinary؛ AUTH-SESSION01 | ۱ PASS | ۱ PASS | شماره/OTP را کاربر مستقیم وارد کرد؛ assertions هویت، حساب و continuity خودکارند. این OTP کاملاً خودکار نیست. [اجرای نشست](EZPOST_QA_AUTHENTICATED_SESSION_EXECUTION_2026-11-17.md) |
| انتقال سبد احرازشده؛ ACO-H01 | نهایی۱ PASS؛ اولیه۱ FAIL | نهایی۱ PASS | سه attempt تاریخی، دو PASS و یک FAIL. ادعاهای ownership و post-Remove identity با محدودیت بازبینی جدید خوانده شوند. [گزارش تاریخی handoff](EZPOST_QA_AUTHENTICATED_CHECKOUT_EXECUTION_2026-11-17.md)، [محدودیت‌های فعلی](EZPOST_QA_CUSTOMER_FORM_EXECUTION_2026-11-17.md) |
| فرم واقعی؛ CF-F01 | نهایی۱ PASS؛ دو FAIL قبلی محفوظ | ۱ FAIL پیش از verify؛ فرم NOT RUN | چهار attempt completed:یک PASS/سه FAIL. Firefox هیچ Add یا assertion فرم اجرا نکرد. [گزارش فرم و تمام failureها](EZPOST_QA_CUSTOMER_FORM_EXECUTION_2026-11-17.md)، [قرارداد کیس](../Test-Cases/EZPOST_QA_CUSTOMER_FORM_TEST_CASES.md) |

ورود واقعی و handoff/form، live و **MANUAL-ASSISTED** هستند؛ controlled success نیستند. validator سبد مهمان، **۲ مثبت و۱۵ منفی** دارد؛ oracle جداگانهٔ سبد احرازشده **۱۲ مثبت و۳۱ منفی** دارد و با `node scripts/check-authenticated-checkout-contract.cjs` بررسی می‌شود. این‌ها unit/contract check هستند و به تعداد Cypress E2E یا controlled-response مرورگر اضافه نمی‌شوند. نتایج عمومی auth-entry نیز فقط رسیدن به فرم و native validation بدون submit را پوشش می‌دهند؛ PASS آن‌ها ورود موفق را ثابت نمی‌کند.

دو failure P10 هنوز بازند: پاسخ قدیمی می‌تواند label total را به۲۴۰ برگرداند؛ انتظار صحیحِ caseهای مربوط۳۶۰ و۴۸۰ حفظ شده است. لغو واقعی یا کنارگذاشتن پاسخ قدیمی باید پذیرفته شود و با الزام مصرف body، false failure ساخته نشود. quote→UI/cart فقط presentation consistency است؛ oracle مستقل قیمت، tier، rounding، shipping یا payable نیست.

`CF-INV01`، مشاهدهٔ تاریخی طول۱۱۸ به‌جای۱۲۰، با PASS بعدی بسته نشده است. اولین شکست tooShort با شواهد روش ورودی native از defect قطعی برنامه جدا شد؛ failure و recovery اولیه نیز محفوظ‌اند. نتایج قدیمی M01/landing مستقل‌اند؛ آن‌ها را دوباره اجرا یا شکستشان را بازنویسی نکنید. این مجموعه، پوشش کامل سفارش/پرداخت نیست.

## ۳. دقیقاً از کجا ادامه دهیم

**قدم اول اجرای مجدد سبد نیست.** پیش از mutation بعدی، gapهای ownership و cleanupِ source فعلی و مانع واقعی OTP رفع شوند:

1. provenance خط ایجادشده باید با **single-writer/account exclusivity کنترل‌شده در همان بازه** یا **correlation واقعی پاسخ Add با خط ایجادشده** احراز شود. صرف account تعیین‌شده یا delta قبل/بعد، writer هم‌زمانِ matching را رد نمی‌کند. `addAttempted` قبل از عبور واقعی guard فعال می‌شود و fallback فعلی می‌تواند خط هم‌زمان را claim کند. روش lock، API یا fixture تازه حدس زده نشود. شواهد موجود concurrency یا حذف قلم نامتعلق را تأیید نمی‌کنند؛ این gap باید پیش از mutation حل شود.
2. ordinary identity/session/me باید **پس از Remove** نیز مستقل بررسی شود. source ثبت‌شده فقط پیش از Remove هویت را بررسی می‌کند؛ baseline خالی به‌علاوه cart ناشناسِ خالی ممکن است comparison را بگذراند. status تاریخی `restored` جای این assertion را نمی‌گیرد؛ هیچ افت session واقعی از شواهد تأیید نشده است. guard محدود حفظ شود و فقط خط با مالکیت احرازشده برای cleanup مجاز باشد.
3. مانع Firefox، **دریافت عملی OTP در کانال مجاز برای همان هویت و verify واقعی** است. آخرین attempt: start=۱، verify=۰، blockedMutations=۱ و cleanup=`not-needed`. کاربر عدم دریافت SMS و کلیک resend/NS error را گزارش کرد؛ start نخست HTTP200 بود. چهارده رکورد Errored می‌تواند retry باشد، نه تعداد SMS/کلیک انسان. guard یک start را اجازه می‌دهد و resend را با `req.destroy()` رد کرده؛ کد دقیق NS و علت provider/application ثابت نشده است. guard را برای greenشدن باز نکنید و resend خودکار نسازید.
4. پس از رفع موارد بالا، قرارداد هر assertion اصلاح‌شده، منبع انتظار و رفتار غلط قابل رد را ثبت کنید؛ source را freeze کنید؛ همان نسخه را در **Chrome و سپس Firefox نمایان** اجرا و source hashes قبل/بعد را ثبت کنید. هر تغییر shared helper پس از اجرای اول، نتیجهٔ مرورگر دوم را اجرای همان نسخه نمی‌کند؛ subsetهای متأثر باید دوباره با source نهایی اجرا شوند. شکست‌های اولیه و نتیجهٔ cleanup جدا حفظ شوند.

مجوز قبلی، ورود عادی برای **همان هویت تعیین‌شده**، ایجاد حساب عادی از مسیر طبیعی OTP در صورت نیاز و نگه‌داشتن آن حساب را شامل شده بود؛ شواهد ثابت نمی‌کنند حساب تازه ساخته شد یا از قبل موجود بود. این مجوز به شماره/حساب دیگر، admin، bypass یا ذخیرهٔ اطلاعات مشتری گسترش داده نشود. شماره و OTP فقط مستقیم در browser وارد شوند؛ برای ادامه password، cookie، token یا کد OTP را در chat/report/repository نگذارید.

## ۴. اجرای نمایان پس از رفع پیش‌نیازها

فرمان‌های این قسمت **راهنمای اجرای آینده** هستند و در آماده‌سازی/انتشار این تحویل اجرا نمی‌شوند. به `http://172.16.30.198:5800/` از شبکهٔ شرکت نیاز است؛ localhost جایگزین آن نیست. clone عمومی شبکه، حساب یا کانال OTP فراهم نمی‌کند. label هر تلاش باید تازه باشد؛ evidence تاریخی overwrite نشود.

```powershell
# فقط ورود واقعی، بدون cart mutation؛ با همان هویت و کانال مجاز
node scripts/open-authenticated-session.cjs chrome resume-auth-01
# پس از پایان Chrome و آماده‌سازی مرورگر بعد:
node scripts/open-authenticated-session.cjs firefox resume-auth-01

# فقط پس از رفع provenance و post-Remove identity و مانع OTP:
node scripts/open-authenticated-checkout.cjs chrome resume-handoff-01 handoff
node scripts/open-authenticated-checkout.cjs firefox resume-handoff-01 handoff
node scripts/open-authenticated-checkout.cjs chrome resume-form-01 form
node scripts/open-authenticated-checkout.cjs firefox resume-form-01 form
```

launcher از Cypress محلی با `open --e2e` و config اختصاصی استفاده می‌کند؛ headless جایگزین نیست. اگر Continue خود Cypress نمایش داده شد، ادامه دهید؛ در E2E/Specs، فقط spec همان slice را باز کنید:

| slice | فایل واقعی برای انتخاب دستی |
|---|---|
| ordinary authentication | `cypress/e2e/authentication/authenticated-session.cy.js` |
| authenticated handoff | `cypress/e2e/checkout/authenticated-cart-checkout.cy.js` |
| customer form | `cypress/e2e/checkout/customer-form.cy.js` |

در browser نمایش‌داده‌شده شماره/OTP مجاز را خود کاربر وارد می‌کند؛ بقیهٔ assertionها از spec اجرا می‌شوند. چند Cypress application هم‌زمان باز نکنید؛ هنگام تغییر مرورگر فقط instance متعلق به این task را عادی ببندید و نتیجهٔ قبلی را حفظ کنید. پنجرهٔ runner و browser آخر را برای بازبینی باز بگذارید. سه وضعیت **application opened / spec loaded / tests executed** مستقل تأیید و شمار PASS/FAIL/pending/skipped/not-run ثبت شوند؛ صرف launcher، پنجره یا HTTP200، PASS نیست.

diagnostic driverهای تاریخی زیر `QA/Evidence/**/tools/` برای برخی اتصال‌های Chrome به Playwright در cache قبلی `_npx` سیستم متکی‌اند و port/PID قبلی نیز قابل استفادهٔ مجدد نیست. Playwright dependency اعلام‌شدهٔ این پروژه نیست؛ cache یا browser profile خصوصی را کپی نکنید و dependency تازه نسازید. انتخاب دستی spec در Cypress و اجرای خود تست‌ها به این driverها نیاز ندارد؛ automationِ جمع‌آوری evidence در سیستم جدید prerequisite جداگانه دارد و تا بررسی آن، قابلیت driver ادعا نشود.

## ۵. فایل‌های لازم، محرمانگی و مرز مرحله

قراردادها در `QA/Test-Cases/`، گزارش‌ها و تصمیم‌ها در `QA/Reports/`، sourceهای تست در `cypress/e2e/` و helpers/fixtureها در `cypress/support/` و `cypress/fixtures/` هستند. Phase1 و۳۰ کیس M01 نیز دست‌نخورده‌اند؛ [Phase1](../Planning/EZPOST_QA_PHASE1_REVIEW.md) و [M01 نهایی](EZPOST_QA_PHASE2_M01_FINAL_REVIEW.md) مراجع دامنه‌اند. پیوندهای نتیجه در گزارش‌های جدول بالا به JSON، manifest، failure و evidence دقیق می‌رسند؛ همهٔ شواهد قابل‌انتشار در `QA/Evidence/` حفظ شده‌اند.

sessionهای browser، شماره/OTP، credentials، `.env`، raw session/network خصوصی، browser profile و runtime شخصی **قابل انتقال از مخزن نیستند**. در سیستم جدید ورود دستی تازه لازم است. evidence جدید فقط در clone و زیر `QA/Evidence/` باشد؛ خروجی خودکار نباید به Tapin یا مسیر ماشین قبلی برود. برای auth، screenshot/video و raw output مطابق config اختصاصی خصوصی/غیرفعال بمانند؛ هیچ نمای شخصی احرازشده را عمومی منتشر نکنید. hashهای historical originals با hash نسخهٔ public سانیتایزشده الزاماً یکسان نیستند؛ provenance تاریخی را بازنویسی نکنید.

فعلاً **shipping quote، submit فرم مشتری/نشانی، save profile/address، create-order و payment اجرا نشوند**. فرم فعلی با کامل‌شدن نشانی می‌تواند shipping POST خودکار ایجاد کند؛ ناقص‌بودن عمدی فرم و guard مستقل باید حفظ شود. مجوز عملیات test-owned cart، مجوز این عملیات بعدی نیست. دادهٔ اختصاصی/روش restore، قرارداد کسب‌وکار و مجوز مربوط به مرحلهٔ بعد هنوز لازم‌اند. هیچ M02، تغییر برنامه، weakening assertion، dependency upgrade یا rerun خودکار بخشی از این تحویل نیست.
