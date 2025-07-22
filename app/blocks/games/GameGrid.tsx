import { motion } from "framer-motion";
import Lang from "~/lang/lang";

interface Game {
  id: number;
  name: string;
  feature: string;
  type: string;
  category: string;
}

interface GameGridProps {
  games: Game[];
  visibleCount: number;
  loadMore: () => void;
  parentRef: React.RefObject<HTMLDivElement>;
}

export default function GameGrid({
  games,
  visibleCount,
  loadMore,
  parentRef,
}: GameGridProps) {
  const visibleGames = games.slice(0, visibleCount);

  return (
    <>
      {/* Games Grid */}
      <div
        ref={parentRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        {visibleGames.map((game, index) => (
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
                  {Lang.game_info}
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

      {/* Load More Button */}
      {visibleCount < games.length && (
        <div className="text-center mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadMore}
            className="bg-[#D90479] px-5 py-2 rounded cursor-pointer transition"
          >
            {Lang.load_more}
          </motion.button>
        </div>
      )}
    </>
  );
}
