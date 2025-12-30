export interface CartAttribute {
  key: string
  value: string
}

export interface Price {
  amount: string
  currencyCode: string
}

export interface MerchandiseImage {
  id: string
  width: number
  height: number
  url: string
}

export interface Merchandise {
  id: string
  availableForSale: boolean
  price: Price
  image: MerchandiseImage
  title?: string
  product?: {
    title: string
    handle: string
  }
}

export interface CartLineNode {
  id: string
  quantity: number
  attributes: CartAttribute[]
  merchandise: Merchandise
  cakeSize?: string
}

export interface CartData {
  nodes: CartLineNode[]
}

export interface BuyerIdentity {
  customer?: {
    email: string
    firstName: string
    lastName: string
  }
}

export interface Cart {
  id: string
  buyerIdentity: BuyerIdentity
  lines: {
    nodes: CartLineNode[]
  }
  cost: {
    subtotalAmount: {
      amount: number
      currencyCode: string
    }
  }
}

export interface CreateCartResponse {
  success: boolean
  data: Cart
}

// Request body type
export interface CreateCartInput {
  variantId: string
  cakeSize?: string
  cakeWording?: string
  greetingWording?: string
  quantity: number
  // hanya untuk localStorage
  productTitle?: string
  productHandle?: string
  price?: string
  imageUrl?: string
}

export interface AddCartLineInput {
  cartId: string
  variantId: string
  cakeWording?: string
  greetingWording?: string
  quantity: number
}

export type AddCartLineResponse = CreateCartResponse

export interface GetCartInput {
  cartId: string
}

export interface GetCartResponse {
  success: boolean
  data: {
    cart: Cart
  }
  errors: null | any
}

//body untuk update buyer identity
export interface UpdateBuyerIdentityInput {
  cartId: string
}

// Response for update buyer identity
export interface UpdateBuyerIdentityResponse {
  success: boolean
  data: Cart
}

// request body untuk update cart line
export interface UpdateCartLineInput {
  cartId: string
  lineId: string
  quantity: number
  cakeWording?: string
  greetingWording?: string
}

// response untuk update cart line
export interface UpdateCartLineResponse {
  success: boolean
  data: {
    cartLinesUpdate: {
      cart: Cart
    }
  }
  errors: null | any
}

export interface RemoveCartLineInput {
  cartId: string
  lineIds: string
}

export interface RemoveCartLineResponse {
  success: boolean
  data: Cart
}