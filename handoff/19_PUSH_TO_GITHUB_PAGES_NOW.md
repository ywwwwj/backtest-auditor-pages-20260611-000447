# Push To GitHub Pages Now

Date: 2026-06-10

Current local status:

```text
Git repo initialized.
Branch: main
Latest commit: 647baf7 Add safe GitHub Pages helper scripts
GitHub Pages workflow exists: .github/workflows/pages.yml
Publish directory: deploy/
Remote: public deploy repo created separately at https://github.com/ywwwwj/backtest-auditor-site
```

## Current Public Deploy Repo

Previous public repository, kept separate and not used for this isolated launch:

```text
https://github.com/ywwwwj/backtest-auditor-site
```

Current isolated public repository for Backtest Auditor market validation:

```text
https://github.com/ywwwwj/backtest-auditor-pages-20260610
```

Current isolated GitHub Pages URL:

```text
https://ywwwwj.github.io/backtest-auditor-pages-20260610/
```

Current outreach landing page:

```text
https://ywwwwj.github.io/backtest-auditor-pages-20260610/audit.html
```

Public branch prepared for GitHub Pages in the isolated repo:

```text
gh-pages
```

The `gh-pages` branch contains the static site at the branch root:

```text
index.html
audit.html
app.html
methodology.html
payment.html
styles.css
script.js
lead-capture.js
```

Why this separate repo exists:

- It publishes only public site files.
- It does not expose internal `handoff/` notes, prospect trackers, or strategy documents.

## Fastest Path

1. Create a new empty GitHub repository.
2. Do not add README, .gitignore, or license on GitHub because the local repo already has files.
3. Copy the repo URL.

Then run:

```powershell
git remote add origin https://github.com/<github-username>/<repo-name>.git
git push -u origin main
```

If Git asks you to log in, use GitHub browser login or a personal access token.

If you already logged in through the browser, the only missing input is the new empty repository URL.

Or use the helper script:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\push-github-pages.ps1 -RepoUrl "https://github.com/<github-username>/<repo-name>.git"
```

Do not paste your GitHub password into scripts or terminal commands. If Git asks for credentials, use GitHub's browser login flow or a personal access token.

## Enable Permanent Site

The code has already been pushed to `https://github.com/ywwwwj/backtest-auditor-site`.

For the isolated repo `backtest-auditor-pages-20260610`, GitHub Pages is already enabled and built.

If Pages ever needs to be re-enabled manually:

1. Open the GitHub repository.
2. Go to `Settings` -> `Pages`.
3. Under `Build and deployment`, choose `Deploy from a branch`.
4. Branch: `gh-pages`.
5. Folder: `/ (root)`.
6. Save.

Permanent site:

```text
https://ywwwwj.github.io/backtest-auditor-pages-20260610/
```

Outreach landing page:

```text
https://ywwwwj.github.io/backtest-auditor-pages-20260610/audit.html
```

Second isolated Pages site created to avoid conflicts with another concurrent GitHub project:

```text
https://ywwwwj.github.io/backtest-auditor-pages-20260611-000447/
```

Second isolated outreach landing page:

```text
https://ywwwwj.github.io/backtest-auditor-pages-20260611-000447/audit.html
```

Repository:

```text
https://github.com/ywwwwj/backtest-auditor-pages-20260611-000447
```

Notes:

- This second repo contains only public static files from `deploy/`.
- It does not contain `handoff/`, prospect trackers, or internal project memory.
- `.nojekyll` is included so GitHub Pages serves it as a plain static site.
- Verified on 2026-06-11 local time: `/` and `/audit.html` both returned HTTP 200.
- Live customer-view QA fixes were pushed after testing:
  - added `favicon.svg`
  - fixed GitHub Pages payment redirect fallback
  - fixed mobile demo horizontal overflow
  - verified core assets and pages with `curl -L -I`

## After The Site Is Live

Open:

```text
handoff/17_READY_TO_SEND_MARKET_MESSAGES.md
```

Replace:

```text
SITE_URL
```

with:

```text
https://<github-username>.github.io/<repo-name>
```

Then send the first 5 market survey messages.

Or generate the final send file automatically:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\render-market-messages.ps1 -SiteUrl "https://<github-username>.github.io/<repo-name>"
```

For the current public deploy repo, run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\render-market-messages.ps1 -SiteUrl "https://ywwwwj.github.io/backtest-auditor-pages-20260610"
```

This creates:

```text
handoff/20_READY_TO_SEND_MARKET_MESSAGES_FINAL.md
```

## Important

GitHub Pages gives a permanent static site, but it does not store form submissions by itself.

If form submission fails, the page now shows a copyable fallback block. Ask prospects to send that block back in the same Reddit, QuantConnect, or TradingView thread/DM.
