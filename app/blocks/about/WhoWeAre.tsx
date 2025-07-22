import { motion } from "framer-motion";
import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";

export default function WhoWeAre() {
  const { fadeUp, container } = new Helper();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={container}
      className="relative mx-auto mb-24"
    >
      <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-pink-600/20 to-sky-700/20 blur-2xl opacity-40 -z-10" />
      <motion.h2
        variants={fadeUp}
        className="text-4xl font-extrabold text-center mb-6"
      >
        {Lang.who_we_are}
      </motion.h2>
      <motion.p
        variants={fadeUp}
        custom={1}
        className="text-lg text-gray-300 text-center leading-relaxed"
      >
        {Lang.founded_by + " "}
        <a
          href={Lang.linkedin_profile}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-400 underline font-semibold hover:text-blue-400 transition"
        >
          {Lang.profile_name}
        </a>
        {Lang.wwr_content}
      </motion.p>
      <motion.p
        variants={fadeUp}
        custom={2}
        className="mt-6 text-center text-2xl italic text-pink-400 font-semibold"
      >
        {Lang.wwr_moto}
      </motion.p>
    </motion.div>
  );
}
