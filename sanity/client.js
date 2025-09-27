import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: true, // Production के लिए true, development के लिए false
  apiVersion: "2023-05-03", // Current date या पहले की date
  token: process.env.SANITY_API_TOKEN, // Optional: Write operations के लिए
});

// Image URL helper function
export function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

// Image URL builder import
import imageUrlBuilder from "@sanity/image-url";
const builder = imageUrlBuilder(client);
