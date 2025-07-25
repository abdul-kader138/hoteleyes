import { motion } from "framer-motion";
import { Link } from "react-router";
import Lang from "~/lang/lang";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function GameSummaryDetails({ gameDetails }: any) {
  return (
    <motion.div
      className="bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E] text-white p-6 md:p-8 rounded-2xl space-y-6  shadow-2xl border border-white/10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
    >
      {/* Title + Breadcrumbs */}
      <motion.div
        className="flex justify-between items-start"
        variants={fadeIn}
      >
        <div>
          <p className="text-xs text-white/60 mb-1">
            <a href="/" className="hover:text-pink-500 transition">
              {Lang.home}
            </a>{" "}
            /{" "}
            <a href="/" className="hover:text-pink-500 transition">
              {Lang.games}
            </a>
          </p>
          <h2 className="text-2xl font-bold leading-tight">
            {gameDetails.gameName}
          </h2>
        </div>
      </motion.div>

      {/* Short Description */}
      <motion.p
        className="text-white/70 text-sm leading-relaxed"
        variants={fadeIn}
      >
        {gameDetails.shortDescription}
      </motion.p>

      {/* CTA Button */}
      <motion.div variants={fadeIn}>
        <Link
          to="https://dev-games.ororogames.com/games/games/queenofthepiratecoast/index.html?gameCode=queenofthepiratecoast_92&language=en&playerId=player571613&currencyCode=GBP"
          className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold px-10 text-center justify-center items-center flex text-sm py-2.5 rounded-full hover:scale-[1.03] transition transform duration-300"
        >
          {Lang.play_demo}
        </Link>
      </motion.div>

      {/* General Information */}
      <motion.div className="border-t border-white/10 pt-6" variants={fadeIn}>
        <h3 className="text-lg font-semibold mb-4 text-pink-400">
          {Lang.general_info}
        </h3>
        <ul className="text-white/80 text-sm divide-y divide-white/10">
          <li className="flex justify-between py-2">
            <span className="text-gray-400">{Lang.pay_lines}</span>
            <span>{gameDetails.paylines}</span>
          </li>
          <li className="flex justify-between py-2">
            <span className="text-gray-400">{Lang.volatility}</span>
            <span>{gameDetails.volatility}</span>
          </li>
          <li className="flex justify-between py-2">
            <span className="text-gray-400">{Lang.rtp}</span>
            <span>{gameDetails.RTP}</span>
          </li>
          <li className="flex justify-between py-2">
            <span className="text-gray-400">{Lang.reel_rows}</span>
            <span>
              {gameDetails.reels} x {gameDetails.rows}
            </span>
          </li>
          <li className="flex justify-between py-2">
            <span className="text-gray-400">{Lang.min_bet}</span>
            <span>{gameDetails.minBet}</span>
          </li>
          {gameDetails.maxWinMultiplier && (
            <li className="flex justify-between py-2">
              <span className="text-gray-400">{Lang.max_win}</span>
              <span>{gameDetails.maxWinMultiplier}x</span>
            </li>
          )}
        </ul>
      </motion.div>

      {/* License Footer */}
      {gameDetails.license && (
        <motion.div
          className="text-white/60 text-xs font-medium mt-4"
          variants={fadeIn}
        >
          <p className="text-gray-500">
            {Lang.cart_footer} {gameDetails.license.join(", ")}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
