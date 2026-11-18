# آماده‌سازی rerun هدفمند checkout — ۱۸ نوامبر ۲۰۲۶

workspace مستقل `Desktop/EZPost` و remote دقیق `https://github.com/void-fatima/ezpost-e2e-tests` بررسی شدند. پس از `git fetch origin`، آخرین `origin/main` همچنان `e044f7c386041894a50d3a6a717890a80378de6b` بود. در شروع، working tree پاک بود و تغییر محلی برای جابه‌جایی وجود نداشت. شاخهٔ مستقل این بسته `prepare/checkout-targeted-rerun-2026-11-18` است. `AGENTS.md` در workspace یا ancestorهای آن یافت نشد.

[راهنمای ادامه](EZPOST_QA_CONTINUATION_GUIDE.md) و [investigation شکست‌های دقیق](EZPOST_QA_CHECKOUT_FAILURE_INVESTIGATION_2026-11-18.md) خوانده شدند. این بسته **آماده‌سازی و توقف پیش از اجرای زنده** است؛ دو تأیید صریح لازم هنوز ارائه نشده‌اند. زمان artifactها UTC است. هیچ launcher، اتصال به runner قدیمی، OTP، resend یا cart write انجام نشد.

## ۱. نتیجهٔ واقعی آماده‌سازی

| بررسی | نتیجه | حد پوشش |
|---|---|---|
| `node scripts/check-checkout-failure-diagnostics.cjs` | PASS؛۱۸۰ assertion در۱۸ گروه | pure/VM محلی، بدون مرورگر یا درخواست برنامه |
| `node scripts/check-checkout-observer.cjs` | PASS؛۶۷ assertion در۶ گروه | تزریق observer با event/DOM doubles؛ اجرای واقعی Cypress نیست |
| GET عمومی `/` و `/products/blackfriday-ezpost` | هر دو HTTP200؛ redirect دنبال نشد | دسترسی HTTP؛ JavaScript یا DOM رندرشده اجرا نشده |
| GET عمومی `/api/v1/products/blackfriday-ezpost` | HTTP200؛ slug/name، package63 یکتا و۱۴۰ labels/package مطابق fixture | تطابق هویت عمومی؛ قیمت مستقل، کنترل‌های زنده و baseline حساب تأیید نشده |
| gate عملی اجرای زنده | STOP | تأیید تیم برای بازیابی OTP/تلاش مجاز همان هویت و single-writer تازه هر دو مفقودند |

[diagnostic-checks.json](../Evidence/Checkout-Rerun-Preparation-2026-11-18/diagnostic-checks.json) خروجی کامل دو فرمان، زمان و SHA-256 سه فایل ابزار خارجی را نگه می‌دارد. [product-preflight.json](../Evidence/Checkout-Rerun-Preparation-2026-11-18/product-preflight.json) سه GET نهایی را با status، hash پاسخ و نتیجهٔ boolean مقایسه ثبت کرده است. یک GET اولیهٔ فقط schema نیز به همان API عمومی انجام شد؛ **جمع این آماده‌سازی چهار GET عمومی** است. raw body، cookie یا احراز هویت استفاده یا ذخیره نشد. یک تلاش اولیهٔ اجرای snippet محلی پیش از هر request به خطای quoting/SyntaxError رسید؛ با فایل محلی اصلاح شد و نتیجهٔ E2E یا failure برنامه شمرده نمی‌شود.

نکتهٔ fixture: `quantity=2` همچنان intent تست است. فیلد `packages[].name` در API با عنوان UI تاریخ‌دار fixture یکسان نیست (`publicPackageNameMatchesDatedUiTitle=false`). این دو فیلد قرارداد برابری مصوب ندارند؛ اختلاف، defect یا اثبات تغییر UI نیست. عنوان واقعی انتخاب‌شده در DOM در این batch بازبینی نشده است. assertion دقیق عنوان package، نام محصول، quantity و پاسخ quote مرتبط در spec موجود دست‌نخورده‌اند و در اجرای مجاز بعدی **پیش از Add** باید برقرار شوند؛ title یا expected value برای تطابق خودکار با API تغییر نکرد.

## ۲. آیا first failure پیش از teardown حفظ می‌شود؟

بازبینی خواندنی مستقل و دو challenge محلی، مسیر ثبت را تأیید کردند؛ نیازی به تغییر تازهٔ ابزار یا تست پیدا نشد:

- [observer](../../scripts/checkout-runner-observer.cjs) در handler هم‌زمان `fail` ابتدا ساختار AUT واقعی را می‌خواند و `recordFailure` را فراخوانی می‌کند؛ سپس در `finally` **همان error object اصلی** را دوباره throw می‌کند. خواندن DOM ناموفق نیز خطای تست را suppress یا جایگزین نمی‌کند.
- [factory](../../scripts/checkout-failure-diagnostics.cjs) تنها وقتی bucket خالی است first main/hook را ثبت می‌کند و snapshot مستقل می‌سازد. hook نمی‌تواند first main را بازنویسی کند. driver، [first-main و first-hook را در فایل‌های جدا](../../scripts/drive-checkout-visible.cjs) می‌نویسد؛ نوشتن دیسک ممکن است پس از شروع teardown باشد، اما context اصلی قبلاً در حافظه freeze شده است.
- در Chrome، `document.location.pathname` و navigation مشاهده‌شده از bookkeepingِ `gate.phase()` جدا هستند. form count، render boxهای loading/error، readyState و visibility/focus همان document در failure ثبت می‌شوند. redirect فقط با شاهد مسیر واقعی تفسیر می‌شود؛ نبود فرم به‌تنهایی loading/error/redirect را تعیین نمی‌کند.
- در Firefox، command:start، command:end و skipped جدا ثبت می‌شوند. ordinal و selectorهای دقیق address/province/city کمک می‌کنند نخستین عملیات تأییدنشده **از خط۱۱۹ (clear/valueMissing آدرس) به بعد** مشخص شود. command:end، proof مستقل موفقیت intent نیست؛ آخرین selector نیز لزوماً target assertion نیست. generic callback می‌تواند همچنان unclassified بماند؛ رسیدن به province menu فرض نمی‌شود.

این تأیید **محلی و بر پایهٔ code/VM** است؛ موفقیت capture در مرورگر آینده هنوز اجرا نشده است. observer پس از تشخیص spec نصب می‌شود و early lifecycle ممکن است دیده نشده باشد؛ metadata نصب این محدودیت را گزارش می‌کند. در run آینده باید پیش از ورود دستی، نصب و فعال‌بودن observer تأیید شود. history محدود و dropped-count دارد؛ Resource Timing همهٔ `cy.request`های Node را نمی‌بیند. render box و aggregate animation دکمه‌ها proof actionability یا ownership نیستند. sampling۵۰۰ms و checkpointهای restore، استمرار foreground/visibility را ثابت نمی‌کنند؛ پنجرهٔ اختصاصی باید عملاً visible و foreground نگه داشته شود.

## ۳. gateهای مفقود و وضعیت دو مرحله

| پیش‌نیاز | وضعیت فعلی | اطلاعات دقیق لازم |
|---|---|---|
| بازیابی OTP/مجوز تلاش پس از429 | **MISSING** | تأیید صریح از تیم EZPost که بازیابی پشتیبانی‌شده انجام شده یا retry عادی برای همان هویت تعیین‌شده مجاز است؛ بدون انتشار شماره/OTP. گذشت زمان یا پایان countdown کافی نیست |
| انحصار عملی سبد در بازهٔ تازه | **MISSING** | تأیید تازه که از شروع ورود تا پایان cleanup، هیچ شخص/دستگاه/runner دیگری سبد همان حساب را تغییر نمی‌دهد؛ تأیید batch قبلی به این بازه تعمیم داده نشده |
| baseline زندهٔ pre-Add و ownership lifecycle | **NOT RUN** | پس از دو تأیید و ورود دستی: session و `/me` عادی همان هویت، snapshot واقعی سبد، نبود کل محصول fixture و draft/order از قبل، ثبات baseline بلافاصله پیش از Add؛ سپس فقط Add مجاز و موفق و خط جدید یکتا مطابق guard |

[execution-gate.json](../Evidence/Checkout-Rerun-Preparation-2026-11-18/execution-gate.json) این توقف را ثبت می‌کند. خواندن baseline حساب به نشست مجاز نیاز دارد؛ baseline مصنوعی یا برگرفته از cart فعلی با کم‌کردن قلم ساخته نشد.

| ترتیب / case | مرورگر و spec | application opened / spec loaded / tests executed در این batch | نتیجهٔ زندهٔ جدید |
|---|---|---|---|
| ۱ — ACO-H01 | Chrome؛ `authenticated-cart-checkout.cy.js`؛ handoff | خیر / خیر / خیر | **NOT RUN**؛ دو gate فوق مفقودند |
| ۲ — CF-F01 | Firefox؛ `customer-form.cy.js`؛ form | خیر / خیر / خیر | **NOT RUN**؛ همان gateها و اجرای مرحلهٔ اول هنوز انجام نشده‌اند |

جمع این batch: **۰ live PASS، ۰ live FAIL، ۲ مرحله NOT RUN**. این توقف، authentication setup failure تازه نیست چون OTP start ارسال نشده است. نتیجه‌های قدیمی regression همان **۶ attempt تکمیل‌شده،۲ PASS و۴ FAIL** هستند؛ static/diagnostic و GET عمومی به آن‌ها اضافه نشده‌اند. هیچ test به skip تبدیل نشده است.

## ۴. اجرای بعدی، فقط پس از عبور از gateها

labelهای کوتاه زیر هنگام آماده‌سازی مصرف‌نشده بودند؛ رزرو نشده‌اند و درست پیش از launch باید دوباره بررسی شوند. فرمان‌ها در این batch **اجرا نشدند**. flag زیر فقط پس از تأیید واقعی تازه مجاز است و lock سرور ایجاد نمی‌کند:

```powershell
node scripts/open-authenticated-checkout.cjs chrome r18h1 handoff --single-writer-confirmed
node scripts/open-authenticated-checkout.cjs firefox r18f1 form --single-writer-confirmed
```

هر بار فقط مرحلهٔ خودش باز شود: ابتدا Chrome ACO-H01، سپس Firefox CF-F01. از Cypress16.2.1 موجود با `cypress open --e2e` و config checkout استفاده شود؛ foreground، پنجرهٔ واقعی، spec و شروع/پایان تست جدا تأیید شوند. شماره و OTP فقط توسط کاربر مستقیم در همان مرورگر وارد شوند. observer قبل از handoff دستی فعال و diagnostic source پیش/پس از اجرا ثابت باشد. اگر attempt تازه HTTP429 گرفت، **تمام تلاش‌های OTP بعدی متوقف** و همان attempt به‌عنوان FAIL در authentication setup گزارش شود؛ Add و مراحل اجرا‌نشده NOT RUN بمانند. countdown مجوز resend تازه نیست.

Remove فقط پس از ownership اثبات‌شده، از کنترل عادی همان خط انجام شود. پس از پاسخ Remove، session و `/me` برای همان هویت و سپس cart/draft baseline مستقل بررسی شوند. شکست main و hook جدا حفظ شوند؛ force click یا ضعیف‌کردن expectation/timeout مجاز نیست. recovery دستی اگر لازم شد جدا گزارش می‌شود و FAIL را به PASS تبدیل نمی‌کند.

هیچ form submit، shipping quote، customer/profile/address save، سفارش یا پرداخت مجاز نیست. `CF-INV01` و `P10-ORD01/02` باز می‌مانند. در این بسته spec، support، fixture، assertion، timeout، dependency و evidence تاریخی تغییر نکرده‌اند؛ فقط نتیجهٔ آماده‌سازی و نقطهٔ توقف تازه ثبت شده است. تحویل remote پس از بازبینی staged diff، push شاخه و merge عادی باید از remote تازه تأیید شود؛ SHA مبنای بالا ادعای SHA نهایی این بسته نیست.
