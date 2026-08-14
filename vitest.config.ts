import { getViteConfig } from 'astro/config'

// root: __dirname prevents a parent-dir vitest.config from hijacking resolution.
export default getViteConfig({
  root: __dirname,
  test: {
    include: ['tests/**/*.test.ts'],
  },
})
