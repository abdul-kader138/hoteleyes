import { motion } from "framer-motion";
import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";

export default function Vision() {
  const { fadeUp, container } = new Helper();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={container}
      className="relative  mx-auto mb-24"
    >
      <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-sky-600/20 to-pink-600/20 blur-2xl opacity-40 -z-10" />
      <motion.h2
        variants={fadeUp}
        className="text-3xl font-extrabold text-center mb-6"
      >
        {Lang.our_vision}
      </motion.h2>
      <motion.p
        variants={fadeUp}
        custom={1}
        className="text-lg text-gray-300 leading-relaxed text-center"
      >
        {Lang.vision_content}
      </motion.p>
    </motion.div>
  );
}
