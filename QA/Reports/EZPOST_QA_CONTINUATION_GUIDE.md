# راهنمای ادامهٔ EZPost روی سیستم دیگر

## نقطهٔ ادامهٔ جاری — اجرای rerun هدفمند، ۱۸ نوامبر ۲۰۲۶

از [گزارش اجرای هدفمند](EZPOST_QA_CHECKOUT_TARGETED_RERUN_EXECUTION_2026-11-18.md)، [خلاصهٔ ماشین‌خوان اجرای واقعی](../Evidence/Checkout-Targeted-Rerun-2026-11-18/execution-summary.json) و [بررسی‌های محلی همین تحویل](../Evidence/Checkout-Targeted-Rerun-2026-11-18/static-verification.json) شروع کنید. مبنای source این اجرا `1aca2f77a879d182994b96ed0b528c40ac5d888f` است؛ SHA نهایی انتشار نیست. برای دریافت checkpoint نهایی، remote `main` را تازه بررسی کنید. گزارش آمادگی و وضعیت NOT RUN آن در بخش تاریخی پایین مربوط به پیش از تأیید و اجرای این batch است.

**اجرای تازه کامل شد: ۲ تست live، ۲ PASS، صفر FAIL / pending / skipped / NOT RUN.** ابتدا Chrome `ACO-H01` با label `chrome-r18h1` و سپس، پس از تأیید restoration، Firefox `CF-F01` با label `firefox-r18f1` اجرا شدند. Cypress `16.2.1`، Chrome `157.0.8103.79` و Firefox `160.0` در حالت interactive و غیر headless بودند. بازشدن برنامه، بارگذاری spec و تکمیل تست برای هر دو جداگانه ثبت شده‌اند. این اجرای هدفمند، اجرای همهٔ caseها در هر دو مرورگر نیست.

کاربر retry عادی OTP برای همان هویت و عدم استفادهٔ هم‌زمان از سبد در همین بازه را صریحاً تأیید کرد؛ [gate همین اجرا](../Evidence/Checkout-Targeted-Rerun-2026-11-18/execution-gate.json) این تصمیم‌ها را بدون اطلاعات هویتی نگه می‌دارد. ورود در هر دو **manual-assisted** بود: یک OTP-start موفق و یک verify، بدون resend. حساب جدید یا موجود بودن آن از این شواهد تعیین نشده است. assertionهای هویت عادی، session و `/me` پس از ورود خودکار اجرا شدند؛ ورود دستی به‌عنوان OTP کاملاً خودکار گزارش نمی‌شود.

هر تست دقیقاً یک Add مجاز و یک Remove عادیِ قلم متعلق به run داشت. baseline زنده، نبود محصول fixture و draft پیش از Add، انتساب ownership و حفظ baseline بررسی شد. cleanup هر دو `restored` است؛ session و `/me` پس از Remove، cart معتبر، تطابق دقیق سبد اولیه و بازگردانی draft تأیید شده‌اند. recovery دستی لازم نشد و هیچ write ممنوع ثبت نشد. شماره، OTP، body نشست، کوکی، token، شناسهٔ خصوصی یا تصویر authenticated منتشر نشده است؛ runtimeهای خصوصی منتقل نمی‌شوند.

در Chrome، navigation واقعی `/checkout` و assertionهای فرم و summary موفق بودند. snapshot ساختاریِ هم‌زمان با assertion موفق ذخیره نشده است؛ این PASS علت failure تاریخیِ نبود فرم را تعیین نمی‌کند و پنجرهٔ چهارثانیه‌ای assertion، SLA محصول نیست. در Firefox، اجرای کامل از clear/valueMissing آدرس و checkpointهای بعدی عبور کرد؛ مرزهای ۱۲۱→۱۲۰ و ۳۰۱→۳۰۰ با رویداد native، بدون focus loss یا تعویض target موفق بودند. علت failure تاریخی هنوز معلوم نیست؛ province menu خراب اعلام نمی‌شود. `progress.pathname` bookkeeping است؛ مسیر واقعی از navigation observer خوانده شود.

observer پیش از هر دو تست نصب شد و main/hook failureها جدا و `null` ماندند. چون هیچ failure تازه‌ای رخ نداد، ثبت first failure پیش از teardown در یک failure واقعیِ تازه اثبات نشده؛ بررسی‌های منفی محلی جای آن نیستند. visibility در نمونه‌ها و در پایان visible/foreground بود؛ استمرار visibility اثبات نشده است. resource history محدود است و absence یک رکورد به معنای absence درخواست نیست. ۳۲ فایل manifest هر run و سه فایل diagnostics با source فعلی و checkpoint اجرا تطبیق SHA-256 دارند؛ assertion، timeout، fixture و guard تغییر نکردند.

**تاریخچه و قدم بعد:** batch قبلیِ regression همچنان ۶ تلاش، ۲ PASS و ۴ FAIL است؛ دو PASS تازه مستقل‌اند. `CF-INV01` و `P10-ORD01/02` بازند و این batch P10 را اجرا نکرده است. اجرای سفارش/پرداخت کامل نشده؛ submit فرم، shipping quote، ذخیرهٔ مشتری/نشانی/پروفایل، سفارش و پرداخت انجام نشده‌اند. اکنون اجرای بیشتری خودکار شروع نشود. برای run آینده تأیید single-writer تازه، ورود دستیِ همان هویت و baseline/ownership زنده لازم است؛ در صورت HTTP429 همهٔ تلاش‌های بعدی OTP متوقف شوند و بازیابی از مسیر پشتیبانی‌شده روشن شود. موفقیت این دو ورود، cooldown یا سیاست عمومی OTP را تعیین نمی‌کند. ادامهٔ دامنهٔ checkout بیرون از محدودیت‌های فعلی به تصمیم و مجوز مشخص نیاز دارد.

## checkpoint تاریخی — آمادگی rerun هدفمند، ۱۸ نوامبر ۲۰۲۶

ابتدا [گزارش آمادگی rerun هدفمند](EZPOST_QA_CHECKOUT_TARGETED_RERUN_PREPARATION_2026-11-18.md) و [شواهد همین آمادگی](../Evidence/Checkout-Rerun-Preparation-2026-11-18/) را بخوانید. checkpoint دریافت‌شدهٔ شروع این مرحله `e044f7c386041894a50d3a6a717890a80378de6b` است؛ SHA انتشار این الحاق نیست. پس از انتشار، آخرین remote `main` و SHA واقعی آن مرجع ادامه است. [بررسی علّت شکست‌ها](EZPOST_QA_CHECKOUT_FAILURE_INVESTIGATION_2026-11-18.md) و outcomeهای تاریخی پایین بدون تغییر معتبرند.

**هیچ اجرای live تازه شروع نشده: ۰ PASS، ۰ FAIL و ۲ NOT RUN.** Chrome `ACO-H01` / `handoff` و سپس Firefox `CF-F01` / `form` دو هدفِ اجرا‌نشده‌اند؛ چون launcher و auth شروع نشده‌اند، این وضعیت auth-setup FAIL نیست. preflight عمومی و بررسی‌های محلی، نتیجهٔ E2E یا رفع HTTP429 محسوب نمی‌شوند.

[دو بررسی محلی](../Evidence/Checkout-Rerun-Preparation-2026-11-18/diagnostic-checks.json) PASS شدند: diagnostics با ۱۸۰ assertion در ۱۸ گروه و observer با ۶۷ assertion در ۶ گروه. [preflight این مرحله](../Evidence/Checkout-Rerun-Preparation-2026-11-18/product-preflight.json) شامل یک GET اولیهٔ schema و سه GET نهاییِ ثبت‌شده است؛ جمعاً چهار GET عمومی با ۲۰۰، با تطابق slug/name و package63/labels140. DOM یا pricing مستقل بررسی نشده است. نام package در API با عنوان UI تاریخ‌دار یکسان نیست؛ این اختلاف، defect تأییدشده نیست و assertion UI را خودکار تغییر نمی‌دهد. تطبیق DOM واقعی همچنان پیش از Add لازم است. [gate اجرای تازه](../Evidence/Checkout-Rerun-Preparation-2026-11-18/execution-gate.json) هر دو تأیید زیر را missing ثبت می‌کند.

فقط دو تأیید بیرونی پیش از launcher/OTP/cart لازم است و هنوز موجود فرض نمی‌شود:

1. تأیید صریح تیم EZPost دربارهٔ روش پشتیبانی‌شدهٔ بازیابی OTP **یا مجازبودن retry برای همان هویت تعیین‌شده**؛ مدت cooldown، bypass یا هویت تازه حدس زده نشود.
2. تأیید عملی تازهٔ **single-writer برای بازهٔ همین اجرای جدید**؛ تأیید پیشین مربوط به اجرای قبلی است و lock فعلی سرور نیست.

پس از فراهم‌شدن هر دو، ورود تازهٔ manual-assisted با همان identity، label مصرف‌نشده و پنجرهٔ visible لازم است. baseline زندهٔ preAdd، session/me، نبود draft/محصول fixture و انتساب قطعی ownership باید داخل guardهای موجود دوباره بررسی شوند؛ این prerequisiteها با تأیید شفاهی یا PASS قدیمی جایگزین نمی‌شوند. در صورت HTTP429 آینده توقف لازم است و resend انجام نشود.

این آمادگی به تغییر فنی تازه در spec/support/fixture نیاز ندارد. observer خارجی فقط در حد local/VM بررسی شده و live-certified نیست؛ ثبت first failure، URL واقعی و visibility در اجرای آینده همچنان باید اثبات شود. `CF-INV01` و `P10-ORD01/02` باز هستند. هیچ سفارش، پرداخت، shipping quote یا save/submit مشتری/نشانی در دامنه قرار نگرفته است. فرمان‌های نصب/اجرا و checkpointهای زیر برای تاریخچه و انتقال محفوظ‌اند؛ از آنها برای عبور خودکار از دو مانع بالا استفاده نشود.

## checkpoint تاریخی — بررسی شکست‌ها، ۱۸ نوامبر ۲۰۲۶

ابتدا [بررسی شکست‌های Chrome H01 و Firefox CF](EZPOST_QA_CHECKOUT_FAILURE_INVESTIGATION_2026-11-18.md) و [شواهد investigation](../Evidence/Checkout-Investigation-2026-11-18/) خوانده شوند. مبنای شروع این بررسی `bba38588f2a25f21d9e4a03cf0a22a63464acb31` است؛ این SHA، شناسهٔ انتشار نهاییِ شامل همین الحاق نیست. پس از انتشار، آخرین `main` واقعی را با `git ls-remote origin refs/heads/main` بررسی و SHA دریافت‌شده را ثبت کنید. بخش تحویل همان روز در ادامه تاریخی است و با این بخش تکمیل می‌شود.

**این investigation هیچ اجرای تازهٔ Cypress، OTP یا cart write نداشته است.** نتیجهٔ batch پیشین **۶ تلاش completed، ۲ PASS و ۴ FAIL** بدون تغییر باقی است. بهبود diagnostics، موفقیت recovery یا GET عمومی به آن PASS جدید اضافه نمی‌کند. specها، supportها و fixtureهای اجراشده در این investigation تغییر نکرده‌اند؛ source manifestها و failureهای تاریخی محفوظ‌اند.

- **Chrome ACO-H01:** فرم واقعی در پنجرهٔ assertion موجود پیدا نشد. `pathname='/cart'` در progress از `gate.phase()` آمده و bookkeeping است؛ URL واقعیِ لحظهٔ failure یا redirect را ثابت نمی‌کند. ۲۵ public-module رکورد با `status:null` پس از teardown، زمان/علت requestهای failure را تعیین نمی‌کنند. علت render، transport، redirect یا synchronization هنوز تفکیک نشده است.
- **Firefox CF-F01 / f18c:** آخرین marker جدید، `native_street_address_valid` در `15:30:04.624Z` است. نخستین عملیات بعدیِ تأییدنشده **خط ۱۱۹، پاک‌کردن آدرس و بررسی valueMissing** است؛ رسیدن به Enter یا assertion منوی استان ثابت نشده است. markerهای boolean تکراری، completion اجرای دوم را نشان نمی‌دهند. assertion اولیه از خطای hook جداست؛ `removing-owned` زمان queuedشدن cleanup است، نه زمان کلیک. hydration سبد، animation دکمه و hiddenبودن مشاهده‌شدهٔ بعد از تست، شواهد مستقل‌اند و علت یکدیگر اثبات نشده‌اند.
- **Recovery Firefox:** Remove عادیِ خط owned توسط کاربر و verification مستقل identity/cart/draft موفق بود؛ این recovery outcome تست FAIL را تغییر نمی‌دهد. `windowProof()` پیش از ثبت، پنجره را restore می‌کند؛ checkpoint visible اولیه/نهایی، استمرار visibility حین اجرا را ثابت نمی‌کند.
- **HTTP429 / f18r:** یک start با ۴۲۹، دو رکورد Errored بدون status و verify صفر ثبت شده‌اند. header/Retry-After و سیاست پشتیبانی‌شدهٔ رفع محدودیت در شواهد نیست؛ مدت انتظار یا درمان سرور از شمارش معکوس UI استنتاج نشود.
- **preflight عمومی تازه:** [artifact ثبت‌شده](../Evidence/Checkout-Investigation-2026-11-18/product-preflight.json) سه GET نهایی با ۲۰۰ و تطابق عمومی slug/name/package63/labels140 را دارد. با سه GET اولیهٔ schema probe، جمع این مرحله شش GET عمومی است؛ فقط سه درخواست نهایی در این artifact مستندند. هیچ JavaScript/DOM، session، quote، OTP یا cart write بررسی نشده است؛ quantity۲ همچنان intent تست و pricing مستقل حل‌نشده است.

diagnostics جدید فقط observer خارجی است: first main/hook failure جدا، command context محدود و structural/network category سانیتایزشده را نگه می‌دارد و همان خطای اصلی را دوباره throw می‌کند. بررسی‌های مستقل محلی برای factory و نصب observer انجام شده‌اند؛ این‌ها **تأیید live، بازسازی علت failure یا PASS مرورگر نیستند**. دو بررسی تازه بدون اتصال برنامه یا SMS در سیستم مقصد قابل اجرا هستند:

```powershell
node scripts/check-checkout-failure-diagnostics.cjs
node scripts/check-checkout-observer.cjs
```

**قدم بعدیِ مجاز پس از فراهم‌شدن prerequisites:** rerun هدفمند **Chrome ACO-H01 و Firefox CF-F01** با همان هویت تعیین‌شده، ورود تازهٔ manual-assisted، تأیید عملی تازهٔ single-writer برای بازهٔ اجرا، label مصرف‌نشده، baseline زنده و پنجرهٔ واقعاً نمایان. رفع محدودیت auth باید از مسیر پشتیبانی‌شده روشن شود؛ این سند آن را موجود فرض نمی‌کند. اگر spec یا shared support تغییر کرد، slice متأثر در هر دو مرورگر با source نهایی یکسان دوباره لازم است. first failure پیش از teardown، URL واقعی و وضعیت همان لحظه ثبت شوند؛ موفقیت case دیگر جای آن rerun نیست.

هیچ ورود یا mutation خودکاری اکنون شروع نشده است. `CF-INV01` و `P10-ORD01/02` بازند؛ shipping quote، save/submit customer/address/profile، سفارش و پرداخت همچنان خارج از دامنه‌اند. راهنمای نصب و اجرا در بخش‌های تاریخی پایین برای انتقال محفوظ است؛ prerequisites و محدودیت‌های جاری همین بخش و گزارش investigation مقدم‌اند.

## تحویل تاریخی — رگرسیون و انتشار، ۱۸ نوامبر ۲۰۲۶

تحویل کد/نتیجه‌ها در commit `106733a62f10ee7d1355bd0dbed6562ef3c02098` و merge عادیِ main با SHA `9576ed8e2af3107c5c23e7132565a1017ef105db` از remote تأیید شد. این SHA، checkpoint source پیش از الحاق همین راهنماست؛ HEAD نهایی را با `git ls-remote origin refs/heads/main` بگیرید. [گزارش انتشار و بررسی clone مستقل](EZPOST_QA_CHECKOUT_PUBLICATION_2026-11-18.md) هر۹check موفق بدون نصب dependency/انتقال session و اصلاح local smudge filter را ثبت می‌کند.

مبنای regression جدید `146df24ebe66f24022b1b99d58160b32111ceb52` است؛ SHA نهایی انتشار باید از آخرین `main` واقعی گرفته شود و همین مبنا به‌عنوان final SHA تکرار نشود. ابتدا [گزارش اجرای۱۸ نوامبر](EZPOST_QA_CHECKOUT_REGRESSION_EXECUTION_2026-11-18.md)، [بازبینی correctness ابزار](EZPOST_QA_CHECKOUT_GUARD_REVIEW_2026-11-18.md) و الحاق‌های تاریخ‌دار [ACO-H01](../Test-Cases/EZPOST_QA_AUTHENTICATED_CHECKOUT_TEST_CASES.md) و [CF-F01](../Test-Cases/EZPOST_QA_CUSTOMER_FORM_TEST_CASES.md) خوانده شوند. بخش‌های تحویل۱۷ نوامبر در ادامه برای تاریخچه محفوظ‌اند؛ «gap فعلی» در آن بخش‌ها توصیف source همان روز است، نه حذف اصلاح‌ها و نتایج تازه.

آخرین batch در Cypress16.2.1، Node24.19.0، Chrome157.0.8103.79 و Firefox160.0 **نمایان و manual-assisted** اجرا شد. شش attempt تکمیل‌شدهٔ دو journey، **۲ PASS / ۴ FAIL** دارند؛ checkpointها test مستقل نیستند:

| attempt | نتیجهٔ واقعی | cleanup و محدودیت |
|---|---|---|
| Chrome H01 نخست؛ fixture تاریخی | FAIL، محصول404 پیش از Add | بدون قلم تازه؛ failure و fixture قدیمی محفوظ |
| Chrome H01، fixture جاری | FAIL، فرم در assertion موجودِ۴ثانیه‌ای پیدا نشد | Remove owned، هویت مستقل پس از حذف، baseline و draft PASS؛ علت readiness حل‌نشده |
| Chrome CF-F01 | PASS | native/correction/location/keyboard/narrow/draft و boundaryهای دقیق۱۲۱→۱۲۰ و۳۰۱→۳۰۰ و cleanup اجرا شدند |
| Firefox H01 | PASS | handoff، inventory فرم و post-Remove identity/cart/draft PASS |
| Firefox CF-F01، `f18c` | FAIL پس از native checks نزدیک بخش keyboard؛ teardown نیز پیش از Remove fail شد | Remove خودکار صفر؛ recovery جدا با Remove عادیِ کاربر و بررسی خودکار همان identity/baseline/draft PASS؛ تست همچنان FAIL. rapid boundary اجرا نشد |
| Firefox CF-F01 retry، `f18r` | FAIL در auth setup: start یک بار، HTTP429، verify صفر | Add و فرم اجرا نشدند؛ cleanup=`not-needed` |

source نهایی H01 در دو مرورگر `3e4b328d50aee40debdf673510377b3c375cfce73111eac99d2c1e15dafd413a` و source نهایی CF در دو مرورگر `e5803109613e63a5f45ed8ca3b62a2a86437e93dfedb3aeb7163dbdf657151a5` است؛ این دو source خانوادهٔ متفاوت‌اند و شش attempt یک suite شش‌کیسی نیستند. همهٔ owned Addهای این batch restore شدند؛ recovery جدا outcome failure را پاک نکرده است. آخرین Cypress/Firefox برای بازبینی باز گذاشته شد؛ روی سیستم دیگر از PID/port قدیمی استفاده نشود.

**اکنون OTP تازه نفرستید و retry خودکار نکنید.** آخرین مانع HTTP429 است؛ cooldown/provider recovery پشتیبانی‌شده معلوم نیست و نباید حدس زده شود. پس از روشن‌شدن بازیابی مجاز، قدم فنی بعد preflight خواندنی محصول جاری/پنجرهٔ نمایان و investigationِ readiness فرم Chrome و keyboard/cleanup Firefox، پیش از mutation تازه است. فقط پس از برقرارشدن prerequisiteهای واقعی، اجرای affected subset با همان هویت و ورود دستی ادامه یابد؛ نه rerun عمومی M01 و نه سفارش/پرداخت.

### آنچه در ابزار فعلی تغییر کرده است

- guard checkout، initial OTP و حداکثر یک resendِ trusted user-initiated برای همان mobile از کنترل عادیِ فعال را می‌پذیرد؛ cooldown/validation حفظ می‌شوند. هیچ resend در attemptهای live این batch اجرا نشد. کنترل خالص auth،۴۷ assertion مثبت/boolean و۴۳ منفی PASS دارد و تحویل SMS را ثابت نمی‌کند.
- کاربر single-writer واقعی را **برای بازهٔ همین اجراها** تأیید کرد. lifecycle، armed/permitted/response-success/ownership را جدا می‌کند؛ teardown بعد Add نامطمئن نمی‌تواند خط matching را claim/delete کند. oracle مالکیت/restoration،۳۱ مثبت و۸۲ منفی PASS دارد. این تأیید عملی به بازهٔ آینده یا سیستم دیگر تعمیم داده نشود.
- cleanup عادی فقط خط owned را حذف و **پس از پاسخ Remove**، هم session و هم `/me` را برای همان identity می‌خواند؛ نبود owned line، baseline دست‌نخورده و دو کلید draft/order absent نیز الزامی‌اند. این assertionهای جدید، gap تاریخی۱۷ نوامبر را retroactively PASS نمی‌کنند.
- fixture تازه فقط برای دو spec checkout است: `/products/blackfriday-ezpost`، package63،۱۴۰ label/package، quantity۲؛ کل محصول باید در baseline غایب باشد و package دیگر fallback نیست. BF/Simple تاریخی و APIهایشان404 بودند؛ fixtureهای قبلی تغییر نکردند. این هویت/presentation fixture، تصویب قیمت یا سیاست تجاری نیست.
- `CF-INV01` باز است: PASS جدید Chrome و diagnostics بدون value، علت observation تاریخی۱۱۸/۱۲۰ را حل نکردند؛ rapid boundaryهای Firefox هنوز اجرا نشده‌اند. دو P10 نیز باز مانده‌اند.

### فرمان‌های جاری و انتقال به سیستم دیگر

clone کامل، تنظیمات local Git/publication filter، lockfile و privacy مطابق بخش تاریخی زیر حفظ شوند. بررسی‌های زیر artifact/source هستند و درخواست برنامه یا SMS نمی‌فرستند:

```powershell
node scripts/check-portability.cjs
npm.cmd run check:static
node scripts/check-checkout-auth-sequence.cjs
node scripts/check-authenticated-checkout-contract.cjs
node scripts/check-authenticated-checkout-static.cjs
node scripts/check-customer-form-static.cjs
node scripts/check-checkout-qa-static.cjs
node scripts/check-authenticated-checkout-evidence.cjs --complete
node scripts/check-checkout-regression-evidence.cjs
```

launcher فعلی برای checkout حتماً `--single-writer-confirmed` می‌خواهد. این flag فقط وقتی مجاز است که exclusivity واقعی **همان بازهٔ تازه** برقرار باشد؛ خود flag lock سرور یا مجوز کلی حساب نیست. syntax نمونهٔ آینده، پس از حل rate limit و prerequisiteها:

```powershell
node scripts/open-authenticated-checkout.cjs chrome resume-handoff-01 handoff --single-writer-confirmed
node scripts/open-authenticated-checkout.cjs firefox resume-handoff-01 handoff --single-writer-confirmed
node scripts/open-authenticated-checkout.cjs chrome resume-form-01 form --single-writer-confirmed
node scripts/open-authenticated-checkout.cjs firefox resume-form-01 form --single-writer-confirmed
```

بعضی `launch.json`های ثبت‌شده، template فرمان را بدون flag نشان می‌دهند؛ آن metadata تاریخی بازنویسی نشود و برای اجرا syntax جاری بالا و validation launcher ملاک باشد. label تازه الزامی است؛ evidence قبلی overwrite نشود.

labelهای نمونهٔ `resume-handoff-01` و `resume-form-01` فقط وقتی قابل استفاده‌اند که پوشهٔ خروجی آنها وجود نداشته باشد؛ در غیر این صورت label مصرف‌نشده انتخاب کنید. commandهای این بخش در انتشار اجرا نشده‌اند. smudge filter همان sanitizer idempotent موجود است؛ نبود command آن در کنار required=true می‌تواند checkout را متوقف کند، پس خط smudge در تنظیم محلی پایین حذف نشود.

driver اختیاریِ جدید `scripts/drive-checkout-visible.cjs` برای Chrome از Node built-ins و برای Firefox از RDP helper نگه‌داری‌شده در همین مخزن استفاده می‌کند؛ به Playwright یا cache خصوصی `_npx` سیستم قبل وابسته نیست. انتخاب دستی spec همچنان ممکن است. اگر از driver استفاده شود، port/PID اختصاصی همان اجرای تازه کشف شوند؛ شماره/OTP را driver وارد نمی‌کند. بازشدن application، load spec و completed test جدا تأیید شوند. session/profile/raw output خصوصی منتقل یا منتشر نشوند؛ هیچ screenshot/recording شخصی ساخته نشود. shipping quote، save/submit فرم مشتری/نشانی/profile، order و payment همچنان ممنوع‌اند.

## تحویل تاریخی — ۱۷ نوامبر ۲۰۲۶

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
git config --local filter.ezpost-public.smudge "node scripts/publication-sanitize.cjs"
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

# syntax جاری۱۸ نوامبر؛ فقط پس از حل OTP و تأیید واقعی single-writer برای بازهٔ جدید:
node scripts/open-authenticated-checkout.cjs chrome resume-handoff-01 handoff --single-writer-confirmed
node scripts/open-authenticated-checkout.cjs firefox resume-handoff-01 handoff --single-writer-confirmed
node scripts/open-authenticated-checkout.cjs chrome resume-form-01 form --single-writer-confirmed
node scripts/open-authenticated-checkout.cjs firefox resume-form-01 form --single-writer-confirmed
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
