import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        environment: 'jsdom',
        include: ['./__tests__/**/*.{test, spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        setupFiles: ['./__tests__/vitest-setup.ts'],
        globals: true,
        css: true,
    }
})