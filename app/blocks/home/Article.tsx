import { useEffect, useState } from "react";
import { FaArrowLeft, FaSpinner } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { Helper } from "~/utils/helper";
import Lang from "../../lang/lang";
import type { Route } from "./+types/Article";

export function meta({}: Route.MetaArgs) {
  return [
    { title: Lang.title + " - " + Lang.blog },
    {
      name: "description",
      content: Lang.welcome_fx + " - " + Lang.blog,
    },
  ];
}

export default function Article() {
  const { articleId } = useParams<{ articleId: string }>(); // Get article ID from URL
  const navigate = useNavigate();
  const [article, setArticle]: any = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { BASE_API, getYouTubeID, getVimeoID } = new Helper();

  useEffect(() => {
    if (!articleId) return;

    fetch(`${BASE_API}/articles/${articleId}`)
      .then((res: any) => {
        const data = res.json();
        if (!res.ok) throw new Error(data.message || Lang.blog_not_found);
        return data;
      })
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(Lang.error_fetching_article, err);
        setError(true);
        setLoading(false);
      });
  }, [articleId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-gray-300 text-4xl" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <h2 className="text-xl font-bold text-red-500">{Lang.no_data_found}</h2>
        <button
          className="mt-4 bg-gray-700 text-[#D90479] cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-600"
          onClick={() => navigate("/school")}
        >
          ← {Lang.back_to_home}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-4xl mx-auto p-6">
        {/* Back Button */}
        <button
          className="text-[#D90479] hover:underline flex cursor-pointer items-center"
          onClick={() => navigate("/school")} // Correct path
        >
          <FaArrowLeft className="mr-2" /> {Lang.go_back_home}
        </button>

        {/* Article Image */}
        <img
          src={article?.photo?.original || "/images/default-article.png"} // Fallback image
          alt={article?.title}
          className="w-full h-80 object-cover mt-4 rounded-lg"
        />

        {/* Article Title */}
        <h1 className="text-xl font-bold mt-4">{article.title}</h1>

        {/* Published Date */}
        <p className="text-gray-400 text-sm mt-2">
          {Lang.published}: {new Date(article.created_at).toDateString()}
        </p>

        {/* Article Description - Highlighted in Box */}
        <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-lg border-l-4 border-red-500">
          <h3 className="text-md font-semibold underline text-red-400">
            {Lang.summary}
          </h3>
          <p className="mt-2 text-gray-300 text-sm leading-relaxed italic">
            "{article.description}"
          </p>
        </div>

        {/* Article Content - Well-Formatted */}
        <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h4 className="text-md font-bold underline text-white mb-4">
            {Lang.details}
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed tracking-wide">
            {article.content.split("\n").map((paragraph: any, index: any) => (
              <span key={index} className="block mb-4">
                {paragraph}
              </span>
            ))}
          </p>
        </div>

        {/* 🎥 Video Section - Only Show if Video Exists */}
        {article.video_url && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">{Lang.watch_video}</h3>
            <div className="relative w-full h-64 md:h-96">
              {/* Detect YouTube or Vimeo */}
              {article.video_url.includes("youtube.com") ||
              article.video_url.includes("youtu.be") ? (
                <iframe
                  className="w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${getYouTubeID(
                    article.video_url
                  )}`}
                  title="YouTube Video"
                  allowFullScreen
                ></iframe>
              ) : article.video_url.includes("vimeo.com") ? (
                <iframe
                  className="w-full h-full rounded-lg"
                  src={`https://player.vimeo.com/video/${getVimeoID(
                    article.video_url
                  )}`}
                  title="Vimeo Video"
                  allowFullScreen
                ></iframe>
              ) : (
                <p className="text-gray-500">{Lang.invalid_video}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
