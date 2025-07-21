import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
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

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { validateEmail, BASE_API } = new Helper();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError(Lang.invalid_fields);
      return;
    }
    if (!validateEmail(email)) {
      setError(Lang.invalid_email);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_API}/auth/forgot-password`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      toast.success(Lang.reset_link);
      setEmail("");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="flex items-center justify-center p-4">
  <div className="bg-gray-800 rounded-lg shadow-xl p-10 w-full max-w-4xl">
    <Toaster position="top-right" />

    <div className="text-center mb-6">
      <a href="/"><img
            src="/images/logos/logo.svg"
            alt="Logo"
            className="mx-auto h-9 w-auto"
          /></a>
     
      <h5 className="text-lg  font-bold grid grid-cols-3 text-center items-center justify-center text-white mt-6">
        {Lang.forgot_password}
      </h5>
    </div>

    {error && (
      <p className="text-red-500 text-sm text-center mb-3">{error}</p>
    )}

    <form onSubmit={handleForgotPassword}>
      <div className="mb-4">
        <input
          type="email"
          placeholder={Lang.enter_email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 bg-gray-700 rounded-full text-sm text-white border border-gray-600 focus:border-[#D90479] outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 text-sm bg-[#D90479] hover:scale-[1.05] text-white font-semibold rounded-full cursor-pointer mb-6 flex items-center justify-center"
      >
        {loading ? (
          <FaSpinner className="animate-spin text-xl" />
        ) : (
          Lang.continue
        )}
      </button>
    </form>

    <div className="text-center">
      <a href="/login" className="text-[#D90479] hover:underline text-sm">
        {Lang.cancle}
      </a>
    </div>
  </div>
</div>

  );
}
