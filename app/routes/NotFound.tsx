import { useNavigate } from "react-router";
import Lang from "~/lang/lang";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 text-white px-6">
      <div className="max-w-md text-center">
        <h1 className="text-9xl font-extrabold tracking-widest">404</h1>
        <p className="text-2xl md:text-3xl mt-4 font-semibold">
          {Lang.page_not_found}
        </p>
        <p className="mt-2 text-gray-300">{Lang.page_not_found_details}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-8 inline-block bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-600 hover:text-white transition"
        >
          {Lang.go_back_home}
        </button>
      </div>
      <svg
        className="mt-12 w-80 h-80 opacity-50 mx-auto"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M256 48C141.125 48 48 141.125 48 256s93.125 208 208 208 208-93.125 208-208S370.875 48 256 48zm0 368c-88.225 0-160-71.775-160-160 0-88.225 71.775-160 160-160 88.225 0 160 71.775 160 160 0 88.225-71.775 160-160 160z"
        />
        <path
          fill="currentColor"
          d="M340.485 171.515l-128 128c-4.686 4.686-4.686 12.284 0 16.97 4.686 4.686 12.284 4.686 16.97 0l128-128c4.686-4.686 4.686-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0z"
        />
      </svg>
    </div>
  );
}
