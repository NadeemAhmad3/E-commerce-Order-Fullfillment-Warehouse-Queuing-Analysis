### Multi-stage Dockerfile for Next.js production build
FROM node:20-alpine AS builder
WORKDIR /app

# Install deps (including dev deps for build)
COPY package.json package-lock.json* ./
# Use npm ci when a lockfile exists for reproducible installs, otherwise fall back to npm install
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy rest of sources and build
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only what's needed to run
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
