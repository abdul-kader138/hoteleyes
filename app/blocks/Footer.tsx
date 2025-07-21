import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Lang from "~/lang/lang";

export default function Footer() {
  return (
    <footer className="text-white bg-gradient-to-b from-[#0F172A] to-[#1A1A2E] pt-10">

      {/* Top Section */}
      <div className="box lg:px-10 md:px-10 sm:px-2 w-full max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#D90479]">{Lang.contact_us}</h3>
          <p className="text-sm text-white/80 hover:text-[#D90479] cursor-pointer">
            📧 {Lang.contact_email}
          </p>
        </div>

        {/* Company Links */}
        <div className="text-center sm:text-left lg:text-left">
          <ul className="space-y-1 text-sm text-white/80">
            <li><a href="#" className="hover:text-[#D90479] transition">{Lang.about}</a></li>
            <li><a href="#" className="hover:text-[#D90479] transition">{Lang.meet_the_team}</a></li>
            <li><a href="#" className="hover:text-[#D90479] transition">{Lang.news_event}</a></li>
          </ul>
        </div>

        <div className="flex flex-col items-start sm:items-center lg:items-end">
          <ul className="space-y-1 text-sm text-white/80">
            <li><a href="#" className="hover:text-[#D90479] transition">{Lang.terms}</a></li>
            <li><a href="#" className="hover:text-[#D90479] transition">{Lang.privacy}</a></li>
            <li><a href="#" className="hover:text-[#D90479] transition">{Lang.cookie}</a></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="py-2 my-2"></div>

      {/* Bottom Section */}
      <div className="box lg:px-10 md:px-10 sm:px-2 w-full max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-sm text-white/60">
        {/* Copyright */}
        <div className="text-left sm:text-center lg:text-left">
          © {new Date().getFullYear()} {Lang.copyright}
        </div>

        {/* Middle (Optional) */}
        <div className="text-center hidden lg:block">
       {/*    <p className="italic text-white/40">Crafted with ❤️ by </p> */}
        </div>

        {/* Legal Links */}
         <div className="flex justify-center sm:items-center lg:justify-end gap-4 items-start">
          <a href="#" className="hover:text-red-500 transition"><FaYoutube className="w-7 h-7" /></a>
          <a href="#" className="hover:text-blue-500 transition"><FaFacebook className="w-7 h-7" /></a>
          <a href="#" className="hover:text-pink-500 transition"><FaInstagram className="w-7 h-7" /></a>
          <a href="#" className="hover:text-blue-400 transition"><FaLinkedin className="w-7 h-7" /></a>
        </div>
      </div>

      {/* Bottom Padding */}
      <div className="py-6" />
    </footer>
  );
}
