# Docker Setup untuk Web SIKARATE

## Files yang Dibuat

1. **Dockerfile** - Multi-stage build untuk production
2. **Dockerfile.dev** - Dockerfile untuk development
3. **docker-compose.yml** - Orchestration file
4. **nginx.conf** - Konfigurasi nginx untuk production
5. **.dockerignore** - Mengecualikan file yang tidak perlu

## Cara Penggunaan

### Production Build

```bash
# Build image
docker build -t web-sikarate .

# Run container
docker run -p 3000:80 web-sikarate
```

### Menggunakan Docker Compose

```bash
# Production
docker-compose up -d

# Development (dengan hot reload)
docker-compose --profile dev up -d

# Stop containers
docker-compose down
```

### Development dengan Hot Reload

```bash
# Build development image
docker build -f Dockerfile.dev -t web-sikarate-dev .

# Run development container
docker run -p 3001:3000 -v $(pwd):/app -v /app/node_modules web-sikarate-dev
```

## Fitur Docker Setup

### Production (Dockerfile)
- **Multi-stage build** untuk mengoptimalkan ukuran image
- **Nginx** sebagai web server untuk performa tinggi
- **Gzip compression** untuk mengurangi ukuran transfer
- **Static asset caching** untuk performa yang lebih baik
- **Security headers** untuk keamanan aplikasi
- **Client-side routing support** untuk React Router

### Development (Dockerfile.dev)
- **Hot reload** untuk development yang cepat
- **Volume mounting** untuk perubahan real-time
- **All dependencies** termasuk dev dependencies

## Port yang Digunakan

- **Production**: Port 3000 (host) → 80 (container)
- **Development**: Port 3001 (host) → 3000 (container)

## Environment Variables

Anda dapat menambahkan environment variables di `docker-compose.yml`:

```yaml
environment:
  - REACT_APP_API_URL=https://api.example.com
  - REACT_APP_ENV=production
```

## Tips Optimization

1. **Gunakan .dockerignore** untuk mengurangi ukuran build context
2. **Multi-stage build** mengurangi ukuran final image
3. **Nginx caching** meningkatkan performa aplikasi
4. **Security headers** melindungi dari serangan umum

## Troubleshooting

### Jika build gagal:
```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker build --no-cache -t web-sikarate .
```

### Jika port sudah digunakan:
```bash
# Cek port yang digunakan
lsof -i :3000

# Gunakan port lain
docker run -p 8080:80 web-sikarate
```