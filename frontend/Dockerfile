FROM node:16-alpine as builder

WORKDIR /app
COPY frontend/ .
RUN npm install -g serve

CMD ["serve", "-s", ".", "-l", "3000"]