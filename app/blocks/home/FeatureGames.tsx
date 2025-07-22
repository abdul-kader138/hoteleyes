import { motion } from "framer-motion";
import { AiFillFire } from "react-icons/ai";
import { IoDiamond } from "react-icons/io5";
import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";

export default function FeatureGames() {
  const { gameSections } = new Helper();

  const gamePulseVariants = {
    initial: { opacity: 0, y: 30 },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.2,
        duration: 0.6,
      },
    }),
    pulse: {
      scale: [1, 1.01, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <div className="flex flex-wrap box items-center lg:px-10 md:px-10 sm:px-2 gap-4 pt-10 mb-4">
        <h2 className="text-2xl font-bold mb-5 flex items-center justify-center gap-2">
          <IoDiamond className="text-[#D90479] w-8 h-8" />
          {Lang.feature_games}
        </h2>
      </div>

      <section className="relative box lg:px-10 md:px-10 sm:px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gameSections.map((game: any, index: any) => (
            <motion.div
              key={game.id}
              custom={index}
              initial="initial"
              animate={["animate", "pulse"]}
              variants={gamePulseVariants}
              className="relative  rounded-xl overflow-hidden shadow-lg hover:scale-[1.03] transition-transform"
            >
              <section className="text-white">
                <div
                  key={game.id}
                  className="rounded-2xl bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E] overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-200"
                >
                  <div className="relative w-full h-52 sm:h-52 lg:h-56">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <div className="absolute top-2 right-2 bg-opacity-10 p-1 rounded-full"></div>
                    <div className="absolute top-2 right-2 bg-opacity-50 p-1 rounded-full z-10">
                      <AiFillFire className="w-5 h-5 text-[#D90479]" />
                    </div>
                  </div>
                  <div className="py-4 space-y-2 px-2">
                    <h2 className="text-xl font-bold">{game.title}</h2>
                    <p className="text-md text-gray-400 leading-snug">
                      {game.description}
                    </p>
                    <button className="mt-3 cursor-pointer px-4 py-1.5 border rounded-full border-[#D90479] text-white text-sm hover:bg-[#D90479] hover:text-white transition">
                      {Lang.open}
                    </button>
                  </div>
                </div>
              </section>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
