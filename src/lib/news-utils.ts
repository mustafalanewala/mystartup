// Utilities for working with NewsItem data without hardcoding content.
import type { NewsItem } from "./types"

export function formatDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function slugifyCategory(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export function getCategories(items: NewsItem[]) {
  const set = new Set(
    items.filter((i) => i.Active_Flag !== false && i.Categrory_Name?.trim()).map((i) => i.Categrory_Name.trim()),
  )
  return Array.from(set).sort()
}

export function getBySlug(items: NewsItem[], slug: string) {
  return items.find((i) => i.Slug === slug && i.Active_Flag !== false)
}

export function filterByCategory(items: NewsItem[], categorySlug: string) {
  return items.filter((i) => i.Active_Flag !== false && slugifyCategory(i.Categrory_Name) === categorySlug)
}

export function getCategoryFromSlug(items: NewsItem[], categorySlug: string) {
  const found = items.find((i) => slugifyCategory(i.Categrory_Name) === categorySlug)
  return found?.Categrory_Name || categorySlug
}
