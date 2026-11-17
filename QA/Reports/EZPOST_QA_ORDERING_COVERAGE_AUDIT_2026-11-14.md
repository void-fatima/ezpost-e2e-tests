# EZPost — ممیزی مستقل پوشش مسیر سفارش

تاریخ: ۱۴ نوامبر ۲۰۲۶، America/Los_Angeles. Workspace انحصاری: `C:\Users\LOCAL_USER\Desktop\EZPost`؛ origin: `http://172.16.30.198:5800/`.

**پوشش موجود پیش از ممیزی، ۱۲ کیس جزئی / ۱۵ تست تألیفی بود. پس از تکمیل شش کیس جدید و اصلاح سه کیس قبلی، ۱۸ کیس / ۲۴ تست تألیفی وجود دارد: ۲۰ تست live خواندنی و چهار تست controlled.** تمام ۲۴ تست `WRITTEN / NOT EXECUTED` هستند. این اعداد فقط inventory پیاده‌سازی‌اند و درصد پوشش سفارش یا نتیجهٔ اجرای برنامه نیستند.

این ممیزی از Phase 1 و درخواست جاری، stateها و قراردادهای موجود شروع شد و سپس assertionهای هر چهار spec، helperها و fixtureها را تطبیق داد. فایل یا title به‌تنهایی شاهد پوشش نبود. [ماتریس مستقل دوطرفه](EZPOST_QA_ORDERING_COVERAGE_MATRIX.md) مرجع رفتار→assertion و تست→منبع است؛ [سند کیس‌ها](../Test-Cases/EZPOST_QA_ORDERING_TEST_CASES.md) نقش، شروع، اقدام، خروجی و پیش‌شرط را نگه می‌دارد. هیچ درصد ترکیبی از design/implementation/execution گزارش نمی‌شود.

## مبنا و معنای وضعیت‌ها

| طبقه | تعریف و منبع |
|---|---|
| C — الزام صریح فنی | درخواست جاری/قبلی کاربر: تطابق انتخاب و summary، جلوگیری از stale overwrite، استقلال تست و رفتار قابل استفادهٔ کنترل‌های واقعی. این‌ها تصویب schedule یا policy تجاری نیستند |
| O — مشاهده | baselineهای O1–O5 در authoring قبلی و O6–O8 در این ممیزی؛ رفتار تاریخ‌دار و قابل تغییر |
| Q — نامزد requirement | پیشنهادهای Phase 1 و قواعد تجاری حل‌نشده؛ حتی ردیف VALID Phase 1 به معنی acceptance مصوب یا passed نیست |
| F — قابلیت/fixture غایب | ordinary identities، populated cart و orders مجاز، safe OTP، sandbox و fault/reconciliation capabilities؛ نداشتن آن‌ها به معنی N/A نیست |
| FULL scoped / PARTIAL / NOT IMPLEMENTED | فقط کفایت کد برای رفتار محدودِ تعریف‌شده در همان ردیف matrix؛ FULL هیچ parent/module یا journey کامل را تأیید نمی‌کند |
| وضعیت اجرا | برای همهٔ تست‌های ordering، NOT EXECUTED؛ بررسی syntax، inspection خواندنی و replay fixture verification نتیجهٔ Cypress نیست |

مراجع بررسی‌شده: Phase 1 بخش‌های ۳.۳–۳.۷، ۴، ۷.۴، I4 و B01–B11؛ manifest مهاجرت و تصمیم‌های M01 برای تشخیص سیاست‌های حل‌نشده؛ کیس‌ها و گزارش implementation سفارش؛ تمام چهار spec و support/fixtures واقعی. `AGENTS.md` در workspace/مسیرهای والد و پوشه‌های پروژهٔ بررسی‌شده یافت نشد. مهارت cypress-author برای authoring و دو بازبینی مستقل روی inventory و assertionها به‌کار رفت. گزارش قبلی authoring همچنان snapshot تاریخی ۱۲/۱۵ است و بازنویسی نشد.

## نقشهٔ مشاهده‌شدهٔ فعلی و مرز دسترسی

| بخش واقعی مسیر | شاهد و شاخهٔ موجود | آنچه نمی‌توان نتیجه گرفت |
|---|---|---|
| `/shop`→محصول | کارت واقعی→`blackfri-01`؛ گالری، انتخاب ۱۲۰/۲۴۰/۳۶۰ لیبلی و quantity؛ O1/O2/O6/O8 | درستی محتوای تجاری، approved inventory یا قیمت از همان UI ثابت نمی‌شود |
| configuration | کنترل‌های package/quantity واقعی‌اند؛ editor/upload قابل استفاده در صفحات مهمانِ قبلاً بررسی‌شده کشف نشد؛ لینک درخواست در DOM مخفی بود | نبود customization برای همهٔ محصول‌ها/نقش‌ها/مرحله‌ها ثابت نشده؛ J04 conditional است |
| gallery | dialog واقعی با next/previous/tab و close/Escape در O7؛ branch مستقلِ غایب از ۱۵ تست اولیه | focus-return، focus trap، wrap انتهای تصاویر، معنا/alt و AT کامل پوشش داده نشده‌اند |
| cart | فقط empty guest و لینک recovery→shop→product؛ محصول لینک `/cart` دارد | دیدن CTA یا رفتن مستقیم به cart، add/merge/item/totals را اثبات نمی‌کند |
| auth | فرم native موبایل بدون submit؛ direct `/checkout` مهمان خالی قبلاً به `/login?next=/checkout` رسید | رفتار empty-cart eligibility یا return بعد از login مصوب نیست؛ هیچ OTP یا customer session ساخته نشد |
| customer/delivery/review/submission | فقط عناوین مرحله‌ها قبلاً دیده شده‌اند؛ دسترسی عادی پایین‌دست فراهم نشده | field، postcode، fee، tax، order-creation boundary یا retention اختراع نشده است |
| payment/confirmation/details | provider/sandbox و سفارش مجاز عرضه نشده‌اند | هیچ success/failure/status/id/amount/order outcome یا authorization سمت سرور ثابت نشده است |

Inspection جدید با Chrome 157 و context مهمان جدا، خارج از session موجود Cypress انجام شد. `QA/Evidence/Ordering-Coverage-Audit-2026-11-14/OUTPUT_ROOT.json` probe و root را ثبت می‌کند؛ TEMP/TMP process و خروجی‌های artifact/download/trace زیر EZPost تنظیم شدند. root قدیمی MCP استفاده نشد. GET/HEAD/OPTIONS و تنها POST خواندنی quote مجاز بودند؛ cart/login/OTP/save/order/payment فعال نشدند. هیچ networking شرکت یا تنظیم سرور تغییر نکرد.

شواهد جدید: `discovery.json` (O6)، `recovery-discovery.json` و HTMLهای `gallery-*` / `quote-*` (O7)، `third-package.json` (O8). بازکردن dialog و تغییر ورودی محلی inspection است، نه اجرای spec. قطع q2 در O7 فقط با route مرورگر همان context انجام شد؛ q3 از سرور واقعی برگشت. fixture replay جدید package50/q2 نسخهٔ دقیق response قبلی است؛ schema یا مبلغ ساختگی ندارد.

نمونهٔ `zoom-escape` زودهنگام هنوز dialog را در snapshot داشت؛ بعد از انتظار semantic، `gallery-escape-ready` نبود dialog را ثبت کرد. نمونهٔ زودهنگام مبنای نتیجهٔ منفی قرار نگرفت. در شکست quote، input=2 با labels/amount قبلی باقی بود و alert نمایش داده شد؛ CTA فعال نشد و policy نمایش/قابلیت اقدام در failure هنوز معلوم نیست. این مشاهده نه order اشتباه را ثابت می‌کند و نه شدت defect را تعیین می‌کند. بعد از recovery هم toast قدیمی در capture باقی بود؛ چون policy expiry/clear نداریم، نبود toast assertion نشده است.

## جدول حالت و انتقال

در ستون «انتظار»، O فقط baseline است؛ Q یعنی انتظار پذیرش هنوز تصمیم نشده. همهٔ تست‌های اشاره‌شده تألیفی و NOT EXECUTED هستند. «بدون کد» هرگز به معنی نامربوط نیست.

| حالت شروع | اقدام/رویداد | حالت مورد انتظار / نوع | دادهٔ حفظ‌شده یا تغییرکرده | شاهد | تست یا خلأ |
|---|---|---|---|---|---|
| مهمان، catalog، بدون cart write | لینک کارت محصول | detail همان محصول / C+O | identity ثابت؛ route تغییر | O1 | P01-ORD01 |
| مهمان، detail اولیه | quote اولیه کامل | qty1/default یکتا، summary و presentation / O | هیچ cart/order ساخته نمی‌شود | O2/O6 | P03-ORD04 و helperها |
| default/q2 | alternate→سوم→default | همان qty2، package/labels جدید / C+O | qty حفظ، package/labels تغییر | O6/O8 | P03-ORD04 |
| detail/q1 | + و − | q2 سپس q1 با lower disabled / O | فقط انتخاب محلی و quote | O2 | P04-ORD01 |
| detail/q1 | ArrowUp و Tab | q2 همان package / O | quantity تغییر، identity ثابت | O6 | P04-ORD02، دو viewport |
| quantity معتبر | type/paste/blur مستقیم | Q: زمان اعمال و normalize/reject نامعلوم | raw/accepted value باید تفکیک شود | P04–P06/B03 | بدون کد؛ grammar/UX rule لازم |
| quantity نامعتبر/خالی | صفر، منفی، اعشاری، malformed، excessive | Q: reject/normalize/reset نامعلوم | هیچ حد پذیرش تجاری حدس زده نمی‌شود | B03 | بدون کد؛ جدول quantity زیر |
| محصول A با انتخاب تغییرکرده | رفتن B→Back/Forward/refresh | Q: جداسازی الزامی، reset/restore نامعلوم | association هر محصول باید درست؛ retention تصمیم‌نشده | P12/B04 | بدون کد؛ fixture B و policy لازم |
| تصویر اصلی | thumbnail با Enter | تصویر منتخب load شود / O | محصول/انتخاب ثابت | O2 | P02-ORD01 |
| گالری بسته | Enter trigger | dialog باز و close دارای focus / O | محصول/quantity ثابت | O7 | P02-ORD02، دو viewport |
| dialog باز | next/previous/tab2/close/reopen/Escape | تصویر/tab منطبق و dialog بسته / O | gallery تغییر؛ order configuration ثابت | O7 | P02-ORD02؛ wrap/trap/restore باز |
| quote q1 آماده | q2 pending، سپس q3 موفق، سپس q2 قدیمی | q3 نهایی باقی بماند / C | latest quantity/labels/presentation | O2/O5 | P10-ORD01، controlled |
| default/q2 pending | alternate/q2 موفق سپس default/q2 قدیمی | alternate نهایی باقی بماند / C | package identity با qty مشترک تفکیک | O2 | P10-ORD02، controlled |
| q1 آماده | q2 network error | O: alert و انتخاب۲؛ Q: CTA/old-price policy | product/package حفظ؛ مقدار۲ | O7 | P11-ORD01 فقط subset خطا |
| quote شکست‌خورده | انتخاب جدید q3 | q3 summary/presentation کامل / O | latest intent به۳ تغییر | O7 | P11-ORD01، controlled |
| quote pending/failed | timeout، latest failure، retry همان انتخاب | Q: feedback/readiness/retry واقعی | intent و آمادگی خرید باید تعریف شود | P10/P11/B06 | بدون کد؛ زیرمجموعهٔ قبلی این branchها را نمی‌پوشاند |
| مهمان cart خالی | recovery link | shop سپس محصول واقعی / O | cart mutation ندارد | O1/O2 | T01-ORD01، دو viewport |
| مهمان محصول انتخاب‌شده | add | Q: guest policy و exact handoff | product/package/qty/amount | P14/B05/B06 | بدون کد؛ write ممنوع و fixture امن غایب |
| customer، یک item | quantity update | Q: محدوده/total/repricing | line identity ثابت، qty/amount تغییر | T02/T03 | بدون کد؛ populated UI/model لازم |
| customer، چند item | حذف یکی/آخرین | Q: خط‌های دیگر ثابت، last→empty طبق UI واقعی | removal/remaining totals | T03 | بدون کد؛ controls/data امن غایب |
| guest/customer cart | reload/Back/Forward/login transition | Q: retention/merge/expiry | saved/unsaved data و ownership | T04/B04/B05 | بدون کد؛ policy و هر دو fixture |
| cart دارای item نامعتبر | unavailable/reprice پیش از checkout | Q: revalidate/disclose/acknowledge | item و مبلغ نهایی مجدداً ارزیابی | T05/P13 | بدون کد؛ controlled fixture/policy |
| درخواست cart/order | request-not-sent در برابر accepted-response-lost | Q: retry outcome قابل reconciliation | intentional repeat از duplicate جدا | T06/J02 | بدون کد؛ operation semantics/record مستقل |
| دو view مشترک | update/remove هم‌زمان | Q: conflict/merge rule | stale version و آخرین intent | T08 | بدون کد؛ multi-view capability و shared-state fixture |
| مهمان خالی/پُر، customer خالی/پُر | direct checkout یا Next واقعی | Q؛ فقط guest-empty direct redirect مشاهده شده | cart/role/return target | T07/N08/B02/B05 | جدول هشت‌ردیفی زیر؛ coverage واقعی نداریم |
| session منقضی، empty/populated | private access/submit برگشت‌خورده | Q: reauth/return/privacy | هیچ private state نباید به نقش نامجاز نشت کند | A10/B04 | بدون کد؛ ordinary session و expiry control |
| login خالی | invalid→HTML-format valid→incomplete→clear | native validity مطابق O؛ بدون submit | فقط field محلی | O4/O6 | A01-ORD02/04؛ server acceptance نیست |
| login خالی | Tab از input | submit فقط focus می‌گیرد / O | input خالی و no auth submission | O4 | A01-ORD03 |
| شماره/چالش امن | request/valid/wrong/expired/reused OTP/resend | Q: state machine چالش | identity/challenge/attempt count | A04–A08/B07 | بدون کد؛ screen و safe channel/TTL/lockout |
| ordinary login موفق | intended/invalid/external next | Q: allowed return و cart retention | identity و cart context | A09/B04/B05 | بدون کد؛ return-policy/session واقعی |
| فرم مشتری اولیه/ویرایش‌شده | valid/invalid/incomplete→correct→review | Q: field rules و boundaries واقعی | address/customer/charges/intent | J01 | بدون کد؛ actual form و order boundary |
| review نهایی | submit loading/repeat/retry | Q: order واحد با outcome مستقل | order/cart/payment identity و amount | J02/T06 | بدون کد؛ sandbox و reconciliation؛ disabled کافی نیست |
| پرداخت شروع‌شده | success/fail/cancel/pending/unknown/timeout/return | Q: state طبق provider، بدون duplicate | charge/order/amount/currency | J02/B08 | بدون کد؛ تمام outcomeهای جدول زیر |
| پرداخت با نتیجه/return قطع‌شده | reload/delayed return/retry | Q: reconciliation و idempotency | همان intent به outcome معتبر متصل | J02 | بدون کد؛ observed approved records |
| نتیجهٔ پرداخت معتبر | confirmation فوری و cart بعد از order | Q: identity/status/amount و cart policy | submitted→charge→confirmation | J02 | بدون کد؛ این بخش primary J02 است |
| userA دارای order | history/details/tracking و resourceB | Q: owned view/عدم دسترسی نامجاز | ownership/status/fulfillment | J03/A12 | بدون کد؛ دو identity و owned fixtures |
| private state | logout/Back/cache/other-tab/user switch | Q: privacy/lifetime | هویت/دادهٔ قبلی نباید مبهم بماند | A10–A12 | بدون کد؛ policy و session/fixtures |

## جدول‌های تصمیم و انتخاب ترکیب‌ها

### eligibility — چهار ردیف اصلی و چهار extension بحرانی

هر ردیف دو entry مجزا دارد: direct navigation و فعال‌سازی Next واقعی. مشاهدهٔ یکی، دیگری یا policy مطلوب را ثابت نمی‌کند. M01/N08 مالک semantics لینک است و T07 مالک این تصمیم؛ assertion تکراری ساخته نشد. mock نقش، اثبات authorization سمت سرور نیست.

| ردیف | نقش | cart | direct مشاهده‌شده | Next مشاهده‌شده/مورد انتظار | معیار مطلوب | پوشش/پیش‌شرط |
|---|---|---|---|---|---|---|
| G-E | guest | empty | O: login با next=/checkout | policy تصمیم‌نشده | Q | بدون تست eligibility؛ B05 |
| G-P | guest | populated (one/multi) | نامعلوم | نامعلوم | Q | B05/B06، safe fixture |
| C-E | ordinary | empty | نامعلوم | نامعلوم | Q | B02/B05 |
| C-P | ordinary | populated (one/multi) | نامعلوم | نامعلوم | Q | B02/B05/B06 |
| X-E | expired | empty | نامعلوم | نامعلوم | Q | B02/B04، expiry capability |
| X-P | expired | populated | نامعلوم | نامعلوم | Q | B02/B04/B05/B06 |
| G-I | guest | invalid/unavailable item | نامعلوم | نامعلوم | Q | availability/reprice fixture و gating policy |
| C-I | ordinary | invalid/unavailable item | نامعلوم | نامعلوم | Q | همان + ordinary identity |

هیچ ردیفی حذف یا N/A نشده است. ۸ از ۸ وضعیت تصمیم مستند است؛ این کسر coverage اجرای محصول نیست. در حال حاضر هیچ‌کدام expected business outcome مصوب/اجرای ordering ندارد.

### انتخاب بستهٔ fixture فعلی — جدول کوچک قابل کدنویسی

| package در همین محصول | qty آزمون | labels مستقل از مبلغ | assertion | وضعیت |
|---|---:|---:|---|---|
| 49 / ۱۲۰ لیبلی | ۲ | ۲۴۰ | یکتایی گزینه، quantity/identity و summary | P03-ORD04؛ NOT EXECUTED |
| 50 / ۲۴۰ لیبلی | ۲ | ۴۸۰ | همان، پس از تغییر گزینه | P03-ORD04؛ NOT EXECUTED |
| 51 / ۳۶۰ لیبلی | ۲ | ۷۲۰ | همان، پاسخ O8 | P03-ORD04؛ NOT EXECUTED |

این جدول تمام سه گزینهٔ همین fixture در qty2 را طراحی/کد می‌کند؛ سایر محصول‌ها، تک‌گزینه‌ای و همهٔ quantityها denominator دیگری دارند و پوشش کامل ندارند.

### مقدار و قیمت — نتیجهٔ تجاری هنوز مرجع مستقل ندارد

| دستهٔ تصمیم/مرز | ردیف‌های لازم | وضعیت فعلی و dependency |
|---|---|---|
| quantity عادی | integer مجاز، default، +/−، keyboard، type/paste/blur | default/+−/ArrowUp نمونهٔ O؛ type/paste و grammar B03 باز |
| حد پایین | min−1/min/min+1، صفر، منفی | min attribute و ۱→۲→۱ فقط baseline؛ approved min و invalid action معلوم نیست |
| حد بالا | max−1/max/max+1 و مقدار بسیار بزرگ | صرفاً max=50 attribute دیده شده؛ enforcement/UI/server boundary تست نشده؛ B03 |
| numeric grammar | decimal، خالی، malformed، exponent اگر قابل ورود باشد | native refusal از application rejection جدا؛ normalization/feedback نیاز تصمیم |
| localization | Latin/Persian/Arabic-Indic/mixed، whitespace و leading zeros | acceptance و normalization B03؛ A01 native pattern معادل این تصمیم تجاری نیست |
| tiers هر بسته | برای **هر** threshold مصوب t: t−1/t/t+1 و min/max | schedule نسخه‌دار مستقل نداریم؛ q1/q2/q3 پوشش همهٔ tierها نیست |
| بدون tier و copy | no-discount محصول/گزینه و ادعای راهنمای تخفیف | نبود next-tier hint اثبات no-tier نیست؛ fixture/قاعدهٔ B03 |
| rounding و unit | per-label/unit/line، round-before/after، precision، currency/tax/fee | فقط presentation ریال و glyph/grouping فارسی کد دارد؛ محاسبهٔ مستقل پوشش ندارد |
| repricing و chain مالی | product→cart→review→submitted→gateway→confirmation | schedule و safe fixtures و authoritative records لازم؛ compare با همان پاسخ/UI oracle مستقل نیست |

### outcomeهای OTP و پرداخت — ثبت صریح تمام ردیف‌های کوچک بحرانی

| حوزه | ردیف تصمیم | آنچه برای assertion دقیق کم است | کد/اجرا |
|---|---|---|---|
| OTP | valid fresh | screen واقعی، length و challenge scope، identity امن | بدون کد / NOT EXECUTED |
| OTP | wrong/empty/malformed | validation و safe attempt/lockout limits | بدون کد / NOT EXECUTED |
| OTP | expired | TTL و expiry capability امن | بدون کد / NOT EXECUTED |
| OTP | reused | reuse/challenge rule و identity اختصاصی | بدون کد / NOT EXECUTED |
| OTP | resend/cooldown | وجود control، زمان/قاعده و validity کد قبلی | بدون کد / NOT EXECUTED |
| OTP | delivery/lost response | کانال امن و retry/cost rule | بدون کد / NOT EXECUTED |
| Payment | success | sandbox رسمی، outcome و record مستقل، order timing | بدون کد / NOT EXECUTED |
| Payment | failure | provider failure contract و اثر روی order/cart | بدون کد / NOT EXECUTED |
| Payment | cancellation | cancel/return contract و charge outcome | بدون کد / NOT EXECUTED |
| Payment | pending/unknown | status/reconciliation و polling/retry rule | بدون کد / NOT EXECUTED |
| Payment | timeout | boundary و unknown-outcome recovery contract | بدون کد / NOT EXECUTED |
| Payment | delayed/interrupted return | independent charge/order state و continuation policy | بدون کد / NOT EXECUTED |
| Payment | reload/repeated return | reconciliation و dedup oracle، نه صرف request count | بدون کد / NOT EXECUTED |
| Payment | retry | همان intent یا intent جدید، idempotency/charge/order rule | بدون کد / NOT EXECUTED |

برای ترکیب‌های بزرگ، اول همهٔ ردیف‌های critical role/cart، pricing threshold و provider outcome باید پس از رفع dependency طراحی شوند؛ pairwise جایگزین آن‌ها نیست. سپس pairwise برای browser×viewport×input method×product variant روی رفتارهای عمومیِ مستقل قابل استفاده است، با ردیف‌های هدفمند سه‌عاملی برای package×quantity×response-order، role×cart×session-expiry و payment-outcome×return-path×retry. این مأموریت فقط دو ترتیب race، یک failure→new-selection و دو viewport در subsetهای مشخص را انتخاب کرده است؛ suite تولید pairwise یا پوشش تمام زوج‌ها ادعا نمی‌شود. residualها: typed/pasted quantity، reload/back private data، multi-tab، ordinary/expired role، موجودی/قیمت تغییرکرده، browser/device/AT و همهٔ lower journeyهای بالا.

## یافته‌های assertion-level و اصلاح واقعی

| یافتهٔ مستقل | نتیجه/اقدام | محدودهٔ واقعی |
|---|---|---|
| feature موجودِ zoom در ۱۵ تست اولیه غایب بود | P02-ORD02، lifecycle/dialog/tab/close/Escape در دو viewport | source O7، بدون اختراع focus-return/trap |
| selected state اولیه و تغییر برگشتی/گزینهٔ سوم غایب بود | P03-ORD04، سه گزینه و بازگشت در qty2؛ P03-ORD03 selected state تقویت شد | همین fixture؛ تک‌گزینه‌ای/cross-product باز |
| دکمه‌های +/− جای keyboard input path را نمی‌گرفتند | P04-ORD02، ArrowUp/Tab در دو viewport | invalid/max/type/paste پوشش نشده |
| native invalid-only، correction تا native valid را نمی‌سنجید | A01-ORD04، invalid→format-valid→incomplete→empty | دادهٔ محلی ساختگی؛ هیچ هویت/پذیرش server/OTP |
| race فقط quantity بود | P10-ORD02، packageId+qty در gate/consumption، همراه final selected state برای P10-ORD01 | replay کنترل‌شده، نه real backend race |
| quote failure/recovery کاملاً غایب بود | P11-ORD01، alert مشاهده‌شده و recovery با انتخاب جدید | forceNetworkError محلی؛ retry همان انتخاب/timeout/real outage باز |
| P08 در سند قالب فارسی داشت، اما normalization آن را حذف می‌کرد | در P08-ORD01 glyph/grouping سه فیلد صریح اضافه شد | سه فیلد monetary، نه همهٔ tier/discount/next-tier schema |
| helperهای quote مقادیر همان response را با UI می‌سنجیدند | در matrix به عنوان integration/presentation طبقه‌بندی شد | هیچ independent monetary correctness از آن گزارش نمی‌شود |
| main/mobile دو مبلغ یکسان می‌توانند هر دو غلط باشند | scope همان UI consistency است؛ انتظار monetary render نیز جدا باقی ماند | صحت مالی هنوز صفر تست مستقل دارد |
| P01 و leg محصول در T01 همپوشانی دارند | حفظ شدند: starting state و recovery transition متفاوت است | duplicate صرف نیست؛ setup assertion شمارش requirement تازه نمی‌سازد |
| P08 replay و live helper assertion مشابه دارند | حفظ شدند: isolation presentation در برابر live integration | mock به عنوان backend E2E معرفی نمی‌شود |
| viewport variants state تجاری جدید نمی‌سازند | count تست از count case و role/cart جدا ثبت شد | desktop/narrow اثبات physical device یا Firefox نیست |
| confirmation فوری با details/history مخلوط شده بود | gap document اصلاح شد: confirmation/cart-after-order primary J02؛ details/tracking J03 | هیچ case ID/والد تست موجود عوض نشد |

هیچ تست خالی، blanket skip، force click، sleep ثابت، broad exception suppression یا fake success اضافه نشد. pending gapها فقط مستندند و success محسوب نمی‌شوند. hook P10 همچنان متکی به مسیر fetch/json مشاهده‌شده است؛ discard پیش از body-read یک پیش‌شرط instrumentation باز است و timeout آن bug خودکار نیست. ابتدا static design review انجام شده؛ runtime این hook هنوز با Cypress اجرا نشده است.

## فایل‌ها، بررسی static و preservation

تغییرات محدود به همین workspace است: سند کیس سفارش append/اصلاح شد؛ سه spec محصول/auth/controlled و helper ordering تقویت شدند؛ دو fixture audit از شواهد واقعی اضافه شد؛ checker محلی ordering برای inventory جدید و output جدید اصلاح شد؛ همین audit، matrix و پوشهٔ evidence جدید ساخته شدند. `cart-recovery.cy.js`، همهٔ M01، package/lock/config و support عمومی بدون تغییرند. گزارش implementation قبلی و evidenceهای تاریخی بازنویسی نشدند.

بررسی‌های static نهایی موفق بودند و نتیجهٔ دقیق در `QA/Evidence/Ordering-Coverage-Audit-2026-11-14/static-verification.json` ثبت شد. دستورهای بررسی، هیچ Cypress lifecycle یا journey اجرا نمی‌کنند:

```powershell
node .\scripts\check-ordering-static.cjs
npm.cmd run check:static
```

checker syntax با `node --check`، import و JSON، ۱۸ ID بدون حذف ۱۲ قبلی، source fixtureهای جدید، table widths/traceability و SHA-256 preservation را بررسی می‌کند. بررسی M01 نیز ۳۰ ID و هشت spec و config اصلی را کنترل می‌کند. lint/typecheck مستقل در package تنظیم نشده است؛ اجرای آن ادعا نمی‌شود. count پارامترسازی ۲۴ از بازبینی بدنهٔ چهار spec به دست آمده، نه اجرای تست‌ها. سه بررسی مجزا: inventory مستقل؛ assertion-level قبل/بعد توسط reviewer دیگر؛ reconciliation/static نهایی.

manifest پیش از این مأموریت ۴۰ فایل QA plans/cases/reports و Cypress/scripts/config/package را hash کرد: ۳۴ فایل hash یکسان ماندند و تفاوت‌ها فقط همان شش فایل مجاز بودند. مجموعهٔ ۲۹ فایل تاریخی اولیهٔ M01 نیز جداگانه یکسان ماند. هیچ application-facing Cypress command، login/OTP، cart write، account/order/payment، install، Git یا تغییر Tapin/Python/server انجام نشد. launcher قبلی اجرا نشد و پنجرهٔ قبلی M01 خودکار بسته یا rerun نشد.

## اولویت اجرای آینده، پس از فراهم‌شدن پیش‌شرط و درخواست جدا

| نوبت | اجرای هدف | آمادگی لازم / اثبات نتیجه |
|---|---|---|
| E01 | subsetهای live عمومی در Cypress تعاملی Windows/Chrome؛ سپس controlled جدا | کنترل تازگی fixtureها و root evidence، نشست guest جدا، ثبت application-opened/spec-loaded/tests-executed جدا؛ NOT EXECUTED فعلی تغییر نمی‌کند |
| E02 | quantity/pricing rule suite و همهٔ role/cartهای جدول | schedule مستقل، grammar و B02/B05/B06؛ عدم ارسال OTP/تغییر cart تا محیط/دادهٔ امن و مجوز مشخص |
| E03 | **یک مسیر موفق کامل:** product/package/qty→configuration اگر رسمی فعال است→cart exact lines→ordinary auth امن→actual delivery/customer fields→review→submit→official sandbox success→confirmation→owned details و cart state مصوب | هویت عادی اختصاصی، OTP-safe channel، populated fixtures/reset پشتیبانی‌شده، field/fee/range policy، order-creation boundary، sandbox رسمی و independent order/charge record؛ تطبیق product/options/qty/currency/amount در هر handoff؛ هنوز چنین journey کد/اجرا نشده |
| E04 | خطاهای مالی/duplicate: validation reject، double-submit، request-not-sent، accepted-response-lost، payment failure/cancel/pending/unknown/timeout و retry/delayed/repeated return | برای هر شاخه outcome رسمی و record مستقل؛ disabled CTA/request count اثبات عدم duplicate order/charge نیست؛ همهٔ ردیف‌ها قبل از sign-off reconcile شوند |
| E05 | session expiry/logout، ownership دو کاربر، unavailable/reprice، multi-view conflicts و interrupted returns | دو identity و orders مجاز، expiry/fault/price fixtures و privacy/conflict policy؛ بدون route scanning یا cookies شخصی/ادمین |
| E06 | تکرار scope تعریف‌شده در Firefox پشتیبانی‌شده و device/keyboard/AT/manual RTL/zoom | version/device/accessibility target مصوب، runtime سازگار و اجرای جدا؛ نتایج Firefox تاریخی M01 پوشش ordering نیستند؛ performance threshold جدا لازم |

برای E01 پس از مجوز آینده، installation/config موجود کافی است؛ launcher `open-ordering.cjs` specPattern را فقط برای همان process تغییر می‌دهد و evidence را زیر EZPost می‌گذارد:

```powershell
Set-Location -LiteralPath 'C:\Users\LOCAL_USER\Desktop\EZPost'
node .\scripts\open-ordering.cjs live
# نوبت جدا پس از حفظ نتیجه و آزادکردن پروژه در UI:
node .\scripts\open-ordering.cjs controlled
```

این دستورها در این مأموریت اجرا نشدند. انتخاب spec باید در Cypress E2E/Chrome انجام شود و نتیجهٔ واقعی پنجره/runner جدا تأیید شود؛ headless جایگزین نیست. execution آیندهٔ state-changing با این launcher خواندنی مجاز یا آماده اعلام نمی‌شود؛ support جهانی همچنان mutationها را می‌بندد.

تصمیم‌های واقعیِ باقی‌مانده: B03 قواعد/مرجع قیمت و مقدار؛ B04/B05 هویت/session/return/cart/eligibility/retention؛ B06 fixtures/fault/reset امن؛ B07 OTP-safe channel؛ B11 customization؛ J01 field/fee/order-boundary؛ B08 sandbox/reconciliation؛ B09 owned orders/privacy؛ B10 browser/device/accessibility targets. این کمبودها پوشش کامل سفارش را محدود می‌کنند، اما subsetهای مستقل مشخص بالا اکنون کد دارند.
