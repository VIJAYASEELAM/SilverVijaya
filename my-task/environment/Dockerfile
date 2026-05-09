FROM node:20

WORKDIR /tmp/project

COPY package*.json ./
# Prefer npm ci when a lockfile is present
COPY package-lock.json ./ || true
RUN if [ -f package-lock.json ]; then npm ci --no-audit --no-fund || npm install --no-audit --no-fund; else npm install --no-audit --no-fund; fi

COPY . .

# Ensure git is available so `git apply` in the oracle can apply patches
RUN apt-get update && apt-get install -y --no-install-recommends git && rm -rf /var/lib/apt/lists/*

CMD ["bash"]