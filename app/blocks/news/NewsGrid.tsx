import { motion } from "framer-motion";
import { Link } from "react-router";
import Lang from "~/lang/lang";
import type { ContentItem, ContentType } from "~/utils/helper";

interface Props {
  items: ContentItem[];
  fadeIn: any;
  isLoading: boolean;
  activeFilter: ContentType | "all";
  getTypeLabel: (type: ContentType) => string;
  getTypeColor: (type: ContentType) => string;
}

export default function NewsGrid({
  items,
  fadeIn,
  isLoading,
  activeFilter,
  getTypeLabel,
  getTypeColor,
}: Props) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!isLoading && items.length === 0) {
    return (
      <motion.div className="text-center py-20" variants={fadeIn}>
        <div className="text-5xl mb-4">📰</div>
        <h3 className="text-2xl font-bold mb-2">No content found</h3>
        <p className="text-gray-400 max-w-md mx-auto">
          We couldn't find any{" "}
          {activeFilter === "all" ? "content" : getTypeLabel(activeFilter)}{" "}
          matching your criteria.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E] rounded-2xl overflow-hidden border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
          variants={fadeIn}
          whileHover={{ y: -10 }}
        >
          {/* Image or fallback */}
          {item.image ? (
            <div className="h-48 bg-gray-800 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center bg-gradient-to-br from-purple-900/30 to-pink-900/30">
              <div className="text-5xl opacity-30">🎮</div>
            </div>
          )}

          <div className="p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-3">
              <span
                className={`${getTypeColor(
                  item.type
                )} text-white text-xs px-3 py-1 rounded-full`}
              >
                {getTypeLabel(item.type)}
              </span>
              <span className="text-xs text-gray-500">{item.date}</span>
            </div>

            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-gray-400 mb-4 flex-grow">{item.excerpt}</p>

            <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
              <div className="text-xs text-gray-500">
                {item.category && <span>{item.category} • </span>}
                {item.author && <span>By {item.author}</span>}
                {item.readTime && <span> • {item.readTime}</span>}
              </div>
              <Link
                to={`/blogs/${item.id}`}
                className="inline-block text-sm text-pink-500 hover:text-pink-400 font-medium hover:underline"
              >
                {Lang.read_more_symbol}
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
