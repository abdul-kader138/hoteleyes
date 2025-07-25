import { Link } from "react-router";
import Lang from "~/lang/lang";

type Props = {
  sections: any[];
};

export default function Section({ sections }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 w-full h-full">
      {sections.map((article: any) => (
        <div
          key={article.id}
          className="rounded-xl bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E] overflow-hidden shadow-md hover:scale-[1.05] transition"
        >
          <img
            src={article?.photo?.original || "/images/default-article.png"}
            alt={article.title}
            className="h-60 w-full object-cover"
          />
          <div className="p-4 space-y-2">
            <h3 className="text-white text-lg font-semibold truncate">
              {article.title}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-3">
              {article.description}
            </p>
            <Link
              to={`/blogs/${article.id}`}
              className="inline-block text-sm text-[#D90479] font-medium hover:underline"
            >
              {Lang.read_more_symbol}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
