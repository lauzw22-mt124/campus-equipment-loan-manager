FROM node:22-bookworm-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force
COPY . .
ENV HOST=0.0.0.0 PORT=8099
USER node
EXPOSE 8099
CMD ["node", "server.js"]
