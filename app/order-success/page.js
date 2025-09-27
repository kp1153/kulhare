"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Package, Truck, Clock } from "lucide-react";

export default function OrderSuccessPage() {
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    // Generate random order number for demo
    const randomOrderId = "KP" + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(randomOrderId);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">ऑर्डर सफल!</h1>

          <p className="text-lg text-gray-600 mb-6">
            आपका ऑर्डर सफलतापूर्वक प्लेस हो गया है
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-500">ऑर्डर नंबर</p>
                <p className="font-semibold text-gray-900 text-lg">
                  {orderNumber}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ऑर्डर दिनांक</p>
                <p className="font-semibold text-gray-900">
                  {new Date().toLocaleDateString("hi-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">भुगतान स्थिति</p>
                <p className="font-semibold text-green-600">सफल</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">डिलीवरी समय</p>
                <p className="font-semibold text-gray-900">5-7 कार्य दिवस</p>
              </div>
            </div>
          </div>

          {/* Order Status Steps */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              ऑर्डर स्थिति
            </h3>
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-green-600 font-medium">
                  ऑर्डर प्लेस्ड
                </p>
              </div>

              <div className="flex-1 h-1 bg-gray-200 mx-2">
                <div className="h-1 bg-orange-500 w-1/3"></div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-2">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-orange-600 font-medium">
                  प्रोसेसिंग
                </p>
              </div>

              <div className="flex-1 h-1 bg-gray-200 mx-2"></div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                  <Truck className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-500 font-medium">शिप्ड</p>
              </div>

              <div className="flex-1 h-1 bg-gray-200 mx-2"></div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-500 font-medium">डिलीवर्ड</p>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <Clock className="w-5 h-5 text-blue-500 mr-3 mt-1" />
              <div className="text-left">
                <h4 className="font-medium text-blue-900 mb-1">
                  महत्वपूर्ण जानकारी
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• आपको ऑर्डर कन्फर्मेशन ईमेल भेजा गया है</li>
                  <li>• शिपिंग अपडेट के लिए SMS और ईमेल मिलेंगे</li>
                  <li>• कोई समस्या हो तो हमसे संपर्क करें</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              खरीदारी जारी रखें
            </Link>

            <Link
              href="/contact"
              className="border border-gray-300 hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              सहायता चाहिए?
            </Link>
          </div>

          {/* Thank You Message */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600">
              <strong>कुल्हारे प्रकाशन</strong> चुनने के लिए धन्यवाद!
            </p>
            <p className="text-sm text-gray-500 mt-2">
              हमारे साथ हिंदी साहित्य की यात्रा में शामिल होने के लिए आभार
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
