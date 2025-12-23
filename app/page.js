import HeroSection from "../components/HeroSection";
import { client } from "../sanity/client";
import Link from "next/link";

// Sanity से books fetch करने का function
async function getBooks() {
  try {
    const books = await client.fetch(`
      *[_type == "book"] | order(_createdAt desc)[0...6] {
        _id,
        title,
        author,
        price,
        category,
        "slug": slug.current,
        "coverImage": coverImage.asset->url,
        description
      }
    `);
    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

export default async function HomePage() {
  const books = await getBooks();

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Latest Books Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              नवीनतम पुस्तकें
            </h2>
            <p className="text-lg text-gray-600">
              हमारी ताज़ा प्रकाशित पुस्तकों का संग्रह देखें
            </p>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.length > 0 ? (
              books.map((book) => (
                <div
                  key={book._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  {/* Book Cover */}
                  <div className="aspect-[3/4] bg-gray-200">
                    {book.coverImage ? (
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Book Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 mb-2">लेखक: {book.author}</p>
                    {book.price && (
                      <p className="text-orange-600 font-semibold mb-3">
                        ₹{book.price}
                      </p>
                    )}
                    {book.category && (
                      <span className="inline-block bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full mb-3">
                        {book.category}
                      </span>
                    )}

                    {/* Add to Cart Button */}
                    <AddToCartButton book={book} className="w-full" />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">
                  अभी तक कोई पुस्तक उपलब्ध नहीं है
                </p>
              </div>
            )}
          </div>

          {/* View All Books Button */}
          {books.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/books"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                सभी पुस्तकें देखें
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              श्रेणियाँ
            </h2>
            <p className="text-lg text-gray-600">
              अपनी पसंदीदा श्रेणी की पुस्तकें खोजें
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "उपन्यास", value: "upanyas" },
              { name: "कहानी संग्रह", value: "kahani-sangrah" },
              { name: "कविता संग्रह", value: "kavita-sangrah" },
              { name: "नाटक", value: "natak" },
              {
                name: "जीवनी/आत्मकथा/संस्मरण",
                value: "jeevani-atmakatha-sansmaran",
              },
              { name: "इतिहास", value: "itihas" },
              {
                name: "आलोचना/साहित्य समीक्षा",
                value: "alochana-sahitya-samiksha",
              },
              { name: "बाल साहित्य", value: "bal-sahitya" },
            ].map((category) => (
              <Link
                key={category.value}
                href={`/category/${category.value}`}
                className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
