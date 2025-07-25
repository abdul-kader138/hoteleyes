import { motion } from "framer-motion";
import Lang from "~/lang/lang";
import AnimatedForm from "./contact-form/AnimatedForm";
import InfoCard from "./contact-form/InfoCard";

export default function ContactForm() {
  return (
    <div className="box py-10 px-10">
      <div className=" mx-auto">
        {/* Header with decorative elements */}
        <motion.div
          className="text-center mb-16 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-5 -right-10 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl" />

          <motion.h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300 mb-4">
            {Lang.contact_details}
          </motion.h1>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-blue-500 to-pink-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <InfoCard />
          <AnimatedForm />
        </div>
      </div>
    </div>
  );
}
