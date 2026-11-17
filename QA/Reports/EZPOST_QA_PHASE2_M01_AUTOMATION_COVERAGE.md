# پوشش تألیف‌شدهٔ Cypress برای ۹ کیس M01

تاریخ: ۱۱ نوامبر ۲۰۲۶. فضای کار: `C:\Users\LOCAL_USER\Desktop\EZPost`.
برنامه: `http://172.16.30.198:5800/`.

درخواست اخیر کاربر، مجوز **تألیف بخش‌های پشتیبانی‌شدهٔ این ۹ کیس** را صادر کرده و توصیهٔ تعویق کامل در سند تصمیم‌ها را برای همین بخش‌ها جایگزین می‌کند. گزارش نهایی، سند تصمیم‌ها، شواهد تاریخی و تعریف/نگاشت هر ۳۰ کیس حفظ شده‌اند. هیچ تأیید کلی معیارهای پذیرش، مجوز اجرای Cypress یا حکم نقص برنامه از این کار نتیجه نمی‌شود. همهٔ تست‌های جدید **NOT EXECUTED** هستند.

## مبنای فنی و شواهد

پروژه پیش از این تغییر package، پیکربندی یا وابستگی محلی Cypress نداشت. ساختار حداقلی محلی با هدف Cypress **16.2.1** تهیه شد؛ این نسخه از metadata باینری cache موجود مشخص شد. وجود cache به معنی نصب ماژول npm در این پروژه یا تأیید سازگاری runner نیست. `package.json` نسخه را دقیق اعلام می‌کند؛ نصب انجام نشده و lockfile ساختگی ایجاد نشده است. هیچ کدی از Tapin کپی یا تغییر نکرده است؛ فقط دستورهای مهارت مشترک خوانده شده‌اند.

`cypress.config.cjs` با test isolation، مرور ۱۳۶۶×۹۰۰، baseUrl واقعی و مسیرهای screenshot/video/download زیر `QA/Evidence/M01-Cypress/` تنظیم شده است. پشتیبان تست، درخواست‌های تغییردهندهٔ همان origin را مسدود می‌کند؛ تنها POST محاسبهٔ quote که هنگام بارگیری محصول مشاهده شد استثنای خواندنی است. تست‌ها هیچ دکمهٔ add یا submit را فعال نمی‌کنند.

برای inspection، از کتابخانهٔ Playwright از قبل موجود در cache و یک Chrome مستقل استفاده شد؛ نه از MCP با ریشهٔ قدیمی. پیش از مراجعه به برنامه، probe خروجی در مسیر اختصاصی موفق شد. فایل‌های جدید:

- `QA/Evidence/M01-Authoring-2026-11-11/OUTPUT_ROOT.json` و `output-root-probe.png`: ریشهٔ خروجی و مسیر TEMP/TMP همان پردازش، داخل EZPost.
- `UI-INSPECTION.json`: DOM مشاهده‌شدهٔ ROOT، PRODUCT، CART و LOGIN، از حدود 20:17 UTC.
- `GUEST-CONTRACT.json`: پاسخ مشاهده‌شدهٔ GET session برابر `{"user":null}` و نشانگر سبد خالی.
- `SHOP-INSPECTION.json`: کارت‌های SHOP در 20:26 UTC.

این‌ها شواهد تاریخ‌دار inspection هستند؛ نتیجهٔ تست پذیرش یا تأیید دائمی رفتار نیستند. مسیر سراسری MCP تغییر نکرده است؛ استفادهٔ بعدی از MCP همچنان نیازمند بررسی ریشهٔ خودش است. فایل‌های قدیمی `.playwright-mcp` جابه‌جا یا تغییر نکرده‌اند.

selectorها بر مبنای DOM همین inspection هستند: hrefهای tel/mail در `#contact`، aria-label لینک اینماد در footer، nav دارای aria-label مرحله و کنترل‌های قبلی/بعدی آن، و `main article` همراه h3/p/link محصول. هیچ class تصادفی، selector حدسی یا ساختار cart/session اختراعی استفاده نشده است. baseline اینماد و برچسب‌های مرحله در `m01-observed.json` **مشاهده** هستند؛ مرجع رسمی کسب‌وکار نیستند.

## جدول نگاشت و مرز پوشش

نام specها نسبت به `cypress/e2e/m01/` است. هر ردیف همان شناسه و والد قبلی را دارد؛ چند تست اجرایی، کیس جدید محسوب نمی‌شود.

| Case ID | Spec/test | Implemented assertions | Live or simulated | Remaining manual portion | Missing requirement/fixture | Execution status |
|---|---|---|---|---|---|---|
| N05-TC03 / N05 | browser/contact-trust؛ controlled/handoff؛ عنوان‌های N05-TC03 | تطابق نمایش و URI تماس/ایمیل از helper مشترک N05-TC01/02؛ دریافت کلیک، لغو default در harness، باقی‌ماندن صفحه و تماس قابل مشاهده | DOM زنده؛ لغو شبیه‌سازی‌شده، بدون اجرای handler بومی | انتخاب برنامه، preview و cancel واقعی سیستم‌عامل؛ صحت شماره/ایمیل پشتیبانی | محیط preview بدون تماس/ارسال/ذخیره؛ مرجع صحت اطلاعات تماس | NOT EXECUTED |
| N06-TC02 / N06 | browser/contact-trust؛ controlled/handoff | href اولیه طبق baseline تاریخ‌دار، HTTPS، target، noopener، referrerpolicy و نام/alt؛ لغو کنترل‌شده و بقای storefront | DOM زنده + لغو harness | تب خارجی واقعی، redirect، بازگشت و وضعیت سرویس | دسترسی و بررسی واقعی external/tab از runner؛ baseline مشاهده‌شده سیاست مالکیت را ثابت نمی‌کند | NOT EXECUTED |
| N06-TC03 / N06 | controlled/handoff؛ scoped failed external fetch probe | قطع دقیق GET مقصد با forceNetworkError، رد شدن fetch مرورگر، دریافت خطای intercept؛ ناوبری anchor فرایند و بقای main | probe شبکهٔ شبیه‌سازی‌شده در پنجرهٔ storefront؛ fetch را harness ایجاد می‌کند | خطای واقعی تب خارجی، قطع/وصل واقعی سرویس و برگشت کاربر | برای این probe پیش‌نیاز محصولی جدید لازم نیست؛ پذیرش آن به‌عنوان پوشش کافی outage واقعی نیازمند تصمیم دامنه است | NOT EXECUTED |
| N06-TC04 / N06 | requirements/references؛ public link association | مقایسهٔ href با reference مستقلِ تأمین‌شده، همراه source/version/approvedBy؛ بدون برداشت هویت از لوگو | DOM زنده در برابر مرجع مستقل؛ در انتظار fixture | تطبیق نام تاجر، دامنه، وضعیت و تاریخ‌های صفحهٔ رسمی | merchantReference و تعریف اعتبار/تاریخ؛ صفحه و selectorهای رسمی هنوز بررسی نشده‌اند | NOT EXECUTED؛ prerequisite-gated |
| N08-TC01 / N08 | browser/stages؛ requirements/navigation | ترتیب چهار مرحله، مرحلهٔ اعلام‌شده، انطباق نام «غیرفعال» با native disabled، Next محلی؛ تست جدا برای مقصد مصوب Next | DOM زنده؛ مقصد فقط با policy مستقل | ارزیابی معنای جریان و accessibility فراتر از semantics بررسی‌شده | productNext: مقصد/heading/query مصوب؛ سیاست Previous غیرفعال و امکان Next بدون add هنوز مصوب نیست | NOT EXECUTED؛ بخش مقصد prerequisite-gated |
| N08-TC02 / N08 | browser/stages؛ requirements/navigation | سبد مهمان خالی، نمایش مرحلهٔ دوم و Previous با href محلی؛ لغو کنترل‌شده؛ تست دو sequence برای Previous پس از محصول و ورود مستقیم | DOM زنده + لغو harness؛ ناوبری واقعی فقط با policy تأمین‌شده | تصمیم محصول دربارهٔ مقصد و fallback؛ browser Back جایگزین Previous نیست | cartPrevious با دو sequence و productNext برای sequence محصول؛ بدون تضمین SHOP یا محصول قبلی | NOT EXECUTED؛ بخش مقصد prerequisite-gated |
| N08-TC03 / N08 | browser/stages؛ requirements/navigation | پاسخ واقعی guest و نشانگر empty، ترتیب مراحل و لینک محلی Next؛ لغو کنترل‌شده؛ شاخهٔ مستقل navigate/disabled بر اساس سیاست تأمین‌شده | DOM زنده + لغو harness؛ policy زنده در انتظار داده | تصمیم eligibility؛ هیچ SMS/checkout submit | emptyGuestNext: اجازهٔ حرکت و مقصد دقیق یا کنترل disabled با شاهد DOM؛ حالت feedback دیگر نیازمند تکمیل طراحی پس از تصمیم است | NOT EXECUTED؛ بخش policy prerequisite-gated |
| N08-TC04 / N08 | requirements/navigation؛ سه تست داده‌محور client UI simulation | هر ترکیب guestPopulated/customerEmpty/customerPopulated مستقل؛ session mock، storage مصنوعیِ تأمین‌شده، نشانگر role و cart واقعی UI، سپس مقصد یا disabled مصوب | فقط شبیه‌سازی UI؛ داده هنوز تأمین نشده؛ هیچ اثبات server authorization | احراز هویت واقعی و cart واقعی ایمن؛ مالک ماتریس کامل T07 باقی است | سه ردیف policy، schema شاهددار session/storage، markerهای role/cart و مقادیر کاملاً مصنوعی؛ SSR ممکن است با mock سمت client قابل ساخت نباشد | NOT EXECUTED؛ prerequisite-gated |
| N09-TC01 / N09 | requirements/references؛ exact declared public cards | مقایسهٔ مجموعهٔ کامل href/title/description کارت‌ها بدون تحمیل ترتیب، برای صفحه‌های صریح ROOT و/یا SHOP در manifest | DOM زنده در برابر manifest مستقل؛ در انتظار fixture | تناسب مخاطب deployment و محتوای خارج از scope manifest؛ قیمت/تصاویر با این subset بررسی نمی‌شود | contentManifest نسخه‌دار با audience و فهرست تأییدشدهٔ کارت‌ها، scope هر صفحه و استثناهای واردشده در فهرست | NOT EXECUTED؛ prerequisite-gated |

لغو توسط event listener، لغو dialog سیستم‌عامل نیست. anchor عادی با target=_blank الزاماً window.open را صدا نمی‌زند؛ از stub بی‌اثر window.open استفاده نشده است. تست outage نیز ادعا نمی‌کند خود برنامه خطای سرویس را مدیریت می‌کند: درخواست شکست‌خورده را harness می‌سازد و فقط بقای تعامل با storefront را بررسی می‌کند. intercept فقط در همان تست فعال است؛ شبکهٔ شرکت و سرویس خارجی تغییر نمی‌کند و بازیابی واقعی availability ادعا نشده است.

دو تست phone/email از helper مشترک استفاده می‌کنند؛ suite تکراری دیگری برای N05-TC01/02 ساخته نشده است. تست‌های baseline مرحله، وجود و سازگاری semantics فعلی را بررسی می‌کنند؛ شکست احتمالی پس از تغییر UI ابتدا نیازمند بررسی baseline است و خودکار به معنی نقض نیازمندی محصول نیست.

### ثبت وضعیت سایر ۲۱ کیس برای تکمیل inventory

برای این کیس‌ها مجوز گسترش جدیدی برداشت نشده است. سه ردیف contact/trust فقط assertion مشترک را cross-reference می‌کنند؛ کیس یا تست تکراری ایجاد نشده است. طبقه‌بندی تاریخی طراحی آن‌ها تغییر نکرده است.

| Case ID | Spec/test | Implemented assertions | Live or simulated | Remaining manual portion | Missing requirement/fixture | Execution status |
|---|---|---|---|---|---|---|
| N01-TC01 / N01 | — | تألیف جدید ندارد | — | طبق کیس مرجع | مجوز این درخواست شامل نگارش این کیس نیست | NOT EXECUTED |
| N01-TC02 / N01 | — | تألیف جدید ندارد | — | طبق کیس مرجع | مجوز این درخواست شامل نگارش این کیس نیست | NOT EXECUTED |
| N01-TC03 / N01 | — | تألیف جدید ندارد | — | طبق کیس مرجع | baseline مستقل مسیر/هویت پیش از اجرا | NOT EXECUTED |
| N02-TC01 / N02 | — | تألیف جدید ندارد | — | visibility/focus طبق کیس مرجع | baseline کنترل/target و معیارهای Q03 | NOT EXECUTED |
| N02-TC02 / N02 | — | تألیف جدید ندارد | — | visibility/focus طبق کیس مرجع | baseline کنترل/target و معیارهای Q03 | NOT EXECUTED |
| N02-TC03 / N02 | — | تألیف جدید ندارد | — | visibility/focus طبق کیس مرجع | baseline کنترل/target و معیارهای Q03 | NOT EXECUTED |
| N02-TC04 / N02 | — | تألیف جدید ندارد | — | visibility/focus طبق کیس مرجع | baseline کنترل/target و معیارهای Q03 | NOT EXECUTED |
| N02-TC05 / N02 | — | تألیف جدید ندارد | — | visibility/focus طبق کیس مرجع | baseline کنترل/target و معیارهای Q03 | NOT EXECUTED |
| N03-TC01 / N03 | — | تألیف جدید ندارد | — | طبق کیس مرجع | baseline فعلی پیش از اجرا | NOT EXECUTED |
| N03-TC02 / N03 | — | تألیف جدید ندارد | — | طبق کیس مرجع | تصمیم breadcrumb و مقصد | NOT EXECUTED |
| N03-TC03 / N03 | — | تألیف جدید ندارد | — | طبق کیس مرجع | تصمیم کنترل بازگشت LOGIN | NOT EXECUTED |
| N03-TC04 / N03 | — | تألیف جدید ندارد | — | مرور بصری/focus | کنترل TOP و معیارهای Q03 | NOT EXECUTED |
| N04-TC01 / N04 | — | تألیف جدید ندارد | — | retention خارج از این کیس | baseline مسیر/هویت و قرارداد coherence | NOT EXECUTED |
| N04-TC02 / N04 | — | تألیف جدید ندارد | — | retention خارج از این کیس | baseline مسیر/هویت و قرارداد coherence | NOT EXECUTED |
| N05-TC01 / N05 | browser/contact-trust: N05-TC03؛ helper مشترک | تطابق نمایش شماره و tel URI؛ بدون تست تکراری | DOM زنده | صحت شماره طبق مرجع مستقل؛ native در TC03 | مرجع شمارهٔ پشتیبانی | NOT EXECUTED |
| N05-TC02 / N05 | browser/contact-trust: N05-TC03؛ helper مشترک | تطابق نمایش ایمیل و recipient؛ بدون تست تکراری | DOM زنده | صحت ایمیل و تحویل پیام خارج از subset | مرجع آدرس پشتیبانی | NOT EXECUTED |
| N06-TC01 / N06 | browser/contact-trust: N06-TC02؛ کنترل مشترک | href و خصوصیات لینک مشاهده‌شده؛ بدون تست جدا | DOM زنده | صحت اعتبار از لوگو استنتاج نمی‌شود | مرجع رسمی و بررسی baseline پیش از اجرا | NOT EXECUTED |
| N07-TC01 / N07 | — | تألیف جدید ندارد | — | مرور semantic/زبان طبق مرجع | fixture مسیر ناموجود و signature فعلی | NOT EXECUTED |
| N07-TC02 / N07 | — | تألیف جدید ندارد | — | طبق کیس مرجع | تصمیم RECOVERY و مقصد | NOT EXECUTED |
| N07-TC03 / N07 | — | تألیف جدید ندارد | — | مرور semantic/زبان طبق مرجع | fixture مسیر ناموجود و signature فعلی | NOT EXECUTED |
| N07-TC04 / N07 | — | تألیف جدید ندارد | — | طبق کیس مرجع | RECOVERY و روش مستقل history-entry | NOT EXECUTED |


## داده‌های واقعاً مفقود و قرارداد قابل تکمیل

`cypress/fixtures/m01-requirements.json` عمداً null دارد. تست‌های requirements **پیاده‌سازی واقعی و assertion دارند**؛ نه skip، نه پاس خالی. در نبود داده، پیش از مرور برنامه با پیام شامل Case ID و نام fixture شکست پیش‌نیاز می‌دهند. این شکست، نقص برنامه نیست. بدون تأمین داده، این specها جزو مجموعهٔ آمادهٔ اجرا نیستند.

هر object تأییدی باید `source`، `version` و `approvedBy` غیرخالی داشته باشد. این فیلدها ثبت مرجع تصمیم‌اند؛ پرکردن آن‌ها توسط نویسنده با رفتار فعلی برنامه مجاز نیست.

- `productNext`: فیلد `expected`.
- `cartPrevious`: آرایهٔ `sequences` شامل دقیقاً دو entry با مقدارهای `direct` و `product-next`؛ هرکدام `expected` مستقل.
- `emptyGuestNext`: فیلد `action` برابر `navigate` با `expected`، یا `disabled` با `disabledSelector` و `selectorEvidence`. اگر سیاست دیگری مثل بازخورد inline انتخاب شد، ابتدا رفتار/DOM واقعی آن ثبت و شاخهٔ تست تکمیل می‌شود.
- هر `expected`: `pathname`، `search` صریح حتی اگر خالی باشد، و `heading` واقعی main h1 مقصد. این‌ها باید **پیش از اجرا** از معیار مستقل و baseline مقصد تأمین شوند.
- سه object در `roleCart`: علاوه بر metadata، `syntheticOnly:true`، `fixtureEvidence`، `sessionBody` دارای user، `storage` با مقادیر string سریال‌شده، `roleMarker` و `cartMarker` هرکدام با selector/text بررسی‌شده، و `action`/expected یا disabled مشابه بالا. selectorهای این markerها فعلاً اختراع نشده‌اند. داده نباید cookie، credential یا اطلاعات شخص واقعی داشته باشد. پاسخ session تقلیدی فقط client را هدف می‌گیرد و نقش واقعی server ایجاد نمی‌کند.
- `merchantReference`: علاوه بر metadata، `initialTrustUrl` از مرجع رسمی مستقل. این subset فقط association URL را مقایسه می‌کند؛ برای هویت/وضعیت/تاریخ باید رکورد رسمی، معنا و baseline صفحهٔ مرجع تأمین شود.
- `contentManifest`: علاوه بر metadata، `audience` و `pages` غیرخالی؛ هر page شامل `path` برابر / یا /shop، `complete:true` و `cards` شامل href/title/description مجاز است. ROOT فقط featured است؛ SHOP جداست. تعداد و نام‌های فعلی allowlist نشده‌اند. دامنهٔ خارج از این صفحات نیازمند inspection و گسترش جداست.

نیاز به تصمیم کاربر فقط دربارهٔ مقصد Next محصول، مقصد/fallback Previous، سیاست empty-guest و سه ترکیب دیگر، مرجع اعتبار اینماد، و audience/content مجاز باقی می‌ماند. روش لغو امن، scope شبکه، محل خروجی و selectorهای مستقل از این تصمیم‌ها از شواهد فنی حل شده‌اند.

## آمادگی، مجوز و اجرای آینده

۵ فایل spec و ۱۷ تست حاصل از تعریف‌ها/پارامترها تألیف شده‌اند: ۹ تست subset مستقل در browser/controlled و ۸ تست دارای پیش‌نیاز در requirements. **قابل تألیف/قابل انتخاب بودن با موفقیت اجرا یکسان نیست.** این تعداد تست است، نه تغییر تعداد کیس‌ها. شش کیس subset مستقل دارند؛ N06-TC04، N08-TC04 و N09-TC01 کد مقایسه/ماتریس دارند اما هنوز دادهٔ مستقل لازم را ندارند.

اجرای آینده فقط با درخواست جداگانه مجاز است. ابتدا وابستگی محلی و سازگاری runner باید فراهم شود؛ نصب فعلی انجام نشده است. مجموعهٔ browser/controlled را می‌توان مستقل از specهای requirements انتخاب کرد؛ اجرای همهٔ specها با nullهای فعلی عمداً خطای پیش‌نیاز ایجاد می‌کند. Chrome/Firefox، رفتار native و external واقعی هنوز با Cypress بررسی نشده‌اند.

طبقه‌بندی کامل کیس‌ها به صورت خودکار Fully automated نشده است. شمارش ۱۰ ready / ۱ partial / ۱ manual / ۱۸ blocked در سند مرجع، snapshot طراحی پیش از این تألیف است؛ الحاقیهٔ فعلی برای ۹ کیس مرز جدید **partial authored coverage** را ثبت می‌کند و بخش‌های حل‌نشده را نگه می‌دارد. سایر ۲۱ کیس تغییری ندارند.

## بررسی‌های ایستا

نتایج واقعی و کنترل حفظ فایل‌ها در `M01-AUTHORING-STATIC-VERIFICATION.json` همین پوشه ثبت می‌شود: parse نحوی همهٔ JS/CJS با Node --check، parse JSON، resolve مسیرهای import و config، وجود نگاشت هر ۹ کیس، حفظ ۳۰ heading شناسه و نگاشت‌های inventory، نبود skip یا wait عددی، و SHA-256 فایل‌های پیشین به جز سند کیس مجاز به اصلاح. این بررسی‌ها Cypress را اجرا نمی‌کنند و کیفیت رفتار runtime را تأیید نمی‌کنند.

