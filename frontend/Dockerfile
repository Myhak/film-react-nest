FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM alpine:3.19
COPY --from=builder /app/dist /app/dist
CMD ["sh", "-c", "cp -r /app/dist/. /usr/share/nginx/html/"]
