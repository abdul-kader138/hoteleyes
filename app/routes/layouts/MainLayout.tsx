import { Outlet, Scripts, ScrollRestoration } from "react-router";
import Footer from "~/blocks/Footer";
import { Header } from "~/blocks/Header";

export default function MainLayout() {
  return (
    <div
  className="
    relative        
    bg-cover bg-center
    text-white
    min-h-screen           
  "
  style={{
    backgroundImage: "url('/images/bg/bg-pattern.png')",
  }}
>
  {/* ▸ GRADIENT OVERLAY */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#041d55]/5 via-[#031F50]/15 to-[#002459]/10" />

  {/* ▸ GLASS / BLUR OVERLAY */}
  <div className="absolute inset-0 backdrop-blur-sm bg-white/5" />

  {/* ▸ ACTUAL PAGE CONTENT (stacked on top) */}
  <div className="relative z-10 flex min-h-screen flex-col">
    <Header />

    <main className="flex-1">
      <Outlet />
    </main>

    <Footer />
  </div>

  <ScrollRestoration />
  <Scripts />
</div>

  );
}
