import { CreateCartResponse, CreateCartInput, AddCartLineInput, AddCartLineResponse, GetCartInput, GetCartResponse, UpdateBuyerIdentityInput, UpdateBuyerIdentityResponse, UpdateCartLineInput, UpdateCartLineResponse, RemoveCartLineInput, RemoveCartLineResponse } from '@/types/cart'
import { rateLimiterManager } from './rateLimiter'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com'
const cartLimiter = rateLimiterManager.getLimiter('cart', 3, 1000)

export async function createCart(
  input: CreateCartInput,
  accessToken?: string
): Promise<CreateCartResponse> {
  return cartLimiter.throttle(async () => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    // Add authorization header if token provided
    if (accessToken) {
      headers['Authorization'] = accessToken
    }

    const response = await fetch(`${API_BASE_URL}/createCart`, {
      method: 'POST',
      headers,
      body: JSON.stringify(input),
    })

    if (!response.ok) {
      throw new Error(`Failed to create cart: ${response.statusText}`)
    }

    return response.json()
  })
}

export async function addCartLine(
  input: AddCartLineInput,
  accessToken?: string
): Promise<AddCartLineResponse> {
  return cartLimiter.throttle(async () => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    if (accessToken) {
      headers['Authorization'] = accessToken
    }

    const response = await fetch(`${API_BASE_URL}/cart-line-add`, {
      method: 'POST',
      headers,
      body: JSON.stringify(input),
    })

    if (!response.ok) {
      throw new Error(`Failed to add item to cart: ${response.statusText}`)
    }

    return response.json()
  })
}

export async function getCart(
  input: GetCartInput,
  accessToken?: string
): Promise<GetCartResponse> {
  return cartLimiter.throttle(async () => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (accessToken) {
      headers['Authorization'] = accessToken
    }

    const response = await fetch(`${API_BASE_URL}/get-cart`, {
      method: 'POST',
      headers,
      body: JSON.stringify(input),
    })

    if (!response.ok) {
      throw new Error(`Failed to get cart: ${response.statusText}`)
    }

    return response.json()
  })
}

export async function updateCartBuyerIdentity(
  input: UpdateBuyerIdentityInput,
  accessToken: string
): Promise<UpdateBuyerIdentityResponse> {
  return cartLimiter.throttle(async () => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Authorization': accessToken, // Required!
    }

    const response = await fetch(`${API_BASE_URL}/update-cart-buyer-identity`, {
      method: 'POST',
      headers,
      body: JSON.stringify(input),
    })

    if (!response.ok) {
      throw new Error(`Failed to update buyer identity: ${response.statusText}`)
    }

    return response.json()
  })
}

export async function updateCartLine(
  input: UpdateCartLineInput,
  accessToken?: string
): Promise<UpdateCartLineResponse> {
  return cartLimiter.throttle(async () => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (accessToken) {
      headers['Authorization'] = accessToken
    }

    const response = await fetch(`${API_BASE_URL}/update-cart-line`, {
      method: 'POST',
      headers,
      body: JSON.stringify(input),
    })

    if (!response.ok) {
      throw new Error(`Failed to update cart line: ${response.statusText}`)
    }

    return response.json()
  })
}

export async function removeCartLine(
  input: RemoveCartLineInput,
  accessToken?: string
): Promise<RemoveCartLineResponse> {
  return cartLimiter.throttle(async () => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (accessToken) {
      headers['Authorization'] = accessToken
    }

    const response = await fetch(`${API_BASE_URL}/remove-cart-item`, {  // ✅ Updated endpoint
      method: 'POST',
      headers,
      body: JSON.stringify(input),
    })

    if (!response.ok) {
      throw new Error(`Failed to remove cart item: ${response.statusText}`)
    }

    return response.json()
  })
}