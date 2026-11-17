# EZPost — قرارداد کیس‌های انتقال محصول و سبد پُر

تاریخ طراحی پیش از کد: ۱۷ نوامبر ۲۰۲۶. Workspace: `C:\Users\LOCAL_USER\Desktop\EZPost`. برنامه: `http://172.16.30.198:5800/`.

این سند افزودهٔ مرحلهٔ سبد است؛ ۳۰ شناسهٔ اصلی M01، ۱۸ شناسهٔ ordering و شناسه‌های inventory قبلی `CART-01` تا `CART-08`، `GATE-01/02` و `ASYNC-03` حفظ می‌شوند. کیس‌های زیر آنها را بازشماری یا جایگزین نمی‌کنند. طراحی، کد نوشته‌شده، مجوز اجرا، نتیجهٔ اجرا و نقص برنامه وضعیت‌های جدا دارند. جدول‌های قرارداد زیر checkpoint پیش از کد **DEFINED BEFORE IMPLEMENTATION / NOT EXECUTED** را حفظ می‌کنند. **وضعیت فعلی:** CART-H01…H04 پیاده‌سازی و در Chrome157 وFirefox160 هر مرورگر۴PASS/۰FAIL اجرا شدند؛ cleanup هر هشت اجرا verified است. CART-E01…E04 همچنان PLANNED / NOT EXECUTED هستند. [گزارش handoff](../Reports/EZPOST_QA_CART_HANDOFF_EXECUTION_2026-11-17.md) نتایج واقعی و شکست‌های اولیهٔ ابزار را حفظ می‌کند.

## منابع و قرارداد مشترک

| کلید | منبع و حد استناد |
|---|---|
| U | درخواست جاری کاربر: انتقال محصول/بسته/تعداد مطابق قصد مستقل تست، ویرایش و حذف اقلام ساخته‌شده توسط suite در مهمان تازه، cleanup عادی، اجرای visible و گزارش صادقانه مجاز است. این مجوز، سیاست مالی/merge/persistence را تصویب نمی‌کند |
| P1 | [Phase 1](../Planning/EZPOST_QA_PHASE1_REVIEW.md)، P14/T01–T08؛ هدف و ریسک پیشنهادی، نه الزام تجاری مصوب |
| M | [ماتریس قبلی سفارش](../Reports/EZPOST_QA_ORDERING_COVERAGE_MATRIX.md)، CART-01…08/GATE-01/02/ASYNC-03؛ checkpoint تاریخی آن حفظ می‌شود |
| O1 | `QA/Evidence/Cart-2026-11-17/discovery/initial-empty.json`: session مهمان، سبد ابتدا خالی؛ مشاهدهٔ تاریخ‌دار |
| O2 | همان پوشه، `product-before-add.json` و `after-first-add.json`: انتخاب Black Friday، بستهٔ ۲۴۰لیبلی در q2، انتقال واقعی به cart؛ DOM/کنترل‌ها و مقدار هر بسته مشاهده شدند |
| O3 | همان پوشه، `cleanup-first-owned-item.json`: حذف عادی همان قلمِ متعلق به تست، صفر item و empty visible، بدون storage reset |
| O4 | همان پوشه، `mobile-add-control.json`: در 390×844 دکمهٔ desktop مخفی و `main .product-mobile-bar button.mobile-bar-cta` قابل مشاهده است |
| O5 | همان پوشه، `network-events.json`: در مسیر مشاهده‌شده mutation غیر quote ثبت نشده است؛ این شاهد، تمام معماری یا عدم mutation در همهٔ حالت‌ها را ثابت نمی‌کند |
| O6 | `cypress/fixtures/ordering-observed.json` و شواهد منبع آن: محصول `/products/blackfri-01`، نام «بلک فرایدی»، package49 با۱۲۰ و package50 با۲۴۰ لیبل. fixture تاریخ‌دار است، نه مرجع مستقل قیمت |
| O7 | spec تاریخی `ordering/browser/cart-recovery.cy.js` و شواهد منبع آن: empty recovery به `/shop` و انتخاب محصول؛ این مقصد، eligibility مرحلهٔ بعد یا policy Previous/Next نیست |
| O8 | `QA/Evidence/Cart-2026-11-17/discovery/simple-product.json`: `/products/simple`، نام «طرح ساده»، package58 با۲۵ لیبل، عنوان «بسته ۲۵ لیبلی» و quote correlated درq1؛ fixture محصول دوم، نه schedule مصوب قیمت |
| O9 | همان پوشه، `simple-cart-edit-cleanup.json`: افزودن Simple درq1، cart با همان نام/۲۵ در هر بسته؛ visible + به۲ و − به۱؛ Remove→empty/zero؛ recovery «انتخاب بسته» با href=`/shop` و دسترسی به محصول واقعی |

تمام کیس‌های اجرایی باید در session مرورگر مستقل آغاز شوند، `user: null` و empty واقعی را پیش از افزودن تأیید کنند. اگر سبد از قبل پُر بود، تست باید prerequisite را fail کند و آن اقلام را حذف نکند. شخصی/ادمین/OTP/login/order/payment/checkout submission خارج دامنه‌اند. mutation guard عمومی باید باقی بماند؛ هیچ route تغییردهندهٔ حدسی مجاز نیست. quote مشاهده‌شده read-only است.

انتظار هویت از **قصد از پیش تعیین‌شدهٔ تست + fixture محصول جدا از cart** می‌آید: نام محصول، slug تصویرِ cart به‌عنوان شاهد تکمیلی، تعداد لیبل در هر بسته، quantity و composition با هم بررسی شوند. cart عدد total-label نشان نمی‌دهد؛ ۲۴۰ در هر بسته و q2 به معنی assertion نمایش «۴۸۰ لیبل» در cart نیست. badge عمومی «بستهٔ استاندارد» یا hidden select شناسهٔ variant نیستند.

در چند قلم، گروه‌بندی با `(productSlug, labelsPerPackage)` و جمع quantity قصدها اجازه می‌دهد merge/تقسیم خط را بدون تصویب policy فعلی بررسی کنیم. گزینه‌های مختلف باید تمایز خود را حفظ کنند. `تعداد بسته` در summary واحد صریح دارد؛ مقدار مورد انتظار از جمع quantityهای مستقل intent ساخته می‌شود. badge بدون policy واحد assertion تجاری ندارد. quote→cart پول فقط **presentation transfer** است، نه اثبات مستقل price/tier/rounding/fees.

cleanup فقط با دکمهٔ visible حذف برای اقلامی که تست مالکیتشان را احراز کرده مجاز است. پس از هر تست، صفر item و empty باید بررسی و ثبت شود؛ خطای cleanup نباید swallow شود. storage reset/پاک‌کردن داده برای جا زدن موفقیت journey مجاز نیست. کنترل hidden quantity با force یا `.select()` فعال نمی‌شود؛ دکمه‌های visible واقعی افزایش/کاهش استفاده می‌شوند.

## کیس‌های batch انتقال — `test/cart-handoff`

مسیر پیشنهادی پیش از پیاده‌سازی: `cypress/e2e/cart/cart-handoff.cy.js`؛ عنوان test باید ID زیر را داشته باشد. اجرای واقعی در Chrome و Firefox visible و در output مستقل این workspace ثبت می‌شود؛ بازکردن برنامه به‌تنهایی اجرای کیس نیست.

| ID / traceability | اولویت | شروع، prerequisites و دادهٔ مستقل | اقدام کاربر | نتیجهٔ دقیق مورد انتظار و منبع | رفتار نادرستی که باید رد شود | خلأ و وضعیت اولیه |
|---|---|---|---|---|---|---|
| CART-H01 → P14/T02، CART-02/03 | P0 | مهمان تازه و empty O1؛ desktop1366×900؛ Black Friday/O6، package49/۱۲۰، q2؛ quote همین product/package/quantity کامل و presentation settled | انتخاب q2 با کنترل واقعی؛ activate دکمهٔ visible desktop Add یک بار | cart پُرِ همان محصول، slug و نام fixture،۱۲۰ در هر بسته، q2، هیچ قصد اضافه/مفقود، summary تعداد بسته=2؛ U/O2/O6، نه صرف route/toast/۲۰۰ | انتقال محصول دیگر، reset مقدار به۱، بستهٔ۲۴۰ به جای۱۲۰، summary نادرست، قلم گم‌شده/اضافه؛ در صورت آزمودن مبلغ، اختلاف با quote نهاییِ همان selection | price مستقل و pending-add این کیس نیستند؛ DEFINED / NOT EXECUTED |
| CART-H02 → P14/T02/U03، CART-02/03 | P0 | guest/empty مستقل؛ narrow390×844؛ Black Friday، package50/۲۴۰، q2؛ پاسخ quote correlated کامل؛ O2/O4/O6 | انتخاب alternate واقعی و q2؛ فقط mobile CTA قابل مشاهده را یک بار فعال کند | همان oracle اتمی H01 با۲۴۰ در هر بسته و q2، summary2؛ desktop CTA مخفی نباید force شود؛ U/O2/O4/O6 | انتقال default۱۲۰ به جای alternate۲۴۰، quantity reset، محصول/compose نادرست؛ click روی کنترل desktop مخفی به عنوان موفقیت | package_id در cart نمایش ندارد؛ assertion association از labels-per-package است؛ DEFINED / NOT EXECUTED |
| CART-H03 → P14/T02، CART-02/03 | P0 | guest/empty؛ Black Friday package49/۱۲۰ درq2 به‌علاوهٔ Simple `/products/simple`، نام «طرح ساده»، package58/۲۵ درq1؛ fixture مستقل O8/O9 | Add settled محصولA؛ سپس navigation عادی به محصولB و Add settled، هر کدام یک قصد مستقل | composition گروه‌بندی‌شده دقیقاً دو پیکربندی مستقل با نام/slug/labels/quantity مورد قصد؛ summary تعداد بسته=3؛ قلمA با افزودنB از دست نرود؛ U/O6/O8/O9 | دومین Add جایگزینA شود؛ نامA با تصویرB، labels محصول اشتباه، item اضافه یا quantity جمع غلط؛ assertion فقط دو title کافی نیست | سیاست عمومی merge/repeat و persistence طولانی پوشش نیست؛ DEFINED / NOT EXECUTED |
| CART-H04 → P14/T02، CART-02/03 | P0 | guest/empty؛ Black Friday، دو قصد settled جدا: package49/۱۲۰ درq2 و package50/۲۴۰ درq1 | افزودن بستهٔ اول؛ navigation عادی محصول و انتخاب بستهٔ دوم؛ هر quote پایان یافته و یک Add برای هر configuration | دو association متمایز `(blackfri-01,120)` درq2 و `(blackfri-01,240)` درq1؛ summary تعداد بسته=3؛ تعداد ردیف hardcode نشود مگر scope قرارداد صریح شود؛ U/O2/O6 | ادغام دو variant بدون حفظ تمایز، overwrite انتخاب اول، جابجایی quantityها، quantity مفقود/اضافه | این repeated same-configuration add نیست؛ policy merge/split عمومی همچنان باز؛ DEFINED / NOT EXECUTED |

## کیس‌های batch ویرایش/حذف — `test/cart-edit-remove`

مسیر پیشنهادی پیش از کد: `cypress/e2e/cart/cart-edit-remove.cy.js`. هر کیس خودش سبد مورد نیاز را از empty مستقل و با Add عادی می‌سازد؛ به خروجی تست قبل متکی نیست. کنترل‌های visible افزایش/کاهش و Remove در O2 مشاهده شدند. رفتار مرز۱/۱۰/۵۰ از گزینه‌های select یا input محصول به‌عنوان business policy استنتاج نمی‌شود.

| ID / traceability | اولویت | شروع، prerequisites و داده | اقدام کاربر | نتیجهٔ دقیق مورد انتظار و منبع | رفتار نادرستی که باید رد شود | خلأ و وضعیت اولیه |
|---|---|---|---|---|---|---|
| CART-E01 → T03/T02، CART-04/03 | P1 | guest/empty؛ ساخت عادی Black Friday با package49 یا50 از پیش معلوم در q2؛ snapshot اولیه مطابق intent | visible + یک بار به۳؛ پس از settled شدن visible − یک بار به۲ | در هر checkpoint همان product/labels با q3 سپسq2؛ سایر اقلام اگر fixture دارد دست‌نخورده؛ summary از intent جدید؛ U و معنای صریح کنترل‌های O2 | count ثابت بماند، دو واحد عوض شود، variant تغییر کند، summary ناسازگار، قیمت قدیمی اگر presentation checkpoint شامل آن است | قیمت مستقل/حد بالا/zero/invalid typing خارج subset؛ DEFINED / NOT EXECUTED |
| CART-E02 → T03/T02، CART-04/03 | P1 | guest/empty؛ دو پیکربندی distinguishable متعلق به suite و تأییدشده؛ fixture هر کدام مستقل | فقط Remove visible قلم هدف | configuration هدف غایب، تمام association/quantity قلم دیگر دقیقاً حفظ، summary فقط قصد باقیمانده؛ سپس cleanup عادی باقیمانده؛ U/O2/O3 | حذف اشتباه/همهٔ اقلام، باقی‌ماندن هدف، تغییر quantity/variant قلم unaffected، summary قبلی | تکرار remove/response-lost و concurrency این کیس نیست؛ DEFINED / NOT EXECUTED |
| CART-E03 → T03/T01، CART-04/01 | P1 | guest/empty؛ یک configuration تأییدشده را با Add عادی می‌سازد؛ کنترل حذف موجود O3 | Remove آخرین قلم؛ سپس فقط لینک recovery واقعی empty state و انتخاب محصول قابل دسترس | صفر item و empty واقعی؛ recovery واقعی به shop و محصول select-ready مطابق fixture و quote correlated؛ U/O3/O7؛ checkout/Next فعال نشود | آخرین قلم باقی بماند، ghost count، recovery به صفحهٔ نامرتبط، محصول بدون کنترل قابل انتخاب؛ موفقیت route به‌تنهایی کافی نیست | policy retention پس از reload یا ورود حساب و lifecycle checkout پوشش نیست؛ DEFINED / NOT EXECUTED |
| CART-E04 → T03/U01/U03، CART-04 | P1 | guest/empty مستقل و narrow390×844؛ افزودن از mobile CTA واقعی؛ cart controls narrow باید واقعاً visible/usable باشند | visible + از۲ به۳ و − از۳ به۲؛ Remove عادی جهت cleanup | همان oracle هویت/labels/quantity/summary E01 در narrow، controls بدون force؛ zero item/empty پس از cleanup؛ U/O2/O4 | کنترل پوشیده یا غیرقابل تعامل، تغییر قلم اشتباه، quantity/summary غلط، cleanup ناموفق | viewport شبیه‌سازی physical device/native touch نیست؛ DEFINED / NOT EXECUTED |

## آزمون خود oracle و محدودیت زمانی

منطق validator مشترک باید با نمونهٔ صحیح و negative controlهای مستقل آزمایش شود: wrong product/name/slug، wrong labels-per-package، wrong quantity، aggregate quantity اشتباه، configuration مفقود/اضافه، هدف حذف هنوز حاضر، قلم unaffected گم‌شده، و مبلغ presentation اشتباه در صورت inclusion. اجرای این validatorهای خالص، E2E برنامه یا نتیجهٔ مرورگر محسوب نمی‌شود. validator فقط وقتی ارزش دارد که spec همان validator نهایی را روی یک snapshot یکپارچهٔ DOM فراخوانی کند.

quote باید با product path، package_id و quantity قصد جاری correlate شود. پاسخ قدیمی نباید oracle انتخاب جدید شود. پایان request به‌تنهایی پایان rendering نیست؛ assertionهای retryable state نهایی و checkpoint render محدود باید مستند باشند. این مجموعه رفتار arbitrary deferred آینده را ثابت نمی‌کند؛ خطای باز P10 با outcome تاریخی معتبر حفظ می‌شود و موفقیت cart آن را حل‌شده اعلام نمی‌کند.

## موارد مشخصِ بدون تست اجرایی فعلی

| حوزه و traceability | تصمیم/fixture دقیق غایب | disposition و پوشش باقیمانده |
|---|---|---|
| repeated identical add، CART-03/07؛ T02/T06 | قرارداد deliberate repeat: افزایش quantity، merge، separate line یا گزینهٔ دیگر؛ تفاوت retry با قصد جدید | BLOCKED همان slice؛ H04 فقط variantهای متفاوت است، نه جایگزین repeated add |
| badge، CART-01/03 | واحد badge: خط، پیکربندی، بسته یا معیار دیگر | BLOCKED assertion معنایی badge؛ summary با label صریح تعداد بسته قابل بررسی مستقل است |
| business price/tier/rounding، CART-02/03/06 | schedule مستقل versioned، currency/precision/rounding و اجزای fee/tax در صورت وجود | BLOCKED مالی؛ presentation transfer و arithmetic quantity با صحت تجاری قیمت برابر نیست |
| cart bounds/invalid/localized input، CART-04 | grammar و min/max/zero policy مخصوص cart؛ مسیر واقعی UI برای typing در کنترل فعلی پنهان است | BLOCKED rule/entry path؛ فقط +/− داخلی۲↔۳ پیاده‌سازی شود؛ hidden select1…10 حد تجاری۱۰ نمی‌شود |
| pending add، ASYNC-03/P14 | eligibility/revalidation/cancel/error contract هنگام quote pending یا failed | BLOCKED آن action؛ تست settled حالت مستقل را اجرا می‌کند، add با stale quote انجام نمی‌دهد |
| reload/back/away/session/login merge، CART-05 | lifetime/context، reset در برابر restore، guest→customer merge و ordinary account مجاز | BLOCKED policy؛ انتقال sequential در یک journey به معنی تصویب retention کلی نیست |
| price/availability change، CART-06 | fixture externally provisioned، revalidation/disclosure/ack rule و مرجع قیمت مستقل | BLOCKED؛ بدون تغییر backend یا mock success ساختگی |
| rejected/interrupted/retry، CART-07 | operation/request واقعی، fault capability برگشت‌پذیر، accepted-versus-not-sent و retry semantics؛ observed guest add mutation request ندارد | BLOCKED slice فاقد قرارداد؛ حذف fake endpoint یا قطع شبکهٔ نامرتبط تست cart failure نیست |
| conflicting views، CART-08 | shared-cart model، conflict policy و capability واقعی چند view امن؛ هویت مشتری فقط اگر account-scoped لازم شود | BLOCKED؛ single-tab persistence concurrency نیست |
| role×cart و expiry، GATE-01/02 | expected eligibility چهار حالت و expiry واقعیِ ایمن؛ ordinary test identity در صورت نیاز | خارج اجرای cart حاضر؛ هیچ login/OTP/checkout submission انجام نشود |

## معیار تکمیل batch و ثبت نتایج

هر batch فقط پس از code review، static checks، اجرای visible موجود در Chrome سپس Firefox، ثبت تعداد واقعی pass/fail/pending/skipped/not-run و cleanup، review عمومی evidence، commit/push معمولی و merge به main کامل گزارش می‌شود. failure معتبرِ expectation حفظ می‌شود؛ تست برای سبزشدن ضعیف نمی‌شود. اشکال اثبات‌شدهٔ setup از defect برنامه جدا و evidence اولیه نگه داشته می‌شود. تاریخچهٔ M01/ordering و دو شکست P10 بازنویسی یا rerun نامرتبط نمی‌شود.

ماتریس مرحلهٔ سبد: [EZPOST_QA_CART_COVERAGE_MATRIX.md](../Reports/EZPOST_QA_CART_COVERAGE_MATRIX.md). checkpoint فعلی هشت ID تفصیلی دارد: چهار H پیاده‌سازی‌شده در `cypress/e2e/cart/cart-handoff.cy.js` با هشت اجرای نهایی مرورگر (۴ در هر مرورگر، همه PASS)، و چهار E برنامه‌ریزی‌شده و NOT EXECUTED. Hها مبلغ هر intent را هم با quote نهایی correlated مقایسه می‌کنند؛ این presentation transfer است. هیچ ادعای journey کامل سفارش/پرداخت ندارد.
