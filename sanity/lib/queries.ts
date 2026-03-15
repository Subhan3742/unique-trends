import { groq } from "next-sanity";

export const sectionsQuery = groq`*[_type == "section"] | order(_createdAt asc) {
  _id, title, slug, description,
  "image": image.asset->url
}`;

export const categoriesQuery = groq`*[_type == "category"] | order(_createdAt asc) {
  _id, title, slug, description,
  "image": image.asset->url,
  "section": section->{ _id, title, slug }
}`;

export const categoriesBySectionQuery = groq`*[_type == "category" && section->slug.current == $slug] | order(_createdAt asc) {
  _id, title, slug, description,
  "image": image.asset->url,
  "section": section->{ _id, title, slug }
}`;

export const productsQuery = groq`*[_type == "product"] | order(_createdAt desc) {
  _id, title, slug, description, price, inStock, featured,
  "category": category->{ _id, title, slug },
  "images": images[].asset->url
}`;

export const productsByCategoryQuery = groq`*[_type == "product" && category->slug.current == $slug] | order(_createdAt desc) {
  _id, title, slug, description, price, inStock, featured,
  "category": category->{ _id, title, slug },
  "images": images[].asset->url
}`;

export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0] {
  _id, title, slug, description, price, inStock, featured,
  "category": category->{ _id, title, slug, "section": section->{ _id, title, slug } },
  "images": images[].asset->url
}`;
