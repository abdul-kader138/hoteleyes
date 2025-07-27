import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { Helper } from "~/utils/helper";

const { slidesVertical } = new Helper();
const slideVariants = {
  initial: { opacity: 0, scale: 1.05 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.8 } },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [typedText, setTypedText] = useState("");
  const fullText = "From Repairs to Cleanliness — We Maintain, You Simply Relax.";
  const slideInterval = useRef<any>(null);
  const [showCursor, setShowCursor] = useState(true);

  const nextSlide = () =>
    setCurrent((prev) => (prev === slidesVertical.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    slideInterval.current = setInterval(nextSlide, 4000);
    return () => clearInterval(slideInterval.current);
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(interval);
        setShowCursor(false);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Animated Slider */}
      <div className="w-full h-[60vh] sm:h-[70vh] relative">
        <div className="relative w-full h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={slidesVertical[current].image}
                alt={slidesVertical[current].title}
                className="w-full h-full object-cover shadow-lg"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Hero Title with Typing Animation */}
      <section className="relative box pt-10 pb-2 px-4 sm:px-6 lg:px-20">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-pink-300 font-bold mb-6 text-center min-h-[3rem]"
        >
          {typedText}
          {showCursor && <span className="animate-pulse">|</span>}
        </motion.h1>
      </section>

      {/* Call-to-Actions with Animation */}
      <section className="relative py-2 box">
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6  mt-5 px-4">
          {"/games,/services,/contact".split(",").map((path, i) => (
            <motion.div
              key={path}
              custom={i}
              initial="hidden"
              animate={["visible", "pulse"]}
              variants={buttonVariants}
            >
              <Link
                to={path}
                className="font-semibold bg-gradient-to-r from-pink-600 to-purple-600 px-5 py-2 text-sm sm:py-3 sm:text-base rounded-full hover:bg-white hover:text-black transition"
              >
                {i === 0 ? "Our Games" : i === 1 ? "Services" : "Contact Us"}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
