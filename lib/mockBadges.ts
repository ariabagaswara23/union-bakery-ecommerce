/**
 * Mock product badges
 * 
 * Since the API doesn't provide badge information,
 * this mock data is used temporarily for UI demonstration.
 * 
 */

export const MOCK_PRODUCT_BADGES = {
  'donuts': 'BEST SELLER',
  'es-teler-cake': 'BEST SELLER',
  'red-velvet-christmas-edition': 'SEASONAL',
  'pistachio-raspberry-pie': 'BEST SELLER',
} as const


export function getMockProductBadge(handle: string): string | null {
  return MOCK_PRODUCT_BADGES[handle as keyof typeof MOCK_PRODUCT_BADGES] || null
}