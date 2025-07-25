import { motion } from "framer-motion";
import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";

export default function Award() {
  const { fadeUp, awards } = new Helper();
  return (
    <div className="relative w-full mx-auto  px-6 py-10">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10 ">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-pink-500/15 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-16"
      >
        <motion.h2
          variants={fadeUp}
          className="text-4xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-pink-300 mb-4"
        >
          {Lang.award_recognition}
        </motion.h2>
        <motion.div
          variants={fadeUp}
          custom={0.3}
          className="flex justify-center"
        >
          <div className="h-1 w-24 bg-gradient-to-r from-sky-500 to-pink-500 rounded-full" />
        </motion.div>
      </motion.div>

      <div className="grid justify-items-center items-center max-w-5xl grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mx-auto">
        {awards.map((award, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
              type: "spring",
              stiffness: 100,
            }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex justify-center"
          >
            <div
              className="bg-gradient-to-br from-white/10 to-white/5 p-5 rounded-2xl shadow-lg border border-white/10 backdrop-blur-lg 
            hover:shadow-sky-500/20 hover:-translate-y-2 transition-all duration-300 w-[250px] h-40 flex items-center justify-center
            relative overflow-hidden group"
            >
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8),transparent_70%)] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

              <img
                src={award.src}
                alt={award.alt}
                className="h-20 object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: awards.length * 0.1 + 0.2 }}
        className="text-center mt-16 text-gray-400 italic"
      >
        {Lang.award_footnote}
      </motion.div>
    </div>
  );
}
