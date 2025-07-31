import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/HevySummary_FrontEnd/',
  plugins: [react()],
})
