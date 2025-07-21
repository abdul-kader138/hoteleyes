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
    <>
      {/* Install Button */}

      {/* Icon Buttons */}
      <div className="flex justify-center gap-6 mt-1">
        {photo ? (
          <>
            <Menu as="div" className="relative flex  cursor-pointer">
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
              <MenuItems className="absolute mt-12  w-48 bg-[#002459] rounded-md shadow-lg py-1 ring-1 ring-black/5 z-50">
                <MenuItem>
                  <a
                    href="/profile"
                    className="block px-2.5 py-1.5 text-sm text-white hover:bg-gray-700"
                  >
                    {Lang.profil}
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    onClick={logout}
                    className="block px-2.5 py-1.5 text-sm text-white hover:bg-gray-700"
                  >
                    {Lang.logout}
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </>
        ) : (
          <div className="w-14 h-14 rounded-full bg-[#002459] flex items-center justify-center cursor-pointer">
            <img
              src="/images/icons/icon-account.svg"
              className="h-6 w-6"
              alt={Lang.user}
            />
          </div>
        )}

      </div>
    </>
  );
}
