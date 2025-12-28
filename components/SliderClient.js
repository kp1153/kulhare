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
          <div className="flex items-center justify-center gap-6 md:gap-8 w-full">
            <button
              onClick={prevSlide}
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition flex-shrink-0"
              aria-label="पिछला"
            >
              <ChevronLeft className="text-white" size={32} />
            </button>

            <div className="flex gap-4 overflow-hidden w-full max-w-2xl mx-auto">
              {publications.map((book, index) => (
                <div
                  key={book.id}
                  className={`transition-all duration-500 w-full ${
                    index === currentIndex ? "block" : "hidden"
                  }`}
                >
                  <Link href={`/book/${book.slug}`}>
                    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition w-full">
                      <div className="relative h-[500px] md:h-[600px] mb-4 w-full">
                        <Image
                          src={book.cover}
                          alt={book.title}
                          fill
                          className="object-contain rounded"
                        />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-[#006680] mb-2">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 text-base md:text-lg mb-2">
                        {book.author}
                      </p>
                      <span className="inline-block bg-[#006680] text-white text-sm md:text-base px-4 py-2 rounded-full">
                        ₹{book.price}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition flex-shrink-0"
              aria-label="अगला"
            >
              <ChevronRight className="text-white" size={32} />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {publications.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition ${
                  index === currentIndex ? "bg-white w-10" : "bg-white/40"
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