import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-orange-50 to-amber-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              कुल्हारे प्रकाशन
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              हिंदी साहित्य का भंडार
            </p>
            <p className="text-lg text-gray-500 mb-10 leading-relaxed">
              उच्च गुणवत्ता की पुस्तकों के साथ, हम भारतीय संस्कृति और साहित्य को
              आगे बढ़ाने में योगदान देते हैं।
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/books"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                पुस्तकें देखें
              </Link>
              <Link
                href="/contact"
                className="border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                संपर्क करें
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <img
                src="/api/placeholder/400/500"
                alt="हिंदी पुस्तकें"
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg">
              1000+ पुस्तकें
            </div>
            <div className="absolute -bottom-4 -left-4 bg-amber-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg">
              विश्वसनीय प्रकाशन
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
