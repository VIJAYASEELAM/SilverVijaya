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
		# If patch references 'my-task' prefix (a/my-task/...), strip two components inside environment
		base=$(basename "$found")
		# If the patch references a/my-task/... rewrite headers to remove the my-task prefix
		if grep -q "a/my-task/" "$found" 2>/dev/null || grep -q "b/my-task/" "$found" 2>/dev/null; then
			tmppatch=$(mktemp)
			sed -e 's|a/my-task/|a/|g' -e 's|b/my-task/|b/|g' "$found" > "$tmppatch"
			(cd environment && git apply -p1 "$tmppatch") || { echo "git apply failed for rewritten $found" >&2; rm -f "$tmppatch"; exit 1; }
			rm -f "$tmppatch"
		else
			(cd environment && git apply -p1 "$base") || { echo "git apply failed for $found with -p1" >&2; exit 1; }
		fi
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