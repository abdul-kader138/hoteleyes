import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { FaFacebook, FaGoogle, FaSpinner } from "react-icons/fa";
import { z } from "zod";
import type { Route } from "../+types/Home";
import Lang from "../../lang/lang";
import { Helper } from "../../utils/helper";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${Lang.title} - ${Lang.login}` },
    { name: "description", content: `${Lang.welcome_fx} - ${Lang.login}` },
  ];
}

const loginSchema = z.object({
  email: z.string().email(Lang.email_validation),
  password: z.string().min(1, Lang.password_required),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const { BASE_API } = new Helper();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const message = sessionStorage.getItem("success_message");
    if (message) {
      toast.success(message, { duration: 2000 });
      sessionStorage.removeItem("success_message");
    }
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch(`${BASE_API}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || Lang.invalid_email_password);

      sessionStorage.setItem("success_message", Lang.login_success);
      window.location.href = "/dashboard";
    } catch (error: any) {
      toast.error(error.message || "Login failed");
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
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder={Lang.email_address}
              {...register("email")}
              value={watch("email")}
              onChange={(e) => setValue("email", e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-full text-sm text-white border border-gray-600 outline-none focus:border-[#D90479]"
            />
            {errors.email && (
              <p className="text-red-500 px-2 py-1 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder={Lang.password}
              {...register("password")}
              value={watch("password")}
              onChange={(e) => setValue("password", e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-full text-sm text-white border border-gray-600 outline-none focus:border-[#D90479]"
            />
            {errors.password && (
              <p className="text-red-500 px-2 py-1 text-sm">
                {errors.password.message}
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
              "🔒 " + Lang.login
            )}
          </button>

          <div className="text-center">
            <a
              href="/forgot-password"
              className="text-[#D90479] hover:underline text-sm"
            >
              {Lang.forgot_password}?
            </a>
          </div>

          <div className="flex justify-center gap-3 mt-4">
            <a href={`${BASE_API}/auth/facebook`} title="Login with Facebook">
              <FaFacebook className="text-gray-300 text-xl hover:scale-110 transition" />
            </a>
            <a href={`${BASE_API}/auth/google`} title="Login with Google">
              <FaGoogle className="text-gray-300 text-xl hover:scale-110 transition" />
            </a>
          </div>

          <div className="text-center text-sm text-gray-400 mt-6">
            {Lang.no_account}{" "}
            <a href="/registration" className="text-[#D90479] hover:underline">
              {Lang.sign_up_now}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
