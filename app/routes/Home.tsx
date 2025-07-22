import CTA from "~/blocks/home/CTA";
import FeatureGames from "~/blocks/home/FeatureGames";
import HeroSection from "~/blocks/home/HeroSection";
import News from "~/blocks/home/News";
import { Helper } from "~/utils/helper";
import Lang from "../lang/lang";
import type { Route } from "./+types/Home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: Lang.title + " | " + Lang.home },
    { name: "description", content: Lang.welcome_fx + " - " + Lang.home },
  ];
}

export default function Home() {
  const { gameSections } = new Helper();
  return (
    <div>
      <HeroSection />
      <FeatureGames />
      <News />
      <CTA />
    </div>
  );
}
