import { useState } from "react";
import { FaWindows } from "react-icons/fa";
import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";

export default function ProductCartDetails() {
  const [edition, setEdition] = useState("STANDARD");
  const { productCartDetails: product } = new Helper();

  return (
    <div className="bg-[#0c1c2f] text-white  p-6 rounded-2xl space-y-6">
      {/* Title + Price */}
      <div className="flex justify-between items-start">
        {/* Left: Title Section */}
        <div>
          <p className="text-xs text-white/60 mb-1">
            <a href="/">{Lang.home}</a> / <a href="/">{Lang.games}</a>
          </p>
          <h2 className="text-xl font-bold leading-tight">{product.title}</h2>
        </div>

        {/* Right: Price + OS Icon */}
        <div className="flex flex-col items-end gap-2 py-1">
          <FaWindows className="text-white text-base" />
          <p className="text-sm font-bold">{product.price}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {product.tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-[#113861] px-2.5 py-1 rounded-full text-xs font-semibold"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-white/40 text-sm">{product.description}</p>

      {/* Editions */}
      <div className="flex gap-3 border-t border-white/10 pt-4">
        {product.editions.map((ed) => (
          <button
            key={ed}
            className={`px-4 py-2 rounded-full text-xs font-semibold border ${
              edition === ed
                ? "bg-white text-black border-white"
                : "bg-transparent border-white/50 text-white/80"
            }`}
            onClick={() => setEdition(ed)}
          >
            {ed}
          </button>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3">
        <button className="w-full bg-white text-black font-semibold text-sm py-2 rounded-full hover:bg-gray-200">
          {Lang.buy_now}
        </button>
        <div className="flex gap-4">
          <button className="flex-1 border border-white py-2 text-sm rounded-full hover:bg-white/10">
            {Lang.add_to_cart}
          </button>
          <button className="flex-1 border border-white py-2 text-sm rounded-full bg-[#113861] hover:bg-[#1d4a7a]">
            {Lang.add_to_wishlist}
          </button>
        </div>
      </div>

      {/* General Information */}
      <div className="border-t border-white/10 pt-4">
        <h3 className="text-lg font-semibold mb-3">{Lang.general_info}</h3>
        <ul className="text-white/80 text-sm space-y-1">
          <li className="flex justify-between">
            <span className="text-gray-500">{Lang.release_date}</span>
            <span>{product.releaseDate}</span>
          </li>
          <hr className="border-gray-600 w-full my-" />
          <li className="flex justify-between">
            <span className="text-gray-500">{Lang.developer}</span>
            <span>{product.developer}</span>
          </li>
          <hr className="border-gray-600 w-full my-" />
          <li className="flex justify-between">
            <span className="text-gray-500">{Lang.publisher}</span>
            <span>{product.publisher}</span>
          </li>
          <hr className="border-gray-600 w-full my-" />
          <li className="flex justify-between">
            <span className="text-gray-500">{Lang.language}</span>
            <span>{product.language}</span>
          </li>
          <hr className="border-gray-600 w-full my-" />
          <li className="flex justify-between">
            <span className="text-gray-500">{Lang.game_mode}</span>
            <span>{product.mode}</span>
          </li>
          <hr className="border-gray-600 w-full my-" />
          <li className="flex justify-between">
            <span className="text-gray-500">
              {Lang.full_controller_support}
            </span>
            <span>{product.controllerSupport}</span>
          </li>
        </ul>
      </div>

      {/* Footer Note */}
      <div className="flex gap-4 items-center text-xs text-white/70 mt-4">
        <img
          src="/images/products/images/pegi.png"
          alt="PEGI 3"
          className="w-6 h-6"
        />
        <img
          src="/images/products/images/in-game.png"
          alt="In-game purchases"
          className="w-6 h-6"
        />
        <p className="ml-2 text-gray-500 text-xs">{Lang.age_info}</p>
      </div>
    </div>
  );
}
