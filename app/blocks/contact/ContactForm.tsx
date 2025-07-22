import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

export default function Vision() {
  const contactSchema = z.object({
    name: z.string().min(2, Lang.name_validation),
    email: z.string().email(Lang.email_validation),
    subject: z.string().min(3, Lang.subject_validation),
    message: z.string().min(10, Lang.message_validation),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const { BASE_API } = new Helper();

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch(`${BASE_API}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(Lang.submission_failed);

      toast.success(Lang.contact_success_message);

      // Reset with delay (optional)
      setTimeout(() => {
        reset({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }, 300);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="py-12">
      <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto space-y-10 px-4">
        {/* Animated Title */}
        <motion.h1
          className="text-4xl font-extrabold text-center text-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {Lang.contact_details}
        </motion.h1>

        {/* Animated Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full bg-gray-400/10 p-6 rounded-lg shadow-xl space-y-10 backdrop-blur-md"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Name + Email */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            variants={fadeUpVariants}
          >
            <motion.div className="flex-1" variants={fadeUpVariants}>
              <motion.input
                type="text"
                {...register("name")}
                value={watch("name")}
                onChange={(e) => setValue("name", e.target.value)}
                placeholder={Lang.name}
                whileFocus={{ scale: 1.02, boxShadow: "0 0 8px #D90479" }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="w-full p-3 rounded bg-white/10 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D90479] text-white"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </motion.div>

            <motion.div className="flex-1" variants={fadeUpVariants}>
              <motion.input
                type="email"
                {...register("email")}
                value={watch("email")}
                onChange={(e) => setValue("email", e.target.value)}
                placeholder={Lang.email}
                whileFocus={{ scale: 1.02, boxShadow: "0 0 8px #D90479" }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="w-full p-3 rounded bg-white/10 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D90479] text-white"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </motion.div>
          </motion.div>

          {/* Subject */}
          <motion.div variants={fadeUpVariants}>
            <motion.input
              type="text"
              {...register("subject")}
              value={watch("subject")}
              onChange={(e) => setValue("subject", e.target.value)}
              placeholder={Lang.subject}
              whileFocus={{ scale: 1.02, boxShadow: "0 0 8px #D90479" }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="w-full p-3 rounded bg-white/10 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D90479] text-white"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm">{errors.subject.message}</p>
            )}
          </motion.div>

          {/* Message */}
          <motion.div variants={fadeUpVariants}>
            <motion.textarea
              {...register("message")}
              value={watch("message")}
              onChange={(e) => setValue("message", e.target.value)}
              placeholder={Lang.message}
              rows={5}
              whileFocus={{ scale: 1.01, boxShadow: "0 0 10px #D90479" }}
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.3 }}
              className="w-full p-3 rounded bg-white/10 border text-white border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D90479]"
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="bg-[#D90479] px-6 py-3 cursor-pointer rounded text-white font-bold shadow-xl hover:shadow-pink-500/30"
            whileTap={{ scale: 0.95 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(217, 4, 121, 0.6)",
            }}
            transition={{ duration: 0.25 }}
            variants={fadeUpVariants}
          >
            {Lang.send_message}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
