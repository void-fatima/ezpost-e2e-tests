# قرارداد کیس فرم واقعی مشتری و نشانی EZPost

## وضعیت اجرای واقعیِ فعلی — افزوده پس از طراحی

قرارداد و جدول‌های اولیهٔ پایین، وضعیت تاریخی **پیش از کد / NOT EXECUTED** را حفظ می‌کنند؛ وضعیت فعلی اجرای همان IDها در این بخش و [گزارش اجرایی فرم](../Reports/EZPOST_QA_CUSTOMER_FORM_EXECUTION_2026-11-17.md) ثبت می‌شود. هیچ ID یا traceability تغییر نکرده است؛ `CF-CP01…12` دوازده test مستقل نیستند.

| ID / مرورگر | نتیجهٔ فعلی | subset واقعاً اجراشده و مرز |
|---|---|---|
| CF-F01 / Chrome157.0.8103.78 | **نسخهٔ نهایی یک PASS**؛ دو failure قبلی محفوظ | ordinary ورود دستی و assertionهای پس از آن، owned populated cart، native validity/correction، location، keyboard، narrow، draft، هر دو rapid boundary و cleanup اجرا شدند. [result نهایی](../Evidence/Authenticated-Checkout-2026-11-17/chrome-form-coverage-01/driver-25832-1794946348208/authenticated-checkout-results.json)؛ name۱۲۱→۱۲۰ و address۳۰۱→۳۰۰ در همان اجرا درست بودند |
| CF-F01 / Firefox160.0 | **یک FAIL در manual auth setup**؛ فرم NOT RUN | guest/draft prerequisite و start نخست اجرا شد؛ verify صفر، blockedMutations یک، Add صفر و cleanup=`not-needed`. CP01 کامل نشد؛ CP02…11 فرم اجرا نشدند و cleanup owned در CP12 لازم نشد. [result Firefox](../Evidence/Authenticated-Checkout-2026-11-17/firefox-form-coverage-01/driver-27520-1794946596916/authenticated-checkout-results.json)، [progress](../Evidence/Authenticated-Checkout-2026-11-17/firefox-form-coverage-01/driver-27520-1794946596916/progress.json) |

source مشترک Chrome نهایی و Firefox ثبت‌شده: `1070a0acdeb9adacea1059d9b95ffafcddc46cb5799b343fd27ea3ae0a793e0d`؛ هر دو runner completed و source unchanged بودند، اما coverage یکسان نیست. کاربر عدم دریافت SMS، کلیک resend و نمایش NS error را گزارش کرد؛ resend با guardِ یک start در شاخهٔ `AUTH_START_REQUIRES_SINGLE_MANUAL_PHONE_MATCH` مسدود شد. [تشخیص سانیتایزشده](../Evidence/Authenticated-Checkout-2026-11-17/firefox-form-coverage-01/login-interruption-diagnostics.json)، start نخست HTTP200، چهارده رکورد Errored شامل احتمال retry، صفر verify و شش input OTP نشان داد؛ این شمارش SMS/کلیک انسانی یا تحویل کد نیست. deny با `req.destroy()` می‌تواند خطای شبکهٔ `NS_*` نشان دهد، اما کد دقیق ضبط نشده و حدس زده نمی‌شود. این interruption، defect تأییدشدهٔ provider/application یا fail validation فرم نیست. پیش‌نیاز باز، دریافت عملی OTP مجاز و verify واقعی همان هویت است؛ هیچ rerun، resend یا PASS آینده فرض نمی‌شود.

`CF-INV01` دربارهٔ طول۱۱۸ در تلاش Chrome قبلی همچنان **UNRESOLVED** است؛ PASS اخیر با rapid oracle دقیق و probe خالی۱۰‌تکراری، علت آن را ثابت یا fixed نمی‌کند. تفکیک paced-input کوتاه در برابر rapid boundary، مرزهای shipping/save/order/payment و تمام failureهای تاریخی محفوظ‌اند.

### محدودیت‌های مادیِ بازبینی نهایی؛ بدون تغییر نتیجهٔ تاریخی

1. در کد ثبت‌شده، `session()` **پیش از cleanup/Remove** اجرا می‌شود و بعد از Remove تکرار نمی‌شود. پس ordinary identity فقط تا پیش از حذف بررسی شده است؛ **هویت پس از Remove NOT VERIFIED** است. اگر حذف با افت session به guest همراه شود و baseline خالی باشد، GET cart ناشناسِ خالی می‌تواند comparison snapshot را بگذراند. این رخداد مشاهده یا اثبات نشده است؛ gap اوراکل است. PASS تاریخی و artifactها تغییر نمی‌کنند؛ ادعای بازگردانی سبد در همان حساب پس از حذف نیازمند post-Remove identity assertion مستقل است.
2. قبل/بعد Add، یک خط جدید matching را نشان می‌دهد؛ این delta به‌تنهایی provenance در برابر writer هم‌زمان همان حساب نیست. `addAttempted` پیش از عبور واقعی Add از guard فعال می‌شود و fallbackِ `registerFrom` ممکن است خط matching هم‌زمان را منتسب به تست کند. **هیچ concurrency یا حذف قلم نامتعلق در شواهد تأیید نشده**؛ مالکیت قطعی در چنین وضعی هم ثابت نشده است. پیش‌نیاز هر mutation آینده، single-writer/exclusivity کنترل‌شدهٔ همان حساب در بازهٔ mutation **یا correlation واقعیِ پاسخ Add با خط ایجادشده** است؛ هیچ‌کدام از شواهد ثبت‌شده احراز نشده‌اند. account تعیین‌شده به‌خودی‌خود exclusive فرض نشود و endpoint/lock جدید اختراع نشود.

همین محدودیت ownership در source مشترک H01 نیز وجود دارد؛ گزارش تاریخی H01 بازنویسی نشده و فقط دامنهٔ استنادش در این سند محدود می‌شود. این اصلاح documentary است؛ هیچ source، rerun یا mutation تازه برای رفع آن اجرا نشده است.

**اصلاح ترتیب اجرا، پیش از نسخهٔ بعدی کد:** دو تلاش اولیهٔ Chrome در assertionهای نام متوقف شدند؛ نتایج و source دقیق هر دو با hash تأیید و حفظ می‌شوند. انتظار maxlength تغییر نمی‌کند. برای جلوگیری از اجرا‌نشدن تمام بررسی‌های مستقل، آزمون‌های طول زیادِ native name/address به پایان همان `CF-F01` منتقل می‌شوند. هر دو مشاهدهٔ boundary، مقدار مورد انتظار مستقل، focus و نتیجهٔ واقعی را ثبت می‌کنند و **یک assertion اجباری پایانی، دقیقاً دو مشاهدهٔ صحیح را الزام می‌کند**؛ هر اختلاف، journey را FAIL می‌کند. این تجمیع failure را نادیده نمی‌گیرد و PASS جعلی تولید نمی‌کند. روش سریع native بدون انتظار میان کاراکترها حفظ می‌شود؛ افت ورودیِ مشاهده‌شده با تغییر سرعت «رفع‌شده» اعلام نمی‌شود. سایر invalid→valid، location، keyboard، narrow و draft checks پیش از این دو boundary اجرا می‌شوند. cleanup پس از navigation به cart با GET واقعی cart همگام می‌شود، سپس فقط Remove خط owned انجام می‌گیرد.

ورودی‌های کوتاهِ لازم برای native minlength، پس از هر کلید با مقدار مستقل prefix همگام می‌شوند؛ این بخش **paced input** است. دو بررسی طول زیاد همچنان بدون همگام‌سازی میان کاراکترها اجرا می‌شوند و نتیجهٔ rapid جدا ثبت می‌شود. probe خالیِ ده‌تکراری افت طول را بازتولید نکرد؛ بنابراین علت failure طول۱۱۸ به‌جای۱۲۰ و وضعیت آن حل‌نشده است. این تمایز، policy محصول یا برطرف‌شدن باگ را نتیجه‌گیری نمی‌کند.

تاریخ طراحی پیش از کد: ۱۷ نوامبر ۲۰۲۶. Workspace مستقل: `C:\Users\LOCAL_USER\Desktop\EZPost`. برنامه: `http://172.16.30.198:5800/`. batch فرم در شاخهٔ `test/checkout-customer-form`، پس از handoff احرازشدهٔ سبد پُر طراحی می‌شود. **تمام وضعیت‌های اولیهٔ این سند DEFINED BEFORE IMPLEMENTATION / NOT EXECUTED هستند**؛ نتیجهٔ handoff قبلی، نتیجهٔ اجرای این فرم نیست.

یک journey اصلی `CF-F01` در هر مرورگر تعریف می‌شود؛ checkpointهای `CF-CP*` تست مستقل اضافه نیستند. IDهای M01، ordering، cart، authentication و `ACO-H01` بدون تغییر می‌مانند. setup واقعیِ ورود با شماره/OTP دستی از assertionهای خودکار پس از آن جداست؛ هیچ OTP خودکار، session مصنوعی یا account creation ثابت‌نشده ادعا نمی‌شود.

## منابع و حد انتظار

| کلید | منبع | آنچه ثابت می‌کند و آنچه ثابت نمی‌کند |
|---|---|---|
| U1 | درخواست جاری کاربر برای فرم واقعی مشتری/نشانی، پس از ordinary login و owned-cart handoff | ویرایش synthetic در browser و validation غیر persist پس از احراز رفتار مجاز است؛ save/profile/address/customer persistence بدون داده و restore پشتیبانی‌شده مجاز نیست. order/payment ممنوع است |
| O1 | [metadata واقعی فرمِ سبد پُر Chrome](../Evidence/Authenticated-Checkout-2026-11-17/chrome-handoff-ready-01/rendered-form-metadata.json) | چهار کنترل واقعی، نوع/required/min/max/pattern و نمایان‌بودن آنها؛ فقط metadata، بدون مقدار کاربر. این شاهد به‌تنهایی business grammar یا server validation نیست |
| C1 | GET خواندنی و موفقِ module عمومی `/_nuxt/components/screens/checkout.tsx` در همین بررسی | markup و client contract مشاهده‌شده؛ trigger سفارشی `.checkout-select__trigger[type="button"][aria-haspopup="listbox"]`، گزینهٔ `li[role="option"]` و hidden native select. انتخاب province مقدار city را reset می‌کند. mobile/postal با `/\D/g` non-ASCII و nondigit را حذف می‌کنند. این implementation baseline است، نه تصویب policy فارسی/عربی |
| C2 | درخواست واقعی GET `/api/v1/shipping/locations` و associationهای برگشتی آن | دادهٔ جاری province/city برای انتخاب و کنترل association، نه لیست hardcodeشده یا انتخاب شهر/کد حدسی. schema واقعی باید قبل از assertion از response بررسی شود |
| C3 | public client سبد و Remove عادیِ مشاهده‌شده در اجرای واقعی Chromeِ ACO-H01؛ [assertion cleanup موجود](../../cypress/e2e/checkout/authenticated-cart-checkout.cy.js) | handler Remove پیش از POST دو کلید `ezpost_checkout_address` و `ezpost_active_order_id` را از sessionStorage حذف می‌کند؛ H01 نبودشان را بعد cleanup بررسی کرد. این مسیر عادی برای draft صرفاً test-owned این batch استفاده می‌شود؛ حذف مستقیم storage یا reset ساختگی مجاز نیست |
| H1 | [قرارداد ACO-H01](EZPOST_QA_AUTHENTICATED_CHECKOUT_TEST_CASES.md)، [بازبینی authoring](../Reports/EZPOST_QA_AUTHENTICATED_CHECKOUT_AUTHORING_REVIEW_2026-11-17.md) | private identity، snapshot اولیهٔ حساب، product غایب از baseline، owned-line Add، handoff واقعی و cleanup فقط خط suite؛ بررسی این فرم نباید اقلام قبلی را تغییر دهد |
| H2 | [قرارداد authenticated session](EZPOST_QA_AUTHENTICATED_SESSION_TEST_CASES.md)، [fixture مستقل محصول](../../cypress/fixtures/cart-observed.json) | ordinary anchor/session/me و قصد محصول/package/quantity مستقل؛ مبلغ فقط presentation، نه قیمت تجاری مستقل |
| R1 | [Phase 1، J01 و A09/T02](../Planning/EZPOST_QA_PHASE1_REVIEW.md) | traceability خانوادهٔ فرم/checkout؛ قواعد غایب به‌تنهایی از این برنامه‌ریزی approved نمی‌شوند |

## inventory واقعی و تفکیک validation

همهٔ چهار field در O1 required و نمایان بوده‌اند. تعداد/نوع/control فعلی در شروع اجرا دوباره بررسی شود؛ هر اختلاف، failure/prerequisite قابل بررسی است و baseline بی‌اجازه برای green شدن عوض نمی‌شود.

| شناسایی واقعی field | نوع native | constraint مشاهده‌شده | oracle مجاز این batch |
|---|---|---|---|
| `autocomplete="name"` | input text | required؛ minLength=2؛ maxLength=120 | `.validity.valueMissing/tooShort/valid` و مقدار synthetic بعد از تایپ واقعی؛ طول قابل ورود، نه پذیرش server یا شخص حقیقی |
| `autocomplete="tel"` | input text | required؛ maxLength=11؛ pattern=`09[0-9]{9}` | valueMissing/patternMismatch/valid و رفتار input واقعی؛ این field `type=tel` فرض نمی‌شود |
| `autocomplete="postal-code"` | input text | required؛ maxLength=10؛ pattern=`[0-9]{10}` | valueMissing/patternMismatch/valid و طول مقدار synthetic؛ نه اعتبار نشانی یا کد پستی واقعی |
| `autocomplete="street-address"` | textarea | required؛ minLength=10؛ maxLength=300 | valueMissing/tooShort/valid و boundary تایپ واقعی؛ نه geocoding، deliverability یا persist |
| province/city | trigger سفارشیِ button با listbox و گزینه‌های role=option؛ native select مخفی | city پیش از province قابل انتخاب نیست؛ تغییر province، city را reset می‌کند؛ association از C2 | تعامل فقط کنترل نمایان؛ native hidden select با force یا `.select()` استفاده نشود. code/label شهر از دادهٔ واقعی همان province بیاید |

خواندن native `.validity` و state حاصل از تایپ واقعی، native browser validation است. کلیک submit، handler validation اختصاصی، پیام submit، server rejection یا ایجاد order در این batch اجرا نمی‌شوند؛ native invalid state جای coverage آنها نیست.

## پیش‌شرط مشترک و جلوگیری از درخواست ناخواسته

1. یک context مستقل Cypress و همان نصب موجود؛ setup U1/H1 با user-entered phone/OTP، anchor خصوصی مستقل و session/me ordinary. در source ثبت‌شده همان identity تا پیش از Remove بررسی می‌شود؛ post-Remove identity هنوز assertion ندارد. initial guest sync خالی، cart واقعی حساب snapshot و قلم مورد قصد با Add عادی ساخته شود. candidate فقط BF49/۱۲۰/q2 در صورت غیبت کل محصول BF یا Simple58/۲۵/q1 در صورت غیبت کل محصول Simple است؛ هیچ قلم قبلی merge/edit/remove نشود. **برای mutation آینده، علاوه بر اینها single-writer/account exclusivity کنترل‌شده یا Add-response-to-line correlation واقعی لازم است**؛ این prerequisite در evidence فعلی established نیست.
2. از سبد پُر به فرم واقعی برسد؛ نام/slug/package/quantity intent، cart composition و quote presentation قبل/بعد handoff بررسی شود. حضور main، route یا HTTP200 به‌تنهایی prerequisite فرم نیست. سبد پُر و ordinary session باید حین آزمون برقرار بمانند.
3. `ezpost_checkout_address` و `ezpost_active_order_id` در شروع باید absent باشند؛ draft قبلی restore/clear نشود. fieldهای مورد ویرایش نیز باید در وضعیت اولیهٔ معلوم و متعلق به همین flow باشند. اگر دادهٔ واقعی/پیش‌پرشدهٔ شخصی یا draft نامعلوم موجود بود، بدون overwrite توقف همان slice لازم است؛ شمارهٔ auth به synthetic form data کپی نشود.
4. فقط دادهٔ synthetic بی‌ارتباط با شخص/نشانی واقعی برای typing استفاده شود. رشتهٔ معتبر از نظر mobile صرفاً marker نحویِ تولیدشده در حافظه است؛ با آن SMS/login یا network request فرستاده نمی‌شود. هیچ مقدار کامل شماره، نشانی، OTP، raw draft یا field value وارد گزارش عمومی نشود؛ خروجی فقط boolean/metadata/outcome سانیتایزشده باشد.
5. **address در تمام تست‌های دیگر خالی بماند.** پیش از آزمون خودِ address، mobile خالی شود و تا پایان آن خالی بماند؛ پیش از پرکردن دوبارهٔ سایر fieldها، address دوباره خالی شود. این sentinel پیش از هر مرحله بررسی شود تا address کامل، shipping خودکار راه نیندازد. صرف کلیک‌نکردن shipping button تضمین کافی نیست.
6. guard فقط auth دقیق و Add/Remove متعلق به setup/cleanup را مجاز نگه دارد؛ quote محصول read-only است. تمام shipping POST، profile/address/customer saves، order و payment denied بمانند. اگر interaction فرضاً browser-only درخواست ممنوع ساخت، request متوقف و آن بخش failure/incomplete مستند شود؛ guard برای ادامه باز نشود.
7. submit واقعی فرم **هرگز** کلیک یا با Enter در field فعال نشود. shipping quote button نیز هرگز کلیک نشود. برای invalid state از `.validity` استفاده شود؛ پیام custom submit یا عملکرد دکمهٔ Next با روش نامعلوم شبیه‌سازی نمی‌شود.
8. پاک‌سازی، clearing عادی فقط مقدارهای synthetic ساخته‌شده در همین فرم و Remove خط منتسب‌شده از delta است؛ برای provenance قطعی آن در mutation آینده، prerequisite بند۱ لازم است. طبق C3 همین Remove عادی، draftها را پیش از POST پاک می‌کند؛ چون هر دو کلید پیش از Add absent بوده‌اند، draft تازه از UI synthetic همین flow ساخته شده است. **پس از cleanup، snapshot content و absence واقعی هر دو کلید assert می‌شود**؛ اگر باقی ماند، cleanup failure روشن است. هویت فقط قبل Remove بررسی شده؛ بازگردانی baseline در همان حساب پس از حذف هنوز مستقلاً verified نیست. هیچ حذف مستقیم storage یا reset ساختگی استفاده نشود؛ draft واقعی کاربر یا account حذف نشود.

## کیس اصلی و checkpointهای همان journey

جدول‌های زیر انتظار طراحیِ پیش از کد را حفظ می‌کنند؛ انتظار حفظ هویت پس از حذف یا مالکیت واقعی قلم برای هماهنگی با gap کد ضعیف نشده است. پوشش فعلیِ ناقص، از جمله post-Remove identity و provenance در حضور writer هم‌زمان، در الحاق بالای سند ثبت شده و این انتظارها را PASS نمی‌کند.

| ID / traceability | شروع و پیش‌شرط | اقدام | نتیجهٔ مورد انتظار و منبع | رفتار غلطی که باید رد شود | وضعیت اولیه |
|---|---|---|---|---|---|
| CF-F01 → J01/CHECK-01؛ زمینهٔ A09/T02 و U01/U03/U04 | ordinary identity واقعی؛ owned populated cart طبق H1؛ فرم O1؛ نبود draft اولیه و field شخصی؛ C2 دادهٔ دو province متمایز با حداقل یک city هرکدام؛ sentinel ناقص قبل از هر interaction | native empty/boundary/invalid→valid برای هر field؛ province/city واقعی؛ correction؛ keyboard Tab؛ narrow layout؛ draft observation فقط test-owned؛ clearing و owned-cart cleanup | metadata/validity و مقدارهای synthetic مطابق O1/C1؛ association دقیق C2 و resetcity؛ کنترل واقعی keyboard/narrow قابل استفاده؛ session/cart ثابت؛ صفر shipping/save/order/payment، baseline اولیه حفظ شود. source U1 و implementation contract O1/C1/C2، نه policy مصوب server | پذیرش native state غلط، normalization خلاف baseline بدون تشخیص، city متعلق به province دیگر، city قدیمی بعد تغییر province، کنترل hidden/پوشیده، فقدان keyboard action، mutation ناخواسته، تغییر اقلام قبلی یا cleanup مخفی | **DEFINED BEFORE IMPLEMENTATION / NOT EXECUTED**؛ یک assisted journey در هر مرورگر، نه یک test برای هر checkpoint |

| checkpoint | اقدام دقیق و انتظار observable | source و مرز | وضعیت اولیه |
|---|---|---|---|
| CF-CP01 — setup/form | guest-empty → manual login → strict ordinary identity → baseline account cart → intent مستقل و Add owned → populated checkout؛ فرم واقعی و metadata چهار field احراز شوند | U1/H1/H2/O1؛ صرف auth POST یا URL کافی نیست | NOT EXECUTED |
| CF-CP02 — empty required | fieldهای synthetic اولیه خالی؛ برای هر چهار field valueMissing=true و valid=false، بدون submit؛ address sentinel خالی احراز شود | O1؛ empty برای minLength به معنی tooShort=true فرض نمی‌شود | NOT EXECUTED |
| CF-CP03 — name boundaries/correction | تایپ واقعی طول۱→tooShort؛ اصلاح به۲→از نظر native همین field معتبر؛ طول۱۲۰ قابل ورود؛ تلاش تایپ۱۲۱ فقط حداکثر۱۲۰ را باقی بگذارد؛ خالی‌کردن دوباره valueMissing بدهد | O1 native minlength/maxlength؛ نه معنای تجاری نام و نه حد server | NOT EXECUTED |
| CF-CP04 — mobile syntax/correction | address خالی؛ marker ASCII با prefix نادرست یا طول۱۰ patternMismatch بدهد؛ اصلاح به prefix09 و طول۱۱ valid همین field باشد؛ تلاش کاراکتر۱۲ از سقف۱۱ عبور نکند؛ سپس clear | O1/C1؛ marker وارد auth یا network نمی‌شود؛ پذیرش server/OTP پوشش ندارد | NOT EXECUTED |
| CF-CP05 — postal syntax/correction | address خالی؛ ASCII۹رقمی patternMismatch؛ اصلاح به۱۰رقمی valid همین field؛ تلاش رقم۱۱ از سقف۱۰ عبور نکند؛ سپس clear | O1/C1؛ کد synthetic، نه کد پستی واقعی/قابل تحویل | NOT EXECUTED |
| CF-CP06 — address boundaries/correction | نخست mobile خالی احراز شود؛ طول۹ tooShort؛ اصلاح به۱۰ valid همین field؛ طول۳۰۰ قابل ورود؛ تلاش۳۰۱ از۳۰۰ عبور نکند؛ address در پایان دوباره خالی و valueMissing شود | O1؛ mobile در تمام این مرحله sentinel خالی، پس نشانی کامل و shipping خودکار ایجاد نشود | NOT EXECUTED |
| CF-CP07 — observed digit handling | با address خالی، ASCII/Persian/Arabic نمونه‌های synthetic در mobile/postal واقعاً تایپ شوند؛ نتیجهٔ فعلی C1 یعنی حذف non-ASCII توسط `/\D/g` و حفظ بخش ASCIIِ مجاز بررسی شود؛ correction با ASCII انجام و clear شود | implementation baseline C1؛ حذف ارقام فارسی/عربی به‌عنوان policy مطلوب/مصوب معرفی نشود؛ بدون OTP/server claim | NOT EXECUTED |
| CF-CP08 — province/city dependency | city پیش از province disabled؛ trigger نمایان province باز شود؛ provinceA از C2 انتخاب، cityA واقعاً از لیست شهرهای A انتخاب؛ سپس provinceB متمایز انتخاب و city قبلی reset/انتخاب‌نشده شود؛ گزینه‌ها/انتخاب شهر B با association C2 تطبیق یابد | C1/C2؛ names/codes hardcode نشوند. اگر دادهٔ لازم دو province/city وجود نداشت، prerequisite صریح fail/incomplete؛ assertion اصلی silent حذف نشود. address خالی بماند | NOT EXECUTED |
| CF-CP09 — keyboard | در desktop از field معلوم Tab واقعی ارسال و focus کنترل بعدی مطابق ترتیب واقعی DOM/actionable controls بررسی شود؛ custom trigger با keyboard پشتیبانی‌شده باز/بسته یا انتخاب و اثرش assert شود؛ صرف activeElement وجود کافی نیست | C1 و DOM واقعی؛ ترتیب مطلوب حدسی یا پشتیبانی تمام ARIA keyboardها ادعا نشود؛ Enter submit فعال نشود | NOT EXECUTED |
| CF-CP10 — narrow usability | viewport390×844 بعد desktop1366×900؛ fieldها و custom province/city trigger واقعی نمایان و بدون force قابل focus/interaction؛ typing/correction synthetic و باز/بسته‌شدن listbox واقعاً اثر داشته باشد؛ address sentinel خالی | DOM واقعی و U1؛ emulation است، نه physical-device/native-keyboard certification | NOT EXECUTED |
| CF-CP11 — owned local draft | فقط وقتی draft ابتدا absent بوده و بعد همین UI دادهٔ synthetic ساخته، draft/state با expected synthetic intent در حافظه compare شود؛ browser state از server persist جدا ثبت شود؛ raw draft منتشر نشود | C1 و مشاهدهٔ واقعی؛ این observation policy retention یا save موفق server نیست. cleanup همان draft مطابق C3 در CP12 assert شود | NOT EXECUTED |
| CF-CP12 — teardown | sentinel خالی، synthetic fieldها با UI پاک و فقط خط متعلق به suite از Remove عادی حذف؛ baseline cart، ordinary identity و absence واقعی هر دو کلید draft/order بررسی؛ هر failure اولیه و cleanup جدا ثبت شود | H1/U1/C3؛ بدون direct storage wipe، حذف account، کل cart، draft قبلی، order یا دادهٔ شخصی. باقی‌ماندن draft cleanup failure است | NOT EXECUTED |

## تصمیم‌ها و قسمت‌های اجرا‌نشدهٔ باقی‌مانده

| حوزه | شرط یا تصمیم غایب | disposition همین مرحله |
|---|---|---|
| post-Remove identity | session/me و ordinary identity پس از حذف بررسی نشده‌اند | snapshot baseline کافی برای اثبات همان حساب نیست؛ نیازمند assertion بعد حذف در کار آینده؛ نتیجهٔ تاریخی بازنویسی نشود |
| provenance و concurrent same-account writer | single-writer/account exclusivity کنترل‌شده یا correlation پاسخ واقعی Add با خط ایجادشده | **پیش‌نیاز mutation آینده؛ established نیست**. writer/حذف اشتباه تأیید نشده و روش lock/API حدسی ساخته نشود |
| custom submit validation و پیام‌های خطای فرم | handler کامل و مرز order/save؛ در client فعلی submit می‌تواند وارد مسیر نوشتن order شود | کلیک submit/Next و خطاهای custom-submit خارج CF-F01؛ native validity جای آنها PASS نمی‌شود |
| shipping calculation | شرایط واقعی trigger، قرارداد provider و مجوز مناسب برای request محاسبه | sentinel ناقص + guard؛ عدم درخواست انتظار این batch است. shipping outcome/mock success پوشش نیست |
| Persian/Arabic acceptance policy | تصمیم محصول دربارهٔ normalization مطلوب و پذیرش server | صرفاً baseline حذف non-ASCII در C1 تست می‌شود؛ policy localization حل‌شده نیست |
| province/city business validity | مرجع تجاری مستقل نشانی و semantics پشتیبانی ارسال | C2 برای association presentation کافی است؛ صحت مستقل مرجع جغرافیا/ارسال ادعا نمی‌شود |
| draft/back/forward/reload retention | lifetime/fallback و semantics عمومی retention هنوز مصوب نیستند؛ cleanup این slice با Remove عادی C3 روشن است | فقط local test-owned observation و absence بعد Remove؛ retention policy عمومی PASS نیست. هیچ draft شخصی restore/clear نشود |
| persist customer/profile/address | test-owned record/data و restore/cleanup پشتیبانی‌شده و مرز save روشن | تا رفع همین prerequisite، فقط browser editing؛ اگر تنها مانع save بود یک سؤال دقیق دربارهٔ همان داده/restore کافی است |
| review/order/payment | قرارداد مبلغ مستقل و final review، مرز create-order، sandbox/provider/reconciliation و مجوز مرحلهٔ بعد | order/payment همچنان ممنوع؛ handoff یا valid بودن native field تکمیل خرید نیست |

## correctness و ثبت نتیجهٔ آینده

هر assertion حیاتی باید مقابل incorrect input/association/state مشخص fail شود. expected synthetic مقدار مستقل از UI است؛ outputِ خود UI یا API oracle خودش نیست. فقط وجود field، visibleبودن یا validبودن کل فرم بدون اثبات action کافی نیست؛ هر typing/correction/focus/select باید اثرش را روی همان کنترل/association نشان دهد. branchهایی که prerequisite را ندارند باید incomplete/failure روشن داشته باشند، نه PASS با assertion حذف‌شده.

هیچ controlled success response، forced interaction، arbitrary sleep، swallowed error یا exception suppression عمومی مجاز نیست. تغییر متد native validity به نتیجهٔ مطلوب، bypass broken flow یا weakening expectation برای greenشدن ممنوع است. checkpointهایی که به supplied client contract محدودند، با همین محدودیت گزارش شوند.

اجرای بعدی در Cypress نمایان، Chrome سپس Firefox با یک source ثابت خواهد بود. application-opened/spec-loaded/tests-completed، manual setup، assertions واقعی، cleanup و source hash جدا ثبت شوند. هیچ field value، شماره، OTP، cookie/token، raw session/draft/DOM یا screenshot شخصی منتشر نشود. در زمان نگارش این سند **CF-F01 و همهٔ checkpointهایش NOT EXECUTED** هستند؛ P10 و تمام شواهد تاریخی محفوظ‌اند و coverage کامل ordering/payment ادعا نمی‌شود.
