# EZPost — ماتریس پوشش مرحلهٔ سبد

Checkpoint طراحی پیش از کد: ۱۷ نوامبر ۲۰۲۶. این افزودهٔ جدید، [ماتریس تاریخی ordering](EZPOST_QA_ORDERING_COVERAGE_MATRIX.md) را حفظ می‌کند. مجوز جدیدِ isolated guest cart و cleanup عادی، محدودیت مجوز قدیمی آن گزارش را فقط برای slice حاضر supersede می‌کند؛ شواهد، نتایج و محدودیت‌های قدیمی عوض نمی‌شوند.

منابع و قرارداد کامل هشت ID تفصیلی در [کیس‌های سبد](../Test-Cases/EZPOST_QA_CART_TEST_CASES.md) تعریف شده‌اند. `U` مجوز و قرارداد فنی درخواست فعلی، `O` observation تاریخ‌دار، `Q` policy حل‌نشده، `F` fixture/capability غایب‌اند. readiness طراحی، وجود code، مجوز اجرا، نتیجهٔ runtime و application defect مستقل‌اند. جدول‌های اولیهٔ زیر checkpoint پیش از کد planned/NOT EXECUTED را حفظ می‌کنند. **وضعیت فعلی:** هر هشت H/E implemented subset هستند. Hها در نسخهٔ batch اول Chrome157 وFirefox160 هرکدام۴PASS/۰FAIL با cleanup verified دارند؛ بعد از تغییر helper مشترک batch دوم rerun نشده‌اند. آخرین Chrome نسخهٔ جاری Eها۳PASS/۱FAIL وFirefox همان نسخه۴PASS/۰FAIL؛ cleanup هرهشت اجرای E verified است. جدول پایانی، [گزارش handoff](EZPOST_QA_CART_HANDOFF_EXECUTION_2026-11-17.md) و [گزارش edit/remove](EZPOST_QA_CART_EDIT_REMOVE_EXECUTION_2026-11-17.md) code version و outcome واقعی را جدا می‌کنند؛ inspection به PASS تبدیل نشده است.

## رفتار ← قرارداد ← تست ← خلأ

| Inventory ID / مالک اصلی | رفتار و state/action | منبع و oracle | ID تفصیلی / mapping برنامه‌ریزی‌شده | disposition طراحی اولیه | خلأ دقیق / coverage claim مجاز |
|---|---|---|---|---|---|
| CART-01 / T01 | empty اولیه مستقل، سپس remove آخر→empty و recovery | U؛ guest=null و empty واقعی O1؛ cleanup O3؛ لینک recovery O7 | CART-E03؛ E01/E02/E04 cleanup؛ `cart-edit-remove.cy.js` | SUPPORTED SUBSET / NOT EXECUTED | T01-ORD01 تاریخی حفظ؛ این بار transition حذف واقعی اضافه می‌شود؛ badge policy/Next خارج |
| CART-02 / P14 | default desktop، quantity2، settled Add | intent مستقل O6 + U؛ product/name/slug/labels120/q2 + composition + summary2 | CART-H01؛ `cart-handoff.cy.js` | SUPPORTED SUBSET / NOT EXECUTED | business price و pending CTA assertion ندارند |
| CART-02 / P14 | alternate narrow، quantity2، mobile Add واقعی | U/O2/O4/O6؛ labels240/q2، hidden desktop استفاده نشود | CART-H02؛ همان spec | SUPPORTED SUBSET / NOT EXECUTED | package_id در cart visible نیست؛ cart total labels نمایش ندارد؛ physical-device proof نیست |
| CART-03 / T02 | single intended configuration، no missing/extra intent | U و fixture مستقل؛ یک snapshot atomic، grouping slug+labels، summary جمع quantity | CART-H01/H02 | SUPPORTED SUBSET / NOT EXECUTED | current one-line baseline policy عمومی merge/split نیست |
| CART-03 / T02 | دو محصول متفاوت، افزودنB بدون از دست‌رفتنA | U/O6/O8/O9؛ Black Friday120/q2 و Simple25/q1 با fixture مستقل | CART-H03؛ همان spec | SUPPORTED SUBSET / NOT EXECUTED | fixtureB اکنون از `discovery/simple-product.json` و `simple-cart-edit-cleanup.json` ثبت شده؛ تمام محصولات catalog ادعا نیست |
| CART-03 / T02 | دو package متفاوتِ همان محصول | U/O6؛ associationهای120 و240 جدا، quantity هر کدام و sum | CART-H04؛ همان spec | SUPPORTED SUBSET / NOT EXECUTED | line count عمومی یا repeated identical add را تصویب نمی‌کند |
| CART-03/07 / T02/T06 | deliberate repeated identical configuration add | Q؛ قصد جدید در برابر retry و policy merge/separate/increment | — | BLOCKED POLICY / NOT IMPLEMENTED | H04 این slice را پوشش نمی‌دهد؛ هیچ blanket «duplicate همیشه ignore» مجاز نیست |
| CART-03 / T02 | summary `تعداد بسته` پس از هر action | label صریح O2؛ sum مستقل quantity intent | همهٔ H و E که populated checkpoint دارند | SUPPORTED SUBSET / NOT EXECUTED | quantity arithmetic مستقل از self-comparison cart است؛ badge unit غایب |
| CART-01/03 / T01/T02 | badge count و معنی آن | Q؛ unit مشخص نشده | — | BLOCKED POLICY / NOT IMPLEMENTED | تعداد خط/variant/بسته قابل حدس نیست؛ نادیده‌گرفتن badge با ادعای covered همراه نشود |
| CART-02/03 / P14/T02 | quote→cart amount transfer | O؛ captured response دقیقِ product/package/quantity نهایی | فقط اگر code صریح مبلغ را assert کند؛ H01/H02 | OPTIONAL PRESENTATION SUBSET / NOT EXECUTED | money API↔DOM oracle مستقل pricing نیست؛ inclusion باید از code نهایی استخراج شود |
| CART-02/03/06 / P08/T02/T05 | قیمت مستقل، tiers، round، subtotal/payable/fees | Q/F؛ schedule و اجزای مصوب مستقل | — | BLOCKED REQUIREMENTS / NOT IMPLEMENTED | پاسخ خود برنامه یا دو UI هم‌منبع صحت مالی را اثبات نمی‌کنند |
| CART-04 / T03 | visible increase2→3→decrease2، identity ثابت | U + control semantics مشاهده‌شده O2؛ intent جدید هر checkpoint | CART-E01؛ `cart-edit-remove.cy.js` | SUPPORTED SUBSET / NOT EXECUTED | quantity limits/zero policy از select یا product input استنتاج نشود |
| CART-04 / T03 | حذف یک configuration از چند و حفظ بقیه | U/O2/O3؛ target absent + entire unaffected intent exact + summary جدید | CART-E02؛ همان spec | SUPPORTED SUBSET / NOT EXECUTED | receipt/lost response، repeat delete و concurrency جدا |
| CART-04/01 / T03/T01 | حذف آخر→zero items→empty→recovery | U/O3/O7؛ state واقعی پس از Remove عادی و destination + product select-ready | CART-E03؛ همان spec | SUPPORTED SUBSET / NOT EXECUTED | recovery journey به checkout/order نمی‌رود |
| CART-04 / T03/U01/U03 | narrow کنترل +/- و Remove بدون force | U، O2/O4 و visible assertion در runtime | CART-E04؛ همان spec | SUPPORTED SUBSET / NOT EXECUTED | hidden select ممنوع؛ native device/touch و همهٔ viewportها ادعا نشود |
| CART-04 / T03 | min/max، zero، negative، decimal، empty/malformed/localized | Q/F؛ policy cart و user-reachable input path غایب | — | BLOCKED POLICY/ENTRY PATH / NOT IMPLEMENTED | select hidden گزینه‌های1…10 دارد، business max10 یا مسیر typing معمولی ثابت نمی‌شود |
| CART-05 / T04 | reload/back/away، lifetime و guest→customer merge/expiry | Q/F؛ reset/restore و context/lifetime + ordinary identity safe | — | BLOCKED POLICY/IDENTITY / NOT IMPLEMENTED | navigation لازم برای افزودن دو قلم اثبات retention کلی نیست؛ storage injection session واقعی نیست |
| CART-06 / T05 | selected price/availability بعداً تغییر کند | Q/F؛ externally provisioned fixture، reprice/disclosure/ack | — | BLOCKED FIXTURE/RULE / NOT IMPLEMENTED | تغییر backend ممنوع؛ bad route 404 fixture availability transition نیست |
| CART-07 / T06 | request-not-sent، accepted-response-lost، rejection/retry | Q/F؛ operation/request واقعی + برگشت‌پذیری fault + policy retry | — | BLOCKED CONTRACT/CAPABILITY / NOT IMPLEMENTED | discovery guest flow mutation route ثبت نکرده؛ fake cart endpoint یا failure unrelated اثبات نیست |
| CART-08 / T08 | دو view، stale update/remove و conflict | Q/F؛ shared-cart model، policy conflict و multi-view safe capability | — | BLOCKED MODEL/CAPABILITY / NOT IMPLEMENTED | تک‌تب Cypress و history/reload true concurrency نیستند |
| ASYNC-03 / P10/P14 | Add در quote pending/failed، readiness و old quote | Q/F؛ eligibility/revalidate/cancel/error policy | —؛ Hها فقط settled quote | BLOCKED POLICY / NOT IMPLEMENTED | P10 قبلی باز می‌ماند؛ handoff settled حل race یا مالی نیست |
| GATE-01 / T07/N08 | چهار حالت guest/customer × empty/populated و Next/direct | Q/F؛ eligibility هر ردیف، ordinary identities و safe auth | — | OUTSIDE CURRENT EXECUTION; REQUIREMENT-GATED | مهمان/empty baseline approval نیست؛ checkout این task اجرا نشود |
| GATE-02 / A10/T07 | session expired و interrupted checkout return | Q/F؛ genuine ordinary session، expiry امن، lifetime/return | — | OUTSIDE CURRENT EXECUTION; ENVIRONMENT-GATED | پاک‌کردن cookie معادل expiry server نیست؛ OTP خارج |
| ORACLE-CART / helper quality | negative controls علیه validator دقیق مورد استفادهٔ spec | contract مستقل؛ wrong name/slug/variant/qty، missing/extra intent، wrong aggregate، remove باقی‌مانده، unaffected lost | pure checks مجزا از E2E؛ code path نهایی باید همان validator باشد | REQUIRED IMPLEMENTATION CHECK / NOT EXECUTED | unit validation نتیجهٔ برنامه/مرورگر نیست؛ false positive صفر تضمین نمی‌شود |

## تست ← inventory و traceability اصلی

| ID تفصیلی | والدهای اصلی / inventory | spec برنامه‌ریزی‌شده | assertion مستقل کلیدی | نوع مورد انتظار | وضعیت کد در این checkpoint | اجرا |
|---|---|---|---|---|---|---|
| CART-H01 | P14/T02؛ CART-02/03 | `cypress/e2e/cart/cart-handoff.cy.js` | desktop default120/q2؛ composition، identity و summary2 | live isolated guest cart | PLANNED BEFORE CODE | NOT EXECUTED |
| CART-H02 | P14/T02/U03؛ CART-02/03 | همان | narrow alternate240/q2؛ mobile visible action و composition | live isolated guest cart | PLANNED BEFORE CODE | NOT EXECUTED |
| CART-H03 | P14/T02؛ CART-02/03 | همان | Black Friday120/q2 و Simple25/q1؛ preserveA پس ازB | live isolated guest cart | PLANNED BEFORE CODE | NOT EXECUTED |
| CART-H04 | P14/T02؛ CART-02/03 | همان | دو package120/240 همان محصول، intent group دقیق | live isolated guest cart | PLANNED BEFORE CODE | NOT EXECUTED |
| CART-E01 | T03/T02؛ CART-04/03 | `cypress/e2e/cart/cart-edit-remove.cy.js` | +2→3 و−3→2، identity/summary | live isolated guest cart | PLANNED BEFORE CODE | NOT EXECUTED |
| CART-E02 | T03/T02؛ CART-04/03 | همان | remove target + unaffected كامل + summary | live isolated guest cart | PLANNED BEFORE CODE | NOT EXECUTED |
| CART-E03 | T03/T01؛ CART-04/01 | همان | final remove→zero/empty→recovery select-ready | live isolated guest cart | PLANNED BEFORE CODE | NOT EXECUTED |
| CART-E04 | T03/U01/U03؛ CART-04 | همان | narrow +/− و cleanup با visible controls | live isolated guest cart | PLANNED BEFORE CODE | NOT EXECUTED |

## حدود گزارش‌دهی و تکمیل

۸ ID جدید اولیهٔ این طراحی، جایگزین تمام والدهای P14/T01–T08 نیستند. «SUPPORTED SUBSET» به readiness قرارداد محدود اشاره دارد و PASS اجرا نیست. case صرفاً به خاطر بازشدن cart،۲۰۰، toast یا برابری دو ناحیهٔ هم‌منبع پاس نمی‌شود. expected composition از intent از پیش مشخص می‌آید؛ غلط‌بودن fixture یا افت prerequisite باید fail واضح باشد.

هر batch نیازمند code review دوم با پرسش «اگر رفتار ادعاشده خراب باشد، آیا تست هنوز پاس می‌شود؟»، static، visible Chrome سپسFirefox، outcome/case subset واقعی، cleanup و publication audit است. stateهای application-opened/spec-loaded/tests-executed جدا ثبت شوند. initial failure evidence پیش از اصلاح setup حفظ شود؛ valid app failure با assert ضعیف سبز نشود. branch خالی برای failure/persistence بدون prerequisite نسازید.

گزارش‌های تاریخی و evidence قبلی دست‌نخورده می‌مانند؛ outputهای تازه فقط زیر `QA/Evidence/` همین workspace، profile/runtime خصوصی ignored. نتایج live از pure oracle checks و هر controlled simulation جدا گزارش شوند. سفارش، پرداخت، account/OTP، landing/M01 و full ordering journey در اجرای حاضر پوشش ندارند.

## checkpoint اجرای فعلی — پس از کد و اصلاح setup

چهار تست H در `cypress/e2e/cart/cart-handoff.cy.js` و چهار E در `cypress/e2e/cart/cart-edit-remove.cy.js` موجودند و helper/fixture/validator مشترک واقعی دارند. مبلغ هر intent نیز از quote نهایی correlated به cart transfer مقایسه می‌شود؛ بنابراین ردیف OPTIONAL PRESENTATION اولیه اکنون **IMPLEMENTED PRESENTATION SUBSET** است. cleanup عادی Hها جایگزین assertions مستقل edit/remove Eها نیست. نتایج H زیر متعلق به commit batch اول `f10ce157c9165e935effb4d3d9bf87a771425b9a` هستند؛ اجرای helper تقویت‌شدهٔ batch دوم برای H ادعا نمی‌شود.

| ID | inventory / والد حفظ‌شده | پیاده‌سازی فعلی | Chrome157 نهایی | Firefox160 نهایی | باقی‌مانده |
|---|---|---|---|---|---|
| CART-H01 | CART-02/03؛ P14/T02 | implemented desktop120/q2، identity/composition/summary/amount transfer | PASS؛ cleanup verified | PASS؛ cleanup verified | business-price، pending-add، badge policy |
| CART-H02 | CART-02/03؛ P14/T02/U03 | implemented mobile240/q2 با CTA visible واقعی | PASS؛ cleanup verified | PASS؛ cleanup verified | physical device و همان policyهای مالی/مرزی |
| CART-H03 | CART-02/03؛ P14/T02 | implemented BlackFriday120/q2 + Simple25/q1؛ حفظ هر دو | PASS؛ cleanup verified | PASS؛ cleanup verified | repeat/merge عمومی، تمام catalog، persistence کلی |
| CART-H04 | CART-02/03؛ P14/T02 | implemented همان محصول،120/q2 +240/q1؛ گروه‌های متمایز | PASS؛ cleanup verified | PASS؛ cleanup verified | identical-repeat policy و line partition عمومی |
| CART-E01 | CART-04/03؛ T03/T02 | implemented؛ دو محصول، هدف۲→۳→۲ و unaffected | FAIL prerequisite quote Simple؛ cleanup verified | PASS؛ full action وcleanup verified | نبود requestطی۵s درChrome علت اثبات‌شده ندارد؛ pass اولیهٔ پیش از hardening جداست |
| CART-E02 | CART-04/03؛ T03/T02 | implemented؛ remove-one و unaffected کامل | PASS؛ cleanup verified | PASS؛ cleanup verified | repeat/lost-response/concurrency مستقل باز |
| CART-E03 | CART-04/01؛ T03/T01 | implemented؛ final remove→empty→shop→Simple select-ready | PASS؛ cleanup verified | PASS؛ cleanup verified | stop beforeAdd؛ checkout/persistence خارج |
| CART-E04 | CART-04؛ T03/U01/U03 | implemented؛ narrow alternate240/q2→3→2 | PASS؛ cleanup verified | PASS؛ cleanup verified | physical device/حدود/invalid grammar خارج |

Handoff Chrome raw: `handoff-chrome-correlated-final/visible-results-21188.json`؛ Firefox raw: `handoff-firefox-correlated-final/visible-results-9928.json`، زیر `QA/Evidence/Cart-Cypress/2026-11-17/`. totals همان batch هر مرورگر:۴PASS،۰FAIL،۰pending،۰skipped و۰not-run. Edit/remove Chrome جاری: `edit-remove-chrome-reviewed-final/visible-results-16172.json`،۳PASS/۱FAIL؛ Firefox: `edit-remove-firefox-reviewed-final/visible-results-1748.json`،۴PASS/۰FAIL؛ pending/skipped/not-run هر دو صفر و cleanup هر هشت verified. جمع آخرین run هر batch با محدودیت code version: Chrome۷PASS/۱FAIL وFirefox۸PASS/۰FAIL روی۸ID در هر مرورگر؛ این اجرای مجدد کل suite رویآخرین helper نیست. initial setup failures هر دو batch در گزارش/evidence خود حفظ‌اند. P10 باز است؛ rerun نشده و از موفقیت cart نتیجهٔ fixed گرفته نمی‌شود.

## checkpoint تازه — رگرسیون یک نسخه‌ای، ۱۷ نوامبر ۲۰۲۶، UTC16:32–16:36

checkpoint بالا تاریخچهٔ batchهای قبلی است. هر هشت ID و mapping بدون تغییر با همان spec/helper نهایی، در Cypress open نمایان Chrome157 و سپس Firefox160 دوباره اجرا شدند. source ID مشترک: `e0fa394750cf19ab766ef3813f13007dbab78a4d00d78518cde2af3c5164a505`؛ ۲۰ ورودی پیش/پس از هر spec unchanged. هیچ wait/timeout/assertion یا کد برنامه برای گرفتن PASS عوض نشد.

| ID | Chrome | Firefox | cleanup و دامنه |
|---|---|---|---|
| CART-H01 | PASS | PASS | guest/empty اولیه، UI واقعی desktop120/q2، پایان empty verified |
| CART-H02 | PASS | PASS | UI واقعی mobile240/q2 در viewport narrow؛ پایان empty verified |
| CART-H03 | PASS | PASS | BlackFriday120/q2 + Simple25/q1؛ هر دو intent؛ پایان empty verified |
| CART-H04 | PASS | PASS | package120/q2 +240/q1؛ پیکربندی متمایز؛ پایان empty verified |
| CART-E01 | PASS | PASS | آماده‌سازی Simple و target2→3→2 و unaffected کامل اجرا شد؛ پایان empty verified |
| CART-E02 | PASS | PASS | حذف هدف و حفظ کامل قلم دیگر؛ پایان empty verified |
| CART-E03 | PASS | PASS | final remove→empty→shop→Simple select-ready؛ پایان empty verified |
| CART-E04 | PASS | PASS | narrow alternate240/q2→3→2؛ پایان empty verified |

هر مرورگر:۸PASS/۰FAIL/۰pending/۰skipped/۰not-run؛ مجموع۱۶ اجرای live؛ controlled-response Cypress در این batch اجرا نشد. نتیجهٔ تاریخی FAIL prerequisite E01 همچنان محفوظ و علت آن حل‌نشده است؛ pass تازه اثبات رفع defect نیست. پول فقط quote→cart presentation، نه pricing مستقل؛ P10 باز و سفارش/پرداخت خارج پوشش‌اند. [گزارش جدید و پیوند تمام نتایج](EZPOST_QA_CART_READINESS_REGRESSION_2026-11-17.md)، [تطبیق counts/freeze/cleanup](../Evidence/Cart-Readiness-2026-11-17/regression-verification.json).
