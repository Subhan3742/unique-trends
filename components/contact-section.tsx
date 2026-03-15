"use client";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-widest mb-3">
            Contact Us
          </h2>
          <div className="w-12 h-0.5 bg-gray-900 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-gray-200">
          <motion.a
            href="tel:03497669537"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white p-10 flex flex-col items-center text-center hover:bg-gray-900 transition-all group border border-gray-100"
          >
            <svg className="w-8 h-8 text-gray-300 mb-5 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <p className="text-gray-400 group-hover:text-white/60 text-xs uppercase tracking-widest mb-2 transition-colors">Primary</p>
            <p className="text-gray-900 group-hover:text-white text-2xl font-bold tracking-wide transition-colors">0349 7669537</p>
          </motion.a>

          <motion.a
            href="tel:03401655304"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-10 flex flex-col items-center text-center hover:bg-gray-900 transition-all group border border-gray-100"
          >
            <svg className="w-8 h-8 text-gray-300 mb-5 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <p className="text-gray-400 group-hover:text-white/60 text-xs uppercase tracking-widest mb-2 transition-colors">Alternative</p>
            <p className="text-gray-900 group-hover:text-white text-2xl font-bold tracking-wide transition-colors">0340 1655304</p>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
