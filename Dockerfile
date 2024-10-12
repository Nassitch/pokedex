FROM node:20-alpine AS builder

WORKDIR /app

COPY ./backend/package.json ./backend/package-lock.json ./

USER root

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/prisma/schema.prisma /app/schema.prisma

COPY ./docker-entry.sh /app/migrate.sh
COPY ./database-setup.sh /docker-entrypoint-initdb.d/setup.sh

RUN chmod +x /app/migrate.sh /docker-entrypoint-initdb.d/setup.sh

USER node

EXPOSE 3000

CMD ["/app/migrate.sh"]