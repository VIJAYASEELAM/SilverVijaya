#!/usr/bin/env bash
set -euo pipefail

cd /tmp/project

# Apply reference patch if present
PATCH_PATHS=("solution/fix.patch" "../solution/fix.patch" "fix.patch" "environment/fix.patch" "/tmp/project/fix.patch")
found=""
for p in "${PATCH_PATHS[@]}"; do
	if [ -f "$p" ]; then
		found="$p"
		break
	fi
done
if [ -n "$found" ]; then
	git apply -p0 "$found" || { echo "git apply failed for $found" >&2; exit 1; }
else
	echo "No solution patch found; nothing to apply"
fi
	echo "Applied solution patch"
else
	echo "No solution patch found; nothing to apply"
fi

git apply fix.patch