import AdditionalInformation from "~/blocks/games/game-component/AdditionalInformation";
import OtherSection from "~/blocks/games/game-component/OtherSection";
import { Helper } from "~/utils/helper";
import Lang from "../../lang/lang";
import type { Route } from "../../routes/+types/Home";
import GameSlider from "./game-component/GameSlider";
import GameSummaryDetails from "./game-component/GameSummaryDetails";

export function meta({}: Route.MetaArgs) {
  return [
    { title: Lang.title + " | " + Lang.game },
    { name: "description", content: Lang.welcome_fx + " - " + Lang.game },
  ];
}

export default function Game() {
  const { gameDetails } = new Helper();
  return (
    <div className="flex flex-col-reverse box lg:flex-row lg:px-8 gap-4 py-2">
      {/* Main content column (68%) */}
      <div className="w-full lg:w-[68%] space-y-4">
        <div className="box">
          <GameSlider />
        </div>
        <div className="box">
          <AdditionalInformation gameDetails={gameDetails} />
        </div>
        <div className="box">
          <OtherSection />
        </div>
      </div>

      {/* Sticky sidebar column (32%) */}
      <div className="w-full lg:w-[32%]">
        <div className="sticky lg:top-2">
          <div className="box">
            <GameSummaryDetails gameDetails={gameDetails} />
          </div>
        </div>
      </div>
    </div>
  );
}
