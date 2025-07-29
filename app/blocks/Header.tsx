// Header.tsx
import { motion } from "framer-motion";
import TopMenuBar from "./TopMenuBar";
import MobileMenu from "./mobile-menu/MobileMenu";

export function Header() {
  return (
    <motion.header
      className="sticky top-0 z-50 bg-gradient-to-b from-[#0F172A] to-[#1A1A2E] border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between py-3 px-4 relative">
        {/* Logo */}
        <div className="flex-grow flex justify-center ml-12">
          <motion.img
            src="/images/logos/logo.svg"
            alt="Logo"
            className="h-8 w-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          />
        </div>

        {/* Burger menu on right */}
        <motion.div
          className="absolute right-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <MobileMenu />
        </motion.div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block">
        <TopMenuBar />
      </div>
    </motion.header>
  );
}
