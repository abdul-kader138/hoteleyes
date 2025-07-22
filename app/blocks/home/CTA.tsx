import { motion } from "framer-motion";
import Lang from "~/lang/lang";

export default function CTA() {
  return (
    <>
      <section className="relative py-16 text-white text-center overflow-hidden">
        <div className="max-w-3xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            {Lang.CTA_header}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-gray-300 text-lg mb-8"
          >
            {Lang.CTA_content}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <a
              href="/contact"
              className="inline-block shadow-lg hover:scale-[1.05] bg-[#D90479] transition px-8 py-3 rounded-full font-semibold text-white text-lg"
            >
              {Lang.contact_us}
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
