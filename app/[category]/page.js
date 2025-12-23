import { client } from "@/sanity/client";

import { notFound } from "next/navigation";

const categoryNames = {
  "upanyas": "उपन्यास",
  "kahani-sangrah": "कहानी संग्रह",
  "kavita-sangrah": "कविता संग्रह",
  "natak": "नाटक",
  "jeevani-atmakatha-sansmaran": "जीवनी/आत्मकथा/संस्मरण",
  "itihas": "इतिहास",
  "alochana-sahitya-samiksha": "आलोचना/साहित्य समीक्षा",
  "bal-sahitya": "बाल साहित्य",
};

async function getBooksByCategory(category) {
  const books = await client.fetch(`
    *[_type == "book" && category == $category] {
      _id, title, author, price, category,
      "slug": slug.current, "coverImage": coverImage.asset->url
    }
  `, { category });
  return books;
}

export default async function CategoryPage({ params }) {
  const { category } = params;
  
  if (!categoryNames[category]) {
    notFound();
  }

  const books = await getBooksByCategory(category);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">{categoryNames[category]}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {books.map((book) => (
            <div key={book._id} className="bg-white rounded-lg shadow-md p-6">
              {book.coverImage && (
                <img src={book.coverImage} alt={book.title} className="w-full h-48 object-cover rounded mb-4" />
              )}
              <h3 className="font-semibold mb-2">{book.title}</h3>
              <p className="text-gray-600 mb-2">लेखक: {book.author}</p>
              <p className="text-orange-600 font-semibold mb-3">₹{book.price}</p>
              <AddToCartButton book={book} className="w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}