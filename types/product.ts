export interface ProductMedia {
  id: string
  previewImage: {
    url: string
    altText: string | null
    id: string
    width: number
    height: number
  }
}

export interface Product {
  id: string
  title: string
  handle: string
  isPackaging: boolean
  metafield: string | null
  isPO: boolean | null
  priceRange: {
    maxVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  bestseller: boolean | null
  seasonal: boolean | null
  media: {
    nodes: ProductMedia[]
  }
  variants?: {  // ✅ Tambahkan ini (optional karena /all-products mungkin tidak return)
    nodes: ProductVariant[]
  }
}

export interface ProductsResponse {
  success: boolean
  data: Product[]
}

// Detail Product Types
export interface ProductVariant {
  id: string
  title: string
  availableForSale: boolean
  selectedOptions: {
    name: string
    value: string
  }[]
  price: {
    amount: string
    currencyCode: string
  }
}

export interface ProductOptionValue {
  id: string
  name: string
}

export interface ProductOption {
  name: string
  optionValues: ProductOptionValue[]
}

export interface ProductImage {
  id: string
  width: number
  height: number
  url: string
}

export interface ProductDetail {
  id: string
  title: string
  description: string
  handle: string 
  variants: {
    nodes: ProductVariant[]
  }
  options: ProductOption[]
  images: {
    nodes: ProductImage[]
  }
}

export interface ProductDetailResponse {
  success: boolean
  data: ProductDetail
}