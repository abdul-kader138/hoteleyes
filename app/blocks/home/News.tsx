import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaBlogger } from "react-icons/fa";
import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";
import Section from "./Section";

export default function Articles() {
  const itemsPerPage = 3;
  const [allArticles, setAllArticles] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isSeeAll, setIsSeeAll] = useState(false);

  const totalPages = Math.ceil(allArticles.length / itemsPerPage);
  const visibleItems = isSeeAll
    ? allArticles
    : allArticles.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const BASE_API = new Helper().BASE_API;
        const res = await fetch(`${BASE_API}/articles`);
        const data = await res.json();
        setAllArticles(data || []);
      } catch (err) {
        console.error(Lang.error_fetching_article, err);
      }
    };
    fetchArticles();
  }, []);

  return (
    <section className="text-white box  py-10 xl:px-10 lg:px-10 md:px-10 sm:px-2">
      <h2 className="text-2xl font-bold mb-5 flex gap-2"> <FaBlogger  className="text-[#D90479] w-8 h-8" />{Lang.news}</h2>
      

      {/* Navigation Buttons */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {!isSeeAll && (
          <div className="flex border border-white rounded-full overflow-hidden">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
              className="px-4 py-2 hover:bg-white hover:text-black transition disabled:opacity-30"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
              disabled={currentPage >= totalPages - 1}
              className="px-4 py-2 hover:bg-white hover:text-black transition border-l border-white disabled:opacity-30"
            >
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        )}

        <button
          onClick={() => setIsSeeAll((prev) => !prev)}
          className="border border-white rounded-full px-4 py-1 text-xs hover:bg-white hover:text-black transition"
        >
          {isSeeAll ? Lang.see_less ?? "See Less" : Lang.see_all ?? "See All"}
        </button>
      </div>


      <div className="relative w-full min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={isSeeAll ? "all" : currentPage}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.5 }}
          >
            <Section sections={visibleItems} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
