import { useState } from 'react';
import type { MenuItem } from '../types';
import { useCart } from '../context/CartContext';
import '../styles/AddToCart.css';

interface AddToCartProps {
  menuItem: MenuItem;
  buttonStyle?: 'default' | 'compact' | 'full-width';
}

const AddToCart: React.FC<AddToCartProps> = ({ menuItem, buttonStyle = 'default' }) => {
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const { addToCart } = useCart();

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    // For simple button without options
    if (!showOptions && buttonStyle !== 'full-width') {
      addToCart(menuItem, 1);
      return;
    }
    
    addToCart(menuItem, quantity);
    setShowOptions(false);
    setQuantity(1);
    setInstructions('');
  };

  const toggleOptions = () => {
    setShowOptions(prev => !prev);
  };

  // For default and compact styles, show a simple button that adds 1 item
  if (buttonStyle !== 'full-width' && !showOptions) {
    return (
      <div className={`add-to-cart-container ${buttonStyle}`}>
        <button 
          className="add-to-cart-button"
          onClick={buttonStyle === 'default' ? toggleOptions : handleAddToCart}
          aria-label="Añadir al carrito"
        >
          {buttonStyle === 'default' ? (
            <>
              <span>Añadir</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className={`add-to-cart-container ${buttonStyle}`}>
      <div className="add-to-cart-options">
        <h4>Añadir a tu pedido</h4>
        
        {buttonStyle === 'full-width' && (
          <div className="menu-item-details">
            <h3>{menuItem.name}</h3>
            <p>{menuItem.price.toFixed(2)}€</p>
          </div>
        )}
        
        <div className="quantity-selector">
          <span>Cantidad:</span>
          <div className="quantity-controls">
            <button 
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              aria-label="Disminuir cantidad"
            >
              -
            </button>
            <span>{quantity}</span>
            <button 
              onClick={incrementQuantity}
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>
        </div>
        
        <div className="special-instructions">
          <label htmlFor="instructions">Instrucciones especiales:</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Ej: Sin cebolla, más picante, etc."
            rows={2}
          />
        </div>
        
        <div className="add-to-cart-actions">
          {buttonStyle !== 'full-width' && (
            <button className="cancel-button" onClick={toggleOptions}>
              Cancelar
            </button>
          )}
          <button className="confirm-button" onClick={handleAddToCart}>
            <span>Añadir al carrito</span>
            <span className="price">{(menuItem.price * quantity).toFixed(2)}€</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
