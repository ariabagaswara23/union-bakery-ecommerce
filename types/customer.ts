export interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  displayName: string
}

export interface CustomerResponse {
  success: boolean
  data: Customer
}