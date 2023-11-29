FROM node:18.18-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

RUN npm install -g pnpm

WORKDIR /home/node/app

USER node

COPY --chown=node:node package.json pnpm-lock.yaml ./

RUN pnpm install

COPY --chown=node:node . .

EXPOSE 3333

CMD ["tail", "-f", "/dev/null"]
