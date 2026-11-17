# اجرای انتقال سبد احرازشده به فرم واقعی checkout

تاریخ: ۱۷ نوامبر ۲۰۲۶. پروژه: Desktop EZPost؛ برنامه: `http://172.16.30.198:5800/`. این گزارش فقط batch مربوط به `ACO-H01` است. ورود manual-assisted و assertionهای پس از آن خودکارند؛ OTP journey کاملاً خودکار گزارش نمی‌شود.

مسیر واقعی در Chrome و Firefox اجرا شد: مهمان خالی ← ورود عادی با شماره و OTP که کاربر مستقیماً وارد کرد ← بررسی مستقل session/me در برابر anchor خصوصیِ شمارهٔ submitشده ← خواندن سبد اولیه ← انتخاب محصولِ کاملاً غایب از baseline ← quote مربوط به انتخاب مشخص ← یک Add عادی ← اثبات خط جدید owned ← سبد پُر ← فرم واقعی نشانی و بازبینی ← Remove عادی همان خط ← بازگشت سبد به baseline.

## نتیجهٔ واقعی و نسخه‌ها

| تلاش | مرورگر | PASS | FAIL | Pending | Skipped | Not run | cleanup |
|---|---|---:|---:|---:|---:|---:|---|
| `chrome-handoff-initial-01` | Chrome 157.0.8103.78 | ۰ | ۱ | ۰ | ۰ | ۰ | نیاز نبود؛ قبل از OTP و Add متوقف شد |
| `chrome-handoff-ready-01` | Chrome 157.0.8103.78 | ۱ | ۰ | ۰ | ۰ | ۰ | خط owned حذف و baseline دقیقاً بازگردانده شد |
| `firefox-handoff-ready-01` | Firefox 160.0 | ۱ | ۰ | ۰ | ۰ | ۰ | خط owned حذف و baseline دقیقاً بازگردانده شد |

Cypress نصب‌شدهٔ محلی **16.2.1** بود. هر سه تلاش در `cypress open --e2e` و مرورگر نمایان انجام شدند؛ application-opened، spec-loaded و tests-completed جداگانه در artifactها ثبت‌اند. تعداد جدول، journey است؛ هفت checkpoint به هفت تست مستقل تبدیل نشده‌اند. جمع تاریخی این batch: **۳ اجرای journey، ۲ PASS و ۱ FAIL**. نسخهٔ نهایی: یک PASS در هر مرورگر.

Source ID نهاییِ مشترک Chrome/Firefox:

`408f43d4b339b1a3bcb69030b2ae9094cd0d366438b090365f28fe5bf3d6f527`

Source ID تلاش اولیه:

`6aca1f5e3f878a66e18f15fea0e556df55756b3e678ce8b38595fcd4d957647a`

در هر اجرای نهایی دقیقاً یک OTP start، یک verify، یک Add و یک Remove مجاز انجام شد. ایجاد حساب جدید در برابر ورود به حساب موجود از پاسخ موجود تفکیک نشد. هیچ شماره، OTP، id حساب/خط، cookie، token، session body، نشانی واقعی یا screenshot احرازشده در شواهد عمومی ثبت نشده است.

## پوشش و اوراکل

| checkpoint | assertion اجراشده | حد ادعا |
|---|---|---|
| ACO-CP01 | مهمان واقعی پیش از ورود؛ start/verify دستی؛ session و me با anchor مستقل و role=customer؛ لینک حساب authenticated | dashboard mobile/role دوباره اجرا نشد؛ PASS قدیمی AUTH-SESSION01 محفوظ است |
| ACO-CP02 | snapshot خصوصی شناسه/configuration/quantity قبل از write؛ نبود کل محصول candidate | تمام DOM اقلام قبلی بررسی نشد؛ preservation از server-cart انجام شد |
| ACO-CP03 | Black Friday/package49، ۱۲۰ لیبل در بسته، quantity۲؛ پاسخ quote متناظر و package/quantity/labels/amount نمایشی | consistency ارائه؛ مرجع مستقل قیمت تجاری نیست |
| ACO-CP04 | exactly one id جدید با slug/package/no-artwork درست؛ quantity درست؛ baseline بدون تغییر؛ UI نام/labels/quantity/amount درست | merge policy عمومی از این سناریوی بدون برخورد نتیجه‌گیری نمی‌شود |
| ACO-CP05 | کلیک لینک ادامهٔ واقعی در order-summary؛ `/checkout` و فرم واقعی؛ همان cart intent؛ review نام/quantity/amount خط owned | review فاقد package-id/labels است؛ assertion بسته در cart و دادهٔ خصوصی upstream انجام شد |
| ACO-CP06 | چهار field واقعی، دو کنترل province/city و مرز shipping/order؛ metadata بدون مقادیر | در این batch فرم ویرایش یا submit نشد؛ تست تفصیلی فرم batch جداست |
| ACO-CP07 | normal Remove فقط id اثبات‌شدهٔ owned؛ server-cart baseline و نبود draft/order محلی؛ identity همان؛ blocked writes صفر | cleanup هیچ قلم ناشناخته یا قبلی را حذف نمی‌کند |

شناسهٔ هدف از Add response حدس زده نشد؛ از مقایسهٔ GET cart قبل/بعد یک اقدام عادی اثبات شد. 401/fallback به سبد محلی، id موجود، محصول/بسته/تعداد اشتباه، افزودن چند خط یا تغییر اقلام قبلی باید fail شوند. id قبل از assertion سخت تعداد برای cleanup ثبت می‌شود؛ quantity مثبت اشتباه امکان fail همراه cleanup امن دارد.

## فرم واقعاً مشاهده‌شده و مرز write

| کنترل واقعی | قرارداد native مشاهده‌شده |
|---|---|
| name، input text | required، minlength۲، maxlength۱۲۰ |
| tel، input text | required، pattern `09[0-9]{9}`، maxlength۱۱ |
| postal-code، input text | required، pattern `[0-9]{10}`، maxlength۱۰ |
| street-address، textarea | required، minlength۱۰، maxlength۳۰۰ |
| province/city | دو کنترل سفارشی نمایان؛ select native پنهان برای action استفاده نمی‌شود |

DOM فرم پُر واقعاً مشاهده شد. جزئیات side effectها از client عمومیِ GETشدهٔ `/_nuxt/components/screens/checkout.tsx`، `/_nuxt/components/checkout-select.tsx` و cart به دست آمد؛ این source قرارداد پیاده‌سازی client است و جای مصوبهٔ محصول یا اثبات side effectهای backend را نمی‌گیرد.

- هر ویرایش فرم، حتی ناقص، `ezpost_checkout_address` را در sessionStorage می‌نویسد.
- نشانی کامل می‌تواند پس از ۵۰۰ms به‌طور خودکار `POST /api/v1/shipping/quote` بفرستد. بی‌اثربودن سروری این POST ثابت نشده؛ guard آن را مجاز نمی‌کند.
- دکمهٔ shipping از نوع button است؛ در این batch کلیک نشد.
- دکمهٔ `.checkout-submit-btn` submit است و مسیر معتبر آن می‌تواند `POST /api/v1/checkout` و ایجاد/ادامهٔ سفارش را شروع کند؛ کلیک نشد و مجاز نیست.
- Remove عادی cart، draft/order محلی را نیز پاک می‌کند. نبود هر دو کلید **پیش از Add** پیش‌شرط بود؛ هیچ draft قبلی پاک نشد.
- endpoint جداگانهٔ ذخیرهٔ profile/address در این component یافت نشد؛ این یافته اثبات نبود چنین قابلیتی در کل برنامه نیست.

## شکست اولیه و اصلاح محدود

اولین Chrome در `/cart` روی `cy.wait('@guestSession')` با پنجرهٔ پیش‌فرض ۵۰۰۰ms برای شروع درخواست fail شد. پس از failure، درخواست واقعی session با 200 و empty-cart نمایان مشاهده شد؛ بیش از صد GET ماژول توسعه قبل از آن بارگذاری شده بودند. هیچ OTP، Add یا cleanup تغییردهنده‌ای رخ نداد.

اصلاح فقط `requestTimeout: 30000` برای انتظار **اولین hydration/session** بود؛ response/identity/empty-cart oracle تغییر نکرد. assertionها ضعیف، force یا exception suppression اضافه نشدند. تلاش اولیه، نتیجه و تحلیل آن حفظ شدند. این failure به‌عنوان **test/setup synchronization failure** ثبت شد؛ defect برنامه از آن تأیید نشده است. P10 و شکست‌های تاریخی باز و بدون تغییرند.

## شواهد و بازتولید

- [تلاش اولیه و تحلیل failure](../Evidence/Authenticated-Checkout-2026-11-17/chrome-handoff-initial-01/failure-analysis.json)
- [Chrome نهایی](../Evidence/Authenticated-Checkout-2026-11-17/chrome-handoff-ready-01/launch.json)
- [Firefox نهایی](../Evidence/Authenticated-Checkout-2026-11-17/firefox-handoff-ready-01/launch.json)
- [metadata واقعی فرم](../Evidence/Authenticated-Checkout-2026-11-17/chrome-handoff-ready-01/rendered-form-metadata.json)
- [کنترل‌های isolated](../Evidence/Authenticated-Checkout-2026-11-17/isolated-oracle-checks.json)
- [کنترل ایستا](../Evidence/Authenticated-Checkout-2026-11-17/static-checks.json)
- [قرارداد پیش از کد](../Test-Cases/EZPOST_QA_AUTHENTICATED_CHECKOUT_TEST_CASES.md)
- [بازبینی مستقل کد](EZPOST_QA_AUTHENTICATED_CHECKOUT_AUTHORING_REVIEW_2026-11-17.md)

در هر پوشهٔ اجرا، `source-manifest.json` و زیرپوشهٔ `driver-*` شامل نتیجهٔ completed، progress boolean، source-checks و تأیید پنجرهٔ واقعی است. stdout/stderr خام discard شدند؛ profile/TEMP/APPDATA فقط در runtime نادیده‌گرفته‌شدهٔ همان workspace ماندند. پنجره‌های نهایی برای بررسی کاربر باز نگه داشته شدند؛ برای batch بعدی ممکن است فقط Firefox اختصاصی قبلی برای آزادکردن debugger بسته شود.

```powershell
node scripts/check-authenticated-checkout-static.cjs
node scripts/check-authenticated-checkout-contract.cjs
node scripts/open-authenticated-checkout.cjs chrome <fresh-label> handoff
node scripts/open-authenticated-checkout.cjs firefox <fresh-label> handoff
```

launcher از Cypress نصب‌شده استفاده می‌کند. سپس در UI spec `cypress/e2e/checkout/authenticated-cart-checkout.cy.js` انتخاب می‌شود و کاربر phone/OTP را مستقیم وارد می‌کند. اجرای مجدد یک OTP و تغییر owned-cart واقعی دارد؛ دستورهای بالا dry-run نیستند.

بررسی ایستا: syntax سیزده فایل، حفاظت byte-identical پانزده فایل تاریخی/dependency، runtime ignore و نبود skip/force/exception suppression. کنترل pure: **۱۲ مثبت و ۳۱ منفی PASS**، جدا از E2E؛ quantity اشتباه، identity اشتباه، merge ناشناخته، baseline تغییرکرده و restoration ناقص رد می‌شوند. این بررسی اثبات ناممکن‌بودن همهٔ false positiveها نیست.

## موارد باقی‌مانده

تست‌های browser-only فرم در batch جدا طراحی/اجرا می‌شوند. custom validation مبتنی بر submit، نشانی کامل و shipping، persistence profile/address، review نهایی با مبلغ payable مستقل، ایجاد سفارش و پرداخت اجرا نشده‌اند. برای persistence به دادهٔ test-owned و روش restore پشتیبانی‌شده؛ برای order به قرارداد timing/idempotency/cleanup و مجوز دقیق؛ برای payment به sandbox/provider/outcome/reconciliation مجاز نیاز است. این batch پوشش کامل ordering/payment E2E نیست.
