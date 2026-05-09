#!/bin/bash

cd /tmp/project/environment

npm install

npx jest tests/workflowExecutionCoordinator.test.ts

mkdir -p /logs/verifier

if [ $? -eq 0 ]; then
  echo "1.0" > /logs/verifier/reward.txt
else
  echo "0.0" > /logs/verifier/reward.txt
fi