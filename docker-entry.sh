#!/bin/sh

echo "Prisma generate..."
npx prisma generate --schema /app/schema.prisma

echo "Prisma migration deployment..."
npx prisma migrate deploy --schema /app/schema.prisma

if [ $? -ne 0 ]; then
  echo "Prisma migration failed!"
  exit 1
fi

echo "Starting Nest.js application..."
node dist/main.js