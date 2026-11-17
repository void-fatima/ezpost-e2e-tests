# اجرای فرم واقعی مشتری و نشانی EZPost

تاریخ: ۱۷ نوامبر ۲۰۲۶. Workspace: `C:\Users\LOCAL_USER\Desktop\EZPost`. برنامه: `http://172.16.30.198:5800/`. این گزارش فقط `CF-F01` است: ورود واقعی ordinary با شماره/OTP دستی ← افزودن قلم متعلق به suite ← سبد پُر ← فرم واقعی checkout ← ویرایش synthetic و validation مرورگر ← cleanup همان قلم و draft متعلق به تست. این journey کامل سفارش/پرداخت نیست.

**وضعیت این checkpoint گزارش:** Chrome نهایی یک PASS دارد و دو failure قبلی حفظ شده‌اند؛ Firefox با همان source نهایی **یک FAIL پیش از verify/ورود موفق** ثبت کرد و به Add یا checkpointهای فرم نرسید. PASS یا rerun آینده برای Firefox فرض نمی‌شود. `CF-INV01`، مشاهدهٔ قبلی طول۱۱۸ به‌جای۱۲۰، باوجود PASS اخیر Chrome **UNRESOLVED** می‌ماند؛ علت application در برابر ابزار/timing ثابت نشده است.

**اصلاح دامنه در بازبینی نهایی:** نتیجهٔ تاریخی PASS، همان outcome کد اجراشده است و تغییر نمی‌کند؛ دو ادعای قوی‌تر از شواهد جدا می‌شوند. ordinary identity در cleanup فقط **پیش از Remove** بررسی شده؛ post-Remove identity **NOT VERIFIED** است. همچنین delta قبل/بعد Add، provenance قطعی در برابر writer هم‌زمان همان حساب نیست؛ single-writer/account exclusivity کنترل‌شده یا correlation پاسخ واقعی Add با خط ایجادشده در شواهد ثبت‌شده احراز نشده است. هر mutation آینده به یکی از این دو prerequisite نیاز دارد؛ از این گزارش مجوز یا روش lock/API تازه استنتاج نمی‌شود.

## نتایج واقعی، نسخه و شمارش

Cypress موجود **16.2.1** استفاده شد؛ dependency نصب/upgrade نشد. اجراهای Chrome **157.0.8103.78** و اجرای Firefox **160.0**، interactive و `isHeadless:false` بودند. برای هر چهار result completed، application-opened، spec-loaded، tests-completed و source-check unchanged جدا ثبت شده‌اند. completed بودن runner، موفق‌بودن journey یا اجراشدن همهٔ checkpointها نیست.

| تلاش | وضعیت | PASS | FAIL | Mocha pending | skipped | not-run | cleanup |
|---|---|---:|---:|---:|---:|---:|---|
| `chrome-form-ready-01` | launch قبلی؛ spec بارگذاری و تست اجرا نشد | ۰ | ۰ | ۰ | ۰ | ۱ | نیاز نبود؛ در شمار completed E2E نیست |
| `chrome-form-final-01` | completed؛ native tooShort شکست خورد | ۰ | ۱ | ۰ | ۰ | ۰ | snapshot baseline و نبود draft تطبیق داشت؛ identity بعد Remove بررسی نشد |
| `chrome-form-native-01` | completed؛ طول واقعی۱۱۸ و سپس teardown DOM failure | ۰ | ۱ | ۰ | ۰ | ۰ | hook اولیه failed؛ recovery عادیِ جدا موفق، اصل تست FAIL باقی ماند |
| `chrome-form-coverage-01` | completed؛ نسخهٔ نهایی | ۱ | ۰ | ۰ | ۰ | ۰ | Remove خط منتسب‌شده، snapshot baseline و نبود draft تأیید شدند؛ identity بعد Remove بررسی نشد |
| `firefox-form-coverage-01` | **completed / FAIL؛ interruption در setup ورود، پیش از verify** | ۰ | ۱ | ۰ | ۰ | ۰ | `not-needed`؛ هیچ owned-cart Add رخ نداد |

Firefox **160.0** اکنون از result همین اجرا تأیید شده است؛ یک FAIL testcase دارد و صفر Mocha pending/skipped/not-run. بااین‌حال assertionهای فرم در Firefox **اجرا نشدند**؛ fail شدن setup ورود به‌معنی fail شدن validation فرم یا PASS آن نیست.

تعداد، journey است: `CF-F01` یک test در هر مرورگر و `CF-CP01…12` checkpointهای همان test هستند. تا این checkpoint **چهار journey completed: یک PASS و سه FAIL**؛ سهم Chrome یک PASS و دو FAIL و سهم Firefox یک FAIL است. دو diagnostics در یک تلاش، دو testcase failed نیستند. probeها و recovery دستی نیز به تعداد PASSهای E2E اضافه نمی‌شوند.

برای تطبیق با batch قبلی: `ACO-H01` سه attempt completed با دو PASS و یک FAIL داشت؛ جمع `ACO-H01 + CF-F01` تا این checkpoint **هفت attempt، سه PASS و چهار FAIL** است. این عدد تعداد attemptهای تکراری دو case اصلی است، نه هفت case مستقل و نه هفت journey کامل سفارش/پرداخت.

setup ورود در این journeyها **MANUAL-ASSISTED** است. در سه Chrome، کاربر شماره/OTP را مستقیم وارد کرد و session/me پس از ورود با anchor مستقلِ شمارهٔ submitشده و role `customer` تطبیق داده شدند؛ account-created در برابر existing-login تفکیک نشد. در Firefox فقط start مجاز ثبت شد، verify صفر و ورود موفق تکمیل نشد؛ هیچ post-login identity/cart/form PASS برای آن نداریم. حساب retained ماند؛ شماره/OTP، account/cart id و session body عمومی ثبت نشدند.

## source و شواهد نتایج

| تلاش | Source ID | نتیجه و مدرک |
|---|---|---|
| Chrome نخست | `e2686ae424e3b0415660ece3b100df9e7f88a86ba926eb234d6ef8c95160de95` | [result نخست](../Evidence/Authenticated-Checkout-2026-11-17/chrome-form-final-01/driver-2320-1794943679755/authenticated-checkout-results.json)، [تحلیل failure](../Evidence/Authenticated-Checkout-2026-11-17/chrome-form-final-01/failure-analysis.json) |
| Chrome native | `c903ee699ee4a534b564de6ffd744dedb51402468542661fd0a6b11a99e4ac2f` | [result native](../Evidence/Authenticated-Checkout-2026-11-17/chrome-form-native-01/driver-25000-1794944224435/authenticated-checkout-results.json)، [تحلیل و recovery](../Evidence/Authenticated-Checkout-2026-11-17/chrome-form-native-01/failure-analysis.json) |
| Chrome نهایی | `1070a0acdeb9adacea1059d9b95ffafcddc46cb5799b343fd27ea3ae0a793e0d` | [result نهایی](../Evidence/Authenticated-Checkout-2026-11-17/chrome-form-coverage-01/driver-25832-1794946348208/authenticated-checkout-results.json)، [progress نهایی](../Evidence/Authenticated-Checkout-2026-11-17/chrome-form-coverage-01/driver-25832-1794946348208/progress.json) |
| Firefox نهاییِ فعلاً اجراشده | `1070a0acdeb9adacea1059d9b95ffafcddc46cb5799b343fd27ea3ae0a793e0d` | [result Firefox: یک FAIL](../Evidence/Authenticated-Checkout-2026-11-17/firefox-form-coverage-01/driver-27520-1794946596916/authenticated-checkout-results.json)، [progress setup](../Evidence/Authenticated-Checkout-2026-11-17/firefox-form-coverage-01/driver-27520-1794946596916/progress.json)، [manifest](../Evidence/Authenticated-Checkout-2026-11-17/firefox-form-coverage-01/source-manifest.json) |

snapshot دقیق spec دو failure نگه داشته شد و SHA-256 هرکدام با entry همان spec در manifest اجرای خودش تطبیق داشت:

- [spec اجراشدهٔ e268](../Evidence/Authenticated-Checkout-2026-11-17/chrome-form-final-01/executed-spec.js.txt): `4b8096f6082eeba8f1e9852db60ab7b3d9b62d66bacbbf8a6e67d73205d7ed97`.
- [spec اجراشدهٔ c903](../Evidence/Authenticated-Checkout-2026-11-17/chrome-form-native-01/executed-spec.js.txt): `66af5099f2b94d92224111ef73f32bbb58f0fb4e0b43ec97b9c9f3062b2b67df`.

Source ID hash مجموعهٔ spec/support/fixture/config/package/launcher است؛ SHA بالا hash یک فایل spec است و این دو نوع hash یکی نیستند. Chrome نهایی و Firefox ثبت‌شده روی همان source در ۲۹ فایل تا پایان unchanged بودند؛ resultها ثابت می‌کنند هر دو runner اجرا شدند، اما Firefox در setup متوقف شد و همان source الزاماً به coverage یکسان نرسید.

## پوشش اجراشده در Chrome نهایی

| checkpoint | آنچه واقعاً بررسی شد | حد ادعا |
|---|---|---|
| CF-CP01 | guest واقعی، ورود دستی، ordinary session/me، قصد مستقل محصول/package/quantity، Add عادی، id جدید matching در delta، سبد پُر و فرم واقعی | identity از anchor مستقل است؛ account dashboard دوباره اجرا نشد. تمام DOM اقلام قبلی assert نمی‌شود؛ delta، provenance در برابر writer هم‌زمان را ثابت نمی‌کند |
| CF-CP02 | exact required/type/min/max/pattern؛ چهار field ابتدا خالی و valueMissing/native invalid؛ feedback native موجود | required native؛ نه custom-submit یا server validation |
| CF-CP03 | name کوتاه۱→tooShort، طول۲→valid، correction؛ rapid۱۲۱کلید→دقیقاً۱۲۰ در پایان journey | subset کوتاه paced و rapid boundary جدا بررسی شدند؛ PASS اخیر، مشاهدهٔ قبلی۱۱۸ را fixed نمی‌کند |
| CF-CP04 | mobile prefix نادرست در طول۱۱، prefix09 با طول۱۰، correction به marker نحوی۱۱، سقف۱۱ | مقدار synthetic فقط browser؛ نه شمارهٔ قابل تماس، OTP یا server acceptance |
| CF-CP05 | postal۹رقمی invalid،۱۰رقمی valid، تلاش۱۱رقمی محدود به۱۰ و correction | کد synthetic؛ deliverability یا اعتبار واقعی نشانی نیست |
| CF-CP06 | address طول۹→tooShort،۱۰→valid، rapid۳۰۱کلید→دقیقاً۳۰۰؛ clearing؛ mobile در این مرحله خالی | نشانی کامل، shipping یا persistence اجرا نشد |
| CF-CP07 | اثر فعلی filter بر ارقام فارسی/عربی در mobile/postal و اصلاح با ASCII | implementation baseline حذف non-ASCII؛ policy مطلوب localization تصویب نشده است |
| CF-CP08 | دو province با code متمایز از GET واقعی locations، city initially disabled، گزینه‌های مرتبط و resetcity پس از تغییر province، انتخاب شهر دوم | consistency با دادهٔ جاری API؛ مرجع مستقل جغرافیایی نیست |
| CF-CP09 | Tab واقعی با focus حاصل و Enter native فقط روی type=button برای بستن listbox | Enter در field یا submit انجام نشد؛ accessibility کامل نیست |
| CF-CP10 | viewport390×844، fieldهای داخل عرض، edit واقعی نام و toggle city list در narrow؛ بازگشت۱۳۶۶×۹۰۰ | emulation و کنترل‌های مشخص؛ physical-device/native-keyboard coverage نیست |
| CF-CP11 | هر هشت مقدار draft synthetic در حافظه با intent و locations انتخاب‌شده correlate شد؛ active order absent | local sessionStorage است؛ customer/address record ذخیره نشده و retention عمومی آزموده نشده است |
| CF-CP12 | ordinary identity **قبل** cleanup/Remove؛ normal Remove id ثبت‌شده؛ تطبیق snapshot baseline و absence هر دو کلید draft؛ blocked mutations صفر | **post-Remove identity NOT VERIFIED**؛ تطبیق cart ناشناسِ خالی با baseline خالی می‌تواند false pass دهد. id از delta آمده و provenance هم‌زمان قطعی نیست؛ شکست‌های تاریخی تغییر نکردند |

در progress نهایی Chrome، **۷۶ check ثبت‌شده همگی true** و cleanup=`restored` بود. [دو observation rapid](../Evidence/Authenticated-Checkout-2026-11-17/chrome-form-coverage-01/boundary-observations.json) جدا ثبت شدند: name۱۲۱→۱۲۰ و address۳۰۱→۳۰۰، هر دو با فقط کاراکتر synthetic، focus درست و `exact:true`. اینها دو test اضافه نیستند.

`cleanup:restored` نام status در artifact است؛ با وجود همهٔ checkهای true، **restoration در همان ordinary account پس از Remove** از کد ثبت‌شده اثبات نمی‌شود. source در آغاز cleanup، `session()` دارد و بعد Remove فقط cart/draft را بررسی می‌کند. اگر session به guest افت کند و baseline خالی باشد، equality خالی می‌تواند پاس شود. این یک gap verification است؛ logout یا افت session در این اجرا مشاهده/تأیید نشده است.

محدودیت provenance نیز مستقل است: `addAttempted` قبل از Addِ واقعاً permitشده فعال می‌شود و fallback `registerFrom` ممکن است یک خط matching از writer هم‌زمان همان حساب را claim کند. وجود product غایب، id جدید و guard دقیق، منشأ request را در آن وضعیت قطعی نمی‌کنند. **هیچ concurrency یا حذف قلم نامتعلق تأیید نشده**؛ evidence فقط این احتمال false attribution را رد نمی‌کند. برای mutation بعدی، حساب/بازهٔ single-writer کنترل‌شده یا Add-response correlation واقعی لازم است. H01 از همین الگوی source استفاده کرده است؛ گزارش تاریخی آن دست‌نخورده می‌ماند و استناد فعلی با این محدودیت خوانده می‌شود.

## failureها، اصلاح ابزار و investigation باز

### Firefox: interruption ورود پیش از verify

در Firefox160.0، ابتدا guest و نبود draft بررسی شدند. progress سپس یک `otpStartCount` مجاز و پاسخ start را ثبت کرد و به `awaiting-otp` رسید؛ در پایان `otpStartCount:1`، `otpVerifyCount:0`، `blockedMutations:1` و `manualVerificationReturnedSuccess:false` بود. runner یک FAIL ثبت کرد، cleanup=`not-needed` بود و هیچ owned Add، populated checkout یا assertion فرم اجرا نشد.

کاربر سپس صریحاً گزارش داد: **«پیامک نمی‌رسد و روی ارسال مجدد زده‌ام»** و **«NS ارور داد اصلا».** عدم دریافت SMS، گزارش خود کاربر است؛ نقص provider یا backend به‌طور مستقل ثابت نشده است. [تشخیص خواندنی سانیتایزشده](../Evidence/Authenticated-Checkout-2026-11-17/firefox-form-coverage-01/login-interruption-diagnostics.json)، یک پاسخ start با HTTP200، **۱۴ رکورد OTP-start در حالت Errored**، صفر verify و شش input OTP را ثبت کرد. HTTP200 یا وجود شش input، تحویل SMS یا ورود موفق را ثابت نمی‌کند. این۱۴ رکورد ممکن است شامل retry مرورگر باشند؛ تعداد SMS یا کلیک انسانی نیستند.

resend کاربر با شاخهٔ شناخته‌شدهٔ guard یعنی `AUTH_START_REQUIRES_SINGLE_MANUAL_PHONE_MATCH` رد شد؛ guard فعلی فقط یک start را اجازه می‌دهد. مسیر deny از `req.destroy()` استفاده می‌کند و قطع عمدی چنین requestی می‌تواند در Firefox به خطای شبکهٔ `NS_*` دیده شود؛ این توضیح علت ممکن برای نمایش شبکه است، نه اثبات نام دقیق آن. artifact هیچ کد دقیق network error ضبط نکرده است؛ نام دقیق NS ساخته نمی‌شود. عدم دریافت SMS مسئلهٔ مستقلِ حل‌نشده است و صرف نمایش NS به defect provider/application تبدیل نمی‌شود.

این outcome **manual authentication setup interruption** است؛ defect قطعی محصول، provider، validation فرم یا پشتیبانی عمومی Firefox از آن تأیید نمی‌شود. guard باز نشده، attempt موفق ساختگی ارائه نشده و rerun/PASS جایگزین ثبت نشده است. پیش‌نیاز مشخص ادامه، **دریافت عملی OTP از کانال مجاز برای همان هویت** و تکمیل verify واقعی است؛ مجوز generic شماره/OTP یا نگه‌داشتن حساب دوباره مطالبه نمی‌شود. هیچ resend/retry یا rerun خودکار از این گزارش مجاز یا اجرا نمی‌شود.

### نخستین failure: native tooShort

تلاش e268 در `/checkout`، پس از احراز هویت/سبد پُر، metadata و empty-required، روی `native_name_tooShort` شکست خورد. helper اولیه مقدار exact را پیش از flag جدا assert نمی‌کرد؛ checkpointهای بعدی اجرا نشدند. cleanup عادی snapshot baseline و absence draft را تطبیق داد و forbidden-write attempt صفر بود؛ assertion هویت بعد Remove نداشت.

[probe native مستقل](../Evidence/Authenticated-Checkout-2026-11-17/native-input-probe/results.json) روی `about:blank` نشان داد DOM assignment همراه synthetic input در Chrome می‌تواند برای طول۱، tooShort=false بدهد، درحالی‌که keyboard واقعی برای همان native constraint، tooShort=true دارد. [بررسی source نصب‌شدهٔ Cypress](../Evidence/Authenticated-Checkout-2026-11-17/native-input-probe/source-diagnostics.json) نیز setter/simulated default در `.type()` را نشان داد. این شواهد از **عدم تطابق روش action تست با native minLength** پشتیبانی می‌کنند؛ defect برنامه از اولین failure تأیید نشد.

اصلاح، استفاده از native key پشتیبانی‌شده برای name/address و assertion مقدار مستقل بود؛ oracle tooShort حفظ شد. در تلاش native بعدی، همین tooShort پاس شد. probe application E2E نیست، هیچ company session نخواند و در تعداد تست‌ها نیامد.

### CF-INV01: طول۱۱۸ به‌جای۱۲۰ — UNRESOLVED

در source c903، action boundary نام باید از۱۲۱ کاراکتر native به۱۲۰ برسد؛ [metadata واقعی failure](../Evidence/Authenticated-Checkout-2026-11-17/chrome-form-native-01/input-failure-metadata.json) طول۱۱۸، فقط X، minLength۲ و maxLength۱۲۰ را ثبت کرد. انتظار۱۲۰ تغییر نکرد. later form checkpoints در این تلاش کامل نشدند.

[probe rapid مستقل](../Evidence/Authenticated-Checkout-2026-11-17/native-input-probe/rapid-results.json)، پنج trial برای هر یک از دو روش native، در مجموع **ده observation** روی صفحهٔ خالی داشت؛ همه۱۲۱→۱۲۰، focus و eventهای trusted صحیح بودند. این نتیجه علت۱۱۸ در برنامه/Cypress context را اثبات نمی‌کند. root cause میان application، automation یا timing هنوز مشخص نیست؛ **CF-INV01 نه confirmed application defect است و نه fixed**.

برای ادامهٔ مستقل coverage، inputهای کوتاه name/address با مشاهدهٔ prefix واقعی بین keyها اجرا شدند؛ این یک subset paced است و ادعای rapid-input correctness عمومی ندارد. actionهای rapid۱۲۱/۳۰۱ و oracle exact۱۲۰/۳۰۰ حفظ و به پایان منتقل شدند. هر دو observation قبل از assertion نهایی جمع می‌شوند و gate اجباری `length===2 && every(exact)` دارند؛ observation غلط، پس از clearing نیز باقی می‌ماند و testcase را FAIL می‌کند. هیچ failure catch یا نتیجهٔ غلط پذیرفته نشد. PASS نهایی فقط همان دو observation اخیر را ثابت می‌کند؛ investigation قبلی را نمی‌بندد.

### teardown failure و recovery جدا

در تلاش c903، بعد از input failure، hook cart-item را در پنجرهٔ پیش‌فرض mount پیدا نکرد و **پیش از Remove** شکست خورد؛ removeCount صفر بود. سپس owned line واقعاً نمایان شد. این limitation هماهنگ‌سازی hydration بود؛ شکست تست اصلی حفظ شد.

[recovery عادیِ جدا](../Evidence/Authenticated-Checkout-2026-11-17/chrome-form-native-01/cleanup-recovery.json) Remove نمایان همان id ثبت‌شده را اجرا کرد؛ artifact، identity، نبود id، حفظ unaffected intent، نبود draft/order و شمار Remove را true ثبت می‌کند. این booleanهای recovery، gapِ post-Remove identity در source تست را برطرف نمی‌کنند. recovery، testcase دوم یا PASS جایگزین تست failed نیست.

در کد بعدی، cleanup پیش از UI action منتظر GET واقعی cart می‌ماند و پاسخ باید همان id ثبت‌شده را داشته باشد؛ سپس Remove عادی، equality snapshot و absence draft بررسی می‌شود. این اصلاحِ prerequisite واقعی DOM است؛ force، حذف مستقیم API/storage یا افزایش کور timeout اضافه نشد. checkهای cleanup نهایی Chrome پاس شدند؛ gapهای post-Remove identity و provenance هم‌زمان با این اصلاح حل نشدند.

## فرم مشاهده‌شده، write boundary و privacy

metadata واقعی: name text required۲…۱۲۰؛ mobile **text** required و pattern=`09[0-9]{9}` با max11؛ postal text required و pattern=`[0-9]{10}` با max10؛ address textarea required۱۰…۳۰۰؛ دو custom province/city control با native select پنهان. دادهٔ فعلی از moduleهای عمومی GETشده و DOM واقعی جدا ثبت شد؛ این baseline approval قواعد business/server نیست.

هر edit می‌تواند `ezpost_checkout_address` محلی بسازد. complete address می‌تواند بعد debounce، `POST /api/v1/shipping/quote` خودکار بفرستد؛ بنابراین address در سایر مراحل خالی و حین تست address، mobile خالی نگه داشته شد. guard shipping POST را مجاز نمی‌کند. shipping button کلیک نشد.

submit فرم می‌تواند `POST /api/v1/checkout` و مسیر order را شروع کند؛ **هیچ submit/Next یا Enter در text field اجرا نشد**. هیچ profile/customer/address save، order یا payment درخواست نشد. `ezpost_checkout_address` و `ezpost_active_order_id` قبل Add absent بودند؛ draft synthetic این flow با normal Remove پاک و absence واقعی assert شد. snapshot اقلام قبلی تغییر ثبت‌شده‌ای نداشت؛ این مشاهده، post-Remove identity یا نبود writer هم‌زمان را اثبات نمی‌کند. حذف حساب یا حذف قلم نامتعلق تأیید نشده است.

public evidence فقط metadata، طول/boolean، outcome، نسخه و hash دارد. شماره/OTP واقعی، cookie/token، session/cart شناسه‌های خصوصی، raw network/DOM/draft و screenshot شخصی صادر نشدند؛ runtime/profileهای خصوصی از انتشار مستثنا هستند. raw errors توسط observer allowlist سانیتایز شدند؛ failureهای واقعی حذف نشدند.

## بازتولید، بررسی ایستا و پیش‌نیاز بعدی

- [قرارداد CF-F01](../Test-Cases/EZPOST_QA_CUSTOMER_FORM_TEST_CASES.md)، [بازبینی authoring](EZPOST_QA_CUSTOMER_FORM_AUTHORING_REVIEW_2026-11-17.md).
- [گزارش handoff پیشین ACO-H01](EZPOST_QA_AUTHENTICATED_CHECKOUT_EXECUTION_2026-11-17.md)، [سابقهٔ authentication واقعی](EZPOST_QA_AUTHENTICATED_SESSION_EXECUTION_2026-11-17.md)؛ نتایجشان مستقل و بدون تغییر است.
- [بررسی ایستای فرم](../Evidence/Authenticated-Checkout-2026-11-17/customer-form-static-checks.json): inherited۱۴ syntax/۱۵ فایل تاریخی محافظت‌شده، دو syntax اضافی، یک journey مستقل، صفر skip، چهار handoff file بدون تغییر و نبود direct storage writes/form submit. نتیجهٔ ایستا به PASS مرورگر تبدیل نمی‌شود.

```powershell
node scripts/check-customer-form-static.cjs
node scripts/open-authenticated-checkout.cjs chrome <fresh-label> form
node scripts/open-authenticated-checkout.cjs firefox <fresh-label> form
```

فرمان launch، Cypress نصب‌شده را در `open --e2e` باز می‌کند؛ spec واقعی `cypress/e2e/checkout/customer-form.cy.js` در runner انتخاب و شماره/OTP را کاربر مستقیم وارد می‌کند. این rerun، SMS مجاز و owned-cart write واقعی دارد؛ dry-run نیست. app-opened/spec-loaded/test-completed باید دوباره مستقل ثبت شوند و source ثابت در دو مرورگر حفظ شود.

موارد باقی‌مانده دقیق‌اند: دریافت عملی OTP در کانال مجاز و تکمیل ورود واقعی Firefox؛ **پیش از mutation آینده، single-writer/account exclusivity کنترل‌شده یا Add-response-to-line correlation واقعی**؛ assertion مستقل ordinary identity بعد Remove؛ investigation علت۱۱۸؛ custom-submit validation بدون عبور از order boundary؛ سیاست مطلوب digits و retention؛ قواعد مستقل geography/delivery و قیمت/payable؛ دادهٔ test-owned و restore پشتیبانی‌شده برای هر customer/address persistence؛ قرارداد create-order، idempotency/cleanup و مجوز آن؛ و sandbox/provider/outcomes/reconciliation مجاز برای payment. هیچ‌یک از shipping، save، order یا payment با PASS Chrome حل‌شده نیستند. P10 و تمام failureهای تاریخی باز و محفوظ‌اند؛ برای رفع gapهای review هیچ source، rerun یا mutation تازه اجرا نشده است.
