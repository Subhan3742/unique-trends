"use client";
import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, updateQty, clearCart, totalPrice } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<"cart" | "shipping" | "success">("cart");
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    address: "", city: "", province: "", postalCode: "", notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { name: form.name, phone: form.phone, email: form.email },
          shippingAddress: { address: form.address, city: form.city, province: form.province, postalCode: form.postalCode },
          items: items.map((i) => ({ productId: i._id, title: i.title, price: i.price, quantity: i.quantity, image: i.image })),
          totalAmount: totalPrice,
          notes: form.notes,
        }),
      });
      const data = await res.json();
      if (data.success) { setOrderNumber(data.orderNumber); clearCart(); setStep("success"); }
    } finally { setLoading(false); }
  };

  if (step === "success") {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="border border-white/10 p-12 text-center max-w-md w-full">
            <div className="text-5xl mb-6">✓</div>
            <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-3">Order Placed</h2>
            <p className="text-white/40 mb-2 text-sm">Order <span className="text-white font-semibold">{orderNumber}</span></p>
            <p className="text-white/30 text-sm mb-8">We will contact you to confirm delivery.</p>
            <button onClick={() => router.push("/")} className="w-full py-3 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-gray-100 transition-all">
              Continue Shopping
            </button>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-16 pb-16">
        {/* Header */}
        <div className="border-b border-gray-100 px-6 md:px-12 py-8">
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-widest">
            {step === "cart" ? "Your Cart" : "Shipping Details"}
          </h1>
          {step === "cart" && <p className="text-gray-400 text-sm mt-1">{items.length} item{items.length !== 1 ? "s" : ""}</p>}
        </div>

        <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto">
          {step === "cart" && (
            items.length === 0 ? (
              <div className="text-center py-32">
                <p className="text-white/30 text-xl uppercase tracking-widest mb-8">Your cart is empty</p>
                <button onClick={() => router.push("/")} className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-gray-100 transition-all">
                  Shop Now
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-px">
                  {items.map((item) => (
                    <div key={item._id} className="bg-gray-50 p-4 flex gap-4 border border-gray-100">
                      {item.image
                        // eslint-disable-next-line @next/next/no-img-element
                        ? <img src={item.image} alt={item.title} className="w-20 h-20 object-cover" />
                        : <div className="w-20 h-20 bg-white/10 flex items-center justify-center text-2xl">🛍️</div>
                      }
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">{item.title}</h3>
                        <p className="text-gray-400 text-sm mt-1">PKR {item.price.toLocaleString()}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <button onClick={() => updateQty(item._id, item.quantity - 1)} className="w-7 h-7 border border-gray-200 text-gray-700 hover:bg-gray-900 hover:text-white transition-all font-bold">-</button>
                          <span className="text-gray-900 text-sm w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQty(item._id, item.quantity + 1)} className="w-7 h-7 border border-gray-200 text-gray-700 hover:bg-gray-900 hover:text-white transition-all font-bold">+</button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button onClick={() => removeFromCart(item._id)} className="text-gray-300 hover:text-gray-900 text-xl transition-colors">×</button>
                        <p className="text-gray-900 font-bold text-sm">PKR {(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border border-gray-100 p-6 h-fit">
                  <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm mb-6">Order Summary</h3>
                  <div className="space-y-3 mb-6">
                    {items.map((i) => (
                      <div key={i._id} className="flex justify-between text-sm">
                        <span className="text-gray-400">{i.title} ×{i.quantity}</span>
                        <span className="text-gray-900">PKR {(i.price * i.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 pt-4 flex justify-between mb-6">
                    <span className="text-gray-900 font-bold uppercase tracking-wide text-sm">Total</span>
                    <span className="text-gray-900 font-black">PKR {totalPrice.toLocaleString()}</span>
                  </div>
                  <button onClick={() => setStep("shipping")} className="w-full py-3 bg-gray-900 text-white font-bold uppercase tracking-widest text-sm hover:bg-black transition-all">
                    Checkout
                  </button>
                </div>
              </div>
            )
          )}

          {step === "shipping" && (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 border border-gray-100 p-6">
                <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm mb-6">Customer & Shipping Info</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: "name", label: "Full Name", placeholder: "Ali Ahmed" },
                    { name: "phone", label: "Phone Number", placeholder: "03XX XXXXXXX" },
                    { name: "email", label: "Email (optional)", placeholder: "ali@email.com" },
                    { name: "address", label: "Street Address", placeholder: "House #, Street, Area" },
                    { name: "city", label: "City", placeholder: "Karachi" },
                    { name: "province", label: "Province", placeholder: "Sindh" },
                    { name: "postalCode", label: "Postal Code", placeholder: "75500" },
                  ].map((f) => (
                    <div key={f.name} className={f.name === "address" ? "sm:col-span-2" : ""}>
                      <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">{f.label}</label>
                      <input
                        name={f.name}
                        value={(form as any)[f.name]}
                        onChange={handleChange}
                        placeholder={f.placeholder}
                        className="w-full bg-white border border-gray-200 text-gray-900 placeholder-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors"
                      />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">Order Notes (optional)</label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Any special instructions..."
                      rows={3}
                      className="w-full bg-white border border-gray-200 text-gray-900 placeholder-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors resize-none"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep("cart")} className="px-6 py-3 border border-gray-200 text-gray-400 hover:text-gray-900 hover:border-gray-900 text-sm uppercase tracking-widest transition-all">
                    Back
                  </button>
                  <button
                    onClick={handleOrder}
                    disabled={loading || !form.name || !form.phone || !form.address || !form.city}
                    className="flex-1 py-3 bg-gray-900 text-white font-bold uppercase tracking-widest text-sm hover:bg-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {loading ? "Placing Order..." : "Place Order"}
                  </button>
                </div>
              </div>

              <div className="border border-gray-100 p-6 h-fit">
                <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm mb-6">Order Summary</h3>
                <div className="space-y-3 mb-6">
                  {items.map((i) => (
                    <div key={i._id} className="flex justify-between text-sm">
                      <span className="text-gray-400">{i.title} ×{i.quantity}</span>
                      <span className="text-gray-900">PKR {(i.price * i.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between">
                  <span className="text-gray-900 font-bold uppercase tracking-wide text-sm">Total</span>
                  <span className="text-gray-900 font-black">PKR {totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
