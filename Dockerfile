# server
FROM node:lts-bullseye-slim
COPY package* yarn.lock /srv/tsapp/
WORKDIR /srv/tsapp
RUN apt-get update && apt-get install -y install-info git --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && npm config set registry https://registry.npm.taobao.org \
    && yarn config set registry https://registry.npm.taobao.org \
    && npm install -g pm2 \
    && pm2 install pm2-intercom \
    && yarn install
COPY . .
RUN yarn build-ts

# ENV NODE_ENV=production
EXPOSE 80 443 43554 8081
ENTRYPOINT pm2-runtime start ecosystem.config.js
