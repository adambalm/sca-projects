#!/usr/bin/env bash
# Playwright wrapper that uses shared browser cache
PLAYWRIGHT_BROWSERS_PATH="${PLAYWRIGHT_BROWSERS_PATH:-$HOME/AppData/Local/ms-playwright}"
PW_VERSION="${PW_VERSION:-1.56.1}"
exec npx "playwright@${PW_VERSION}" "$@"
