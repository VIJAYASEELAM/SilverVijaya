FROM node:20

WORKDIR /tmp/project

COPY package*.json ./

RUN npm install

COPY . .

# Ensure git is available so `git apply` in the oracle can apply patches
RUN apt-get update && apt-get install -y --no-install-recommends git && rm -rf /var/lib/apt/lists/*

CMD ["bash"]