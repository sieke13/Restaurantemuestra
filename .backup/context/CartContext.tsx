import { createContext, useContext, useReducer } from 'react';
import type { CartItem, MenuItem } from '../types';
import type { ReactNode } from 'react';

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'UPDATE_INSTRUCTIONS'; payload: { id: number; instructions: string } };

export interface CartContextType {
  state: CartState;
  addToCart: (menuItem: MenuItem, quantity: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  updateInstructions: (id: number, instructions: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.menuItem.id === action.payload.menuItem.id
      );

      if (existingItemIndex >= 0) {
        // Item already exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + action.payload.quantity,
          totalAmount: state.totalAmount + (action.payload.menuItem.price * action.payload.quantity)
        };
      }

      // Add new item
      return {
        ...state,
        items: [...state.items, action.payload],
        totalItems: state.totalItems + action.payload.quantity,
        totalAmount: state.totalAmount + (action.payload.menuItem.price * action.payload.quantity)
      };
    }

    case 'REMOVE_ITEM': {
      const itemIndex = state.items.findIndex(
        item => item.menuItem.id === action.payload.id
      );

      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        const newItems = state.items.filter(
          item => item.menuItem.id !== action.payload.id
        );

        return {
          ...state,
          items: newItems,
          totalItems: state.totalItems - item.quantity,
          totalAmount: state.totalAmount - (item.menuItem.price * item.quantity)
        };
      }
      return state;
    }

    case 'UPDATE_QUANTITY': {
      const itemIndex = state.items.findIndex(
        item => item.menuItem.id === action.payload.id
      );

      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        const quantityDiff = action.payload.quantity - item.quantity;
        const updatedItems = [...state.items];
        
        updatedItems[itemIndex] = {
          ...item,
          quantity: action.payload.quantity
        };

        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + quantityDiff,
          totalAmount: state.totalAmount + (item.menuItem.price * quantityDiff)
        };
      }
      return state;
    }

    case 'UPDATE_INSTRUCTIONS': {
      const itemIndex = state.items.findIndex(
        item => item.menuItem.id === action.payload.id
      );

      if (itemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          specialInstructions: action.payload.instructions
        };

        return {
          ...state,
          items: updatedItems
        };
      }
      return state;
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (menuItem: MenuItem, quantity: number) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        menuItem,
        quantity
      }
    });
  };

  const removeFromCart = (id: number) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { id }
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, quantity }
    });
  };

  const updateInstructions = (id: number, instructions: string) => {
    dispatch({
      type: 'UPDATE_INSTRUCTIONS',
      payload: { id, instructions }
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateInstructions,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
