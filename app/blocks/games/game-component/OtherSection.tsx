import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";

export default function OtherSection() {
  const { otherSection: games } = new Helper();
  return (
    <section className="bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E] text-white px-6 py-10 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-pink-400 font-semibold">
          {Lang.other_by_commodore}
        </h2>
        <a
          href="/games"
          className=" text-gray-200 rounded-full px-5 py-1.5 text-sm bg-gradient-to-r from-pink-600 to-purple-600 hover:scale-[1.05]"
        >
          {Lang.see_more}
        </a>
      </div>

      <hr className="border-white/20 mb-6" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {games.map((game, idx) => (
          <div key={idx}>
            <div className="rounded-xl overflow-hidden mb-2">
              <a href="/">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-52 object-cover"
                />
              </a>
            </div>
            <a href="/game/1">
              <h3 className="font-semibold text-center text-white">
                {game.title}
              </h3>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
