param(
  [Parameter(Mandatory = $true)]
  [string]$SiteUrl,

  [string]$Source = "handoff/17_READY_TO_SEND_MARKET_MESSAGES.md",
  [string]$Output = "handoff/20_READY_TO_SEND_MARKET_MESSAGES_FINAL.md"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $Source)) {
  throw "Source message file not found: $Source"
}

$cleanUrl = $SiteUrl.TrimEnd("/")
$content = Get-Content -Encoding UTF8 -Raw -LiteralPath $Source
$content = $content -replace "SITE_URL", $cleanUrl

Set-Content -Encoding UTF8 -LiteralPath $Output -Value $content

Write-Host "Final market messages written to: $Output"
Write-Host "Using site URL: $cleanUrl"
