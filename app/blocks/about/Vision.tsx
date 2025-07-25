import { motion } from "framer-motion";
import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";

export default function Vision() {
  const { fadeUp, container } = new Helper();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={container}
      className="relative mx-auto w-full py-12 px-6 sm:px-8"
    >
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-sky-600/20 via-transparent to-pink-600/30 opacity-50 blur-xl -z-10" />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(#ffffff12_1px,transparent_1px)] bg-[length:24px_24px] -z-20 opacity-10" />

      <div className="text-center">
        <motion.h2
          variants={fadeUp}
          className="text-4xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-pink-300 mb-8"
        >
          {Lang.our_vision}
        </motion.h2>

        <motion.div
          variants={fadeUp}
          custom={0.5}
          className="flex justify-center mb-10"
        >
          <div className="h-1 w-24 bg-gradient-to-r from-sky-500 to-pink-500 rounded-full" />
        </motion.div>

        <motion.p
          variants={fadeUp}
          custom={1}
          className="text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto"
        >
          {Lang.vision_content}
        </motion.p>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-sky-600/20 blur-3xl -z-10" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-pink-600/30 blur-3xl -z-10" />
    </motion.div>
  );
}
