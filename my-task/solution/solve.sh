#!/usr/bin/env bash
set -euo pipefail

cd /tmp/project

# Apply reference patch if present
if [ -f ../solution/fix.patch ] || [ -f solution/fix.patch ]; then
	if [ -f solution/fix.patch ]; then
		git apply -p0 solution/fix.patch || { echo "git apply failed" >&2; exit 1; }
	else
		git apply -p0 ../solution/fix.patch || { echo "git apply failed" >&2; exit 1; }
	fi
	echo "Applied solution patch"
else
	echo "No solution patch found; nothing to apply"
fi

git apply fix.patch