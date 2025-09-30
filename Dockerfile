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

# Expose port 3000 (standard untuk Coolify)
EXPOSE 3000

# Start aplikasi (tanpa non-root user untuk performa)
CMD ["serve", "-s", "build", "-l", "3000", "--no-clipboard", "--single"]