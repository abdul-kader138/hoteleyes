import { motion } from "framer-motion";
import { Helper } from "~/utils/helper";
import Lang from "../lang/lang";
import type { Route } from "./+types/Home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: Lang.title + " | " + Lang.about },
    { name: "description", content: Lang.welcome_fx + " - " + Lang.about },
  ];
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.4,
    },
  },
};

const awards = [
  { src: "/images/awards/1.png", alt: "Game Award" },
  { src: "/images/awards/2.png", alt: "Top Studio" },
  { src: "/images/awards/3.png", alt: "Innovation Award" },
];

const team = [
  {
    name: "LUIGI SIMONETTI",
    title: "SAMPLE DESIGNATION",
    image: "/images/male.png",
    bio: "Storyteller and design lead, passionate about immersive worlds.",
  },
  {
    name: "VALLI FRAGOSO",
    title: "SAMPLE DESIGNATION",
    image: "/images/male.png",
    bio: "Visionary entrepreneur leading innovation in the gaming space.",
  },
  {
    name: "STEFANO CIANFARELLI",
    title: "SAMPLE DESIGNATION",
    image: "/images/male.png",
    bio: "Tech wizard behind our smooth gameplay and architecture.",
  },
  {
    name: "FRANCESCO COLANGELI",
    title: "SAMPLE DESIGNATION",
    image: "/images/male.png",
    bio: "Creative coder blending logic with imagination.",
  },
  {
    name: "GIOVANNI CELAURO",
    title: "SAMPLE DESIGNATION",
    image: "/images/male.png",
    bio: "Pixel perfectionist, building worlds that feel alive.",
  },
];

export default function Home() {
  const { gameSections } = new Helper();

  return (
    <>  <div className="relative w-full h-[45vh] overflow-hidden">
  <motion.img
    src="/images/games/banner.png"
    alt="Games"
    className="w-full h-full object-cover shadow-lg"
    animate={{
      scale: [1, 1.05, 1],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
</div>
    <section className="text-white py-10 px-7 box relative overflow-hidden">
      {/* Fancy Background Animation */}

      {/* WHO WE ARE */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={container}
        className="relative mx-auto mb-24"
      >
        <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-pink-600/20 to-sky-700/20 blur-2xl opacity-40 -z-10" />
        <motion.h2 variants={fadeUp} className="text-4xl font-extrabold text-center mb-6">
          Who We Are
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={1}
          className="text-lg text-gray-300 text-center leading-relaxed"
        >
          Founded by{" "}
          <a
            href="https://www.linkedin.com/in/vallifragoso/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-400 underline font-semibold hover:text-blue-400 transition"
          >
            Valli Fragoso
          </a>
          , a visionary passionate about gaming and digital innovation. We're a bold new force
          in the gaming world — crafting immersive experiences designed to entertain, challenge,
          and inspire players around the globe.
        </motion.p>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-6 text-center text-2xl italic text-pink-400 font-semibold"
        >
          “Innovating Fun, Delivering Excellence.”
        </motion.p>
      </motion.div>

      {/* OUR VISION */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={container}
        className="relative  mx-auto mb-24"
      >
        <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-sky-600/20 to-pink-600/20 blur-2xl opacity-40 -z-10" />
        <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-center mb-6">
          Our Vision
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={1}
          className="text-lg text-gray-300 leading-relaxed text-center"
        >
          We aim to be a global leader in interactive entertainment, setting new standards in
          storytelling, game mechanics, and player engagement. Our future is about pushing creative
          boundaries — connecting millions through unforgettable experiences that shape the future
          of play.
        </motion.p>
      </motion.div>

      {/* AWARDS */}
      <div className="relative max-w-8xl mx-auto px-6 mb-24">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="text-3xl font-bold text-center mb-10"
        >
          Awards & Recognition
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-12">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="bg-white/15 p-4 rounded-xl shadow-md hover:scale-110 transition duration-300 backdrop-blur-md"
            >
              <img
                src={award.src}
                alt={award.alt}
                className="h-25 sm:h-24 object-contain drop-shadow-md"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* TEAM */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={container}
        className="mx-auto"
      >
        <motion.h2 variants={fadeUp} className="text-3xl font-bold text-center mb-12">
          Meet the Team
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {team.map((member, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i + 1}
              className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl p-6 shadow-lg border border-white/10 hover:border-pink-500 hover:scale-105 transition duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-pink-500 shadow-xl"
              />
              <h3 className="text-xl font-semibold text-pink-400 text-center">
                {member.name}
              </h3>
              <p className="text-sm text-gray-400 text-center">{member.title}</p>
              <p className="text-gray-300 mt-2 text-sm text-center">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
    </>
  );
}
