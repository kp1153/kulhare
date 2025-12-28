// components/SliderClient.js
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SliderClient({ publications }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % publications.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? publications.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#006680] to-[#008ba3] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-white text-3xl md:text-4xl font-bold text-center mb-8">
          नवीनतम प्रकाशन
        </h2>
        
        <div className="relative w-full">
          <div className="flex items-center justify-center gap-4 md:gap-6 w-full">
            <button
              onClick={prevSlide}
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition flex-shrink-0 z-10"
              aria-label="पिछला"
            >
              <ChevronLeft className="text-white" size={32} />
            </button>

            <div className="flex-1 max-w-6xl mx-auto">
              {publications.map((book, index) => (
                <div
                  key={book.id}
                  className={`transition-all duration-500 ${
                    index === currentIndex ? "block" : "hidden"
                  }`}
                >
                  <Link href={`/book/${book.slug}`}>
                    <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8 hover:shadow-3xl transition">
                      <div className="relative w-full h-[600px] md:h-[700px] mb-6">
                        <Image
                          src={book.cover}
                          alt={book.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-[#006680] mb-3 text-center">
                        {book.title}
                      </h3>
                      <p className="text-gray-700 text-lg md:text-xl mb-3 text-center">
                        {book.author}
                      </p>
                      <div className="text-center">
                        <span className="inline-block bg-[#006680] text-white text-base md:text-lg px-6 py-3 rounded-full font-semibold">
                          ₹{book.price}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition flex-shrink-0 z-10"
              aria-label="अगला"
            >
              <ChevronRight className="text-white" size={32} />
            </button>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {publications.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-white w-12" : "bg-white/40 w-3"
                }`}
                aria-label={`स्लाइड ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}