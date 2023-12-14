FROM alpine:latest

WORKDIR /app

COPY package*.json ./

RUN apk add --update nodejs npm   
RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]