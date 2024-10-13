#!/bin/sh

npx prisma generate

npx prisma migrate deploy

npm run start:prod