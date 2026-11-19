import { useState, useEffect } from 'react'
import type { Product, ApiProduct } from './types/Product'
import './App.css'
import {getProducts} from './services/productService'
import {Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import AddProductPage from './pages/AddProductPage'
import { useCart } from './context/CartContext'

function App() {
  const products: Product[] = [
    { id: 1, name: 'Laptop', price: 55000, inStock: true },
    { id: 2, name: 'Headphones', price: 2500, inStock: true },
    { id: 3, name: 'Keyboard', price: 1800, inStock: false }
  ]
const { cartItems } = useCart()
 
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


  return (
    <div>
      <nav>
  <Link to="/">Home</Link> |
  <Link to="/products">Products</Link> |
  <Link to="/cart">Cart</Link> |
  <Link to="/add-product">Add Product</Link>
</nav>
<Routes>
  <Route path="/" element={<Home />} />
  <Route
  path="/products"
  element={
    <Products
      products={products}
      apiProducts={apiProducts}
      loading={loading}
      error={error}
    />
  }
/>
  <Route
  path="/cart"
  element={
    <Cart/>
  }
/>
  <Route path="/add-product" element={<AddProductPage />} />
</Routes>
      

</div>
  )
}

export default App