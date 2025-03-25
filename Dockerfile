# syntax=docker/dockerfile:1

# build
FROM node:23-alpine AS builder

WORKDIR /home/appuser/app

RUN npm install -g corepack@latest
RUN corepack enable
RUN corepack prepare pnpm@latest-9 --activate

COPY package.json pnpm-lock.yaml ./

ENV CI=1

RUN pnpm install

COPY . .

RUN touch .env .env.docker
RUN cat .env.docker >> .env

RUN pnpm build
RUN cd build && pnpm install --prod

# runtime
FROM node:23-alpine AS runtime

WORKDIR /home/appuser/app

RUN addgroup -g 1001 appuser-group
RUN adduser -u 10001 -G appuser-group --home /home/appuser/app -D appuser
USER appuser

COPY --chown=appuser:appuser-group --from=builder /home/appuser/app/build ./
COPY --chown=appuser:appuser-group --from=builder /home/appuser/app/.env ./.env

EXPOSE 3000

CMD ["node", "--no-warnings", "bin/server.js"]
