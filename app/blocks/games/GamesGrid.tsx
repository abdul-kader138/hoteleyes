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

export default function GamesGrid({
  games,
  visibleCount,
  loadMore,
  parentRef,
}: GameGridProps) {
  const visibleGames = games.slice(0, visibleCount);
  const defaultImage = "/images/games/mock.png";
  const gameImages = [
    "/images/products/other-section/dragon.png",
    "/images/products/other-section/golden.png",
    "/images/products/other-section/cheers.png",
    "/images/products/other-section/book.png",
    "/images/products/other-section/wonder.png",
    "/images/products/other-section/pirates.png",
  ];

  // Track usage
  const imageUsageCount: Record<string, number> = {};
  gameImages.forEach((img) => (imageUsageCount[img] = 0));

  // Shuffle images for first-time random assignment
  const shuffledOnce = [...gameImages].sort(() => 0.5 - Math.random());
  const shuffledTwice = [...gameImages].sort(() => 0.5 - Math.random());

  const gameImageMap: Record<number, string> = {};
  let firstIndex = 0;
  let secondIndex = 0;

  visibleGames.forEach((game) => {
    let assignedImage = defaultImage;

    // Step 1: Try to assign unused image (1st time use)
    if (firstIndex < shuffledOnce.length) {
      assignedImage = shuffledOnce[firstIndex];
      imageUsageCount[assignedImage]++;
      firstIndex++;
    }
    // Step 2: If all used once, try to assign an image used only once (2nd time use)
    else if (secondIndex < shuffledTwice.length) {
      const candidate = shuffledTwice[secondIndex];
      if (imageUsageCount[candidate] < 2) {
        assignedImage = candidate;
        imageUsageCount[candidate]++;
        secondIndex++;
      }
    }

    // Step 3: If all images used twice, fallback
    gameImageMap[game.id] = assignedImage;
  });

  return (
    <>
      {/* Games Grid */}
      <div
        ref={parentRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        {visibleGames.map((game, index) => {
          const imageToUse = gameImageMap[game.id];

          return (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-gray-400/10 rounded-xl p-6 shadow-lg border border-white/10 hover:border-pink-500 hover:scale-105 transition duration-300"
            >
              <div
                className="relative h-60 w-full overflow-hidden rounded-xl bg-center bg-cover shadow-md"
                style={{
                  backgroundImage: `url('${imageToUse}')`,
                }}
              >
                <div className="absolute inset-0 bg-opacity-40"></div>
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

              <motion.p className="text-white text-center py-2 font-bold text-base tracking-wide drop-shadow-lg">
                <a
                  href={`/game/${game.id}`}
                  className="mt-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-1 lg:px-3 md:px-3 sm:px-1 py-1 rounded-md hover:scale-105 transition"
                >
                  {Lang.game_info}
                </a>
              </motion.p>
            </motion.div>
          );
        })}
      </div>

      {/* Load More Button */}
      {visibleCount < games.length && (
        <div className="text-center mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadMore}
            className="bg-gradient-to-r from-pink-600 to-purple-600 px-5 py-2 rounded cursor-pointer transition"
          >
            {Lang.load_more}
          </motion.button>
        </div>
      )}
    </>
  );
}
