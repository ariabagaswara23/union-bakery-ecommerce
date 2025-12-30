interface CartItemMetadata {
  variantId: string
  lineId?: string
  productTitle?: string
  productHandle?: string
  cakeSize?: string
  quantity: number
  price?: string
  imageUrl?: string
  cakeWording?: string
  greetingWording?: string
}

interface LocalStorageCart {
  cartId: string
  items: CartItemMetadata[]
  lastUpdated: string
}

/**
 * Get cart data from localStorage
 */
export function getLocalCart(): LocalStorageCart | null {
  if (typeof window === 'undefined') return null
  
  const cartData = localStorage.getItem('cart')
  if (!cartData) return null
  
  try {
    return JSON.parse(cartData)
  } catch (e) {
    console.error('Failed to parse cart from localStorage', e)
    return null
  }
}

/**
 * Save cart item to localStorage
 */
export function saveCartItemToLocalStorage(item: CartItemMetadata): void {
  if (typeof window === 'undefined') return
  
  const cartId = localStorage.getItem('cartId')
  if (!cartId) return
  
  const currentCart = getLocalCart() || {
    cartId,
    items: [],
    lastUpdated: new Date().toISOString(),
  }
  
  // Check if item already exists (by variantId)
  const existingItemIndex = currentCart.items.findIndex(
    i => i.variantId === item.variantId
  )
  
  if (existingItemIndex >= 0) {
    // Update existing item
    currentCart.items[existingItemIndex] = {
      ...currentCart.items[existingItemIndex],
      ...item,
      quantity: currentCart.items[existingItemIndex].quantity + item.quantity,
    }
  } else {
    // Add new item
    currentCart.items.push(item)
  }
  
  currentCart.lastUpdated = new Date().toISOString()
  
  localStorage.setItem('cart', JSON.stringify(currentCart))
}

/**
 * Update cart item in localStorage
 */
export function updateCartItemInLocalStorage(
  variantId: string, 
  updates: Partial<CartItemMetadata>
): void {
  if (typeof window === 'undefined') return
  
  const currentCart = getLocalCart()
  if (!currentCart) return
  
  const itemIndex = currentCart.items.findIndex(i => i.variantId === variantId)
  if (itemIndex < 0) return
  
  currentCart.items[itemIndex] = {
    ...currentCart.items[itemIndex],
    ...updates,
  }
  
  currentCart.lastUpdated = new Date().toISOString()
  
  localStorage.setItem('cart', JSON.stringify(currentCart))
}

/**
 * Remove cart item from localStorage
 */
export function removeCartItemFromLocalStorage(lineId: string): void {
  if (typeof window === 'undefined') return
  
  const currentCart = getLocalCart()
  if (!currentCart) return
  
  console.log('Removing item with lineId:', lineId)
  
  // ✅ Remove by matching lineId
  currentCart.items = currentCart.items.filter(item => 
    item.lineId !== lineId
  )
  
  console.log('Cart items after removal:', currentCart.items)
  
  currentCart.lastUpdated = new Date().toISOString()
  localStorage.setItem('cart', JSON.stringify(currentCart))
}

/**
 * Clear all cart data from localStorage
 */
export function clearLocalCart(): void {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem('cartId')
  localStorage.removeItem('cart')
}

/**
 * Get cart ID from localStorage
 */
export function getCartId(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('cartId')
}