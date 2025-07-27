import { motion } from "framer-motion";
import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";

export default function WhoWeAre() {
  const { fadeUp, container } = new Helper();

  return (
    <section className="relative py-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-sky-600/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>

      <div className="w-full mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="relative"
        >
          {/* Decorative Border */}
          <div className="absolute inset-0 rounded-3xl border border-white/10 shadow-2xl -z-10"></div>

          {/* Gradient Background */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E] -z-20"></div>

          {/* Glow Effect */}
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-pink-600/20 to-sky-700/20 blur-2xl opacity-40 -z-30"></div>

          <div className="py-16 px-6 md:px-12 lg:px-16">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Image Section */}
              <motion.div className="flex-shrink-0" variants={fadeUp}>
                <div className="relative">
                  <div className="w-64 h-64 rounded-full bg-gradient-to-r from-sky-500 to-pink-500 p-1">
                    <div className="w-full h-full rounded-full bg-gray-900 overflow-hidden flex items-center justify-center">
                      <div className="text-6xl">👥</div>
                    </div>
                  </div>
                  {/* <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                    Since 2018
                  </div> */}
                </div>
              </motion.div>

              {/* Content Section */}
              <div className="flex-grow">
                <motion.div variants={fadeUp}>
                  <div className="inline-block bg-gradient-to-r from-pink-600 to-purple-600 text-white text-md font-semibold px-4 py-1.5 rounded-full mb-4">
                    {Lang.about}
                  </div>
                </motion.div>

                <motion.h2
                  variants={fadeUp}
                  className="text-4xl md:text-3xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-400"
                >
                  {Lang.who_we_are}
                </motion.h2>

                <motion.p
                  variants={fadeUp}
                  custom={1}
                  className="text-lg text-gray-300 leading-relaxed mb-6"
                >
                 {/*  {Lang.founded_by + " "}
                  <a
                    href={Lang.linkedin_profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-pink-400 hover:text-pink-300 transition font-semibold group"
                  >
                    {Lang.profile_name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a> */}
                  {Lang.wwr_content}
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  custom={2}
                  className="relative pl-6 border-l-2 border-pink-500"
                >
                  <div className="absolute -left-1 top-0 w-3 h-3 rounded-full bg-pink-500"></div>
                  <p className="text-xl md:text-2xl italic text-pink-300 font-medium">
                    {Lang.wwr_moto}
                  </p>
                </motion.div>

                {/* Team Stats */}
                <motion.div
                  className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10"
                  variants={fadeUp}
                  custom={3}
                >
                  {[
                    { value: "50+", label: "Happy Customer" },
                    /* { value: "100K+", label: "Active Players" }, */
                    { value: "20+", label: "Team Members" },
                    { value: "10+", label: "Years Experience" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-4 bg-gradient-to-b from-gray-900/50 to-transparent rounded-xl border border-white/10"
                    >
                      <div className="text-2xl font-bold text-pink-400">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
