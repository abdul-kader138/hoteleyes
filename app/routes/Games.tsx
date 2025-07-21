import autoAnimate from "@formkit/auto-animate";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import Lang from "../lang/lang";
import type { Route } from "./+types/Home";

// Mock game list
const mockGameList = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  name: [
    "Touchdown Cash",
    "Thor's Rage",
    "Big Gains",
    "Rise Of Cleopatra",
    "777 Diamond Strike",
    "Cash Goddess",
    "Miami Rise",
    "Zillard King MegaWays™",
    "Jackrabbit Jackpots",
    "Farmtastic"
  ][i % 10],
  img: `/images/games/${(i % 10) + 1}.png`,
  feature: ["Bonus", "Jackpot", "Free Spins"][i % 3],
  type: ["Slot", "Table", "Live"][i % 3],
  category: ["Adventure", "Mythology", "Classic"][i % 3],
}));

export function meta({}: Route.MetaArgs) {
  return [
    { title: Lang.title + " - " + Lang.games },
    { name: "description", content: Lang.welcome_fx + " - " + Lang.games },
  ];
}

export default function Games() {
  const [visibleCount, setVisibleCount] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const [featureFilter, setFeatureFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  const parentRef = useRef(null);
  useEffect(() => {
    parentRef.current && autoAnimate(parentRef.current);
  }, [parentRef]);

  // Replace this if using API/helper
  // const { mockGameList } = new Helper();

  const filteredGames = mockGameList
    .filter((game: any) => game.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((game: any) => (featureFilter ? game.feature === featureFilter : true))
    .filter((game: any) => (typeFilter ? game.type === typeFilter : true))
    .filter((game: any) => (categoryFilter ? game.category === categoryFilter : true))
    .sort((a: any, b: any) => {
      if (sortOption === "name-asc") return a.name.localeCompare(b.name);
      if (sortOption === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });

  const visibleGames = filteredGames.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <>
   <div className="relative w-full h-[45vh] overflow-hidden">
  <motion.img
    src="/images/games/banner.png"
    alt="Games"
    className="w-full h-full object-cover shadow-lg"
    animate={{
      scale: [1, 1.05, 1],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
</div>

    <div className="min-h-screen px-10 box text-white py-10">
      <Toaster position="top-right" />

      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search game"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white w-full sm:w-1/4 mb-2 sm:mb-0"
        />

        <div className="flex gap-2 flex-wrap">
          <select
            value={featureFilter}
            onChange={(e) => setFeatureFilter(e.target.value)}
            className="p-2 rounded bg-gray-800"
          >
            <option value="">Features</option>
            <option value="Bonus">Bonus</option>
            <option value="Jackpot">Jackpot</option>
            <option value="Free Spins">Free Spins</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="p-2 rounded bg-gray-800"
          >
            <option value="">Game Type</option>
            <option value="Slot">Slot</option>
            <option value="Table">Table</option>
            <option value="Live">Live</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 rounded bg-gray-800"
          >
            <option value="">Categories</option>
            <option value="Adventure">Adventure</option>
            <option value="Mythology">Mythology</option>
            <option value="Classic">Classic</option>
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 rounded bg-gray-800"
          >
            <option value="">Sort by</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
          </select>
        </div>
      </div>

      {/* Games Grid */}
      <div
        ref={parentRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        {visibleGames.map((game: any, index: number) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <div
              className="relative h-60 w-full overflow-hidden rounded-xl bg-center bg-cover shadow-md"
              style={{ backgroundImage: `url('/images/games/mock.png')` }}
            >
              <div className="absolute inset-0 bg-opacity-40"></div>
              <div className="absolute bottom-0 w-full text-center p-3 z-10">
                <a
                  href={`/game/${game.id}`}
                  className="mt-2 bg-[#D90479] text-white px-3 py-1 rounded-md hover:scale-105 transition"
                >
                  Game Info
                </a>
              </div>
            </div>
           <motion.p
  className="text-white text-center py-2 font-bold text-base tracking-wide drop-shadow-lg"
  initial={{ opacity: 0, scale: 0.95, y: 10 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  whileHover={{
    scale: 1.05,
    textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)",
  }}
>
  {game.name}
</motion.p>


          </motion.div>
        ))}
      </div>

      {/* Load More */}
      {visibleCount < filteredGames.length && (
        <div className="text-center mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadMore}
            className="bg-[#D90479] px-5 py-2 rounded cursor-pointer transition"
          >
            Load More
          </motion.button>
        </div>
      )}
    </div>
    </>
  );
}
