#!/usr/bin/env bash
set -euo pipefail

cd /tmp/project || true

# Potential locations for the patch
PATCH_PATHS=("solution/fix.patch" "../solution/fix.patch" "fix.patch" "environment/fix.patch" "/tmp/project/fix.patch")
found=""
for p in "${PATCH_PATHS[@]}"; do
  if [ -f "$p" ]; then
    found="$p"
    break
  fi
done

if [ -z "$found" ]; then
  echo "No solution patch found; nothing to apply"
  exit 0
fi

tmppatch="/tmp/clean_patch_$$.patch"
sed -e 's|a/my-task/|a/|g' -e 's|b/my-task/|b/|g' "$found" > "$tmppatch"

apply_in_environment() {
  (cd environment && git apply -p1 "$1") 2>/tmp/git_apply_env.err && return 0 || true
  (cd environment && git apply -p0 "$1") 2>/tmp/git_apply_env.err && return 0 || true
  return 1
}

apply_generic() {
  git apply -p0 "$1" 2>/tmp/git_apply.err && return 0 || true
  git apply -p1 "$1" 2>/tmp/git_apply.err && return 0 || true
  return 1
}

echo "Applying patch from: $found"
if [[ "$found" == *"environment/"* ]] || [[ -f environment/$(basename "$found") ]]; then
  if apply_in_environment "$tmppatch"; then
    echo "Applied patch inside environment/"
    # mark that oracle applied the fix
    touch .patched_by_oracle
    rm -f "$tmppatch"
    exit 0
  else
    echo "Failed to apply patch inside environment/; trying generic apply" >&2
  fi
fi

if apply_generic "$tmppatch"; then
  echo "Applied patch (generic)"
  # mark that oracle applied the fix
  touch .patched_by_oracle
  rm -f "$tmppatch"
  exit 0
fi

echo "git apply failed; see /tmp/git_apply.err or /tmp/git_apply_env.err" >&2
cat /tmp/git_apply.err 2>/dev/null || true
cat /tmp/git_apply_env.err 2>/dev/null || true

echo "Attempting programmatic fallback: insert guard into src/execution/WorkflowExecutionCoordinator.ts"
if [ -f src/execution/WorkflowExecutionCoordinator.ts ]; then
  python3 - <<'PY'
from pathlib import Path
import sys
p=Path('src/execution/WorkflowExecutionCoordinator.ts')
s=p.read_text()
if 'this.lifecycle.getState' in s:
    print('guard already present')
    # still mark that the oracle applied/ensured the guard is present
    Path('.patched_by_oracle').write_text('1')
    sys.exit(0)
needle='this.scheduler.schedule('
if needle not in s:
    print('needle not found',file=sys.stderr)
    sys.exit(1)
lines=s.splitlines(True)
for i,l in enumerate(lines):
    if 'this.scheduler.schedule' in l:
        indent=''
        for ch in l:
            if ch.isspace(): indent+=ch
            else: break
        block = indent + 'if (\n' + indent + '  this.lifecycle.getState(workflow.id) === "archived"\n' + indent + ') {\n' + indent + '  return;\n' + indent + '}\n\n'
        lines.insert(i, block)
        break
open(p,'w').writelines(lines)
print('programmatic patch applied')
Path('.patched_by_oracle').write_text('1')
sys.exit(0)
PY
  rc=$?
  if [ $rc -eq 0 ]; then
    echo "Programmatic change applied"
    rm -f "$tmppatch"
    exit 0
  else
    echo "Programmatic fallback failed" >&2
    rm -f "$tmppatch"
    exit 1
  fi
else
  echo "Target file not found for programmatic fix" >&2
  rm -f "$tmppatch"
  exit 1
fi
