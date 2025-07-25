import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";

const contactSchema = z.object({
  name: z.string().min(2, Lang.name_validation),
  email: z.string().email(Lang.email_validation),
  subject: z.string().min(3, Lang.subject_validation),
  message: z.string().min(10, Lang.message_validation),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function AnimatedForm() {
  const { BASE_API } = new Helper();
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren",
      },
    },
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulate API call
      const res = await fetch(`${BASE_API}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(Lang.submission_failed);
      toast.success(Lang.contact_success_message);
      reset();
    } catch (err) {
      toast.error(Lang.submission_failed);
    }
  };
  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E]  rounded-2xl p-8 shadow-2xl border border-white/5 backdrop-blur-sm"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={fadeUpVariants} className="mb-6">
        <div className="relative">
          <input
            id="name"
            {...register("name")}
            placeholder=" "
            className={`w-full px-4 py-3  rounded-lg border ${
              errors.name ? "border-red-500" : "border-gray-700"
            } focus:outline-none focus:ring-2 focus:ring-pink-500 text-white peer`}
          />
          <label
            htmlFor="name"
            className="absolute left-4 top-3 text-gray-400 transition-all duration-300 
                  peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs
                  peer-placeholder-shown:text-base peer-focus:text-pink-400 -top-3 text-xs bg-gray-900 px-1"
          >
            {Lang.name}
          </label>
        </div>
        {errors.name && (
          <p className="text-red-400 text-sm mt-2">{errors.name.message}</p>
        )}
      </motion.div>

      <motion.div variants={fadeUpVariants} className="mb-6">
        <div className="relative">
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder=" "
            className={`w-full px-4 py-3  rounded-lg border ${
              errors.email ? "border-red-500" : "border-gray-700"
            } focus:outline-none focus:ring-2 focus:ring-pink-500 text-white peer`}
          />
          <label
            htmlFor="email"
            className="absolute left-4 top-3 text-gray-400 transition-all duration-300 
                  peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs
                  peer-placeholder-shown:text-base peer-focus:text-pink-400 -top-3 text-xs bg-gray-900 px-1"
          >
            {Lang.email}
          </label>
        </div>
        {errors.email && (
          <p className="text-red-400 text-sm mt-2">{errors.email.message}</p>
        )}
      </motion.div>

      <motion.div variants={fadeUpVariants} className="mb-6">
        <div className="relative">
          <input
            id="subject"
            {...register("subject")}
            placeholder=" "
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.subject ? "border-red-500" : "border-gray-700"
            } focus:outline-none focus:ring-2 focus:ring-pink-500 text-white peer`}
          />
          <label
            htmlFor="subject"
            className="absolute left-4 top-3 text-gray-400 transition-all duration-300 
                  peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs
                  peer-placeholder-shown:text-base peer-focus:text-pink-400 -top-3 text-xs bg-gray-900 px-1"
          >
            {Lang.subject}
          </label>
        </div>
        {errors.subject && (
          <p className="text-red-400 text-sm mt-2">{errors.subject.message}</p>
        )}
      </motion.div>

      <motion.div variants={fadeUpVariants} className="mb-8">
        <div className="relative">
          <textarea
            id="message"
            {...register("message")}
            placeholder=" "
            rows={5}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.message ? "border-red-500" : "border-gray-700"
            } focus:outline-none focus:ring-2 focus:ring-pink-500 text-white peer resize-none`}
          />
          <label
            htmlFor="message"
            className="absolute left-4 top-3 text-gray-400 transition-all duration-300 
                  peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs
                  peer-placeholder-shown:text-base peer-focus:text-pink-400 -top-3 text-xs bg-gray-900 px-1"
          >
            {Lang.message}
          </label>
        </div>
        {errors.message && (
          <p className="text-red-400 text-sm mt-2">{errors.message.message}</p>
        )}
      </motion.div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        variants={fadeUpVariants}
        whileHover={{
          scale: 1.03,
        }}
        whileTap={{ scale: 0.98 }}
        className="w-full cursor-pointer bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-4 rounded-lg 
                        text-white font-bold text-lg disabled:opacity-70 relative overflow-hidden"
      >
        {isSubmitting ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2"
          >
            <span className="h-4 w-4 rounded-full border-2 border-t-transparent animate-spin"></span>
            {Lang.sending}
          </motion.span>
        ) : (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {Lang.send_message}
          </motion.span>
        )}
        <motion.div
          className="absolute inset-0 bg-white opacity-0"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.1, transition: { duration: 0.3 } }}
        />
      </motion.button>
    </motion.form>
  );
}
