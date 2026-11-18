# اجرای رگرسیون checkout و فرم مشتری EZPost — ۱۸ نوامبر ۲۰۲۶

مخزن: <https://github.com/void-fatima/ezpost-e2e-tests>. مبنای دریافت‌شده از `origin/main` در شروع این مرحله `146df24ebe66f24022b1b99d58160b32111ceb52` بود. کار در workspace مستقل Desktop EZPost و شاخهٔ `test/checkout-auth-guard` انجام شد. SHA نهایی انتشار باید بعد از commit/merge و بررسی تازهٔ remote ثبت شود؛ مبنای بالا SHA انتشار این تغییرها نیست.

در این batch **۶ تلاش completed از دو case موجود، ۲ PASS و ۴ FAIL** ثبت شد. Chrome سه تلاش با۱ PASS/۲ FAIL و Firefox سه تلاش با۱ PASS/۲ FAIL دارد. ورود واقعی، **MANUAL-ASSISTED** بود؛ کاربر شماره و OTP را مستقیم در مرورگر وارد کرد و assertionهای بعد از ورود خودکار بودند. آزمون OTP کاملاً خودکار، ثبت قطعی حساب تازه یا journey کامل سفارش/پرداخت ادعا نمی‌شود. ordinary identity در پنج تلاش از auth عبور کرد؛ تلاش آخر Firefox با HTTP429 پیش از verify متوقف شد.

نتیجهٔ موفق CF در Chrome و H01 در Firefox، شکست‌های دیگر را حذف نمی‌کند. `CF-INV01` و P10-ORD01/02 همچنان بازند. **فرم CF در Firefox هنوز یک اجرای کامل موفق ندارد**؛ rapid maximumها، province/city selection کامل، narrow و draft comparison نهایی آن اجرا نشده‌اند. آخرین پنجرهٔ Firefox/Cypress برای بازبینی باز مانده است.

## محیط، mode و فرمان‌های واقعی

| جزء | نسخه/وضعیت ثبت‌شده |
|---|---|
| Node | 24.19.0 |
| Cypress نصب‌شدهٔ محلی | 16.2.1؛ بدون نصب یا upgrade dependency |
| Chrome | 157.0.8103.79؛ `isHeadless:false` و `isInteractive:true` |
| Firefox | 160.0؛ `isHeadless:false` و `isInteractive:true` |
| برنامه | `http://172.16.30.198:5800/`؛ دسترسی شبکهٔ شرکت |
| config این slice | `cypress.checkout.config.cjs` با support مجزای checkout؛ guardهای read-only قبلی باز نشده‌اند |
| اجرای مجاز | `cypress open --e2e` و انتخاب spec واقعی در runner نمایان؛ headless جایگزین نشده است |

launcher موجود، این اجراها را با flag تأیید عملی single-writer و labelهای تازه باز کرد. در هر runner فقط spec همان variant انتخاب شد؛ ورود/OTP از UI واقعی توسط کاربر انجام شد و driver فقط انتخاب spec و جمع‌آوری سانیتایزشدهٔ نتیجه را انجام داد.

```powershell
node scripts/open-authenticated-checkout.cjs chrome regression-20261118-h01 handoff --single-writer-confirmed
node scripts/open-authenticated-checkout.cjs chrome regression-20261118-h01-final handoff --single-writer-confirmed
node scripts/open-authenticated-checkout.cjs chrome regression-20261118-cf-final form --single-writer-confirmed
node scripts/open-authenticated-checkout.cjs firefox regression-20261118-h01-final handoff --single-writer-confirmed
node scripts/open-authenticated-checkout.cjs firefox f18h handoff --single-writer-confirmed
node scripts/open-authenticated-checkout.cjs firefox f18c form --single-writer-confirmed
node scripts/open-authenticated-checkout.cjs firefox f18r form --single-writer-confirmed
```

هفت launch بالا شش تلاش completed تولید کردند؛ launch بلندنام Firefox در جدول جداگانهٔ startup آمده است. هر شش result، `applicationOpened:true`، `specLoaded:true` و `testsCompleted:true` را جدا ثبت کرده‌اند. completed بودن، موفق‌بودن test یا اجراشدن همهٔ checkpointها نیست. هیچ M01/landing یا suite ordering نامرتبط rerun نشد.

specهای واقعی اجراشده [authenticated-cart-checkout.cy.js](../../cypress/e2e/checkout/authenticated-cart-checkout.cy.js) برای variant=`handoff` و [customer-form.cy.js](../../cypress/e2e/checkout/customer-form.cy.js) برای variant=`form` هستند؛ هر کدام فقط یک `it` اصلی دارند.

## شمارش واقعی هر تلاش و مرورگر

| تلاش | Case / مرورگر | PASS | FAIL | pending | skipped | not-run | نتیجهٔ setup / نقطهٔ توقف | cleanup |
|---|---|---:|---:|---:|---:|---:|---|---|
| `chrome-regression-20261118-h01` | ACO-H01 / Chrome | ۰ | ۱ | ۰ | ۰ | ۰ | ورود و session/me موفق؛ fixture قدیمی محصول۴۰۴، پیش از Add | `not-needed`؛ Add/Remove صفر |
| `chrome-regression-20261118-h01-final` | ACO-H01 / Chrome | ۰ | ۱ | ۰ | ۰ | ۰ | ورود، intent، owned Add و سبد پُر موفق؛ form selector در۴ثانیه پس از handoff یافت نشد | `restored`؛ session/me پس از Remove، baseline و draft بررسی شدند |
| `chrome-regression-20261118-cf-final` | CF-F01 / Chrome | ۱ | ۰ | ۰ | ۰ | ۰ | ورود دستی و تمام subsetهای فرم، هر دو rapid boundary و assertion نهایی اجرا شدند | `restored`؛ تمام oracleهای جدید پس از Remove موفق |
| `firefox-f18h` | ACO-H01 / Firefox | ۱ | ۰ | ۰ | ۰ | ۰ | ورود دستی، owned Add، cart-to-form، inventory و presentation بررسی شدند | `restored`؛ تمام oracleهای جدید پس از Remove موفق |
| `firefox-f18c` | CF-F01 / Firefox | ۰ | ۱ | ۰ | ۰ | ۰ | ورود و native subsetها اجرا شدند؛ primary AssertionError و سپس hook CypressError؛ جزئیات پایین | hook پیش از Remove شکست خورد؛ recovery جدا با Remove دستی و verification خودکار موفق |
| `firefox-f18r` | CF-F01 / Firefox، retry محدود | ۰ | ۱ | ۰ | ۰ | ۰ | start پاسخ۴۲۹؛ successStart=۰، verify=۰؛ cart/form اجرا نشد | `not-needed`؛ هیچ cart write |
| **Chrome، ۳ تلاش** | دو case ID | **۱** | **۲** | **۰** | **۰** | **۰** | setup دستی از assertion خودکار جدا | — |
| **Firefox، ۳ تلاش** | دو case ID | **۱** | **۲** | **۰** | **۰** | **۰** | setup دستی از assertion خودکار جدا | — |
| **جمع batch، ۶ تلاش** | **۲ case ID، نه۶ case مستقل** | **۲** | **۴** | **۰** | **۰** | **۰** | **۶ live assisted؛ صفر controlled-response browser test** | recovery به PASSهای E2E اضافه نشده است |

not-run=۰ در شش ردیف completed، شمار Mocha در سطح testcase است؛ به‌معنی اجرای تمام subsetها نیست. برای مثال test با setup failure یک FAIL و صفر not-run دارد، درحالی‌که assertionهای cart/form آن واقعاً اجرا نشده‌اند. تعداد checkpoint/check boolean به تعداد test افزوده نمی‌شود.

سابقهٔ پیش از این batch در گزارش‌های۱۷نوامبر **۷ تلاش completed، ۳ PASS/۴ FAIL** از همین دو journey بود و بدون تغییر محفوظ است. جمع جدید۶تلاش با sourceهای تاریخ‌دار جدا ثبت شده؛ نتیجهٔ قبلی با نتیجهٔ فعلی یا یک suite یکپارچهٔ دارای source واحد جایگزین نمی‌شود.

## resultهای اصلی و source مشترک مرورگرها

| تلاش | شاهد outcome واقعی | شاهد پیشرفت و identity/cleanup |
|---|---|---|
| Chrome H01 اولیه | [result](../Evidence/Authenticated-Checkout-2026-11-17/chrome-regression-20261118-h01/driver-8720-1795014523377/authenticated-checkout-results.json) | [progress](../Evidence/Authenticated-Checkout-2026-11-17/chrome-regression-20261118-h01/driver-8720-1795014523377/progress.json)، [assessment۴۰۴](../Evidence/Authenticated-Checkout-2026-11-17/chrome-regression-20261118-h01/failure-assessment.json) |
| Chrome H01 نهایی | [result](../Evidence/Authenticated-Checkout-2026-11-17/chrome-regression-20261118-h01-final/driver-15636-1795014970004/authenticated-checkout-results.json) | [progress](../Evidence/Authenticated-Checkout-2026-11-17/chrome-regression-20261118-h01-final/driver-15636-1795014970004/progress.json)، [form failure](../Evidence/Authenticated-Checkout-2026-11-17/chrome-regression-20261118-h01-final/failure-assessment.json) |
| Chrome CF | [result و دو boundary](../Evidence/Authenticated-Checkout-2026-11-17/chrome-regression-20261118-cf-final/driver-15148-1795015338712/authenticated-checkout-results.json) | [progress](../Evidence/Authenticated-Checkout-2026-11-17/chrome-regression-20261118-cf-final/driver-15148-1795015338712/progress.json) |
| Firefox H01 | [result](../Evidence/Authenticated-Checkout-2026-11-17/firefox-f18h/driver-13788-1795015653935/authenticated-checkout-results.json) | [progress](../Evidence/Authenticated-Checkout-2026-11-17/firefox-f18h/driver-13788-1795015653935/progress.json) |
| Firefox CF | [result و دو diagnostics](../Evidence/Authenticated-Checkout-2026-11-17/firefox-f18c/driver-4544-1795015749208/authenticated-checkout-results.json) | [progress](../Evidence/Authenticated-Checkout-2026-11-17/firefox-f18c/driver-4544-1795015749208/progress.json)، [recovery جدا](../Evidence/Authenticated-Checkout-2026-11-17/firefox-f18c/cleanup-recovery.json) |
| Firefox CF retry | [result](../Evidence/Authenticated-Checkout-2026-11-17/firefox-f18r/driver-15960-1795016626861/authenticated-checkout-results.json) | [progress](../Evidence/Authenticated-Checkout-2026-11-17/firefox-f18r/driver-15960-1795016626861/progress.json)، [rate-limit assessment](../Evidence/Authenticated-Checkout-2026-11-17/firefox-f18r/rate-limit-assessment.json) |

هر driver directory بالا، `runner-connected.json`، `spec-loaded.json`، proof پنجره و `source-checks.json` مستقل دارد؛ result نهایی نیز سه وضعیت بازشدن/بارگذاری/تکمیل و source check را نگه می‌دارد. manifest و `launch.json` در parent همان run قرار دارند. عکس شخصی یا raw session/network به‌عنوان proof عمومی ذخیره نشده است.

| نسخهٔ اجراشده | Source ID | مقایسه |
|---|---|---|
| H01 اولیه، fixture تاریخی | `3f419a181fc0650e3cd23882f19be5842814bb8c4d8fc111492991c19c521a99` | بایت‌های این تلاش محفوظ؛ failure پیش از اصلاح دادهٔ fixture پاک نشد |
| H01 نهایی | `3e4b328d50aee40debdf673510377b3c375cfce73111eac99d2c1e15dafd413a` | Chrome نهایی و Firefox f18h دقیقاً همین source؛ پس از اجرا unchanged=true،۳۲فایل |
| CF نهایی | `e5803109613e63a5f45ed8ca3b62a2a86437e93dfedb3aeb7163dbdf657151a5` | Chrome CF، Firefox f18c و retry f18r دقیقاً همین source؛ پس از اجرا unchanged=true،۳۲فایل |

Source ID دو spec به‌علت spec منتخب متفاوت است؛ مقایسهٔ cross-browser برای **همان case/spec** انجام می‌شود. helperهای مشترک در source manifest منظور شده‌اند. در پاسخ به failureها timeout/expectation ضعیف یا shared source بین اجراهای نهایی تغییر نکرد؛ diagnostic و recovery مستقل، PASS جایگزین تست ایجاد نمی‌کنند. [آرشیو source تاریخی و manifest](../Evidence/Checkout-Regression-2026-11-18/historical-source/manifest.json) provenance نسخه‌های قبلی را حفظ می‌کند.

## یافته‌ها، failureها و محدودیت تشخیص

**۱. fixture قدیمی دیگر قابل دسترسی نبود.** نخستین Chrome بعد از ورود واقعی در `/products/blackfri-01` به۴۰۴ رسید. [inspection عمومی خواندنی](../Evidence/Checkout-Regression-2026-11-18/product-route-prerequisite.json) برای `/products/simple` و دو GET API محصول قدیمی نیز۴۰۴ ثبت کرد. catalog و [DOM جدید](../Evidence/Checkout-Regression-2026-11-18/current-product-dom.json)، محصول `/products/blackfriday-ezpost` با package63،۱۴۰لیبل و نام «بلک فرایدی ایزی پست» را نشان دادند.

یک [fixture مستقل تاریخ‌دار checkout](../../cypress/fixtures/checkout-observed-2026-11-18.json) برای همین دو spec تهیه شد؛ quantity2 پیش از Add تعیین و غیبت **کل محصول** در baseline شرط شد. fixture قدیمی cart و تست‌های قبلی تغییر نکردند. این اصلاح دادهٔ prerequisite است؛ قیمت، merge policy یا پذیرش business از رفتار فعلی استنتاج نشده و۴۰۴ تاریخی حذف نشده است.

**۲. H01 Chrome نهایی، form را در checkpoint مقرر ندید.** پس از Add متعلق به run و handoff به `/checkout`، assertion وجود فرم `main form[data-cy="checkout-form"]` طی پنجرهٔ موجود۴۰۰۰ms شکست خورد؛ form assertionها اجرا نشدند. انتظار فرم واقعی، شرط اصلی journey باقی ماند. [network سانیتایزشده](../Evidence/Authenticated-Checkout-2026-11-17/chrome-regression-20261118-h01-final/read-only-failure-network.json) و [moduleهای عمومی errored](../Evidence/Authenticated-Checkout-2026-11-17/chrome-regression-20261118-h01-final/public-module-network-failures.json) برای بررسی محفوظ‌اند؛ status و خطای module به‌تنهایی علت form absence را ثابت نمی‌کند. application/environment/initialization یا synchronization هنوز تفکیک قطعی نشده‌اند؛ timeout افزایش نیافت و شکست به PASS تبدیل نشد. همان source در Firefox H01 موفق بود؛ این اختلاف، failure Chrome را حل‌شده نمی‌کند.

**۳. Firefox CF، primary failure و cleanup failure جدا دارد.** native name/mobile/postal/address checks، از جمله required، tooShortهای کوتاه، pattern/correction، localization baseline و Tab واقعی ثبت شدند. primary `AssertionError` در `15:30:35.726Z` و hook `CypressError` در `15:31:10.121Z` ثبت شده‌اند. پیشرفت پس از native address validation متوقف و `keyboardClosesOpenedProvinceList` ثبت نشده؛ exact متن/selector assertion اولیه در خروجی سانیتایزشده حفظ نشده است. محل محتمل از ترتیب کد محدود می‌شود؛ علت یا assertion دقیق حدس زده نمی‌شود. [reporter metadata](../Evidence/Authenticated-Checkout-2026-11-17/firefox-f18c/failure-reporter-metadata.json) نیز متن کافی برای تأیید menu assertion ندارد.

در teardown، کلیک Remove به‌علت تشخیص animation انجام نشد؛ removePermitted=false و count=۰ باقی ماند. هنگام بررسی، runner/AUT hidden بودند؛ restore کردن پنجره، انتظار دو requestAnimationFrame را از توقف خارج کرد. این observation یک عامل محیطی احتمالی است؛ علت primary failure یا علت قطعی animation ثابت نشده است. از force click، غیرفعال‌کردن animation check یا broad exception suppression استفاده نشد.

**۴. recovery سبد Firefox مستقل و موفق بود.** کاربر Remove عادی همان خط owned را انجام داد. [recovery](../Evidence/Authenticated-Checkout-2026-11-17/firefox-f18c/cleanup-recovery.json) پیش از اقدام، session/me، ownership established، baseline خواندنی retained از ترتیب پیش از Add، ثبات اقلام دیگر و دکمهٔ عادی پایدار را بررسی کرد؛ baseline از current cart با کم‌کردن خط ساخته نشد. پس از پاسخ Remove، خواندن‌های مستقل session/me/cart و draft oracle اجرا شدند. [verification تکمیلی guard](../Evidence/Authenticated-Checkout-2026-11-17/firefox-f18c/recovery-guard-verification.json) یک Remove guardشده، removePermitted=true، blockedMutations=۰ و cleanupRestored=true را تأیید کرد. این recovery یک PASS E2E تازه نیست؛ نتیجهٔ اصلی f18c همچنان FAIL است.

**۵. retry محدود Firefox به rate limit رسید.** در f18r، start واقعی پاسخ HTTP429 گرفت؛ otpStartCount=۱، otpStartSuccessCount=۰، verify=۰، resend=۰، cartWrites=۰ و cleanup=`not-needed` بود. کاربر rate limit را گزارش کرد و درخواست OTP دیگری ارسال نشد. [assessment](../Evidence/Authenticated-Checkout-2026-11-17/firefox-f18r/rate-limit-assessment.json) همچنین دو رکورد Errored بدون status را نگه می‌دارد؛ این رکوردها دو SMS یا دو کلیک انسانی جدید شمرده نمی‌شوند. هیچ cooldown bypass، resend loop، session injection یا موفقیت ساختگی login انجام نشد. این failureِ auth setup، نتیجهٔ native validation یا boundaryهای فرم نیست.

**۶. یک startup Firefox اصلاً test اجرا نکرد.** [startup-incomplete](../Evidence/Authenticated-Checkout-2026-11-17/firefox-regression-20261118-h01-final/startup-incomplete.json) برای label بلند، applicationOpened=true ولی browserWindowOpened=false، specLoaded=false و testsExecuted=false ثبت کرد؛ چهار crash dump خصوصی منتشر نشدند. retry با label کوتاه f18h همان source را باز و اجرا کرد؛ کوتاه‌کردن label به‌عنوان علت قطعی/fix crash معرفی نمی‌شود. این startup در شش attempt completed یا شمار FAILهای تست نیست؛ auth/cart action نداشت.

## ownership، هویت پس از Remove و guard OTP

کاربر استفادهٔ واقعی single-writer از همان حساب را برای تمام بازهٔ این اجراها تأیید کرد. attribution بر پایهٔ **همین prerequisite عملی + Add دقیق واقعاً permitted + response موفق + unique new line با baseline ثابت** انجام شد؛ matching delta یا account designation به‌تنهایی کافی شمرده نشد. lock یا correlation field ناموجود ساخته نشد. این تأیید به runهای آینده تعمیم خودکار ندارد و flag launcher خودش server exclusivity را enforce نمی‌کند.

| اجراهای دارای Add | مالکیت قبل Remove | نتیجهٔ post-Remove session و `/me` | نتیجهٔ cart/draft |
|---|---|---|---|
| Chrome H01 نهایی | established؛ تمام lifecycle flags در progress | هر دو PASS در cleanup همان test | owned line غایب، baseline برابر، draft/order absent؛ test به‌علت form همچنان FAIL |
| Chrome CF | established | هر دو PASS در cleanup همان test | restoration کامل همین subset؛ CF PASS |
| Firefox H01 | established | هر دو PASS در cleanup همان test | restoration کامل همین subset؛ H01 PASS |
| Firefox CF f18c | established؛ hook قبل Remove متوقف شد | در recovery جدا هر دو PASS | Remove دستی guardشده و restoration جدا موفق؛ CF همچنان FAIL |

همان stable session ID و mobile/role عادی به anchor خصوصی دستی مقید بودند؛ `/me` mobile/role مستقلاً تطبیق داده شد. session/me تازه **پس از پاسخ Remove** خوانده شدند؛ cart خالی مهمان نمی‌تواند baseline احرازشدهٔ خالی را restored کند. مقدارهای خصوصی و response bodyها منتشر نشده‌اند. شاهد فعلی proof تعامل با writer هم‌زمان یا server lock نیست؛ حفظ baseline بر همان single-writer واقعی و oracle composition متکی است.

guard جدید، initial دستی و حداکثر یک resend با trusted normal-UI arm، همان شماره و cooldown اصلی را پشتیبانی می‌کند. **در تمام اجراهای واقعی این batch، resendCount=۰ بود**؛ دریافت و verify پس از resend واقعی در این batch اجرا نشد. بنابراین اصلاح resend فقط با sequence/negative checks خالص challenge شده و ادعای PASS live-resend ندارد. تاریخچهٔ Firefox قبلی با resend مسدودشده و NS_* نامشخص محفوظ است؛ کد خطای دقیق یا تحویل SMS از آن استنتاج نمی‌شود.

## پوشش واقعاً اجراشده و CF-INV01

| ID / subset | Chrome این batch | Firefox این batch | حد claim |
|---|---|---|---|
| ACO-H01؛ ACO-CP01…04 | initial۴۰۴ پس از auth؛ در source نهایی auth، selection، owned Add و cart checks موفق | همان source نهایی موفق | CP01 setup دستی دارد؛ quote-to-cart صرفاً presentation است |
| ACO-CP05…06؛ populated form/inventory | در H01 نهایی form غایب و این بخش کامل نشد | فرم/inventory و review درست بررسی شدند | Chrome CF بعدی فرم را دید، اما PASS CF نتیجهٔ H01 شکست‌خورده را بازنویسی نمی‌کند |
| ACO-CP07 | cleanup نهایی و postidentity موفق | cleanup H01 و postidentity موفق | historical post-Remove gap با نتایج جدید جبران می‌شود؛ نتیجه‌های تاریخی خودشان تغییر نمی‌کنند |
| CF-F01 / CF-CP01…02 | setup واقعی، populated form، metadata و empty required بررسی شدند | f18c همین subsetها را بررسی کرد؛ f18r پیش از login کامل متوقف شد | یک case با تلاش‌های مختلف؛ partial subset باعث PASS کل case نیست |
| CF-CP03 و CF-CP06 | کوتاه/minimum، correction و rapid exact maximumها موفق | short/minimum بررسی شد؛ rapid maximumهای name/address اجرا نشد | CF-INV01 از نتیجهٔ native کوتاه یا Chrome PASS بسته نمی‌شود |
| CF-CP04…05 و CF-CP07 | native mobile/postal، invalid→valid و baseline digit filtering موفق | در f18c همین assertionهای ثبت‌شده موفق | business localization، deliverability یا پذیرش server ثابت نمی‌شود |
| CF-CP08 و CF-CP09 | province/city association/reset و keyboard actions موفق | Tab موفق؛ قسمت بستن province و dependency کامل تأیید نشد | exact primary failureِ Firefox unresolved؛ menu behavior به‌طور حدسی PASS/FAIL قطعی نمی‌گیرد |
| CF-CP10…11 | narrow۳۹۰×۸۴۴، edit واقعی، listbox toggle و synthetic draft comparison موفق | اجرا نشد | physical device یا customer/address persistence پوشش ندارد |
| CF-CP12 | cleanup و هویت/سبد/draft پس از Remove موفق | hook شکست خورد؛ recovery مستقل موفق | recovery نتیجهٔ testcase را سبز نمی‌کند |

نتیجهٔ actual rapid diagnostics در Chrome CF:

| field | فرمان native تلاش‌شده | طول دقیق مورد انتظار/واقعی | keydown / beforeinput / input / keyup | focus loss / target متفاوت | پایان dispatch و پس از render |
|---|---:|---|---|---|---|
| name | ۱۲۱ | ۱۲۰ / ۱۲۰ | ۱۲۱ /۱۲۱ /۱۲۰ /۱۲۱ | ۰ /۰ | طول۱۲۰ و focused؛ دو render checkpoint؛ connected=true |
| street-address | ۳۰۱ | ۳۰۰ /۳۰۰ | ۳۰۱ /۳۰۱ /۳۰۰ /۳۰۱ | ۰ /۰ | طول۳۰۰ و focused؛ دو render checkpoint؛ connected=true |

trustedKeydown و trustedInput نیز با شمار مربوط بالا برابر بودند. assertion نهایی `bothRapidNativeBoundariesExact` واقعاً اجرا و PASS شد. مقدار programmatic برای ساخت نتیجه یا range permissive جای انتظار دقیق استفاده نشد. دو فرصت render تضمین نبود هر تأخیر آینده نیست و counterها علت همهٔ خطاهای driver/browser/application را ثابت نمی‌کنند.

`CF-INV01` **UNRESOLVED** است:۱۱۸/۱۲۰ تاریخی در این Chrome بازتولید نشد؛ Firefox به maximumها نرسید. native-control probeهای تاریخی و PASS جدید، علت observation قبلی یا fix برنامه را ثابت نمی‌کنند. P10-ORD01/02 نیز در این batch rerun نشدند و failureهای معتبر stale۲۴۰ در برابر انتظار۳۶۰/۴۸۰ باز می‌مانند.

## کنترل‌های خالص، حفظ تاریخچه و مرز عملیات

[بازبینی guard و correctness](EZPOST_QA_CHECKOUT_GUARD_REVIEW_2026-11-18.md) قرارداد هر تغییر و رفتار غلطی را که باید رد کند ثبت می‌کند. `node scripts/check-checkout-auth-sequence.cjs` با **۴۷ مثبت/۴۳ منفی PASS** و `node scripts/check-authenticated-checkout-contract.cjs` با **۳۱ مثبت/۸۲ منفی PASS** اجرا شدند. این‌ها pure guard/oracle checks بدون SMS/application هستند و به شمار۶ E2E یا controlled-response مرورگر اضافه نمی‌شوند. syntax، preservation، portability و publication checks نهایی باید با خروجی همان بستهٔ انتشار سنجیده شوند؛ سبزبودن check خالص جای نتیجهٔ browser نیست.

این slice فقط محصول/quote خواندنی، OTP مجاز دستی، یک Add متعلق به تست و Remove همان خط و synthetic browser edits داشت. تمام progressهای نهایی blockedMutations=۰ دارند؛ shipping quote، customer/address/profile save، form submit، create/confirm/cancel order و payment اجرا نشدند. ناتمام‌بودن عمدی address/mobile، guard مستقل و عدم کلیک submit/shipping حفظ شد. account retained است؛ این اجراها existing-login در برابر account-created را با مرجع مستقل تفکیک نکردند.

شماره، OTP، cookie/token، raw session/cart/draft، IDهای خصوصی، screenshot/recording شخصی، browser profile و crash dump عمومی نمی‌شوند. تمام evidence عمومی relative و سانیتایزشده است؛ runtime خصوصی ignored باقی می‌ماند. guardهای تاریخی، failureها، source manifestها و outcomeهای قبلی حفظ شده‌اند؛ برنامه یا dependency تغییر نکرده است.

## نقطهٔ ادامه و وضعیت انتشار

قدم بعدی **ارسال فوری OTP جدید نیست**. با رفع محدودیت واقعی کانال و درخواست بعدیِ مجاز، ابتدا visibility/focus واقعی Firefox و reporter محدود برای ثبت exact assertion اولیه بررسی شود؛ سپس فقط CF-F01 با همان source یا source جدیدِ صریحاً manifestشده، single-writer جاری و ورود دستی fresh اجرا شود. اگر ابزار مشترک یا spec تغییر کرد، subset متأثر در هر دو مرورگر دوباره لازم است. در وضعیت فعلی هیچ تست/احراز هویت اضافی خودکار شروع نمی‌شود.

اولویت‌های باز: failure form-render Chrome H01، exact primary assertion و animation/visibilityِ Firefox CF، تکمیل province/city/keyboard/narrow/draft/rapid boundaries در Firefox، CF-INV01 و دو P10 تاریخی. پیش از shipping/save/order/payment، مجوز و دادهٔ ایمن و restore پشتیبانی‌شده و قرارداد همان مرحله لازم است؛ این batch آنها را پوشش نمی‌دهد.

بستهٔ source/reports/evidence برای commit و انتشار عادی روی branch کار و ادغام در `main` آماده می‌شود. **وضعیت هنگام نگارش این گزارش: remote delivery هنوز در این سند تأیید نشده است.** SHA نهایی و نتیجهٔ fresh remote verification پس از انتشار باید به همین checkpoint افزوده شود؛ هیچ push انجام‌نشده‌ای موفق گزارش نمی‌شود.
