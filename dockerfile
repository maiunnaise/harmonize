FROM debian:bullseye-slim

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm                         
RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]