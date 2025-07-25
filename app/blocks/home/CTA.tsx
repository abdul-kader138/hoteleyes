import { motion } from "framer-motion";
import Lang from "~/lang/lang";

export default function CTA() {
  return (
    <section className="relative py-24 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-purple-600/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-pink-600/10 blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-20 h-20 rounded-full bg-blue-500/10 blur-xl"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-10"
        >
          <h2 className="text-4xl sm:text-4xl md:text-4xl font-bold mb-6  bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-pink-300">
            {Lang.CTA_header}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-gray-300 text-xl max-w-2xl mx-auto"
          >
            {Lang.CTA_content}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col sm:flex-row justify-center gap-4 mt-12"
        >
          <a
            href="/contact"
            className="relative inline-flex items-center justify-center group shadow-2xl hover:shadow-pink-500/20 transition-all"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full group-hover:from-pink-500 group-hover:to-purple-500 transition-all"></span>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
            <span className="relative px-8 py-4 font-bold text-lg">
              {Lang.contact}
            </span>
          </a>
        </motion.div>

        {/* Stats counter */}
        <motion.div
          className="flex flex-wrap justify-center gap-10 mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">
              {Lang.game_developed_count}
            </div>
            <div className="text-white">{Lang.game_developed}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">
              {Lang.support_count}
            </div>
            <div className="text-white">{Lang.support}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
