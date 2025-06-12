import { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/OrderPage.css';

const OrderPage: React.FC = () => {
  const { state, updateQuantity, removeFromCart, updateInstructions, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    orderType: 'pickup' as 'pickup' | 'delivery',
    paymentMethod: 'card' as 'card' | 'cash' | 'online',
    deliveryTime: '',
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Calculate delivery fee based on order amount
  const deliveryFee = formData.orderType === 'delivery' ? 
    (state.totalAmount > 30 ? 0 : 3.99) : 0;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user changes it
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    
    if (!formData.name) errors.name = 'Por favor, introduce tu nombre.';
    if (!formData.phone) errors.phone = 'Por favor, introduce tu teléfono.';
    if (!formData.email) {
      errors.email = 'Por favor, introduce tu email.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Por favor, introduce un email válido.';
    }
    
    if (formData.orderType === 'delivery' && !formData.address) {
      errors.address = 'Por favor, introduce tu dirección para la entrega.';
    }
    
    if (state.items.length === 0) {
      errors.cart = 'Tu carrito está vacío.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitting(true);
      
      try {
        // Simulamos el envío del pedido
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // En una aplicación real, aquí haríamos un fetch a una API
        // fetch('/api/orders', {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     items: state.items,
        //     customer: {
        //       name: formData.name,
        //       email: formData.email,
        //       phone: formData.phone,
        //     },
        //     delivery: formData.orderType === 'delivery' ? { address: formData.address } : null,
        //     paymentMethod: formData.paymentMethod,
        //   })
        // })
        
        setOrderComplete(true);
        clearCart();
      } catch (error) {
        console.error('Error al enviar el pedido:', error);
        setFormErrors(prev => ({
          ...prev,
          submit: 'Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo.'
        }));
      } finally {
        setSubmitting(false);
      }
    }
  };

  if (orderComplete) {
    return (
      <div className="order-page">
        <div className="container">
          <div className="order-success">
            <svg className="order-success-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="#4CAF50" />
              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" fill="none" />
            </svg>
            <h2>¡Pedido realizado con éxito!</h2>
            <p>Hemos recibido tu pedido. En breve recibirás un email de confirmación con los detalles.</p>
            <div className="order-actions">
              <button 
                className="back-to-home"
                onClick={() => window.location.href = '/'}
              >
                Volver a inicio
              </button>
              <button 
                className="view-menu"
                onClick={() => window.location.href = '/menu'}
              >
                Ver menú
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page">
      <div className="container">
        <h1 className="section-title">Tu Pedido</h1>
        
        {state.items.length === 0 ? (
          <div className="empty-order">
            <p>Tu carrito está vacío</p>
            <button 
              className="view-menu-btn"
              onClick={() => window.location.href = '/menu'}
            >
              Ver menú
            </button>
          </div>
        ) : (
          <div className="order-grid">
            <div className="order-cart">
              <h2>Resumen del pedido</h2>
              
              <div className="order-items">
                {state.items.map(item => (
                  <div className="order-item" key={item.menuItem.id}>
                    <div className="order-item-image">
                      <img src={item.menuItem.imageUrl} alt={item.menuItem.name} />
                    </div>
                    
                    <div className="order-item-content">
                      <h3>{item.menuItem.name}</h3>
                      <p className="order-item-price">{item.menuItem.price.toFixed(2)}€</p>
                      
                      {item.specialInstructions && (
                        <p className="order-item-instructions">
                          <em>{item.specialInstructions}</em>
                        </p>
                      )}
                      
                      <div className="order-item-actions">
                        <div className="quantity-controls">
                          <button 
                            onClick={() => {
                              if (item.quantity > 1) {
                                updateQuantity(item.menuItem.id, item.quantity - 1);
                              } else {
                                removeFromCart(item.menuItem.id);
                              }
                            }}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}>
                            +
                          </button>
                        </div>
                        
                        <button 
                          className="remove-button" 
                          onClick={() => removeFromCart(item.menuItem.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                      
                      <div className="order-item-total">
                        <input
                          type="text"
                          placeholder="Instrucciones especiales..."
                          value={item.specialInstructions || ''}
                          onChange={(e) => updateInstructions(item.menuItem.id, e.target.value)}
                          className="instructions-input"
                        />
                      </div>
                    </div>
                    
                    <div className="order-item-subtotal">
                      {(item.quantity * item.menuItem.price).toFixed(2)}€
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="order-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{state.totalAmount.toFixed(2)}€</span>
                </div>
                {formData.orderType === 'delivery' && (
                  <div className="summary-row">
                    <span>Gastos de envío {state.totalAmount > 30 ? '(Gratis +30€)' : ''}</span>
                    <span>{deliveryFee.toFixed(2)}€</span>
                  </div>
                )}
                <div className="summary-row total">
                  <span>Total</span>
                  <span>{(state.totalAmount + deliveryFee).toFixed(2)}€</span>
                </div>
              </div>
            </div>
            
            <div className="order-form">
              <h2>Datos de contacto</h2>
              
              {formErrors.submit && (
                <div className="error-message">{formErrors.submit}</div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nombre completo*</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={formErrors.name ? 'error' : ''}
                  />
                  {formErrors.name && <div className="error-text">{formErrors.name}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={formErrors.email ? 'error' : ''}
                  />
                  {formErrors.email && <div className="error-text">{formErrors.email}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Teléfono*</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={formErrors.phone ? 'error' : ''}
                  />
                  {formErrors.phone && <div className="error-text">{formErrors.phone}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="orderType">Tipo de pedido*</label>
                  <select
                    id="orderType"
                    name="orderType"
                    value={formData.orderType}
                    onChange={handleInputChange}
                  >
                    <option value="pickup">Recoger en restaurante</option>
                    <option value="delivery">Entrega a domicilio</option>
                  </select>
                </div>
                
                {formData.orderType === 'delivery' && (
                  <div className="form-group">
                    <label htmlFor="address">Dirección de entrega*</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={formErrors.address ? 'error' : ''}
                      placeholder="Calle, número, piso, código postal, ciudad"
                    />
                    {formErrors.address && <div className="error-text">{formErrors.address}</div>}
                  </div>
                )}
                
                <div className="form-group">
                  <label htmlFor="paymentMethod">Método de pago*</label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                  >
                    <option value="card">Tarjeta de crédito</option>
                    <option value="cash">Efectivo</option>
                    <option value="online">Pago online</option>
                  </select>
                </div>
                
                <div className="form-actions">
                  <button
                    type="submit"
                    className="place-order-btn"
                    disabled={submitting}
                  >
                    {submitting ? 'Procesando...' : 'Realizar pedido'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
