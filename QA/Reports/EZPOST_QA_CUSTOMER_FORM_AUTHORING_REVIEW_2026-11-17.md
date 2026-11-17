# بازبینی طراحی و correctness فرم واقعی مشتری EZPost

تاریخ: ۱۷ نوامبر ۲۰۲۶. Workspace مستقل Desktop EZPost. این گزارش، قرارداد پیش از کد و بازبینی دوم `CF-F01` را ثبت می‌کند؛ **در checkpoint این review، اجرای E2E فرم هنوز NOT EXECUTED است**. یک journey در هر مرورگر طراحی شده و `CF-CP01…12` checkpoint هستند؛ دوازده تست مستقل یا OTP خودکار محسوب نمی‌شوند.

**الحاق بازبینی نهایی پس از اجرا:** دو gap مادی شناسایی شد و ادعاها محدود شدند؛ این الحاق نتیجهٔ تاریخی PASS/FAIL یا source اجراشده را بازنویسی نمی‌کند. در cleanup، `session()` فقط قبل Remove اجرا شده؛ **ordinary identity پس از Remove NOT VERIFIED** است. همچنین matching delta قبل/بعد Add، provenance در برابر writer هم‌زمان همان حساب نیست. **پیش از هر mutation آینده، single-writer/account exclusivity کنترل‌شده یا correlation واقعی پاسخ Add با خط ایجادشده لازم است؛ هیچ‌یک در evidence ثبت‌شده established نیست.** هیچ concurrency، logout یا حذف قلم نامتعلق تأیید نشده است. جزئیات دامنه در [گزارش اجرای فرم](EZPOST_QA_CUSTOMER_FORM_EXECUTION_2026-11-17.md) و [کیس فعلی](../Test-Cases/EZPOST_QA_CUSTOMER_FORM_TEST_CASES.md) آمده؛ رفع code یا rerun در این الحاق انجام نشده است.

source فریز‌شدهٔ فرم برای اجرای بعدی:

`e2686ae424e3b0415660ece3b100df9e7f88a86ba926eb234d6ef8c95160de95`

launcher قبلی `chrome-form-ready-01` به انتخاب/بارگذاری spec یا اجرای تست نرسید؛ [شاهد not-started](../Evidence/Authenticated-Checkout-2026-11-17/chrome-form-ready-01/not-started.json) آن را با `specLoaded:false/testsExecuted:false` حفظ می‌کند. درخواست launch، PASS یا حتی spec-loaded نیست. این نوبت به‌عنوان E2E شکست‌خورده یا اجراشده شمارش نمی‌شود؛ oracle پیش از انتخاب spec تقویت و source نهایی جدا شد.

## قرارداد و منابع

| منبع | نقش و حد استناد |
|---|---|
| [قرارداد CF-F01 پیش از کد](../Test-Cases/EZPOST_QA_CUSTOMER_FORM_TEST_CASES.md) | شروع ordinary-auth واقعی، owned cart پُر، نبود draft قبلی، دادهٔ synthetic، native validity، dependency، keyboard/narrow و cleanup؛ مجوز save/order/payment ایجاد نمی‌کند |
| [metadata واقعی فرم Chrome](../Evidence/Authenticated-Checkout-2026-11-17/chrome-handoff-ready-01/rendered-form-metadata.json) | چهار field required واقعی؛ name text۲…۱۲۰، mobile text با pattern09 و max11، postal text با pattern۱۰رقمی و max10، address textarea۱۰…۳۰۰. این metadata قرارداد native مشاهده‌شده است؛ server/business policy نیست |
| moduleهای عمومی GETشدهٔ `/_nuxt/components/screens/checkout.tsx` و `/_nuxt/components/checkout-select.tsx`، به‌علاوهٔ client سبد | digit filtering، custom trigger/listbox، city reset، local draft، trigger خودکار shipping و normal Remove draft cleanup؛ implementation baseline، نه تصویب localization/retention policy |
| GET واقعی `/api/v1/shipping/locations` | association دادهٔ جاری province/city؛ hardcode نام/کد جغرافیا نداریم و صحت مستقل دادهٔ سرور از این مقایسه ثابت نمی‌شود |
| [spec نهایی فرم](../../cypress/e2e/checkout/customer-form.cy.js)، [support/guard مجزا](../../cypress/support/authenticated-checkout.js) و [oracle ownership](../../cypress/support/authenticated-checkout-contract.cjs) | کد queue، assertionهای واقعی، sentinel ناقص، identity/cart و owned-only cleanup بازبینی شدند؛ history و guardهای قبلی تغییر نمی‌کنند |
| [checker ایستا](../../scripts/check-customer-form-static.cjs)، [نتیجهٔ ذخیره‌شده](../Evidence/Authenticated-Checkout-2026-11-17/customer-form-static-checks.json) | syntax، منابع محافظت‌شده، تعداد journey و نبود direct storage writes/submit؛ نتیجهٔ browser/application نیست |

کاربر شماره/OTP را در Cypress نمایان وارد می‌کند؛ setup دستی از assertionهای پس از ورود جداست. identity با شمارهٔ submitشدهٔ مستقل و خصوصی، session/me ordinary و id ثابت تا پیش از Remove بررسی می‌شود. سبد اولیهٔ حساب خصوصی snapshot می‌شود؛ محصول غایب از baseline با intent مستقل افزوده و خط matching جدید از delta برای Remove ثبت می‌شود. این delta در حضور writer هم‌زمان، مالکیت قطعی را ثابت نمی‌کند. مبلغ صرفاً quote-to-cart/review presentation است؛ مستقل‌بودن قیمت تجاری ادعا نمی‌شود.

## بازبینی دوم و gapهای اصلاح‌شده

| یافتهٔ بازبینی | اصلاح پیش از اجرا | رفتار نادرستی که assertion باید رد کند |
|---|---|---|
| validity به‌تنهایی می‌توانست تغییر metadata را مبهم بگذارد | required، type، minLength، maxLength و pattern هر چهار field دقیقاً در برابر O1 بررسی شدند | field اختیاری‌شده، pattern ضعیف‌شده، type یا boundary عوض‌شده، حتی اگر یک مقدار نمونه هنوز پذیرفته شود |
| mobile کوتاهِ نادرست، prefix را مستقل challenge نمی‌کرد | marker کامل۱۱رقمی با prefix08 و marker prefix09 با طول۱۰ جدا اضافه شدند؛ اصلاح به marker مجاز native نیز بررسی می‌شود | پذیرش prefix نامعتبر در طول درست، پذیرش طول کوتاه با prefix درست یا ناتوانی اصلاح invalid→valid |
| sentinel ناقص ممکن بود فقط در توضیح باقی بماند | قبل هر text edit، address خالی و هنگام edit نشانی، mobile خالی assert می‌شود؛ بعد آزمون address دوباره خالی است | کامل‌شدن اتفاقی نشانی و trigger shipping خودکار؛ request ممنوع نیز در guard رد می‌شود |
| draft existence، محتوای صحیح را ثابت نمی‌کرد | هر هشت مقدار draft به‌صورت خصوصی با synthetic intent مستقل و province/city واقعاً انتخاب‌شده تطبیق داده می‌شود؛ active order باید absent باشد | draft ناقص/قدیمی، نام اصلاح‌نشده، کد/نام شهر یا استان ناسازگار، mobile یا address ناخواسته و active order ایجادشده |
| دو entry locations می‌توانستند یک province باشند | provinceها با code نرمال‌شده deduplicate و حداقل دو code متمایز لازم شدند | ادعای cross-province reset پس از انتخاب دوبارهٔ همان province |
| وجود کنترل، keyboard/narrow usability را ثابت نمی‌کرد | Tab واقعی با focus حاصل، Enter native فقط روی button، و باز/بسته‌شدن واقعی city list در narrow بررسی شدند | focus نرسیده، button فعال‌نشده، listbox بازمانده یا narrow control غیرقابل تعامل |

مرزهای name/address با تایپ واقعی بررسی می‌شوند: empty→valueMissing، یک واحد کمتر از minimum→tooShort، مقدار minimum→native valid، و تلاش بیش از maximum→حفظ سقف واقعی. mobile/postal نیز pattern، طول و correction دارند. اگر `.type()` یا constraint-validation یک browser رفتار متفاوتی نشان داد، failure واقعی حفظ و test/setup در برابر رفتار برنامه بررسی شود؛ مقدار انتظار صرفاً برای greenشدن تغییر نکند.

custom province/city از trigger نمایان و option واقعی انتخاب می‌شوند؛ hidden native select فقط برای مشاهدهٔ مقدار است و با `.select()`/force فعال نمی‌شود. گزینه‌های شهر با response همان province و code انتخابی تطبیق داده می‌شوند؛ تغییر province باید city قبلی را پاک کند. assertion اصلی در نبود دادهٔ لازم silent حذف نمی‌شود.

در queueهای بررسی‌شده، callback با بازگرداندن هم‌زمان مقدار synchronous نامرتبط و Cypress commands مشاهده نشد. انتظار request واقعی و state retryable جای sleep دلخواه را می‌گیرد. exception suppression عمومی، forced action، mock success، skip/only یا branch پذیرش هر نتیجهٔ دلخواه دیده نشد. این review نبود همهٔ false positiveهای ممکن را اثبات نمی‌کند.

## ایمنی، cleanup و privacy

نشانی در عمدهٔ journey خالی است؛ حین boundaryهای address، mobile خالی می‌ماند. submit فرم یا shipping quote button کلیک نمی‌شود و Enter در text field ارسال نمی‌شود. keyboard Enter صرفاً native activation کنترل `type=button` است. guard auth و Add/Remove دقیقِ متعلق به suite را نگه می‌دارد؛ shipping/profile/address/customer/order/payment POST مجاز نیست.

دو کلید draft/order پیش از Add باید absent باشند. form edits draft synthetic همین flow را در sessionStorage می‌سازند؛ هیچ storage مستقیم نوشته/پاک نمی‌شود. clearing متنی از UI و Remove عادی خط ثبت‌شده، طبق client contract هر دو کلید را پاک می‌کند؛ **پس از cleanup، snapshot content و absence واقعی هر دو کلید assert می‌شوند**. session فقط قبل Remove بررسی می‌شود؛ پس cart ناشناسِ خالی در صورت افت session می‌تواند با baseline خالی برابر شود. این false-pass possibility مشاهدهٔ logout نیست و ordinary identity بعد Remove هنوز verified نیست. provenance خط هم در برابر writer هم‌زمان احراز نشده؛ حذف قلم نامتعلق تأیید نشده است. failure اولیه و cleanup failure جدا و آشکار بمانند.

`addAttempted` پیش از درخواست Addِ واقعاً permitشده فعال می‌شود و fallback `registerFrom` از delta می‌تواند matching row ساخته‌شدهٔ هم‌زمان را claim کند. guardِ exact payload/id و غیبت کل محصول این provenance gap را به‌تنهایی حل نمی‌کنند. future mutation به prerequisite کنترل‌شدهٔ single-writer یا Add-response correlation واقعی نیاز دارد؛ lock، API یا مجوز جدیدی فرض نمی‌شود. source H01 نیز همین محدودیت را دارد؛ گزارش‌های تاریخی H01 دست‌نخورده‌اند و فقط دامنهٔ استناد به آنها در این review محدود شده است.

مقدارهای synthetic، draft، mobile anchor، session و idهای cart فقط در حافظهٔ لازم استفاده می‌شوند. خروجی عمومی checkهای boolean، metadata مجاز و outcome سانیتایزشده است؛ field values، phone/OTP، cookie/token، raw session/DOM/network، profile و screenshot شخصی منتشر نمی‌شوند. parse/error خامِ احتمالی نباید توسط driver به فایل عمومی صادر شود.

## محدودیت‌ها و وضعیت checkpoint

- **native validity** جای custom submit validation، server rejection یا save موفق نیست. دوکلمه‌ای‌بودن نام در custom handler و پیام‌های submit این slice نیستند؛ هیچ order submission انجام نمی‌شود.
- digit filtering مطابق client فعلی، non-ASCII را حذف می‌کند؛ بررسی این baseline تصویب policy مطلوب فارسی/عربی یا اثبات پذیرش server نیست.
- province/city comparison، consistency با دادهٔ جاری locations است؛ مرجع مستقل جغرافیا، ارسال یا کدپستی واقعی نداریم.
- draft comparison، local browser state متعلق به تست است؛ persistence customer/address، retention عمومی، back/forward و session expiry از آن نتیجه‌گیری نمی‌شوند.
- narrow390×844 emulation و کنترل‌های مشخص است؛ physical device/native keyboard یا accessibility کامل نیست.
- محدودیت‌های handoff قبلی دربارهٔ DOM تمام اقلام unaffected و dashboard identity دوباره‌اجرانشده محفوظ‌اند؛ checkpointهای auth/cart دوباره‌شماری نمی‌شوند.
- ordinary identity فقط پیش از cleanup/Remove بررسی شده؛ post-Remove session/me oracle لازم برای اثبات restoration در همان حساب در کد فعلی وجود ندارد.
- ownership از delta، مصون از writer هم‌زمان نیست؛ single-writer/exclusivity یا Add-response correlation پیش‌نیاز mutation بعدی است و در evidence فعلی established نشده است.

نتیجهٔ ایستای فعلیِ ثبت‌شده: بررسی inherited شامل **۱۴ فایل syntax و ۱۵ فایل تاریخی محافظت‌شده**، سپس **۲ فایل syntax اضافی، یک journey مستقل، صفر skip و چهار فایل handoff بدون تغییر**؛ direct storage mutation و form submit در spec وجود ندارد. این بازبینی documentary تست browser اجرا نکرده است.

در checkpoint اولیهٔ review مانع launch شناخته نشده بود؛ **بازبینی نهایی بعدی دو gap بالا را ثبت می‌کند و تأیید نامحدود mutation آینده نیست**. نتیجهٔ اجرا، source مشترک Chrome/Firefox، manual-assisted setup، cleanup و هر failure/rerun در گزارش اجرایی جدا ثبت می‌شوند؛ نتایج پیشین ACO یا auth به‌عنوان PASS فرم مصرف نشوند. هیچ source/test در این اصلاح documentary تغییر یا اجرا نشده است؛ P10 و تاریخچه بدون تغییر می‌مانند و journey کامل سفارش/پرداخت ادعا نمی‌شود.

افزودهٔ پس از اجرا: checkpoint تاریخی بالا محفوظ است. نتیجهٔ فعلی، اصلاح native input و ترتیب mandatory rapid assertions، failureهای محفوظ و توقف ورود Firefox در [گزارش اجرای فرم](EZPOST_QA_CUSTOMER_FORM_EXECUTION_2026-11-17.md) آمده‌اند. بررسی ایستای فعلی پس از افزوده‌شدن ابزار recovery، ۱۴ فایل inherited syntax و دو فایل اضافی دارد؛ شمار ۱۳ بالا مربوط به checkpoint اولیه است. PASS نهایی Chrome به‌معنی PASS فرم در Firefox نیست.
