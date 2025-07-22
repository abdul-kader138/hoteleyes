import { Outlet, Scripts, ScrollRestoration } from "react-router";

export default function AuthLayout() {
  return (
    <div  style={{
    backgroundImage: "url('/images/bg/bg-pattern.png')",
  }} className="text-white min-h-screen bg-cover bg-center">
      <Outlet />
      <ScrollRestoration />
      <Scripts />
    </div>
  );
}
