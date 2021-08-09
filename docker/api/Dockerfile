FROM node:16.3.0-slim

WORKDIR /api

COPY api/package*.json .

RUN yarn

CMD ["yarn", "start"]