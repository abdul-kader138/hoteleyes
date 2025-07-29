import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IoIosMenu } from "react-icons/io";
import Lang from "~/lang/lang";
import MobileNavMenu from "./MobileNavMenu";
import MobileTopMenu from "./MobileTopMenu";

export default function MobileMenu() {
  return (
    <Disclosure as="div" className="md:hidden">
      {({ open }) => (
        <>
          <DisclosureButton className="relative z-10 inline-flex items-center justify-center p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d90479]">
            <span className="sr-only">{Lang.open_main_menu}</span>
            {open ? (
              <XMarkIcon
                className="h-7 w-7 text-white bg-[#d90479] p-1 rounded-full"
                aria-hidden="true"
              />
            ) : (
              <IoIosMenu className="h-7 w-7 text-[#D90479]" />
            )}
          </DisclosureButton>

          <Transition
            show={open}
            enter="transition duration-300 ease-out"
            enterFrom="opacity-0 -translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leave="transition duration-200 ease-in"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 -translate-x-full"
          >
            <DisclosurePanel
              static
              className="fixed inset-0 z-40 bg-gray-900/80 backdrop-blur-sm"
            >
              <div className="absolute top-0 right-0 w-4/5 h-full bg-gradient-to-b from-[#0F172A] to-[#1A1A2E] shadow-xl">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center p-5 border-b border-slate-700">
                    <h2 className="text-xl font-bold text-white">Menu</h2>
                    <DisclosureButton className="p-2 rounded-full hover:bg-slate-800">
                      <XMarkIcon className="h-6 w-6 text-white" />
                    </DisclosureButton>
                  </div>

                  <div className="flex-1 overflow-y-auto py-4 px-3">
                    <MobileTopMenu />
                    <div className="my-8 h-px bg-gradient-to-r from-transparent via-[#d90479] to-transparent"></div>
                    <MobileNavMenu />
                  </div>

                  <div className="p-5 border-t border-slate-700">&nbsp;</div>
                </div>
              </div>
            </DisclosurePanel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
