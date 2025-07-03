# Use Node.js 18 Alpine as base image
FROM node:18-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

# Copy all package.json files from apps and packages
COPY apps/api-gateway/package.json ./apps/api-gateway/
COPY apps/orders-service/package.json ./apps/orders-service/
COPY apps/product-service/package.json ./apps/product-service/
COPY apps/users-service/package.json ./apps/users-service/
COPY packages/*/package.json ./packages/*/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build --filter=orders-service

# Production stage
FROM node:18-alpine AS production

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

# Copy all package.json files
COPY apps/api-gateway/package.json ./apps/api-gateway/
COPY apps/orders-service/package.json ./apps/orders-service/
COPY apps/product-service/package.json ./apps/product-service/
COPY apps/users-service/package.json ./apps/users-service/
COPY packages/*/package.json ./packages/*/

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy built application from build stage
COPY --from=base /app/apps/orders-service/dist ./apps/orders-service/dist

# Expose port
EXPOSE 3001

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["node", "apps/orders-service/dist/main.js"] 