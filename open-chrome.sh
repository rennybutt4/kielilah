#!/usr/bin/env bash
set -e
URL="http://localhost:3000"

# Try Chrome, then Chromium, then xdg-open
if command -v google-chrome >/dev/null 2>&1; then
  google-chrome --new-window "$URL" &
  exit 0
fi
if command -v chromium-browser >/dev/null 2>&1; then
  chromium-browser --new-window "$URL" &
  exit 0
fi
if command -v xdg-open >/dev/null 2>&1; then
  xdg-open "$URL" &
  exit 0
fi
echo "Open a browser at $URL"
