import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { fetchAllProducts, fetchProductBySlug } from '@/lib/api/products'
import { ProductDetailResponse, ProductsResponse } from '@/types/product'

export function useProducts(
  options?: Omit<UseQueryOptions<ProductsResponse>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['products', 'all'],
    queryFn: fetchAllProducts,
    staleTime: 5 * 60 * 1000, // 5 menit - data dianggap fresh
    gcTime: 10 * 60 * 1000, // 10 menit - data disimpan di cache (dulu namanya cacheTime)
    retry: 2, // Retry 2x kalau gagal
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    ...options,
  })
}

export function useProductDetail(
  slug: string,
  options?: Omit<UseQueryOptions<ProductDetailResponse>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => fetchProductBySlug(slug),
    staleTime: 5 * 60 * 1000, // 5 menit
    gcTime: 10 * 60 * 1000, // 10 menit
    retry: 1, // Hanya retry 1x untuk detail page
    enabled: !!slug, // Hanya fetch kalau slug ada
    ...options,
  })
}