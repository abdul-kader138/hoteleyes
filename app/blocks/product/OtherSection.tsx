import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";

export default function OtherByCommodore() {
  const { otherSection: games } = new Helper();
  return (
    <section className="bg-[#061A2F] text-white px-6 py-10 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{Lang.other_by_commodore}</h2>
        <button className="border border-white rounded-full px-5 py-1.5 text-sm hover:bg-white hover:text-[#061A2F]">
          See more
        </button>
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
            <a href="/">
              <h3 className="font-semibold text-white">{game.title}</h3>
            </a>
            <p className="text-gray-400 text-sm">{game.edition}</p>
            <p className="text-white text-sm mt-1">—</p>
            <p className="text-white font-semibold mt-1">{game.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
