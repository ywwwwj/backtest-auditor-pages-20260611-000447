# Push To GitHub Pages Now

Date: 2026-06-10

Current local status:

```text
Git repo initialized.
Branch: main
Commit: f6cf4b8 Launch Backtest Auditor static site
GitHub Pages workflow exists: .github/workflows/pages.yml
Publish directory: deploy/
Remote: not set yet
```

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

## Enable Permanent Site

After push:

1. Open the GitHub repository.
2. Go to `Settings` -> `Pages`.
3. Under `Build and deployment`, choose `GitHub Actions`.
4. Open the `Actions` tab.
5. Wait for `Deploy static site to GitHub Pages` to finish.

Permanent site:

```text
https://<github-username>.github.io/<repo-name>/
```

Outreach landing page:

```text
https://<github-username>.github.io/<repo-name>/audit.html
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

## Important

GitHub Pages gives a permanent static site, but it does not store form submissions by itself.

If form submission fails, the page now shows a copyable fallback block. Ask prospects to send that block back in the same Reddit, QuantConnect, or TradingView thread/DM.
