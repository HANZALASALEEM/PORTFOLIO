#!/usr/bin/env bash
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$DIR/assets/resume/resume-source.html"
OUT="$DIR/public/resume.pdf"

google-chrome --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$OUT" "file://$SRC"

echo "Resume updated: $OUT"
