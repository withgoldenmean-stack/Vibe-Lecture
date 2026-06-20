param(
  [int]$Port = 3000,
  [string]$Path = "/"
)

$ErrorActionPreference = "Stop"

$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$url = "http://localhost:$Port$Path"
$outLog = Join-Path $root "dev-server.out.log"
$errLog = Join-Path $root "dev-server.err.log"

function Stop-ProjectServer {
  $processes = Get-CimInstance Win32_Process |
    Where-Object {
      $_.CommandLine -and
      $_.CommandLine.Contains($root) -and
      ($_.Name -match "node|cmd|npm" -or $_.CommandLine -match "next dev|npm run dev")
    }

  $portProcesses = Get-NetTCPConnection -State Listen -LocalPort $Port -ErrorAction SilentlyContinue |
    Select-Object -ExpandProperty OwningProcess -Unique |
    ForEach-Object {
      Get-CimInstance Win32_Process -Filter "ProcessId=$_" -ErrorAction SilentlyContinue
    } |
    Where-Object {
      $_ -and ($_.CommandLine -and ($_.CommandLine.Contains($root) -or $_.CommandLine -match "next|node"))
    }

  @($processes + $portProcesses) |
    Where-Object { $_ } |
    Sort-Object ProcessId -Unique |
    ForEach-Object {
      try {
        Stop-Process -Id $_.ProcessId -Force -ErrorAction Stop
        Write-Host "Stopped process $($_.ProcessId) ($($_.Name))"
      } catch {
        Write-Host "Skip process $($_.ProcessId): $($_.Exception.Message)"
      }
    }
}

function Wait-ForServer {
  param([string]$TargetUrl)

  $deadline = (Get-Date).AddSeconds(60)
  while ((Get-Date) -lt $deadline) {
    try {
      $response = Invoke-WebRequest -Uri $TargetUrl -UseBasicParsing -TimeoutSec 5
      if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
        return $true
      }
    } catch {
      Start-Sleep -Milliseconds 750
    }
  }

  return $false
}

Stop-ProjectServer

Remove-Item -LiteralPath $outLog -Force -ErrorAction SilentlyContinue
Remove-Item -LiteralPath $errLog -Force -ErrorAction SilentlyContinue

$server = Start-Process -FilePath "npm.cmd" `
  -ArgumentList @("run", "dev", "--", "-p", "$Port") `
  -WorkingDirectory $root `
  -WindowStyle Hidden `
  -RedirectStandardOutput $outLog `
  -RedirectStandardError $errLog `
  -PassThru

Write-Host "Started web server process $($server.Id)"

if (-not (Wait-ForServer -TargetUrl $url)) {
  Write-Host "Server did not respond within 60 seconds."
  Write-Host "stdout: $outLog"
  Write-Host "stderr: $errLog"
  exit 1
}

Start-Process $url
Write-Host "Opened $url"
