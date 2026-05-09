FROM node:20

WORKDIR /app

# Copy repo and install
COPY package*.json ./
# Use npm ci for reproducible installs when lockfile present
COPY package-lock.json ./
RUN if [ -f package-lock.json ]; then npm ci --no-audit --no-fund || true; else npm install --no-audit --no-fund || true; fi

# Build step (if project uses TypeScript)
COPY . .
RUN if [ -f tsconfig.json ]; then npm run build || true; fi

CMD ["/bin/bash"]
