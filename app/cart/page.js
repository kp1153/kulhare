"use client";

import { useCart } from "../../context/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const getCartTotal = () => {
    return (
      cart?.items?.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ) || 0
    );
  };

  if (!cart?.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              आपका कार्ट
            </h1>
            <div className="bg-white rounded-lg shadow-sm p-12">
              <div className="text-gray-500 mb-6">
                <svg
                  className="w-16 h-16 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
                  />
                </svg>
                <h3 className="text-xl font-semibold mb-2">
                  आपका कार्ट खाली है
                </h3>
                <p>कुछ बेहतरीन पुस्तकें अपने कार्ट में जोड़ें</p>
              </div>
              <Link
                href="/"
                className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                पुस्तकें देखें
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">आपका कार्ट</h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2"
          >
            <Trash2 size={18} />
            कार्ट खाली करें
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {cart.items.map((item) => (
                <div
                  key={item._id}
                  className="p-6 border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex items-center gap-4">
                    {/* Book Image */}
                    <div className="w-20 h-28 bg-gray-200 rounded flex-shrink-0">
                      {item.coverImage ? (
                        <img
                          src={item.coverImage}
                          alt={item.title}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Book Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        लेखक: {item.author}
                      </p>
                      <p className="text-orange-600 font-semibold">
                        ₹{item.price}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ₹{item.price * item.quantity}
                      </p>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-600 hover:text-red-700 text-sm mt-1 flex items-center gap-1"
                      >
                        <Trash2 size={14} />
                        हटाएं
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                ऑर्डर सारांश
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>
                    वस्तुएं (
                    {cart.items.reduce((sum, item) => sum + item.quantity, 0)})
                  </span>
                  <span>₹{getCartTotal()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>डिलीवरी</span>
                  <span className="text-green-600">मुफ्त</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold text-lg text-gray-900">
                  <span>कुल राशि</span>
                  <span>₹{getCartTotal()}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-colors text-center block"
              >
                चेकआउट करें
              </Link>

              <Link
                href="/"
                className="w-full border border-gray-300 hover:bg-gray-50 text-gray-900 py-3 rounded-lg font-semibold transition-colors text-center block mt-3"
              >
                खरीदारी जारी रखें
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
