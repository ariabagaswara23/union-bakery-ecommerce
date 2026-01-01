# Union Bakery e-commerce

A modern e-commerce web application built with Next.js 16 for selling cakes.

## 🚀 Features

- **Product Browsing**: View product catalog with search and filtering
- **Product Details**: Detailed product pages with customization options (cake wording, greeting cards)
- **Shopping Cart**: Full cart management with add, edit, remove functionality
- **User Authentication**: Login and registration with JWT token management
- **Checkout Flow**: Multi-step checkout process with delivery scheduling
- **Resume Checkout**: Automatic restoration of checkout data after login
- **Responsive Design**: Mobile-first design optimized for all screen sizes
- **Global Notifications**: Toast-style alerts for user feedback
- **Product Badges**: Visual badges for Best Seller, Seasonal, and New products

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query)
- **API**: REST API
- **Date Handling**: date-fns
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun package manager
- Access to company API endpoints

## 🔧 Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd <project-directory>
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Set up environment variables** (see below)

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api-natron.antikode.dev/api
```

### Environment Variable Details:

- **NEXT_PUBLIC_API_URL**: Base URL for the REST API
  - Used for all API calls (products, cart, auth, checkout)
  - Must include the protocol (http:// or https://)
  - Should NOT include trailing slash

### API Authentication:

The application uses JWT-based authentication:

- Login endpoint returns an access token
- Token is stored in `localStorage`
- Token is included in `Authorization` header for authenticated requests
- Token expiry is tracked and handled automatically

## 🎯 Key Features Implementation

### 1. Authentication Flow

```
User enters credentials
  ↓
POST /login
  ↓
Receive JWT access token + expiry
  ↓
Store in localStorage
  ↓
Include in Authorization header for future requests
  ↓
Auto-logout on token expiry
```

**Implementation Details:**

- Token stored in `localStorage` as `accessToken`
- Expiry time stored as `tokenExpiresAt`
- `isAuthenticated()` checks token validity
- `getAccessToken()` retrieves valid token or null

### 2. Cart Management

```
Guest User Flow:
1. Add item → Create cart (POST /cart/create)
2. Save cartId to localStorage
3. Subsequent actions use stored cartId

Logged-in User Flow:
1. Login → Get access token
2. Associate cart with user (POST /cart/buyer-identity)
3. Cart synced with user account
4. Cart persists across devices
```

**Cart Data Strategy:**

- **localStorage**: Used as UI cache for fast display
- **Backend API**: Source of truth for checkout
- Cart data includes:
  - Product details
  - Selected variants (size)
  - Quantity
  - Custom attributes (cake wording, greeting)

### 3. Resume Checkout After Login

**Requirement:** _"Customers must be logged in before checkout: If a customer attempts to checkout without logging in, redirect them to the login page. After successful login, automatically proceed checkout."_

**Implementation:**

```
User fills delivery form (not logged in)
  ↓
Clicks "Proceed to Checkout"
  ↓
Not authenticated → Save form data to localStorage
  ↓
Redirect to /login
  ↓
User logs in successfully
  ↓
Redirect back to products page
  ↓
User opens cart
  ↓
Cart auto-opens to delivery step
  ↓
Form pre-filled with saved data
  ↓
User reviews and confirms checkout
```

**Technical Details:**

- Delivery data saved to `localStorage` as `pendingCheckout`
- Includes: deliveryDate, deliveryTime, phone, timestamp
- Data expires after 30 minutes
- Auto-clears after successful checkout
- Only auto-opens once (prevents repetitive auto-navigation)

**Why Not Auto-Submit?**

- User needs to review before finalizing
- Cart contents may have changed
- User might want to modify details
- Follows e-commerce best practices (Amazon, Shopify, etc.)

### 4. Global Alert System

**Implementation:**

```typescript
// Centralized notifications using React Context
showAlert("success", "Login successful!");
showAlert("error", "Failed to add item to cart");
showAlert("warning", "Please login to checkout");
showAlert("info", "Delivery details restored");
```

**Features:**

- Four alert types with color coding
- Auto-dismiss after 3 seconds
- Fade in/out animations
- Responsive width (mobile-friendly)
- Positioned at top-center

### 5. Responsive Design

**Mobile Optimizations:**

- Sticky footers in cart drawers
- Safe padding (`pb-32`) to prevent button cutoff
- Responsive alert width (`w-[calc(100vw-2rem)]`)
- Touch-friendly button sizes
- Optimized form layouts

**Breakpoints:**

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔄 Data Flow

```
User Action
  ↓
React Component
  ↓
Custom Hook (React Query)
  ↓
API Function (lib/api/*.ts)
  ↓
REST API Call
  ↓
Response
  ↓
React Query Cache Update
  ↓
Component Re-render
  ↓
localStorage Update (if needed)
```

## 🧪 Implementation Notes

### Cart Data Management

**localStorage Structure:**

```javascript
{
  "cartId": "cart_123...",
  "items": [
    {
      "variantId": "variant_456...",
      "productTitle": "Red Velvet Cake",
      "cakeSize": "24",
      "quantity": 1,
      "price": "700000.0",
      "cakeWording": "Happy Birthday",
      "greetingWording": "Best wishes!",
      "lineId": "line_789...",
      "imageUrl": "https://..."
    }
  ],
  "lastUpdated": "2026-01-01T12:00:00.000Z"
}
```

**Cart Cleanup Strategy:**

- Cleaned on successful checkout
- Cleaned on user logout
- Persists during shopping session
- Ghost items from old sessions don't affect checkout (backend is source of truth)

### Assumptions

1. **Backend API Contract:**

   - REST API follows standard HTTP methods
   - Returns JSON responses
   - Includes proper error messages
   - JWT tokens for authentication

2. **Product Data:**

   - Products have variants (sizes)
   - Prices are in IDR (Indonesian Rupiah)
   - Images are provided via API

3. **User Authentication:**

   - Login returns `accessToken` and `expiresAt`
   - Token valid for multiple requests
   - No refresh token implementation (tokens are long-lived)

4. **Cart Behavior:**

   - Guest carts can be created without authentication
   - Carts persist across sessions via cartId
   - Cart associates with user account after login

5. **Checkout Requirements:**

   - Phone number required (Indonesian format)
   - Delivery date must be future date
   - Delivery time slots: 11AM-2PM, 3PM-5PM, 6PM-8PM
   - User must be logged in

6. **Order Processing:**
   - Backend handles payment processing
   - Backend handles order confirmation
   - Frontend receives success/error response

## 🚨 Known Limitations

1. **localStorage Accumulation**: Cart data may accumulate over time

   - Cleaned on checkout/logout only
   - Abandoned carts persist until next cleanup
   - Impact: Minimal (doesn't affect functionality)

2. **Phone Validation**: Basic validation only

   - Min 10 digits check
   - No format validation (e.g., +62)
   - No carrier validation

3. **Token Refresh**: No automatic token refresh

   - User must re-login after token expiry
   - Could implement refresh token strategy

4. **Error Handling**: Generic error messages

   - Could be more specific based on error codes
   - Could implement error boundary for crashes

5. **No Payment Integration**: Payment handled by backend

   - Frontend doesn't integrate with payment gateway
   - Assumes backend handles payment flow

6. **No Order History**: Not implemented
   - User cannot view past orders
   - Could add `/orders` page

## 📝 Scripts

```bash
# Development
npm run dev          # Start development server (port 3000)

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Author

Aria Bagaswara - [Github](https://github.com/ariabagaswara23)

## Additional Information

Live Demo: [https://union-bakery-ecommerce.vercel.app/](https://union-bakery-ecommerce.vercel.app/)

Built with ❤️ using Next.js 16 and TypeScript
