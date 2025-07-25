import { Outlet, Scripts, ScrollRestoration } from "react-router";

export default function AuthLayout() {
  return (
    <div  style={{
    backgroundImage: "url('/images/bg/bg-pattern.png')",
  }} className="text-white min-h-screen flex  bg-cover bg-center items-center justify-center">
      <Outlet />
      <ScrollRestoration />
      <Scripts />
    </div>
  );
}
