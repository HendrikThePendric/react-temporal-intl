import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/react-temporal-intl',
    plugins: [react(), eslintPlugin()],
})
