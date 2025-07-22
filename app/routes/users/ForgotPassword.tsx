import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { z } from "zod";
import type { Route } from "../+types/Home";
import Lang from "../../lang/lang";
import { Helper } from "../../utils/helper";

export function meta({}: Route.MetaArgs) {
  return [
    { title: Lang.title + " - " + Lang.forgot_password },
    {
      name: "description",
      content: Lang.welcome_fx + " - " + Lang.forgot_password,
    },
  ];
}

const forgotPasswordSchema = z.object({
  email: z
    .email(Lang.invalid_email),       
});


type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const { BASE_API } = new Helper();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const response = await fetch(`${BASE_API}/auth/forgot-password`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      toast.success(Lang.reset_link);
      reset();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-2">
      <Toaster position="top-right" />
     <div className="bg-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl p-8 sm:p-12 lg:p-16">
        <div className="text-center mb-8">
          <a href="/">
            <img
              src="/images/logos/logo.svg"
              alt="Logo"
              className="mx-auto h-10 w-auto"
            />
          </a>
          <h1 className="text-white text-xl font-semibold mt-6">
            {Lang.forgot_password}
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder={Lang.enter_email}
              {...register("email")}
              value={watch("email")}
              onChange={(e) => setValue("email", e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-full text-sm text-white border border-gray-600 focus:border-[#D90479] outline-none"
            />
            {errors.email && (
              <p className="text-red-500 px-2 py-1 text-sm">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 cursor-pointer text-sm bg-[#D90479] hover:scale-[1.05] transition-transform text-white font-semibold rounded-full flex items-center justify-center"
          >
            {isSubmitting ? (
              <FaSpinner className="animate-spin text-xl" />
            ) : (
              Lang.continue
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <a href="/login" className="text-[#D90479] hover:underline text-sm">
            {Lang.cancle}
          </a>
        </div>
      </div>
    </div>
  );
}
