export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-white.svg" alt="UniqueTrends" className="h-10 w-auto mb-4" />
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Your destination for premium watches and jewelry. Crafted for every occasion.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Men", href: "#categories" },
                { label: "Women", href: "#categories" },
                { label: "Contact", href: "#contact" },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-white/60 hover:text-white text-sm transition-colors uppercase tracking-wide">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Contact</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>📱 0349 7669537</li>
              <li>☎️ 0340 1655304</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-white/30 text-xs uppercase tracking-widest">© 2026 UniqueTrends.online. All rights reserved.</p>
          <p className="text-white/20 text-xs">Premium Watches & Jewelry</p>
        </div>
      </div>
    </footer>
  );
}
