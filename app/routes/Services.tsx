import CTA from "~/blocks/services/CTA";
import CoreServices from "~/blocks/services/CoreServices";
import Process from "~/blocks/services/Process";
import WCU from "~/blocks/services/WCU";
import Lang from "../lang/lang";
import type { Route } from "./+types/Home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: Lang.title + " | " + Lang.service },
    { name: "description", content: Lang.welcome_fx + " - " + Lang.service },
  ];
}

export default function Services() {
  return (
    <div className="min-h-screen text-white px-10 py-20 box sm:px-6 lg:px-8">
      <CoreServices />
      <Process />
      <WCU />
      <CTA />
    </div>
  );
}
