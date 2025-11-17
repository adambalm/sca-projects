@echo off
setlocal
if "%PLAYWRIGHT_BROWSERS_PATH%"=="" set PLAYWRIGHT_BROWSERS_PATH=%USERPROFILE%\AppData\Local\ms-playwright
set PW_VERSION=1.56.1
npx playwright@%PW_VERSION% %*
