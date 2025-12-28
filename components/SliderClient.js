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
    <div className="bg-gradient-to-r from-[#006680] to-[#008ba3] py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-white text-2xl md:text-3xl font-bold text-center mb-6">
          नवीनतम प्रकाशन
        </h2>
        
        <div className="relative w-full">
          <div className="flex items-center justify-center gap-4 md:gap-8 w-full">
            <button
              onClick={prevSlide}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition flex-shrink-0"
              aria-label="पिछला"
            >
              <ChevronLeft className="text-white" size={24} />
            </button>

            <div className="flex gap-4 overflow-hidden w-full max-w-md mx-auto">
              {publications.map((book, index) => (
                <div
                  key={book.id}
                  className={`transition-all duration-500 w-full ${
                    index === currentIndex ? "block" : "hidden"
                  }`}
                >
                  <Link href={`/book/${book.slug}`}>
                    <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition w-full">
                      <div className="relative h-96 mb-4 w-full">
                        <Image
                          src={book.cover}
                          alt={book.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-[#006680] mb-1">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-1">
                        {book.author}
                      </p>
                      <span className="inline-block bg-[#006680] text-white text-xs px-3 py-1 rounded-full">
                        ₹{book.price}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition flex-shrink-0"
              aria-label="अगला"
            >
              <ChevronRight className="text-white" size={24} />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {publications.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition ${
                  index === currentIndex ? "bg-white w-8" : "bg-white/40"
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