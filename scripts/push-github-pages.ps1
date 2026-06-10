param(
  [Parameter(Mandatory = $true)]
  [string]$RepoUrl
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath ".git")) {
  throw "This folder is not a Git repository. Run this from the Backtest Auditor project root."
}

if (-not (Test-Path -LiteralPath ".github/workflows/pages.yml")) {
  throw "Missing .github/workflows/pages.yml. GitHub Pages workflow is not configured."
}

if (-not (Test-Path -LiteralPath "deploy/audit.html")) {
  throw "Missing deploy/audit.html. Publish directory is not ready."
}

$existingOrigin = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0 -and $existingOrigin) {
  git remote set-url origin $RepoUrl
} else {
  git remote add origin $RepoUrl
}

git branch -M main
git push -u origin main

$pagesUrl = $null
if ($RepoUrl -match "github\.com[:/](?<owner>[^/]+)/(?<repo>[^/.]+)(?:\.git)?$") {
  $owner = $Matches.owner
  $repo = $Matches.repo
  $pagesUrl = "https://$owner.github.io/$repo"
}

Write-Host ""
Write-Host "Push complete. In GitHub, open Settings -> Pages and choose GitHub Actions."
if ($pagesUrl) {
  Write-Host "Expected site URL: $pagesUrl"
  Write-Host "Outreach page: $pagesUrl/audit.html"
  Write-Host "After Pages finishes deploying, run:"
  Write-Host "powershell -ExecutionPolicy Bypass -File .\scripts\render-market-messages.ps1 -SiteUrl `"$pagesUrl`""
}
