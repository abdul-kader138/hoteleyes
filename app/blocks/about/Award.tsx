import { motion } from "framer-motion";
import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";

export default function Award() {
  const { fadeUp, awards } = new Helper();
  return (
    <div className="relative max-w-8xl mx-auto px-6 mb-24">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        className="text-3xl font-bold text-center mb-10"
      >
        {Lang.award_recognition}
      </motion.h2>
      <div className="flex flex-wrap justify-center gap-12">
        {awards.map((award, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="bg-white/15 p-4 rounded-xl shadow-md hover:scale-110 transition duration-300 backdrop-blur-md"
          >
            <img
              src={award.src}
              alt={award.alt}
              className="h-25 sm:h-24 object-contain drop-shadow-md"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
