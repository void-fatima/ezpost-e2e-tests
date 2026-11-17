# قراردادهای انتقال سبد احرازشده به فرم واقعی checkout در EZPost

**به‌روزرسانی اجرای ۱۷ نوامبر:** `ACO-H01` با source نهایی مشترک در Chrome و Firefox هرکدام یک PASS گرفت؛ ورود manual-assisted بود. تلاش اولیهٔ Chrome پیش از OTP/Write یک failure همگام‌سازی داشت و محفوظ است. نتیجهٔ تفصیلی، محدودیت account-dashboard/full unaffected DOM و cleanup در [گزارش اجرای این batch](../Reports/EZPOST_QA_AUTHENTICATED_CHECKOUT_EXECUTION_2026-11-17.md) آمده است. عبارت‌های NOT EXECUTED و inventory pending در متن زیر، checkpoint تاریخیِ **زمان طراحی پیش از کد** هستند. metadata فرم واقعی اکنون مشاهده شده و طراحی فرم سند جداگانه دارد؛ این PASS مجوز order/payment یا مصوبهٔ سیاست تجاری نیست.

تاریخ طراحی پیش از پیاده‌سازی: ۱۷ نوامبر ۲۰۲۶. Workspace: `C:\Users\LOCAL_USER\Desktop\EZPost`. برنامه: `http://172.16.30.198:5800/`. batch نخست مربوط به شاخهٔ `test/authenticated-cart-checkout` است. **وضعیت اولیه: DEFINED BEFORE IMPLEMENTATION / NOT EXECUTED**. این سند مجوزهای کاربر، طراحی، پیاده‌سازی، اجرای واقعی و defect را جدا نگه می‌دارد؛ هیچ نتیجهٔ اجرای تازه‌ای در زمان طراحی ادعا نمی‌شود.

تمام IDها، traceability، گزارش‌ها و failureهای قبلی M01، ordering، cart و authentication محفوظ‌اند. `ACO-H01` افزودهٔ این مرحله است؛ checkpointهای زیر test مستقل اضافه نیستند. دو اجرای احرازشدهٔ قبلی هرکدام یک journey PASS بودند، اما سبدشان خالی بود و فرم checkout را نشان ندادند؛ آن سابقه جایگزین مسیر **ورود واقعی ← افزودن قلم متعلق به تست ← سبد پُر ← checkout ← مشاهدهٔ فرم واقعی** نمی‌شود.

## منابع و حدود مجوز

| کلید | منبع | استفاده و حد استناد |
|---|---|---|
| U1 | درخواست جاری «authenticated-cart handoff and the actual customer/address checkout form» | ورود عادی با شماره/OTP دستی، ایجاد معمول حساب در صورت نیاز و نگه‌داشتن آن قبلاً مجازند. add/change/remove عادی فقط برای اقلامی که همین suite در حساب تعیین‌شده می‌سازد مجاز است؛ تمام اقلام قبلی باید حفظ شوند |
| U2 | همان درخواست؛ مرز customer/address | ابتدا فرم و requestهای واقعی بررسی شوند. ویرایش browser-only و validation بدون persist فقط پس از احراز رفتار مجازند؛ profile/address/customer persistence بدون دادهٔ متعلق به تست و restore/cleanup مصوب مجاز نیست. order و payment در این مرحله مجاز نیستند |
| H1 | [قرارداد و اجرای authenticated session](EZPOST_QA_AUTHENTICATED_SESSION_TEST_CASES.md) | anchor خصوصی شمارهٔ submitشده، session با id مثبت و role `customer`، me.mobile/role، account UI و immediate reload؛ setup دستی از assertion خودکار جداست. PASS پیشین مجوز reuse کوکی یا bypass نیست |
| H2 | [fixture محصول موجود](../../cypress/fixtures/cart-observed.json)، [کیس‌های cart](EZPOST_QA_CART_TEST_CASES.md) | هویت مستقل محصول، package، labels و quantity؛ fixture تاریخ‌دار باید با محصول فعلی تطبیق یابد. قیمت fixture مرجع تجاری مصوب نیست |
| H3 | [قرارداد presentation سبد](../../cypress/support/cart-contract.cjs)، [helper موجود](../../cypress/support/cart.js) | DOM و controls مشاهده‌شده، quote correlation و قصد مستقل؛ helper مهمان نباید guard مهمان یا cleanup خالی‌کردن کل سبد را به حساب احرازشده تحمیل کند |
| R1 | [Phase 1](../Planning/EZPOST_QA_PHASE1_REVIEW.md)، P14/T02–T07/J01 و A05/A09/A10 | traceability ریسک و پوشش؛ قواعد merge، قیمت، retention، eligibility یا فرم از آن به‌تنهایی acceptance مصوب نمی‌شوند |
| O1 | inspection مشروعِ همین batch از cart/authenticated requests و customer form | پیش‌نیاز افزودن allowlist یا authoring فرم؛ هنگام طراحی هنوز inventory نهایی این batch تکمیل نشده است. URL/selector/field/endpoint نامعلوم ساخته نمی‌شود |

U1 اجازهٔ سؤال دوباره دربارهٔ مجوز generic شماره/OTP، ایجاد معمول یا retention حساب را نمی‌دهد. شماره/OTP را خود کاربر در Cypress نمایان وارد می‌کند؛ ابزار موفقیت مصنوعی یا session شخصی/ادمین کپی نمی‌کند. در PUBLIC هیچ شماره، OTP، id حساب، cookie/token/session body، آدرس واقعی، raw authenticated network/DOM یا تصویر شخصی منتشر نمی‌شود. مقدارهای ضروری فقط در حافظهٔ خصوصی assertionها استفاده شوند؛ خروجی عمومی boolean، شمارش و outcome سانیتایزشده باشد.

## پیش‌شرط و قرارداد یک journey

1. مرورگر اختصاصی Cypress با همان dependencyهای نصب‌شده و configuration مجزای این slice؛ suiteهای read-only/guest قبلی و guard آنها تغییر نکنند. ابتدا guest session واقعی، UI خالی و absent/empty بودن منبع واقعی guest sync یعنی `ezpost_guest_cart_v1` بررسی شود؛ storage پاک یا state موفق inject نشود.
2. setup واقعیِ manual-assisted با همان start/verify دقیق و guard محدود انجام شود. identity anchor مستقل، همان شمارهٔ واقعاً submitشده قبل از پاسخ موفق است؛ expected identity از پاسخ session کپی نشود. session.id باید مثبت، session/me role برابر `customer` و mobile هر دو منطبق با anchor باشد. account UI واقعی با همان identity/role بررسی شود. تنها `200`، toast، route یا non-null بودن user کافی نیست.
3. **پیش از هر cart write**، snapshot خصوصیِ سبد احرازشده از قرارداد واقعی و render آن ثبت شود: idهای خطوط، محصول/package/artwork موجود و quantity/اجزای پایدار قابل مشاهده. این snapshot، دادهٔ کاربر است؛ raw آن به فایل/report نرود. هیچ initial-empty برای سبد حساب فرض نشود و هیچ قلم قبلی تغییر/حذف نشود.
4. قصد مستقل محصول/package/quantity قبل از Add از H2 ساخته شود؛ از نتیجهٔ cart استخراج نشود. **کل محصول انتخابی باید در snapshot اولیهٔ حساب غایب باشد** تا وابستگی به policy نامعلوم merge بین packageها یا artworkها نداشته باشیم. وجود حتی یک خط از همان product، با هر package/artwork، مانع انتخاب آن fixture است؛ غیبت configuration به‌تنهایی کافی نیست. اگر محصول امنی موجود نبود، prerequisite صریحاً failed/incomplete بماند؛ حذف قلم قبلی یا silent skip مجاز نیست.
5. قصدهای ثابتِ candidate، به همین ترتیب، عبارت‌اند از Black Friday با slug `blackfri-01` و package49/۱۲۰ در q2، فقط اگر کل محصول `blackfri-01` در baseline غایب باشد؛ و سپس Simple با slug `simple` و package58/۲۵ در q1، فقط اگر کل محصول `simple` غایب باشد. **package50 جایگزینِ وجود محصول Black Friday در سبد نمی‌شود**، چون merge backend بین packageها هنوز contract مصوب ندارد. quantity از پیش همین مقدار است و باید در کنترل واقعی قابل انتخاب باشد. اگر هر دو محصول موجودند، prerequisite حل‌نشده است و قلم قبلی تغییر نمی‌کند. انتخاب fixture جایگزین فقط برای جلوگیری از برخورد با اقلام قبلی و **پیش از اقدام** مجاز است؛ پس از مشاهدهٔ نتیجه، expected product/package/quantity عوض نشود. اگر دادهٔ فعلی fixture را نقض کرد، prerequisite روشن fail شود و baseline بی‌اجازه بازنویسی نشود.
6. quote با همان product/package_id/quantity correlate و state محصول/labels/quantity/amount بعد render نهایی یکجا بررسی شود. Add از کنترل واقعی نمایان، یک بار و بعد settled quote انجام شود؛ forced action، sleep دلخواه یا مقداردهی پنهان ممنوع است. مبلغ quote فقط oracle انتقال presentation است، نه اثبات مستقل قیمت، تخفیف، مالیات یا rounding.
7. پیش از گسترش guard، request contract واقعی افزودن و حذف cart از O1 با method/path/body و محدودیت identity بررسی شود. فقط عملیات دقیق موردنیاز همین قصد و cleanup خط متعلق به تست allow شوند؛ wildcard cart API یا حدس endpoint مجاز نیست. مجوز کلی change در U1 به معنی نیاز batch اول به اجرای edit نیست. shipping/customer/profile/address/order/payment writes بسته بمانند؛ اگر مسیر عادی به مورد مسدود نیاز داشت، علت واقعی ثبت شود و guard برای گرفتن PASS باز نشود.
8. مالکیت از **خط جدید واقعی** پس از Add ثابت شود: id در snapshot اولیه نبوده، با عمل همان Add correlate شده و association محصول/package/quantity با intent مستقل منطبق است. صرف delta تعداد یا اولین/آخرین line نشانهٔ مالکیت کافی نیست. id خط از قبل حدس زده نشود. اگر Add بعد ارسال نتیجهٔ نامشخص داد، قبل از retry فقط cart خوانده و delta نسبت به baseline بررسی شود؛ Add تکراری خودکار و حذف خط با ownership نامعلوم مجاز نیست.
9. سپس از checkout control واقعی سبد پُر عبور شود. product/package/quantity و تمام اقلام unaffected قبل و بعد handoff حفظ شوند؛ navigation به‌تنهایی تکمیل انتقال نیست. فرم customer/address باید واقعاً مشاهده و inventory شود. اگر فرم حاضر نشد، checkpoint فرم incomplete/failure روشن است؛ مسیر خالی یا public login جای آن PASS نمی‌شود. مقصد/redirect مشاهده‌شده به‌تنهایی policy مصوب eligibility/return نیست.
10. در batch اول روی فرم فقط inspection انجام شود؛ بدون typing، Next/submit مبهم، درخواست shipping یا persist. پیش از هر تعامل آینده، اثر request و مرز write مشخص شود. account/customer دادهٔ موجود حفظ شود؛ draftهای قبلی پاک یا restore نشده و query حامل order فعال نشود.
11. cleanup در همهٔ مسیرهای بعد از Add، فقط از Remove واقعی و برای id متعلق به suite اجرا شود. بعد حذف، نبود همان خط، بازیابی snapshot اولیه و identity عادی بررسی شود؛ سبد حساب لزوماً خالی نیست. خطای cleanup، failure/آلودگی دادهٔ جدا و آشکار است؛ failure اولیه حفظ شود و cleanup آن را نپوشاند. هیچ delete/reset کل سبد، storage clear یا حذف حساب مجاز نیست.

## کیس batch نخست: ACO-H01

| ID / traceability | شروع و داده | اقدام کاربر | انتظار و منبع | رفتار غلطی که باید رد شود | وضعیت اولیه |
|---|---|---|---|---|---|
| ACO-H01 → P14/T02/T07/J01؛ AUTH-04/07/08، A05/A09/A10 و زمینهٔ T03 | context مستقل؛ guest sync خالی؛ ordinary login واقعی و anchor خصوصی؛ snapshot سبد اولیهٔ حساب؛ fixture معلوم و کل محصول آن غایب در baseline؛ قرارداد واقعی cart write/delete و checkout control بررسی‌شده | manual phone/OTP؛ ساخت intent مستقل؛ انتخاب محصول/package/quantity؛ انتظار quote correlated و render نهایی؛ یک Add عادی؛ بررسی سبد پُر؛ checkout واقعی؛ inspection خواندنی فرم؛ Remove فقط خط owned و restore baseline | ordinary identity در تمام مسیر حفظ شود؛ خط جدید با product/package/quantity و amount presentation مورد قصد ایجاد شود؛ اقلام قبلی دست‌نخورده و composition دقیق باشد؛ checkout سبد پُر با فرم واقعی و cart سازگار مشاهده شود؛ cleanup فقط خط suite و baseline اولیه را برگرداند. منبع U1/U2 و H1/H2، به‌علاوهٔ O1 برای قرارداد فعلی | هویت دیگر/privileged، reset quantity، package اشتباه، quote قدیمی، presentation transfer غلط، خط گم/اضافه، تغییر قلم قبلی، checkout خالی/فرم مشاهده‌نشده با ادعای موفقیت، حذف unowned item یا cleanup ناموفق | **DEFINED BEFORE IMPLEMENTATION / NOT EXECUTED**؛ یک journey در هر مرورگر، setup دستی و assertionهای واقعی جدا |

`ACO-CP*` در جدول بعد فقط checkpointهای همین `ACO-H01` هستند؛ testهای مستقل، coverage کامل familyهای ارجاع‌شده یا نتیجهٔ اجرا محسوب نمی‌شوند.

| checkpoint | assertion یا observation دقیق | نتیجهٔ اولیه |
|---|---|---|
| ACO-CP01 — auth | guest و guest sync خالی؛ manual setup واقعی؛ anchor/session/me/account UI ordinary | NOT EXECUTED؛ manual setup به automated OTP PASS تبدیل نشود |
| ACO-CP02 — baseline/intent | snapshot سبد حساب پیش از write؛ انتخاب محصول کاملاً غایب در baseline و intent مستقل از cart | NOT EXECUTED؛ تمام اقلام قبلی unowned بمانند؛ fallback package از همان محصول ممنوع |
| ACO-CP03 — settled selection | نام/slug/package/labels/quantity درست و quote correlated، CTA واقعی بعد settle | NOT EXECUTED؛ فقط presentation quote، نه pricing مستقل |
| ACO-CP04 — owned Add | خط جدید با id واقعیِ غایب از baseline، intent درست، composition و unaffected دقیق؛ identity همچنان همان | NOT EXECUTED؛ شناسهٔ خط و ownership حدسی مجاز نیست |
| ACO-CP05 — populated checkout | checkout control واقعی از سبد پُر؛ cart همان intent و اقلام قبلی؛ session عادی؛ فرم واقعی | NOT EXECUTED؛ مسیر/۲۰۰/visible main به‌تنهایی موفقیت نیست |
| ACO-CP06 — form inventory | فرم و کنترل‌های واقعی، وابستگی‌ها و مرزهای browser-only/shipping/persist/order/payment خواندنی ثبت شوند | PENDING ACTUAL DOM INSPECTION؛ testcase فرم ساختگی یا placeholder pass نیست |
| ACO-CP07 — cleanup | فقط Remove خط owned؛ baseline اقلام قبلی بازگردد؛ identity محفوظ؛ failure اولیه و cleanup مستقل | NOT EXECUTED؛ هر cleanup ناموفق آشکار و قابل پیگیری بماند |

## inventory فرم و کیس‌های batch بعد

در زمان طراحی این سند، فرمِ سبد پُر هنوز در همین batch inspect نشده است. نام دقیق fieldها، labels، required/optional، selectها، association استان/شهر، محدودیت متن/عدد، selectorها و endpoints downstream **اختراع یا مصوب اعلام نشده‌اند**. کیس‌های تفصیلی فرم فقط پس از O1 و قبل از کد آن slice تعریف می‌شوند. موارد زیر فهرست بررسی‌اند و test اجرایی/شناسهٔ PASS یا placeholder نیستند:

| حوزهٔ بررسی | شاهد لازم پیش از تعریف انتظار | مرز فعلی |
|---|---|---|
| required/optional، empty/valid/invalid/boundary | controls/attributes واقعی، validation native/custom و قواعد supplied؛ observed maxlength به‌تنهایی policy server نیست | فعلاً inspection؛ validation غیر persist پس از احراز behavior |
| رقم فارسی/عربی/لاتین و normalization | نوع input و مسیر واقعی typed/pasted، grammar مصوب یا contract قابل اتکا | equivalence یا rejection عمومی حدس زده نشود |
| dependencyها، استان/شهر و shipping | field map و association واقعی؛ trigger request و ماهیت محاسبه/ذخیره | هیچ shipping response ساختگی یا shipping write ناشناخته |
| feedback، correction، keyboard/focus | متن و semantics واقعی، خطا/رفع خطا و مسیر keyboard مشاهده‌شده | متن خطا یا ترتیب focus از قبل اختراع نشود |
| desktop/narrow و history/value retention | layout واقعی هر viewport و policy روشن retention؛ اثر history و draft بررسی شود | viewport به physical-device coverage تبدیل نشود؛ draft قبلی کاربر تغییر نکند |
| cart/review consistency و save boundary | cart مستقل قبل/بعد؛ fieldها و components واقعی review؛ تفاوت browser state با persist/create-order | order/payment ممنوع؛ customer/address persist نیازمند test-owned data و restore روشن است |

## correctness، اجرا و محدودیت claim

پیش از کد و دوباره پس از کد، هر assertion حیاتی باید روشن کند اگر رفتار ادعاشده خراب بود آیا هنوز PASS می‌شود. validatorهای قابل جداسازی با negative controlهای محلی برای wrong identity، product/package/quantity، amount transfer نادرست، خط owned نامعتبر، تغییر unaffected و cleanup ناقص challenge شوند. این بررسی‌های خالص از live E2E و mock production success جدا گزارش شوند؛ ممکن‌بودن تمام false positiveها منتفی ادعا نمی‌شود.

اجرای مجاز آینده `cypress open → E2E → Chrome` سپس Firefox، روی source/helper ثابت و بدون تغییر dependency است. application-opened، spec-loaded و tests-completed جدا، source hash مشترک، manual setup و نتایج assertion/cleanup ثبت شوند. اگر helper مشترک تغییر کند، اثر آن بر suiteهای قبلی و نیاز rerun روشن شود. هر مرورگر حداکثر یک `ACO-H01` journey در شمارش batch نخست دارد؛ checkpointها یا pure negative controlها تعداد E2E را افزایش نمی‌دهند.

تا داشتن شاهد اجرا، این سند نتیجهٔ PASS، defect برنامه یا فرمِ تست‌شده اعلام نمی‌کند. P10 و failureهای تاریخی باز می‌مانند؛ موفقیت settled Add/checkout آنها را برطرف‌شده نمی‌کند. این مرحله journey کامل سفارش/پرداخت نیست. برای مراحل بعدی، قواعد واقعی review و create-order، test-owned customer/address data و restore پشتیبانی‌شده، و sandbox/provider/reconciliation مجاز لازم خواهند بود؛ هیچ مورد غایب فرض نمی‌شود.
