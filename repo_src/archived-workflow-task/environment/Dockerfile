FROM node:20

WORKDIR /tmp/project

COPY package*.json ./

RUN npm install

COPY . .

CMD ["bash"]