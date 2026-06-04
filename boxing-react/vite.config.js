import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Boxing/boxing-react/dist/',
  plugins: [react()],
})
