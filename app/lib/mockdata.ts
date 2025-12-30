import { CartData } from '../types/cart'

export const mockCartData: CartData = {
  nodes: [
    {
      id: "gid://shopify/CartLine/123?cart=hWN6gvgn0tM8ucBUNo0ZdvPO",
      quantity: 2,
      attributes: [
        {
          key: "Cake Wording",
          value: "Happy Birthday"
        },
        {
          key: "Greetings",
          value: "Best Wishes"
        }
      ],
      merchandise: {
        id: "gid://shopify/ProductVariant/41151874924590",
        availableForSale: true,
        price: {
          amount: "900000.00",
          currencyCode: "IDR"
        },
        image: {
          id: "gid://shopify/Image/456",
          width: 800,
          height: 600,
          url: "/image/Cake1.png"
        },
        product: {
          title: "Red Velvet Cake"
        }
      }
    },
    {
      id: "gid://shopify/CartLine/124?cart=hWN6gvgn0tM8ucBUNo0ZdvPO",
      quantity: 1,
      attributes: [
        {
          key: "Size",
          value: "18cm"
        }
      ],
      merchandise: {
        id: "gid://shopify/ProductVariant/41151874924591",
        availableForSale: true,
        price: {
          amount: "800000.00",
          currencyCode: "IDR"
        },
        image: {
          id: "gid://shopify/Image/457",
          width: 800,
          height: 600,
          url: "/image/Cake2.png"
        },
        product: {
          title: "Peach Oolong Cake"
        }
      }
    }
  ]
}