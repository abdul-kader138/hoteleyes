import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Lang from "~/lang/lang";
import { useUser } from "~/provider/userContext";
import { Helper } from "~/utils/helper";

export default function TopMenuBar() {
  const helper = new Helper();
  const { user, logout, loading } = useUser();
  const [photo, setPhoto] = useState("");
  const location = useLocation();

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
    <nav className="hidden md:flex w-full shadow-md">
      <div className="max-w-[1600px] mx-auto flex w-full items-center justify-between h-10">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <a href="/">
            {" "}
            <img
              className="h-9 w-auto"
              src="/images/logos/logo.svg"
              alt={Lang.logo}
            />
          </a>
        </div>

        {/* Center Navigation */}
        <div className="flex items-center space-x-3">
          {helper?.navigation.map((item: any, index: number) => {
            const isActive = location.pathname === item.href;
            return (
              <a
                key={index}
                href={item.href ?? "/"}
                className={`text-md px-4 py-2 cursor-pointer rounded-md transition duration-150 ${
                  isActive
                    ? "text-[#d90479]" // Active: custom pink text
                    : "text-white hover:text-[#d90479]" // Hover: same pink on hover
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        {/* Right - Profile or Login */}
        <div className="flex items-center gap-2">
          {photo ? (
            <Menu as="div" className="relative">
              <div className="flex items-center space-x-2">
                <img
                  alt="User Profile"
                  src={photo}
                  className="h-8 w-8 rounded-full"
                />
                <MenuButton className="text-white text-sm cursor-pointer">
                  {helper.truncateName(
                    user?.first_name + " " + user?.last_name
                  )}
                </MenuButton>
              </div>
              <MenuItems className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 ring-1 ring-black/5 z-50">
                <MenuItem>
                  <a
                    href="/profile"
                    className="block px-2.5 py-1.5 text-sm text-white hover:bg-[#D90479]"
                  >
                    {Lang.profil}
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    onClick={logout}
                    className="block px-2.5 py-1.5 text-sm text-white hover:bg-[#D90479]"
                  >
                    {Lang.logout}
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          ) : (
            <button
              onClick={() => helper.handleClickRedirect("/login")}
              className="w-11 h-11 rounded-full bg-[#d90479] flex items-center justify-center cursor-pointer"
            >
              <img
                src={"/images/icons/icon-account.svg"}
                className="w-4 h-4"
                alt={Lang.user}
              />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
