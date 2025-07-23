import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FaFacebook, FaGoogle, FaSpinner } from "react-icons/fa";
import Select from "react-select";
import { z } from "zod";
import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";

// Schema
const registerSchema = z.object({
  firstName: z.string().min(2, Lang.first_name_validation),
  lastName: z.string().min(2, Lang.last_name_validation),
  email: z.string().email(Lang.email_validation),
  password: z.string().min(6, Lang.password_validation),
  country: z.object(
    {
      label: z.string(),
      value: z.string(),
      phone_code: z.string(),
    },
    { required_error: Lang.country_required }
  ),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const { BASE_API } = new Helper();
  const [countries, setCountries] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      country: null,
    },
  });

  const onSubmit = async (formData: RegisterFormData) => {
    try {
      const response = await fetch(`${BASE_API}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
          country: formData.country.label, // or iso_code if preferred
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      sessionStorage.setItem("success_message", Lang.data_saved);
      window.location.href = "/login";
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-2">
      <Toaster position="top-right" />
      <div className="bg-gray-800 min-w-md rounded-lg shadow-lg p-5 sm:p-5 lg:p-16">
        <div className="text-center mb-6">
          <a href="/">
            <img
              src="/images/logos/logo.svg"
              alt="Logo"
              className="mx-auto h-9 w-auto"
            />
          </a>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="mb-6">
            <input
              type="text"
              placeholder={Lang.first_name}
              {...register("firstName")}
              value={watch("firstName")}
              onChange={(e) => setValue("firstName", e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-full text-sm text-white border border-gray-600 outline-none focus:border-[#D90479]"
            />
            {errors.firstName && (
              <p className="text-red-500 px-2 py-0.5 text-sm">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder={Lang.last_name}
              {...register("lastName")}
              value={watch("lastName")}
              onChange={(e) => setValue("lastName", e.target.value)}
              className="w-full p-3 bg-gray-700 text-white text-sm rounded-full outline-none border border-gray-600 focus:border-[#D90479]"
            />
            {errors.lastName && (
              <p className="text-red-500 px-2 py-0.5 text-sm">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder={Lang.email}
              {...register("email")}
              value={watch("email")}
              onChange={(e) => setValue("email", e.target.value)}
              className="w-full p-3 bg-gray-700 text-white text-sm rounded-full outline-none border border-gray-600 focus:border-[#D90479]"
            />
            {errors.email && (
              <p className="text-red-500 px-2 py-0.5 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder={Lang.password}
              {...register("password")}
              value={watch("password")}
              onChange={(e) => setValue("password", e.target.value)}
              className="w-full p-3 bg-gray-700 text-white text-sm rounded-full outline-none border border-gray-600 focus:border-[#D90479]"
            />
            {errors.password && (
              <p className="text-red-500 px-2 py-0.5 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={countries}
                  placeholder="Select Country"
                  className="text-black"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: "999px",
                      padding: "2px",
                    }),
                  }}
                />
              )}
            />
            {errors.country && (
              <p className="text-red-500 px-2 py-0.5 text-sm">
                {errors.country.message as string}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 text-sm bg-pink-600 hover:scale-[1.05] text-white font-semibold rounded-full cursor-pointer mb-6 flex items-center justify-center"
          >
            {isSubmitting ? (
              <FaSpinner className="animate-spin text-xl" />
            ) : (
              Lang.sign_up_image
            )}
          </button>
        </form>

        <div className="flex justify-center gap-4 mb-6">
          <a href={`${BASE_API}/auth/facebook`} title="Login with Facebook">
            <FaFacebook className="text-gray-300 text-xl cursor-pointer hover:scale-110 transition" />
          </a>
          <a href={`${BASE_API}/auth/google`} title="Login with Google">
            <FaGoogle className="text-gray-300 text-xl cursor-pointer hover:scale-110 transition" />
          </a>
        </div>

        <div className="text-center mt-4">
          <p className="text-gray-400 text-sm">
            {Lang.already_account + " "}
            <a href="/login" className="text-pink-500 hover:underline">
              {Lang.login}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
