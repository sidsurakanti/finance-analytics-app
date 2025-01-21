FROM node:20-alpine as base

WORKDIR /app
COPY package*.json ./

RUN npm ci --legacy-peer-deps
COPY . .

EXPOSE 3000
RUN npm run build

CMD npm run start