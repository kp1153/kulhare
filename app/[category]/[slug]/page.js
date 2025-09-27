import { client } from "@/sanity/client";
import AddToCartButton from "@/components/AddToCartButton";
import { notFound } from "next/navigation";

async function getBookBySlug(slug) {
  const book = await client.fetch(
    `
    *[_type == "book" && slug.current == $slug][0] {
      _id, title, author, price, description, category,
      "slug": slug.current, "coverImage": coverImage.asset->url
    }
  `,
    { slug }
  );
  return book;
}

export default async function BookPage({ params }) {
  const { slug } = params;
  const book = await getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-8">
            {book.coverImage && (
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-96 object-cover rounded"
              />
            )}
          </div>

          <div className="bg-white rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-4">लेखक: {book.author}</p>
            <p className="text-2xl text-orange-600 font-semibold mb-6">
              ₹{book.price}
            </p>
            {book.description && (
              <p className="text-gray-700 mb-6">{book.description}</p>
            )}
            <AddToCartButton book={book} className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
