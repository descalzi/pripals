import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Use /pripals/ base path for production builds to match Traefik routing
  // Use relative path for local development
  base: process.env.NODE_ENV === 'production' ? '/pripals/' : './',
  server: {
    port: 8080,
    host: true,
    allowedHosts: [
      'chunkyboy.reindeer-great.ts.net',
      '.ts.net', // Allow all Tailscale hosts
    ]
  }
})
