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
  if (!Array.isArray(items)) {
    return []
  }
  const set = new Set(
    items.filter((i) => i.categrory_Name?.trim()).map((i) => i.categrory_Name.trim()),
  )
  return Array.from(set).sort()
}

export function getBySlug(items: NewsItem[], slug: string) {
  if (!Array.isArray(items)) {
    return undefined
  }
  return items.find((i) => i.slug === slug)
}

export function filterByCategory(items: NewsItem[], categorySlug: string) {
  if (!Array.isArray(items)) {
    return []
  }
  return items.filter((i) => slugifyCategory(i.categrory_Name) === categorySlug)
}

export function getCategoryFromSlug(items: NewsItem[], categorySlug: string) {
  if (!Array.isArray(items)) {
    return categorySlug
  }
  const found = items.find((i) => slugifyCategory(i.categrory_Name) === categorySlug)
  return found?.categrory_Name || categorySlug
}

export function paginateItems<T>(items: T[], page: number, itemsPerPage: number = 12) {
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedItems = items.slice(startIndex, endIndex)
  const totalPages = Math.ceil(items.length / itemsPerPage)

  return {
    items: paginatedItems,
    totalPages,
    currentPage: page,
    totalItems: items.length,
    hasNext: page < totalPages,
    hasPrevious: page > 1
  }
}