import { ProductDetailResponse, ProductsResponse } from '@/types/product'
import { rateLimiterManager } from './rateLimiter'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com'

const productsLimiter = rateLimiterManager.getLimiter('products', 3, 1000)

export async function fetchAllProducts(): Promise<ProductsResponse> {
  return productsLimiter.throttle(async () => {
    const response = await fetch(`${API_BASE_URL}/all-products`, {
      method: 'GET',
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`)
    }

    return response.json()
  })
}

export async function fetchProductBySlug(slug: string): Promise<ProductDetailResponse> {
  return productsLimiter.throttle(async () => {
    const response = await fetch(`${API_BASE_URL}/product/${slug}`, {
      method: 'GET',
      cache: 'no-store',
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Product not found')
      }
      throw new Error(`Failed to fetch product: ${response.statusText}`)
    }

    return response.json()
  })
}

