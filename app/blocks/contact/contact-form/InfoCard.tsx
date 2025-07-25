import { motion } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaYoutubeSquare,
} from "react-icons/fa";
import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";

export default function Vision() {
  const { fadeUp, container } = new Helper();
  return (
    <motion.div
      className="bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E] rounded-2xl p-8 shadow-2xl border border-white/5 backdrop-blur-sm"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        {Lang.get_in_touch}
      </h2>

      <div className="space-y-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
              <div className="w-3 h-3 bg-pink-400 rounded-full" />
            </div>
            <div>
              <h3 className="font-semibold text-white">
                Contact Method {item}
              </h3>
              <p className="text-gray-400 mt-1">contact@example.com</p>
              <p className="text-gray-400">+1 (555) 123-4567</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="font-semibold text-white mb-4">{Lang.follow_us}</h2>
        <div className="flex gap-3">
          <motion.div
            whileHover={{ y: -5 }}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-white/5 hover:bg-pink-500/10 hover:border-pink-500/30 cursor-pointer"
          >
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-r from-pink-600 to-purple-600 transition-all"
            >
              <FaFacebook className="w-8 h-8" />
            </a>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-white/5 hover:bg-pink-500/10 hover:border-pink-500/30 cursor-pointer"
          >
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-r from-pink-600 to-purple-600 transition-all"
            >
              <FaInstagram className="w-8 h-8" />
            </a>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-white/5 hover:bg-pink-500/10 hover:border-pink-500/30 cursor-pointer"
          >
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-r from-pink-600 to-purple-600 transition-all"
            >
              <FaLinkedinIn className="w-8 h-8" />
            </a>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="w-8 h-8 flex items-center justify-center border border-white/5 hover:bg-pink-500/10 hover:border-pink-500/30 cursor-pointer"
          >
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center transition-all"
            >
              <FaYoutubeSquare className="w-8 h-8" />
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
