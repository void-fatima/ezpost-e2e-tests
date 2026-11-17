# بازبینی طراحی و correctness انتقال سبد احرازشده به checkout

تاریخ: ۱۷ نوامبر ۲۰۲۶. Workspace مستقل: `C:\Users\LOCAL_USER\Desktop\EZPost`. دامنه: batch نخست `ACO-H01`؛ یک journey در هر مرورگر با setup دستی واقعی و assertionهای خودکار پس از آن. این گزارش، بازبینی پیش از اجرا و بازبینی دوم کد را ثبت می‌کند. **در checkpoint این بازبینی، اجرای جدید E2E این batch هنوز NOT EXECUTED است**؛ بازشدن Cypress یا آماده‌بودن فرم login به‌تنهایی PASS یا completed execution نیست. گزارش اجرای بعدی باید نتیجه و source مشترک Chrome/Firefox را جدا ثبت کند.

## قرارداد و منابع بررسی‌شده

| منبع | نقش در انتظار |
|---|---|
| درخواست جاری کاربر برای authenticated cart و customer/address form | ordinary login واقعی و add/change/remove فقط اقلام متعلق به suite مجاز؛ نگه‌داشتن حساب و حفظ تمام اقلام قبلی؛ order/payment و persist ناشناختهٔ customer/address ممنوع |
| [قرارداد ACO-H01](../Test-Cases/EZPOST_QA_AUTHENTICATED_CHECKOUT_TEST_CASES.md) | شروع، prerequisite، intent مستقل، اقدام، oracle، ownership، مرز فرم و cleanup پیش از کد تعریف شده‌اند؛ checkpointها test اضافه نیستند |
| [قرارداد authenticated session](../Test-Cases/EZPOST_QA_AUTHENTICATED_SESSION_TEST_CASES.md) | setup دستی، anchor خصوصی، session/me ordinary و محدودیت نتیجهٔ ورود؛ تاریخچهٔ آن بدون تغییر محفوظ است |
| [fixture مستقل محصول](../../cypress/fixtures/cart-observed.json) | product/package/labels معلوم؛ مرجع تجاری قیمت نیست. candidateها BF49 در q2 یا Simple58 در q1، فقط وقتی کل محصول در baseline حساب غایب است |
| [support مجزا](../../cypress/support/authenticated-checkout.js)، [runtime ابزار](../../cypress/support/authenticated-checkout-runtime.js) | allowlist محدود این slice و gate مشترک Cypress؛ state موفق به AUT تزریق نمی‌شود و guard suiteهای قبلی عوض نمی‌شود |
| [oracle خالص ownership](../../cypress/support/authenticated-checkout-contract.cjs)، [spec](../../cypress/e2e/checkout/authenticated-cart-checkout.cy.js) | assertions نهایی، حفظ baseline، registration قبل از quantity assertion، cart-to-form و cleanup بررسی شدند |
| [checker محلی oracle](../../scripts/check-authenticated-checkout-contract.cjs) | دادهٔ synthetic فقط در حافظه؛ ۱۲ کنترل مثبت و ۳۱ کنترل منفی، مستقل از live application و E2E |

قیمت quote فقط برای انتقال presentation استفاده می‌شود. user intent و fixture، oracle مستقل هویت محصول/package/quantity هستند؛ مقایسهٔ quote با cart/review، independent price/tier/tax/rounding correctness نیست. observed destination نیز business policy مصوب return/eligibility نمی‌شود.

## نتیجهٔ بازبینی دوم کد

| بخش حیاتی | رفتار نادرستِ قابل رد | علت کافی‌بودن assertion برای همین claim |
|---|---|---|
| هویت ordinary | guest، شمارهٔ دیگر، نقش غیر `customer`، session.id نامعتبر یا تغییر identity در طول journey | شمارهٔ واقعاً submitشده پیش از session موفق در closure خصوصی anchor است؛ session و me با آن correlate و role دقیق بررسی می‌شوند. `200` یا non-null بودن به‌تنهایی کافی نیست |
| انتخاب fixture امن | افزودن به همان محصول قبلی کاربر یا فرض merge بین packageها | کل محصول candidate باید در baseline غایب باشد؛ BF50 fallback برای محصول BF موجود پذیرفته نیست. اگر هر دو محصول known موجود باشند، prerequisite روشن fail می‌شود |
| quote و انتخاب نهایی | package/quantity نامرتبط، labels اشتباه یا مبلغ presentation منتقل‌شدهٔ نادرست | request و response با intent correlate می‌شوند؛ انتخاب نمایان، quantity و render نهایی بررسی و همان مبلغ در cart و row محصول checkout تطبیق داده می‌شود |
| ownership و composition سرویس | صفر/چند خط جدید، تغییر/حذف baseline، product/package/artwork متفاوت، quantity اشتباه | id جدید باید غایب از baseline باشد؛ دقیقاً یک خط جدید و baseline canonicalِ ثابت لازم است. oracle پس از ownership، quantity را جدا و سخت بررسی می‌کند |
| cart-to-checkout | navigation موفق همراه cart نادرست، فرم غایب یا محصول/quantity/amount review اشتباه | سبد پُر، session، snapshot cart، فرم واقعی و row owned در review بررسی می‌شوند؛ main visible یا URL به‌تنهایی oracle نیست. package text در review ادعا نمی‌شود |
| cleanup | حذف unowned line، بازماندن قلم suite، تغییر اقلام قبلی یا پنهان‌کردن cleanup failure | id owned پیش از assertionهای quantity/presentation ثبت می‌شود؛ دکمهٔ Remove محصول یکتا با allowlist همان id correlate است؛ snapshot اولیه باید بازگردد. خطا swallow نمی‌شود و failure اولیه با green نتیجهٔ cleanup جایگزین نمی‌شود |

در queueهای خوانده‌شده، callbackی که هم Cypress commands اضافه کند و هم مقدار synchronous نامرتبط بازگرداند مشاهده نشد. nested commandها به queue افزوده می‌شوند؛ setup دستی با Promise محدودِ فرصت انسان انجام می‌شود و sleep دلخواه جای synchronization نیست. هیچ forced action، mock موفق auth/cart، exception suppression عمومی یا branch حذف‌کنندهٔ assertion اصلی دیده نشد. شاخهٔ انتخاب fixture قبل از اقدام، prerequisite داده است؛ شاخهٔ پذیرش هر نتیجهٔ دلخواه نیست.

اجازهٔ mutation فقط start/verify دقیق و یک Add با همان payload intent و یک Remove برای id owned است؛ quote read-only موجود محفوظ می‌ماند. cart edit در batch اول اجرا نمی‌شود، هرچند U1 برای اقلام owned آن را مجاز کرده است. shipping، profile/address/customer save، order و payment بسته‌اند؛ دکمه‌های shipping و submit روی فرم فقط شناسایی می‌شوند و فعال نمی‌شوند.

## challenge مستقل oracle

خروجی isolated checker این batch **۱۲ کنترل مثبت و ۳۱ کنترل منفی** دارد. این کنترل‌ها application/browser را اجرا نمی‌کنند، OTP یا session واقعی ندارند و در تعداد E2E شمارش نمی‌شوند. نتیجهٔ آنها اثبات رفتار درست backend یا فرم نیست.

- کنترل‌های منفی، wrong product/package و type mismatch، artwork ناخواسته، quantity نادرست، خط قبلی حذف/تغییریافته، چند خط جدید، نبود خط جدید، merge روی خط قبلی و وجود همان محصول در package دیگر baseline را رد می‌کنند.
- ورودی‌های malformed شامل items غیرآرایه/غایب، null یا sparse line، id نامعتبر/تکراری، product/package غایب، artwork نامعتبر و quantity نامعتبر نیز رد می‌شوند؛ خطاها code ثابت و بدون interpolation مقدار خصوصی دارند.
- کنترل‌های مثبت، ownership صحیح، نادیده‌گرفتن صرف ترتیب خطوط، تمایز id عددی/رشته‌ای، restoration درست و تشخیص restoration نادرست را بررسی می‌کنند. registration یک خط با quantity مثبتِ غلط عمداً می‌تواند مرحلهٔ ownership را بگذراند تا cleanup ممکن باشد؛ همان داده باید در oracle سخت quantity رد شود.
- تفاوت مبلغ در این oracle خالص identity عمداً به‌عنوان money correctness ارزیابی نمی‌شود؛ spec مبلغ presentation را جدا بررسی می‌کند. این تفکیک نباید به ادعای green قیمت تجاری تبدیل شود.

سؤال دومِ هر بخش حیاتی این بود: «آیا با خراب‌بودن رفتار ادعاشده هنوز می‌تواند PASS شود؟» موارد بالا برای خطاهای مشخص strengthen یا به claim محدود شده‌اند. این review اثبات نمی‌کند هیچ false positive دیگری ممکن نیست؛ validator challengeهای identity/cart نیز تست منفی auth backend محسوب نمی‌شوند.

## دو محدودیت مشخص coverage

1. **اقلام unaffected در snapshot نرمال‌شدهٔ server-cart حفظ می‌شوند؛ DOM کامل آنها assert نمی‌شود.** پنهان‌شدن یک قلم قبلی فقط در UI ممکن است از این subset عبور کند. claim این batch، حفظ association/quantity و composition سرویس همراه row owned نمایان است؛ پوشش کامل render تمام اقلام قبلی نیست.
2. **هویت ACO در anchored session/me و account link سنجیده می‌شود؛ dashboard mobile/role UI دوباره اجرا نمی‌شود.** بررسی dashboard واقعی متعلق به `AUTH-SESSION01` قبلی است و PASS احتمالی این batch نباید به rerun آن تعبیر شود. account link به‌تنهایی identity oracle نیست؛ assertions session/me ضروری‌اند.

## privacy، نتیجه و مرز توقف

baseline، line id، artwork id، mobile anchor و responseهای حساس فقط در حافظهٔ لازم می‌مانند؛ error codeها مقدار خصوصی ندارند. خروجی public باید تنها status/checkهای allowlistشده، metadata بی‌مقدار فرم و نتایج سانیتایزشده را داشته باشد. raw request/response/DOM، field values، session body، screenshot شخصی و browser profile منتشر نشوند؛ output/runtime خصوصی باید در workspace و از انتشار مستثنا بماند.

این بازبینی مانع شناخته‌شده‌ای برای launch محدود همین slice پیدا نکرد؛ **نتیجهٔ طراحی و review، نتیجهٔ اجرای برنامه نیست**. اجرای visible، form inventory واقعی، initial failure/rerun و cleanup هنوز باید با شاهد خودشان گزارش شوند. تا inspection، کیس تفصیلی validation فرم، digit normalization، province/city، history retention یا persistence PASS یا پیاده‌شده فرض نمی‌شود. P10 و نتایج تاریخی تغییری نمی‌کنند و سفارش/پرداخت همچنان خارج این batch هستند.
