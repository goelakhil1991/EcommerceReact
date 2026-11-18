import type { Product } from '../types/Product'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>

      <p className="price">
        ₹{product.price.toLocaleString('en-IN')}
      </p>

      <p className={product.inStock ? 'available' : 'out-of-stock'}>
        {product.inStock ? 'Available' : 'Out of stock'}
      </p>

      <button
        disabled={!product.inStock}
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard