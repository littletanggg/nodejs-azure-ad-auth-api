FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir /logs

EXPOSE 3000

CMD ["sh", "-c", "npm start > /logs/app.log 2>&1"]
