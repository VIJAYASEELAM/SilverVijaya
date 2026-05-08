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
		# Normalize headers to remove any leading my-task/ path components
		tmppatch=$(mktemp)
		sed -e 's|a/my-task/|a/|g' -e 's|b/my-task/|b/|g' "$found" > "$tmppatch"
		git apply -p1 "$tmppatch" || { echo "git apply failed for $found (after normalizing headers)" >&2; rm -f "$tmppatch"; exit 1; }
		rm -f "$tmppatch"
	fi
else
	echo "No solution patch found; nothing to apply"
fi
	echo "Applied solution patch"
else
	echo "No solution patch found; nothing to apply"
fi

git apply fix.patch