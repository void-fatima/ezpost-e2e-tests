# گزارش اجرای تعاملی تست‌های خواندنی سفارش EZPost

تاریخ: ۱۴ نوامبر ۲۰۲۶، America/Los_Angeles. Workspace اجرا و تمام خروجی‌های جدید: `C:\Users\LOCAL_USER\Desktop\EZPost`. برنامه: `http://172.16.30.198:5800/`.

## نتیجهٔ اجرا

چهار spec موجود واقعاً در **Cypress open، E2E و مرورگر headed** اجرا شدند؛ ابتدا Chrome و سپس Firefox. inventory با خواندن specها و نتایج runtime تأیید شد: **۲۴ تست پارامتری از ۱۸ ID جزئی؛ ۲۰ live read-only و ۴ controlled-response**. نتیجهٔ آخرین اجرای کامل هر spec در هر مرورگر **۲۲ موفق و ۲ ناموفق** است. هیچ تستی در جدول نهایی pending، skipped یا not-run نیست.

هر دو شکست نهایی، P10-ORD01 و P10-ORD02، در پاسخ‌های کنترل‌شده رخ دادند: پس از نمایش صحیح انتخاب جدید، تکمیل پاسخ قدیمی تعداد لیبل نمایش‌داده‌شده را به ۲۴۰ برگرداند. این شواهد رفتار frontend تحت ترتیب پاسخ شبیه‌سازی‌شده‌اند؛ نتیجه‌ای دربارهٔ cart، سفارش، پرداخت، charge یا صحت مستقل قیمت نمی‌دهند.

این گزارش checkpoint اجرای جدید است. عبارت‌های `WRITTEN / NOT EXECUTED` در گزارش‌های authoring، caseها، عنوان بعضی describeها و خروجی static قدیمی، وضعیت زمان نگارش بودند؛ آن فایل‌ها برای حفظ provenance تغییر نکردند. نتیجهٔ جاری فقط به assertionهای اجراشدهٔ جدول زیر محدود است. هیچ والد Phase 1 یا کل جریان سفارش «پاس‌شده» اعلام نمی‌شود.

## محیط، فرمان و وضعیت پنجره‌ها

| مورد | شاهد اجرا |
|---|---|
| Cypress نصب‌شدهٔ پروژه | 16.2.1؛ همان `node_modules/cypress` موجود |
| Node | 24.19.0 |
| Chrome | 157.0.8103.78؛ `isHeaded=true`، `isHeadless=false` |
| Firefox | 160.0؛ `isHeaded=true`، `isHeadless=false` |
| پیکربندی | `cypress.config.cjs` موجود؛ baseUrl اصلی و `testIsolation=true` حفظ شدند |
| discovery محدود | فقط `cypress/e2e/ordering/**/*.cy.js`؛ default مربوط به M01 با override فرایند جایگزین شد |
| app باز شد | پنجرهٔ واقعی Windows برنامهٔ Cypress، PID 12344؛ سپس پنجرهٔ Chrome و پنجرهٔ اختصاصی Firefox تأیید شدند |
| specها بارگذاری شدند | انتخاب چهار spec از صفحهٔ Specs؛ مسیر `Cypress.spec.relative` و نام spec در reporter ثبت شد |
| تست‌ها اجرا شدند | `Cypress.mocha.getRunner()`، state پایان، زمان start/end و نتیجهٔ تک‌تک تست‌ها ثبت شد؛ بازشدن process به‌تنهایی نتیجهٔ تست محسوب نشد |
| پنجرهٔ نهایی | Cypress و Firefox اختصاصی پروژه، PID 5140، باز ماندند؛ spec نهایی controlled و شمارندهٔ ۲ موفق/۲ ناموفق قابل بررسی است |

فرمان launcher محلی همین جلسه، از root پروژه:

```powershell
node QA\Evidence\Ordering-Cypress\visible-1794688649725\launch.cjs chrome
```

فرمان واقعی فرزند، با Cypress نصب‌شدهٔ پروژه:

```text
node node_modules/cypress/bin/cypress open --e2e --browser chrome
  --project C:\Users\LOCAL_USER\Desktop\EZPost
  --config-file cypress.config.cjs
  --config <JSON process-local overrides>
```

JSON دقیق فرمان و overrideها در `chrome/launch.json` زیر ریشهٔ شواهد ثبت است. مسیر screenshots/videos/downloads و TEMP/TMP فرزند در ریشهٔ شواهد EZPost قرار گرفت؛ `trashAssetsBeforeRuns=false` بود. تنظیمات global، dependencyها و config اصلی تغییر نکردند. Firefox از **browser picker واقعی همان Cypress open: Firefox / Version 160** انتخاب شد؛ پروژهٔ دیگری ایجاد نشد. runtime و log مشترک این فرایند زیر پوشهٔ نام‌گذاری‌شدهٔ `chrome` باقی ماندند؛ نتایج صریح Firefox در پوشهٔ `firefox` هستند.

ابزارهای CDP برای Chrome و RDP اختصاصی Firefox فقط UI رانر، خواندن نتیجه و diagnostics را کنترل کردند؛ assertionها و تعاملات تست را خود Cypress انجام داد. Firefox شخصی کاربر مورد استفاده قرار نگرفت. foreground واقعی پنجرهٔ اختصاصی قبل از آخرین rerun با تطبیق handle مورد انتظار و `GetForegroundWindow()` تأیید شد؛ شاهد در `firefox/foreground-verification.json` است.

## نتیجهٔ نهایی به تفکیک spec و مرورگر

`L` = پاسخ live برنامه؛ `C` = پاسخ quote کنترل‌شده روی صفحه و assetهای واقعی. مسیر همهٔ ردیف‌ها نسبت به `cypress/e2e/ordering/` است. این جدول آخرین اجرای کامل هر spec را نشان می‌دهد؛ تلاش‌های قبل در بخش بعد حفظ شده‌اند.

| مرورگر | spec | نوع | مجموع | passed | failed | pending | skipped | not-run |
|---|---|---|---:|---:|---:|---:|---:|---:|
| Chrome | `browser/auth-entry.cy.js` | L | 7 | 7 | 0 | 0 | 0 | 0 |
| Chrome | `browser/cart-recovery.cy.js` | L | 2 | 2 | 0 | 0 | 0 | 0 |
| Chrome | `browser/product-selection.cy.js` | L | 11 | 11 | 0 | 0 | 0 | 0 |
| Chrome | `controlled/quote-presentation.cy.js` | C | 4 | 2 | 2 | 0 | 0 | 0 |
| Firefox | `browser/auth-entry.cy.js` | L | 7 | 7 | 0 | 0 | 0 | 0 |
| Firefox | `browser/cart-recovery.cy.js` | L | 2 | 2 | 0 | 0 | 0 | 0 |
| Firefox | `browser/product-selection.cy.js` | L | 11 | 11 | 0 | 0 | 0 | 0 |
| Firefox | `controlled/quote-presentation.cy.js` | C | 4 | 2 | 2 | 0 | 0 | 0 |

| محدودهٔ نتایج نهایی | passed | failed | pending | skipped | not-run |
|---|---:|---:|---:|---:|---:|
| live هر مرورگر | 20 | 0 | 0 | 0 | 0 |
| controlled هر مرورگر | 2 | 2 | 0 | 0 | 0 |
| هر مرورگر، مجموع ۲۴ تست | 22 | 2 | 0 | 0 | 0 |
| دو مرورگر، ۴۸ اجرای نهایی | 44 | 4 | 0 | 0 | 0 |

۴ failure نهایی در دو مرورگر مربوط به **دو ID یکسان** است؛ چهار defect مستقل گزارش نشده است. denominator این نتایج ۲۴ تست هر مرورگر است، نه ۴۷ رفتار inventory و نه تمام مراحل سفارش.

## IDها و زیرمجموعهٔ واقعاً اجراشده

تمام ۱۸ ID جزئی و mapping والدشان حفظ شدند. `×۲` یعنی desktop 1366×900 و viewport شبیه‌سازی‌شدهٔ 390×844؛ هیچ ادعای physical mobile مطرح نیست. وضعیت هر ردیف برای هر دو مرورگر است.

| ID / والد | تعداد در هر مرورگر | assertionهای اجراشده | نوع | نتیجه و محدودیت |
|---|---:|---|---|---|
| P01-ORD01 / P01 | 1 | کارت→هویت و مسیر محصول؛ quote آماده | L | PASS؛ صحت تجاری متن/ارسال بررسی نشد |
| P02-ORD01 / P02 | 1 | فعال‌سازی thumbnail با Enter، تصویر بارگذاری‌شده و بازگشت | L | PASS؛ با اصلاح ورودی native ابزار Chrome |
| P02-ORD02 / P02 | 2 | dialog گالری، focus اولیه، next/previous/tab، بستن و Escape | L | PASS؛ focus trap/return و wrap مرزی پوشش کامل ندارند |
| P03-ORD01 / P03 | 1 | تغییر بسته در quantity=2، هویت، labels و presentation پاسخ | L | PASS؛ قیمت مستقل و handoff بررسی نشد |
| P03-ORD02 / P03 | 1 | انتخاب بسته با Enter در viewport باریک | L | PASS؛ native keyboard در browser |
| P03-ORD03 / P03 | 1 | توافق bar باریک با خلاصهٔ settled و visibility دکمه | L | PASS؛ دکمهٔ افزودن فعال نشد |
| P03-ORD04 / P03 | 1 | default یکتا، مسیر بسته‌های ۱۲۰→۲۴۰→۳۶۰→۱۲۰ در q2 | L | PASS؛ retention بین routeها بررسی نشد |
| P04-ORD01 / P04 | 1 | min/max اعلام‌شدهٔ همین محصول، stepper ۱→۲→۱ و disabled حد پایین | L | PASS؛ تأیید policy حدود همهٔ محصولات نیست |
| P04-ORD02 / P04 | 2 | ArrowUp و Tab در input مقدار و reconciliation پاسخ | L | PASS؛ grammar و invalid-input policy باز است |
| A01-ORD01 / A01 | 2 | label/attributes/required/pattern/maxlength فرم | L | PASS؛ بدون submit |
| A01-ORD02 / A01 | 2 | native invalid، طول، پاک‌کردن و ماندن در login | L | PASS؛ هیچ auth POST مجاز نشد |
| A01-ORD03 / A01 | 1 | Tab تا submit بدون فعال‌کردن آن | L | PASS؛ هیچ SMS/OTP |
| A01-ORD04 / A01 | 2 | native invalid→format-valid→invalid→empty | L | PASS؛ نمونهٔ محلی HTML، هویت کاربر یا پذیرش server نیست |
| T01-ORD01 / T01 | 2 | guest واقعی، cart خالی، recovery→shop→محصول/quote | L | PASS؛ populated cart وجود ندارد |
| P08-ORD01 / P08 | 1 | نمایش دقیق quote ثبت‌شده، ارقام فارسی و separator | C | PASS؛ صحت مالی مستقل تأیید نمی‌شود |
| P10-ORD01 / P10 | 1 | latest q3 صحیح؛ سپس release پاسخ قدیمی q2؛ کنترل خلاصه پس از مصرف پاسخ | C | FAIL؛ خلاصهٔ نهایی ۲۴۰ به‌جای ۳۶۰ |
| P10-ORD02 / P10 | 1 | latest package50 در q2 صحیح؛ سپس پاسخ قدیمی package49؛ کنترل خلاصه | C | FAIL؛ خلاصهٔ نهایی ۲۴۰ به‌جای ۴۸۰ |
| P11-ORD01 / P11 | 1 | `forceNetworkError` برای q2، alert موجود، بازیابی با q3 | C | PASS نهایی؛ outage واقعی یا same-input retry نیست |

## شکست‌های اولیه، اصلاح setup و rerun

برای اصلاح محدود تست‌ها از skill **cypress-author** و دستورهای محلی آن استفاده شد. فقط سه فایل موجود تغییر کردند: `cypress/support/ordering.js`، `browser/product-selection.cy.js` و `controlled/quote-presentation.cy.js`. نسخه‌های پیش از اصلاح در `before-fixes/` زیر ریشهٔ شواهد نگهداری شدند. هیچ assertion ضعیف، forced interaction، افزایش timeout یا suppression عمومی exception اضافه نشد.

| تلاش | نتیجهٔ موردی | تشخیص و اقدام |
|---|---|---|
| Chrome اولیه، چهار spec | live: 16 PASS / 4 FAIL؛ controlled: 1 PASS / 1 FAIL / 2 hook-skipped | چهار شکست Enter و deadlock/cleanup harness؛ شاهد اولیه حفظ شد |
| Chrome diagnostics، همان دو spec آسیب‌دیده | product: 7 PASS / 4 FAIL؛ controlled: 1 PASS / 1 FAIL / 2 hook-skipped | eventها نشان دادند cy.press Enter فقط keydown/up دارد؛ خطای اصلی Promise route=4000ms پیش از خطای cleanup ثبت شد |
| Chrome پس از اصلاح محدود | product: 11 PASS؛ controlled: 2 PASS / 2 FAIL | failureهای واقعی controlled اکنون بدون masking hook قابل مشاهده‌اند |
| Firefox، اجرای کامل نخست | live: 20 PASS؛ controlled: 2 PASS / 2 FAIL | همان دو failure خلاصهٔ لیبل |
| Firefox، rerun برای اصلاح ثبت تصویر، 20:58:58–21:01:18 UTC | P08 PASS؛ P10-ORD01 actionability FAIL؛ P10-ORD02 PASS؛ P11 alert visibility FAIL | variation در actionability/visibility دیده شد؛ ارتباط با وضعیت پنجره یا زمان rendering فرض تشخیصی است؛ علت قطعی اثبات نشده و نتیجه حذف یا به defect جدید محصول تعبیر نشده است |
| Firefox، controlled پس از تأیید foreground، 21:02:07–21:02:26 UTC | P08/P11 PASS؛ P10-ORD01/P10-ORD02 همان failure لیبل | نتیجهٔ نهایی جدول بالا؛ هیچ expected result تغییر نکرد |

در Mocha raw تلاش اولیهٔ controlled، `tests=2, passes=1, failures=2` دیده می‌شود؛ failure دوم مربوط به **hook** است. در شمارش case-level این به یک تست failed و دو تست skipped به‌علت hook تبدیل شده، نه دو case failed اضافی.

اصلاح Enter: implementation نصب‌شدهٔ Cypress 16.2.1 برای Chrome، Enter نام‌دار را بدون character/virtual-key metadata کامل می‌فرستاد. diagnostics رویدادهای keydown/up بدون keypress/click را ثبت کرد. ورودی native کامل پس از آماده‌شدن UI، keypress و activation صحیح داشت. helper جدید در Chrome همان ورودی native CDP را با Enter/13/`\r` می‌فرستد و focus assertion را نگه می‌دارد؛ جایگزین click نشده است. Firefox مسیر `cy.press` خودش را نگه می‌دارد. هر ۱۱ تست محصول با expected result قبلی موفق شدند.

اصلاح P10: دکمهٔ `+` هنگام quote pending غیرفعال بود؛ نگه‌داشتن پاسخ قدیمی و انتظار click بعدی deadlock ابزار ایجاد می‌کرد. input عددی و گزینه‌های بسته همچنان enabled بودند. P10-ORD01 از همان ArrowUp/Tab تأییدشدهٔ input برای q2→q3 استفاده می‌کند. پاسخ قدیمی فقط بعد از assertion نمایش کامل انتخاب جدید آزاد می‌شود. late `req.reply()` از afterEach حذف شد؛ cleanup طبیعی Cypress درخواست‌های معلق را isolate می‌کند. این اصلاح‌ها policy تازه‌ای برای pending CTA تعیین نمی‌کنند.

## دو failure باقی‌مانده

URL هنگام هر دو failure: `http://172.16.30.198:5800/products/blackfri-01`. درخواست‌های مربوط، فقط `POST /api/v1/products/blackfri-01/quote` خواندنی و replay کنترل‌شده بودند. headers/session credentials در خلاصهٔ شبکه ذخیره نشده‌اند.

| ID | ترتیب و پاسخ کنترل‌شده | assertion ناموفق | محدودهٔ نتیجه |
|---|---|---|---|
| P10-ORD01 | initial49/q1؛ older49/q2 نگه داشته شد؛ latest49/q3 با 200 و نمایش صحیح ۳۶۰؛ سپس older با 200 و body-consumption؛ دو فرصت render | `expected '3 بستهٔ 120 لیبلی = 240 لیبل' to equal '3 بستهٔ 120 لیبلی = 360 لیبل'` | انتخاب q3 حفظ است، مجموع لیبل به پاسخ q2 برگشته؛ frontend در این ordering کنترل‌شده ناسازگار است |
| P10-ORD02 | initial49/q1؛ older49/q2 نگه داشته شد؛ latest50/q2 با 200، package50 منتخب یکتا و نمایش ۴۸۰؛ سپس older49/q2 با 200 و body-consumption | `expected '2 بستهٔ 240 لیبلی = 240 لیبل' to equal '2 بستهٔ 240 لیبلی = 480 لیبل'` | بستهٔ جدید نمایش داده می‌شود، مجموع لیبل متعلق به بستهٔ قدیمی است |

assertionهای پولیِ پس از خلاصهٔ خراب به‌علت fail زودتر اجرا نمی‌شوند؛ از این شکست‌ها به‌تنهایی ادعای مقدار پول نهایی نادرست نمی‌شود. شواهد قبل از release، presentation جدید صحیح را ثبت می‌کنند. رفتار stale response در هر دو browser در اجرای کامل و در آخرین Firefox foreground بازتولید شد، اما variation یک rerun نیز حفظ شده است. هیچ cart/order/charge برای بررسی پیامد بعدی ساخته نشد.

## شواهد و محدودیت ثبت تصویر

ریشهٔ همهٔ شواهد این جلسه: `QA/Evidence/Ordering-Cypress/visible-1794688649725/`.

| شاهد نسبت به ریشه | کاربرد |
|---|---|
| `chrome/visible-results-8220.json` | اولین اجرای چهار spec، شامل failureها و hook-skippedها |
| `chrome/diagnostics-20796.json` | error اصلی gate، URL و رویدادهای Enter؛ failure screenshots با prefix `failure-20796-` |
| `chrome/read-only-diagnosis.json` و `diagnostic-pending.png` | inspection جدا از test counts: Enter صحیح بعد از quote readiness؛ disabled/enabled کنترل‌های pending |
| `chrome/visible-results-4248.json` | rerun نهایی product و controlled؛ reporter، assertionها و method/path/statusهای شبکه |
| `chrome/failure-4248-1794689375302.png` و `chrome/failure-4248-1794689383399.png` | دو failure controlled Chrome |
| `firefox/visible-results.json` | اجرای کامل نخست چهار spec در Firefox؛ نتایج و diagnostics معتبر، با محدودیت تصویر توضیح‌داده‌شده در پایین |
| `firefox/visible-results-20696.json` | تلاش تکمیلی دارای actionability/visibility variation؛ از نتیجهٔ نهایی حذف یا پنهان نشده است |
| `firefox/visible-results-11748.json` | آخرین اجرای controlled پس از تأیید foreground؛ ۲ PASS / ۲ FAIL |
| `firefox/foreground-verification.json` | تطبیق handle واقعی پنجرهٔ اختصاصی با foreground |
| `firefox/own-window-final.png` | تصویر معتبر پنجرهٔ اختصاصی Cypress Firefox پس از اجرای کامل نخست؛ نمای پایان suite، نه لزوماً DOM لحظهٔ failure |
| `firefox/failure-11748-controlled-quote-presentation.cy.js-1.png` و `firefox/failure-11748-controlled-quote-presentation.cy.js-2.png` | تصاویر معتبر own-window از آخرین تلاش؛ باید همراه diagnostics/URL خوانده شوند، چون runner خودکار به تست بعدی می‌رود |
| `before-fixes/` | سه source قبل از اصلاح setup |
| `static/`، `preservation-before.json` و `preservation-after.json` | بررسی static و SHA-256 فایل‌های موجود |

روش اولیهٔ screenshot دسکتاپ، با وجود انتخاب handle، تضمین نمی‌کرد pixels متعلق به پنجرهٔ Cypress باشند. تصاویر جدیدِ نامعتبر آن تلاش با placeholder صریح «INVALID» جایگزین شدند و **شاهد تصویری تست محسوب نمی‌شوند**. JSON نتیجهٔ اجرای نخست Firefox معتبر و مستقل از آن تصاویر است. روش ثبت به `PrintWindow` روی handle اختصاصی Firefox تغییر کرد؛ تصویر پنجرهٔ دیگری capture نمی‌شود. تصاویر تاریخی پروژه و M01 تغییر نکردند. screenshots بعد از پایان یا در حین گذار تست‌ها، به‌تنهایی snapshot دقیق DOM زمان assertion نیستند؛ متن assertion، URL و chronology ثبت‌شده تعیین‌کننده‌اند.

## بررسی static، حفاظت و حدود اجرا

`npm.cmd run check:static` موفق بود: syntax/importهای ۲۲ فایل JavaScript، ۷ JSON، config/evidence paths و حفظ ۳۰ ID اصلی M01 بررسی شدند؛ هیچ تست M01 اجرا نشد. checker موجود ordering نیز syntax هفت فایل، ۱۸ ID، mappingهای ۴۷ رفتار، fixtureهای quote ثبت‌شده و ساختار جدول‌ها را تأیید کرد. دو خروجی نوشتنی آن checker با wrapper فقط به `static/` همین جلسه هدایت شدند تا شواهد historical audit بازنویسی نشوند. عبارت NOT EXECUTED در خروجی این checker صرفاً مربوط به static-only بودن خود آن فرمان است.

مقایسهٔ SHA-256 با baseline ابتدای همین جلسه، از ۴۴ فایل موجود دقیقاً سه فایل اصلاح‌شدهٔ ordering و **۴۱ فایل بدون تغییر** را تأیید کرد. package/package-lock، config اصلی، فایل‌های M01، fixtureها، caseها و گزارش‌های قبلی بدون تغییر ماندند؛ نتیجهٔ دقیق در `preservation-after.json` ثبت است. هیچ Git operation، نصب/upgrade، تغییر dependency یا application code انجام نشد.

guard مشترک fail-closed برای درخواست‌های غیرخواندنی حفظ شد؛ تنها POST مجاز، quote عمومیِ مشاهده‌شده بود. auth spec نیز auth POST را مسدود می‌کند. هیچ login/OTP submit، cart add/remove/edit، account/order، پرداخت، تماس، ایمیل یا تغییر دادهٔ server از این تست‌ها انجام نشد. یک inspection جداگانهٔ browser برای تشخیص Enter/pending به counts اضافه نشده است؛ یک تلاش اولیهٔ آن قبل از hydration نتیجه نداد و پس از quote readiness اصلاح شد. این diagnostic رفتار برنامه را تغییر نداده و تست Cypress جا زده نشده است.

## مراحل پوشش‌داده‌نشده و پیش‌نیازها

| محدوده | پیش‌نیاز دقیق باقیمانده |
|---|---|
| پول و quantity کامل P04–P09 | grammar/min/max مصوب به تفکیک بسته، schedule مستقل نسخه‌دار، tier/no-tier، currency/rounding/tax؛ quote پاسخ خودش oracle مستقل نیست |
| افزودن/ویرایش/cart کامل P14/T02–T08 | مجوز mutation جدا، fixture اختصاصی امن، سیاست guest/add/merge/badge/zero/edit/remove/retention/conflict و reset پشتیبانی‌شده |
| login/server/OTP/session A02–A12 | identities عادی اختصاصی، کانال SMS-safe، lifecycle/TTL/retry/resend/expiry/return/privacy rules؛ بدون session شخصی یا admin |
| customization J04 | availability/entry/eligibility رسمی، workflow واقعی و file/preview/print contract |
| address/review J01 | ordinary access، cart امن، فیلدها و قواعد واقعی، fees/shipping و مرز ایجاد order |
| submit/payment/confirmation J02 | sandbox/provider رسمی، order timing و retry/idempotency، reconciliation مستقل order/charge و مجوز جداگانه |
| history/details/privacy J03/A12 | دو customer واقعی، seeded owned/other-owned orders، status model و resourceهای مجاز |
| failure و کیفیت گسترده | same-input retry، malformed/timeout/latest-failure، pending CTA policy؛ device واقعی، AT/focus/zoom و performance معیارمند |

اقدام بعدی قابل بررسی، triage دو failure کنترل‌شدهٔ P10 با همین chronology و حفظ assertionهای ۳۶۰/۴۸۰ است. توسعهٔ downstream و هر عملیات تغییردهندهٔ داده به پیش‌نیازها و مجوزهای خودش نیاز دارد. این اجرا سفارش/پرداخت E2E کامل یا تأیید خودکار M01 برای implementation/release نیست؛ تست‌های unrelated M01 و failureهای تاریخی آن اجرا یا بازنویسی نشدند.
