import { useEffect, useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import type { Route } from "../+types/Home";
import { authLoader } from "../../hooks/useAuthUser";
import Lang from "../../lang/lang";
import { useUser } from "../../provider/userContext";
import { Helper } from "../../utils//helper";

export function meta({}: Route.MetaArgs) {
  return [
    { title: Lang.title + " - " + Lang.edit_profile },
    {
      name: "description",
      content: Lang.welcome_fx + " - " + Lang.edit_profile,
    },
  ];
}

export default function EditProfile() {
  const { user, setUser } = useUser(); // Accessing user data from context
  const [loading, setLoading] = useState(false); // State to handle form submission loading
  const [isLoadingImage, setIsLoadingImage] = useState(false); // State to handle image upload loading
  const [error, setError] = useState(""); // State for form validation errors
  const { BASE_API, validateTextLength, validateEmail, handleClickRedirect } =
    new Helper(); // Helper instance for API calls and validations

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [profileImage, setProfileImage] = useState("/images/male.png");

  // Reference for file input (for image upload)
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * useEffect to populate the form fields when the user data is available.
   */
  useEffect(() => {
    authLoader();
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setEmail(user.email || "");
      setAboutMe(user.about_me || "");
      setProfileImage("/images/male.png");

      // If user has a photo, set the profile image URL
      if (user?.photo_id) {
        setProfileImage(
          `${BASE_API}/photos/${user?.photo_id}/small` || "/images/male.png"
        );
      }
    }
  }, [user]);

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
      .then((res: any) => {
        const result = res.json();
        if (!res.ok) throw new Error(result.message || Lang.article_not_found);
        return result;
      })
      .then((data) => {
        setProfileImage(`${BASE_API}/photos/${data?.photo_id}`);
        setUser((prevUser) =>
          prevUser ? { ...prevUser, photo_id: data?.photo_id } : null
        );

        // Update the user's profile with the new photo ID
        fetch(`${BASE_API}/auth/update-photo`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user?.id,
            photo_id: data?.photo_id,
          }),
        })
          .then(() => {
            toast.success(Lang.image_upload_success, { duration: 2000 });
          })
          .catch((error) => {
            toast.error(error.message, { duration: 2000 });
          });
      })
      .catch((error) => {
        toast.error(error.message, { duration: 2000 });
      })
      .finally(() => {
        setIsLoadingImage(false);
      });
  };

  /**
   * Form validation before submission.
   */
  const validateForm = () => {
    if (!firstName || !lastName || !email) {
      setError(Lang.invalid_fields);
      return false;
    }
    if (firstName.trim() === "" || lastName.trim() === "") {
      setError(Lang.first_last_name_validation);
      return false;
    }
    if (!validateTextLength(firstName, 2) || !validateTextLength(lastName, 2)) {
      setError(Lang.first_last_name_size_validation);
      return false;
    }
    if (!validateEmail(email)) {
      setError(Lang.invalid_email);
      return false;
    }
    if (!validateTextLength(aboutMe, 300, ">")) {
      setError(Lang.about_me_validation);
      return false;
    }
    setError("");
    return true;
  };

  /**
   * Handles form submission to update user details.
   */
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await fetch(`${BASE_API}/auth/edit`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          about_me: aboutMe,
        }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || Lang.profile_update_failed);
      setUser(data.user);
      toast.success(Lang.profile_update_success, { duration: 2000 });
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-gray-300 text-4xl" />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br  min-h-screen text-white">
      {/* Profile Header */}
      <div
        className="relative w-full text-left p-6 md:p-6 z-10"
      >
        <div className="max-w-4xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
          {/* Left - User Info */}
          <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 text-center md:text-left">
            <div className="flex items-center space-x-4">
              <img
                src={profileImage}
                alt="User Avatar"
                className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-[#D90479]  object-cover shadow-2xl"
              />
              <button
                onClick={handleFileSelect}
                className="bg-[#D90479]  cursor-pointer text-white text-xs px-3 py-2 rounded-md shadow-md hover:bg-gray-600"
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
                name="image"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-1 gap-4 max-w-5xl mx-auto">
        {/* Profile Edit Form */}
        <div className="md:col-span-2">
          <h3 className="text-white text-lg font-bold">
            {Lang.profile}
            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}
            <Toaster position="top-right" reverseOrder={false} />
          </h3>
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white text-sm">
                  {Lang.first_name}
                </label>
                <input
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-[#D90479] focus:outline-none"
                  defaultValue={user.first_name}
                />
              </div>
              <div>
                <label className="text-white text-sm">
                  {Lang.last_name}
                </label>
                <input
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-[#D90479] focus:outline-none"
                  defaultValue={user.last_name}
                />
              </div>
            </div>
            <div>
              <div>
                <label className="text-white text-sm">{Lang.email}</label>
                <input
                  type="email"
                  className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-[#D90479] focus:outline-none"
                  defaultValue={user.email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
              </div>
            </div>
            <div>
              <label className="text-white text-sm">{Lang.about_me}</label>
              <textarea
                onChange={(e) => setAboutMe(e.target.value)}
                className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-[#D90479] focus:outline-none h-24"
                placeholder={Lang.about_yourself}
              >
                {user.about_me}
              </textarea>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex space-x-3">
            <button
              onClick={handleSubmit}
              className="bg-[#D90479]  px-4 cursor-pointer py-2 text-sm rounded-md shadow-md hover:scale-1.05 transition transform hover:scale-110"
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
    </div>
  );
}
