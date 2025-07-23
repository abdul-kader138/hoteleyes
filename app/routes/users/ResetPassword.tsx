import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";
import type { Route } from "../+types/Home";
import Lang from "../../lang/lang";
import { Helper } from "../../utils/helper";

export function meta({}: Route.MetaArgs) {
  return [
    { title: Lang.title + " - " + Lang.reset_password },
    {
      name: "description",
      content: Lang.welcome_fx + " - " + Lang.reset_password,
    },
  ];
}

// Schema with zod
const resetPasswordSchema = z
  .object({
    password: z.string().min(6, Lang.invalid_password),
    confirmPassword: z.string().min(6, Lang.invalid_password),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: Lang.password_not_matched,
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { BASE_API } = new Helper();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      const response = await fetch(`${BASE_API}/auth/reset-password`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: data.password }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      sessionStorage.setItem("success_message", Lang.password_update_success);
      navigate("/login");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Toaster position="top-right" />
      <div className="bg-gray-800 min-w-md rounded-lg shadow-lg p-5 sm:p-5 lg:p-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="text-center mb-8">
            <a href="/">
              <img
                src="/images/logos/logo.svg"
                alt="Logo"
                className="mx-auto h-10 w-auto"
              />
            </a>
            <h1 className="text-white text-xl font-semibold mt-6">
              {Lang.reset_password}
            </h1>
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder={Lang.new_password}
              {...register("password")}
              value={watch("password")}
              onChange={(e) => setValue("password", e.target.value)}
              className="w-full p-3 rounded-full bg-gray-700 text-sm text-white border border-gray-600 focus:border-[#D90479] outline-none"
            />
            {errors.password && (
              <p className="text-red-500 px-2 pt-1 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder={Lang.confirm_password}
              {...register("confirmPassword")}
              value={watch("confirmPassword")}
              onChange={(e) => setValue("confirmPassword", e.target.value)}
              className="w-full p-3 rounded-full bg-gray-700 text-sm text-white border border-gray-600 focus:border-[#D90479] outline-none"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 px-2 pt-1 text-sm">
                {errors.confirmPassword.message}
              </p>
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
      </div>
    </div>
  );
}
