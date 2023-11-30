import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html']
    }
  },
  resolve: {
    alias: [{find: '@', replacement: resolve(__dirname, './src')}],
  }
})
