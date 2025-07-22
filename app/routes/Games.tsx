import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import ImageViewer from "~/blocks/common/ImageViewer";
import GameFilter from "~/blocks/games/GameFilter";
import GameGrid from "~/blocks/games/GameGrid";
import { Helper } from "~/utils/helper";
import Lang from "../lang/lang";
import type { Route } from "./+types/Home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: Lang.title + " - " + Lang.games },
    { name: "description", content: Lang.welcome_fx + " - " + Lang.games },
  ];
}

export default function Games() {
  const [visibleCount, setVisibleCount] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const [featureFilter, setFeatureFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  const parentRef = useRef<any>(null);
  useEffect(() => {
    parentRef.current && autoAnimate(parentRef.current);
  }, [parentRef]);

  // Replace this if using API/helper
  const { mockGameList, gamesFilterData } = new Helper();

  const filteredGames = mockGameList
    .filter((game: any) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((game: any) =>
      featureFilter ? game.feature === featureFilter : true
    )
    .filter((game: any) => (typeFilter ? game.type === typeFilter : true))
    .filter((game: any) =>
      categoryFilter ? game.category === categoryFilter : true
    )
    .sort((a: any, b: any) => {
      if (sortOption === "name-asc") return a.name.localeCompare(b.name);
      if (sortOption === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });

  const visibleGames = filteredGames.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <>
      <ImageViewer src="/images/games/banner.png" />

      <div className="min-h-screen px-10 box text-white py-10">
        <Toaster position="top-right" />

        <GameFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          featureFilter={featureFilter}
          setFeatureFilter={setFeatureFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          setSortOption={setSortOption}
          sortOption={sortOption}
        />

        <GameGrid
          games={filteredGames}
          visibleCount={visibleCount}
          loadMore={loadMore}
          parentRef={parentRef}
        />
      </div>
    </>
  );
}
