# SQ-01 — اجرای محدود در Chrome نمایان، ۱۸ نوامبر ۲۰۲۶

**نتیجهٔ بررسی shipping: BLOCKED / NOT EVALUATED. نتیجهٔ واقعی runner: صفر PASS و یک FAIL. بازگردانی سبد و draft: موفق و مستقلاً تأییدشده.** هیچ درخواست واقعی shipping از guard عبور نکرد و هیچ responseِ shipping دریافت نشد؛ بنابراین مقایسهٔ مبلغ ارسال، total و ریال اجرا نشده است. این نتیجه، باگ قیمت یا shipping برنامه را تأیید نمی‌کند.

اجرای این مرحله از همان [preflight تکمیل‌شده](EZPOST_QA_SQ01_PREFLIGHT_2026-11-18.md) ادامه یافت؛ preflight عمومی تکرار نشد. workspace فقط Desktop EZPost و مبنای کد مخزن `5c24c5cf1c7cc4aad00e3e8f0d6ddc1c90b05b02` بود. کد و نتایج این الحاق محلی‌اند؛ commit/push انجام نشده است. [خلاصهٔ اجرای سانیتایزشده](../Evidence/SQ01-Live-2026-11-18/chrome-sq18a/execution-summary.json) مرجع ماشین‌خوان نتیجه است.

## مجوز و قرارداد همین اجرا

کاربر محیط و نشانی تست قبلی را تأیید و **حداکثر یک quote واقعی، شامل auto-trigger از edit/mount، بدون retry** را مجاز کرد. برای همین بازه نیز single-writer تازه صریحاً تأیید شد. نمونه دقیقاً `blackfriday-ezpost`، بسته۶۳ با۱۴۰لیبل، تعداد۲ و درمجموع۲۸۰لیبل، با مقصد تهران/تهران و جزئیات نارمکِ واردشده توسط کاربر بود. private recipient/address/postal فقط در browser اختصاصی و حافظهٔ تست مقایسه می‌شوند.

انتظار این subset، همبستگی quote تازه با intent و سبد ثابت و سپس سازگاری `shipping_irr` با shipping نمایان، `total_irr` با مبلغ نهایی و واحد ریال برای هر دو است. منبع این انتظار درخواست صریح کاربر و نگاشت client در preflight است. **صحت تعرفه طبق دستور جدید مفروض و خارج از scope است؛ نه BLOCKED به‌دلیل نبود reference، نه صحت مستقل تأییدشده.** هیچ reference قیمت تازه‌ای درخواست نشد.

شروع مجاز به baseline زنده و بدون cart/draft قبلی وابسته بود؛ دادهٔ موجود برای ساخت نمونه پاک نمی‌شد. مقدار نهایی نباید از quote بازیابی‌شده یا subtotal fallback بیاید. tariff formula، وزن ساختگی، service انتخابی حدسی یا شرط `total != subtotal` ساخته نشد؛ quote تازه با ارسال صفر نیز ممکن است عددی برابر subtotal داشته باشد.

## چه چیزی واقعاً اجرا شد

| مرحله | نتیجه و حد ادعا |
|---|---|
| برنامهٔ Cypress | بازشدن application، اتصال به Chrome و foreground/visible بودن پنجره جدا ثبت شدند. Cypress نصب‌شده۱۶.۲.۱ و Chrome اجراشده `157.0.8103.79`، `isHeadless=false` بود. |
| spec | `cypress/e2e/checkout/shipping-quote.cy.js` در runner واقعی بارگذاری و اجرا شد؛ اجرای headless نبود. |
| ورود | manual-assisted؛ یک OTP start موفق و یک verify موفق، بدون resend. session و `/me` هویت عادیِ موردنظر را مستقل تأیید کردند. اینکه normal flow حساب تازه ساخته یا وارد حساب موجود شده، از شواهد سانیتایزشده تعیین نشده است. |
| baseline | cart اولیه خالی و draft نشانی/active-order در مرورگر جدید absent بودند؛ مقادیر خصوصی صادر نشدند. guard پیش از اولین visit نصب و reservation پایدار Node قبل از navigation انجام شد. |
| انتخاب و Add | بسته۶۳/۱۴۰لیبل/quantity۲ مستقل از fixture با دستور کاربر مقایسه شد؛ request/response quote محصول، کنترل انتخاب، تعداد و labelها بررسی شدند. یک Add معمولی و ownership خط جدید با baseline، پاسخ موفق و single-writer برقرار شد. این quote محصول، shipping quote نیست. |
| checkout | فرم واقعی و summary همان قلم دیده شدند؛ تهران/تهران از گزینه‌های موجود انتخاب شد؛ cart پیش از handoff تغییر نکرده بود و fieldهای خصوصی ابتدا خالی بودند. |
| ورود نشانی | handoff برای ورود مستقیم دادهٔ خصوصی انجام شد. guard عملیاتی این نسخه ورود مستقیم چهار field و «postal آخر» را نیز الزام می‌کرد؛ این ترتیب، محدودیت ابزار اجرا بود و requirement محصول نیست. هیچ مقدار نشانی/گیرنده در evidence گزارش نشده است. |
| توقف اصلی | در `2026-11-18T19:42:44.988Z` اولین failure قبل از teardown ثبت شد: `Error`، `errorCode:null`، actual path برابر `/checkout`، یک فرم نمایان و field فوکوس‌شده street-address. guard یک عملیات را مسدود ثبت کرد؛ shipping budget مصرف نشده بود. |
| shipping | تعداد درخواست‌های مجاز واقعی shipping صفر، response صفر، retry صفر. assertionهای مبلغ/واحد پس از quote اجرا نشدند و برای آنها PASS یا application FAIL ثبت نمی‌شود. |
| Remove و restore | همان قلم proven-owned یک بار با UI عادی حذف شد؛ بعد Remove، session و `/me` و cart/draft بررسی شدند. recovery دستی لازم نشد. |
| وضعیت نهایی | runner یک تست failed دارد؛ صفر passed/pending/skipped/notRun. پنجرهٔ Cypress و Chrome باز ماندند. هیچ اجرای دوباره‌ای شروع نشد. |

فرمان‌های واقعی:

```powershell
node scripts/open-shipping-quote.cjs sq18a --single-writer-confirmed
node scripts/drive-shipping-visible.cjs chrome QA/Evidence/SQ01-Live-2026-11-18/chrome-sq18a 50413 4884
```

launcher از `cypress open --e2e --browser chrome --project <EZPost> --config-file cypress.shipping.config.cjs` استفاده کرد؛ dependency نصب/ارتقا داده نشد. Chrome در بازهٔ handoff نمایان بود؛ sampling، اثبات visibility پیوسته بین تمام نمونه‌ها نیست.

## شکست اصلی و teardown جدا هستند

[first-main-failure](../Evidence/SQ01-Live-2026-11-18/chrome-sq18a/driver-7656-1795030784901/first-main-failure.json) خطای اصلی را پیش از cleanup حفظ کرده است؛ آخرین command مشاهده‌شده `wait` است. **نوع دقیق عملیات ردشده و شرط دقیق deny ذخیره نشده‌اند.** whitelist تشخیصی قدیمی codeهای جدید `SHIPPING_*` و phaseهای shipping را کامل پوشش نمی‌داد؛ از focus روی street-address نمی‌توان ثابت کرد علت، ترتیب fieldها، mismatch مقصد، submit یا شاخهٔ دیگری بوده است. نباید این را خرابی provider، اعتبار نشانی، پاسخ shipping یا نقص خود برنامه نامید.

[first-hook-failure](../Evidence/SQ01-Live-2026-11-18/chrome-sq18a/driver-7656-1795030784901/first-hook-failure.json) جداست: assertion ایمنی `noForbiddenWriteAttempted` به‌علت `blockedMutations=1` failed شد. این assertion **پس از** تمام checkهای موفق Remove/session/me/cart/draft اجرا شده است؛ exception مانع رسیدن helper به `cleanup('restored')` شد. به همین دلیل label خام `removing-owned` باقی مانده، ولی به‌معنی باقی‌ماندن قلم یا draft نیست. hook را PASS معرفی نمی‌کنیم و label خام را بازنویسی نکرده‌ایم.

[بازبینی مستقل پس از Remove](../Evidence/SQ01-Live-2026-11-18/chrome-sq18a/independent-restoration.json)، ساعت `19:48:21Z`، با سه GET خواندنی تازه در همان نشست، این موارد را تأیید کرد: همان ordinary session، `/me` مستقل، cart اولیهٔ خالی، نبود address draft و active-order draft و موفقیت oracle موجودِ combined restoration. **بازگردانی وضعیت موفق است؛ assertion ایمنی teardown همچنان FAIL باقی می‌ماند.** این verification هیچ quote، OTP، Add/Remove یا mutation تازه‌ای نفرستاد.

## کد و شواهد تحویل

slice اختصاصی ساخته شد تا guardهای read-only و checkout قبلی تغییر نکنند:

- [spec SQ-01](../../cypress/e2e/checkout/shipping-quote.cy.js)، [support اختصاصی](../../cypress/support/shipping-quote.js)، [oracle و budget محلی](../../cypress/support/shipping-quote-contract.cjs) و [config](../../cypress.shipping.config.cjs).
- launcher، source hashing و observer/driver اختصاصی در `scripts/open-shipping-quote.cjs`، `shipping-quote-source.cjs`، `drive-shipping-visible.cjs` و `shipping-quote-driver-common.cjs`؛ ownership/auth/cleanup و observer ساختاری موجود reuse شدند.
- [نتیجهٔ خامِ سانیتایزشدهٔ runner](../Evidence/SQ01-Live-2026-11-18/chrome-sq18a/driver-7656-1795030784901/shipping-quote-results.json)، [progress](../Evidence/SQ01-Live-2026-11-18/chrome-sq18a/driver-7656-1795030784901/progress.json) و دو failure جدا حفظ شدند.
- [source manifest](../Evidence/SQ01-Live-2026-11-18/chrome-sq18a/source-manifest.json) با source ID برابر `f0d4e0dd4147527ecc339d69c391eb59fbf3e65f73f3b4f664de5e9e1d64601e`؛ هر۳۹ فایل اجراشده، با همان bytes، در [executed-source](../Evidence/SQ01-Live-2026-11-18/chrome-sq18a/executed-source) آرشیو و بعد اجرا با hash تطبیق داده شدند. source پس از اجرا تغییر نکرده است.

پاسخ خام شبکه، bodyهای session، phone، OTP، cart IDs، recipient/postal/address در خروجی عمومی، fixture، screenshot یا recording ذخیره نشدند. auto screenshot/video غیرفعال و XHR/fetch logging با الگوی رسمی Cypress خاموش بود؛ stdout/stderr خام child دور ریخته شد. runtime اختصاصی زیر `.publication/private/` محلی و git-ignored است.

## checks محلی و محدودیت پوشش

[local-checks](../Evidence/SQ01-Live-2026-11-18/local-checks.json) نتیجهٔ syntax هشت فایل جدید و oracle مصنوعی با **۱۶ check مثبت و۱۴۶ check منفی** را ثبت می‌کند. checker مقدار اشتباه، currency اشتباه، field مفقود/نامعتبر، quote unquoted/loading، subtotal fallback و مجوز دومِ budget را رد می‌کند؛ numeric string و اعشار مطابق formatter واقعی پشتیبانی می‌شوند، نه سیاست قیمت ساخته‌شده. source/auth/ownership موجود نیز checks مربوط خود را گذراندند:۱۵ syntax، ownership۳۱مثبت/۸۲منفی و auth۴۷مثبت/۴۳منفی. این‌ها pure/static هستند؛ PASS shipping یا اجرای controlled UI محسوب نمی‌شوند.

در review دوم، سؤال «آیا با خرابی رفتار مدعی‌شده ممکن است تست سبز شود؟» روی نمونهٔ ثابت، درخواست تازه، destination، loading/fallback و currency اعمال شد. نمونهٔ ثابت مستقل assert و submit capture با `stopImmediatePropagation` تقویت شد. بااین‌حال محدودیت واقعی diagnostics این اجرا محفوظ است؛ این review ادعای نبود همهٔ false positiveها نیست.

همهٔ IDها و traceability شش case اصلی حفظ شده‌اند. تنها SQ-01 در scope نمایش پیاده شد؛ SQ-02…06 اجرا یا سبز نشده‌اند. نتایج قبلی دو PASS هدفمند، failureهای تاریخی، `CF-INV01` و `P10-ORD01/02` تغییر نکرده‌اند. هیچ form submit، save نشانی به حساب، order یا payment از guard عبور نکرد. فقط Add/Remove اثبات‌شدهٔ همین run و auth مجاز انجام شدند.

## نقطهٔ توقف

طبق محدودیت no-retry، پس از توقف هیچ quote یا اجرای دوباره‌ای انجام نشد. **SQ-01 نمایش BLOCKED است، تعرفه مفروض/خارج از scope و restoration موفق است.** پیش از تلاش آینده باید ابزار، category/code رد را بدون private payload پیش از throw حفظ کند و محدودیت ترتیب fieldها با handoff مطمئن تکمیل نشانی بازبینی شود؛ این موارد مشکل ابزار/آمادگی اجرا هستند، نه requirement مالی یا باگ تأییدشدهٔ برنامه. در این batch برای رفع gapها، live attempt دیگری شروع نمی‌شود و reference قیمت درخواست نمی‌شود.
