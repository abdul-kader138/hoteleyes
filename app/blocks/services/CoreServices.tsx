import { motion } from "framer-motion";
import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";

export default function CoreServices() {
  const { fadeIn, staggerContainer, coreServices } = new Helper();
  return (
    <>
      <motion.div
        className="text-center mb-20"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h1 className="text-4xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-pink-300 mb-8">
          {Lang.ouer_service}
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          {Lang.ouer_service_details}
        </p>
      </motion.div>

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
              {Lang.core_service}
            </motion.h2>
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-sky-500 to-pink-500 mx-auto mb-8 rounded-full"
              variants={fadeIn}
            ></motion.div>
            <motion.p className="text-gray-400 text-lg" variants={fadeIn}>
              {Lang.core_service_details}
            </motion.p>
          </div>
        </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {coreServices.map((service: any, index: any) => (
    <motion.div
      key={index}
      className="bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E] p-8 rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
      variants={fadeIn}
      whileHover={{ y: -10 }}
    >
      <div className="text-5xl mb-6">{service.icon}</div>
      <h3 className="text-xl font-bold mb-4">{service.title}</h3>
      <p className="text-gray-400 flex-grow text-justify">{service.description}</p>
    </motion.div>
  ))}
</div>

      </motion.div>
    </>
  );
}
