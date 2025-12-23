import { notFound } from "next/navigation";
import { client } from "../../../sanity/client";
import Link from "next/link";
import { ArrowLeft, Share2 } from "lucide-react";

// Get single book by slug
async function getBook(slug) {
  try {
    const book = await client.fetch(
      `
      *[_type == "book" && slug.current == $slug][0] {
        _id,
        title,
        author,
        price,
        category,
        "slug": slug.current,
        "coverImage": coverImage.asset->url,
        description,
        _createdAt,
        pages,
        publisher,
        publishedDate,
        isbn,
        language
      }
    `,
      { slug }
    );

    return book;
  } catch (error) {
    console.error("Error fetching book:", error);
    return null;
  }
}

// Get related books
async function getRelatedBooks(category, currentBookId) {
  try {
    const relatedBooks = await client.fetch(
      `
      *[_type == "book" && category == $category && _id != $currentBookId] | order(_createdAt desc)[0...4] {
        _id,
        title,
        author,
        price,
        category,
        "slug": slug.current,
        "coverImage": coverImage.asset->url
      }
    `,
      { category, currentBookId }
    );

    return relatedBooks;
  } catch (error) {
    console.error("Error fetching related books:", error);
    return [];
  }
}

export default async function BookDetailPage({ params }) {
  const { slug } = params;
  const book = await getBook(slug);

  if (!book) {
    notFound();
  }

  const relatedBooks = await getRelatedBooks(book.category, book._id);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/books"
          className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-8 font-medium"
        >
          <ArrowLeft size={20} className="mr-2" />
          सभी पुस्तकों पर वापस जाएं
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Book Image */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              {book.coverImage ? (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              ) : (
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-lg">
                    No Image Available
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Book Details */}
          <div className="space-y-6">
            {/* Title and Author */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {book.title}
              </h1>
              <p className="text-xl text-gray-600 mb-2">
                <span className="font-medium">लेखक:</span> {book.author}
              </p>
              {book.category && (
                <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  {book.category}
                </span>
              )}
            </div>

            {/* Price and Actions */}
            <div className="border-t border-b border-gray-200 py-6">
              {book.price && (
                <div className="mb-6">
                  <span className="text-3xl font-bold text-orange-600">
                    ₹{book.price}
                  </span>
                  <span className="text-gray-500 ml-2">मुफ्त डिलीवरी</span>
                </div>
              )}

              <div className="flex gap-4">
                <a
                  href="tel:9891022477"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-center px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  संपर्क करें
                </a>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Book Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                पुस्तक की जानकारी
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {book.pages && (
                  <div>
                    <span className="font-medium text-gray-700">पृष्ठ:</span>
                    <span className="text-gray-600 ml-2">{book.pages}</span>
                  </div>
                )}
                {book.publisher && (
                  <div>
                    <span className="font-medium text-gray-700">प्रकाशक:</span>
                    <span className="text-gray-600 ml-2">{book.publisher}</span>
                  </div>
                )}
                {book.publishedDate && (
                  <div>
                    <span className="font-medium text-gray-700">
                      प्रकाशन वर्ष:
                    </span>
                    <span className="text-gray-600 ml-2">
                      {new Date(book.publishedDate).getFullYear()}
                    </span>
                  </div>
                )}
                {book.isbn && (
                  <div>
                    <span className="font-medium text-gray-700">ISBN:</span>
                    <span className="text-gray-600 ml-2">{book.isbn}</span>
                  </div>
                )}
                {book.language && (
                  <div>
                    <span className="font-medium text-gray-700">भाषा:</span>
                    <span className="text-gray-600 ml-2">{book.language}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {book.description && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  पुस्तक का विवरण
                </h3>
                <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {book.description}
                </div>
              </div>
            )}

            {/* Features */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">✓ विशेषताएं</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• मुफ्त होम डिलीवरी</li>
                <li>• 7 दिन रिटर्न पॉलिसी</li>
                <li>• सुरक्षित पेमेंट</li>
                <li>• 100% ऑथेंटिक प्रोडक्ट</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              संबंधित पुस्तकें
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedBooks.map((relatedBook) => (
                <Link
                  key={relatedBook._id}
                  href={`/books/${relatedBook.slug}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="aspect-[3/4] bg-gray-200">
                    {relatedBook.coverImage ? (
                      <img
                        src={relatedBook.coverImage}
                        alt={relatedBook.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedBook.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      लेखक: {relatedBook.author}
                    </p>
                    {relatedBook.price && (
                      <p className="text-orange-600 font-semibold">
                        ₹{relatedBook.price}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Generate static params for better performance (optional)
export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(`
      *[_type == "book" && defined(slug.current)][].slug.current
    `);

    return slugs.map((slug) => ({
      slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const book = await getBook(params.slug);

  if (!book) {
    return {
      title: "Book Not Found",
    };
  }

  return {
    title: `${book.title} - मेधा बुक्स`,
    description: book.description || `${book.title} by ${book.author}`,
    openGraph: {
      title: book.title,
      description: book.description,
      images: book.coverImage ? [book.coverImage] : [],
    },
  };
}