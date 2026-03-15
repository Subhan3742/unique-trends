"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { client } from "@/sanity/lib/client";
import { categoriesQuery, productsQuery } from "@/sanity/lib/queries";
import { useCart } from "@/context/cart-context";

type Category = {
  _id: string;
  title: string;
  slug: { current: string };
};

type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  inStock: boolean;
  images: string[];
  category: { _id: string; title: string; slug: { current: string } };
};

export default function ProductsSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    Promise.all([client.fetch(categoriesQuery), client.fetch(productsQuery)])
      .then(([cats, prods]) => {
        setCategories(cats);
        setProducts(prods);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category?.slug?.current === activeCategory);

  const handleAddToCart = (product: Product) => {
    addToCart({
      _id: product._id,
      title: product.title,
      price: product.price,
      image: product.images?.[0] || "",
    });
    setAdded(product._id);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <section id="products" className="py-20 px-4 bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Our Collections
          </h2>
          <p className="text-center text-gray-600 mb-10 text-lg">
            Discover our curated selection of premium watches and jewelry
          </p>
        </motion.div>

        {/* Category Tabs */}
        {!loading && categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === "all"
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-pink-400"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setActiveCategory(cat.slug.current)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === cat.slug.current
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-pink-400"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-20">No products found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {product.images?.[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={product.images[0]} alt={product.title} className="w-full h-52 object-cover" />
                ) : (
                  <div className="w-full h-52 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                    <span className="text-5xl">🛍️</span>
                  </div>
                )}
                <div className="p-4">
                  <span className="text-xs text-pink-500 font-medium uppercase tracking-wide">
                    {product.category?.title}
                  </span>
                  <h3 className="font-bold text-gray-800 text-lg mt-1">{product.title}</h3>
                  {product.description && (
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-pink-600 font-bold text-lg">
                      PKR {product.price?.toLocaleString()}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${product.inStock ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className={`w-full mt-3 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                      added === product._id
                        ? "bg-green-500 text-white"
                        : "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg"
                    } disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    {added === product._id ? "✓ Added!" : "Add to Cart"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
