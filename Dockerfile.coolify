# Dockerfile khusus untuk Coolify deployment
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files untuk cache layer yang lebih baik
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production --silent

# Copy source code
COPY . .

# Build aplikasi React
RUN npm run build

# Install serve untuk serving static files
RUN npm install -g serve

# Create non-root user untuk security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S reactuser -u 1001
USER reactuser

# Expose port 3000 (standard untuk Coolify)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/ || exit 1

# Start aplikasi
CMD ["serve", "-s", "build", "-l", "3001"]