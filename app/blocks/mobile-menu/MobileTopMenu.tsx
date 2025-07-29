import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useState } from "react";
import Lang from "~/lang/lang";
import { useUser } from "~/provider/userContext";
import { Helper } from "~/utils/helper";

export default function MobileTopMenu() {
  const helper = new Helper();
  const { user, logout, loading } = useUser();
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    if (user?.first_name) {
      setPhoto("images/male.png");
      if (user?.photo_id) {
        setPhoto(
          `${helper.BASE_API}/photos/${user?.photo_id}/small` ||
            "images/male.png"
        );
      }
    }
  }, [user]);

  return (
    <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
      {photo ? (
        <Menu as="div" className="relative">
          {({ open }) => (
            <>
              <MenuButton className="flex items-center space-x-3 group focus:outline-none">
                <div className="relative">
                  <img
                    alt="User Profile"
                    src={photo}
                    className="h-10 w-10 rounded-full border-2 border-transparent group-hover:border-[#d90479] transition-all duration-300"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-white text-sm font-medium">
                    {helper.truncateName(
                      user?.first_name + " " + user?.last_name
                    )}
                  </span>
                  <span className="text-xs text-indigo-200">View Profile</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 text-gray-400 ml-1 transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </MenuButton>

              <MenuItems className="absolute left-0 mt-3 w-full bg-gradient-to-b from-[#0F172A] to-[#1A1A2E] rounded-xl shadow-2xl py-2 ring-1 ring-gray-700 ring-opacity-50 backdrop-blur-lg z-50 transform transition-all duration-200 scale-95 data-[enter]:scale-100">
                <div className="px-4 py-3 border-b border-gray-700">
                  <p className="text-sm text-gray-200">
                    {user?.email || Lang.login}
                  </p>
                </div>

                <div className="space-y-1 mt-1">
                  <MenuItem>
                    {({ active }) => (
                      <a
                        href="/profile"
                        className={`flex items-center px-4 py-2.5 rounded-lg mx-2 text-sm transition-all duration-200 ${
                          active ? "bg-[#d90479] text-white" : "text-gray-300"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {Lang.profile}
                      </a>
                    )}
                  </MenuItem>

                  {user && user?.role_id === 1 && (
                    <MenuItem>
                      {({ active }) => (
                        <a
                          href="/user-list"
                          className={`flex items-center px-4 py-2.5 rounded-lg mx-2 text-sm transition-all duration-200 ${
                            active ? "bg-[#d90479] text-white" : "text-gray-300"
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                          </svg>
                          {Lang.user}
                        </a>
                      )}
                    </MenuItem>
                  )}

                  <MenuItem>
                    {({ active }) => (
                      <a
                        href="#"
                        onClick={logout}
                        className={`flex items-center px-4 py-2.5 rounded-lg mx-2 text-sm transition-all duration-200 ${
                          active ? "bg-[#d90479] text-white" : "text-gray-300"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {Lang.logout}
                      </a>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </>
          )}
        </Menu>
      ) : (
        <button
          onClick={() => helper.handleClickRedirect("/login")}
          className="relative px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#d90479] to-[#8a2387] text-white font-medium shadow-lg hover:shadow-xl transition-all cursor-pointer duration-300 hover:scale-[1.03] group"
        >
          {Lang.login}
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
        </button>
      )}
    </div>
  );
}
