import { motion } from "framer-motion";
import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";

export default function CTA() {
  const { fadeIn } = new Helper();
  return (
    <motion.div
      className="text-center"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E] rounded-2xl p-12 border border-white/10 shadow-2xl max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-pink-300">
          {Lang.create_something}
        </h2>
        <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto">
          {Lang.create_something_details}
        </p>
        <a
          href="/contact"
          className="bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold sm:text-sm lg:text-lg md:text-lg py-4 px-10 rounded-full inline-block hover:scale-[1.03] transition-transform hover:shadow-xl"
        >
          {Lang.parter_with_us}
        </a>
      </div>
    </motion.div>
  );
}
