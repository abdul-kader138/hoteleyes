import { motion } from "framer-motion";
import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";

type TeamMember = {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
};

type Props = {
  team: TeamMember[];
};

// Animation variants extracted for better organization
const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      when: "beforeChildren",
    },
  },
};

const cardItem: Variants = {
  hidden: {
    y: 40,
    opacity: 0,
    scale: 0.95,
  },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function Team({ team }: Props) {
  const { fadeUp } = new Helper();
  return (
    <section className="px-4 max-w-7xl mx-auto">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-16"
      >
        <motion.h2
          variants={fadeUp}
          className="text-4xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-pink-300 mb-4"
        >
          {Lang.meet_the_team}
        </motion.h2>
        <motion.div
          variants={fadeUp}
          custom={0.3}
          className="flex justify-center"
        >
          <div className="h-1 w-24 bg-gradient-to-r from-sky-500 to-pink-500 rounded-full" />
        </motion.div>
      </motion.div>

      <motion.div
        variants={container}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {team.map((member, i) => (
          <motion.div
            key={member.id}
            variants={cardItem}
            custom={i * 0.2}
            whileHover={{
              y: -10,
              transition: { duration: 0.3 },
            }}
            className="group"
          >
            <div className="bg-pink-600/10 -800 rounded-2xl p-1 shadow-xl h-full">
              <div className="bg-gray-900/80 rounded-xl p-6 h-full flex flex-col items-center backdrop-blur-sm border border-white/5 group-hover:border-pink-500/30 transition-all duration-300">
                <div className="absolute inset-0 rounded-3xl border border-white/10 shadow-2xl -z-10"></div>

                {/* Gradient Background */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E] -z-20"></div>

                {/* Glow Effect */}
                <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-pink-600/20 to-sky-700/20 blur-2xl opacity-40 -z-30"></div>
                <div className="relative mb-5">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-pink-600 rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
                  <img
                    src={member.image}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-gray-800 group-hover:border-pink-500 transition-colors duration-300"
                  />
                </div>

                <h3 className="text-md font-bold text-white group-hover:text-pink-300 transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-pink-400 mb-3">{member.title}</p>
                <p className="text-gray-300 text-center text-sm md:text-base flex-grow">
                  {member.bio}
                </p>

                <div className="mt-5 flex space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border border-white/5 hover:bg-pink-500/10 hover:border-pink-500/30 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-gray-500 group-hover:bg-pink-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
