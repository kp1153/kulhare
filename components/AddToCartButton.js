"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function AddToCartButton({ book, className = "" }) {
  const { addToCart, getItemQuantity } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const quantity = getItemQuantity(book._id);

  const handleAddToCart = async () => {
    setIsAdding(true);

    // Add to cart
    addToCart({
      _id: book._id,
      title: book.title,
      author: book.author,
      price: book.price,
      coverImage: book.coverImage,
      slug: book.slug,
    });

    // Show feedback animation
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  if (quantity > 0) {
    return (
      <div className={`flex items-center justify-between ${className}`}>
        <span className="text-sm text-green-600 font-medium">
          कार्ट में: {quantity}
        </span>
        <button
          onClick={handleAddToCart}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + और जोड़ें
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding || !book.price}
      className={`bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 ${className} ${
        isAdding ? "scale-95" : "hover:scale-105"
      }`}
    >
      {isAdding ? (
        <div className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          जोड़ा जा रहा...
        </div>
      ) : (
        "कार्ट में जोड़ें"
      )}
    </button>
  );
}
