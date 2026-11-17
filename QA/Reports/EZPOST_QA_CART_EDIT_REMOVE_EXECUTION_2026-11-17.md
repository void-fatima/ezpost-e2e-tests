# EZPost — اجرای ویرایش، حذف و بازیابی سبد، ۱۷ نوامبر ۲۰۲۶

چهار تست `CART-E01…E04` در `cypress/e2e/cart/cart-edit-remove.cy.js` پیاده‌سازی و در Cypress visible اجرا شدند. آخرین اجرای کامل Chrome **۳ PASS / ۱ FAIL** است: E01 پیش از action اصلی ویرایش، منتظر quote محصول دوم ماند و request متناظر طی۵ثانیه مشاهده نشد؛ E02…E04 پاس شدند. آخرین اجرای Firefox همان نسخهٔ کد **۴ PASS / ۰ FAIL** است. در هر مرورگر pending/skipped/not-run صفر و cleanup هر چهار تست تأیید شد. این گزارش از launch یا static، PASS برنامه نمی‌سازد.

این batch پس از انتشار handoff آغاز شد: commit شاخهٔ `test/cart-handoff` برابر `f10ce157c9165e935effb4d3d9bf87a771425b9a` و merge به remote main برابر `34a56d654e3217d8e0fa5b97bc28cadcc1771146` بود. شاخهٔ فعلی این batch، `test/cart-edit-remove`، از همان baseline شروع شده است. [گزارش منتشرشدهٔ handoff](EZPOST_QA_CART_HANDOFF_EXECUTION_2026-11-17.md) و result JSONهای آن تغییر نکرده‌اند؛ فقط log Firefox همان batch هنگام بستن برنامه چهار خط shutdown/EPERM به‌طور طبیعی append کرده که حفظ شده است.

## قرارداد و پوشش واقعی

Workspace فقط `C:\Users\LOCAL_USER\Desktop\EZPost`؛ برنامه `http://172.16.30.198:5800/`. مجوز شامل اقلام suite در guest تازه و empty تأییدشده است. cleanup فقط Remove عادیِ اقلام احراز‌شدهٔ همان تست است. guard موجود تغییر نکرده؛ OTP، account، checkout submission، order/payment و application source خارج‌اند. dependency نصب یا عوض نشده است.

| ID / mapping اصلی | شروع و اقدام مستقل | observable contract و رفتار نادرستِ ردشدنی |
|---|---|---|
| CART-E01 → T03/T02، CART-04/03 | BlackFriday120/q2 + Simple25/q1؛ visible + روی BlackFriday به۳ سپس − به۲ | در هر checkpoint همان product/name/slug/labels و quantity جدید؛ Simple دقیقاً حفظ؛ summary تعداد بسته۴ سپس۳؛ مبلغ presentation از quote دقیق همان action. wrong line، جهش دو واحد، variant change، lost-other و stale amount نباید پاس شوند |
| CART-E02 → T03/T02، CART-04/03 | هر دو محصول بالا را می‌سازد؛ Remove فقط BlackFriday | target absent؛ Simple25/q1 با هویت و amount transfer درست؛ summary1؛ حذف همه/قلم اشتباه یا تغییر unaffected رد می‌شود |
| CART-E03 → T03/T01، CART-04/01 | Simple25/q1 را می‌سازد؛ Remove آخرین قلم؛ recovery واقعی «انتخاب بسته»→shop→Simple | zero item و empty visible؛ اگر summary صریح تعداد بسته visible باشد، باید صفر باشد؛ recovery href و aria-label واقعی، destination/H1، quote correlatedq1 و selection/CTA آماده؛ پیش از Add متوقف می‌شود |
| CART-E04 → T03/U01/U03، CART-04 | viewport390×844؛ mobile Add واقعی BlackFriday240/q2؛ visible + به۳ و − به۲ | همان product/package association و quantity۳ سپس۲، summary۳ سپس۲ و amount presentation؛ بدون hidden select یا force؛ cleanup عادی |

انتظار quantity/composition از intent ازپیش‌مشخص و fixture محصول مستقل از cart می‌آید؛ قیمت از schedule مستقل تصویب نشده است. quote↔cart فقط presentation consistency است. cart عدد visible total-label یا package_id ارائه نمی‌کند؛ assertion روی labels **در هر بسته** و quantity است. badge unit، merge/repeat policy و business max از UI فعلی حدس زده نشده‌اند.

## اجرای visible و تلاش‌های حفظ‌شده

Cypress موجود **16.2.1**؛ Chrome **157.0.8103.78**؛ Firefox موجود **160.0**. launcher، `cypress.config.cjs` و support موجود را با spec override و `watchForFileChanges:false` استفاده می‌کند. هر run directory مستقل زیر `QA/Evidence/Cart-Cypress/2026-11-17/` است؛ profile/runtime ignored می‌مانند. application-opened، spec-loaded و tests-executed از `runner-connected.json`، `spec-loaded.json` و end state واقعی runner جدا بررسی می‌شوند؛ headless استفاده نشده است.

فرمان‌های ثبت‌شده تا این checkpoint:

```text
node scripts/open-cart.cjs edit-remove chrome initial
node scripts/open-cart.cjs edit-remove chrome reviewed-final
node scripts/open-cart.cjs edit-remove firefox reviewed-final
```

هر فرمان، project-local Cypress را با `open --e2e --browser chrome|firefox --project <EZPost> --config-file cypress.config.cjs` فراخوانده است؛ آرگومان دقیق در `launch.json` همان تلاش است. ابزار UI سپس spec واقعی را در runner visible انتخاب کرده است. نام directory شامل «final» به‌تنهایی به معنی اجرای بی‌خطا یا آخرین نتیجهٔ قطعی نیست.

| تلاش / browser | app-opened / spec-loaded / tests-executed | PASS | FAIL | pending | skipped عمدی | not-run | evidence و نتیجهٔ دقیق |
|---|---|---:|---:|---:|---:|---:|---|
| `edit-remove-chrome-initial` | بله / بله / هر۴case | 2 | 2 | 0 | 0 | 0 | raw18292؛ E01/E02 PASS؛ E03 انتظار نادرست text روی overlay link؛ E04 body صحیح ولی cleanup hook FAIL. raw stats passes3/failures2 است؛ outcome نهایی چهار case به۲/۲ normalize شده، دادهٔ خام حفظ است |
| `edit-remove-chrome-reviewed-final` | بله / بله / هر۴case | 3 | 1 | 0 | 0 | 0 | raw16172؛ E01 انتظار quote محصول دوم timeout؛ E02/E03/E04 PASS؛ cleanup هر۴verified |
| `edit-remove-firefox-reviewed-final` | بله / بله / هر۴case | 4 | 0 | 0 | 0 | 0 | raw1748؛ E01…E04 PASS و cleanup هر۴verified؛ همان نسخهٔ جاری کد |

آخرین اجرای Chrome موجود: start15:54:35.816Z، end15:55:34.360Z. E01 در همان attempt به ویرایش +/− نرسید؛ بنابراین pass قدیمی E01 را جایگزین این failure نمی‌کنیم. E01 اولیه در نسخهٔ پیش از hardening action ویرایش را اجرا و snapshotهای quantity۲→۳→۲ با Simple دست‌نخورده ثبت کرد؛ آن شواهد به‌عنوان اجرای قبلی حفظ‌اند، نه آخرین outcome. Hهای batch اول پس از تغییرهای cleanup/readiness/amount در helper مشترک rerun نشده‌اند؛ pass قبلی آنها اجرای نسخهٔ جدید محسوب نمی‌شود.

Firefox نهایی: start15:57:41.795Z، end15:58:25.355Z؛ هر چهار ID و تمام assertions اصلی از جمله E01 دو محصول و تغییر۲→۳→۲ اجرا شدند. آخرین نتایج هر batch با محدودیت نسخهٔ کد، در Chrome مجموع H۴PASS + E۳PASS/۱FAIL یعنی۷PASS/۱FAIL و درFirefox H۴PASS + E۴PASS یعنی۸PASS/۰FAIL است. این اعداد۱۶ اجرای browser روی۸ID در دو batch هستند، نه rerun یک suite یکسان در آخرین commit یا کامل‌شدن والدها.

## failures و اصلاح محدود ابزار

| رخداد | assertion / شاهد | تشخیص و اصلاح محدود |
|---|---|---|
| E03 initial، test defect | `expected '<a.product-card__hit-target>' to contain text 'طرح ساده', but the text was ''`؛ URL shop | inspection واقعی `recovery-card-link.json` نشان داد overlay link متن ندارد و `aria-label="مشاهدهٔ طرح ساده"` دارد. اکنون href+aria-label واقعی و پس از click pathname/H1/quote/selection همان محصول بررسی می‌شود؛ identity حذف نشده و current destination به business policy تازه تبدیل نشده است |
| E04 initial، cleanup readiness | `Expected to find element: main .commerce-empty, main [data-cy="cart-item"], but never found it` در afterEach؛ body snapshotهای۲→۳→۲ موفق‌اند | cleanup اکنون پس از visit، GETsession تازه و user=null را انتظار می‌کشد، سپس state rendered واقعی را بررسی می‌کند؛ بدون افزایش timeout یا storage reset. failure اولیه preserved؛ manual recovery فقط BlackFriday240/q2، guestnull، before1→after0 و empty را ثبت کرد |
| E01 reviewed، unresolved execution prerequisite | `cy.wait()` برای `cartSelectionQuote2` طی5000ms هیچ request مشاهده نکرد؛ انتظار quote در setup محصول دوم، پیش از edit | نه timeout افزایش یافته، نه موفقیت ساختگی ساخته شده. این evidence به‌تنهایی علت نبود request یا application defect را ثابت نمی‌کند؛ test/setup/environment باید از network/DOM همان attempt تفکیک شود. cleanup owned BlackFriday120 verified |

critical review یک false-pass احتمالی مستقل پیدا کرد: اگر `line_total_irr` غایب بود، مقدار `amount:undefined` می‌توانست شرط قدیمیِ optional amount را دور بزند. validator اکنون وجود property `amount` را از نبود آن جدا می‌کند و مقدار supplied را safe integer غیرمنفی می‌خواهد؛ پاسخ edit نیز همان field را صریح validate می‌کند. دو negative control جدید نشان می‌دهند undefined/NaN دیگر money assertion را خاموش نمی‌کنند. قیمت درست مستقل از این بررسی نتیجه نمی‌شود.

empty check همیشه item absence و empty visible را assert می‌کند. فقط اگر summary با واحد صریح تعداد بسته واقعاً visible باشد، مقدارش باید صفر باشد؛ نبود summary روی empty، skipِ assertion اصلی نیست. معنای badge هدر هنوز نامعلوم است و coverage claim ندارد.

## static، بازبینی و cleanup

| بررسی واقعاً اجراشده | نتیجه و حد آن |
|---|---|
| `npm.cmd run check:static` | PASS؛۲۹JS/۸JSON، حفظ۳۰M01 ID؛ application اجرا نمی‌کند |
| `node scripts/check-cart-static.cjs` | PASS؛ آخرین بررسی۱۸file،۲cart spec،۸ID (۴H+۴E)، mutation guard unchanged و صفر application request از این check |
| `node scripts/check-cart-contract.cjs` | PASS؛۲positive و۱۵negative علیه همان validator مورد استفادهٔ DOM؛ NOT application E2E |

negative controls، wrong slug/name/labels/quantity، aggregate غلط، configuration missing/extra، duplicate aggregate، stale amount، removed target هنوز حاضر، unaffected مفقود، empty همراه populated، destination غلط و amount undefined/NaN را رد می‌کنند. اینها مکمل assertions live هستند و نتیجهٔ browser محسوب نمی‌شوند. سؤال بازبینی دوم «آیا broken behavior می‌تواند با وجود ادعا پاس شود؟» به تقویت amount gate و نگه‌داشتن assertions atomic همهٔ اقلام منجر شد؛ ادعای صفر false-positive ممکن ارائه نمی‌شود.

cleanup نهاییِ هر چهار تست Chrome reviewed مقدار `verified-empty-after-normal-remove` و `storageResetUsed:false` دارد؛ E01 شکست‌خورده فقط همان قلم ساخته‌شده را cleanup کرده است. after-test DOM ممکن است به `about:blank` رفته باشد؛ empty claim از assertions خود cleanup و checkpoint آن می‌آید، نه blank page. manual recovery اولیه جدا و با همان مرز مالکیت ثبت شده است.

Firefox نهایی نیز برای هر چهار ID همان cleanup verified و `storageResetUsed:false` را ثبت کرده است؛ بنابراین هر هشت اجرای نهایی این batch، شامل E01 شکست‌خوردهٔ Chrome، cleanup تأییدشده دارند. تفاوت pass مرورگرها علت timeout Chrome را اثبات یا حذف نمی‌کند.

شواهد اصلی:

- [Chrome اولیه raw18292](../Evidence/Cart-Cypress/2026-11-17/edit-remove-chrome-initial/visible-results-18292.json)، [failureE03](../Evidence/Cart-Cypress/2026-11-17/edit-remove-chrome-initial/failure-18292-1.png)، [failureE04 cleanup](../Evidence/Cart-Cypress/2026-11-17/edit-remove-chrome-initial/failure-18292-2.png).
- [inspection overlay link](../Evidence/Cart-Cypress/2026-11-17/edit-remove-chrome-initial/recovery-card-link.json)، [manual cleanup عادی](../Evidence/Cart-Cypress/2026-11-17/edit-remove-chrome-initial/recovery-cleanup.json).
- [Chrome reviewed raw16172](../Evidence/Cart-Cypress/2026-11-17/edit-remove-chrome-reviewed-final/visible-results-16172.json)، [failure quote prerequisite](../Evidence/Cart-Cypress/2026-11-17/edit-remove-chrome-reviewed-final/failure-16172-1.png)، [runner screenshot](../Evidence/Cart-Cypress/2026-11-17/edit-remove-chrome-reviewed-final/runner-final-16172.png).
- [Firefox reviewed raw1748](../Evidence/Cart-Cypress/2026-11-17/edit-remove-firefox-reviewed-final/visible-results-1748.json) و [runner screenshot](../Evidence/Cart-Cypress/2026-11-17/edit-remove-firefox-reviewed-final/runner-final-1748.png).

## وضعیت باقیمانده و نشر

این batch subset واقعی edit/remove/recovery را اضافه کرده و wholesale deferral سبد نیست. repeated identical add/merge، badge unit، min/max/zero/negative/decimal/localized، persistence/guest-login merge، pending/failed Add، accepted-response-lost retry، changed-price/availability و multi-view conflict همچنان dependency دقیق inventory را دارند. empty recovery تا محصول select-ready می‌رود و پیش از Add تازه متوقف می‌شود؛ OTP/account/checkout/order/payment اجرا نشده است.

دو failure معتبر P10 بازند و rerun نشدند. landing/M01 rerun نشده و گزارش‌های تاریخی عوض نشده‌اند. هیچ app defect تازه صرفاً از شکست ابزار یا missing quote prerequisite اعلام نمی‌شود. commit/push/main-integration این batch تا این checkpoint **انجام‌شده گزارش نمی‌شود**؛ baseline و مجوز روشن‌اند، اما SHA تازه فقط پس از publication واقعی ثبت می‌شود.

audit پیش از staging batch دوم حدود۳MB و۹PNG را بررسی کرد؛ runtime/profile و state خصوصی منتشر نمی‌شوند و filter موجود مسیر local user را برای نسخهٔ عمومی sanitize می‌کند. پس از اجرا، CypressPID10056 و Firefox runnerPID4752 برای inspection باز نگه داشته شدند؛ Firefox شخصیPID14780 استفاده یا دستکاری نشد. [بررسی پنجرهٔ نهایی](../Evidence/Cart-Cypress/2026-11-17/edit-remove-firefox-reviewed-final/final-window-state.json) وجود پنجرهٔ visible را تأیید کرد؛ Windows در آن checkpoint foreground را false گزارش داد، بنابراین همیشه بالاتر بودن پنجره از سایر برنامه‌ها ادعا نمی‌شود. این state مشاهده‌شدهٔ پایان اجراست، نه تضمین دائمی زنده‌بودن فرایندها.
