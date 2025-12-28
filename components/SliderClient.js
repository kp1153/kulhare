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
      <div className="w-full">
        <div className="relative w-full px-4">
          <div className="w-full mb-6">
            {publications.map((book, index) => (
              <div
                key={book.id}
                className={`${index === currentIndex ? "block" : "hidden"}`}
              >
                <Link href={`/book/${book.slug}`}>
                  <div className="text-center w-full">
                    <div className="relative w-full h-[380px] md:h-[480px] mb-6">
                      <Image
                        src={book.cover}
                        alt={book.title}
                        fill
                        className="object-contain drop-shadow-2xl"
                      />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {book.title}
                    </h3>
                    <p className="text-white/90 text-lg md:text-xl mb-3">
                      {book.author}
                    </p>
                    <span className="inline-block bg-white text-[#006680] text-lg px-6 py-3 rounded-full font-bold">
                      ₹{book.price}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevSlide}
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition"
              aria-label="पिछला"
            >
              <ChevronLeft className="text-white" size={32} />
            </button>

            <div className="flex justify-center gap-3">
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

            <button
              onClick={nextSlide}
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition"
              aria-label="अगला"
            >
              <ChevronRight className="text-white" size={32} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}