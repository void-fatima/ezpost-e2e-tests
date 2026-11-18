# SQ-01 — پیش‌بررسی نمونهٔ مشخص ارسال، ۱۸ نوامبر ۲۰۲۶

پیش‌بررسی خواندنی در workspace مستقل `Desktop/EZPost` از `main` همگام‌شده با `origin/main`، مبنای `5c24c5cf1c7cc4aad00e3e8f0d6ddc1c90b05b02` انجام شد. بستهٔ موردنظر هنوز در کاتالوگ وجود دارد؛ **هیچ quote زنده، ورود، تغییر سبد یا اجرای Cypress انجام نشد.** پیش‌نیازهای محیط/provider، دادهٔ مجاز، بودجهٔ درخواست و پاک‌سازی shipping در اسناد موجود احراز نشدند؛ بنابراین پیش از تکمیل نشانی توقف شد.

این الحاق، نمونه و دو assertion مستقلِ case موجود `SQ-01` را مشخص می‌کند؛ ID و traceability آن در [سند شش case](../Test-Cases/EZPOST_QA_SHIPPING_QUOTE_TEST_CASES.md) تغییر نکرده است. [آماده‌سازی قبلی](EZPOST_QA_SHIPPING_QUOTE_PREPARATION_2026-11-18.md) و همهٔ failureها و PASSهای تاریخی محفوظ‌اند. دو PASS اخیر Chrome `ACO-H01` و Firefox `CF-F01` نتیجهٔ shipping نیستند. `CF-INV01` و `P10-ORD01/02` باز می‌مانند.

## دو نتیجهٔ مستقل

| بخش SQ-01 | وضعیت این batch | علت و حد ادعا |
|---|---|---|
| A — سازگاری نمایش با quote تازهٔ همان نمونه | **NOT RUN** | نگاشت client و triggerها خوانده شدند؛ اجرای مشروط هنوز به تأیید محیط/provider، نشانی مجاز، سقف درخواست و قرارداد اثر جانبی/cleanup نیاز دارد. نبود تعرفهٔ مستقل به‌تنهایی مانع این subset نیست. |
| B — صحت مستقل مبلغ ارسال و کل | **BLOCKED / NOT EXECUTED** | تعرفه یا محاسبهٔ مستقلِ مصوب برای همین کالا/بسته/تعداد، مقصد، وزن و service، با واحد و اجزای total فراهم نیست. پاسخ quote و قیمت کاتالوگ، oracle مستقل نیستند. |

مجوز کاربر برای run مشروط ثبت شده است؛ این مجوز را به‌معنای تأیید فنی محیط، بی‌هزینه‌بودن provider یا تعیین یک بودجهٔ عددی تلقی نمی‌کنیم. این پیش‌بررسی نه تصویب acceptance criteria است، نه تأیید باگ و نه PASS آزمون shipping.

## نمونهٔ محصول و مقصد

| مؤلفه | واقعیت فعلی و محدودیت |
|---|---|
| محصول | `blackfriday-ezpost`، نام عمومی `بلک فرایدی ایزی پست`؛ API و صفحهٔ عمومی هر دو GET۲۰۰ داشتند. |
| بسته | ID عمومی `63`، نام API برابر `4 برگی`، چهار برگ و `140` لیبل در هر بسته. عنوان UI تاریخ‌دار `بسته ۱۴۰ لیبلی` در fixture قبلی است؛ اختلاف این دو نام، خودبه‌خود باگ نیست. |
| تعداد | intent کاربر دو بسته است؛ `2 × 140 = 280` لیبل. quantity۲ در این batch در DOM hydrated یا سبد زنده انتخاب/تأیید نشده است. |
| دسترس‌پذیری | حضور بسته در کاتالوگ فعلی تأیید شد؛ purchasability، موجودی نهایی و موفقیت Add با این GETها اثبات نمی‌شوند. صفحهٔ SSR جای بررسی کنترل‌های تعاملی نیست. |
| وزن | در محصول/package JSON وزن وجود ندارد؛ در فرم checkout ورودی وزن دیده نمی‌شود. client وزن را در payload quote نمی‌فرستد و `weight_grams` را از نتیجه برای نمایش می‌خواند. وزن واقعی نمونه و روش محاسبهٔ backend/provider نامعلوم‌اند؛ از تعداد لیبل/برگ یا ابعاد، گرم حدس زده نشد. |
| مقصد | استان تهران و شهر تهران در GET فعلی locations، هر دو با code عددی `1` در رابطهٔ همان استان/شهر یافت شدند. این شاهد، تأیید کدپستی، محله یا قابلیت تحویل نیست. جزئیات مقصد کاربر با alias `SQ01-A1-private` پیگیری می‌شود. |
| دادهٔ خصوصی | کدپستی، نشانی کامل و مشخصات گیرنده هنوز ارائه/خوانده نشده‌اند. این داده‌ها باید در مرورگر اختصاصی یا محل خصوصیِ خارج از Git وارد شوند؛ در گزارش، fixture عمومی، screenshot یا network dump ذخیره نشوند. |

اگر baseline سبد قلم دیگری یا همان package را از قبل داشته باشد، آن را برای ساخت نمونهٔ «فقط دو بسته» تغییر نمی‌دهیم. باید cart نمونهٔ موردتأیید، بدون تخریب اقلام قبلی فراهم شود یا مرجع مالی برای تمام ترکیب واقعی سبد تأمین گردد. ownership و سیاست merge را از رفتار Add حدس نمی‌زنیم.

## شواهد تازه و نگاشت واقعی client

[خلاصهٔ پیش‌بررسی](../Evidence/SQ01-Preflight-2026-11-18/preflight-summary.json) شامل timestamp، مسیر، اندازه و SHA-256 هر پاسخ است. **۹ GET عمومیِ بدون cookie/auth و بدون اجرای JavaScript** در بازهٔ `2026-11-18T18:20:48Z` تا `18:24:38Z`، همگی با۲۰۰ ثبت شدند: API و صفحهٔ محصول، checkout module، locations، commerce service، formatter، useServices، API client و module نوع‌های commerce. هیچ redirect دنبال نشد. درخواست‌ها فقط GET بودند؛ shipping POST ارسال نشد. types module فقط `export {}` دارد و schema پاسخ shipping را فراهم نکرد.

[گزیده‌های سانیتایزشدهٔ client](../Evidence/SQ01-Preflight-2026-11-18/client-contract-excerpts.json) شمارهٔ خط و hash پاسخ مبنا را حفظ می‌کنند. بیشتر شماره‌ها مربوط به module کامپایل‌شدهٔ سرو‌شده هستند؛ بخش API صریحاً از `api.ts` در source map عمومی decode شده و شماره‌های source اصلی را دارد. raw HTML، source map کامل و پاسخ‌های خام فقط در `.publication/private/` نادیده‌گرفته‌شدهٔ محلی حفظ شده‌اند؛ دادهٔ private session یا نشانی جمع نشده است.

| موضوع | شاهد تازه | نتیجهٔ دقیق |
|---|---|---|
| فیلدها | checkout۱۴–۲۳ و۳۵۷–۴۳۸ | `recipient_name`, `recipient_mobile`, `province`, `province_code`, `city`, `city_code`, `postal_code`, `address_line`. نام/نشانی، mobile و postal دارای کنترل‌های واقعی client هستند؛ وزن field فرم نیست. |
| کامل‌شدن برای auto-quote | checkout۱۸۷–۱۹۷ | نام حداقل دو بخش جداشده با whitespace؛ موبایل مطابق `^09[0-9]{9}$`؛ province/city code truthy؛ postal مطابق `^[0-9]{10}$`؛ نشانی trimشده حداقل۱۰ نویسه. timer فعلی۵۰۰ms است؛ این predicate تضمین deliverability یا policy مصوب و این زمان SLA نیست. |
| edit و ذخیره | checkout۱۹۹–۲۱۱ | هر تغییر تلاش می‌کند draft را در `sessionStorage` با کلید `ezpost_checkout_address` بنویسد، quote را پاک و schedule را بررسی می‌کند. نوشتن storage در try/catch است؛ موفقیت persistence در این batch مشاهده نشده است. تکمیل field می‌تواند بدون کلیک درخواست بسازد. |
| mount و نتیجهٔ قدیمی | checkout۱۳۴–۱۴۱ | quote می‌تواند از pending order منطبق ساخته شود؛ در شاخهٔ دیگر، نشانی کامل بازیابی‌شده schedule می‌شود. badge/total حاضر به‌تنهایی quote تازه را اثبات نمی‌کند. |
| درخواست | commerce۳۰؛ checkout۲۲۳–۲۵۱ | `POST /api/v1/shipping/quote` با بدنهٔ `{ address }`؛ client، product/package/quantity/weight را در body نمی‌گذارد. `fetchQuote` نتیجه را مستقیم در quote state قرار می‌دهد. |
| بازکردن پاسخ | api.ts۳۴–۳۷ و۵۶–۷۱ | wrapper JSON پاسخ موفق را مستقیم برمی‌گرداند؛ envelope اضافی باز نمی‌کند. مصرف فیلدهای top-level زیر در client روشن است، اما هیچ پاسخ واقعی shipping یا schema backend تأیید نشده است. |
| مبلغ ارسال | checkout۴۵۶–۴۹۹ | در `[data-cy="shipping-quote"] .shipping-quote__price`، مقدار `formatPrice(quote.shipping_irr)` پس از خارج‌شدن از حالت busy. selector از source فعلی است؛ DOM اجرای تازه بررسی نشده است. |
| مبلغ کل | checkout۵۱۲–۵۱۷ | `.order-summary__total .order-total-price-col strong` از `quote.total_irr` استفاده می‌کند؛ بدون quote به `cart.subtotal_irr` برمی‌گردد. subtotal fallback نباید به‌عنوان totalِ quote PASS شود. |
| وزن نمایش | checkout۵۰۰–۵۰۱ | `.shipping-quote__meta` از `quote.weight_grams` و label گرم استفاده می‌کند؛ این مشاهده منبع یا صحت وزن را ثابت نمی‌کند. |
| واحد و قالب | format۱–۱۱ | `Intl.NumberFormat("fa-IR")` به‌همراه پسوند `ریال`، بدون تقسیم بر۱۰. مقدار null/NaN به صفر نمایشی تبدیل می‌شود؛ assertion باید پیش از مقایسهٔ format، فقدان/نامعتبر بودن داده را رد کند. |
| مرز ممنوع | commerce۳۱؛ checkout۲۹۳–۲۹۴ | submit عادی به `/api/v1/checkout` می‌رسد؛ در این کار submit/save/order/payment مجاز نیست. نام Tapin در UI، تأیید sandbox یا service فعال نیست. |

این خواندن، خلأ قدیمیِ متن client و نگاشت shipping/total را برای نسخهٔ فعلی تا حد بالا کاهش می‌دهد؛ تأیید قرارداد backend، currency مصوب کسب‌وکار، cart binding، هزینه و persistence/provider را ایجاد نمی‌کند. source سرو‌شده نیز تضمین نمی‌کند نسخهٔ اجرای بعد همان باشد.

## قرارداد پیشنهادی assertion A — display consistency

این بخش برای پیاده‌سازی/اجرای بعدی طراحی شده و **هنوز تست نوشته یا اجرا نشده است**؛ انتظارات مالی مصوب از آن استخراج نمی‌شوند.

1. **شروع:** همان ordinary identity با login دستی؛ single-writer تازه؛ baseline زندهٔ session، `/me`، cart و draft/pending؛ انتخاب واقعی محصول/بسته۶۳/۱۴۰لیبل/تعداد۲ و ownership طبق ابزار موجود. cart باید دقیقاً نمونهٔ توافق‌شده باشد. identity و private cart IDs فقط در حافظه مقایسه شوند. restored quote/draft نباید جای درخواست تازه را بگیرد یا دادهٔ قبلی overwrite شود.
2. **پیش از trigger:** تیم محیط/provider، داده، بودجه و restore را تأیید کند؛ guard اختصاصی قبل از mount/edit فقط قرارداد دقیق و تعداد مجاز quote را بپذیرد و سایر writeها را مسدود نگه دارد. تکمیل نشانی و mount ممکن است auto-trigger شوند؛ کلیک دوم برای «مطمئن‌شدن» مجاز فرض نشود. guard موجود این batch باز نشده است.
3. **اقدام:** همان نشانی مجاز خصوصی و ترکیب واقعی انتخاب‌شده از UI عادی تکمیل شود؛ trigger خودکار یا دستیِ ازپیش تعیین‌شده ثبت شود. `request.address` باید با تمام فیلدهای مقصد همان intent، فقط در حافظه مقایسه گردد؛ مقایسهٔ صرف city کافی نیست.
4. **انتساب:** درخواست تازه و response متناظر با همان نشست و cart ثابت مرتبط شوند؛ pre/post cart snapshots هویت محصول، package و quantity را با intent مقایسه کنند. چون body فاقد cart است، دامنهٔ cart مورداستفادهٔ backend باید توسط تیم تأیید شود. snapshotهای پایدار و انتساب زمانی به‌تنهایی proof کامل server-side binding نیستند؛ نبود این تأیید، claim «quote دقیق همین cart» را محدود می‌کند.
5. **انتظار مشاهده‌پذیر:** response معتبرِ همان درخواست، فیلدهای عددی قابل‌استفادهٔ shipping و total داشته باشد؛ فقدان فیلد، مقدار non-finite یا صفرِ ناشی از fallback باعث failure شود. پس از پایان busy و settle شدن lifecycle مرتبط، UI shipping و total با فیلدهای مستند پاسخ و قالب/واحد ریال مقایسه شوند. از fresh response تا آخرین render مؤثر، هیچ نتیجهٔ قدیمی جای آن ننشیند. policy زمانی تازه یا sleep دلخواه ساخته نمی‌شود.
6. **رفتار غلطِ قابل‌رد:** مقصد/بسته/تعداد اشتباه، response قدیمی، موفقیت ظاهری بدون درخواست، subtotal به‌جای total تازه، shipping درست کنار total غلط، واحد تومان به‌جای ریال، و formatter صفر برای دادهٔ مفقود. برابر بودن UI و API با مبلغ مشترکِ غلط ممکن است در این subset PASS شود؛ آن خطا متعلق به assertion B است.
7. **پایان:** فقط قلم اثبات‌شدهٔ متعلق به run از UI حذف شود؛ session و `/me` بعد Remove و baseline cart/draft بررسی شوند. restore اضافی shipping/provider فقط طبق روش تیم انجام شود. شکست اصلی و cleanup failure جدا بمانند؛ cleanup نامطمئن موجب توقف run بعدی است.

منبع انتظار A: درخواست صریح کاربر برای consistency این نمونه، نگاشت تازهٔ client در شواهد بالا و ownership/cleanup موجود. backend contract و expected رفتار مالی از مشاهدهٔ UI تصویب نمی‌شوند. هیچ مقدار شخصی یا response خام authenticated برای اثبات این قرارداد منتشر نخواهد شد؛ فقط booleanهای تطبیق، stage و نتیجهٔ سانیتایزشده ثبت می‌شوند.

## قرارداد assertion B — pricing correctness

**پیش‌نیاز مفقود:** مرجع مستقل مصوب و نسخه‌دار برای ارسال همین cart به مقصد خصوصی، شامل service/provider، مبنای وزن و بسته‌بندی، مبدأ لازم برای tariff، تاریخ اعتبار، واحد، مالیات/کارمزد/تخفیف و rounding؛ همچنین قیمت مصوب کالا و formula اجزای total یا expected نهایی مصوب برای همین نمونه. اگر محاسبه به بعد/وزن حجمی وابسته است، آن داده و قاعده نیز باید از تیم بیاید؛ field تازه‌ای به UI اختراع نمی‌شود.

پس از فراهم‌شدن مرجع، expected shipping و expected total مستقل محاسبه/خوانده و هر دو با نتیجهٔ مشاهده‌شده مقایسه می‌شوند. پاسخ shipping، catalog API، جمع دو ناحیهٔ UI یا مقدارِ محاسبه‌شده از همین پاسخ، reference مستقل نیستند. این assertion باید مبلغی را که UI و API هر دو یکسان ولی نادرست نشان می‌دهند نیز رد کند. **اکنون expected عددی وجود ندارد؛ B برابر BLOCKED است، نه PASS، FAIL یا defect.** نبود این reference به‌تنهایی اجرای مجاز آیندهٔ A را متوقف نمی‌کند.

## اطلاعات دقیق لازم پیش از نخستین quote

| نیاز | آنچه باید فراهم/تأیید شود | اثر |
|---|---|---|
| محیط و provider | تأیید تیم برای همین origin و هویت تست، provider/service واقعی و test/sandbox یا محیط مجاز؛ هزینه و اثر quote، persistence احتمالی نشانی/quote و روش restore یا تأیید مستند عدم نیاز به cleanup | پیش از تکمیل نشانی؛ نام UI یا شبکهٔ شرکت کافی نیست. |
| دادهٔ خصوصی مجاز | کدپستی، نشانی کامل تهران/تهران مطابق مقصد کاربر، نام و mobile گیرندهٔ provider-safe؛ تأیید تیم که این داده برای همان محیط مناسب است. مستقیم در browser یا فایل خصوصیِ git-ignored، بدون ارسال در خروجی/گزارش | فرم و quote؛ گیرنده/mobile از حساب شخصی حدس زده نشوند. |
| بودجه و trigger | سقف عددی کل shipping requests، با پوشش mount، edit، quote دستی، retry مجاز و توقف پس از سقف؛ تعیین trigger نمونهٔ SQ-01 | مجوز مشروط فعلی عدد request را مشخص نکرده است. |
| قرارداد نمونه | تأیید اینکه quote از کدام cart نشست استفاده می‌کند و کدام service/ورودی‌ها برای استفادهٔ ایمن از provider لازم‌اند. وزن field فرم نیست؛ اگر مقدار یا مبنای وزن برای ایمنی provider لازم باشد، تیم باید آن را مشخص کند | A فقط پیش‌نیازهای ایمنی و انتساب مرتبط را می‌خواهد؛ وزن عددی مصوب و مبنای تعرفه برای صحت مستقل B لازم‌اند و خودکار به prerequisiteِ A تبدیل نمی‌شوند. صرف نمایش `weight_grams` مبنای مستقل نیست. |
| setup اجرای جدید | single-writer تازه برای بازهٔ جدید؛ وضعیت مجاز OTP همان هویت در زمان run؛ live baseline، ownership و post-Remove checks موجود | تأیید و cleanup بازهٔ قبلی برای این run کافی نیستند. مجوز ایجاد حساب عادی همان هویت قبلاً داده شده و دوباره پرسیده نمی‌شود. HTTP429 یعنی توقف OTP. |
| مرجع مالی مستقل | tariff یا expected محاسبهٔ مصوبِ دقیق نمونه با جزئیات بالا | فقط claim صحت مستقل قیمت B؛ فقدان آن نباید به‌جای نتیجهٔ A گزارش شود. |

تیم لازم نیست برای این SQ-01 سالم همهٔ policyهای race/error/retry در SQ-02…06 را حل کند. build آفلاین نیز شرط live نیست. اما schema واقعی پاسخِ sample، رفتار مرتبط quote تازه و مرزهای ایمنی همین subset باید معلوم/قابل‌بررسی بمانند؛ از source، sandbox یا دادهٔ تست ساخته نمی‌شود.

## بررسی تحویل و نقطهٔ توقف

[verification محلی](../Evidence/SQ01-Preflight-2026-11-18/local-verification.json) تطابق hash/size هر۹ پاسخ، وفاداری گزیده‌ها به source، JSONها، پیوندهای الحاق، حریم خصوصیِ محتوای منتشرشدنی و diff را ثبت می‌کند. این بررسی اسنادی/محلی است؛ static check یا GET۲۰۰ به شمار PASSهای E2E افزوده نشده است. specs، assertions، timeoutها، dependencies، guardها، fixtureهای قبلی و شواهد تاریخی تغییر نکرده‌اند؛ Cypress باز یا اجرا نشد.

**نقطهٔ توقف: قبل از OTP، Add، تکمیل نشانی و هر quote زنده.** پس از دریافت تأیید محیط/provider، دادهٔ خصوصی مناسب، بودجه/cleanup و setup تازه، subset A می‌تواند با guard محدود در Cypress نمایان آماده و اجرا شود. B تا دریافت مرجع مستقل، جدا BLOCKED می‌ماند. هیچ submit، save نشانی، سفارش یا پرداختی از این آماده‌سازی مجوز نمی‌گیرد.
