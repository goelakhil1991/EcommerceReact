export interface Product {
  id: number
  name: string
  price: number
  inStock: boolean
}

export interface CartItem extends Product{
    quantity: number
}

export interface ApiProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}