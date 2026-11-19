
import { useCart } from '../context/CartContext'

function Cart() {

  const {
    cartItems,
    cartTotal,
    updateQuantity,
    removeFromCart
  } = useCart()

  return (
    <div>
      <h1>Shopping Cart</h1>

      <h2>
        Cart Items: {cartItems.reduce(
          (total, item) => total + item.quantity, 0
        )}
      </h2>

      <h2>
        Cart Total: ₹{cartTotal.toLocaleString('en-IN')}
      </h2>

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
  )
}

export default Cart
