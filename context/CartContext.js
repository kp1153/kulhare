"use client";

import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          totalItems: state.totalItems + 1,
          totalAmount: state.totalAmount + action.payload.price,
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          totalItems: state.totalItems + 1,
          totalAmount: state.totalAmount + action.payload.price,
        };
      }

    case "REMOVE_FROM_CART":
      const itemToRemove = state.items.find(
        (item) => item._id === action.payload
      );
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
        totalItems: state.totalItems - itemToRemove.quantity,
        totalAmount:
          state.totalAmount - itemToRemove.price * itemToRemove.quantity,
      };

    case "UPDATE_QUANTITY":
      const item = state.items.find((item) => item._id === action.payload.id);
      const quantityDiff = action.payload.quantity - item.quantity;

      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        totalItems: state.totalItems + quantityDiff,
        totalAmount: state.totalAmount + item.price * quantityDiff,
      };

    case "CLEAR_CART":
      return {
        items: [],
        totalItems: 0,
        totalAmount: 0,
      };

    case "LOAD_CART":
      return action.payload;

    default:
      return state;
  }
};

const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from memory on mount
  useEffect(() => {
    const savedCart = JSON.parse(sessionStorage.getItem("cart") || "{}");
    if (savedCart.items) {
      dispatch({ type: "LOAD_CART", payload: savedCart });
    }
  }, []);

  // Save cart to memory whenever it changes
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book) => {
    dispatch({ type: "ADD_TO_CART", payload: book });
  };

  const removeFromCart = (bookId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: bookId });
  };

  const updateQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id: bookId, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getItemQuantity = (bookId) => {
    const item = cart.items.find((item) => item._id === bookId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
