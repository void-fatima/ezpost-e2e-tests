# Public publication manifest

Prepared on **2026-11-17** for the user-supplied public repository
https://github.com/void-fatima/ezpost-e2e-tests, default branch `main`.
The remote was empty when inspected; no existing remote commit was replaced.

## Scope and preservation

The pre-publication inventory contains **320 files / 37,614,454 bytes**,
excluding dependency/cache directories from detailed hashing. All 320
inventoried original files remain byte-for-byte unchanged locally, including
existing modifications and excluded runtime executables. No local file was
deleted, moved or replaced. The project is a new independent Git repository
at the EZPost root; it did not inherit parent or Tapin repository history.

All existing shareable specs, support, fixtures, commands, configuration, package
metadata, lockfile, QA documents, reports, console/snapshot evidence and historical
results are included at their existing relative paths. Runnable specs, support,
fixtures, configuration, package metadata and the lockfile are published with
their original bytes. New publication files are the root README, ignore and
attribute rules, the metadata sanitizer and this manifest.

No test, browser, application flow, dependency install/upgrade, order, payment,
SMS, call or email was executed as part of publication. The latest recorded
ordering execution remains **2026-11-14: 24 tests per browser, 22 passed and
2 failed**, with live and controlled scopes separated in the unchanged
[execution report](EZPOST_QA_ORDERING_EXECUTION_2026-11-14.md).

## Review and exact exclusions

Text review identified no high-confidence credentials, actual authentication
tokens/cookies, private keys or saved-session exports in the candidate files.
Public business contact values belong to the guest storefront contract and its
existing tests; they were not changed or replaced with invented expectations.
The application LAN address is the explicitly supplied configured target.

All **90 existing PNG files** were visually reviewed. Current images show
the guest storefront or dedicated Cypress runner; no unrelated personal account
or private-session screenshot was identified. Existing INVALID placeholders and
small black captures remain historical artifacts, not proof of a passing test.
No HAR, video, archive or database capture was identified among candidates.
Raw snapshot/console and result metadata were reviewed and account-path sanitized
where needed; no sensitive raw network capture is included.

Excluded originals remain local:

| Path | Reason |
|---|---|
| `node_modules/` | Installed dependencies; install from the lockfile |
| `.npm-cache/` | Local package cache |
| `.publication/` | Private inventories, contact sheets and review copies |
| `QA/Evidence/M01-Cypress/2026-11-14/controlled-firefox-initial/runtime/geckodriver.exe` | Downloaded browser-driver executable (4,075,136 bytes) |
| `QA/Evidence/M01-Cypress/2026-11-14/history-firefox-repro/runtime/geckodriver.exe` | Downloaded browser-driver executable (4,075,136 bytes) |
| `QA/Evidence/M01-Cypress/2026-11-14/safe-firefox-initial/runtime/geckodriver.exe` | Downloaded browser-driver executable (4,075,136 bytes) |
| `QA/Evidence/Ordering-Cypress/visible-1794688649725/chrome/runtime/geckodriver.exe` | Downloaded browser-driver executable (4,075,136 bytes) |

Precise runtime-directory rules in the root [.gitignore](../../.gitignore) also
exclude empty task-runtime folders and later transient files there. Credential
and browser-state filename guards protect future .env/key/profile/state files;
none of those files were found among current non-runtime candidates. QA, Evidence,
Reports, Markdown, JSON, fixtures and historical failures are not broadly ignored.

## Sanitized public copies without rewriting originals

The repository-local clean filter `ezpost-public` stores sanitized metadata
blobs at the **same Git paths**, preserving links and directory structure.
Private originals remain untouched in the original workspace. The filter is
restricted by [.gitattributes](../../.gitattributes) to documentation and
historical metadata. It replaces the local account component of Windows user
home paths with `LOCAL_USER`, handling escaped JSON paths and UTF-16LE BOM
files. It does not change outcomes, assertions, fixture values, response bodies,
test durations, timestamps, case IDs, or public storefront destinations.

There are **50 sanitized metadata files**. This table records both
the original private-file SHA-256 and the published-copy SHA-256. Original hash
manifests are preserved; public copies are not misrepresented as original bytes.

| File | Original local SHA-256 | Public-copy SHA-256 |
|---|---|---|
| `QA/Evidence/M01-Authoring-2026-11-11/OUTPUT_ROOT.json` | `49d0ce398ed2f14164bf74a66f952e09354f6d12bb9ec635b646761e54aadf52` | `35d84bc084ef81521b57ab33ffb1486ae10094373905fd5fa94ab447e8106834` |
| `QA/Evidence/M01-Cypress/2026-11-14/controlled-chrome-initial/results.json` | `602846df0269d78c9ae05f031890f367c3da3f95fbf224dc0e6e03be59e358e6` | `27e5800ef4d01d16103aa69d727e89958b4b28c110f7579d2c9faad89d4914b4` |
| `QA/Evidence/M01-Cypress/2026-11-14/controlled-firefox-initial/results.json` | `b87e4131a7309cecd749e7e65c176362372c9fff6c3df9b0b4c88866f9e8a121` | `56bd01901a98ca62559024d43104c0e58b21f54bad8386d34b15b42ee011e124` |
| `QA/Evidence/M01-Cypress/2026-11-14/execution-summary.json` | `d7a241eba92d420f565dd7699caaf63dacb5b0300b5f51673c4ed90073b9845d` | `3ee6ada8e4adea2c75e4576d554567d3b018ffe8919905f4d488e48eec39ac5c` |
| `QA/Evidence/M01-Cypress/2026-11-14/history-firefox-repro/results.json` | `ad8d57dd3f5142e2d18411e8a034542fdceb31e94c42c3ad4fce255222107143` | `0f255fb26c0d7862c054788788c09f969784fdcee1a70295956d33506e36add2` |
| `QA/Evidence/M01-Cypress/2026-11-14/inspection/baseline.json` | `93a555aec9301fed7af78d09cbff639a2149542e675165b266306b365baf48bc` | `55ce8c096eb840701ca756589bcb65ffb6cfd49f0fd65b1321ab5becec518741` |
| `QA/Evidence/M01-Cypress/2026-11-14/interactive-1794683210666/drive-runner.cjs` | `ba5b53070e0f93391b3d1226ffcf687e152b28bb73c8acb1711c81d62a0266a0` | `91af94e79a1391366b7ed8d743942204b93586394221001b11990c9ba7acd965` |
| `QA/Evidence/M01-Cypress/2026-11-14/interactive-1794683210666/launch.json` | `29c622ce3522f5ba6da36f2ce486e3fd634284041b8f7d789958e2e8e284e7d2` | `c2abd3696ece3001f373558446f7f20e8250c3899165c1234c1cdc2859a9dbdd` |
| `QA/Evidence/M01-Cypress/2026-11-14/safe-chrome-final/results.json` | `383c565412e8acae474d99cc900b2a241ee2fe6c236b1d32d567d456290223bf` | `196517f8db15be238c6fe42b37b409295ff34f7a6e6ee0a19f484285822cf6db` |
| `QA/Evidence/M01-Cypress/2026-11-14/safe-chrome-initial/results.json` | `941c049da0c82f6156d6bcb18f093330910191a25ef1c2ecc70871f3238e5a4d` | `03a6bcc4dd267ed2ae12c2e25841eac78ab6760db6f00c0190765a3ad672183a` |
| `QA/Evidence/M01-Cypress/2026-11-14/safe-firefox-initial/results.json` | `6d1f964ec736a48c81dc923673d611bbb3adfe7d99b17811872b09db9acf9dcd` | `fbf3e59f05e5da3b397666e3a1d58306dba627f712b5669fd9bb242c5ebebb69` |
| `QA/Evidence/M01-Cypress/2026-11-14/setup/controlled-chrome-initial.log` | `497728309d0f1b5b22d1cab53fbaf4e0f658b4f66a5872cdc4076009b93d2ed0` | `b1901b38dc8a6728ede3c244a5cac18905fd1c75e38090a4586112d4a491c715` |
| `QA/Evidence/M01-Cypress/2026-11-14/setup/controlled-firefox-initial.log` | `482c4e9915c591a0386b42587bccf2c335d391fa3bf38c1eb1cda3ee44ccc13f` | `9435169102d893f5b7b228917f425ea533412ac6f67524d6d3b9f1050ff1e0fc` |
| `QA/Evidence/M01-Cypress/2026-11-14/setup/cypress-verify.log` | `7fe3c8fb1f36ca41cf25a75fc9359ef434ce7107b171ce10f81e75e330954604` | `0e25c7400ef8fd939eaa9f99e569371a0bdeefc4edf5b8caebdbf7ed8fd2367a` |
| `QA/Evidence/M01-Cypress/2026-11-14/setup/history-firefox-repro.log` | `3d03f421fffa8740fa6c0956d827191cd894de34ff4d503ce3da6a59332db4e6` | `d5c78553a786d92451b4967ac07943dd90748e631f31157b9be941237f06b3f2` |
| `QA/Evidence/M01-Cypress/2026-11-14/setup/safe-chrome-final.log` | `619b4881df2e9a02ebf29c7ca7ecbebf33f25416f7255ec19fd86bd69e3f50b7` | `386500dbf5984b8784936621c2633de669a7c77a3b6bc0eee38a0a50895248ef` |
| `QA/Evidence/M01-Cypress/2026-11-14/setup/safe-chrome-initial.log` | `b8b11f76cbd7e24868cc31bc6b57bba52b23603399f09d48cf4e845979e94ead` | `9c899c84e9d53a833adeae8c5e68a8fe933f351cc95ef3460ef710d80f2f817c` |
| `QA/Evidence/M01-Cypress/2026-11-14/setup/safe-firefox-initial.log` | `d06a6a57291779af50148b300d5cf6241700699cf7c4c2c25ff63cbe623e491f` | `32c8b3407c741757c5602c9247b9ab92507b8fdf202c72a4639d16a9a0af35a0` |
| `QA/Evidence/M01-Cypress/2026-11-14/setup/smoke-chrome-initial.log` | `c1d3d0b27bbbd509a29315ab5eee9cf938c1ad35f9ed8a92643c5fd5fad325e2` | `195cca61213f3014145d2002a6febdfc882b4beb998643963173180bb0b08bb1` |
| `QA/Evidence/M01-Cypress/2026-11-14/setup/smoke-chrome-retry1.log` | `7f89eadfaaa4ef760a3e626e3bb6f4c6217ffc0ca6b9d476bdd4a76d73541aac` | `f90de8181e29fe28af1771584b332fbde74c7e843658fe99382b1b7bc0e0901e` |
| `QA/Evidence/M01-Cypress/2026-11-14/smoke-chrome-retry1/results.json` | `172d3c1bfba30be8fae75e6946ab020ab98c00cdda4ae68a93fc9922a460bf6d` | `7f18e220817d95d18b73f1557ebad87f5c34b9959ea2f51da2948f79b3bc9dd5` |
| `QA/Evidence/M01-Cypress/2026-11-14/verification.json` | `1613f48b64bb19c41288a77d93e9bac8bcfc43a7c86bc5341b495c8fd32ef07b` | `9bc5badac2da81372237e3bcc1ff1e508f882fa0e1a20ce5aaa8623a89332f2c` |
| `QA/Evidence/Ordering-Authoring-2026-11-14/OUTPUT_ROOT.json` | `3743489e3ddfdab6ec59fe4da1e794678181b3dde277e5684d5e019698c04ccb` | `c6f2ed4f6472ab71a7ac6cc41b2fe8e5a578632f799c0b90709ecd908e673f6d` |
| `QA/Evidence/Ordering-Authoring-2026-11-14/inspect-auth.cjs` | `6c2914948efa34e8f5b5562ee4cd012ef87a78d7c7aae955a63b397cefde9e5e` | `08466cc3dcfbb3e2f97de2e3aa146846034b231084313480287d5eaeb5890325` |
| `QA/Evidence/Ordering-Authoring-2026-11-14/inspect-public.cjs` | `bc80499a52f46e0744e2bb2d1ef3d994b953dad46600e172197c4a37feec280e` | `9a57d8fa7cac778c26ea09688881e50e783ad8d8f0cf407f536417761ab2e539` |
| `QA/Evidence/Ordering-Authoring-2026-11-14/inspect-selection.cjs` | `60ef8bd587d92d67504c7ea37330c93fe19d999fde312a59ab143182da4d29ae` | `e850a2ca9cd4b8dc5c31a6bb5393f357ba987dff284f192299cf283d2959053f` |
| `QA/Evidence/Ordering-Authoring-2026-11-14/inspect-transport.cjs` | `3f05fd96a48a1852498ce2851824833ccffa3b7db33980f0a36e96cbf3f78012` | `756ac9bcf0ac4448a44535f862adff51faa5567ccbfc3c01c6c110a5e40a1e63` |
| `QA/Evidence/Ordering-Coverage-Audit-2026-11-14/OUTPUT_ROOT.json` | `41a8a736fb33ce2e61d67c39b616e2e0364d59a760c3a3ec00fecca8c9f0bda5` | `4f56e1f52472cac6c1cc7f87b8736eaa696cafa71f4493108df17c7b91a0a8b1` |
| `QA/Evidence/Ordering-Coverage-Audit-2026-11-14/inspect-gaps.cjs` | `f1027df9b7bc513fd64589c01b81e948cc0869bab898844b0d44b06b0e4a0e34` | `d208e241731505d561a13805320324b69827f234e35023b8fed3405de99e4576` |
| `QA/Evidence/Ordering-Coverage-Audit-2026-11-14/inspect-recovery.cjs` | `0566cff6eee3355a82fc71e78c462aba1708eec36f5e7269b6b2e30455fd5ddd` | `ff070778af90f756476063eaed0d96e6286c8ff026036c66b4e89fad0f1893ea` |
| `QA/Evidence/Ordering-Coverage-Audit-2026-11-14/inspect-third-package.cjs` | `e99f3d52b4bad7581b5b39e275321fdf09484acbea247285da3be950886dc053` | `5b8fae9014c16b007d61c2c0ec405f0689ab9887e84fc34d32f703baac780e7e` |
| `QA/Evidence/Ordering-Cypress/CURRENT_VISIBLE_SESSION.json` | `05dd31657df05623d3eb3dcef709d2ccb0769758b21ae4d9b7ba666c445088d0` | `de6c4f4e1ff638ed745ae0441448b18e03a7e459b65e1840bc23da8aa3efac4d` |
| `QA/Evidence/Ordering-Cypress/visible-1794688649725/chrome/launch.json` | `b0509c98f3e189fe85acb920531d20e6b7247d30e9351c47c364b29e27cd73b9` | `203641b66efc95f8e3789e96a5dff1f6d31d9bd9da239a4e365fe6ad05785433` |
| `QA/Evidence/Ordering-Cypress/visible-1794688649725/diagnose-ui.cjs` | `b16bd06e6d741019e34d18f2de68a5f5f39c2a94000e6ddbb2e9a011ec4419e4` | `aad4a7b2cb17ca6cdbdc01faefbad35ebd2c3e237c01e6e6231e37086414f698` |
| `QA/Evidence/Ordering-Cypress/visible-1794688649725/drive-chrome.cjs` | `4d0bec93a2839ec04e1a62e428c25c0a6d19cd83cfbbf90ed1ca1db4677cdb68` | `48b25e783e1d5d368db0dc0cdebde1e97f2b16b4b4b08742a735aa40f14f29bf` |
| `QA/Evidence/Ordering-Cypress/visible-1794688649725/inspect-runner.cjs` | `a9a132865062093002f29eaf94749cce28aa9b2fba1d0ea2c55ae13b26a421b4` | `b713c49589d9b29152a184977ba5ad136b6ba351e767df94bce8a3b4e8839a75` |
| `QA/Evidence/Ordering-Cypress/visible-1794688649725/switch-firefox.cjs` | `a786043a11053db43333938f86b79996e48c4fa8ebb637d062146b27a773f407` | `ce4ec06a5f4c92d7e99d875d28ab536f5bc84710575762149f253dfa29b4f5d8` |
| `QA/Reports/EZPOST_QA_ORDERING_COVERAGE_AUDIT_2026-11-14.md` | `70d3e5122b268521049c0f969158cd8b25a8b138b99fd7a7fa0f9628d7896bca` | `a27de5cc2bb76eb6effb2a0fdd8ee591c50763dc79b95ba0751fa5732b968962` |
| `QA/Reports/EZPOST_QA_ORDERING_COVERAGE_MATRIX.md` | `2af828e2d47e836d2936f622a08feb1f7661d9cf77be23e2810735df5cc05521` | `d113141c5afbfcc02bd187d1727ec6ec936455b9cd385d8a6f2e9e76d06aa9c1` |
| `QA/Reports/EZPOST_QA_ORDERING_EXECUTION_2026-11-14.md` | `e1406cafaf0129631536c20b50cbb2ae28faec22ef994ad32cae9af1ebd4ca6a` | `009ccec384a114b3e23e799eaea8c256ae03d9266deaac66843bac5f2d1adc66` |
| `QA/Reports/EZPOST_QA_ORDERING_IMPLEMENTATION_2026-11-14.md` | `a185756e84e96aa751d1bb80b137293a7d763bfdbef9e5ead6ece27f6085ec43` | `5062114faaa2bae7d7a406b3f39e8308c666057e27000207e5054fc9ccd7db1a` |
| `QA/Reports/EZPOST_QA_PHASE2_M01_AUTOMATION_COVERAGE.md` | `079510e0e57891734571a844b32a4f83c6988194c9794c643b0ab95150337625` | `85511e6ebfa7faeb1e453f0757f01c82aed7c6d1411ec2db11d30b50df988c31` |
| `QA/Reports/EZPOST_QA_PHASE2_M01_CYPRESS_EXECUTION_2026-11-14.md` | `8eff2f46bac4b1ed79810b8c0213c54969cf8159e546f9f15c570b3c3145ea7f` | `976e90ba24817a78396187be281c0d063d898d9decfe960f301a65f00e2770b2` |
| `QA/Reports/EZPOST_QA_PHASE2_M01_DECISIONS.md` | `75d1d2367856c978e1b5ae083948548489113704034e0da6e5900ff7c68540fa` | `9cdb5538a6e5c1dbca73f09d712e199ac99a635d3293e4b6bd34e70bd36a3d13` |
| `QA/Reports/EZPOST_QA_PHASE2_M01_FINAL_REVIEW.md` | `bf68f5c0d6951cc9f9fc86dc66ea538413b11dcd5a404148a1faa791ce55d805` | `ea02eacae327d7b1d3928f6f78f3b0b262948c895f071460b6ed5065c89faa5c` |
| `QA/Reports/EZPOST_QA_PHASE2_M01_INTERACTIVE_EXECUTION_2026-11-14.md` | `2f9aa648162a9e82db9ebb4c212c8e043002542aabfbadc17f434534e187ab97` | `24d6c1ef6f28309befc295b751effe8d7d950ee765eaddc74c18d6548395395c` |
| `QA/Reports/M01-AUTHORING-STATIC-VERIFICATION.json` | `92a1f3f96a3fc241a4ae759e442011608d6224cb59887d622624ace2629cffed` | `f0ef83394cf53802307c3d4d4db9285d23fea885b992fccebec80557eab301b3` |
| `QA/Reports/MIGRATION_MANIFEST.md` | `e8b1d5ba8df1db1411cf7ac8aaa94a1cb2cef0901d05973b22dfad3e52228db1` | `97827b325f0e03f6908daea6c0b788340f1a9b208d033f3517924b25e326dd7c` |
| `QA/Test-Cases/EZPOST_QA_ORDERING_TEST_CASES.md` | `7d41ab60f7b6146f24f6d2c09a72f467fdfe64cbe505a8c5e8815427aba9067d` | `5a67465d7dff0df8b8ae355906c9dcaadf63f79012e27e704e0554b6f437b4f3` |
| `cypress/README.md` | `19abbaee9745b0d5b629d7218b55368f26038d0a70ff7b3d6af0ea357aa16c68` | `44fa45cff3448a05d27e116bdaf966883a65b2ad07f6d9af14960f9d7fb6d332` |

## Reproduction and static checks

The complete staged file list and every staged blob were reviewed before commit:
**321 files**, including all **316 shareable original files**, **90 PNGs**,
and five new publication files. Four runtime executables were excluded.
No staged file reaches GitHub's large-file limit; the staged payload is about
20.35 MiB. All 320 inventoried original local files retain their original hashes.

`npm.cmd run check:static` passed in the original workspace. The same static
checker also passed against a fresh private directory materialized from the
staged public blobs, without installing dependencies: 23 JavaScript files,
7 JSON files, 8 M01 specs and all 30 original M01 case IDs were checked.
Every staged blob matches its original bytes or its documented sanitized copy;
the staged credential/account-path review found no remaining flagged value.

`git diff --cached --check` was run over the full import. It reports **50
pre-existing whitespace/EOF warnings across 19 original files** (one historical
console log plus existing documents/configuration/test/support files). These
are preserved formatting artifacts, not newly introduced publication edits.
The whitespace check restricted to all five newly added publication files
passed. Original files were not reformatted to hide the full-import warnings.

Use the root [README](../../README.md) for lockfile installation, safe static
verification and the existing visible Cypress ordering commands. No browser
execution is implied by static success. The ordering launcher is required for
ordering discovery because the default configuration selects M01.

Historical preservation manifests intentionally retain original-file hashes.
The archival `scripts/check-ordering-static.cjs` verifies those original hashes
and writes old audit outputs; sanitization can invalidate that historical hash
comparison in a fresh public clone. Use `npm.cmd run check:static` for the
current static-only check; do not rewrite historical hashes/outcomes to hide
that limitation. Publication verifies the public blobs against the mapping above
and compares all original local hashes before and after preparation.

Local account paths in historical helper imports are redacted provenance and
are not portable commands. Use the root `scripts/` launchers rather than old
per-session inspection/driver helpers under Evidence. The Git clean-filter
configuration is repository-local; no global Git configuration was changed.
The commit author is the explicitly supplied **void fatima <vantafatima@gmail.com>**.
