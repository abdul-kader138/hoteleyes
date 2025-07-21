import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";

export default function ProductDetails() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { productDetailsData } = new Helper();
  const { title, intro, featuresTitle, features, expanded } =
    productDetailsData;

  return (
    <div className="mt-12 text-white">
      <hr className="border-gray-600 w-full py-6" />
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>

        {intro.map((para, idx) => (
          <p
            key={idx}
            className={`leading-relaxed text-sm ${
              idx === 0 ? "text-white/90" : "text-white/80"
            }`}
          >
            {para}
          </p>
        ))}

        <h3 className="text-xl font-semibold mt-6 text-white">
          {featuresTitle}
        </h3>
        <ul className="list-disc list-inside space-y-2 text-white/80 pl-4">
          {features.map((item, idx) => (
            <li key={idx} className="text-sm">
              <strong>{item.title}</strong> – {item.description}
            </li>
          ))}
        </ul>

        {isExpanded && (
          <div className="space-y-4 mt-6 text-white/80 text-sm">
            {expanded.map((text, idx) => (
              <p key={idx}>{text}</p>
            ))}
          </div>
        )}
      </div>
      <button
        className="mt-6 flex items-center gap-2 cursor-pointer px-4 text-sm py-2 rounded-full border border-white text-white bg-[#113861] hover:bg-[#1d4a7a] transition font-semibold"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {isExpanded ? (
          <>
            {Lang.show_less} <FaChevronUp className="text-sm" />
          </>
        ) : (
          <>
            {Lang.show_more} <FaChevronDown className="text-sm" />
          </>
        )}
      </button>
    </div>
  );
}
