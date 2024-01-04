FROM node:12-slim

RUN npm i npm@^6 -g
RUN npm install pm2 -g

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY package*.json ./

USER node
RUN npm install --production

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "pm2-runtime", "ecosystem.config.js" ]
