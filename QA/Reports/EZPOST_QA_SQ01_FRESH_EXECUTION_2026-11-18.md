# SQ-01 — تلاش تازهٔ Chrome با guard اصلاح‌شده، ۱۸ نوامبر ۲۰۲۶

این گزارش فقط اجرای **`chrome-sq18b`** در workspace مستقل `C:\Users\LOCAL_USER\Desktop\EZPost` را ثبت می‌کند. یک تلاش تازه طبق مجوز کاربر انجام شد؛ اجرای قبلی `chrome-sq18a`، فایل‌های شواهد و latch آن دست‌نخورده‌اند. commit/push انجام نشد.

| نتیجهٔ مستقل | وضعیت واقعی |
|---|---|
| Cypress runner | **FAIL؛ صفر PASS / یک FAIL / صفر pending / صفر skipped / صفر notRun** |
| SQ-01 — مقایسهٔ fee، final total و ریال | **BLOCKED / NOT EVALUATED**؛ هیچ quote مجاز یا response shipping دریافت نشد و assertionهای نمایش اجرا نشدند. |
| بازگردانی سبد و draft | **VERIFIED**؛ یک Remove عادی فقط همان قلم proven-owned، بررسی هویت بعد Remove و baseline سبد/draft، سپس تأیید مستقل با سه GET. |
| آخرین assertion ایمنی hook | **FAIL** در `noForbiddenWriteAttempted`؛ این assertion به‌علت همان blocked operation شکست خورد. کل hook را PASS نمی‌نامیم. |

اولین علت رد این تلاش ثبت شده است: **`SHIPPING_POSTAL_NOT_LAST`**، عملیات **`shipping-quote`**، source برابر **`request`** و مرحلهٔ پیش از شکست **`awaiting-address`**. مطابق guard آرشیوشدهٔ همین run، هنگام درخواست شرط `lastPrivateEdit !== 'postal-code'` برقرار بوده است. یعنی guard آخرین input خصوصیِ trusted ثبت‌شده را postal-code ندیده است. دادهٔ خصوصی، مقدار متغیر آخرین فیلد و ترتیب کامل eventها صادر نشده‌اند؛ علت ایجاد این وضعیت در تعامل کاربر/مرورگر از این شواهد به‌تنهایی معلوم نیست. این شرط، محدودیت ابزارِ ورود دستی است و requirement محصول یا باگ تأییدشدهٔ shipping نیست.

**یک درخواست quote در middleware رد شد؛ صفر درخواست quote از guard عبور کرد، response صفر و retry صفر.** پس از رد، هیچ تلاش دیگری آغاز نشد؛ باقی‌بودن بودجه مجوز retry تلقی نشد. تعرفه طبق دستور کاربر مفروض و خارج از scope است.

## تأییدهای دستیِ دریافت‌شده پس از پایان run

پاسخ‌های handoff کاربر پس از پایان اجرا به گفتگو رسیدند: ورود در Chrome جدید و ورود اطلاعات خصوصی تأیید شد؛ کاربر همچنین در پاسخ وضعیتِ میانی اعلام کرد در حال تکمیل نشانی است و کدپستی را آخر وارد می‌کند، و دیدن همان پنجره را تأیید کرد. این موارد گزارش کاربر از مراحل دستی هستند و تأیید خودکار ترتیب رویدادهای DOM محسوب نمی‌شوند. کد ثبت‌شدهٔ guard همچنان فقط وضعیت tracker در لحظهٔ درخواست را ثابت می‌کند؛ اختلاف آن با ترتیب موردنظر کاربر، علت رویدادیِ اثبات‌شده ندارد و به‌معنای اثبات اشتباه کاربر نیست. نتیجهٔ runner، SQ-01 و cleanup تغییر نکردند و این پاسخ‌ها تلاش تازه‌ای را آغاز نمی‌کنند. هیچ مقدار خصوصی به این یادداشت افزوده نشد.

## محیط، مجوز و اجرا

[execution gate](../Evidence/SQ01-Live-2026-11-18/chrome-sq18b/execution-gate.json) مجوز یک تلاش با حداکثر یک quote واقعی شامل auto trigger، همان محیط و مقصد مجاز و تأیید تازهٔ single-writer تا پایان cleanup را ثبت می‌کند. سفارش، پرداخت، submit فرم و ذخیرهٔ نشانی در حساب مجاز نبودند و از guard عبور نکردند.

Cypress واقعی **`16.2.1`** و Chrome **`157.0.8103.79`** در حالت interactive با `isHeadless:false` اجرا شدند. application بازشدن، spec بارگذاری‌شدن و تست اجراشدن جداگانه در [خلاصهٔ اجرا](../Evidence/SQ01-Live-2026-11-18/chrome-sq18b/execution-summary.json) و [نتیجهٔ runner](../Evidence/SQ01-Live-2026-11-18/chrome-sq18b/driver-24160-1795033553255/shipping-quote-results.json) ثبت شده‌اند. بازهٔ واقعی تست `2026-11-18T20:26:03.073Z` تا `20:51:27.662Z` است؛ زمان‌ها UTC هستند و این مدت شامل مکث دستی است، نه اندازه‌گیری latency محصول.

فرمان‌های اجراشده از ریشهٔ EZPost:

```powershell
node scripts/open-shipping-quote.cjs sq18b --single-writer-confirmed --fresh-attempt
node scripts/drive-shipping-visible.cjs chrome QA/Evidence/SQ01-Live-2026-11-18/chrome-sq18b 64892 21788
```

launcher همان `cypress open --e2e --browser chrome` با config موجود را استفاده کرد؛ dependency نصب/ارتقا داده نشد. [اثبات پنجرهٔ نهایی](../Evidence/SQ01-Live-2026-11-18/chrome-sq18b/driver-24160-1795033553255/final-window.json) visible و foreground را true ثبت می‌کند. [نمونه‌های visibility](../Evidence/SQ01-Live-2026-11-18/chrome-sq18b/driver-24160-1795033553255/visibility-samples.json) یک فاصلهٔ نمونه‌برداری با `appVisible:false` نیز دارند؛ ادعای visibility پیوسته در تمام فاصله‌ها نداریم. برای تشخیص پنجرهٔ تازه، فقط عنوان سند runner به `EZPost - SQ-01 chrome-sq18b` تغییر داده و پنجره جلو آورده شد؛ فیلد یا state برنامه تزریق نشد. Cypress و Chrome پس از اجرا باز ماندند.

## پوشش واقعاً اجراشده

| مرحله | شواهد و حد ادعا |
|---|---|
| preflight محصول | یک GET عمومیِ تازه پاسخ۲۰۰ داد و package۶۳ با۱۴۰لیبل/۴برگ هنوز موجود بود؛ purchasability فقط از GET نتیجه‌گیری نشد. انتخاب و quote محصول و نام/تعداد/لیبل در سبد داخل تست هم بررسی شدند. |
| ورود | manual-assisted؛ کاربر شماره و OTP را مستقیم وارد کرد. یک OTP-start موفق و یک verify؛ resend و retry صفر. بررسی خودکار session و `/me` هویت عادی موردنظر را تأیید کرد. از شواهد sanitized معلوم نیست flow وارد حساب موجود شده یا حساب ساخته است. |
| baseline | مهمان تازه، سبد حساب اولیه خالی و draft نشانی/active-order در مرورگر غایب بودند. guard و reservation پیش از اولین visit نصب/اجرا شدند؛ baseline پیش از Add نیز مجدداً بررسی شد. |
| سبد نمونه | یک Add عادی برای package۶۳×۲؛ ownership با baseline، پاسخ موفق و single-writer برقرار شد. نام محصول، دو بسته،۱۴۰لیبل و presentation مقدار در سبد و checkout بررسی شدند. |
| مقصد | انتخاب استان تهران و شهر تهران در کنترل‌های واقعی تأیید شد؛ [booleanهای حفظ‌شدهٔ runtime](../Evidence/SQ01-Live-2026-11-18/chrome-sq18b/sanitized-retained-checks.json) آن را جدا ثبت می‌کنند. مقصد درخواستی همان نارمک بود و ورود دادهٔ خصوصی به کاربر سپرده شد. |
| هم‌بستگی quote با مقصد خصوصی | **اجرا نشد**؛ guard در شرط postal-last و پیش از مقایسهٔ body نشانی متوقف شد. از armed بودن مقصد، تطابق خصوصیِ request را نتیجه نمی‌گیریم. |
| quote و نمایش | درخواست shipping پیش از transport رد شد. `shipping_irr`، `total_irr` و واحد ریال روی response تازه بررسی نشدند؛ subtotal یا مبلغ قبلی به‌جای final total پذیرفته نشد. |
| cleanup | حذف همان قلم owned از UI، session و `/me` بعد حذف، سبد خالی اولیه و نبود دو draft تأیید شدند؛ recovery دستی نیاز نبود. |

## اولین رد و failureها

[اولین علت مستقل guard](../Evidence/SQ01-Live-2026-11-18/chrome-sq18b/driver-24160-1795033553255/first-guard-rejection.json) در `20:51:11.486Z` مشاهده و پیش از تغییر phase در حافظه ثبت شده بود:

| فیلد sanitized | مقدار |
|---|---|
| `reasonCode` | `SHIPPING_POSTAL_NOT_LAST` |
| `operation` / `source` | `shipping-quote` / `request` |
| `phase` قبل از شکست | `awaiting-address` |
| `quoteCount` | `0` |
| `destinationArmed` | `true` |
| `cartSnapshotPresent` | `true` |
| `ownershipEstablished` | `true` |
| `blockedMutation` | `true` |

[journal ردها](../Evidence/SQ01-Live-2026-11-18/chrome-sq18b/driver-24160-1795033553255/guard-rejections.json) فقط یک rejection دارد. [اولین main failure](../Evidence/SQ01-Live-2026-11-18/chrome-sq18b/driver-24160-1795033553255/first-main-failure.json) جدا حفظ شده: مسیر `/checkout`، فرم موجود، آخرین command مشاهده‌شده `wait`. observer عمومی هنوز `errorCode:null` داده، ولی sidecar اختصاصی guard کد و مرحلهٔ قبل از شکست را مستقل از آن نگه داشته است؛ از focus روی street-address برای حدس علت استفاده نمی‌کنیم.

[hook failure](../Evidence/SQ01-Live-2026-11-18/chrome-sq18b/driver-24160-1795033553255/first-hook-failure.json) جدا و پس از بررسی‌های موفق Remove/session/me/cart/draft رخ داده است. شرط `noForbiddenWriteAttempted` به‌علت `blockedMutations=1` false بود. بنابراین label خام `removing-owned` باقی ماند و به `restored` نرسید؛ این label را بازنویسی نکردیم و آن را شکست خودِ حذف معرفی نمی‌کنیم.

[تأیید مستقل restoration](../Evidence/SQ01-Live-2026-11-18/chrome-sq18b/independent-restoration.json) در `20:54:34.990Z` با سه GET تازهٔ `/api/v1/auth/session`، `/api/v1/auth/me` و `/api/v1/cart` ثبت شد. همان هویت عادی، سبد خالی اولیه، نبود draft نشانی و active-order و oracle ترکیبی restoration همگی true هستند. این بررسی هیچ quote یا mutation دیگری نفرستاد و FAIL اصلی را تغییر نداد.

## جداسازی تلاش تازه، بررسی محلی و حفظ تاریخچه

برای اجرای تازهٔ صریحاً مجاز، [launcher](../../scripts/open-shipping-quote.cjs) و [config](../../cypress.shipping.config.cjs) یک گزینهٔ محدودِ attempt اضافه دارند: `--fresh-attempt` مقدار validateشدهٔ `sq01AttemptLabel` را منتقل و reservation را زیر `.publication/private/sq01-live-2026-11-18/attempts/sq18b/run-reserved.json` ایجاد می‌کند. مسیر legacy بدون گزینه همان مسیر قبلی است؛ latch قدیمی reset یا overwrite نشده و latch تازه نیز پس از اجرا باقی است. reservation همچنان `wx`، retry صفر و file watching خاموش دارد. این تغییر سقف درخواست یا سایر guardها را باز نکرده است.

[checker محلیِ attempt](../../scripts/check-shipping-attempt.cjs)، با config و launcher واقعی داخل VM و filesystem/process ساختگی، **۲۸ سناریو/۲۰۱ assertion** را PASS کرد: مسیر legacy و تازه، EEXIST، label نامعتبر/مسیر traversal، خطای filesystem، runtime/config همسان، archive قبل از spawn و ممنوعیت retry. checker guard موجود۳۰سناریو/۱۸۹۴assertion/۲۴مقایسهٔ محدود و diagnostics۲۰مثبت/۲۲منفی نیز قبل از run PASS بودند. syntax launcher/config/checker و `git diff --check` بعد از اجرا PASS شدند. این‌ها بررسی محلی‌اند و در شمار یک تست live بالا حساب نشده‌اند؛ assertionها، timeoutها، spec، fixture و guard درخواست SQ-01 برای این تلاش تغییر نکردند.

source ID همین اجرا `d894ad0ab96f6fea71370ed2377390a54b894a14bb9fb4135403e15dbb1b957f` است. [manifest تازه](../Evidence/SQ01-Live-2026-11-18/chrome-sq18b/source-manifest.json) و [archive دقیق۴۱فایل](../Evidence/SQ01-Live-2026-11-18/chrome-sq18b/executed-source) پیش از اجرا ثبت شدند؛ [تطبیق پیش از handoff](../Evidence/SQ01-Live-2026-11-18/chrome-sq18b/source-archive-verification-before-handoff.json) و [source check قبل/بعد اجرا](../Evidence/SQ01-Live-2026-11-18/chrome-sq18b/driver-24160-1795033553255/source-checks.json) همسانی را تأیید می‌کنند. [تطبیق نهایی archive و۶۰فایل تاریخی](../Evidence/SQ01-Live-2026-11-18/chrome-sq18b/preservation-verification.json) و [بررسی‌های محلی پس از اجرا](../Evidence/SQ01-Live-2026-11-18/chrome-sq18b/post-run-static-checks.json) نیز ثبت شده‌اند.

`chrome-sq18a` همچنان **runner FAIL / SQ-01 BLOCKED** با **علت UNKNOWN** است؛ علت ثبت‌شدهٔ sq18b را به آن اجرا نسبت نمی‌دهیم. دو PASS هدفمند قبلی، failureهای تاریخی، `CF-INV01` و `P10-ORD01/02` حفظ شده‌اند. نشانی، گیرنده، شماره، OTP، cookie/token/session body، شناسهٔ خصوصی و screenshot/recording در evidence عمومی یا Git ثبت نشده‌اند؛ پروفایل خصوصی محلی و ignored است.

**نقطهٔ توقف:** همین یک تلاش تمام شد؛ هیچ retry، quote تازه، submit، ذخیرهٔ نشانی، order یا payment انجام نمی‌شود. cleanup تأیید شده و runner باز است. برای ادامهٔ احتمالی ابتدا باید روشن شود چرا شرط operational postal-last در لحظهٔ request برقرار نبود؛ اجرای تازه نیازمند دستور جداگانه است و این گزارش مجوز آن نیست.
