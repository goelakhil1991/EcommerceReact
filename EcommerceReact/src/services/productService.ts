import type { ApiProduct } from '../types/Product'

const API_URL = 'https://fakestoreapi.com/products'

export async function getProducts(): Promise<ApiProduct[]> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`)
  }

  const data: ApiProduct[] = await response.json()

  return data
}

export async function getProductById(id: number): Promise<ApiProduct> {
  const response = await fetch(`${API_URL}/${id}`)

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`)
  }

  const data: ApiProduct = await response.json()

  return data
}