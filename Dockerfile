FROM node:24-alpine AS builder
WORKDIR /app
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginx:alpine
RUN apk --no-cache upgrade \
    && rm -rf /usr/share/nginx/html/* \
    && rm -f /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx-main.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
USER 1000
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
