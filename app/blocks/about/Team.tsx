import { motion } from "framer-motion";
import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";

type Props = {
  team: any[];
};

export default function Team({ team }: Props) {
  const { fadeUp, container } = new Helper();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={container}
      className="mx-auto"
    >
      <motion.h2
        variants={fadeUp}
        className="text-3xl font-bold text-center mb-12"
      >
        {Lang.meet_the_team}
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {team.map((member, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            custom={i + 1}
            className="bg-gray-400/10 rounded-xl p-6 shadow-lg border border-white/10 hover:border-pink-500 hover:scale-105 transition duration-300"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-pink-500 shadow-xl"
            />
            <h3 className="text-xl font-semibold text-pink-400 text-center">
              {member.name}
            </h3>
            <p className="text-sm text-white text-center">{member.title}</p>
            <p className="text-white mt-2 text-sm text-center">{member.bio}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
