# EZPost — بازبینی مستقل صحت assertionهای رگرسیون سبد

تاریخ: ۱۷ نوامبر ۲۰۲۶. این بازبینیِ کد توسط عامل دوم انجام شد؛ مرورگر یا تست Cypress اجرا نکرد، دادهٔ برنامه را تغییر نداد و عملیات Git تغییردهنده انجام نداد. فقط این سند را افزود و بررسی‌های استاتیک و validator خالص را اجرا کرد. نتایج مرورگرِ عامل اجراکننده باید از فایل‌های نتیجهٔ همان اجرا خوانده شوند؛ این سند هیچ pass جدیدی برای برنامه اعلام نمی‌کند.

## نسخه و محدودهٔ بررسی

فایل‌های خوانده‌شده: هر دو spec سبد، `cypress/support/cart.js`، `cart-contract.cjs`، `ordering.js`، `e2e.js`، fixture سبد و قرارداد `QA/Test-Cases/EZPOST_QA_CART_TEST_CASES.md`.

مبنای Git ثبت‌شده در manifest: `bc271152eec693b0286232c822c14ef237933aee`. شناسهٔ SHA-256 مجموعهٔ source در `chrome-final-01/source-manifest.json`:

`e0fa394750cf19ab766ef3813f13007dbab78a4d00d78518cde2af3c5164a505`

بررسی مجدد `source-state.verify` در `2026-11-17T16:33:55.210Z` هر **۲۰ فایل** را unchanged اعلام کرد. این snapshot شامل هر دو spec، تمام support/fixtureها، config، package و lockfile و launcher است. خود این سند خارج source اجرایی است.

`git diff` در همین checkpoint برای کد تست، helperها، validator، config و dependencies خالی بود. بنابراین wait اولیهٔ quote، timeout، action، expectation و assertionها نسبت به مبنا عوض نشده‌اند. تغییرهای این batch شامل launcher/ابزار ثبت و بررسی، evidence و ignore دقیق runtime است. یک log تاریخی Firefox نیز چهار خط shutdown با `EPERM` اضافه دارد؛ این append نتیجهٔ تاریخی را به pass تبدیل نمی‌کند و نباید با اصلاح تست اشتباه شود.

## قرارداد و رفتار نادرستِ قابل رد

منبع هویت و تعداد، intent مستقل داخل spec به‌علاوهٔ fixture محصولِ تاریخ‌دار است؛ پاسخ cart منبع ساخت این intent نیست. انتظار انتقال انتخاب، ویرایش فقط قلم هدف و حذف فقط قلم هدف از درخواست کاربر و قرارداد کیس می‌آید. مسیرها، متن کنترل‌ها و labels-per-package از شواهد DOM تاریخ‌دار گرفته شده‌اند و تصویب عمومی تمام سیاست‌های تجاری محسوب نمی‌شوند.

| بخش / کیس | prerequisite و action | assertion و رفتار نادرستی که رد می‌شود | پاسخ به «آیا با خرابیِ ادعاشده هنوز ممکن است پاس شود؟» |
|---|---|---|---|
| مشترک: guest و empty | session مستقل، درخواست session واقعی، سپس empty؛ پیش از Add | `user:null`، صفر item و empty visible؛ سبد پُر یا کاربر واقعی نمی‌تواند آماده‌سازی معتبر محسوب شود | برای snapshot مشاهده‌شده خیر؛ اثبات عمومی امنیت سمت سرور نیست. اگر prerequisite شکست بخورد cleanup مجاز نمی‌شود |
| مشترک: انتخاب و quote | visit محصول fixture، انتخاب package و quantity، انتظار quote واقعی | مسیر quote دقیقِ محصول، request body دقیق، package/quantity/labels پاسخ، summary و سه مقدار پولی UI با پاسخ correlate می‌شوند؛ quote محصول/بسته/تعداد دیگر و قیمتِ صرفاً قابل مشاهده کافی نیست | برای identityهای صریحِ همین checkpoint خیر؛ قیمت تجاری اشتباهِ خود پاسخ ممکن است نمایش صحیح همان پاسخ داشته باشد و از scope مستقل قیمت بیرون است |
| CART-H01 | BlackFriday120/q2، Add desktop visible و enabled | cart با slug+نام صحیح، labels120، q2، composition دقیق و summary2؛ reset به۱، بسته۲۴۰ یا محصول دیگر، item مفقود/اضافه و انتقال مبلغ نادرست رد می‌شوند | برای موارد نمونه خیر؛ صحت SKU داخلی‌ای که UI آن را عیناً اشتباه نمایش دهد، از این DOM قابل اثبات نیست |
| CART-H02 | BlackFriday240/q2 و mobile CTA واقعی؛ desktop CTA مخفی | همان oracle با labels240/q2؛ انتقال default120 یا کلیک force روی کنترل مخفی موفقیت محسوب نمی‌شود | برای انتخاب و انتقال نمایان خیر؛ viewport برابر تجربهٔ دستگاه فیزیکی یا native touch نیست |
| CART-H03 | افزودن BlackFriday120/q2 سپس Simple25/q1 | هر دو association با quantity مستقل و summary3 در یک snapshot؛ overwrite قلم اول، جابه‌جایی هویت/بسته، قصد اضافی یا گم‌شده رد می‌شود | حفظ همین دو intent در checkpoint بررسی می‌شود؛ persistence بلندمدت یا ادغام login بررسی نمی‌شود |
| CART-H04 | همان محصول با120/q2 سپس240/q1 | هر دو configuration متمایز و sum quantity3؛ mergeی که variant را حذف کند، overwrite یا جابه‌جایی quantityها رد می‌شود | برای تمایز این دو labels خیر؛ سیاست تکرار دقیقاً یک configuration و الزام تعداد ردیف‌ها ادعا نمی‌شود |
| CART-E01 | همان دو محصول مستقل؛ روی خط BlackFriday واقعی + سپس − | selector با slug تصویر، labels، نام و quantity پیش از action؛ quote هدف با q3 سپسq2، cart کامل و Simple بدون تغییر؛ no-op، جهش دو واحدی، ویرایش خط دیگر، قیمت انتقالی قدیمی و summary ناسازگار رد می‌شوند | در checkpointهای اجراشده خیر؛ اگر quote prerequisite شکست بخورد، اصلاً edit آزموده نشده و case نباید pass یا باگ edit اعلام شود |
| CART-E02 | ساخت دو قلم تأییدشده؛ Remove فقط BlackFriday | snapshot دقیقاً شامل Simple اصلی با labels25/q1 و amount خودش؛ باقی‌ماندن هدف، حذف همه یا تغییر قلم دیگر رد می‌شود | برای composition/quantity/amount-transferِ snapshot خیر؛ مدل backend یا سایر sessionها بررسی نمی‌شوند |
| CART-E03 | Simple25/q1، Remove آخرین قلم، recovery عادی | صفر item و empty، summary صفر اگر نمایش داده شود، href و مسیر shop، لینک محصول با نام دسترس‌پذیر، H1/quote/selection و Add آماده؛ ghost item/count و route بی‌ربط یا محصول غیرقابل انتخاب رد می‌شود | برای recovery تا select-ready خیر؛ Add دوباره، checkout، retention و eligibility مرحلهٔ بعد آزموده نمی‌شوند |
| CART-E04 | narrow، BlackFriday240/q2، mobile Add، سپس + و − واقعی cart | همان هویت و quantity3→2 و summary هم‌خوان؛ hidden-select/force bypass وجود ندارد | برای کنترل‌های نمایان viewport خیر؛ پوشیدگی واقعیِ دستگاه یا لمس native قابل نتیجه‌گیری نیست |
| cleanup مشترک | فقط پس از اثبات guest/initial-empty؛ visit تازه و session guest، سپس Remove عادی | تمام خطوط قبل از حذف با ownership نام/slug/labels کنترل می‌شوند؛ حذف خط ناشناس fail می‌کند؛ در پایان صفر item و empty باید برقرار شود | cleanup تأییدشده مربوط به session همین تست است؛ failure آن نباید swallow یا با storage reset پنهان شود |

## بررسی انتقادی oracle و محدودیت ادعا

۱. `assertCart` تمام خط‌ها و summary را در **یک snapshot retryable از main** به `assertCartSnapshot` می‌دهد. نام/slug، labels-per-package، quantity، composition و مبلغ انتقالی جدا از هم رها نمی‌شوند. route یا HTTP۲۰۰ به‌تنهایی oracle موفقیت نیست.

۲. validator grouping با `(slug, labels)` دارد. ردیف‌های شکسته‌ای که همان intent و جمع quantity/amount را حفظ کنند مجازند؛ این انعطاف صریحاً policy merge یا تعداد ردیف مطلوب را تصویب نمی‌کند. در مسیر edit/remove، `cartLine` دقیقاً یک خط برای configuration هدف می‌خواهد؛ وجود split مشروع در آینده ممکن است prerequisite همان عمل را fail کند. این محدودیت آمادگیِ action است، مجوز ضعیف‌کردن composition oracle نیست.

۳. مبلغ هر intent در هشت تست جاری قبل از Add از quote correlate‌شده assign می‌شود. `undefined` یا `NaN` که به این property برسد validator را fail می‌کند. API خالص validator عمداً در caller بدون property `amount` بررسی پول را اختیاری می‌داند؛ بنابراین ادعای «اجبار مبلغ برای هر caller فرضی» صحیح نیست. مسیرهای هشت spec جاری همگی property را می‌نویسند و omission پنهان در آنها دیده نشد.

۴. مبلغ cart با quote معتبرِ همان selection مقایسه می‌شود؛ schedule مستقل، صحت tax/fee/rounding، مبلغ payable و grand total تجاری از این مقایسه ثابت نمی‌شوند. summary مورد assertion، **تعداد بسته** است؛ با financial total اشتباه نشود. package_id داخل cart نمایش ندارد؛ تمایز package در cart بر labels-per-package متکی است. fixture موجود120/240/25 این تمایز را پشتیبانی می‌کند، ولی دو variant فرضی با labels مساوی از این oracle قابل تفکیک نیستند.

۵. `replayPresentation` خواندن response و assertion روی DOM است؛ موفقیت در state برنامه inject نمی‌کند. این تابع به معنای replay ساختگی یا approval قیمت نیست. `afterBrowserRender` فقط دو فرصت render پس از checkpoint می‌دهد؛ تأخیر نامحدود یا پاسخ بسیار دیررس آینده را منتفی نمی‌کند. خرابی‌های باز P10 با پاس‌شدن سبد حل‌شده تلقی نمی‌شوند.

۶. انتظار quote اولیه بدون حذف یا fallback به قیمت visible حفظ شده است. برای درخواست گم‌شدهٔ تاریخی Simple علت قطعی از این بازبینی کد به دست نمی‌آید. تکرار موفق آینده نیز علت آن failure را اثبات نمی‌کند. alias مستقل در هر visit، صف visit قبلی را از انتظار جدید جدا می‌کند؛ اما پروتکل عمومی cancellation، duplicate bootstrap یا cache معتبر را بدون شاهد جدید نمی‌توان از کد تست نتیجه گرفت.

۷. guard عمومی fail-closed تغییری نکرده است: request تغییردهندهٔ application به‌جز quote مشاهده‌شده مجاز نیست. اثبات cleanup هم به مسیر UI عادی و مالکیت همین suite محدود است؛ مجوز mutation حساب/سفارش/پرداخت از این کد استنباط نمی‌شود.

## بررسی‌های واقعاً اجراشده توسط این reviewer

- `node scripts/check-cart-contract.cjs`: **۲ کنترل مثبت و ۱۵ کنترل منفی موفق**؛ wrong slug/name/package/quantity، aggregate count، missing/extra configuration، duplicate quantity، مبلغ انتقالی قدیمی، هدف حذف هنوز موجود، قلم unaffected گم‌شده، empty همراه populated، route غلط و amount برابر undefined/NaN را رد کرد. اینها تست خالص oracle هستند، نه E2E برنامه.
- `node scripts/check-cart-static.cjs`: **۱۸ فایل، دو spec و هشت شناسه** بررسی شدند؛ syntax/traceability، نبود skip/only، sleep عددی، force، API setup یا hidden select تأیید شد؛ درخواست برنامه توسط این check برابر صفر بود.
- `source-state.verify`: manifest نهایی Chrome برای۲۰ ورودی بدون تغییر تأیید شد.
- مرور diff کد تست و ورودی‌های اجرایی نسبت به مبنا: بدون تغییر. یک فرمان اولیهٔ one-liner بررسی manifest به‌علت quoting PowerShell syntax error داد؛ همان بررسی با stdin صحیح اجرا و موفق شد. این خطای ابزار بررسی، نتیجهٔ Cypress نیست.

این بازبینی احتمال همهٔ false passها را صفر اعلام نمی‌کند. ادعاهای قابل دفاع همان scopeهای نمایان و checkpointهای ذکرشده‌اند؛ قیمت مستقل، پایداری نامحدود، authorization سمت سرور، سفارش و پرداخت همچنان خارج پوشش هستند.
