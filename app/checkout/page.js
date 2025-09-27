"use client";

import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  const getCartTotal = () => {
    return (
      cart?.items?.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ) || 0
    );
  };
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  // Redirect if cart is empty
  if (!cart?.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">चेकआउट</h1>
            <div className="bg-white rounded-lg shadow-sm p-12">
              <p className="text-gray-500 mb-6">आपका कार्ट खाली है</p>
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!customerDetails.name.trim()) {
      newErrors.name = "नाम आवश्यक है";
    }

    if (!customerDetails.phone.trim()) {
      newErrors.phone = "फोन नंबर आवश्यक है";
    } else if (!/^[0-9]{10}$/.test(customerDetails.phone)) {
      newErrors.phone = "वैध फोन नंबर दर्ज करें";
    }

    if (!customerDetails.email.trim()) {
      newErrors.email = "ईमेल आवश्यक है";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerDetails.email)) {
      newErrors.email = "वैध ईमेल दर्ज करें";
    }

    if (!customerDetails.address.trim()) {
      newErrors.address = "पता आवश्यक है";
    }

    if (!customerDetails.city.trim()) {
      newErrors.city = "शहर आवश्यक है";
    }

    if (!customerDetails.state.trim()) {
      newErrors.state = "राज्य आवश्यक है";
    }

    if (!customerDetails.pincode.trim()) {
      newErrors.pincode = "पिन कोड आवश्यक है";
    } else if (!/^[0-9]{6}$/.test(customerDetails.pincode)) {
      newErrors.pincode = "वैध पिन कोड दर्ज करें";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Create order data
      const orderData = {
        customer: customerDetails,
        items: cart.items,
        total: getCartTotal(),
        timestamp: new Date().toISOString(),
      };

      // Here you would typically:
      // 1. Create order in database
      // 2. Initialize payment
      // 3. Redirect to payment gateway

      console.log("Order Data:", orderData);

      // Simulate payment process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear cart and redirect to success page
      clearCart();
      router.push("/order-success");
    } catch (error) {
      console.error("Order processing failed:", error);
      alert("ऑर्डर प्रोसेसिंग में त्रुटि। कृपया पुनः प्रयास करें।");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          चेकआउट
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Details Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              डिलीवरी जानकारी
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  पूरा नाम *
                </label>
                <input
                  type="text"
                  name="name"
                  value={customerDetails.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="आपका पूरा नाम"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    फोन नंबर *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerDetails.phone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="10 अंकों का नंबर"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ईमेल *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={customerDetails.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  पूरा पता *
                </label>
                <textarea
                  name="address"
                  value={customerDetails.address}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="घर का पता, गली, मोहल्ला"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    शहर *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={customerDetails.city}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="शहर"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    राज्य *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={customerDetails.state}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.state ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="राज्य"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    पिन कोड *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={customerDetails.pincode}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.pincode ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="6 अंक"
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.pincode}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6 h-fit sticky top-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              ऑर्डर सारांश
            </h2>

            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {cart.items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-xs">
                      मात्रा: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div className="space-y-2 mb-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-gray-600">
                <span>उप योग</span>
                <span>₹{getCartTotal()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>डिलीवरी</span>
                <span className="text-green-600">मुफ्त</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-200">
                <span>कुल राशि</span>
                <span>₹{getCartTotal()}</span>
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                isProcessing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-600 hover:bg-orange-700"
              } text-white`}
            >
              {isProcessing ? "प्रक्रिया में..." : "ऑर्डर करें"}
            </button>

            <Link
              href="/cart"
              className="w-full border border-gray-300 hover:bg-gray-50 text-gray-900 py-3 rounded-lg font-semibold transition-colors text-center block mt-3"
            >
              कार्ट पर वापस जाएं
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
