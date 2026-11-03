#!/usr/bin/env bash

set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "Usage: $0 <original-dir> <new-dir>" >&2
  exit 2
fi

ORIGINAL_DIR=$1
NEW_DIR=$2

if [[ ! -d "$ORIGINAL_DIR" ]]; then
  echo "Error: original directory does not exist: $ORIGINAL_DIR" >&2
  exit 2
fi

if [[ ! -d "$NEW_DIR" ]]; then
  echo "Error: new directory does not exist: $NEW_DIR" >&2
  exit 2
fi

set +e
diff -rq \
  --exclude='.DS_Store' \
  --exclude='._*' \
  --exclude='.Spotlight-V100' \
  --exclude='.Trashes' \
  "$ORIGINAL_DIR" \
  "$NEW_DIR"
DIFF_EXIT_CODE=$?
set -e

case "$DIFF_EXIT_CODE" in
  0) echo "Directories are identical" ;;
  1) echo "Differences found" ;;
  *) echo "Error running diff (exit code: $DIFF_EXIT_CODE)" >&2
     exit "$DIFF_EXIT_CODE" ;;
esac

exit "$DIFF_EXIT_CODE"