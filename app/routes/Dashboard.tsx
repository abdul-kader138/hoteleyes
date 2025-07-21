import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { authLoader } from "../hooks/useAuthUser";
import Lang from "../lang/lang";
import type { Route } from "./+types/Home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: Lang.title + " - " + Lang.dashboard },
    { name: "description", content: Lang.welcome_fx + " - " + Lang.dashboard },
  ];
}

export default function Dashboard() {
  useEffect(() => {
    authLoader();
    const message = sessionStorage.getItem("success_message");
    if (message) {
      toast.success(sessionStorage.getItem("success_message"), {
        duration: 2000,
      });
      sessionStorage.removeItem("success_message");
    }
  }, []);

  return (
    <span className="flex items-center  justify-center py-3 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      welcome to user dashboard
    </span>
  );
}
