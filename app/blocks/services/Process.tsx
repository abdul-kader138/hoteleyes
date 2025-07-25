import { motion } from "framer-motion";
import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";

export default function Process() {
  const { fadeIn, staggerContainer, processSteps } = new Helper();
  return (
    <motion.div
      className="mb-28"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="flex justify-center mb-16">
        <div className="text-center max-w-2xl">
          <motion.h2
            className="text-3xl font-bold mb-4 text-pink-400"
            variants={fadeIn}
          >
            {Lang.development_process}
          </motion.h2>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-sky-500 to-pink-500 mx-auto mb-8 rounded-full"
            variants={fadeIn}
          ></motion.div>
          <motion.p className="text-gray-400 text-lg" variants={fadeIn}>
            {Lang.development_process_details}
          </motion.p>
        </div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-r from-sky-500 to-pink-500 hidden md:block"></div>

        <div className="space-y-12 md:space-y-0">
          {processSteps.map((step: any, index: any) => (
            <motion.div
              key={index}
              className="relative flex flex-col md:flex-row items-center"
              variants={fadeIn}
            >
              {/* Left side for even, right for odd */}
              <div
                className={`md:w-1/2 ${
                  index % 2 === 0
                    ? "md:pr-16 md:text-right"
                    : "md:pl-16 md:text-left md:ml-auto"
                }`}
              >
                <div
                  className={`bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E] p-6 rounded-2xl border border-white/10 shadow-xl ${
                    index % 2 === 0 ? "md:mr-0" : "md:ml-0"
                  }`}
                >
                  <div
                    className="absolute top-0 -mt-4 left-1/2 transform -translate-x-1/2 md:left-auto md:transform-none md:-translate-x-0 w-8 h-8 rounded-full bg-gradient-to-r from-sky-500 to-pink-500 flex items-center justify-center text-white font-bold md:top-1/2 md:-mt-4 md:-translate-y-1/2"
                    style={
                      index % 2 === 0
                        ? { right: "-4px", left: "auto" }
                        : { left: "-4px" }
                    }
                  >
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-pink-200">
                    {step.title}
                  </h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>

              {/* Center point for mobile */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-sky-500 to-pink-500 flex items-center justify-center text-white font-bold mx-auto my-4 md:hidden">
                {step.step}
              </div>

              {/* Spacer only for even steps */}
              {index % 2 === 0 ? (
                <div className="hidden md:block md:w-1/2"></div>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
