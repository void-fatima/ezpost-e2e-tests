# طراحی استعلام ارسال و جمع checkout پیش از ثبت سفارش — EZPost

تاریخ: ۱۸ نوامبر ۲۰۲۶، America/Los_Angeles. مبنا: `69a0baf4514a6be4627bddbfbc651a46e7b2bfdf`. این سند شش case تازه با IDهای `SQ-01…SQ-06` را به خانوادهٔ `J01/CHECK-01` اضافه می‌کند؛ ID، traceability و outcome هیچ case قبلی عوض نمی‌شود. `ACO-H01` و `CF-F01` در آخرین [اجرای هدفمند](../Reports/EZPOST_QA_CHECKOUT_TARGETED_RERUN_EXECUTION_2026-11-18.md) هرکدام یک PASS دارند؛ این PASSها shipping نیستند. `CF-INV01` و `P10-ORD01/02` بازند؛ ریسک stale در P10 انگیزهٔ SQ-04 است، نه شاهد وجود defect مشابه در shipping.

**وضعیت هر شش case: DESIGNED WITH BLOCKERS / NOT IMPLEMENTED / NOT EXECUTED.** معیارهای پیشنهادی زیر مصوبهٔ قیمت یا سیاست محصول نیستند. مجوز فعلی فقط طراحی، بررسی محلی و انتشار sanitized است؛ هیچ OTP، cart mutation، تکمیل نشانی زنده، shipping quote واقعی یا submit مجاز نیست. طراحی قابل‌مرور، مجوز پیاده‌سازی/اجرا، نتیجهٔ اجرا و defect محصول جدا هستند. blocked به معنی bug نیست.

## منابع و حدود استناد

| کلید | منبع | چیزی که پشتیبانی می‌کند و حد آن |
|---|---|---|
| E1 | [گزیدهٔ module عمومی checkout](../Evidence/Checkout-Regression-2026-11-18/checkout-form-render-contract.json)، دریافت تاریخی `2026-11-18T15:18:36.301Z` | شماره‌های خط در این سند، `lines[].line` ماژول اصلی‌اند، نه شمارهٔ فیزیکی JSON. ۲۱۴ خط گزیده؛ بدنهٔ quote/completeness در ۱۷۴–۲۶۰، ادامهٔ submit در ۲۹۲–۳۱۸ و بخش کامل totals موجود نیست. این شاهد رفتار فعلی نیست |
| E2 | [گزارش H01 تاریخی](../Reports/EZPOST_QA_AUTHENTICATED_CHECKOUT_EXECUTION_2026-11-17.md) و [گزارش فرم تاریخی](../Reports/EZPOST_QA_CUSTOMER_FORM_EXECUTION_2026-11-17.md)، توضیح مرزها و پیامدهای فرم | روایت inspection قبلی: draft محلی، auto-quote با debounce۵۰۰ms و `POST /api/v1/shipping/quote`؛ submit می‌تواند `POST /api/v1/checkout` و مسیر سفارش را آغاز کند. payload/response واقعی shipping یا SLA مصوب نیست |
| E3 | [کیس‌های فرم](EZPOST_QA_CUSTOMER_FORM_TEST_CASES.md) و [spec فعلی](../../cypress/e2e/checkout/customer-form.cy.js) | metadata fieldها، GET تاریخی locations و association UI/API، sentinel ناقص، draft test-owned. native validity معادل shipping readiness، صحت جغرافیا یا deliverability نیست |
| E4 | [کیس handoff](EZPOST_QA_AUTHENTICATED_CHECKOUT_TEST_CASES.md)، [guard](../../cypress/support/authenticated-checkout.js) و [cleanup](../../cypress/support/checkout-owned-cleanup.js) | ordinary identity، ownership و restoration؛ guard فعلی shipping را مجاز نمی‌کند. حذف قلم تست، حذف اثر احتمالی quote/address/order در سرور را ثابت نمی‌کند |
| R1 | [Phase 1](../Planning/EZPOST_QA_PHASE1_REVIEW.md)، J01 و B03/B05/B08 | ریسک مالی و نیاز به oracle مستقل؛ هیچ تعرفه، tax، fee، rounding یا فرمول payable مصوب از آن به دست نمی‌آید |
| U1 | درخواست همین مرحله | شش موضوع زیر باید طراحی شوند و خطای identity، freshness و نمایش تشخیص داده شود؛ پاسخ API، oracle مستقلِ قیمت معرفی نشود. U1 عدد تعرفه یا سیاست UX تأیید نمی‌کند |

## قرارداد مشترک و oracleها

شروع هر case مستقل است: checkout واقعی و نسخه‌دار در محیط isolated یا محیط مجاز آینده؛ cart با product/package/quantity/labels معلوم و baseline مستقل؛ بدون order pending، quote قبلی یا draft ناشناخته. در live آینده، هویت عادی، guest sync معلوم، غیبت محصول fixture پیش از Add، provenance همان قلم و single-writer تازه اجباری‌اند. دادهٔ قبلی کاربر هرگز برای setup حذف/بازنویسی نشود؛ نبود این حالت، prerequisite failure است.

`A1/A2` نشانی synthetic موردتأیید تیم، `C1` ترکیب سبد و `Q1/Q2` پاسخ‌های نسخه‌دارِ متعلق به همان intent هستند؛ این‌ها alias طراحی‌اند، JSON schema یا مقادیر واقعی نیستند. code/label استان و شهر، cart fingerprint و هر شناسهٔ لازم فقط با قرارداد واقعی correlate شوند؛ فیلد request/response تازه اختراع نمی‌شود. پیش از پاسخ، intent مستقل و revision نشانی/سبد در حافظه ثبت شود؛ expected از آخرین UI یا body پاسخ کپی نشود.

سه oracle جدا لازم است:

1. **correlation و freshness:** quote واقعاً از اقدام این case آمده، متعلق به نشانی و cart جاری است و با پاسخ دیرهنگام انتخاب قبلی overwrite نشده است. badge موفق، URL و HTTP200 کافی نیستند؛ E1 می‌تواند quote را از pending order بازیابی کند.
2. **presentation consistency:** هزینهٔ shipping و total نمایان، واحد پول و هویت سبد با پاسخ همبستهٔ همان revision مطابق‌اند. این لایه صحت قیمت را ثابت نمی‌کند؛ UI و API ممکن است مشترکاً غلط باشند.
3. **monetary correctness:** هر component و مبلغ نهایی با مرجع مستقلِ نسخه‌دار و مصوب مقایسه شود: کالا، تعرفه/وزن، service، تخفیف، tax/fee، واحد، ترتیب و rounding. حتی فرمول «subtotal + shipping» بدون تصریح مرجع فرض نمی‌شود. نبود مرجع فقط همین لایه را blocked می‌کند؛ دو لایهٔ اول نیز اکنون blocker فنیِ جدا دارند.

برای اجرا، route/response مربوط و نتیجهٔ UIِ پس از terminal state با هم همگام شوند؛ assertion زودهنگام پیش از completion قدیمی کافی نیست. در کنترل زمان آینده، scheduler واقعیِ همان client و clock پشتیبانی‌شده استفاده شود؛ ۵۰۰ms تاریخی، sleep ثابت یا SLA نمی‌شود. cancel/discard معتبرِ پاسخ قدیمی نباید FAIL بسازد. failure اصلی و teardown با stageهای جدا، فقط metadata و boolean، ثبت شوند؛ نه مقادیر recipient، session، OTP، cart body، private ID یا تصویر authenticated.

## شش قرارداد مورد بررسی

### SQ-01 — quote معتبر و total پیش از submit

- **شروع:** C1 و A1 مجاز، بدون pending/draft؛ schema موفق و مرجع مستقلِ مبلغ آماده. یک مسیر auto و یک مسیر دستی به‌صورت دو subset مستقل زیر همین ID طراحی شوند؛ duplicate-request/dedup policy باید پیش از count assertion معلوم باشد.
- **اقدام/trigger:** در subset خودکار، آخرین ورودی لازمِ predicate واقعی تکمیل شود؛ در subset دستی، دکمهٔ shipping واقعی در وضعیت مجاز فعال شود. mount با draft کامل، variant جداست و با «کلیک دستی انجام شد» اشتباه نمی‌شود؛ setup آن فقط test-owned و با policy مصوب خواهد بود.
- **انتظار پیشنهادی:** request همان intent C1/A1 را داشته باشد؛ loading به نتیجهٔ معتبر همان revision برسد؛ shipping و total با واحد درست و اجزای مشخص نمایش داده شوند. monetary subset فقط با reference مستقل مبلغ دقیق را assert کند. order/payment/save غیرمجاز صفر بماند؛ فرم submit نشود.
- **منبع انتظار:** U1 و R1 برای هدف؛ E1/E2 فقط برای نامزد trigger و UI. مقدارها و نتیجهٔ تجاری از SQ-B03؛ completeness/dedup از SQ-B04.
- **رفتار غلطی که باید رد شود:** quote برای محصول/package/quantity یا مقصد دیگر؛ quote cache/pending به‌جای درخواست جدید؛ success badge بدون نتیجهٔ همبسته؛ مبلغ یا واحد غلط؛ API/UI مشترکاً غلط در monetary subset.
- **blocker/وضعیت:** SQ-B01…09؛ **NOT IMPLEMENTED / NOT EXECUTED**. design هر لایه محفوظ است؛ نبود تعرفه، مجوز جعل پاسخ یا حذف کل case نیست.

### SQ-02 — نشانی ناقص یا نامعتبر

- **شروع:** C1، بدون quote معتبر؛ matrix مستقل برای هر ورودی لازمِ shipping، وابستگی province/city و postal طبق policy. variant دوم از quote قبلی معتبر شروع می‌شود و سپس یک ورودی لازم حذف می‌شود. native required با predicate quote یکی فرض نشود.
- **اقدام/trigger:** یک عضو matrix ناقص/نامعتبر شود؛ تلاش دکمهٔ shipping فقط اگر handler بدون submit بودنش تأیید شد. در variant قبلی، همان field از A1 پاک شود. در این batch هیچ‌کدام روی AUT زنده اجرا نمی‌شود.
- **انتظار پیشنهادی:** برای حالتی که قرارداد آن را unquotable می‌نامد، درخواست جدید معتبر ساخته نشود و UI نشانی ناقص را quotation آماده نشان ندهد. رفتار old quote، hidden/disabled بودن دکمه، validation message و timing دقیق نیازمند SQ-B04 است؛ یکی از این UXها خودسرانه انتخاب نمی‌شود.
- **منبع انتظار:** U1؛ E3 صرفاً native constraints را می‌دهد. proposalِ readiness تجاری باید تیم تأیید کند. شاهد منفیِ «درخواست نیامد» به پایان چرخهٔ زمان‌بندیِ مستند و ثبت شبکهٔ fail-closed نیاز دارد؛ بررسی فوریِ count=۰ کافی نیست.
- **رفتار غلطی که باید رد شود:** نشانی ناقص وارد provider شود؛ province جدید با city قبلی استفاده شود؛ fee قدیمی بی‌علامت برای نشانی ناقص معتبر تلقی شود؛ assertion اصلی با branch شرطی کنار گذاشته شود.
- **blocker/وضعیت:** SQ-B01/02/04/05/06/07/08/09؛ monetary oracle فقط برای subset حفظ/بی‌اعتبارسازی مبلغ قبلی لازم می‌شود. **NOT IMPLEMENTED / NOT EXECUTED**.

### SQ-03 — تغییر مؤثر در هزینه و محاسبهٔ مجدد

- **شروع:** quote معتبر Q1 برای C1/A1؛ A2 تفاوتِ هزینه‌ساز تأییدشده دارد و مرجع مستقل نتیجهٔ هر دو را مشخص می‌کند. برابر یا متفاوت‌بودن دو مبلغ از نام دو شهر حدس زده نشود.
- **اقدام/trigger:** فقط یک ورودی که طبق قرارداد باعث recalculation می‌شود از A1 به A2 تغییر کند. تغییر province ممکن است city را reset کند؛ تکمیل city تازه و ارسال واقعی باید مستقلاً دیده شوند. تغییر quantity/cart variant بعدی است و به مجوز cart change جدا نیاز دارد.
- **انتظار پیشنهادی:** revision تازه و تمام فیلدهای request با A2/C1 منطبق باشند؛ در پایان Q2 معتبر نمایش داده شود و total/componentها با reference A2 سازگار باشند. policy نمایش Q1 هنگام pending، expiry و refresh صریحاً از تیم گرفته شود؛ صرف ثابت‌ماندن fee به‌تنهایی شکست نیست مگر reference تفاوت را ایجاب کند.
- **منبع انتظار:** U1/R1؛ resetcity از E3 یک baseline client است، نه جدول تأثیر قیمت. SQ-B03/04 تعیین‌کنندهٔ مبلغ و trigger هستند.
- **رفتار غلطی که باید رد شود:** request با postal/city قدیمی، محاسبهٔ تازه بدون اثر در total، نمایش shipping Q2 کنار total Q1، تغییر ناخواستهٔ کالا/بسته/quantity یا درخواست order.
- **blocker/وضعیت:** SQ-B01…09؛ **NOT IMPLEMENTED / NOT EXECUTED**.

### SQ-04 — completion خارج از ترتیب و حفظ آخرین intent

- **شروع:** production client isolated، C1 ثابت و دو intent A1/A2 با پاسخ‌های قابل‌تمایز و contract معلوم؛ امکان تغییر طبیعیِ supported هنگام pending باید وجود داشته باشد. ابزار نباید با forced click یا injected state کنترل بسته را دور بزند.
- **اقدام/trigger:** پاسخ Q1ِ شروع‌شده با A1 نگه داشته شود؛ اقدام واقعی تغییر به A2 request جدید تولید کند؛ Q2 کامل و UI آن assert شود؛ سپس lifecycle Q1 به حالت terminal واقعی برسد. variant ترتیب معکوس در همین ID قابل‌تعریف است.
- **انتظار پیشنهادی:** پس از تمام‌شدن lifecycle هر دو، UI و fee/total به A2/C1 مربوط بمانند. اگر Q1 با cancellation/discard معتبر اصلاً مصرف نشد، همین مسیر قابل‌قبول است؛ دریافت اجباری body منسوخ شرط PASS نیست. اگر Q1 مصرف شد، بعد از اثر احتمالی آن مجدداً تمام مقادیر Q2 assert شوند.
- **منبع انتظار:** U1؛ انتظار freshness پیشنهادی است. رفتار شناخته‌شدهٔ P10 محصول، schema یا defect shipping را ثابت نمی‌کند. اگر تغییر حین pending طبق قرارداد مجاز نیست، آن variant مشخصاً unsupported ثبت شود؛ به‌جای اجرای اصلی PASS نشود.
- **رفتار غلطی که باید رد شود:** UI ابتدا درست و بعد با Q1 overwrite شود؛ فقط یک فیلد تازه بماند و total قدیمی شود؛ Q2 هرگز ایجاد نشود ولی تست سبز شود؛ cancellation درست به‌اشتباه FAIL شود؛ هیچ assertion بعد از release/discard انجام نشود.
- **blocker/وضعیت:** SQ-B01/02/04/05/09؛ برای monetary correctness SQ-B03 نیز لازم است. این variant اصولاً controlled است؛ live service برای race تحریک نمی‌شود. **NOT IMPLEMENTED / NOT EXECUTED**.

### SQ-05 — شکست quote و recovery مشخص

- **شروع:** checkout isolated و C1/A1؛ schema خطا و راه بازیابی مصوب. transport failure و پاسخ خطای server/provider دو subset مستقل‌اند؛ fixture error/status حدس زده نشود.
- **اقدام/trigger:** درخواست واقعی client در isolation با خطای مشخص پاسخ داده شود؛ همان خطا observable شود؛ سپس فقط اقدام بازیابیِ انتخاب‌شده از قرارداد اجرا و پاسخ موفق همبسته آزاد شود. مسیر «retry همان نشانی» و «اصلاح نشانی» قابل‌جایگزینیِ شرطی نیستند؛ تیم باید هر variant مجاز را مشخص کند.
- **انتظار پیشنهادی:** failure به quote موفق/fee صفر تعبیر نشود؛ بازخورد و readiness مطابق policy خطا باشند؛ اقدام recovery واقعاً درخواست تازهٔ intent جاریِ همان variant را بسازد: A1 برای retry همان نشانی، یا A2 مصوب برای variant اصلاح نشانی که از پیش انتخاب شده است. state و total از error به Q2 صحیحِ همان variant برسند. مبلغ و شرایط نگه‌داشتن quote قبلی، timeout و تعداد retry نامشخص‌اند؛ deadline/loop اختراع نشود.
- **منبع انتظار:** U1؛ E1 فقط badge state را نشان می‌دهد و error/retry contract ندارد. خطا و recovery از SQ-B01/04 و انتظار مبلغ از SQ-B03 می‌آیند.
- **رفتار غلطی که باید رد شود:** silent failure، loading دائمی در خلاف قرارداد، موفقیت ظاهری بدون request تازه، retry خودکار نامحدود، fee قدیمی بی‌علامت، total غلط پس از بازیابی یا write غیرمجاز.
- **blocker/وضعیت:** SQ-B01/02/04/05/09 و SQ-B03 برای مبلغ؛ fault injection فقط local/browser isolated، نه شبکهٔ شرکت. **NOT IMPLEMENTED / NOT EXECUTED**.

### SQ-06 — اختلاف quote، اجزای total و مبلغ نمایان

- **شروع:** C1/A1، پاسخ همبستهٔ نسخه‌دار و DOM/formatter واقعیِ کامل. reference مستقل برای subset صحت مالی و نمایش منطبق با واحد/locale مشخص باشد؛ اعداد از UI استخراج و دوباره expected اعلام نشوند.
- **اقدام/trigger:** quote معتبر از مسیر SQ-01 ایجاد شود و بعد از settle شدن تمام renderهای مرتبط، shipping، subtotal/اجزای واقعاً موجود و total با پاسخ همبسته و reference مستقل جدا مقایسه شوند. وجود یا نبود tax/discount row مطابق قرارداد، نه فرض عمومی فروشگاه، بررسی شود.
- **انتظار پیشنهادی:** mismatch هر component یا currency با assertion مشخص FAIL شود؛ نتیجهٔ pricing و نتیجهٔ consistency جدا ثبت شوند. مقدار zero فقط با fixture مجازِ free shipping معتبر است؛ فقدان quote معادل zero نیست. برای challenge ابزار، observationِ دارای shipping/total/identity غلط باید در isolation توسط oracle رد شود؛ این challenge، رفتار UI محصول یا defect آن را ثابت نمی‌کند.
- **منبع انتظار:** U1/R1 و قرارداد مستقل SQ-B03/09. فیلدهای `shipping_irr/total_irr` در state بازیابی‌شدهٔ E1، schema shipping response یا formula تأییدشده نیستند.
- **رفتار غلطی که باید رد شود:** shipping درست و total غلط، تومان/ریال اشتباه، جمع دو UI با دادهٔ مشترکِ غلط، rounding نادرست، پاسخ متعلق به cart دیگر، quote/API و UI همگی غلط ولی assertion consistency سبز. مورد آخر فقط با oracle مستقل رد می‌شود.
- **blocker/وضعیت:** SQ-B01/02/03/05/09؛ برای live، SQ-B06/07/08 نیز اجباری‌اند. **NOT IMPLEMENTED / NOT EXECUTED**.

## blocker register و تفکیک scope

فهرست blockerهای هر case، اجتماع نیازهای subsetهای آن است؛ همهٔ کلیدها برای تک‌تک subsetها شرط نیستند. **SQ-B02 فقط اجرای isolated/offline را متوقف می‌کند و شرط اجرای live نیست.** SQ-B06/07/08 مخصوص محیط و مجوز و setup اجرای زنده‌اند؛ SQ-B03 برای ادعای صحت مستقل قیمت لازم است، نه مقایسهٔ صرفِ presentation. SQ-B04 نیز فقط policy مربوط به همان variant را می‌خواهد؛ همهٔ سیاست‌های retry/error شرط subset معتبر SQ-01 نیستند. رفع یک مانع، سایر موارد را خودکار حل‌شده نمی‌کند.

| کلید | ورودی دقیقِ مفقود | مسئول/نوع حل | اثری که تا آن زمان blocked می‌ماند |
|---|---|---|---|
| SQ-B01 | متن کامل client/service shipping و request/response/error schema واقعی، correlation و cancellation؛ excerpt ناقص است | تیم فنی، artifact نسخه‌دار/قرارداد sanitized؛ بدون درخواست واقعی در این batch | هر شش browser case؛ endpoint نام‌برده در گزارش برای ساخت body کافی نیست |
| SQ-B02 | build یا graph کامل production checkout همراه runtime/assets قابل‌اجرای offline؛ setup فعلی فقط E2E متصل به سرور است | تیم فنی/مالک QA، تأمین artifact و setup جدا بدون upstream | controlled shipping واقعی؛ صفحهٔ mock دست‌ساز جای SUT نیست |
| SQ-B03 | مرجع مستقل مصوبِ tariff/weight/dimensions/service/units/tax/fee/discount/rounding و اجزای payable با expectedهای A1/A2/C1 | مالک محصول/مالی و مرجع provider مصوب؛ نسخه و تاریخ اعتبار | صحت مالی SQ-01/03/06 و subsetهای مالی بقیه؛ consistency می‌تواند بعد از B01/B02/B09 مستقل پیاده شود |
| SQ-B04 | predicate readiness، auto/manual/mount/debounce/dedup، invalidation/expiry، نمایش pending، خطا و اقدام retry دقیق | مالک محصول با قرارداد فنی؛ source رفتار فعلی را به‌تنهایی تصویب نمی‌کند | outcome و trigger دقیق SQ-01…05؛ نرخ/تعداد request یا UX حدس زده نشود |
| SQ-B05 | دادهٔ synthetic مجاز برای provider: دو نشانی/منطقه، code/label شهر/استان و postal معتبرِ sandbox؛ گیرنده/موبایل غیرشخصی، cart/weight ثابت | تیم محیط/QA؛ مقادیر خصوصی در Git یا گفتگو نیاید | fixtureهای سالم/ناقص/تغییر هزینه و responseهای معتبر |
| SQ-B06 | محیط مجاز، هزینه/side effect quote در backend/provider، persistence احتمالی customer/address و restore پشتیبانی‌شده | تیم EZPost/محیط؛ صرف نام quote یا POST read-only بودن را ثابت نمی‌کند | هر live shipping؛ cleanup قلم تست جای restore سرویس نیست |
| SQ-B07 | مجوز صریح آینده برای تکمیل نشانی و تمام triggerهای auto از edit/mount و دستی، سقف request روشن، scope دقیق guard | کاربر/مالک محیط بعد از روشن‌شدن B01/B06؛ مجوز این batch شاملشان نیست | ارسال quote واقعی؛ submit/save/order/payment همچنان ممنوع |
| SQ-B08 | fresh single-writer، ورود دستی همان ordinary identity، pre-Add baseline/draft/order، ownership و post-Remove identity/cart/draft؛ پشتیبانی OTP در صورت محدودیت | operator اجرای آینده؛ شروط در زمان run بررسی شوند | setup/cleanup هر live case؛ PASSهای گذشته قفل حساب آینده نیستند |
| SQ-B09 | DOM/formatter و منبع تمام اجزای totals، واحد display، binding نتیجه به revision و pending/error state | تیم فنی؛ بخش کامل render بعد خط۵۰۰ در excerpt نیست | selector و assertion نهاییِ shipping/total؛ UI یا formula اختراع نشود |

برای implementation آینده، subsetهای correlation/presentation با B01/B02/B09 و fixtureهای B05 قابل‌تفکیک از قیمت مصوب B03 هستند؛ هیچ‌کدام اکنون IMPLEMENTED یا PASS نیست. تغییر policy یا نبود fixture فقط subset مربوط را متوقف می‌کند؛ باقی پوشش به‌صورت silent حذف نمی‌شود. spec پیشنهادی آینده `cypress/e2e/checkout/shipping-quote.cy.js` است؛ این فایل فعلاً ایجاد نشده و existing configs/guards تغییر نکرده‌اند.

## اجرای این batch و شرط نخستین اجرای live

**Live shipping=۰؛ controlled-response shipping=۰؛ caseهای shipping اجراشده=۰.** به‌علت B01/B02/B09، setup مناسب اجرای isolated علیه production client نداریم؛ controlled ordering موجود صفحه/asset را از origin زنده می‌گیرد. بررسی‌های حافظه/VM موجود که در [گزارش آماده‌سازی](../Reports/EZPOST_QA_SHIPPING_QUOTE_PREPARATION_2026-11-18.md) ثبت می‌شوند، shipping یا browser E2E نیستند. empty spec، blanket skip، پاسخ حدسی یا implementation کپی‌شدهٔ فرضی ساخته نشده است.

برای نخستین run live، علاوه بر schema/ترکیب guard معلوم، B05/B06/B07/B08 باید واقعاً حل شوند: environment و provider sandbox یا side effect/restore صریح، cart test-owned با وزن/بسته/تعداد معلوم، نشانی synthetic موردتأیید و قیمت مستقل نسخه‌دار، اجازهٔ **تکمیل نشانی حتی بدون کلیک** و بودجهٔ request، ordinary login دستی و exclusivity تازه. برنامه از pending order/draft قبلی quote نگیرد؛ دادهٔ موجود overwrite نشود. همهٔ quote triggerها پیش از اولین edit با guard دقیق کنترل شوند؛ shipping مجوز wildcard mutation نمی‌گیرد. اگر OTP۴۲۹ شد یا cleanup قابل‌تأیید نبود، ادامه متوقف است. create-order، profile/address save، submit، shipping-label purchase و payment جدا از quotation هستند و هیچ‌کدام از این طرح مجوز نمی‌گیرند.
