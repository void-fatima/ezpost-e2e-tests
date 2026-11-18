# اجرای هدفمند checkout و فرم مشتری EZPost — ۱۸ نوامبر ۲۰۲۶

**دو تست هدفمند در Cypress نمایان اجرا شدند: ۲ PASS، صفر FAIL، pending، skipped و not-run.** Chrome فقط `ACO-H01` با variant=`handoff` و Firefox فقط `CF-F01` با variant=`form` را اجرا کرد. ورود هر دو مرورگر **MANUAL-ASSISTED** بود: کاربر شماره و OTP همان هویت تعیین‌شده را مستقیم در مرورگر وارد کرد؛ assertionهای پس از ورود و cleanup خودکار بودند. این نتیجه به‌معنی OTP کاملاً خودکار یا پوشش کامل سفارش/پرداخت نیست.

کار در workspace مستقل Desktop EZPost و شاخهٔ `test/checkout-targeted-rerun-2026-11-18` از مبنای `1aca2f77a879d182994b96ed0b528c40ac5d888f` انجام شد. این SHA مبنای شروع است، نه شناسهٔ انتشار نهاییِ شامل همین گزارش. کاربر پیش از این اجرا، retry عادی OTP برای **همان هویت تعیین‌شده** بر اساس تأیید تیم و single-writer تازه برای بازهٔ اجرای جدید را تأیید کرد. وضعیت NOT RUN در [گزارش آمادگی](EZPOST_QA_CHECKOUT_TARGETED_RERUN_PREPARATION_2026-11-18.md) متعلق به checkpoint پیش از این تأییدهاست و بازنویسی نشده است.

تمام timestampهای زیر **UTC، روز ۱۸ نوامبر ۲۰۲۶** هستند. نام تاریخی پوشهٔ `Authenticated-Checkout-2026-11-17` تاریخ این تلاش‌های جدید را تعیین نمی‌کند.

## محیط، فرمان‌ها و اقدامات واقعی runner

| جزء | مقدار واقعی |
|---|---|
| برنامه | `http://172.16.30.198:5800/`، شبکهٔ شرکت |
| Node / Cypress محلی | `24.19.0` / `16.2.1` |
| Chrome | `157.0.8103.79`، `isHeadless:false` و `isInteractive:true` |
| Firefox | `160.0`، `isHeadless:false` و `isInteractive:true` |
| config | `cypress.checkout.config.cjs`؛ Cypress `open --e2e` |
| Chrome spec | [authenticated-cart-checkout.cy.js](../../cypress/e2e/checkout/authenticated-cart-checkout.cy.js) |
| Firefox spec | [customer-form.cy.js](../../cypress/e2e/checkout/customer-form.cy.js) |

فرمان‌های واقعی این دو اجرا، به‌ترتیب زیر بودند. port و PID مربوط به همان instanceهای اجراشده‌اند و دستور آمادهٔ استفادهٔ مجدد روی سیستم دیگر نیستند:

```powershell
node scripts/open-authenticated-checkout.cjs chrome r18h1 handoff --single-writer-confirmed
node scripts/drive-checkout-visible.cjs chrome QA/Evidence/Authenticated-Checkout-2026-11-17/chrome-r18h1 52948 14872

node scripts/open-authenticated-checkout.cjs firefox r18f1 form --single-writer-confirmed
node scripts/drive-checkout-visible.cjs firefox QA/Evidence/Authenticated-Checkout-2026-11-17/firefox-r18f1 6000 19160
```

launcher، Cypress نصب‌شده را باز کرد؛ driver به runner اختصاصی متصل شد، spec واقعی همان slice را در رابط Cypress انتخاب کرد و observer سانیتایزشده را نصب کرد. کاربر ورود را دستی انجام داد؛ driver شماره یا OTP وارد نکرد. `launch.json` فقط template فرمان با `<fresh-label>` را نگه می‌دارد و تمام flagهای فراخوانی واقعی را نمایش نمی‌دهد؛ این metadata بازنویسی نشده است.

## شمارش و تأیید مستقل مراحل اجرا

| مرورگر / run / case | برنامه باز شد | spec بارگذاری شد | شروع → پایان تست، UTC | PASS | FAIL | pending | skipped | not-run |
|---|---|---|---|---:|---:|---:|---:|---:|
| Chrome / `r18h1` / ACO-H01 | `17:26:21.737` | `17:26:22.025` | `17:26:24.559` → `17:27:10.572` | ۱ | ۰ | ۰ | ۰ | ۰ |
| Firefox / `r18f1` / CF-F01 | `17:29:07.640` | `17:29:07.947` | `17:29:10.502` → `17:30:04.328` | ۱ | ۰ | ۰ | ۰ | ۰ |
| **جمع همین batch** | **هر دو تأیید شد** | **هر دو تأیید شد** | **دو اجرای live، ورود دستی** | **۲** | **۰** | **۰** | **۰** | **۰** |

مراجع Chrome: [runner-connected](../Evidence/Authenticated-Checkout-2026-11-17/chrome-r18h1/driver-14076-1795022781025/runner-connected.json)، [spec-loaded](../Evidence/Authenticated-Checkout-2026-11-17/chrome-r18h1/driver-14076-1795022781025/spec-loaded.json) و [result](../Evidence/Authenticated-Checkout-2026-11-17/chrome-r18h1/driver-14076-1795022781025/authenticated-checkout-results.json). مراجع Firefox: [runner-connected](../Evidence/Authenticated-Checkout-2026-11-17/firefox-r18f1/driver-16924-1795022946964/runner-connected.json)، [spec-loaded](../Evidence/Authenticated-Checkout-2026-11-17/firefox-r18f1/driver-16924-1795022946964/spec-loaded.json) و [result](../Evidence/Authenticated-Checkout-2026-11-17/firefox-r18f1/driver-16924-1795022946964/authenticated-checkout-results.json).

هر spec یک `it` اصلی دارد. boolean checkpointها و رویدادهای command، تست مستقل نیستند؛ `skippedCommandEvents` در observer نیز تعداد Mocha skipped tests نیست. شمار واقعی skipped در هر دو result صفر است. مجموع controlled-response browser tests در این batch **صفر** است. زمان‌های ۴۶٫۰۱۳ و ۵۳٫۸۲۶ ثانیهٔ result، انتظار ورود دستی را هم شامل می‌شوند و معیار latency یا SLA برنامه نیستند.

## assertionهای واقعاً اجراشده و مرز ادعا

| case / subset | شاهد اجرای تازه | نتیجه و حد پوشش |
|---|---|---|
| ACO-H01 و setup مشترک CF؛ احراز هویت ordinary | session واقعی، پاسخ مستقل `/me`، تطابق خصوصی هویت و مقصد account؛ هر مرورگر یک start موفق و یک verify دارد | فقط assertionهای پس از ورود خودکارند؛ changed URL به‌تنهایی oracle ورود نبود. ایجاد حساب تازه در برابر ورود به حساب موجود از این شواهد مستقل تعیین نمی‌شود |
| انتخاب محصول و handoff | محصول fixture جاری، package63، quantity۲ و labels140/package؛ quote با intent دقیق correlate شد؛ کنترل UI package و quantity، نام/تعداد/بارکد/نمایش مبلغ سبد و baseline بررسی شدند | محصول/package/quantity نادرست، guest fallback، خط تازهٔ نامنتسب یا baseline تغییرکرده نباید پذیرفته شود. مبلغ quote→UI/cart فقط consistency نمایش است، نه oracle مستقل قیمت |
| ACO-H01؛ ورود از سبد پُر به فرم واقعی | navigation زندهٔ `/checkout` در `17:27:02.968`؛ markerهای inventory/review فرم در `17:27:04.072`؛ ترتیب source شامل assertion مسیر و سپس `main form[data-cy="checkout-form"]` است | این بار فرم و چهار field، province/city و review مربوط به خط owned بررسی شدند؛ snapshot ساختاری مستقل از همان لحظهٔ PASS ذخیره نشده است |
| CF-F01؛ native validation و correction | required، tooShort، pattern، maxLength، invalid→valid و filtering مشاهده‌شدهٔ رقم‌ها؛ inputها از UI native وارد شدند | regression قرارداد HTML/UI موجود را می‌سنجد؛ پذیرش تجاری همهٔ قالب‌های محلی، تحویل‌پذیری نشانی یا validation سمت سرور ثابت نمی‌شود |
| CF-F01؛ ناحیهٔ مبهم قبلی address/province | source بدون تغییر از پاک‌کردن address در خط۱۱۹ تا keyboard/menu عبور کرد؛ `keyboardClosesOpenedProvinceList` در `17:29:50.119` و تطابق city با province در `17:29:50.625` ثبت شد | اجرای تازه این توالی را گذرانده؛ assertion دقیق یا علت failure تاریخی f18c هنوز تعیین نشده است |
| CF-F01؛ draft، narrow و حفظ سبد | comparison مستقل draft ساختگی، عرض۳۹۰×۸۴۴، ویرایش واقعی، toggle listbox و `partialFormEditingPreservesCart` ثبت شدند | viewport فیزیکی یا persistence آدرس مشتری در سرور آزمایش نشده است |
| CF-F01؛ rapid boundaries | name در `17:29:55.291` و address/هر دو boundary در `17:30:00.495` PASS شدند | طول دقیق پس از native input و دو فرصت render بررسی شد؛ نتیجه علت مشاهدهٔ تاریخی CF-INV01 را تعیین نمی‌کند |
| cleanup هر دو case | Remove عادی فقط خط owned، سپس session و `/me` مستقل، cart baseline و draft/order keys بررسی شدند | نبودن خط owned همراه با session ناشناس نمی‌تواند restored محسوب شود؛ cleanup با postidentity مستقل این مسیر غلط را رد می‌کند |

شواهد assertionها در [progress Chrome](../Evidence/Authenticated-Checkout-2026-11-17/chrome-r18h1/driver-14076-1795022781025/progress.json) و [progress Firefox](../Evidence/Authenticated-Checkout-2026-11-17/firefox-r18f1/driver-16924-1795022946964/progress.json) هستند. markerهای boolean تکراری timestamp جدا برای هر invocation نمی‌سازند؛ ادعای عبور از توالی address/province اجرای تازه متکی به source ثابت، PASS کامل testcase و marker جدیدِ بعدی است، نه استنتاج از boolean تکراری به‌تنهایی.

| boundary واقعی Firefox | native commandهای تلاش‌شده | طول موردانتظار / واقعی | keydown / beforeinput / input / keyup | focus loss / replacement | بعد از dispatch و render |
|---|---:|---|---|---|---|
| name | ۱۲۱ | ۱۲۰ / ۱۲۰ | ۱۲۱ / ۱۲۱ / ۱۲۰ / ۱۲۱ | ۰ / ۰ | طول۱۲۰، focused و connected؛ دو checkpoint render |
| street-address | ۳۰۱ | ۳۰۰ / ۳۰۰ | ۳۰۱ / ۳۰۱ / ۳۰۰ / ۳۰۱ | ۰ / ۰ | طول۳۰۰، focused و connected؛ دو checkpoint render |

`trustedKeydown` و `trustedInput` نیز با شمار مربوط بالا برابرند؛ `bothRapidNativeBoundariesExact` واقعاً اجرا و PASS شده است. نتیجه با setکردن programmatic value، range permissive، forced interaction یا تغییر انتظار ساخته نشده است. دو checkpoint render تضمین نبود هر overwrite در تمام آینده نیستند.

## مالکیت، cleanup و ترتیب دو مرورگر

تأیید single-writer تازه همراه با baseline زندهٔ پیش از Add، intent دقیق، درخواست مجاز Add، پاسخ موفق و یکتایی خط تازه برای ownership استفاده شد. داده‌های قبلی حساب حفظ شدند. در هر دو اجرا guard، `armed`، `permitted`، `responseSucceeded`، `ownershipEstablished` و اجازهٔ Remove را جدا ثبت کرده است؛ تطابق ظاهری یک خط برای حذف کافی نبود.

- **Chrome:** آخرین markerهای cleanup در `17:27:10.513`، `ownedRemoveCompleted`، `postRemoveSameOrdinarySession`، `postRemoveIndependentMe`، `postRemoveCartReadValid`، `postRemoveIdentityCartAndDraftRestored`، `originalCartRestoredExactly` و دقیقاً یک Add/Remove عادی را true ثبت کرده‌اند. source-check پس از اجرا در `17:27:11.081` تکمیل شد. این restoration **پیش از درخواست launch Firefox در `17:28:00.985`** تأیید شد.
- **Firefox:** hydration owned cart در `17:30:03.784` و postRemove identity/cart/draft و baseline در `17:30:04.426` ثبت شدند؛ cleanup نهایی `restored` است. recovery دستی یا Remove دوم در این batch لازم نشد.

در هر مرورگر start=۱، successfulStart=۱، verify=۱ و resend=۰ است؛ blockedMutations=۰ و دقیقاً یک Add/Remove عادی تأیید شده‌اند. HTTP429 تازه‌ای رخ نداد. موفقیت همین دو ورود، سیاست cooldown سرور یا رفع دائمی محدودیت را تعیین نمی‌کند؛ در HTTP429 آینده باید توقف کرد و resend خودکار انجام نداد.

## source، diagnostics و visibility

هیچ testcase، assertion، spec، support یا fixture برای این rerun تغییر نکرده است. manifest هر اجرا ۳۲ فایل دارد و در driver-start، before-spec و after-spec unchanged=true ثبت شده است:

| اجرا | Source ID | شواهد |
|---|---|---|
| Chrome H01 | `3e4b328d50aee40debdf673510377b3c375cfce73111eac99d2c1e15dafd413a` | [manifest](../Evidence/Authenticated-Checkout-2026-11-17/chrome-r18h1/source-manifest.json)، [source-checks](../Evidence/Authenticated-Checkout-2026-11-17/chrome-r18h1/driver-14076-1795022781025/source-checks.json) |
| Firefox CF | `e5803109613e63a5f45ed8ca3b62a2a86437e93dfedb3aeb7163dbdf657151a5` | [manifest](../Evidence/Authenticated-Checkout-2026-11-17/firefox-r18f1/source-manifest.json)، [source-checks](../Evidence/Authenticated-Checkout-2026-11-17/firefox-r18f1/driver-16924-1795022946964/source-checks.json) |

این دو Source ID خانواده‌های متفاوت H01/CF هستند؛ PASS دو case، اجرای یک spec واحد در دو مرورگر نیست. سه source ابزار خارجی `drive-checkout-visible.cjs`، `checkout-runner-observer.cjs` و `checkout-failure-diagnostics.cjs` جدا از Source ID تست manifest شده و بدون تغییر مانده‌اند: [تأیید Chrome](../Evidence/Authenticated-Checkout-2026-11-17/chrome-r18h1/driver-14076-1795022781025/diagnostic-source-check.json)، [تأیید Firefox](../Evidence/Authenticated-Checkout-2026-11-17/firefox-r18f1/driver-16924-1795022946964/diagnostic-source-check.json).

observer پیش از شروع تست نصب و `test:before:run` را در هر دو مرورگر دیده است. [diagnostics Chrome](../Evidence/Authenticated-Checkout-2026-11-17/chrome-r18h1/driver-14076-1795022781025/failure-diagnostics.json) و [diagnostics Firefox](../Evidence/Authenticated-Checkout-2026-11-17/firefox-r18f1/driver-16924-1795022946964/failure-diagnostics.json) هیچ failure جدیدی ندارند: firstMainFailure و firstHookFailure هر دو null هستند. نبود فایل اختصاصی first-main/first-hook در اجرای PASS موردانتظار است؛ **مسیر capture واقعیِ failure در این batch آزموده نشده** و نمی‌توان از نبود failure، capture موفق یک خطای آینده را نتیجه گرفت. شواهد failureهای قدیمی جابه‌جا یا جایگزین نشده‌اند.

navigation ثبت‌شده از URL واقعی آمده است؛ در Chrome رسیدن به `/checkout` و در Firefox توالی account/cart/product/cart/checkout جدا از bookkeeping gate قابل مشاهده است. بااین‌حال snapshot نقطه‌ای form/loading/error در لحظهٔ assertion موفق وجود ندارد. resource timeline محدود است و بخشی از entryها drop شده‌اند؛ نبود رکوردی در آن، نبود request یا نبود خطا در تمام اجرا را ثابت نمی‌کند.

OS window proof در ابتدای و انتهای هر اجرا، پنجرهٔ اختصاصی visible/foreground را ثبت کرده است: [Chrome ابتدا](../Evidence/Authenticated-Checkout-2026-11-17/chrome-r18h1/driver-14076-1795022781025/runner-connected-window.json)، [Chrome انتها](../Evidence/Authenticated-Checkout-2026-11-17/chrome-r18h1/driver-14076-1795022781025/final-window.json)، [Firefox ابتدا](../Evidence/Authenticated-Checkout-2026-11-17/firefox-r18f1/driver-16924-1795022946964/runner-connected-window.json) و [Firefox انتها](../Evidence/Authenticated-Checkout-2026-11-17/firefox-r18f1/driver-16924-1795022946964/final-window.json). [sampleهای Chrome](../Evidence/Authenticated-Checkout-2026-11-17/chrome-r18h1/driver-14076-1795022781025/visibility-samples.json) و [sampleهای Firefox](../Evidence/Authenticated-Checkout-2026-11-17/firefox-r18f1/driver-16924-1795022946964/visibility-samples.json) interval۵۰۰ms، sample ابتدایی appVisible=null و سپس appVisible=true را نگه می‌دارند؛ `continuousVisibilityProven:false` است. این اجراها headed و واقعاً در runner باز شدند، ولی نمونه‌های نگهداری‌شده اثبات ریاضیِ visibility پیوستهٔ تمام بازه نیستند. پنجرهٔ نهایی Firefox/Cypress برای بازبینی باز گذاشته شد.

## معنای نتیجهٔ تازه و کارهای باز

Chrome H01 این بار assertion فرم را گذراند؛ این نتیجه علت شکست قبلی، اصلاح برنامه یا latency SLA را ثابت نمی‌کند. Firefox CF این بار پاک‌کردن address، province/city و keyboard، narrow/draft و هر دو rapid boundary را کامل گذراند؛ exact assertion اولیهٔ f18c و نقش احتمالی visibility/animation در failure قدیمی هنوز تعیین نشده‌اند. [گزارش investigation](EZPOST_QA_CHECKOUT_FAILURE_INVESTIGATION_2026-11-18.md)، batch قبلیِ **۶ تلاش، ۲ PASS/۴ FAIL** و recovery تاریخی بدون تغییر محفوظ‌اند.

`CF-INV01` و `P10-ORD01/02` باز می‌مانند. هیچ M01/landing، suite ordering عمومی یا controlled P10 در این batch rerun نشد. انتظار اشتباه۲۴۰ در P10 با PASS این دو case معتبر نشده؛ انتظارهای مستقل همان caseها همچنان باید حفظ شوند. صحت مستقل قیمت/tier/rounding و payable، shipping quote، save/submit customer/address/profile، create/confirm/cancel order و payment در این batch پوشش ندارند. نشانی عمداً ناقص و guard مستقل حفظ شدند؛ سفارش یا پرداختی ایجاد نشد.

شماره، OTP، cookie/token، raw session/cart/draft، شناسهٔ خصوصی و screenshot/recording احرازشده در گزارش یا artifactهای عمومی ثبت نشده‌اند. runtime خصوصی بخشی از شواهد قابل‌انتشار نیست. [خلاصهٔ تجمیعی همین اجرا](../Evidence/Checkout-Targeted-Rerun-2026-11-18/execution-summary.json) و [بررسی نهایی ایستا](../Evidence/Checkout-Targeted-Rerun-2026-11-18/static-verification.json) از این دو result جدا نگه داشته می‌شوند؛ بررسی‌های محلی به شمار دو E2E اضافه نمی‌شوند. تحویل Git و SHA نهایی remote باید پس از انتشار عادی جدا تأیید شوند؛ SHA مبنا، SHA نهایی این گزارش نیست.
