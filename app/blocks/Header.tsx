import TopMenuBar from "./TopMenuBar";
import MobileMenu from "./mobile-menu/MobileMenu";

export function Header() {
  return (
    <>
      <header className="xs:mt-0.5 sm:mt-0.5 bg-gradient-to-b from-[#0F172A] to-[#1A1A2E] shadow-md">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between py-1.5 relative">
          {/* Burger on Right */}
          <div className="absolute left-0 mx-2">
            <MobileMenu />
          </div>

          {/* Logo in center */}
          <div className="flex-grow px-1 ml-5">
            <img
              src="/images/logos/logo.svg"
              alt="Logo"
              className="h-8 w-auto mx-auto"
            />
          </div>
        </div>

        {/* Desktop Header (original design untouched) */}
        <div className="hidden md:block box w-full">{<><TopMenuBar /></>} </div>
      </header>
     
    </>
  );
}
