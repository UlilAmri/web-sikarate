# Dockerfile khusus untuk Coolify deployment
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files untuk cache layer yang lebih baik
COPY package*.json ./

# Install dependencies (perlu devDependencies untuk build)
RUN npm ci --silent

# Copy source code
COPY . .

# Build aplikasi React
RUN npm run build

# Install serve untuk serving static files
RUN npm install -g serve

# Create non-root user untuk security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S reactuser -u 1001

# Change ownership ke user
RUN chown -R reactuser:nodejs /app
USER reactuser

# Expose port 3001 (sesuai dengan CMD)
EXPOSE 3001

# Health check (tanpa curl, menggunakan node)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001', (res) => process.exit(res.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

# Start aplikasi di port 3001
CMD ["serve", "-s", "build", "-l", "3001"]