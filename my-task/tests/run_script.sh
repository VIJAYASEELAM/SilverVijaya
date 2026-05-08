#!/usr/bin/env bash
set -euo pipefail

# Default test runner. Authors should modify this to run their repo's tests.
# This script should write human-readable lines that `parser.py` can parse,
# or it can emit JSON directly.

if [ -x ./run_tests.sh ]; then
  ./run_tests.sh
  exit 0
fi

echo "No run_tests.sh found. Replace tests/run_script.sh with project-specific runner."
exit 0
