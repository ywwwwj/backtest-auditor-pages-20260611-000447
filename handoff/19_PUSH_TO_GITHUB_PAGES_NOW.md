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

Public repository:

```text
https://github.com/ywwwwj/backtest-auditor-site
```

Public branch prepared for GitHub Pages:

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

Because GitHub API returned `401 Requires authentication` for Pages settings, enable Pages once from the GitHub web UI:

1. Open the GitHub repository.
2. Go to `Settings` -> `Pages`.
3. Under `Build and deployment`, choose `Deploy from a branch`.
4. Branch: `gh-pages`.
5. Folder: `/ (root)`.
6. Save.

Permanent site:

```text
https://ywwwwj.github.io/backtest-auditor-site/
```

Outreach landing page:

```text
https://ywwwwj.github.io/backtest-auditor-site/audit.html
```

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
powershell -ExecutionPolicy Bypass -File .\scripts\render-market-messages.ps1 -SiteUrl "https://ywwwwj.github.io/backtest-auditor-site"
```

This creates:

```text
handoff/20_READY_TO_SEND_MARKET_MESSAGES_FINAL.md
```

## Important

GitHub Pages gives a permanent static site, but it does not store form submissions by itself.

If form submission fails, the page now shows a copyable fallback block. Ask prospects to send that block back in the same Reddit, QuantConnect, or TradingView thread/DM.
