// components/HeroSection.js
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-[#006680] mb-6">
          हिंदी साहित्य का डिजिटल खजाना
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          चर्चित लेखकों के साथ-साथ युवा प्रतिभाओं को भी मिलता है मंच। 
          पढ़ें उपन्यास, कविता, कहानी और आलोचना - सब एक जगह।
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/novels"
            className="bg-[#006680] hover:bg-[#005570] text-white px-8 py-4 rounded-lg text-lg font-semibold transition shadow-lg hover:shadow-xl w-full sm:w-auto"
          >
            उपन्यास पढ़ें
          </Link>
          
          <Link
            href="/rachna-bheje"
            className="bg-white hover:bg-gray-50 text-[#006680] border-2 border-[#006680] px-8 py-4 rounded-lg text-lg font-semibold transition shadow-lg hover:shadow-xl w-full sm:w-auto"
          >
            अपनी रचना भेजें
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-[#006680] mb-2">५००+</div>
            <div className="text-gray-600">रचनाएं</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-[#006680] mb-2">१००+</div>
            <div className="text-gray-600">लेखक</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-[#006680] mb-2">निःशुल्क</div>
            <div className="text-gray-600">पढ़ें</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-[#006680] mb-2">साप्ताहिक</div>
            <div className="text-gray-600">नई सामग्री</div>
          </div>
        </div>
      </div>
    </section>
  );
}