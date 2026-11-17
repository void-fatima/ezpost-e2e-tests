# EZPost file migration manifest

Date: November 11, 2026 (America/Los_Angeles). Generated UTC: 2026-11-11T18:34:08.399Z.

Source: `C:\Users\LOCAL_USER\GitHub\tapin-wordpress-plugin`

Independent destination and future QA workspace: `C:\Users\LOCAL_USER\Desktop\EZPost`

Application under test: http://172.16.30.198:5800/. Future testing remains independent black-box E2E; no EZpost source code is available. No Cypress project was initialized or copied into this workspace.

## Discovery and ownership

Inspected filenames and content across the source workspace, including hidden/ignored local artifacts and release directories. Git metadata and third-party node_modules were excluded from content classification. The 973-file source fingerprint excludes .git directories and node_modules.

Confirmed EZpost files: two QA documents, eight existing Playwright YAML snapshots and seven existing console logs. Every copied artifact contains EZpost identity or the target origin. Existing artifacts were preserved as files only; they were not reproduced, interpreted as new test results, or used to revise QA content. No additional EZpost screenshot, video, HAR or report file was identified. Tapin documentation/media and release artifacts belong to the plugin.

The destination did not exist before this task. No destination file was overwritten. All source files remain in place.

## Counts

| Metric | Count |
|---|---:|
| Confirmed EZpost source files discovered | 17 |
| Newly copied | 17 |
| Verified by size, SHA-256 and direct byte comparison | 17 |
| Confirmed EZpost files skipped/unverified | 0 |
| Conflicts | 0 |
| Ownership-clarification items withheld | 4 (two files and two skill directories) |
| New migration-report files | 1, this manifest; not counted as a migrated source file |

## Per-file migration and SHA-256 verification

| File | Original Path | Destination Path | Source / destination bytes | Source SHA-256 | Destination SHA-256 | SHA-256 Match | Status |
|---|---|---|---|---|---|---|---|
| `EZPOST_QA_PHASE1_REVIEW.md` | `C:\Users\LOCAL_USER\GitHub\tapin-wordpress-plugin\EZPOST_QA_PHASE1_REVIEW.md` | `C:\Users\LOCAL_USER\Desktop\EZPost\QA\Planning\EZPOST_QA_PHASE1_REVIEW.md` | 96275 / 96275 | `bcab90dbf1f109f1982d0814c1674ed3cecfd650c6f9d668b87e539fb460a92d` | `bcab90dbf1f109f1982d0814c1674ed3cecfd650c6f9d668b87e539fb460a92d` | Yes | Copied; verified byte-for-byte |
| `EZPOST_QA_PHASE2_M01_TEST_CASES.md` | `C:\Users\LOCAL_USER\GitHub\tapin-wordpress-plugin\EZPOST_QA_PHASE2_M01_TEST_CASES.md` | `C:\Users\LOCAL_USER\Desktop\EZPost\QA\Test-Cases\EZPOST_QA_PHASE2_M01_TEST_CASES.md` | 111855 / 111855 | `143ad5a561cae7c9337600a84b5bc261305efbd3925b6adb9a2caf087ead5db6` | `143ad5a561cae7c9337600a84b5bc261305efbd3925b6adb9a2caf087ead5db6` | Yes | Copied; verified byte-for-byte |
| `.playwright-mcp/console-2026-11-10T21-04-53-869Z.log` | `C:\Users\LOCAL_USER\GitHub\tapin-wordpress-plugin\.playwright-mcp\console-2026-11-10T21-04-53-869Z.log` | `C:\Users\LOCAL_USER\Desktop\EZPost\QA\Evidence\.playwright-mcp\console-2026-11-10T21-04-53-869Z.log` | 273 / 273 | `2b52477e8458ec0f177ab5e3a01ad72f916607505b61ef716874021d1c71ac0d` | `2b52477e8458ec0f177ab5e3a01ad72f916607505b61ef716874021d1c71ac0d` | Yes | Copied; verified byte-for-byte |
| `.playwright-mcp/console-2026-11-10T21-06-50-180Z.log` | `C:\Users\LOCAL_USER\GitHub\tapin-wordpress-plugin\.playwright-mcp\console-2026-11-10T21-06-50-180Z.log` | `C:\Users\LOCAL_USER\Desktop\EZPost\QA\Evidence\.playwright-mcp\console-2026-11-10T21-06-50-180Z.log` | 273 / 273 | `8a20f159ddbd3a633fb214028a0fe6d301d350b5f3ab481926542f6853c48567` | `8a20f159ddbd3a633fb214028a0fe6d301d350b5f3ab481926542f6853c48567` | Yes | Copied; verified byte-for-byte |
| `.playwright-mcp/console-2026-11-10T21-07-05-432Z.log` | `C:\Users\LOCAL_USER\GitHub\tapin-wordpress-plugin\.playwright-mcp\console-2026-11-10T21-07-05-432Z.log` | `C:\Users\LOCAL_USER\Desktop\EZPost\QA\Evidence\.playwright-mcp\console-2026-11-10T21-07-05-432Z.log` | 3532 / 3532 | `ce76ab069818c8ee274fd3b70b5ed294931de9d9da5e28de56ad95410d188059` | `ce76ab069818c8ee274fd3b70b5ed294931de9d9da5e28de56ad95410d188059` | Yes | Copied; verified byte-for-byte |
| `.playwright-mcp/console-2026-11-10T21-07-12-960Z.log` | `C:\Users\LOCAL_USER\GitHub\tapin-wordpress-plugin\.playwright-mcp\console-2026-11-10T21-07-12-960Z.log` | `C:\Users\LOCAL_USER\Desktop\EZPost\QA\Evidence\.playwright-mcp\console-2026-11-10T21-07-12-960Z.log` | 273 / 273 | `32adc11f69996c1f37cb7edfac8a47e2aee8545520992cd5527c1fb4ccdbef4c` | `32adc11f69996c1f37cb7edfac8a47e2aee8545520992cd5527c1fb4ccdbef4c` | Yes | Copied; verified byte-for-byte |
| `.playwright-mcp/console-2026-11-10T21-07-30-610Z.log` | `C:\Users\LOCAL_USER\GitHub\tapin-wordpress-plugin\.playwright-mcp\console-2026-11-10T21-07-30-610Z.log` | `C:\Users\LOCAL_USER\Desktop\EZPost\QA\Evidence\.playwright-mcp\console-2026-11-10T21-07-30-610Z.log` | 1638 / 1638 | `d7bec917593c91edc60a7655214c3f92a2ab698e84dd2f4f759e9286a0eb1087` | `d7bec917593c91edc60a7655214c3f92a2ab698e84dd2f4f759e9286a0eb1087` | Yes | Copied; verified byte-for-byte |
| `.playwright-mcp/console-2026-11-10T21-07-42-984Z.log` | `C:\Users\LOCAL_USER\GitHub\tapin-wordpress-plugin\.playwright-mcp\console-2026-11-10T21-07-42-984Z.log` | `C:\Users\LOCAL_USER\Desktop\EZPost\QA\Evidence\.playwright-mcp\console-2026-11-10T21-07-42-984Z.log` | 546 / 546 | `35beba8c96e8109242d56652dc2d67d0b47ff5d779d5f17968e4833dcf1e362f` | `35beba8c96e8109242d56652dc2d67d0b47ff5d779d5f17968e4833dcf1e362f` | Yes | Copied; verified byte-for-byte |
| `.playwright-mcp/console-2026-11-10T21-08-48-788Z.log` | `C:\Users\LOCAL_USER\GitHub\tapin-wordpress-plugin\.playwright-mcp\console-2026-11-10T21-08-48-788Z.log` | `C:\Users\LOCAL_USER\Desktop\EZPost\QA\Evidence\.playwright-mcp\console-2026-11-10T21-08-48-788Z.log` | 1072 / 1072 | `84b3a126dc882afcca5e6ad7831edfe4d2dbbcbd0f6b11c89e0815271553a3af` | `84b3a126dc882afcca5e6ad7831edfe4d2dbbcbd0f6b11c89e0815271553a3af` | Yes | Copied; verified byte-for-byte |
| `.playwright-mcp/page-2026-11-10T21-04-55-602Z.yml` | `C:\Users\LOCAL_USER\GitHub\tapin-wordpress-plugin\.playwright-mcp\page-2026-11-10T21-04-55-602Z.yml` | `C:\Users\LOCAL_USER\Desktop\EZPost\QA\Evidence\.playwright-mcp\page-2026-11-10T21-04-55-602Z.yml` | 16984 / 16984 | `9c2fb3da7f33370f86d7e10df688fa2e45e8ced6a47a4cd670d02bd619518e2a` | `9c2fb3da7f33370f86d7e10df688fa2e45e8ced6a47a4cd670d02bd619518e2a` | Yes | Copied; verified byte-for-byte |
| `.playwright-mcp/page-2026-11-10T21-06-51-103Z.yml` | `C:\Users\LOCAL_USER\GitHub\tapin-wordpress-plugin\.playwright-mcp\page-2026-11-10T21-06-51-103Z.yml` | `C:\Users\LOCAL_USER\Desktop\EZPost\QA\Evidence\.playwright-mcp\page-2026-11-10T21-06-51-103Z.yml` | 6786 / 6786 | `f10f81bc1dfb58cd2b357301aa507ba05484bcc8098763991a330aa89f1c91c3` | `f10f81bc1dfb58cd2b357301aa507ba05484bcc8098763991a330aa89f1c91c3` | Yes | Copied; verified byte-for-byte |
| `.playwright-mcp/page-2026-11-10T21-07-05-652Z.yml` | `C:\Users\LOCAL_USER\GitHub\tapin-wordpress-plugin\.playwright-mcp\page-2026-11-10T21-07-05-652Z.yml` | `C:\Users\LOCAL_USER\Desktop\EZPost\QA\Evidence\.playwright-mcp\page-2026-11-10T21-07-05-652Z.yml` | 2005 / 2005 | `c8ff2e89fbbe6d278cf9935224a55ce83c50230d125fbd4370374089d244dec2` | `c8ff2e89fbbe6d278cf9935224a55ce83c50230d125fbd4370374089d244dec2` | Yes | Copied; verified byte-for-byte |
| `.playwright-mcp/page-2026-11-10T21-07-13-168Z.yml` | `C:\Users\LOCAL_USER\GitHub\tapin-wordpress-plugin\.playwright-mcp\page-2026-11-10T21-07-13-168Z.yml` | `C:\Users\LOCAL_USER\Desktop\EZPost\QA\Evidence\.playwright-mcp\page-2026-11-10T21-07-13-168Z.yml` | 2324 / 2324 | `9d250e2bece1de358966f591bc221e6130bac905f4869b6490bfe93ccfa2c9af` | `9d250e2bece1de358966f591bc221e6130bac905f4869b6490bfe93ccfa2c9af` | Yes | Copied; verified byte-for-byte |
| `.playwright-mcp/page-2026-11-10T21-07-30-850Z.yml` | `C:\Users\LOCAL_USER\GitHub\tapin-wordpress-plugin\.playwright-mcp\page-2026-11-10T21-07-30-850Z.yml` | `C:\Users\LOCAL_USER\Desktop\EZPost\QA\Evidence\.playwright-mcp\page-2026-11-10T21-07-30-850Z.yml` | 2324 / 2324 | `f02e8b27d529db4f0c69e6f882542395f3f6d3b9c81302f178edaccb224e95e7` | `f02e8b27d529db4f0c69e6f882542395f3f6d3b9c81302f178edaccb224e95e7` | Yes | Copied; verified byte-for-byte |
| `.playwright-mcp/page-2026-11-10T21-07-43-378Z.yml` | `C:\Users\LOCAL_USER\GitHub\tapin-wordpress-plugin\.playwright-mcp\page-2026-11-10T21-07-43-378Z.yml` | `C:\Users\LOCAL_USER\Desktop\EZPost\QA\Evidence\.playwright-mcp\page-2026-11-10T21-07-43-378Z.yml` | 17731 / 17731 | `0480490576e885a1faf08935f9435117eee407a98ddf8bc7e305118210fc1965` | `0480490576e885a1faf08935f9435117eee407a98ddf8bc7e305118210fc1965` | Yes | Copied; verified byte-for-byte |
| `.playwright-mcp/page-2026-11-10T21-08-31-396Z.yml` | `C:\Users\LOCAL_USER\GitHub\tapin-wordpress-plugin\.playwright-mcp\page-2026-11-10T21-08-31-396Z.yml` | `C:\Users\LOCAL_USER\Desktop\EZPost\QA\Evidence\.playwright-mcp\page-2026-11-10T21-08-31-396Z.yml` | 9299 / 9299 | `575c331677e584e2c7fb338c3b9e751b6381006c000e34011f70d79401d991c4` | `575c331677e584e2c7fb338c3b9e751b6381006c000e34011f70d79401d991c4` | Yes | Copied; verified byte-for-byte |
| `.playwright-mcp/page-2026-11-10T21-08-49-022Z.yml` | `C:\Users\LOCAL_USER\GitHub\tapin-wordpress-plugin\.playwright-mcp\page-2026-11-10T21-08-49-022Z.yml` | `C:\Users\LOCAL_USER\Desktop\EZPost\QA\Evidence\.playwright-mcp\page-2026-11-10T21-08-49-022Z.yml` | 6897 / 6897 | `decc258bb8755ed8eb284ec5185773aaeee64cb6049debd6cae4db96ea67b0a6` | `decc258bb8755ed8eb284ec5185773aaeee64cb6049debd6cae4db96ea67b0a6` | Yes | Copied; verified byte-for-byte |

## Destination structure

```text
EZPost/
  QA/
    Planning/
      EZPOST_QA_PHASE1_REVIEW.md
    Test-Cases/
      EZPOST_QA_PHASE2_M01_TEST_CASES.md
    Evidence/
      .playwright-mcp/
        8 page-*.yml snapshots
        7 console-*.log files
    Reports/
      MIGRATION_MANIFEST.md
```

The evidence filenames and their shared .playwright-mcp directory relationship are preserved. Documents were copied byte-for-byte: no link rewriting, scenario edits, ID changes, Markdown regeneration or content correction was performed. The new directory layout can leave historical workspace-relative references pointing to their old locations; they were deliberately not rewritten.

## Ownership clarification: not copied or changed

| Source item | Finding / reason for withholding |
|---|---|
| `cypress.config.js` | Generic Cypress scaffold with no EZpost baseUrl or project identity; ownership cannot be established. No Cypress configuration copied or initialized |
| `skills-lock.json` | Generic cypress-author/playwright-cli skill lock, no EZpost scope; potentially shared repository tooling |
| `.agents/skills/cypress-author/` | Generic Cypress instructions/resources, no EZpost-specific content; shared tooling ownership requires review |
| `.agents/skills/playwright-cli/` | Generic browser automation instructions/resources, no EZpost-specific content; shared tooling ownership requires review |

Tapin-owned package.json/package-lock.json, src, tests, scripts, assets, docs/media, plugin entry points and release artifacts were excluded. Test/planning words in filenames do not establish EZpost ownership. The entire plugin repository and node_modules were not copied.

## Source preservation and cleanup checkpoint

All 17 verified migration rows above are candidates for later source cleanup because they contain exclusively EZpost documents/evidence. This is a candidate list, not authorization to remove them. No original file has been deleted or moved. Before any later deletion, obtain explicit user approval and recheck hashes, references, ownership and whether another workflow is using them. Do not delete an entire shared directory merely because these listed files were approved. The four ambiguous items above are not deletion candidates.

Source fingerprint before: `d28f8b7876a60bb761ed3534067f4db531a84cb94093f3a93e3941d02adf0067`.

Source fingerprint after: `d28f8b7876a60bb761ed3534067f4db531a84cb94093f3a93e3941d02adf0067`.

The fingerprint covers all 973 ordinary source-workspace files outside .git directories/node_modules, including plugin source, existing QA documents and local artifacts; file paths, sizes and SHA-256 values match. No symbolic links were followed. No Tapin source or existing QA content changed. Git status was read only; no stage, commit, push, checkout, reset or Git-history operation was performed. No packages, Cypress/test scripts, browser sessions, application requests, SMS, orders, payments or new QA module work occurred.

STOP: copying and verification are complete. Source cleanup remains pending explicit user approval. Future QA work should use `C:\Users\LOCAL_USER\Desktop\EZPost`.
