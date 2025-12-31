import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { fetchAllProducts, fetchProductBySlug } from '@/lib/api/products'
import { ProductDetailResponse, ProductsResponse } from '@/types/product'

export function useProducts(
  options?: Omit<UseQueryOptions<ProductsResponse>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['products', 'all'],
    queryFn: fetchAllProducts,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
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
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    enabled: !!slug,
    ...options,
  })
}