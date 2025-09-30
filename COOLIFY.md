# Deployment ke Coolify

## 🚀 Setup untuk Coolify

Dockerfile ini sudah dioptimalkan untuk deployment di Coolify dengan konfigurasi berikut:
- **Port**: 3000 (standard Coolify)
- **Base Image**: node:20-alpine (lebih aman dan ringan)
- **Serving**: Menggunakan `serve` package untuk static files
- **Security**: Non-root user untuk keamanan
- **Health Check**: Built-in health monitoring

## 📋 Langkah-langkah Deployment

### 1. Persiapan Repository
Pastikan semua file sudah di-commit ke Git repository:
```bash
git add .
git commit -m "Add Dockerfile for Coolify deployment"
git push origin main
```

### 2. Setup di Coolify

1. **Login ke Coolify Dashboard**
2. **Buat New Application**
3. **Pilih Source**: Connect ke GitHub repository Anda
4. **Build Settings**:
   - Build Command: (biarkan kosong, sudah ada di Dockerfile)
   - Start Command: (biarkan kosong, sudah ada di Dockerfile)
   - Port: `3000`
   - Dockerfile Path: `./Dockerfile`

### 3. Environment Variables (Opsional)

Jika aplikasi membutuhkan environment variables, tambahkan di Coolify:
```bash
REACT_APP_API_URL=https://your-api-url.com
REACT_APP_ENV=production
```

### 4. Domain Setup

- Coolify akan memberikan domain default
- Atau setup custom domain di tab "Domains"

## 🔧 Konfigurasi Docker

### Port Configuration
```dockerfile
EXPOSE 3000
```
Coolify akan otomatis map port internal 3000 ke port eksternal.

### Health Check
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1
```
Ini membantu Coolify monitoring status aplikasi.

### Security
- Menggunakan non-root user
- Only production dependencies
- Alpine Linux base image

## 🐛 Troubleshooting

### Build Gagal
1. Cek log di Coolify dashboard
2. Pastikan `package.json` sudah benar
3. Cek apakah ada dependency conflict

### Application Tidak Start
1. Cek port configuration (harus 3000)
2. Pastikan build folder ter-generate dengan benar
3. Cek health check response

### Performance Issues
1. Build cache: Dockerfile sudah dioptimasi untuk layer caching
2. Static serving: Menggunakan `serve` yang sudah dioptimasi
3. Alpine image: Ukuran image minimal

## 📊 Monitoring

Coolify menyediakan:
- **Logs**: Real-time application logs
- **Metrics**: CPU, Memory, Network usage
- **Health Status**: Dari health check yang sudah dikonfigurasi

## 🔄 Auto Deployment

Setup webhook untuk auto-deploy saat push ke repository:
1. Di Coolify, buka aplikasi Anda
2. Go to "Source" tab
3. Enable "Auto Deploy on Push"
4. Copy webhook URL
5. Add webhook di GitHub repository settings

## 💡 Tips Optimisasi

1. **Build Time**: Dependencies di-cache dengan baik
2. **Runtime**: Serve static files langsung dari memory
3. **Security**: Non-root user dan minimal dependencies
4. **Monitoring**: Health check untuk uptime monitoring

Dengan setup ini, aplikasi React Anda siap untuk production deployment di Coolify! 🎉