@echo off
REM ============================================================
REM  Local preview for the portfolio site (static, GitHub Pages
REM  style). Double-click to serve .\site and open it in your
REM  browser. Leave this window open; press Ctrl+C or close it
REM  to stop the server.
REM ============================================================
setlocal enabledelayedexpansion
cd /d "%~dp0site"

REM Find a Python launcher up front, so a missing Python fails loudly
REM instead of cascading through fallbacks with stderr suppressed.
set "PY_CMD="
where python >nul 2>&1 && set "PY_CMD=python"
if not defined PY_CMD where py >nul 2>&1 && set "PY_CMD=py"
if not defined PY_CMD (
  echo ERROR: Python was not found on PATH. Install Python 3
  echo        ^(or start any static server in the .\site folder^).
  pause
  exit /b 1
)

REM Pick a FREE port. A stale preview left on 8137 would otherwise get
REM opened in the browser while this window's server dies silently --
REM you would be reviewing an outdated build without knowing it.
set "PORT=8137"
:findport
netstat -ano | findstr ":%PORT% " | findstr "LISTENING" >nul 2>&1
if not errorlevel 1 (
  echo   Port %PORT% is busy ^(a stale preview window?^) -- trying %PORT% + 1 ...
  set /a PORT+=1
  goto findport
)

echo.
echo   Serving .\site  at  http://127.0.0.1:%PORT%/
echo   (leave this window open; Ctrl+C or close to stop)
echo.

REM Open the browser a moment after the server has had time to bind.
start "" cmd /c "timeout /t 2 >nul && start http://127.0.0.1:%PORT%/"

REM No stderr suppression: if the server cannot start, say so on screen.
%PY_CMD% -m http.server %PORT% --bind 127.0.0.1

echo.
pause
