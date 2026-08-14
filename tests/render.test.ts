import { describe, it, expect } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import Wordmark from '../src/components/Wordmark.astro'

describe('render smoke test (Astro Container API)', () => {
  it('renders the Wordmark component to markup', async () => {
    const container = await AstroContainer.create()
    const html = await container.renderToString(Wordmark)
    expect(html).toContain('wordmark')
    expect(html).toContain('href="https://oriz.in"')
    expect(html).toContain('oriz')
  })
})
