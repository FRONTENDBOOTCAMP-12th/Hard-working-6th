import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import viteImagemin from 'vite-plugin-imagemin';
import viteCompression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';

const viteConfig = defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'tAIro - AI가 보는 타로',
        short_name: 'tAIro',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#4F2D88',
        description: 'AI가 보는 타로로 미래를 예측해보세요!',
        icons: [
          {
            src: 'icon/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
    viteCompression(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
    tailwindcss(),
    react({
      jsxRuntime: 'automatic',
    }),
  ],
  server: {
    host: 'localhost',
    port: 3000,
  },
  preview: {
    host: 'localhost',
    port: 8080,
  },
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});

export default viteConfig;
