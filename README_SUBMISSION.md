# SilverVijaya Submission

This repository contains the example project and a task for Silver benchmarking.

Repo layout:
- `repo_src/` — application source (TypeScript Node.js)
- `my-task/` — task folder ready for Silver task submission

Build & test (in `repo_src`):

```bash
cd repo_src
npm ci
npm test
```

Dockerfiles:
- Top-level `Dockerfile` builds the repo for submission.
- `my-task/environment/Dockerfile` is the per-task environment.

Before uploading to Silver:
- Replace `FROM node:20` with the exact approved repo image string shown on the Repositories page.
- After the platform builds the image, pin the per-task Dockerfile to the resulting digest.
