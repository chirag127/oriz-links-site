import { describe, it, expect } from 'vitest'
import { dataSchema, siteSchema } from '../src/lib/schema'
import raw from '../src/data/sites-2026.json'
import {
  allSites,
  bySlug,
  categories,
  categoryList,
  sitesForCategory,
  plateNumber,
  featured,
  tierIndex,
  deadLinks,
  CATEGORY_META,
} from '../src/lib/data'

describe('sites-2026.json data invariants', () => {
  it('matches the zod dataSchema', () => {
    expect(() => dataSchema.parse(raw)).not.toThrow()
  })

  it('has at least one category with entries', () => {
    expect(Object.keys(categories).length).toBeGreaterThan(0)
    expect(allSites.length).toBeGreaterThan(0)
  })

  it('every entry has a non-empty title (name) and url', () => {
    for (const s of allSites) {
      expect(s.name, `name for ${s.slug}`).toBeTruthy()
      expect(s.name.trim().length).toBeGreaterThan(0)
      expect(s.url, `url for ${s.name}`).toBeTruthy()
    }
  })

  it('every url is a valid http(s) URL', () => {
    for (const s of allSites) {
      expect(siteSchema.shape.url.safeParse(s.url).success, `${s.name}: ${s.url}`).toBe(true)
      const u = new URL(s.url)
      expect(['http:', 'https:']).toContain(u.protocol)
    }
  })

  it('has no duplicate slugs (each site is uniquely addressable)', () => {
    const slugs = allSites.map((s) => s.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('every slug is non-empty and url-safe', () => {
    for (const s of allSites) {
      expect(s.slug, `slug for ${s.name}`).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    }
  })

  it('every category referenced by a site has CATEGORY_META', () => {
    for (const cat of Object.keys(categories)) {
      expect(CATEGORY_META[cat], `meta for ${cat}`).toBeDefined()
    }
  })

  it('dead_from_sdmg15 entries are strings', () => {
    for (const d of deadLinks) expect(typeof d).toBe('string')
  })
})

describe('data.ts derived helpers', () => {
  it('bySlug resolves every site', () => {
    for (const s of allSites) {
      expect(bySlug[s.slug]).toEqual(s)
    }
  })

  it('sitesForCategory partitions allSites', () => {
    const total = categoryList().reduce((n, c) => n + sitesForCategory(c).length, 0)
    expect(total).toBe(allSites.length)
  })

  it('categoryList lists only categories that exist in data', () => {
    for (const c of categoryList()) expect(categories[c]).toBeDefined()
    expect(new Set(categoryList()).size).toBe(categoryList().length)
  })

  it('plateNumber returns a marker for real categories and — for unknown', () => {
    const first = categoryList()[0]
    expect(plateNumber(first)).not.toBe('—')
    expect(plateNumber('does-not-exist')).toBe('—')
  })

  it('featured are high-relevance stack matches, capped at 4', () => {
    expect(featured.length).toBeLessThanOrEqual(4)
    for (const s of featured) {
      expect(s.stack_match).toBe(true)
      expect(s.relevance_to_our_stack).toBe('high')
    }
  })

  it('tierIndex orders the tier legend', () => {
    expect(tierIndex('free')).toBe(0)
    expect(tierIndex('signup')).toBe(1)
    expect(tierIndex('freemium')).toBe(2)
  })
})
