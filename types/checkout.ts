export interface CheckoutInput {
  phone: string
  deliveryTime: string
  deliveryDate: string
  cartId: string
}

export interface CheckoutResponse {
  success: boolean
  data: {
    message: string
  }
}