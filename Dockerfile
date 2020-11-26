FROM node:current-alpine

WORKDIR /usr/app

RUN npm install pm2 -g

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8443

CMD ["pm2-runtime", "ecosystem.config.js"]
