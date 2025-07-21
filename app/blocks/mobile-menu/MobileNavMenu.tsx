import { useState } from "react";
import { Helper } from "~/utils/helper";

const helper = new Helper();
export default function MobileNavMenu() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      <div className="w-full space-y-4 mt-0">
        <div className="w-full space-y-2 mt-6">
          {helper.navigation.map((item, index) => (
            <div key={index} className="w-full">
              <a
                onClick={() => toggleDropdown(index)}
                className="w-full text-left text-white px-4 py-2 rounded-md hover:text-[#d90479] flex items-center justify-between"
              >
                <span>{item.name}</span>
              </a>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
