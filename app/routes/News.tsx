import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import NewsFilter from "~/blocks/news/NewsFilter";
import NewsGrid from "~/blocks/news/NewsGrid";
import type { ContentItem, ContentType } from "~/utils/helper";
import { Helper } from "~/utils/helper";
import Lang from "../lang/lang";
import type { Route } from "./+types/Home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: Lang.title + " - " + Lang.news },
    { name: "description", content: Lang.welcome_fx + " - " + Lang.news },
  ];
}

export default function News() {
  const { newsContent, fadeIn, getTypeLabel, getTypeColor } = new Helper();
  const [activeFilter, setActiveFilter] = useState<ContentType | "all">("all");
  const [content, setContent] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setContent(newsContent);
      setIsLoading(false);
    }, 800);
  }, []);

  const filteredContent =
    activeFilter === "all"
      ? content
      : content.filter((item) => item.type === activeFilter);

  return (
    <div className="min-h-screen box text-white py-10 px-10 sm:px-6 lg:px-10">
      <Toaster position="top-right" reverseOrder={false} />

      <motion.div
        className="text-center mb-16"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-pink-400">
          {Lang.news_event}
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          {Lang.news_event_content}
        </p>
      </motion.div>

      <NewsFilter
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        fadeIn={fadeIn}
        getTypeLabel={getTypeLabel}
      />

      {/* Grid */}
      <NewsGrid
        items={filteredContent}
        fadeIn={fadeIn}
        isLoading={isLoading}
        activeFilter={activeFilter}
        getTypeLabel={getTypeLabel}
        getTypeColor={getTypeColor}
      />
    </div>
  );
}
