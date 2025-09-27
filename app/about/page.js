// app/about/page.js
import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            हमारे बारे में
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none text-gray-800">
            <p className="text-xl leading-relaxed mb-6">
              अभी हमने सिर्फ चीकू सिंह बुंदेला की कुछ किताबें छापी हैं लेकिन
              प्रकाशक के रूप में हम बेहद महत्वाकांक्षी हैं।
            </p>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                संपर्क करें
              </h2>
              <div className="space-y-2 text-lg">
                <p className="flex items-center">
                  <span className="font-medium">ईमेल:</span>
                  <span className="ml-2 text-blue-600">info@publisher.com</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium">फोन:</span>
                  <span className="ml-2">+91 98765 43210</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
