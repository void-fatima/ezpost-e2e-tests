# اجرای قابل مشاهدهٔ Cypress M01 — ۱۴ نوامبر ۲۰۲۶

پروژه: `C:\Users\LOCAL_USER\Desktop\EZPost`؛ برنامه: `http://172.16.30.198:5800/`.
درخواست جدید کاربر، اجرای قابل مشاهده در Windows با **Cypress open / E2E / Chrome** را الزامی می‌کند. اجرای headless جایگزین این الزام نیست.

## سه وضعیت مستقل و تأییدشده

| وضعیت | شاهد واقعی |
|---|---|
| Application opened | پنجرهٔ واقعی Windows با عنوان Cypress، handle=526552 و PID=6556؛ UI Automation و Win32 بررسی شدند |
| Chrome و spec loaded | پنجرهٔ EZPost - Google Chrome، PID=904؛ صفحهٔ Specs و سپس مسیر runner هر ۵ spec مشاهده شد |
| Tests executed | نتیجهٔ واقعی Mocha داخل Cypress، متن Reporter، screenshot و پایان runner برای هر spec ذخیره شد؛ صرف بازشدن برنامه به معنی اجرا گزارش نشده است |

نسخهٔ پروژه همان Cypress 16.2.1 و Chrome نصب‌شده 157.0.8103.78 است. وابستگی جدیدی نصب نشد و config دوم ایجاد نشد. Cypress و Chrome در بررسی نهایی باز، visible و غیر minimized بودند؛ Chrome روی نتیجهٔ navigation.cy.js باقی ماند. در بررسی انتهایی، پنجره‌ها minimized شده بودند؛ برای برآورده‌کردن درخواست نمایش، دوباره restore شدند و Chrome در foreground قرار گرفت.

## روش واقعی اجرا

نسخهٔ محلی از مسیر `node_modules/cypress/bin/cypress` با این آرگومان‌ها باز شد:

```text
cypress open --e2e --browser chrome --project C:\Users\LOCAL_USER\Desktop\EZPost
```

همان cypress.config.cjs استفاده شد؛ override فقط مسیرهای screenshot/video/download اختصاصی این جلسه و حفظ artifactهای قبلی بود. متغیر ELECTRON_RUN_AS_NODE فقط از محیط پردازش Cypress حذف شد؛ تنظیم سراسری تغییر نکرد.

Chrome نصب‌شده مستقیماً توسط Cypress انتخاب و باز شد. یک client متصل به CDP همان Chrome اختصاصی Cypress فقط صفحهٔ Specs و انتخاب specها را کنترل کرد؛ هیچ profile شخصی یا cookie کپی نشد. **اجرای تست‌ها در خود Cypress open انجام شد**؛ client مرورگر جایگزین موتور Cypress نبود و AUT را مستقلاً برای پاس‌کردن تست دستکاری نکرد.

برای تمام specها، مقدارهای ثبت‌شده `isInteractive=true`، `browser.isHeaded=true` و `browser.isHeadless=false` هستند. تصویر desktop واقعی نیز ذخیره شد؛ صرف موفقیت spawn مبنای تأیید نبود.

## نتایج همین جلسهٔ قابل مشاهده

| Spec | Tests | Passed | Failed | Pending / Skipped |
|---|---:|---:|---:|---|
| browser/smoke.cy.js | 4 | 4 | 0 | 0 / 0 |
| browser/contact-trust.cy.js | 2 | 2 | 0 | 0 / 0 |
| browser/stages.cy.js | 3 | 3 | 0 | 0 / 0 |
| controlled/handoff.cy.js | 4 | 4 | 0 | 0 / 0 |
| browser/navigation.cy.js | 29 | 27 | 2 | 0 / 0 |
| **جمع** | **42** | **40** | **2** | **0 / 0** |

این‌ها نتیجهٔ تست‌های subset هستند، نه تأیید کامل ۳۰ کیس. تست‌های controlled به معنی handoff واقعی OS، تب خارجی یا خرابی واقعی سرویس نیستند. specهای requirements و roleهای ساختگی انتخاب نشدند؛ سیاست checkout، مرجع اینماد و manifest محتوا همچنان حل‌نشده‌اند. نگاشت هر ۳۰ کیس و محدودیت‌ها در [گزارش اجرای اصلی](EZPOST_QA_PHASE2_M01_CYPRESS_EXECUTION_2026-11-14.md) باقی است.

## دو شکست حفظ‌شده

هر دو مربوط به N02-TC04 در navigation.cy.js هستند:

- PRODUCT header → `/#how-it-works`: URL و main درست‌اند، اما top عنوان حدود 2346.36 در برابر viewport height=900 است.
- PRODUCT header → `/#contact`: URL و main درست‌اند، اما top عنوان حدود 2850.58 است.

این شکست‌ها در حالت **تعاملی و headed** هم رخ دادند؛ بنابراین صرفاً مختص headless نیستند. بررسی مستقل Chrome خارج از Cypress در گزارش قبلی موفق بود؛ علت قطعی تعامل Cypress/برنامه هنوز روشن نیست و باگ قطعی محصول یا معیار پذیرش مصوب اعلام نشده است. هیچ assertion حذف یا تضعیف نشد. حد ۴ ثانیه timeout ابزار است، نه SLA محصول.

در پایان همین navigation.cy.js با **۲۷ موفق و ۲ ناموفق** داخل runner باز ماند. کاربر می‌تواند روی دو ردیف ناموفق N02-TC04 کلیک و command log و snapshot را بررسی کند؛ برای شروع اجرا در این جلسه کلیک دستی لازم نبود.

## شواهد و تکرار

مسیر کامل جلسه:

`QA/Evidence/M01-Cypress/2026-11-14/interactive-1794683210666/`

فایل‌های اصلی: `launch.json`، `cypress-open.log`، `spec-list.json`، `visible-results.json`، `interactive-verification.json`، `windows-final.json`، `desktop-chrome.png`، `desktop-final.png` و تصاویر نتیجهٔ هر spec. زمان شروع/پایان و تمام عنوان‌ها، stateها، errorها و حالت headed در visible-results.json موجود است. پنجره‌ها و browser بسته نشدند.

برای اجرای تعاملی بعدی، از ریشهٔ پروژه:

```powershell
npm.cmd run open:m01
```

این دستور از `scripts/open-m01.cjs` استفاده می‌کند؛ همان برنامهٔ محلی با config موجود، Chrome و پوشهٔ evidence جدید باز می‌شود. اگر پنجرهٔ انتخاب spec نمایش داده شد، `cypress/e2e/m01/browser/smoke.cy.js` را انتخاب کنید. بازشدن برنامه به‌تنهایی نتیجهٔ تست نیست. دستورهای headless قدیمی در README به‌عنوان روش تاریخی مشخص شده‌اند و روش فعلی M01 نیستند.

تغییرات این مرحله محدودند به helper اجرای visible، script مربوط در package.json، راهنمای اجرا و گزارش/شواهد تاریخ‌دار؛ کد تست و نیازمندی محصول تغییر نکرد. بررسی نحوی helper و بررسی ایستای موجود انجام شد. نصب مجدد، تغییر دادهٔ برنامه، SMS/فرم/account/cart/order/payment، M02، Git، commit یا push انجام نشد.

