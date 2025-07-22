import Award from "~/blocks/about/Award";
import Team from "~/blocks/about/Team";
import Vision from "~/blocks/about/Vision";
import WhoWeAre from "~/blocks/about/WhoWeAre";
import ImageViewer from "~/blocks/common/ImageViewer";
import Lang from "~/lang/lang";
import { Helper } from "../utils/helper";
import type { Route } from "./+types/Home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: Lang.title + " | " + Lang.about },
    { name: "description", content: Lang.welcome_fx + " - " + Lang.about },
  ];
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

export default function About() {
  const { team, fadeUp, container } = new Helper();

  return (
    <>
      <ImageViewer src="/images/about/banner.png" />
      <section className="text-white py-10 px-7 box relative overflow-hidden">
        <WhoWeAre />
        <Vision />
        <Award />
        <Team team={team} />
      </section>
    </>
  );
}
