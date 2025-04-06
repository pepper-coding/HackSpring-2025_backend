FROM node:latest

WORKDIR /app

COPY package.json ./

RUN npm install --verbose --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["yarn", "start:prod"]
