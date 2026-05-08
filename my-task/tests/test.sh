#!/bin/bash

# Execute the environment test harness which runs Jest and writes /logs/verifier/reward.txt
set -euo pipefail

if [ -f ./environment/tests/test.sh ]; then
  bash ./environment/tests/test.sh
else
  echo "Missing environment/tests/test.sh" >&2
  mkdir -p /logs/verifier
  echo "0.0" > /logs/verifier/reward.txt
  exit 1
fi
