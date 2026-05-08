#!/usr/bin/env python3
"""
Lightweight parser: accepts either JSON array of {name,status}
or plain lines of the form: TEST <name>: PASS|FAIL
Writes the JSON list to stdout.
"""
import sys
import json

data = sys.stdin.read().strip()
if not data:
    print(json.dumps([]))
    sys.exit(0)

try:
    parsed = json.loads(data)
    # expect list of {name,status}
    print(json.dumps(parsed))
    sys.exit(0)
except Exception:
    lines = [l.strip() for l in data.splitlines() if l.strip()]
    out = []
    for l in lines:
        if l.startswith("TEST ") and (": PASS" in l or ": FAIL" in l):
            try:
                name_part, status_part = l.split(":", 1)
                _, name = name_part.split(" ", 1)
                status = status_part.strip().split()[0]
                out.append({"name": name, "status": status})
            except Exception:
                continue
    print(json.dumps(out))
