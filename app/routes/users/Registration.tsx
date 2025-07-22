import { useState } from "react";
import {
  FaFacebook,
  FaGithub,
  FaGoogle,
  FaSpinner,
  FaSteam,
} from "react-icons/fa";
import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";

export default function Register() {
  const { validateEmail, BASE_API } = new Helper();

  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!firstName || !lastName || !email || !password) {
      setError(Lang.invalid_fields);
      return;
    }
    if (!validateEmail(email)) {
      setError(Lang.invalid_email);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_API}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name:firstName, last_name:lastName, email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");
      sessionStorage.setItem("success_message", Lang.register_success);
      window.location.href = "/login";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl p-10 w-full max-w-4xl">
        <div className="text-center mb-6">
          <a href="/"><img
            src="/images/logos/logo.svg"
            alt="Logo"
            className="mx-auto h-9 w-auto"
          /></a>
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
        </div>


        <form className="pt-5">
          {/* First Name & Last Name Side by Side */}
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder={Lang.first_name}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white text-sm rounded-full outline-none border border-gray-600 focus:border-[#D90479]"
              required
            />
            <input
              type="text"
              placeholder={Lang.last_name}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white text-sm rounded-full outline-none border border-gray-600 focus:border-[#D90479]"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              placeholder={Lang.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white text-sm rounded-full outline-none border border-gray-600 focus:border-[#D90479]"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <input
              type="password"
              placeholder={Lang.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white text-sm rounded-full outline-none border border-gray-600 focus:border-[#D90479]"
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-3 text-sm bg-[#D90479] hover:scale-[1.05] text-white font-semibold rounded-full cursor-pointer mb-6 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className="animate-spin text-xl" />
            ) : (
              Lang.sign_up_image
            )}
          </button>
        </form>

        {/* Social Login Icons */}
        <div className="flex justify-center gap-4 mb-6">
          <a href={`${BASE_API}/auth/facebook`} title="Login with Facebook">
            <FaFacebook className="text-gray-300 text-xl cursor-pointer hover:scale-110 transition" />
          </a>
          <a href={`${BASE_API}/auth/steam`} title="Login with Steam">
            <FaSteam className="text-gray-300 text-xl cursor-pointer hover:scale-110 transition" />
          </a>
          <a href={`${BASE_API}/auth/google`} title="Login with Google">
            <FaGoogle className="text-gray-300 text-xl cursor-pointer hover:scale-110 transition" />
          </a>
          <a href={`${BASE_API}/auth/github`} title="Login with GitHub">
            <FaGithub className="text-gray-300 text-xl cursor-pointer hover:scale-110 transition" />
          </a>
        </div>

        {/* Already have account */}
        <div className="text-center mt-4">
          <p className="text-gray-400 text-sm">
            {Lang.already_account + " "}
            <a href="/login" className="text-[#D90479] hover:underline">
              {Lang.login}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
