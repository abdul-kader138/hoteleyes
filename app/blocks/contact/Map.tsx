import { motion } from "framer-motion";
import Lang from "~/lang/lang";

export default function Map() {
  return (
    <div className="relative py-16 px-10 overflow-hidden box">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>

      <motion.div
        className="mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 mb-4"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {Lang.find_us}
          </motion.h2>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-blue-500 to-pink-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Map container with enhanced styling */}
          <motion.div
            className="w-full lg:w-2/3 h-[500px] rounded-2xl overflow-hidden shadow-2xl relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl pointer-events-none" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2218.1510550659586!2d5.119289576165273!3d52.0954435675763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c66f45c2d679e3%3A0x25dedc098a5a2bce!2sEye%20Hotel!5e1!3m2!1sen!2sit!4v1753642965517!5m2!1sen!2sit"
              width="100%"
              height="100%"
              loading="lazy"
              className="absolute inset-0"
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>


          </motion.div>

          {/* Contact card with enhanced design */}
          <motion.div
            className="w-full lg:w-1/3 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="h-full bg-gradient-to-br from-gray-800 to-gray-900 p-8 shadow-2xl border border-white/5 backdrop-blur-sm rounded-2xl flex flex-col">
              <div className="flex-1">
                <motion.h2
                  className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {Lang.title}
                </motion.h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-pink-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 5.05a7 7 0 019.9 9.9l-4.242 4.243a1 1 0 01-1.415 0L5.05 14.95a7 7 0 010-9.9zm4.243 1.414a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {Lang.address}
                      </h3>
                      <p className="text-gray-300 mt-2">
                        Wijde Begijnestraat 1-3,
                        <br />
                        3512 AW Utrecht, Netherlands
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-pink-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{Lang.email}</h3>
                      <motion.a
                        href="mailto:info@company.com"
                        className="text-pink-400 hover:text-pink-300 transition-colors block mt-2"
                        whileHover={{ x: 5 }}
                      >
                        {Lang.contact_email}
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                className="mt-10 pt-6 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="font-semibold text-white mb-4">
                  {Lang.working_hours} :
                </h3>
                <p className="text-gray-300">
                  {Lang.mon_fri}: 9:00 - 18:00
                  <br />
                  {Lang.sat} - {Lang.sun}: {Lang.closed}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
