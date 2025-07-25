import { motion } from "framer-motion";
import type { ContentType } from "~/utils/helper";

interface Props {
  activeFilter: ContentType | "all";
  setActiveFilter: (type: ContentType | "all") => void;
  fadeIn: any;
  getTypeLabel: (type: ContentType | "all") => string;
}

export default function NewsFilter({
  activeFilter,
  setActiveFilter,
  fadeIn,
  getTypeLabel,
}: Props) {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-3 mb-12"
      variants={fadeIn}
    >
      {(["all", "blog", "announcement", "event", "diary"] as const).map(
        (type) => (
          <button
            key={type}
            onClick={() => setActiveFilter(type)}
            className={`px-5 py-2 rounded-full text-sm cursor-pointer font-medium transition-all ${
              activeFilter === type
                ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {type === "all" ? "All News" : getTypeLabel(type)}
          </button>
        )
      )}
    </motion.div>
  );
}
