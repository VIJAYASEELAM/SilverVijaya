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
	# If patch lives under environment, apply from there so paths like a/src/... match
	if [[ "$found" == *"environment/"* ]]; then
		# environment patch paths use a/src/... format; strip the leading a/ with -p1
		(cd environment && git apply -p1 "$(basename "$found")") || { echo "git apply failed for $found" >&2; exit 1; }
	else
		git apply -p0 "$found" || { echo "git apply failed for $found" >&2; exit 1; }
	fi
else
	echo "No solution patch found; nothing to apply"
fi
	echo "Applied solution patch"
else
	echo "No solution patch found; nothing to apply"
fi

git apply fix.patch