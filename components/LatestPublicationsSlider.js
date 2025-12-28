// components/LatestPublicationsSlider.js
import { client, urlFor } from "@/lib/sanity";
import SliderClient from "./SliderClient";

async function getLatestBooks() {
  const query = `*[_type == "book"] | order(_createdAt desc)[0...4] {
    _id,
    title,
    author,
    coverImage,
    slug,
    price
  }`;
  
  const books = await client.fetch(query);
  
  return books.map((book) => ({
    id: book._id,
    title: book.title,
    author: book.author,
    cover: urlFor(book.coverImage).width(400).height(600).url(),
    slug: book.slug.current,
    price: book.price
  }));
}

export default async function LatestPublicationsSlider() {
  const publications = await getLatestBooks();
  
  return <SliderClient publications={publications} />;
}