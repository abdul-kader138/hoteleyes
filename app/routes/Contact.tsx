import ImageViewer from "~/blocks/common/ImageViewer";
import ContactForm from "~/blocks/contact/ContactForm";
import Map from "~/blocks/contact/Map";
import Lang from "../lang/lang";
import type { Route } from "./+types/Home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: Lang.title + " - " + Lang.contact },
    { name: "description", content: Lang.welcome_fx + " - " + Lang.contact },
  ];
}

export default function Contact() {
  return (
    <>
      <ImageViewer src="/images/contact/banner.png" />
      <ContactForm />
      <Map />
    </>
  );
}
