import { useState } from "react";
import OtherByCommodore from "~/blocks/product/OtherSection";
import ProductAddOn from "~/blocks/product/ProductAddOn";
import ProductCartDetails from "~/blocks/product/ProductCartDetails.tsx";
import ProductSlider from "~/blocks/product/ProductSlider";
import SystemRequirements from "~/blocks/product/SystemRequirements";
import { Helper } from "~/utils/helper";
import Lang from "../../lang/lang";
import type { Route } from "../../routes/+types/Home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: Lang.title + " | " + Lang.product },
    { name: "description", content: Lang.welcome_fx + " - " + Lang.product },
  ];
}

export default function Game() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { gameSections } = new Helper();
  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row gap-2 px-4 lg:px-22">
        {/* ProductSlider – second on mobile, first on desktop */}
        <div className="w-full lg:w-[68%]">
          <ProductSlider />
        </div>

        {/* ProductCartDetails – first on mobile, second on desktop */}
        <div className="w-full lg:w-[32%]">
          <ProductCartDetails />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-2 px-4 lg:px-22">
        {/* ProductSlider – second on mobile, first on desktop */}
        <div className="w-full lg:w-[68%]">
          <ProductAddOn />
          <SystemRequirements />
          <OtherByCommodore />
        </div>
      </div>
    </>
  );
}
