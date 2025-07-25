import { motion } from "framer-motion";
import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";

export default function WCU() {
  const { fadeIn, staggerContainer, differentiators } = new Helper();
  return (
    <motion.div
      className="mb-28"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="flex justify-center mb-16">
        <div className="text-center max-w-2xl">
          <motion.h2
            className="text-3xl font-bold mb-4 text-pink-400"
            variants={fadeIn}
          >
            {Lang.wcu}
          </motion.h2>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-sky-300 to-pink-300 mx-auto mb-8 rounded-full"
            variants={fadeIn}
          ></motion.div>
          <motion.p className="text-gray-400 text-lg" variants={fadeIn}>
            {Lang.wcu_details}
          </motion.p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {differentiators.map((item, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E] p-8 rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col items-center text-center"
            variants={fadeIn}
            whileHover={{ y: -10 }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-sky-500 to-pink-500 flex items-center justify-center text-xl mb-6">
              {index + 1}
            </div>
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-gray-400">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
