FROM node:16.3.0-slim

WORKDIR /app

COPY app/package*.json .

# ホットリロード
ENV CHOKIDAR_USEPOLLING=true

RUN yarn

CMD ["yarn", "serve"]