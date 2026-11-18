# بررسی شکست‌های checkout و فرم مشتری EZPost — ۱۸ نوامبر ۲۰۲۶

این گزارش نتیجهٔ بررسی شواهد موجود در workspace مستقل `Desktop/EZPost` است. checkpoint شروع بررسی `bba38588f2a25f21d9e4a03cf0a22a63464acb31` و شاخهٔ کار `investigate/checkout-failures-2026-11-18` است. تمام ساعت‌های این سند **UTC، روز ۱۸ نوامبر ۲۰۲۶** هستند؛ تاریخ نام پوشهٔ تاریخی `Authenticated-Checkout-2026-11-17` زمان اجرای فایل‌های داخل آن را تعیین نمی‌کند.

**در این مرحله هیچ E2E تازه، ورود، OTP یا عملیات تغییردهندهٔ سبد اجرا نشد.** نتیجهٔ batch قبلی بدون تغییر **۶ تلاش completed، ۲ PASS و ۴ FAIL** باقی می‌ماند. فرم CF در Chrome و handoff در Firefox موفق شده‌اند؛ این موفقیت‌ها شکست Chrome H01، شکست Firefox CF یا توقف بعدی روی HTTP429 را حذف نمی‌کنند. جزئیات شمارش و source هر تلاش در [گزارش اجرای قبلی](EZPOST_QA_CHECKOUT_REGRESSION_EXECUTION_2026-11-18.md) محفوظ است.

نتیجهٔ فعلی بررسی: شکست form-render در Chrome ثبت شده، ولی علت آن تعیین نشده است؛ assertion اولیهٔ Firefox دقیقاً بازیابی نشده و نسبت‌دادن قطعی آن به Enter یا منوی استان درست نیست؛ شکست cleanup و recovery مستقل آن شواهد جدا دارند. `CF-INV01` و `P10-ORD01/02` همچنان باز هستند. این بررسی معیار پذیرش جدید یا PASS تازه ایجاد نمی‌کند.

## ۱. Chrome — ACO-H01 نهایی

مبنای این بخش [assessment شکست](../Evidence/Authenticated-Checkout-2026-11-17/chrome-regression-20261118-h01-final/failure-assessment.json)، [result](../Evidence/Authenticated-Checkout-2026-11-17/chrome-regression-20261118-h01-final/driver-15636-1795014970004/authenticated-checkout-results.json)، [progress](../Evidence/Authenticated-Checkout-2026-11-17/chrome-regression-20261118-h01-final/driver-15636-1795014970004/progress.json) و [diagnostics](../Evidence/Authenticated-Checkout-2026-11-17/chrome-regression-20261118-h01-final/driver-15636-1795014970004/diagnostics.json) است. Cypress محلی 16.2.1 و Chrome ثبت‌شده 157.0.8103.79، interactive و headed بوده‌اند.

| زمان UTC / شاهد | آنچه اثبات می‌کند | محدودیت |
|---|---|---|
| `15:16:13.612`، شروع result | تلاش واقعی شروع شده است | بازشدن برنامه به‌تنهایی نتیجهٔ تست نیست |
| تا `15:16:51.766`، progress | ورود manual-assisted و بررسی session و `/me` موفق‌اند | ورود یا هویت از URL تنها استنتاج نشده است |
| تا `15:16:58.395`، progress و alias شبکه | انتخاب و quote مرتبط با intent بررسی شده؛ Add مجاز و موفق است و `normalAdd` پاسخ HTTP201 دارد | این sample هنوز establishment مالکیت را نشان نمی‌دهد؛ زمان sample عین زمان ارسال request نیست |
| تا `15:16:59.512`، progress | ownership با single-writer تأییدشده، پاسخ Add موفق و خط جدید یکتا با baseline ثابت برقرار شده | delta یا پاسخ201 به‌تنهایی proof مالکیت نیست |
| تا `15:17:00.046`، progress | نام، quantity، labels و نمایش مبلغ خط درستِ سبد بررسی شده‌اند | quote→cart فقط presentation consistency است؛ oracle مستقل صحت قیمت نیست |
| ترتیب source، خطوط ۱۲۸–۱۳۱ spec | لینک واقعی سبد به checkout کلیک شده و assertion مسیر `/checkout` پیش از assertion فرم قرار دارد | گذر از assertion مسیر، ماندن در همان مسیر یا تکمیل بارگذاری فرم را تضمین نمی‌کند |
| `15:17:05.184`، `AssertionError` و assessment | `main form[data-cy="checkout-form"]` در پنجرهٔ assertion موجودِ `4000ms` پیدا نشده؛ بررسی‌های بعدی فرم اجرا نشده‌اند | ۴ ثانیه تنظیم تست است؛ SLA تأییدشدهٔ محصول نیست |
| `15:17:10.018` پایان؛ progress تکمیلی تا `15:17:10.375` | cleanup با Remove خط متعلق به تست و بررسی مستقل session/me/cart/draft موفق بوده است | cleanup موفق نتیجهٔ testcase را از FAIL تغییر نمی‌دهد |

[manifest](../Evidence/Authenticated-Checkout-2026-11-17/chrome-regression-20261118-h01-final/source-manifest.json) دارای ۳۲ فایل و Source ID برابر `3e4b328d50aee40debdf673510377b3c375cfce73111eac99d2c1e15dafd413a` است؛ [source-checks](../Evidence/Authenticated-Checkout-2026-11-17/chrome-regression-20261118-h01-final/driver-15636-1795014970004/source-checks.json) ثابت‌ماندن همان source را در آن اجرا ثبت کرده است.

دو نکته مانع نتیجه‌گیری علّی می‌شوند:

- `pathname:'/cart'` در progress این مرحله از فراخوانی `gate.phase('checking-checkout', '/cart')` می‌آید. این مقدار bookkeeping است؛ مشاهدهٔ URL زنده در لحظهٔ شکست یا اثبات redirect به cart نیست. source مربوط به ترتیب assertionها در [spec H01](../../cypress/e2e/checkout/authenticated-cart-checkout.cy.js) قابل بررسی است.
- [۲۵ رکورد public module با state=Errored و status=null](../Evidence/Authenticated-Checkout-2026-11-17/chrome-regression-20261118-h01-final/public-module-network-failures.json) در `15:20:46.245`، پس از teardown جمع‌آوری شده‌اند. زمان هر request و علت خطا نگهداری نشده؛ بنابراین این فایل خرابی HTTP با status مشخص، تفاوت failure با cancellation، یا علت غیبت فرم در اجرای قبلی را ثابت نمی‌کند. [GET خواندنی module فرم](../Evidence/Checkout-Regression-2026-11-18/checkout-form-render-contract.json) در `15:18:36.301` با ۲۰۰، دیرتر از شکست است. شاخه‌های ممکنِ loading/error، login/cart redirect و render فرم را نشان می‌دهد، اما شاخهٔ واقعاً طی‌شده در تلاش شکست‌خورده را مشخص نمی‌کند.

فرضیه‌های باز شامل render یا initialization برنامه، transport ماژول‌ها، redirect و synchronization تست هستند. شاهد موجود برای انتخاب یکی به‌عنوان علت قطعی یا ثبت defect قطعی محصول کافی نیست. افزایش خودسرانهٔ timeout، قبول‌کردن cart/login به‌جای فرم یا تضعیف assertion پاسخ این ابهام نیست.

## ۲. Firefox — CF-F01، تلاش f18c

مبنای این بخش [progress](../Evidence/Authenticated-Checkout-2026-11-17/firefox-f18c/driver-4544-1795015749208/progress.json)، [دو diagnostics](../Evidence/Authenticated-Checkout-2026-11-17/firefox-f18c/driver-4544-1795015749208/diagnostics.json)، [result](../Evidence/Authenticated-Checkout-2026-11-17/firefox-f18c/driver-4544-1795015749208/authenticated-checkout-results.json)، [assessment پس از اجرا](../Evidence/Authenticated-Checkout-2026-11-17/firefox-f18c/failure-assessment.json) و source همان تلاش است. مرورگر Firefox 160.0، interactive و headed بوده است.

| زمان UTC | رویداد مستند | برداشت مجاز |
|---|---|---|
| `15:29:09.804` | [اثبات پنجرهٔ ابتدایی](../Evidence/Authenticated-Checkout-2026-11-17/firefox-f18c/driver-4544-1795015749208/runner-connected-window.json): visible=true، foreground=false | وضعیت همان checkpoint؛ تضمین visibility مداوم نیست |
| `15:29:09.815` / `15:29:10.127` | [runner متصل](../Evidence/Authenticated-Checkout-2026-11-17/firefox-f18c/driver-4544-1795015749208/runner-connected.json) / [spec بارگذاری‌شده](../Evidence/Authenticated-Checkout-2026-11-17/firefox-f18c/driver-4544-1795015749208/spec-loaded.json) | برنامه و CF spec درست باز شده‌اند |
| `15:29:12.468` | شروع testcase | تست واقعاً اجرا شده است |
| `15:29:59.258` | Add موفق و مالکیت خط تازه برقرار | ownership از baseline پیش از Add و intent همان عملیات آمده است |
| `15:30:00.431` | فرم واقعی، metadata، location data و required اولیه بررسی شده‌اند | فرم در این تلاش وجود داشته؛ به‌معنی تکمیل کل CF نیست |
| `15:30:04.624` | آخرین markerهای **جدیدِ main**: `actualInputMatchesIntent_street_address`، `native_street_address_tooShort` و `native_street_address_valid` | حداقل ورودی معتبر address در این invocation بررسی شده است |
| `15:30:35.726` | `AssertionError` اولیه | متن، selector و command دقیق آن حفظ نشده است |
| `15:30:37.084` | preRemove session/me موفق؛ cleanup در جریان | زمان کلیک Remove از phase به‌دست نمی‌آید |
| `15:31:05.119` | نخستین marker `cleanupCartHydratedWithOwnedId:true` | cart خوانده شده و خط owned شناسایی شده است؛ Remove هنوز اثبات نشده |
| `15:31:10.121` | hook با `CypressError` شکست خورده؛ assessment می‌گوید Delete «currently animating» بوده | درخواست Remove در hook ارسال نشده است |
| `15:31:14.180` / `15:31:14.385` | پایان FAIL / source-check unchanged برای ۳۲ فایل | primary failure و hook failure دو رخدادند |
| `15:31:14.933` | [اثبات پنجرهٔ نهایی](../Evidence/Authenticated-Checkout-2026-11-17/firefox-f18c/driver-4544-1795015749208/final-window.json): visible=true، foreground=true | وضعیت پنجره پس از restore؛ نه ثبت پیوستهٔ حین تست |

### محل واقعی ابهام assertion اولیه

[spec CF](../../cypress/e2e/checkout/customer-form.cy.js) در خط ۱۱۷ آدرس با طول ۱۰ را valid بررسی می‌کند؛ marker جدید آن ثبت شده است. **نخستین عملیات بعدی که completion آن اثبات نشده خط ۱۱۹ است**: پاک‌کردن `street-address` و بررسی `valueMissing`. پس از آن disabledبودن city در خط ۱۲۰، بازکردن province در ۱۲۱، visibleبودن menu در ۱۲۲، focus در ۱۲۴، Enter در ۱۲۵، نبودن menu در ۱۲۶ و marker `keyboardClosesOpenedProvinceList` در ۱۲۷ قرار دارند. marker آخر ثبت نشده است.

checkهای `actualInputMatchesIntent_street_address` و `native_street_address_valueMissing` در بخش‌های قبلی نیز استفاده شده‌اند. باقی‌ماندن boolean=true، اجرای مجددِ موفق آنها را در خط ۱۱۹ ثابت نمی‌کند. در نتیجه بازهٔ ابهام **از پاک‌کردن آدرس آغاز می‌شود**؛ نمی‌توان گفت تست حتماً به Enter، assertion نبودن منو یا خرابی کنترل province رسیده است. فاصلهٔ تقریباً ۳۱ثانیه‌ای از آخرین marker تا failure نیز selector یا assertion دقیق را بازیابی نمی‌کند. تفسیر «keyboard region» در assessment تاریخی فرضیهٔ محدود است و این گزارش آن را با اطلاعات دقیق‌ترِ ترتیب source مقید می‌کند؛ فایل تاریخی تغییر داده نشده است.

`failureStructure` نهایی result، `/cart` و نبودن form را نشان می‌دهد، زیرا hook پس از failure اولیه همان ساختار را بازنویسی کرده است. از آن نمی‌توان نبودن فرم در لحظهٔ failure اولیه را نتیجه گرفت. `tests[].errorName` نهایی نیز `CypressError` مربوط به hook است؛ diagnostics، `AssertionError` اولیه را جدا حفظ کرده است.

### cleanup، visibility و recovery مستقل

در [helper cleanup](../../cypress/support/checkout-owned-cleanup.js)، خط ۲۸، `cleanup('removing-owned')` هنگام صف‌شدن فرمان‌ها اجرا می‌شود. این assignment پیش از اجرای واقعیِ فرمان‌های queued است؛ timestamp آن زمان کلیک Remove نیست. cart hydration و actionability کلیک، مراحل مستقل بعدی‌اند. موفقیت preRemove session/me و یافتن owned ID برای نتیجهٔ Remove کافی نیست.

[driver تاریخی](../Evidence/Authenticated-Checkout-2026-11-17/tools/driver-common.cjs) در `windowProof()` ابتدا `ShowWindow(handle,9)` و `SetForegroundWindow(handle)` را فراخوانی می‌کند و سپس وضعیت را ثبت می‌کند. بنابراین اثبات‌های OS ابتدایی/نهایی وضعیت checkpointهای restoreشده را ثابت می‌کنند؛ وضعیت `document.visibilityState`، focus یا امکان render مداوم AUT را در تمام اجرا ثابت نمی‌کنند.

assessment، hiddenبودن runner/AUT و آزادشدن دو render frame پس از restore را **پس از پایان تست** ثبت کرده است؛ زمان دقیق آن مشاهده ذخیره نشده. این امر علت `AssertionError` یا animation را ثابت نمی‌کند. شاهد ذخیره‌شده‌ای از آزمایش کنترل‌شدهٔ همین checkout در حالت visible در برابر hidden یا trace مستطیل‌های دکمه در لحظهٔ failure وجود ندارد. probe قدیمی native-input روی `about:blank` چنین شاهدی نیست.

در [metadata بازیابی](../Evidence/Authenticated-Checkout-2026-11-17/firefox-f18c/failure-reporter-metadata.json)، ساعت `15:39:19.345`، document visible و ownership، baseline، preidentity و stableNormalUiButton=true ثبت شده‌اند. [recovery](../Evidence/Authenticated-Checkout-2026-11-17/firefox-f18c/cleanup-recovery.json) در `15:40:16.221` تکمیل شده: کاربر فقط Remove عادی خط owned را کلیک کرده و بررسی‌های مستقل postRemove session/me/cart/draft موفق شده‌اند. [تأیید guard](../Evidence/Authenticated-Checkout-2026-11-17/firefox-f18c/recovery-guard-verification.json) در `15:42:32.406` دقیقاً یک Remove مجاز، blockedMutations=0 و restored را تأیید می‌کند. زمان دقیق کلیک و هر GET مستقل حفظ نشده؛ ترتیب کد و summaryها bounds و ترتیب را نشان می‌دهند. این recovery یک PASS تازهٔ E2E نیست و CF همچنان FAIL است.

[manifest f18c](../Evidence/Authenticated-Checkout-2026-11-17/firefox-f18c/source-manifest.json) دارای Source ID `e5803109613e63a5f45ed8ca3b62a2a86437e93dfedb3aeb7163dbdf657151a5` است. [source-checks](../Evidence/Authenticated-Checkout-2026-11-17/firefox-f18c/driver-4544-1795015749208/source-checks.json) ثابت‌ماندن source آن اجرا را ثبت کرده است. rapid maximumهای name/address، انتخاب کامل province/city، narrow layout و comparison نهایی draft در این تلاش کامل اجرا نشده‌اند.

## ۳. HTTP429 و محدودیت ورود بعدی

[assessment محدودیت](../Evidence/Authenticated-Checkout-2026-11-17/firefox-f18r/rate-limit-assessment.json) در `15:44:59.317` برای تلاش بعدی f18r، یک OTP start تکمیل‌شده با **HTTP429** و دو رکورد `Errored` با status=null را نگه داشته است. verify=0، cartWrites=0 و توقف درخواست‌های بیشتر ثبت شده‌اند. result آن تلاش FAIL در auth setup است؛ بررسی‌های فرم یا سبد اجرا نشده‌اند.

`Retry-After`، headerها، سیاست رفع محدودیت اپراتور یا مدت واقعیِ انتظار مجاز ذخیره نشده است. دو Errored رکورد، اثبات دو درخواست HTTP429 اضافی نیستند. [module عمومی resend](../Evidence/Checkout-Regression-2026-11-18/login-resend-public-contract.json) فقط guard شمارش معکوس UI را نشان می‌دهد؛ پایان آن، رفع rate limit سرور را ثابت نمی‌کند. گزارش کاربر از نرسیدن SMS یا «NS» بدون کد کامل خطای مرورگر، علت شبکه یا نوع خطای مشخصی را اثبات نمی‌کند.

اجرای بعدی به رفع قابل‌اتکای محدودیت کانال با روش پشتیبانی‌شده و هماهنگی کاربر برای همان هویت تعیین‌شده نیاز دارد. مدت cooldown، endpoint پاک‌سازی محدودیت، OTP عمومی، bypass یا مجوز ارسال تکراری اختراع نمی‌شود. در این investigation هیچ retry ورود انجام نشده است.

## ۴. preflight تازهٔ عمومی، جدا از E2E

[product-preflight.json](../Evidence/Checkout-Investigation-2026-11-18/product-preflight.json) در `16:31:30.650`، برابر حدود `08:31` به وقت Pacific، سه GET عمومیِ ثبت‌شده به `/`، `/products/blackfriday-ezpost` و `/api/v1/products/blackfriday-ezpost` را با ۲۰۰ نشان می‌دهد. دادهٔ عمومی API با fixture [checkout-observed-2026-11-18.json](../../cypress/fixtures/checkout-observed-2026-11-18.json) از نظر slug/name، یکتایی package63 و labels140 تطابق دارد. quantity2 intent مستقل تست است و به‌عنوان سیاست تأییدشدهٔ محصول تلقی نشده است.

در این batch سه GET اولیهٔ schema probe نیز انجام شده که raw آنها ذخیره نشده؛ جمع فعالیت عمومی این batch شش GET است و artifact بالا فقط سه GET نهایی را مستند می‌کند. هیچ cookie، auth یا script صفحه استفاده نشده و هیچ POST، OTP، shipping quote یا cart write وجود نداشته است. این شاهد، دسترسی HTTP و تطابق عمومی fixture را بررسی می‌کند؛ DOM رندرشده، کنترل‌های واقعی، session حساب، قیمت مستقل یا baseline سبد اجرای آینده را تأیید نمی‌کند.

## ۵. حداقل شاهد لازم برای rerun هدفمند

| موضوع | پیش‌نیاز / ثبت موردنیاز | تصمیمی که هنوز نمی‌توان گرفت |
|---|---|---|
| احراز هویت | همان هویت عادی تعیین‌شده، ورود manual-assisted و رفع واقعی محدودیت SMS/429 از مسیر پشتیبانی‌شده؛ بدون ثبت مقدارهای خصوصی | درخواست تازه پیش از رفع محدودیت و همکاری کاربر آغاز نشود |
| ownership و restore | تأیید تازهٔ single-writer برای بازهٔ همان اجرا، run label تازه، baseline زندهٔ preAdd، نبود draft/محصول fixture مطابق guard و حفظ خط‌های قبلی | موفقیت recovery قبلی، baseline یا مجوز هم‌زمانی اجرای تازه نیست |
| source | manifest تازه و ثابت برای source اجرا؛ حفظ manifest و outcomeهای تاریخی؛ نام‌بردن روشن از تغییر احتمالی observer | اعتبار نتیجهٔ گذشته به source جدید منتقل نمی‌شود |
| Chrome H01 | ثبت URL زنده و state ساختاری form/loading/error هنگام assertion، timeline سانیتایزشدهٔ requestها و اولین خطا پیش از teardown | redirect، transport، initialization یا synchronization کدام علت بوده است |
| Firefox CF | نگهداری first failure مستقل از hook؛ آخرین command/selector به‌صورت محدود، checkpointهای occurrenceدار برای پاک‌کردن address تا province، وضعیت document/focus و actionability در همان بازه | کدام فرمان از خط ۱۱۹ به بعد شکست خورده و آیا visibility رابطهٔ علّی داشته است |
| visibility | پنجرهٔ Cypress و مرورگر اختصاصی واقعاً visible بمانند؛ sampling مستمرِ بدون restore پنهان برای شواهد و ثبت هر restore جداگانه | OS checkpointهای restoreشده به‌تنهایی استمرار visibility را ثابت نمی‌کنند |
| cleanup | actionability عادی و ownership مستقل؛ اگر کلیک ناموفق شد، عدم ارسال Remove و حفظ failure؛ recovery فقط برای خط ثابت‌شده و با verification مستقل | forced click، حذف خط حدسی یا اعلام restored پیش از postidentity پذیرفته نیست |
| دامنهٔ rerun | ابتدا Chrome ACO-H01 و Firefox CF-F01 متأثر؛ اگر spec/support مشترک تغییر کرد، slice متأثر در هر دو مرورگر با همان source بازبینی شود | موفقیت case دیگر به‌جای rerun case شکست‌خورده قرار نگیرد |

دو spec متأثر دقیقاً [authenticated-cart-checkout.cy.js](../../cypress/e2e/checkout/authenticated-cart-checkout.cy.js) در Chrome برای `ACO-H01` و [customer-form.cy.js](../../cypress/e2e/checkout/customer-form.cy.js) در Firefox برای `CF-F01` هستند. launcher موجود [open-authenticated-checkout.cjs](../../scripts/open-authenticated-checkout.cjs) به‌ترتیب variantهای `handoff` و `form` دارد. flag `--single-writer-confirmed` فقط پس از تأیید عملیِ تازهٔ همان بازه مجاز است؛ ساختن flag، exclusivity سرور را ایجاد نمی‌کند. label باید تازه و کوتاه باشد؛ برچسب کوتاه راهکار اثبات‌شدهٔ crash نیست. این batch هیچ launcher یا driver مرورگری را اجرا نکرده است.

اپراتور کانال باید برای **همان هویت تعیین‌شده** روشن کند محدودیت OTP چگونه به روش پشتیبانی‌شده رفع می‌شود، چه زمانی تلاش عادی مجاز است و در صورت تکرار429/عدم تحویل SMS کجا باید توقف کرد. هیچ راهنمای رفع محدودیت قابل‌استناد یا `Retry-After` در evidence موجود یافت نشد. برای گرفتن این اطلاعات، شماره یا OTP نباید در گزارش عمومی فرستاده شود؛ ورود بعدی فقط مستقیم در مرورگر اختصاصیِ نمایان و با همکاری کاربر خواهد بود. تأیید ساخت حساب عادی از قبل محفوظ است؛ ابهام فعلی مجوز ساخت حساب نیست، بازیابی واقعی کانال و prerequisites اجرای تازه است.

## ۶. diagnostics محدود، قرارداد و بررسی محلی

قرارداد تغییر: starting state یک failure واقعی در دو spec موجود است؛ event خطا باید **پیش از teardown**، context اصلی و مرحلهٔ hook را جدا ثبت کند و همان error object اصلی را دوباره throw کند. منبع انتظار، دستور این investigation و قرارداد حفظ failure است؛ معیار پذیرش یا رفتار محصول تغییر نکرده است. رفتار غلطی که ابزار باید رد کند، بازنویسی main failure با hook، جایگزین‌شدن bookkeeping به‌جای URL واقعی، شمارش skipped به‌عنوان command کامل و ذخیرهٔ دادهٔ خصوصی است.

| فایل | تغییر محدود | حد ادعا |
|---|---|---|
| [checkout-failure-diagnostics.cjs](../../scripts/checkout-failure-diagnostics.cjs) | first main/hook/other جدا و immutable؛ ordinal commandها؛ نام/selector/code و حداکثر۳ source location از۴ مسیر ثابت؛ scalar allowlist و تاریخچهٔ محدود۱۲ failure | source frame یا آخرین selector، علت یا target قطعی assertion نیست؛ raw message/stack/args نگه‌داری نمی‌شود |
| [checkout-runner-observer.cjs](../../scripts/checkout-runner-observer.cjs) | freeze ساختار واقعی AUT در fail؛ شمار form/menu/nativefield، enum فیلد focus، render boxهای loading/error و aggregate دکمه‌های Delete؛ خطای collection هم original failure را suppress نمی‌کند | render box، disabled و animation count معادل actionability Cypress نیستند؛ aggregate Deleteها به خط owned منتسب نمی‌شوند |
| همان observer | command:start و command:end مستقل؛ skipped جدا؛ URL واقعی، resource timing همان origin و browser-error/rejection به‌صورت category و نام ثابت | command:end یک event است، proof مستقل موفقیت intent نیست؛ متن خطای برنامه، request/response body و private URL منتشر نمی‌شوند |
| [drive-checkout-visible.cjs](../../scripts/drive-checkout-visible.cjs) | فایل‌های جدا `first-main-failure.json` و `first-hook-failure.json`؛ snapshot محدود؛ manifest hash سه فایل ابزار پیش/پس از اجرا؛ sampling visibility پیش از هر restore | نوشتن این فایل‌ها در یک run آینده باید واقعاً تأیید شود؛ بررسی فعلی driver syntax است، نه اجرای live |
| [check-checkout-failure-diagnostics.cjs](../../scripts/check-checkout-failure-diagnostics.cjs) و [check-checkout-observer.cjs](../../scripts/check-checkout-observer.cjs) | pure/VM challenge مستقل برای private canary، frame نامعتبر، خطای DOM، main→hook، skipped، reset و bounded history | doubles محلی Cypress/event/DOM هستند؛ اجرای مرورگر یا بازتولید defect نیستند |

Resource Timing منفعل است؛ `observedAt` زمان callback است و ممکن است entry به‌صورت buffered دیر برسد. `timeOriginMs` و ordinal همان document همراه `startTimeMs`/duration ذخیره می‌شوند تا clock چند `cy.visit` مخلوط نشود. ringهای navigation/resource تا۴۸ رکورد و شمار dropped دارند؛ نبودن رکورد، اثبات نبود request نیست. این observer لزوماً ترافیک `cy.request` سمت Node را نمی‌بیند و module failure ممکن است entry timing کامل نداشته باشد. status null/zero همچنان unknown است، نه HTTP failure ساختگی. چهار category API فقط از pathnameهای دقیقِ مشاهده‌شده گرفته می‌شوند و method یا body آن resource را اثبات نمی‌کنند.

زمان نصب observer، وجود start قبلی runner و دیده‌شدن `test:before:run` ثبت می‌شود؛ چون driver پس از تشخیص spec وصل می‌شود، early lifecycle ممکن است مشاهده نشده باشد. نبود failure در بازهٔ مشاهده‌نشده proof موفقیت نیست. sampling فعلی driver با poll حدود۵۰۰ms و retention محدود، استمرار visibility را ثابت نمی‌کند. restore پنجرهٔ اختصاصی جدا ثبت می‌شود؛ در این investigation خود restore یا اتصال driver انجام نشده است. collector شمارش Mocha برای همین دو spec تک‌تستیِ بدون skip را نگه می‌دارد؛ skipped-event diagnostics، یک classifier عمومیِ نتیجهٔ skipped-test نیست.

spec/support/fixture، expectation، timeout و guard اجراشده دست‌نخورده‌اند. برای تشخیص تازه، source آزمون و source ابزار خارجی جدا manifest می‌شوند؛ hash source تاریخی بازنویسی نشده است. هیچ force click، broad exception suppression، probe OTP یا request تازهٔ تغییردهنده اضافه نشده است.

## ۷. نتیجهٔ بررسی‌های انجام‌شده و تحویل

[static-verification.json](../Evidence/Checkout-Investigation-2026-11-18/static-verification.json) خروجی واقعی **۱۱ فرمان PASS** را با Node24.19.0، hash شش فایل ابزار و `git diff --check` موفق نگه می‌دارد. این checkها هیچ browser، application request، OTP یا cart write اجرا نکرده‌اند:

- static مربوط به M01 و preservation۳۰case، portability، authenticated checkout و customer form؛ syntax پانزده فایل checkout؛
- oracle سبد احرازشده:۳۱ مثبت/۸۲ منفی؛ sequence ورود:۴۷ مثبت/۴۳ منفی، هر دو pure؛
- consistency تاریخی authenticated-checkout با `--complete` و regression evidence؛ شمار batch پیشین همان۶attempt با۲PASS/۴FAIL است؛
- factory diagnostics: **۱۸۰ assertion در۱۸ challenge group**؛ integration observer در VM: **۶۷ assertion در۶ challenge group**.

challengeهای مهم ثابت کردند در مدل محلی، hook نمی‌تواند first main را عوض کند؛ مسیر واقعی `/checkout` با status bookkeeping `/cart` جایگزین نمی‌شود؛ skipped completion نمی‌سازد؛ canary خصوصی serialize نمی‌شود؛ DOM collection failure همان error اصلی را propagate می‌کند؛ unknown selector به selector قبلی منتسب نمی‌شود و منبع خارجی با path مشابه، module برنامه شمرده نمی‌شود. این نتیجه ادعای نبود همهٔ false positiveها یا صحت ترتیب eventهای live Cypress نیست.

بازبینی دوم source نشان نداد diagnostic بتواند بدون throw همان original failure، PASS ایجاد کند. محدودیت‌ها روشن‌اند: assertion دقیق تاریخی Firefox بازیابی نشده؛ visibility و actionability به‌طور پیوسته اثبات نشده‌اند؛ cause Chrome و رفع429 هنوز unknown است. `CF-INV01` و هر دو P10 باز می‌مانند. بررسی انتشار شامل فایل‌به‌فایل staged diff، مسیر/حجم، الگوهای حساس و حفظ originals خصوصی است؛ تأیید remote و SHA نهایی پس از push/merge باید از remote تازه خوانده شوند، نه از baseline این سند.

shipping quote، customer/address/profile save، form submit، order و payment همچنان خارج از این investigation هستند. شماره، OTP، cookie/token، raw session/cart/draft، ID خصوصی و تصویر صفحهٔ احراز هویت در این گزارش درج نشده‌اند. گزارش‌های تاریخی، testcaseها و نتایج گذشته بدون بازنویسی محفوظ‌اند؛ ادامهٔ امن از تشخیص علّت شکست‌های فعلی و پیش‌نیازهای جدول بالا آغاز می‌شود.
