# بازبینی قرارداد و correctness ابزار checkout — ۱۸ نوامبر ۲۰۲۶

مبنای این تغییر `146df24ebe66f24022b1b99d58160b32111ceb52` در مخزن عمومی EZPost است. دامنه فقط ابزار ورود دستی، ownership قلم تست، cleanup احرازشده و تشخیص محدود `CF-INV01` برای دو journey موجود `ACO-H01` و `CF-F01` است. IDها، traceability و نتیجه‌های تاریخی حفظ می‌شوند؛ checkpointهای هر journey تست مستقل نیستند.

این سند بازبینی کد و قرارداد است. شمار کنترل‌های خالص زیر نتیجهٔ اجرای مرورگر یا برنامه نیست. نتیجهٔ live باید از evidence همان اجرای نمایان و source manifest همان نوبت خوانده شود؛ بازشدن Cypress، بارگذاری spec، تکمیل OTP و تکمیل assertion/cleanup وضعیت‌های جدا هستند. این سند هیچ نتیجهٔ اجرای آینده را PASS فرض نمی‌کند.

## منابع و حد استناد

| منبع | استفادهٔ مجاز |
|---|---|
| درخواست جاری کاربر و تأیید عملی single-writer در همین گفتگو | ورود با همان هویت عادی تعیین‌شده؛ initial OTP و حداکثر یک resend که خود کاربر از UI واقعی آغاز کند؛ استفادهٔ انحصاری واقعی از حساب در تمام بازهٔ اجرا؛ Add/Remove فقط قلم اثبات‌شدهٔ همین run. این مجوز به shipping، save، order یا payment گسترش ندارد |
| [قرارداد خواندنی resend](../Evidence/Checkout-Regression-2026-11-18/login-resend-public-contract.json) | GET موفق module عمومی `/_nuxt/components/login-screen.tsx` در ۱۸ نوامبر، با SHA-256 ثبت‌شده. نشان می‌دهد resend هنگام busy/cooldown اجرا نمی‌شود و کنترل واقعی `button.auth-resend-btn[type="button"]` پس از شمارش معکوس نمایان می‌شود. این inspection هیچ OTP نفرستاد؛ پیامک، provider، TTL یا policy تجاری را ثابت نمی‌کند |
| [قرارداد ACO-H01](../Test-Cases/EZPOST_QA_AUTHENTICATED_CHECKOUT_TEST_CASES.md)، [قرارداد CF-F01](../Test-Cases/EZPOST_QA_CUSTOMER_FORM_TEST_CASES.md) | قصد مستقل محصول/package/quantity، ordinary identity، حفظ baseline و مرز فرم ناقص؛ انتظارهای مطلوب تاریخی برای هماهنگی با gap پیاده‌سازی ضعیف نشده‌اند |
| [fixture تاریخی محصول](../../cypress/fixtures/cart-observed.json)، [fixture تاریخ‌دار checkout](../../cypress/fixtures/checkout-observed-2026-11-18.json) و metadata تاریخی فرم | هویت محصول/package/labels و constraint native مشاهده‌شده؛ در اجرای جدید دوباره با UI تطبیق داده می‌شوند. fixture جدید فقط متعلق به این دو spec checkout است؛ fixture قدیمی و تست‌های قبلی دست‌نخورده‌اند. fixture مرجع مستقل قیمت و metadata مصوبهٔ server/business نیست |
| [آرشیو source تاریخی](../Evidence/Checkout-Regression-2026-11-18/historical-source/manifest.json) | بایت‌های قدیمی با SHA-256 مستقل حفظ شده‌اند؛ executed-spec snapshotهای قدیمی برای variantهای پیشین مرجع خودشان می‌مانند. source و شکست‌های تاریخی بازنویسی نشده‌اند |
| [گزارش اجرای تاریخی فرم](EZPOST_QA_CUSTOMER_FORM_EXECUTION_2026-11-17.md) | سابقهٔ ۱۱۸ به‌جای۱۲۰ و وقفهٔ ورود Firefox. HTTP200 اول، تحویل SMS را ثابت نکرد؛ guard، resend را رد کرده بود و کد دقیق NS_* ثبت نشده است |

## قراردادهای پیش از اجرا و رفتار غلط قابل رد

| بخش | شروع و پیش‌شرط | اقدام | انتظار observable و منبع | رفتار غلطی که باید رد شود |
|---|---|---|---|---|
| initial OTP | context اختصاصی؛ guest sync خالی؛ phase واقعی phone؛ شماره فقط در حافظه و همان input واقعی کاربر | POST واقعی `otp/start` از UI با فقط `mobile` | method/path/body/phase/input دقیق و فقط یک initial start؛ پاسخ موفق فقط اجازهٔ ادامه به مرحلهٔ OTP است. منبع: قرارداد مشاهده‌شدهٔ auth و مجوز کاربر | درخواست با شمارهٔ متفاوت از input، key اضافی، phase اشتباه، guest sync نامعلوم یا initial تکراری |
| یک resend دستی | initial start موفق؛ هنوز verify انجام نشده؛ همان شماره؛ cooldown برنامه تمام شده و کنترل واقعی فعال/نمایان است | خود کاربر روی resend عادی کلیک می‌کند؛ capture listener فقط trusted click همان کنترل را می‌بیند | arming یک‌بارمصرف؛ فقط یک درخواست اضافهٔ same-identity و سپس پاسخ همان درخواست. منبع: public module و حد مجوز کاربر؛ ابزار دکمه را کلیک/فعال نمی‌کند | resend بدون arm، synthetic click، کنترل ناشناس/غیرفعال، شمارهٔ دیگر، درخواست هم‌زمان یا start سوم |
| verify و نشست | یک initial یا initial+یک resend موفق؛ شش input واقعی OTP؛ همان identity anchor خصوصی | verify طبیعی حاصل از ورود کد توسط کاربر؛ سپس GETهای مستقل session و `/me` | sequence کامل با یک verify، payload دقیق و تطبیق شش field؛ بعد session با id مثبت ثابت و mobile/role عادی منطبق و `/me` منطبق. منبع: قرارداد auth؛ HTTP موفق به‌تنهایی login نیست | verify قبل پاسخ start، کد نامنطبق با inputها، identity دیگر، پاسخ ناموفق، guest یا admin و session اشتباه |
| آماده‌سازی Add | ordinary identity؛ baseline خصوصی معتبر؛ draft قبلی absent؛ کل محصول مورد قصد در سبد غایب؛ تأیید واقعی exclusivity برای همین بازه | انتخاب UI واقعی با intent fixture و quote correlated؛ سپس یک Add عادی با body دقیق | `armed` با `permitted` و `responseObserved/responseSucceeded` جدا ثبت شود. منبع: درخواست و قرارداد client cart؛ arm یا HTTP تنها مالکیت نیست | Add بدون تأیید single-writer، تغییر intent، extra body، درخواست دوم یا ادعای موفقیت پیش از response |
| attribution قلم | همان بازهٔ single-writer برقرار؛ Add دقیق واقعاً permitted و response موفق مشاهده شده | در مسیر عادی post-Add، unique line با before/after مقایسه شود | دقیقاً یک ID جدید با product/package/artwork مورد قصد و baseline دست‌نخورده؛ سپس quantity سخت بررسی شود. منبع: exclusivity واقعی + lifecycle موفق + composition مستقل | matching delta ساخته‌شده بدون Add اثبات‌شده، missing/failed response، چند خط احتمالی، merge روی محصول قبلی، تغییر baseline، wrong product/package/artwork/quantity |
| cleanup | ownership قبلاً در مسیر عادی established؛ هویت session و `/me` قبل Remove معتبر؛ hydration سبد با همان owned ID | فقط Remove عادی همان خط و همان endpoint دقیق، یک بار | پس از پاسخ موفق Remove، session و `/me` دوباره مستقل خوانده شوند؛ همان ordinary identity، owned line غایب، baseline ثابت و دو کلید draft absent باشند. منبع: قرارداد حفظ دادهٔ کاربر و مسیر واقعی Remove | حذف unowned line، claim جدید در teardown، guest fallback پس از Remove، حساب دیگر، owned line باقی‌مانده، تغییر خط قبلی یا باقی‌ماندن/پاک‌سازی draft شخصی |
| فرم ناقص و rapid boundary | فرم واقعی با metadata دقیق؛ مقدار شخصی/draft قبلی وجود ندارد؛ address یا mobile عمداً خالی است | native editهای synthetic؛ name با۱۲۱ فرمان و address با۳۰۱ فرمان، بدون sync میان تک‌کلیدهای این دو آزمایش rapid | نتیجهٔ دقیق name برابر۱۲۰ X و address برابر۳۰۰ X، maxLength درست و focus صحیح؛ هر دو observation پیش از assertion نهایی حفظ شوند. منبع: metadata native مشاهده‌شده، بدون تغییر انتظار | توقف در۱۱۸، مقدار/طول اشتباه، focus ازدست‌رفته یا boundary غلط؛ completion فرمان به‌جای مقدار حاصل موفق فرض نشود |

## پیاده‌سازی محدود guard ورود

[guard جداگانهٔ checkout](../../cypress/support/authenticated-checkout.js) از [sequence خالص auth](../../cypress/support/checkout-auth-sequence.cjs) استفاده می‌کند. guardهای read-only و authentication تاریخی خارج این slice باز نشده‌اند. فقط دو endpoint auth مشاهده‌شده با POST بدون query و keyهای دقیق پذیرفته می‌شوند؛ اجازهٔ کلیِ mutation یا wildcard احراز هویت ایجاد نشده است.

capture listener، `isTrusted`، مسیر `/login`، شش input واقعی، تعلق کنترل به همان document، visible/enabled بودن و نبود countdown را پیش از arm بررسی می‌کند. arm درخواست نمی‌فرستد و یک بار مصرف می‌شود. sequence تا پایان start/resend in-flight درخواست اضافه را رد می‌کند. assertion قبلی «دقیقاً یک start در همهٔ وضعیت‌ها» با `boundedManualStartResendAndVerify` جایگزین شده؛ حدها و sequence حذف نشده‌اند: start=۱/resend=۰ یا start=۲/resend=۱/arm=۱، همراه یک verify موفق لازم است.

این محدودیت مجوز ابزار است، نه ادعای policy واقعی برنامه دربارهٔ تعداد resend. نرسیدن SMS با HTTP200 رفع‌شده فرض نمی‌شود. اگر کانال باز هم پیامک نرساند، setup ناقص گزارش می‌شود و اقدام خودکار/تکراری تازه مجاز نیست.

## اصلاح تاریخ‌دار prerequisite محصول

در نخستین اجرای Chrome این batch، ورود دستی موفق شد اما مسیر fixture قدیمی `/products/blackfri-01` پاسخ۴۰۴ داد؛ journey پیش از Add شکست خورد و cleanup=`not-needed` بود. این شکست حفظ می‌شود و PASS یا خطای قیمت نامیده نمی‌شود. [inspection خواندنی مسیرهای عمومی](../Evidence/Checkout-Regression-2026-11-18/product-route-prerequisite.json) علاوه بر آن،۴۰۴ بودن `/products/simple` و دو GET API محصول قدیمی را ثبت کرد؛ catalog عمومی فقط `/products/blackfriday-ezpost` را معرفی می‌کرد.

[DOM عمومی فعلی](../Evidence/Checkout-Regression-2026-11-18/current-product-dom.json) مسیر جدید با۲۰۰، نام «بلک فرایدی ایزی پست» و package انتخاب‌شدهٔ «بسته ۱۴۰ لیبلی» را ثبت کرد. fixture جدید تاریخ‌دار، package63/۱۴۰ و quantity2 را **پیش از Add** به‌عنوان intent همین batch مشخص می‌کند؛ کل محصول جدید باید در baseline حساب غایب باشد. assertionهای نام/package/labels/quantity، unique new line و حفظ baseline پابرجا هستند. این نگهداری دادهٔ تست بر اساس inspection مستقلِ پیش از اقدام است؛ انتظار نتیجه از cart برگشتی ساخته نمی‌شود، oracle قیمت ایجاد نمی‌کند و تاریخی‌بودن fixture قبلی را پنهان نمی‌کند. دسترسی جدید و این اصلاح fixture، مالکیت live قلم یا نتیجهٔ اجرای source جدید را به‌تنهایی ثابت نمی‌کنند.

## ownership و chronology پاک‌سازی

[oracle سبد](../../cypress/support/authenticated-checkout-contract.cjs) lifecycle خصوصی `arm → permitAdd → observeAddResponse → establish` دارد. وضعیت عمومی فقط booleanهای این مراحل است؛ شماره، ID خصوصی و cart snapshot صادر نمی‌شوند. موفقیت response فقط HTTP2xx است و همراه intent دقیق، exclusivity واقعی و unique delta استفاده می‌شود. قرارداد واقعی response به‌عنوان correlation اختصاصیِ writer یا server lock ثابت نشده و چنین فیلدی اختراع نشده است.

کاربر استفادهٔ واقعی single-writer را برای تمام بازهٔ این اجراها تأیید کرده است. launcher تنها با `--single-writer-confirmed` اجازهٔ این slice را می‌دهد. این flag ثبت prerequisite عملی است؛ خودش انحصار حساب را در سرور enforce یا مستقلاً prove نمی‌کند. اگر تأیید عملی دیگر برقرار نباشد، attribution از delta کافی نیست و mutation باید متوقف شود. صرف حساب تعیین‌شده یا بسته‌بودن پنجره‌های محلی جای این شرط را نمی‌گیرد.

`identifyOwned` به‌تنهایی فقط composition checker باقی می‌ماند. در specهای جدید ownership فقط از `registerOwned(baseline, items)` و lifecycle برقرار می‌شود؛ [ACO-H01](../../cypress/e2e/checkout/authenticated-cart-checkout.cy.js) و [CF-F01](../../cypress/e2e/checkout/customer-form.cy.js) fallbackِ attribution در teardown ندارند. ثبت ID پیش از quantity assertion فقط وقتی provenance برقرار است انجام می‌شود؛ اگر سرور quantity مثبت غلط برگرداند، انتظار quantity همچنان FAIL است و cleanup همان خط منتسب‌شده امکان‌پذیر می‌ماند.

[cleanup مشترک](../../cypress/support/checkout-owned-cleanup.js) پیش از Remove دو منبع identity را بررسی می‌کند. اگر Add permitted نبوده، cleanup mutation لازم نیست؛ اگر permitted بوده ولی ownership established نشده، وضعیت `ownership-uncertain` و failure صریح ثبت می‌شود و هیچ خطی از delta ادعا یا حذف نمی‌شود. uncertain outcome با «cleanup موفق» پنهان نمی‌شود.

ترتیب queue پس از Remove چنین است: انتظار پاسخ همان Remove؛ GET تازه session و کنترل stable id/mobile/customer؛ GET تازه `/me` و کنترل mobile/customer؛ GET سبد؛ خواندن خصوصی دو draft؛ سپس `verifyRestored` و وضعیت `restored`. بنابراین مقایسهٔ سبد خالی مهمان با baseline احرازشدهٔ خالی کافی نیست. checker خالص محتوا را challenge می‌کند؛ chronology شبکه را خود helper با این ترتیب اجرا می‌کند و نتیجهٔ واقعی نیازمند evidence همان مرورگر است.

draft اولیه باید برای `ezpost_checkout_address` و `ezpost_active_order_id` absent باشد. فرم فقط draft synthetic همین run را از UI می‌سازد و مسیر Remove عادی همان کلیدها را پاک می‌کند؛ هیچ reset مستقیم storage یا حذف draft قبلی انجام نمی‌شود. snapshot baseline، identity/quantity/composition را می‌سنجد؛ صحت مستقل monetary fields یا render همهٔ خطوط unaffected از آن نتیجه‌گیری نمی‌شود.

## CF-INV01 و تشخیص محدود ورودی native

شاهد تاریخی [input-failure-metadata](../Evidence/Authenticated-Checkout-2026-11-17/chrome-form-native-01/input-failure-metadata.json) طول۱۱۸ را با maxLength=۱۲۰ حفظ می‌کند. [مقایسهٔ native مستقل تاریخی](../Evidence/Authenticated-Checkout-2026-11-17/native-input-probe/rapid-results.json) در context جدا و `about:blank`، پنج بار با پارامترهای دقیق CDP و پنج بار با keyboard Playwright به۱۲۰ رسیده است. این ده observation، اجرای برنامه/Cypress نیستند و علت اختلاف تاریخی را مشخص نمی‌کنند. PASS بعدی Chrome نیز علت یا fix برنامه را ثابت نکرده است؛ `CF-INV01` باز می‌ماند.

کد جدید دو تلاش rapid با expectation بدون تغییر را نگه داشته است. برای هر تلاش، شمار `keydown/keyup/beforeinput/input`، trusted events، blur، تفاوت event target با control اولیه، بیشترین طول مشاهده‌شده، طول و focus هنگام پایان فرمان، و طول/focus/connected state پس از دو فرصت render ثبت می‌شود. تنها شمارش/boolean و متن synthetic از پیش معلوم برای مقایسهٔ خصوصی استفاده می‌شود؛ value شخصی، keystroke/OTP واقعی یا DOM خام صادر نمی‌شود.

`cy.press()` completed مساوی با state نهایی فرض نشده است؛ observation در پایان dispatch از observation پس از `afterBrowserRender()` جداست. دو requestAnimationFrame checkpoint محدودند و نبود هر نوع overwrite تأخیری آینده را تضمین نمی‌کنند. focus loss، شمار event کمتر از تعداد فرمان، target متفاوت یا اختلاف completion/render می‌تواند فرضیه‌ها را محدود کند، اما یک counter به‌تنهایی علت driver، browser یا render برنامه را قطعی نمی‌کند. `targetReplacements` شمار eventهای رسیده به target متفاوت است؛ شمار دقیق re-render یا همهٔ replacementهای بدون event نیست.

هر دو observation نگه داشته و سپس `bothRapidNativeBoundariesExact` اجباری اجرا می‌شود؛ انتظار۱۲۰/۳۰۰ به range یا۱۱۸ تغییر نکرده و مقدار programmatic برای ساختن نتیجه نوشته نمی‌شود. repeat نامحدود تا سبزشدن وجود ندارد. ورودی‌های کوتاه برای native minlength از مسیر native با بررسی prefix استفاده می‌کنند؛ این pacing به rapid maximum آزمایش‌شده اضافه نشده است.

## challengeهای خالص و بازبینی دوم

| بررسی اجراشدهٔ خالص | مثبت | منفی | حد نتیجه |
|---|---:|---:|---|
| [sequence auth](../../scripts/check-checkout-auth-sequence.cjs) | ۴۷ | ۴۳ | PASS؛ initial/resend صحیح پذیرفته و wrong identity، synthetic/disabled/unarmed resend، درخواست اضافه، verify/body/phase نامعتبر، response ناموفق/تکراری و identity غیرعادی رد می‌شوند؛ هیچ SMS یا login واقعی اجرا نشده است |
| [ownership/restoration oracle](../../scripts/check-authenticated-checkout-contract.cjs) | ۳۱ | ۸۲ | PASS؛ کنترل‌های قبلی محفوظ، علاوه بر lifecycle و post-Remove guest/wrong-user، uncertain Add، cleanup unowned، تغییر baseline و draft نامعتبر. این کنترل‌ها E2E یا اثبات backend نیستند |

بازبینی دوم برای هر بخش پرسید: «آیا با خراب‌بودن رفتار ادعاشده، هنوز امکان PASS وجود دارد؟» صرف URL، وجود عنصر یا HTTP200 حذفِ جایگزین assertion نیست؛ expected identity از همان پاسخ موفق کپی نمی‌شود. قصد product/package/quantity از fixture و انتخاب معلوم می‌آید؛ request و response با همان انتخاب correlate و rowهای cart/checkout بررسی می‌شوند. quote→UI/cart فقط presentation consistency است؛ خطای مشترک price server و دو UI می‌تواند از آن بگذرد، پس قیمت تجاری، rounding، tax یا shipping coverage ادعا نمی‌شود.

pure negatives، استفادهٔ اشتباه از محتوا/sequence را challenge می‌کنند؛ enforcement واقعی provider، server authorization، writerهای هم‌زمان یا تمام false positiveهای ممکن را اثبات نمی‌کنند. انتساب قلم وابسته به واقعیت single-writer تأییدشده است. کنترل تمام DOM اقلام قبلی، account dashboard، session expiry، custom-submit validation، backend validation و سیاست مطلوب Persian/Arabic digit normalization خارج claim همین slice باقی می‌مانند.

## اجرای نمایان، privacy و مرز مرحله

[launcher موجود](../../scripts/open-authenticated-checkout.cjs) از Cypress محلی با `open --e2e` و config اختصاصی، label تازه و source manifest استفاده می‌کند. [driver نمایان فعلی](../../scripts/drive-checkout-visible.cjs) فقط runner اختصاصی Chrome/Firefox را برای انتخاب spec و مشاهدهٔ نتیجه کنترل می‌کند؛ شماره/OTP را وارد نمی‌کند. [observer](../../scripts/checkout-runner-observer.cjs) error name/code مجاز، count/checkهای محدود و boundary diagnostic synthetic را جمع می‌کند؛ raw error، AUT DOM، session و network body عمومی نمی‌شوند. polling driver خارج queue تست است و جای sync action/assertion را نمی‌گیرد.

source باید پیش و پس از اجرای هر مرورگر یکسان باشد و همهٔ helperهای مشترک در manifest منظور شوند. اگر helper بعد اجرای اول تغییر کرد، نتیجهٔ مرورگر دوم نتیجهٔ همان source نیست و subset متأثر نیازمند rerun است. فقط فایل‌های review/report نتیجه، source اجرایی را تغییر نمی‌دهند. آخرین runner نمایان برای بازبینی باز می‌ماند؛ نتیجهٔ نهایی هر اجرا و setup/cleanup باید جدا در گزارش execution ثبت شود.

شماره، OTP، cookie/token، private IDها، raw cart/session/draft، profile، screenshot/recording شخصی و runtime عمومی نمی‌شوند. screenshots/video غیرفعال‌اند و private output/runtime داخل EZPost و ignored می‌ماند؛ source/evidence تاریخی بدون تغییر حفظ می‌شود.

فرم عمداً ناقص می‌ماند: پیش از هر edit، address خالی است؛ حین آزمون address، mobile خالی است. guard مستقل تمام shipping quote، submit/save customer/address/profile، order و payment را رد می‌کند. Enter فقط برای activation کنترل button مشخص است؛ submit/Next مبهم کلیک نمی‌شود. ordinary account قبلی/جدید از این گزارش قابل تشخیص فرض نمی‌شود و حساب نگه داشته می‌شود. P10-ORD01/02 و failureهای تاریخی فرم/Firefox بازنویسی یا با کنترل‌های خالص این مرحله جایگزین نمی‌شوند؛ این کار پوشش کامل سفارش/پرداخت نیست.
