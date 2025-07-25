import { motion } from "framer-motion";
import Lang from "~/lang/lang";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function GameDetails({ gameDetails }: any) {
  return (
    <motion.div
      className="mt-16 backdrop-blur-md rounded-xl p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.hr
        className="border-pink-500 w-1/2 mx-auto mb-6"
        variants={fadeUp}
      />

      <motion.div className="space-y-6" variants={fadeUp}>
        <motion.h2
          className="text-3xl font-extrabold text-center text-pink-400 tracking-wide"
          variants={fadeUp}
        >
          {gameDetails.gameName}
        </motion.h2>

        <motion.p
          className="text-base text-white/80 leading-relaxed text-justify"
          variants={fadeUp}
        >
          {gameDetails.description}
        </motion.p>

        <motion.div className="mt-10" variants={fadeUp}>
          <h3 className="text-2xl font-semibold text-pink-500 mb-4">
            {Lang.features}
          </h3>
          <motion.ul
            className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/90"
            variants={fadeUp}
          >
            {gameDetails.featureDescriptions.map((item: any, idx: number) => (
              <motion.li
                key={idx}
                className="bg-white/10 border border-white/10 rounded-lg p-4 hover:border-pink-500 hover:scale-[1.02] transition-all duration-300"
                variants={fadeUp}
              >
                <strong className="text-pink-400">{item.name}</strong>
                <p className="text-sm mt-1 text-white/80 leading-snug">
                  {item.description}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
