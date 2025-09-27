"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
import AddToCartButton from "../../components/AddToCartButton";
import { client } from "../../sanity/client";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");

  const categories = [
    "उपन्यास",
    "कहानी संग्रह",
    "कविता संग्रह",
    "नाटक",
    "जीवनी/आत्मकथा/संस्मरण",
    "इतिहास",
    "आलोचना/साहित्य समीक्षा",
    "बाल साहित्य",
  ];

  // Fetch books from Sanity
  useEffect(() => {
    async function fetchBooks() {
      try {
        const booksData = await client.fetch(`
          *[_type == "book"] | order(_createdAt desc) {
            _id,
            title,
            author,
            price,
            category,
            "slug": slug.current,
            "coverImage": coverImage.asset->url,
            description,
            _createdAt
          }
        `);
        setBooks(booksData);
        setFilteredBooks(booksData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = books;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((book) => book.category === selectedCategory);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b._createdAt) - new Date(a._createdAt);
        case "oldest":
          return new Date(a._createdAt) - new Date(b._createdAt);
        case "price-low":
          return (a.price || 0) - (b.price || 0);
        case "price-high":
          return (b.price || 0) - (a.price || 0);
        case "title":
          return a.title.localeCompare(b.title, "hi");
        default:
          return 0;
      }
    });

    setFilteredBooks(filtered);
  }, [books, searchTerm, selectedCategory, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">पुस्तकें लोड हो रही हैं...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            सभी पुस्तकें
          </h1>
          <p className="text-lg text-gray-600">
            हमारे विशाल संग्रह से अपनी पसंदीदा पुस्तकें खोजें
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Search */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                खोजें
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="पुस्तक या लेखक का नाम..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                श्रेणी
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">सभी श्रेणियाँ</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                क्रमबद्ध करें
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="newest">नवीनतम</option>
                <option value="oldest">पुरानी</option>
                <option value="price-low">कम कीमत</option>
                <option value="price-high">ज्यादा कीमत</option>
                <option value="title">नाम से</option>
              </select>
            </div>

            {/* View Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                दृश्य
              </label>
              <div className="flex border border-gray-300 rounded-md">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex-1 px-3 py-2 flex items-center justify-center ${
                    viewMode === "grid"
                      ? "bg-orange-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex-1 px-3 py-2 flex items-center justify-center border-l ${
                    viewMode === "list"
                      ? "bg-orange-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">{filteredBooks.length} पुस्तकें मिलीं</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("");
              setSortBy("newest");
            }}
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            फिल्टर साफ़ करें
          </button>
        </div>

        {/* Books Grid/List */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">कोई पुस्तक नहीं मिली</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
              }}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              सभी पुस्तकें देखें
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow ${
                  viewMode === "list" ? "flex gap-4 p-4" : "overflow-hidden"
                }`}
              >
                {/* Book Image */}
                <div
                  className={
                    viewMode === "list"
                      ? "w-24 h-32 bg-gray-200 rounded flex-shrink-0"
                      : "aspect-[3/4] bg-gray-200"
                  }
                >
                  {book.coverImage ? (
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* Book Info */}
                <div className={viewMode === "list" ? "flex-1" : "p-4"}>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    लेखक: {book.author}
                  </p>

                  {book.description && viewMode === "list" && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {book.description}
                    </p>
                  )}

                  {book.price && (
                    <p className="text-orange-600 font-semibold mb-3">
                      ₹{book.price}
                    </p>
                  )}

                  {book.category && (
                    <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full mb-3">
                      {book.category}
                    </span>
                  )}

                  <AddToCartButton
                    book={book}
                    className={viewMode === "list" ? "w-auto" : "w-full"}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
