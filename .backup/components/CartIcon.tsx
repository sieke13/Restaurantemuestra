import { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/CartIcon.css';

const CartIcon: React.FC = () => {
  const { state } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="cart-icon-container">
      <button 
        className="cart-icon-button" 
        aria-label="Carrito de compra"
        onClick={toggleCart}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {state.totalItems > 0 && (
          <span className="cart-counter">{state.totalItems}</span>
        )}
      </button>
      
      {/* Mini cart preview */}
      {isCartOpen && (
        <div className="cart-dropdown">
          <div className="cart-dropdown-header">
            <h3>Tu pedido</h3>
            <button className="close-cart-btn" onClick={toggleCart}>✕</button>
          </div>
          
          {state.items.length === 0 ? (
            <div className="empty-cart">
              <p>Tu carrito está vacío</p>
              <button 
                className="view-menu-btn"
                onClick={() => {
                  window.location.href = '/menu';
                  setIsCartOpen(false);
                }}
              >
                Ver menú
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {state.items.map((item) => (
                  <div key={item.menuItem.id} className="cart-item">
                    <div className="cart-item-info">
                      <h4>{item.menuItem.name}</h4>
                      <p className="cart-item-price">
                        {item.quantity} x {item.menuItem.price.toFixed(2)}€
                      </p>
                    </div>
                    <span className="cart-item-total">
                      {(item.quantity * item.menuItem.price).toFixed(2)}€
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="cart-total">
                <span>Total:</span>
                <span>{state.totalAmount.toFixed(2)}€</span>
              </div>
              
              <div className="cart-actions">
                <button 
                  className="view-cart-btn"
                  onClick={() => {
                    window.location.href = '/pedido';
                    setIsCartOpen(false);
                  }}
                >
                  Ver carrito
                </button>
                <button 
                  className="checkout-btn"
                  onClick={() => {
                    window.location.href = '/checkout';
                    setIsCartOpen(false);
                  }}
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CartIcon;
