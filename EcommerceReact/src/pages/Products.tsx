import ProductCard from '../components/ProductCard'
import type { Product, ApiProduct } from '../types/Product'

interface ProductsProps {
  products: Product[]
  apiProducts: ApiProduct[]
  loading: boolean
  error: string | null
  onAddToCart: (product: Product) => void
}

function Products({
  products,
  apiProducts,
  loading,
  error,
  onAddToCart
}: ProductsProps) {
  return (
    <div>
      <h1>Our Products</h1>

      <h2>Products from API</h2>

      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

      <div className="product-list">
        {apiProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} width="120" />
            <h3>{product.title}</h3>
            <p>₹{product.price}</p>
            <p>{product.category}</p>
          </div>
        ))}
      </div>

      <h2>Our Store Products</h2>

      <div className="product-list">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  )
}

export default Products