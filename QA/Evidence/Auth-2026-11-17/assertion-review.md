# EZPost — بازبینی مستقل صحت و حریم خصوصیِ auth-entry

تاریخ: ۱۷ نوامبر ۲۰۲۶. این بازبینی توسط عامل دوم، فقط با خواندن کد و evidence انجام شد. هیچ مرورگر یا تستی توسط این reviewer اجرا نشد؛ کد اجرایی، Git و دادهٔ برنامه تغییر نکردند. تنها فایل افزوده‌شده همین سند است. نتیجهٔ browser باید از JSON اجرای مربوط خوانده شود؛ تأیید این بازبینی معادل تأیید ورود واقعی یا ایجاد حساب نیست.

## نسخه و مرز مجوز

فایل‌های اصلی بررسی‌شده: `cypress.auth.config.cjs`، `cypress/support/authentication.js`، `authentication-helpers.js`، guard موجود `e2e.js`، spec قبلی `ordering/browser/auth-entry.cy.js`، spec تازهٔ `authentication/shopping-entry.cy.js` و ابزارهای observer/launcher/driver.

شناسهٔ source ثابت: `57c400d6aacd060fdf37e83107e30fdeb0382993c6a3acd1615dc4af00a292bd`. بررسی مجدد manifest Chrome در `2026-11-17T17:18:09.704Z` هر **۲۳ ورودی** را unchanged تأیید کرد. ابزار تشخیصی observer خارج source ID است؛ assertionهای تست را تغییر نمی‌دهد.

کاربر کانال تحت کنترل و ورود دستی را پیشنهاد کرده، اما existing بودن حساب را تأیید نکرده است. چون ایجاد حساب جدید جداگانه مجاز نشده، این اجرای مشخص فقط **public/read-only** است؛ هیچ auth POST، OTP، ordinary authenticated identity، return-after-login، merge یا customer write اجرا یا تأیید نمی‌شود. guard مشترک تغییر نکرده و `authentication.js` همان guard را import می‌کند. این مرز با وضعیتِ طرح اولیهٔ manual-assisted که در سند طراحی توضیح داده شده یکی نیست؛ اجرای جاری نباید manual sign-in completed گزارش شود.

## قراردادهای بررسی‌شده

| ID و تعداد اجرای طراحی‌شده در هر مرورگر | starting state، اقدام و انتظار | منبع انتظار و خطای مشخصی که رد می‌شود | محدودیت / امکان false pass بیرون ادعا |
|---|---|---|---|
| A01-ORD01، دو viewport | guest واقعی، ورود مستقیم به login؛ heading، label متصل، input خالی و attrs native مشخص، submit نمایان | قرارداد تاریخی فرم و مشاهدهٔ تازهٔ public DOM؛ label اشتباه، required/pattern/type یا ساختار فرم اشتباه باید fail شود | اثبات grammar تجاریِ همهٔ شماره‌ها، server validation، SMS یا account وجود ندارد |
| A01-ORD02، دو viewport | guest؛ required خالی، حروف/ورودی کوتاه، طول native، clear؛ بدون submit | assertionهای قبلی بدون تغییر حفظ شده‌اند؛ مقدار برخلاف انتظار، نبود patternMismatch، native/form validity نادرست یا auth POST باید fail شود | HTML pattern و native length قرارداد این subset هستند؛ normalization مطلوبِ محصول یا رد server از آنها نتیجه نمی‌شود |
| A01-ORD04، دو viewport | guest؛ invalid→نمونهٔ محلی با format native معتبر→invalid→empty، بدون submit | transitionهای قبلی مقدار/validity/form؛ اصلاح بی‌اثر، پذیرش native نامطابق یا ارسال ناخواسته رد می‌شود | نمونهٔ محلی هویت تست supplied یا حساب موجود نیست؛ معتبرشدن native به معنای پذیرش شماره یا verify نیست |
| A01-ORD03، یک اجرا | guest؛ focus ورودی و Tab، بدون Enter یا submit | focus باید روی submit موردنظر باشد، ورودی خالی و route login باقی بماند؛ focus کنترل دیگر یا ارسال ناخواسته رد می‌شود | keyboard navigation تا کنترل submit است؛ فعال‌سازی و نتیجهٔ authentication آزموده نمی‌شوند |
| AUTH-ENTRY01، یک اجرا | guest مستقل روی محصول Simple با route و H1 fixture صحیح؛ کلیک explicit account-link یکتای واقعی | selector تازهٔ grounded در public DOM، href دقیق `/login`، کلیک بدون force، pathname/login و search خالی، فرم/heading/label/input خالی صحیح و session همچنان guest؛ لینک بی‌اثر/اشتباه، صفحهٔ دیگر یا login صرفاً ظاهری باید fail شود | فقط baseline account-link در desktop است؛ حفظ package/quantity، next/return، checkout eligibility یا login موفق ادعا نمی‌شود |
| AUTH-ENTRY02، یک اجرا | guest مستقل روی cart، صفر item و empty visible؛ همان account-link | همان oracle navigation/form/guest؛ cart غیرخالی، کلیک control مرحله به‌جای account، route بدون فرم یا فرم اشتباه رد می‌شود | cart پُر، Next/Previous، guest→customer merge و session continuity بیرون scope‌اند |

در مجموع، **۹ test execution و ۶ ID** برای هر مرورگر وجود دارد؛ چهار ID قبلی دوباره نام‌گذاری نشده‌اند. دو تست تازه فقط desktop هستند؛ narrow account menu ادعای اجرا ندارد. mappingهای AUTH/A01/A09 و referenceهای GATE مربوط به subsetهای مشخص‌اند، نه pass کامل والدها.

## setup و oracle؛ پاسخ به پرسش false pass

`visitGuest` در هر visit یک alias تازه برای GET واقعی session می‌سازد و status همراه وجود field صریح `user` و مقدار null را به یک assertion بولی تبدیل می‌کند. در نتیجه status۲۰۰، ظاهر SSR یا موجودبودن input به‌تنهایی آماده‌سازی معتبر نیست. این انتظار، پاسخ ساختگی یا identity injected تولید نمی‌کند. پاسخ session در message assertion چاپ نمی‌شود.

پس از account-link، `assertGuestSession` با GET خواندنیِ مشاهده‌شده و `log:false` دوباره user:null را بررسی می‌کند. این read-only request موفقیت login را جعل نمی‌کند. shape جدیدِ غیرقابل تأیید یا user غیرnull باید شکست بولی بسازد؛ مقادیر شخصی داخل error قرار نمی‌گیرند. این بررسی فقط guest همین context است؛ امنیت همهٔ endpointهای server را ثابت نمی‌کند.

تغییر spec قبلی محدود به import helper و جایگزینی `cy.visit('/login')` با `visitGuest('/login')` است. assertionهای مقدار، native validity، maxlength، focus و ممنوعیت POST تغییر نکرده‌اند. بنابراین اگر رفتار پس از setup صحیح با expectation قبلی مغایر باشد، تست همچنان fail می‌شود؛ expected value به رفتار جاری تبدیل نشده است. انتظار session شاهد initialization مشاهده‌شده است، نه تضمین تکمیل تمام کارهای delayed آینده.

دو spec تازه وجود یک لینک کافی نمی‌دانند: uniqueness، control واقعی، href، کلیک کاربر، route، search و فرم صحیح همراه guest باقی‌ماندن بررسی می‌شوند. با این حال مقصد `/login` و search خالی **baseline صریحِ همان لینک بازرسی‌شده** هستند؛ قواعد بازگشت خرید یا intent محصول را تصویب نمی‌کنند. اگر خواستهٔ محصول برای return policy تغییر کند باید از منبع مستقل تعیین شود، نه با تفسیر pass فعلی.

در هر دو spec، guard عمومی fail-closed فعال است. spec قبلی guard و counter اختصاصی auth POST را نیز حفظ کرده و در afterEach صفر بودن آن را assert می‌کند. دو تست تازه به guard مشترک متکی‌اند؛ پیام تشخیصی `authenticationPostObserved:false` به‌تنهایی اثبات عدم ارسال در کل شبکه نیست. حذف‌شدن guard در آینده یا تغییر contract باید جدا review شود.

heading تاریخی `WRITTEN / NOT EXECUTED` در describe قبلی باقی مانده تا frozen code تغییر نکند. این متن snapshot زمان نگارش است؛ فیلدهای actual result و گزارش execution مرجع وضعیت واقعی‌اند. از آن عنوان نباید not-run فعلی یا login موفق استنباط شود.

## privacy fields و ابزار ثبت

| محل | دادهٔ ذخیره‌شده | دادهٔ خصوصی که ذخیره نمی‌شود |
|---|---|---|
| launcher | فرمان خلاصه، spec/config، source ID، زمان، scope و privacy | stdout/stderr خام فقط در runtime ignored؛ به خروجی ابزار echo نمی‌شود؛ شماره یا OTP در args/config وجود ندارد |
| source manifest | نام فایل، bytes و SHA-256؛ revision و زمان | contents fixture، environment، session یا identity dump ندارد |
| window proof | PID اختصاصی، boolean پنجرهٔ EZPost، IsWindowVisible، foreground و زمان | screenshot، raw window title، desktop تصویر و tabs شخصی ندارد |
| observer در failure | error سانیتایزشده، pathname، valueLength/valueEmpty و native-validity booleans، فقط boolean وجود auth POST در ledger | value ورودی، body/headers درخواست یا پاسخ، cookie/token، identity/session، query string، console و stack ذخیره نمی‌کند |
| نتیجهٔ نهایی | ID/title سانیتایزشده، state/counts/duration، نسخهٔ browser، interactive/non-headless، source check و اتمام واقعی | reporter text، AUT DOM، network dump یا اطلاعات کاربر ندارد |

observer برای تشخیص، DOM ورودی و route ledger را در حافظه می‌خواند؛ از اولی فقط length/booleans و از دومی فقط auth-POST-present ذخیره می‌کند. تغییر value، event handler یا response انجام نمی‌دهد و failure را دوباره throw می‌کند. اینها screenshot یا raw capture نیستند. path ثبت‌شده در دامنهٔ جاری login/product/cart است؛ query و fragment ثبت نمی‌شود.

redactor پیام و title توالی عددی مستقل ۴ تا ۱۱ رقمی لاتین/فارسی/عربی، مقدارهای labelled phone/OTP/password/token/cookie/authorization و مسیر account محلی را می‌پوشاند. این ابزار اثبات سانیتایز همهٔ رشته‌های ممکن نیست؛ اصل ایمنی این است که شماره/OTP واقعی اصلاً در تست‌های جاری وارد یا استخراج نشوند. نبود screenshot API و تنظیم `screenshotOnRunFailure:false`/`video:false` نیز بررسی شد.

## بررسی واقعاً انجام‌شده و تصمیم باز

تا checkpoint این review، ۲۲ فایل non-runtime در evidence auth موجود بود. JSONهای public به‌صورت ساختاری بررسی شدند: **صفر field حاوی value خصوصی، صفر رشتهٔ phone-like یازده‌رقمی و صفر فایل تصویر/ویدئو** پیدا شد. این بررسی فقط فایل‌های همان checkpoint را پوشش می‌دهد؛ artifactهای بعدی قبل از انتشار دوباره بررسی می‌شوند. runtime خصوصی وارد این scan عمومی نشد و نباید stage شود.

کد config/support/helpers/spec و diff کامل spec قبلی خوانده شد؛ guard مشترک، ordering helper، fixtureها، dependencies و base config نسبت به مبنا تغییر نکرده‌اند. source manifest همان۲۳ ورودی را unchanged تأیید کرد. این reviewer هیچ اجرای Cypress جدید انجام نداد و نتیجهٔ browser مستقلی ایجاد نکرد.

مانع correctness/privacy برای **همین read-only slice** دیده نشد. ابهام‌های واقعیِ مرحلهٔ بعد باقی‌اند: existing بودن حساب یا مجوز جدا برای ایجاد/بازگردانی حساب، schema observable هویت ordinary، رفتار دقیق challenge/verify، policy return و cart merge/retention. کانال تحت کنترلِ کاربر به‌تنهایی این ابهام‌ها را رفع نمی‌کند. این سند هیچ‌کدام را از طرف کاربر تصویب نمی‌کند و پوشش کامل authentication یا سفارش/پرداخت اعلام نمی‌کند.
