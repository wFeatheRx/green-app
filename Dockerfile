# 從哪個镜像為基底進行設定
FROM node:18-alpine AS node-builder

# 切換到镜像中的指定路径
WORKDIR /app

# 從Host現在目錄複製到目前镜像中/app
COPY --chown=node:node . .

# 使用 npm ci，而不是npm install安裝應用程序依賴項
RUN npm ci

# 執行package.json中scripts的build
RUN npm run build

# 開放镜像中對外的PORT
EXPOSE 8080

# 使用映像中的節點用戶（而不是 root 用戶）
USER node

# 從哪個镜像為基底進行設定
FROM nginx:1.23.1-alpine AS nginx-builder

# 開放镜像中對外的PORT
EXPOSE 80 
 
# 從Host現在目錄複製到镜像中 /etc/nginx/
COPY --chown=node:node nginx.conf /etc/nginx/

# 從設定過node-builder鏡像中/app/www，複製到目前镜像中/usr/share/nginx/html
COPY --chown=node:node --from=node-builder /app/www /usr/share/nginx/html

# 應用 envsubst，可以輕易的將設定檔範本中特定變數
COPY nginx.site.template /etc/nginx/conf.d/
CMD envsubst < /etc/nginx/conf.d/nginx.site.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'

