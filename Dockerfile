FROM node:20

WORKDIR /app

# Copy repo and install
COPY package*.json ./
RUN npm install --no-audit --no-fund || true

# Build step (if project uses TypeScript)
COPY . .
RUN if [ -f tsconfig.json ]; then npm run build || true; fi

CMD ["/bin/bash"]
