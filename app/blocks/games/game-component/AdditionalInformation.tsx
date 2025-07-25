import { format } from "date-fns";
import { motion } from "framer-motion";
import Lang from "~/lang/lang";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function AdditionalInformation({ gameDetails }: any) {
  const cleanedDateStr = gameDetails.releaseDate?.replace(/\u2011/g, "-") || "";
  const parsedDate = new Date(cleanedDateStr);

  return (
    <motion.div
      className="mt-6 w-full mb-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
    >
      <motion.div
        variants={fadeInUp}
        className="bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E] rounded-2xl border border-white/10 shadow-2xl p-6 md:p-10"
      >
        <motion.h2
          className="text-2xl font-bold mb-6 text-pink-400 tracking-wide"
          variants={fadeInUp}
        >
          {Lang.additional_information}
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={fadeInUp}
        >
          {/* Left Column */}
          <div className="space-y-5">
            <motion.div variants={fadeInUp}>
              <h4 className="text-pink-300 font-semibold mb-1">
                {Lang.developer}
              </h4>
              <p className="text-white/80">{gameDetails.provider}</p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h4 className="text-pink-300 font-semibold mb-1">
                {Lang.support_multilingual}
              </h4>
              <p className="text-white/80">
                {gameDetails.multiLanguage ? "Yes" : "No"}
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h4 className="text-pink-300 font-semibold mb-1">
                {Lang.release_date}
              </h4>
              <p className="text-white/80">
                {!isNaN(parsedDate.getTime())
                  ? format(parsedDate, "d MMMM yyyy")
                  : "Unknown"}
              </p>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <motion.div variants={fadeInUp}>
              <h4 className="text-pink-300 font-semibold mb-1">
                {Lang.hit_rate}
              </h4>
              <p className="text-white/80">{gameDetails.hitFrequency}</p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h4 className="text-pink-300 font-semibold mb-1">
                {Lang.max_bet}
              </h4>
              <p className="text-white/80">{gameDetails.maxBet}</p>
            </motion.div>

            {gameDetails.platforms && (
              <motion.div variants={fadeInUp}>
                <h4 className="text-pink-300 font-semibold mb-1">
                  {Lang.platform}
                </h4>
                <p className="text-white/80">
                  {gameDetails.platforms.join(", ")}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
