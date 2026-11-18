import { useState, useEffect } from 'react'
import ProductCard from './components/ProductCard'
import type { Product, CartItem, ApiProduct } from './types/Product'
import './App.css'
import {getProducts} from './services/productService'

function App() {
  const products: Product[] = [
    { id: 1, name: 'Laptop', price: 55000, inStock: true },
    { id: 2, name: 'Headphones', price: 2500, inStock: true },
    { id: 3, name: 'Keyboard', price: 1800, inStock: false }
  ]

  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error,setError] = useState<string | null>(null)
  const [apiProducts, setApiProducts] = useState<ApiProduct[]>([])
  
  useEffect(() => {console.log('App components loaded')}, [cartItems])
  useEffect(() => {
  async function loadProducts() {
    try {
      const data = await getProducts()
      setApiProducts(data)

    } catch (error) {
      console.error('Error fetching products:', error)

      setError(
        error instanceof Error
          ? error.message
          : 'Something went wrong'
      )

    } finally {
      setLoading(false)
    }
  }

  loadProducts()
}, [])


  function handleAddToCart(product: Product): void {
    setCartItems(previousItems => {
      const existingItem = previousItems.find(
        item => item.id === product.id
      )

      if (existingItem) {
        return previousItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...previousItems, { ...product, quantity: 1 }]
    })

    console.log(`${product.name} added to cart`)
  }

  function updateQuantity(productId: number, change: number): void {
  setCartItems(previousItems =>
    previousItems
      .map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + change }
          : item
      )
      .filter(item => item.quantity > 0)
  )
}

function removeFromCart(productId: number): void {
  setCartItems(previousItems =>
    previousItems.filter(item => item.id !== productId)
  )
}

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 0
  )

  return (
    <div>
      <h1>My Ecommerce Store</h1>

      <h2 className="cart-count">
        Cart Items: {cartItems.reduce(
          (total, item) => total + item.quantity, 0
        )}
      </h2>

      <h2>
        Cart Total: ₹{cartTotal.toLocaleString('en-IN')}
      </h2>

      <div>
  <h2>Your Shopping Cart</h2>

  {cartItems.length === 0 ? (
    <p>Your cart is empty.</p>
  ) : (
    cartItems.map(item => (
  <div key={item.id} className="cart-item">
    <div>
      <strong>{item.name}</strong>
      <p>
        ₹{item.price.toLocaleString('en-IN')} × {item.quantity}
      </p>
    </div>

    <div>
      <button onClick={() => updateQuantity(item.id, -1)}>
        -
      </button>

      <span> {item.quantity} </span>

      <button onClick={() => updateQuantity(item.id, 1)}>
        +
      </button>

      <button onClick={() => removeFromCart(item.id)}>
        Remove
      </button>
    </div>
  </div>
))
  )}
</div>
<h2>Products from API</h2>
{loading && <p>Loading products...</p>}
{error && <p style={{ color: 'red' }}>{error}</p>}
<div className="product-list">
  {apiProducts.map((product) => (
    <div key={product.id} className="product-card">
      <img
        src={product.image}
        alt={product.title}
        width="120"
      />

      <h3>{product.title}</h3>

      <p className="price">
        ₹{product.price}
      </p>

      <p>{product.category}</p>
    </div>
  ))}
</div>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  )
}

export default App