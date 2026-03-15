"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { productsByCategoryQuery, categoriesQuery } from "@/sanity/lib/queries";
import { useCart } from "@/context/cart-context";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

type Product = {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  inStock: boolean;
  images: string[];
  category: { title: string; slug: { current: string } };
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    Promise.all([
      client.fetch(productsByCategoryQuery, { slug }),
      client.fetch(categoriesQuery),
    ]).then(([prods, cats]) => {
      setProducts(prods);
      const cat = cats.find((c: any) => c.slug.current === slug);
      if (cat) setCategoryTitle(cat.title);
      setLoading(false);
    });
  }, [slug]);

  const handleAdd = (p: Product) => {
    addToCart({ _id: p._id, title: p.title, price: p.price, image: p.images?.[0] || "" });
    setAdded(p._id);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700 font-medium">{categoryTitle}</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-8 uppercase tracking-wide">
            {categoryTitle}
          </h1>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-lg" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-400 py-20 text-lg">No products in this category yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.map((product) => (
                <div key={product._id} className="group relative bg-white">
                  <Link href={`/product/${product.slug.current}`}>
                    <div className="relative overflow-hidden">
                      {product.images?.[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-80 bg-gray-100 flex items-center justify-center">
                          <span className="text-5xl">🛍️</span>
                        </div>
                      )}
                      {/* Quick add button */}
                      <button
                        onClick={(e) => { e.preventDefault(); handleAdd(product); }}
                        disabled={!product.inStock}
                        className={`absolute bottom-3 right-3 w-8 h-8 flex items-center justify-center font-bold text-lg shadow-lg transition-all ${
                          added === product._id ? "bg-white text-black" : "bg-black/70 text-white hover:bg-white hover:text-black"
                        } disabled:opacity-40`}
                      >
                        {added === product._id ? "✓" : "+"}
                      </button>
                    </div>
                  </Link>
                  <div className="pt-3 pb-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">{product.category?.title}</p>
                    <Link href={`/product/${product.slug.current}`}>
                      <h3 className="text-sm font-medium text-gray-800 mt-1 hover:text-pink-600 transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-sm font-semibold text-gray-900 mt-1">
                      PKR {product.price?.toLocaleString()}
                    </p>
                    {!product.inStock && (
                      <p className="text-xs text-red-400 mt-1">Out of Stock</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
