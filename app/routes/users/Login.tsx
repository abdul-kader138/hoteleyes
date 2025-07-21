import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  FaFacebook,
  FaGithub,
  FaGoogle,
  FaSpinner,
  FaSteam,
} from "react-icons/fa";
import type { Route } from "../+types/Home";
import Lang from "../../lang/lang";
import { Helper } from "../../utils/helper";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${Lang.title} - ${Lang.login}` },
    { name: "description", content: `${Lang.welcome_fx} - ${Lang.login}` },
  ];
}

export default function Login() {
  const { validateEmail, BASE_API } = new Helper();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const message = sessionStorage.getItem("success_message");
    if (message) {
      toast.success(message, { duration: 2000 });
      sessionStorage.removeItem("success_message");
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(Lang.invalid_fields);
      return;
    }
    if (!validateEmail(email)) {
      setError(Lang.invalid_email);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${BASE_API}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || Lang.invalid_email_password);
      sessionStorage.setItem("success_message", Lang.login_success);
      window.location.href = "/dashboard";
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-gray-800 rounded-lg shadow-xl p-8  w-full max-w-3xl">
        <div className="text-center mb-15">
          <a href="/"><img
            src="/images/logos/logo.svg"
            alt="Logo"
            className="mx-auto h-9 w-auto"
          /></a>
          
        </div>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder={Lang.email_address}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 p-3 bg-gray-700 rounded-full text-sm focus:border-[#D90479] text-white border border-gray-600 outline-none"
          />

          <input
            type="password"
            placeholder={Lang.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-3 p-3 bg-gray-700 rounded-full text-sm focus:border-[#D90479] text-white border border-gray-600 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-sm bg-[#D90479] hover:scale-[1.05] text-white font-semibold rounded-full cursor-pointer mb-3 flex items-center justify-center"
          >
            {loading ? (
              <FaSpinner className="animate-spin text-xl" />
            ) : (
              "🔒 " + Lang.login
            )}
          </button>

          <div className="text-center mb-4">
            <a
              href="/forgot-password"
              className="text-[#D90479] hover:underline text-sm"
            >
              {Lang.forgot_password}?
            </a>
          </div>

          <div className="flex justify-center gap-2 mb-4">
            <a href={`${BASE_API}/auth/facebook`} title="Login with GitHub">
              <FaFacebook
                title="Google"
                className="text-gray-300 text-xl m-1 cursor-pointer hover:scale-110 transition"
              />
            </a>
            <a href={`${BASE_API}/auth/steam`} title="Login with GitHub">
              <FaSteam
                title="Steam"
                className="text-gray-300 text-xl m-1 cursor-pointer hover:scale-110 transition"
              />
            </a>
            <a href={`${BASE_API}/auth/google`} title="Login with GitHub">
              <FaGoogle
                title="Google"
                className="text-gray-300 text-xl m-1 cursor-pointer hover:scale-110 transition"
              />
            </a>
            <a href={`${BASE_API}/auth/github`} title="Login with GitHub">
              <FaGithub className="text-gray-300 text-xl m-1 cursor-pointer hover:scale-110 transition" />
            </a>
          </div>

          <div className="text-center text-sm text-gray-400">
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
