import { motion } from "framer-motion";
import Lang from "~/lang/lang";

export default function Map() {
  return (
    <motion.div
      className="box text-white py-5 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center">
          <p>
            <strong>
              {Lang.contact} {Lang.email}:
            </strong>{" "}
            <a
              href="mailto:info@company.com"
              className="text-[#D90479] hover:underline text-2xl"
            >
              {Lang.contact_email}
            </a>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mt-10 items-start">
          <div className="w-full lg:w-2/3 h-[400px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d802.9360058477988!2d12.5990218!3d41.9303844!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f653b7be196f7%3A0x7972c8aa23bac187!2sCommodore%20Industries!5e1!3m2!1sen!2sit!4v1753187154788!5m2!1sen!2sit"
              width="600"
              height="450"
              loading="lazy"
              className="w-full h-full"
            ></iframe>
          </div>

          <motion.div
            className="w-full lg:w-1/3 bg-gray-400/7 p-6 rounded-lg shadow-md text-white"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-2">Ororo</h2>
            <p className="text-sm flex items-start">
              <svg
                className="w-5 h-5 mr-2 mt-0.5 text-[#D90479]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 5.05a7 7 0 019.9 9.9l-4.242 4.243a1 1 0 01-1.415 0L5.05 14.95a7 7 0 010-9.9zm4.243 1.414a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                  clipRule="evenodd"
                />
              </svg>
              Via dei Luxardo, 33
              <br />
              00156 Roma RM - Italy
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
