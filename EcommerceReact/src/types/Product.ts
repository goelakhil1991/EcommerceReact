export interface Product {
  id: number
  name: string
  price: number
  inStock: boolean
}

export interface CartItem extends Product{
    quantity: number
}