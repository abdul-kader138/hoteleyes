import { ChevronDownIcon } from "@heroicons/react/24/outline";
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
    <div className="space-y-1">
      {helper.navigation.map((item: any, index) => (
        <div key={index} className="group">
          <a
            href={item.href}
            onClick={() => toggleDropdown(index)}
            className="flex items-center w-full p-4 rounded-xl text-white hover:bg-slate-800 transition-colors group-[.active]:bg-slate-800"
          >
            <span className="flex-1 text-lg font-medium">{item.name}</span>
            {item.children && (
              <ChevronDownIcon
                className={`h-5 w-5 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            )}
          </a>

          {item.children && openIndex === index && (
            <div className="pl-6 mt-1 space-y-2">
              {item.children.map((child: any, childIndex: any) => (
                <a
                  key={childIndex}
                  href={child.href}
                  className="block py-3 px-4 text-indigo-200 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
                >
                  {child.name}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
