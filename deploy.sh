#!/bin/bash
set -e
MSG="${1:-deploy}"
git add -A
git commit -m "$MSG"
git push
