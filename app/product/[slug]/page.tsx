"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { productBySlugQuery } from "@/sanity/lib/queries";
import { useCart } from "@/context/cart-context";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  inStock: boolean;
  images: string[];
  category: { title: string; slug: { current: string }; section?: { title: string; slug: { current: string } } };
};

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    client.fetch(productBySlugQuery, { slug }).then((p) => { setProduct(p); setActiveImg(0); });
  }, [slug]);

  const handleAdd = () => {
    if (!product) return;
    addToCart({ _id: product._id, title: product.title, price: product.price, image: product.images?.[0] || "" });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-16 pb-16">
        {/* Breadcrumb */}
        <div className="border-b border-gray-100 px-6 md:px-12 py-5">
          <div className="text-xs text-gray-400 uppercase tracking-widest flex gap-2">
            <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <span>/</span>
            {product.category && (
              <>
                <Link href={`/category/${product.category.slug.current}`} className="hover:text-gray-900 transition-colors">
                  {product.category.title}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-gray-900">{product.title}</span>
          </div>
        </div>

        <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div className="bg-gray-50 overflow-hidden mb-3">
                {product.images?.[activeImg]
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={product.images[activeImg]} alt={product.title} className="w-full h-[560px] object-cover" />
                  : <div className="w-full h-[560px] flex items-center justify-center text-6xl">🛍️</div>
                }
              </div>
              {product.images?.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((img, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={i} src={img} alt=""
                      onClick={() => setActiveImg(i)}
                      className={`w-20 h-20 object-cover cursor-pointer border-2 transition-all ${activeImg === i ? "border-gray-900" : "border-transparent opacity-50 hover:opacity-100"}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">{product.category?.title}</p>
              <h1 className="text-4xl font-black text-gray-900 uppercase tracking-wide mb-4">{product.title}</h1>
              <p className="text-3xl font-black text-gray-900 mb-6">PKR {product.price?.toLocaleString()}</p>

              <div className="w-12 h-px bg-gray-200 mb-6" />

              {product.description && (
                <p className="text-gray-500 leading-relaxed mb-8 text-sm">{product.description}</p>
              )}

              <div className="flex items-center gap-2 mb-8">
                <span className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-400"}`} />
                <span className="text-gray-400 text-xs uppercase tracking-widest">{product.inStock ? "In Stock" : "Out of Stock"}</span>
              </div>

              <button
                onClick={handleAdd}
                disabled={!product.inStock}
                className={`w-full py-4 font-bold uppercase tracking-widest text-sm transition-all duration-300 ${
                  added ? "bg-green-500 text-white" : "bg-gray-900 text-white hover:bg-black"
                } disabled:opacity-30 disabled:cursor-not-allowed`}
              >
                {added ? "✓ Added to Cart" : "Add to Cart"}
              </button>

              <Link
                href="/cart"
                className="mt-3 w-full py-4 font-bold uppercase tracking-widest text-sm border border-gray-200 text-gray-500 hover:border-gray-900 hover:text-gray-900 transition-all text-center"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
