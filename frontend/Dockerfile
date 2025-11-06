# syntax=docker/dockerfile:1

# This Dockerfile was initialized via `docker init` and has been optimized
# for local development with Node.js v24.x.
# For official docs, visit: https://docs.docker.com/go/dockerfile-reference/

# Use a specific Node.js version.
FROM node:24.1.0-alpine

# Set environment to development mode by default.
# - Enables hot-reload, better error messages, etc.
# その他選択肢["test", "production"] -> developmentはホットリロード, test or productionは静的ビルドでホットリロード非対応
ENV NODE_ENV=development

# Set the working directory inside the container.
WORKDIR /usr/src/app

# Copy dependency files first to leverage Docker layer caching.
# (If these files don't change, `npm install` will use cached layers.)
# ワイルドカードはCOPY package.json package-lock.json ./と書いてあることと同意味
COPY package*.json ./

# Install dependencies.
# For local development we use `npm install` instead of `npm ci`
# since it is more flexible when adding/removing packages frequently.
RUN npm install

# Copy the rest of the application source code into the container.
COPY . .

# (Optional) Ensure node_modules owned by non-root user if needed.
# USER node

# ホスト側からアクセスできるようにポートを開ける
EXPOSE 3000

# Run the development server.
# - `npm run dev` should start your local dev environment (e.g., Vite, Next.js, CRA).
CMD ["npm", "run", "dev"]