FROM node:20-alpine AS builder

WORKDIR /app

COPY ./backend/package*.json ./
RUN npm install

COPY ./backend .

RUN npm run build

FROM node:20-alpine AS runner

ENV NODE_ENV=production

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/dist ./dist
COPY ./backend/prisma ./prisma

RUN chown -R appuser:appgroup /app/node_modules

COPY docker-entry.sh ./
RUN chmod +x ./docker-entry.sh

USER appuser

EXPOSE 3000

CMD ["./docker-entry.sh"]