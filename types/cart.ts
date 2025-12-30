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
  }
}

export interface CartLineNode {
  id: string
  quantity: number
  attributes: CartAttribute[]
  merchandise: Merchandise
}

export interface CartData {
  nodes: CartLineNode[]
}