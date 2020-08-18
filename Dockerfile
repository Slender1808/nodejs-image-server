FROM node:current-alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "start"]
