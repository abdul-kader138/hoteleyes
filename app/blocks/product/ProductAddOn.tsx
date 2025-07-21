import { FaCartPlus, FaHeart } from "react-icons/fa";
import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";

export default function ProductAddOn() {
  const { productAddOns } = new Helper();
  const addOn = productAddOns?.[0];
  return (
    <div className="text-white py-6 mt-6 space-y-6">
      <h2 className="text-2xl font-semibold">{Lang.more_for_this_game}</h2>

      <div className="bg-[#002459] rounded-2xl flex flex-col md:flex-row p-6 items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
        <img
          src={addOn?.image}
          alt={addOn?.title}
          className="w-full md:w-64 h-36 object-cover rounded-xl"
        />

        <div className="flex-1 space-y-2">
          <p className="text-sm text-gray-400">{addOn?.subtitle}</p>
          <h3 className="text-xl font-bold">{addOn?.title}</h3>
          <p className="text-sm text-gray-300">{addOn?.description}</p>

          <hr className="border-gray-600 my-2" />

          <div className="text-lg font-semibold">{addOn?.price}</div>

          <div className="flex flex-col md:flex-row gap-3 md:space-x-4 mt-3">
            <button className="flex items-center justify-center space-x-2 px-6 py-2 bg-white text-[#0E2C54] font-semibold rounded-full hover:opacity-90">
              <FaCartPlus />
              <span>{Lang.add_to_cart}</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-6 py-2 border border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#0E2C54]">
              <FaHeart />
              <span>{Lang.add_to_wishlist}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
