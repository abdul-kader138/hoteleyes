import { useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import type { Route } from "../+types/Home";
import Lang from "../../lang/lang";
import { useUser } from "../../provider/userContext";
import { Helper } from "../../utils/helper";

export function meta({}: Route.MetaArgs) {
  return [
    { title: Lang.title + " - " + Lang.add_article },
    {
      name: "description",
      content: Lang.welcome_fx + " - " + Lang.add_article,
    },
  ];
}

export default function AddArticle() {
  const { user } = useUser(); // Accessing user data from context
  const [loading, setLoading] = useState(false); // State to handle form submission loading
  const [isLoadingImage, setIsLoadingImage] = useState(false); // State to handle image upload loading
  const [error, setError] = useState(""); // State for form validation errors
  const [videoUrl, setVideoUrl] = useState(""); // New video URL field
  const { BASE_API, getValidURL } = new Helper(); // API helper

  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [photoId, setPhotoId] = useState(0);
  const [articleImage, setArticleImage] = useState(
    "/images/default-article.png"
  );

  // Reference for file input (for image upload)
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Function to trigger file input selection when clicking the browse button.
   */
  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  /**
   * Handles image upload when a new image is selected.
   */
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    setIsLoadingImage(true);
    fetch(`${BASE_API}/photos/upload`, {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((response: any) => {
        const result = response.json();
        if (!response.ok)
          throw new Error(result.message || Lang.image_upload_failed);
        return result;
      })
      .then((data) => {
        setArticleImage(`${BASE_API}/photos/${data?.photo_id}`);
        setPhotoId(data?.photo_id);
        toast.success(Lang.image_upload_success, { duration: 2000 });
      })
      .catch((error) => {
        toast.error(error.message, { duration: 2000 });
      })
      .finally(() => {
        setIsLoadingImage(false);
      });
  };

  const initState = () => {
    setTitle("");
    setDescription("");
    setContent("");
    setTitle("");
    setArticleImage("/images/default-article.png");
    setVideoUrl("");
    setPhotoId(0);
  };

  /**
   * Form validation before submission.
   */
  const validateForm = () => {
    if (!title || !description || !content) {
      setError(Lang.invalid_fields);
      return false;
    }
    if (title.trim().length < 5) {
      setError(Lang.title_validation);
      return false;
    }
    if (description.trim().length < 10) {
      setError(Lang.description_validation);
      return false;
    }
    if (content.trim().length < 50) {
      setError(Lang.content_validation);
      return false;
    }
    if (videoUrl && !getValidURL(videoUrl)) {
      setError(Lang.invalid_video_url);
      return false;
    }
    setError("");
    return true;
  };

  /**
   * Handles form submission to add an article.
   */
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await fetch(`${BASE_API}/articles/add`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          content,
          photo_id: photoId,
          video_url: videoUrl,
        }),
      });

      if (!response.ok) throw new Error(Lang.article_creation_failed);
      toast.success(Lang.article_created_success, { duration: 2000 });
      initState();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen text-white">
      {/* Article Form */}
      <div className="p-6 md:p-8 max-w-4xl mx-auto">
        <h3 className="text-red-500 text-md font-bold">
          {Lang.add_article}
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
          <Toaster position="top-right" reverseOrder={false} />
        </h3>

        <div className="mt-4 space-y-4">
          <div>
            <label className="text-gray-300 text-sm">{Lang.title}</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md border text-sm border-gray-600 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="Enter Article Title"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">{Lang.description}</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 mt-1 bg-gray-700 text-sm text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="Enter a short description"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">{Lang.content}</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md border text-sm border-gray-600 focus:ring-2 focus:ring-red-500 focus:outline-none h-40"
              placeholder="Write your article content..."
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col md:flex-row  items-center space-y-3 md:space-x-4">
            <div className="w-full md:w-3/4">
              <img
                src={articleImage}
                alt="Article Thumbnail"
                className="w-full h-64 object-cover rounded-lg border-4 border-gray-600 shadow-2xl"
              />
            </div>
            <button
              onClick={handleFileSelect}
              className="bg-gray-700 cursor-pointer text-white text-xs px-3 py-2 rounded-md shadow-md hover:bg-gray-600"
            >
              {isLoadingImage ? (
                <FaSpinner className="animate-spin mr-2 text-xl" />
              ) : (
                Lang.browse_image
              )}
            </button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">{Lang.video_url}</label>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full p-2 mt-1 bg-gray-700 text-white text-sm rounded-md border border-gray-600 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="Enter Video URL (YouTube/Vimeo)"
            />
          </div>
        </div>

        <div className="mt-6 flex">
          <button
            onClick={handleSubmit}
            className="bg-red-500 px-3 py-2 cursor-pointer text-sm rounded-md shadow-md hover:bg-red-600 transition transform hover:scale-110"
          >
            {loading ? (
              <FaSpinner className="animate-spin mr-2 text-xl" />
            ) : (
              Lang.save
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
