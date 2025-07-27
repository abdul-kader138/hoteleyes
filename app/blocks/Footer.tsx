import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaSpinner,
  FaYoutube,
} from "react-icons/fa";
import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";

export default function Footer() {
  const { BASE_API } = new Helper();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) return false;
    setLoading(true);
    try {
      const response = await fetch(`${BASE_API}/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(Lang.subscription_email_sent_message);
        setEmail("");
      } else {
        toast.error(data.message || Lang.unknown_error);
      }
    } catch (error: any) {
      toast.error(error.message || Lang.unknown_error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#0F172A] to-[#1A1A2E] pt-16 pb-8 border-t border-white/10">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="box mx-auto px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center text-xl mr-3">
                🎮
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
                {Lang.title}
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
             Delivering exceptional hotel experiences through meticulous housekeeping, expert maintenance, and thoughtful service design.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-r from-pink-600 to-purple-600 transition-all"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-r from-pink-600 to-purple-600 transition-all"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-r from-pink-600 to-purple-600 transition-all"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-r from-pink-600 to-purple-600 transition-all"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-pink-400">
              {Lang.quick_links}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="flex items-center text-white/80 hover:text-pink-400 transition group"
                >
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                  {Lang.home}
                </a>
              </li>
              {/* <li>
                <a
                  href="/games"
                  className="flex items-center text-white/80 hover:text-pink-400 transition group"
                >
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                  {Lang.games}
                </a>
              </li> */}
              <li>
                <a
                  href="/about"
                  className="flex items-center text-white/80 hover:text-pink-400 transition group"
                >
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                  {Lang.about}
                </a>
              </li>
              <li>
                <a
                  href="/news"
                  className="flex items-center text-white/80 hover:text-pink-400 transition group"
                >
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                  {Lang.blog}
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="flex items-center text-white/80 hover:text-pink-400 transition group"
                >
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                  {Lang.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-pink-400">
              {Lang.contact_us}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-pink-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-white/80">
                  123 Game Street, Virtual City, VC 54321
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-pink-500 mr-3 flex-shrink-0" />
                <span className="text-white/80">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="text-pink-500 mt-1 mr-3 flex-shrink-0" />
                <a
                  href="mailto:info@example.com"
                  className="text-white/80 hover:text-pink-400 transition"
                >
                  {Lang.contact_email}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-pink-400">
              {Lang.newsletter}
            </h3>
            <p className="text-white/70 mb-4">
              Subscribe to get updates on new special offers.
            </p>
            <div className="flex">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder={Lang.email}
                className="bg-gray-800 border border-white/10 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-pink-500 w-full"
              />
              {loading ? (
                <FaSpinner className="animate-spin ml-2 mt-2 text-xl" />
              ) : (
                <button
                  onClick={handleSubscribe}
                  className="cursor-pointer bg-gradient-to-r from-pink-600 to-purple-600 px-4 py-2 rounded-r-lg font-medium hover:opacity-90 transition-opacity"
                >
                  {Lang.subscribe}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-pink-600/50 to-transparent my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/60 text-sm">
            © {new Date().getFullYear()} {Lang.title}. {Lang.copyright}
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="#"
              className="text-white/60 hover:text-pink-400 transition text-sm"
            >
              {Lang.terms}
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-pink-400 transition text-sm"
            >
              {Lang.privacy}
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-pink-400 transition text-sm"
            >
              {Lang.cookie}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
