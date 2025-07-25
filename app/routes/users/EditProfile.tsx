import { motion } from "framer-motion";
import {
  getCountryCallingCode,
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import { useEffect, useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaSpinner, FaUpload, FaUser } from "react-icons/fa";
import AsyncSelect from "react-select/async";
import type { Route } from "../+types/Home";
import { authLoader } from "../../hooks/useAuthUser";
import Lang from "../../lang/lang";
import { useUser } from "../../provider/userContext";
import { Helper } from "../../utils/helper";

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
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const { BASE_API, validateTextLength, validateEmail } = new Helper();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [profileImage, setProfileImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    authLoader();
    if (user) {
      console.log(user);

      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setEmail(user.email || "");
      setAboutMe(user.address || "");
      setGender(user.gender || "");
      setDob(user.date_of_birth?.split("T")[0] || "");
      setPhone(user.phone_number || "");
      setHotelName(user.hotel_name || "");
      setSelectedCountry({
        iso_code: user?.country?.iso_code,
        value: user?.country?.id,
        label: user?.country?.name,
        phone_code: user?.country?.phone_code,
      });

      // Set profile image
      if (user?.photo_id) {
        setProfileImage(`${BASE_API}/photos/${user?.photo_id}/small`);
      } else {
        setProfileImage("/images/male.png");
      }
    }
  }, [user]);

  useEffect(() => {
    if (user?.country) {
      fetch(`${BASE_API}/contact/countries/search?q=${user.country}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          const matched = data.find((c: any) => c.name === user.country);
          if (matched) {
            setSelectedCountry({
              iso_code: matched.iso_code,
              value: matched.id,
              label: matched.name,
              phone_code: matched.phone_code,
            });
          }
        })
        .catch(console.error);
    }
  }, [user]);

  // Validate phone number
  useEffect(() => {
    if (phone && selectedCountry?.value) {
      try {
        const phoneNumber = parsePhoneNumberFromString(
          phone,
          selectedCountry.iso_code
        );

        if (!phoneNumber || !phoneNumber.isValid()) {
          setPhoneError(Lang.invalid_phone_number);
        } else {
          setPhoneError("");
        }
      } catch (error) {
        setPhoneError(Lang.invalid_phone_number);
      }
    } else if (phone) {
      setPhoneError(Lang.select_country_first);
    } else {
      setPhoneError("");
    }
  }, [phone, selectedCountry]);

  // Reset phone when country changes
  useEffect(() => {
    if (selectedCountry?.iso_code && phone) {
      const callingCode = `+${getCountryCallingCode(selectedCountry.iso_code)}`;
      if (!phone.startsWith(callingCode)) {
        setPhone("");
      }
    }
  }, [selectedCountry]);

  const loadCountryOptions = async (inputValue: string) => {
    if (!inputValue || inputValue.length < 1) return [];
    try {
      const res = await fetch(
        `${BASE_API}/contact/countries/search?q=${encodeURIComponent(
          inputValue
        )}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      return data.map((country: any) => ({
        value: country.id,
        iso_code: country.iso_code,
        label: country.name,
        phone_code: country.phone_code,
      }));
    } catch (error) {
      console.error("Country search failed:", error);
      return [];
    }
  };

  const handleFileSelect = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    setIsLoadingImage(true);
    try {
      const res = await fetch(`${BASE_API}/photos/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.messaged);
      }

      const data = await res.json();
      setProfileImage(`${BASE_API}/photos/${data?.photo_id}`);
      setUser((prevUser) =>
        prevUser ? { ...prevUser, photo_id: data?.photo_id } : null
      );

      // Update photo ID in user profile
      const updateRes = await fetch(`${BASE_API}/auth/update-photo`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user?.id, photo_id: data?.photo_id }),
      });

      if (!updateRes.ok) throw new Error(Lang.profile_update_failed);

      toast.success(Lang.image_upload_success, { duration: 2000 });
    } catch (error: any) {
      toast.error(error.message || Lang.image_upload_failed, {
        duration: 2000,
      });
    } finally {
      setIsLoadingImage(false);
    }
  };

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

    // Phone validation
    if (phone) {
      if (!selectedCountry?.value) {
        setError(Lang.country_required);
        return false;
      }

      if (phoneError) {
        setError(Lang.invalid_phone_number);
        return false;
      }

      if (!isValidPhoneNumber(phone, selectedCountry.iso_code)) {
        setError(Lang.invalid_phone_number);
        return false;
      }
    }

    setError("");
    return true;
  };

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
          email,
          address: aboutMe,
          gender,
          date_of_birth: new Date(dob),
          phone_number: phone,
          country_id: selectedCountry?.value,
          hotel_name: hotelName,
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

  const formatPhoneNumber = (value: string) => {
    if (!selectedCountry?.value) return value;

    try {
      const phoneNumber = parsePhoneNumberFromString(
        value,
        selectedCountry.iso_code
      );
      return phoneNumber?.formatInternational() || value;
    } catch (error) {
      return value;
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-950">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FaSpinner className="text-4xl text-pink-500" />
        </motion.div>
      </div>
    );
  }

  // Custom styles for react-select
  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "rgba(31, 41, 55, 0.5)",
      borderColor: "#4b5563",
      minHeight: "44px",
      color: "white",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#ec4899",
      },
    }),
    input: (provided: any) => ({
      ...provided,
      color: "white",
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "#1f2937",
      border: "1px solid #4b5563",
      borderRadius: "8px",
      overflow: "hidden",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "rgba(236, 72, 153, 0.2)"
        : "transparent",
      color: state.isFocused ? "white" : "#d1d5db",
      padding: "12px 16px",
      "&:active": {
        backgroundColor: "rgba(236, 72, 153, 0.3)",
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "white",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#9ca3af",
    }),
  };

  return (
    <div className="min-h-screen box py-10 px-4">
      <Toaster position="top-right" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h1
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {Lang.edit_profile}
          </motion.h1>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-sky-500 to-pink-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
          {/* Profile Header */}
          <div className="relative p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Image */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                <motion.div whileHover={{ scale: 1.05 }} className="relative">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="User Avatar"
                      className="w-32 h-32 rounded-full object-cover border-4 border-gray-800"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-700 border-4 border-gray-800 flex items-center justify-center">
                      <FaUser className="text-4xl text-gray-400" />
                    </div>
                  )}
                </motion.div>

                <motion.button
                  onClick={handleFileSelect}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 rounded-full flex items-center gap-2"
                >
                  {isLoadingImage ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaUpload />
                  )}
                  <span className="text-xs">{Lang.update}</span>
                </motion.button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  name="image"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
              </div>

              {/* User Info */}
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-white">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="text-pink-400">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Edit Form */}
          <div className="p-8 bg-gray-900/50 backdrop-blur-sm">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              {error && (
                <motion.div
                  className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-gray-300 mb-2">
                    {Lang.first_name}
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder={Lang.first_name}
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-gray-300 mb-2">
                    {Lang.last_name}
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder={Lang.last_name}
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-gray-300 mb-2">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full p-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-gray-300 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full p-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                {/* Hotel Name */}
                <div>
                  <label className="block text-gray-300 mb-2">Hotel Name</label>
                  <input
                    type="text"
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                    className="w-full p-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Your hotel name"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-gray-300 mb-2">Country</label>
                  <AsyncSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={loadCountryOptions}
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                    placeholder="Search country..."
                    styles={customSelectStyles}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary: "#ec4899",
                        primary25: "rgba(236, 72, 153, 0.25)",
                        primary50: "rgba(236, 72, 153, 0.5)",
                        neutral0: "#1f2937",
                        neutral20: "#4b5563",
                        neutral30: "#ec4899",
                        neutral80: "white",
                      },
                    })}
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <div className="flex">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) =>
                        setPhone(formatPhoneNumber(e.target.value))
                      }
                      className="w-full p-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder={
                        selectedCountry
                          ? "Enter phone number"
                          : "Select country first"
                      }
                      disabled={!selectedCountry}
                    />
                  </div>
                  {phoneError && (
                    <p className="text-red-400 text-sm mt-1">{phoneError}</p>
                  )}
                </div>
              </div>

              {/* About Me */}
              <div>
                <label className="block text-gray-300 mb-2">
                  {Lang.about_me}
                </label>
                <textarea
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                  className="w-full p-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 min-h-[120px]"
                  placeholder={Lang.about_yourself}
                />
                <p className="text-right text-xs text-gray-500 mt-1">
                  {aboutMe.length}/300 {Lang.characters}
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full cursor-pointer md:w-auto bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-3 rounded-lg text-white font-medium shadow-lg hover:shadow-pink-500/20 disabled:opacity-70"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <FaSpinner className="animate-spin" />
                      {Lang.saving}
                    </span>
                  ) : (
                    Lang.save
                  )}
                </motion.button>
              </div>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
