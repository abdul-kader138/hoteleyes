var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, Outlet, ScrollRestoration, Scripts, isRouteErrorResponse, useNavigate, useLocation, Link, useSearchParams } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState, useEffect, createContext, useContext, useRef, useCallback } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast$1, { toast, Toaster } from "react-hot-toast";
import { FaSpinner, FaFacebook, FaGoogle, FaInstagram, FaLinkedin, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaBlogger, FaUser, FaUpload, FaLinkedinIn, FaYoutubeSquare, FaChevronLeft, FaPlay, FaChevronRight, FaArrowLeft, FaUserAlt, FaSearch, FaSave, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, MenuButton, MenuItems, MenuItem, Disclosure, DisclosureButton, DisclosurePanel, Listbox } from "@headlessui/react";
import { XMarkIcon, ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { IoIosMenu } from "react-icons/io";
import { AiFillFire } from "react-icons/ai";
import { IoDiamond } from "react-icons/io5";
import { parsePhoneNumberFromString, getCountryCallingCode, isValidPhoneNumber } from "libphonenumber-js";
import AsyncSelect from "react-select/async";
import autoAnimate from "@formkit/auto-animate";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { format } from "date-fns";
import DataTable from "react-data-table-component";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const Lang = {
  title: "HotelEyes",
  search: "Search  ",
  logo: "Logo",
  user: "User",
  //navbar
  games: "Games",
  about: "About",
  news: "News",
  contact: "Contact",
  open_main_menu: "Main Menu",
  contact_details: "WE ARE HERE TO HELP YOU",
  //home
  CTA_header: "Start Your Journey with Us Today!",
  CTA_content: "Join countless guests enjoying exceptional comfort, service, and hospitality across our world of welcoming stays.",
  blog_not_found: "Blog not found.",
  blog: "Blog",
  watch_video: "Watch Video:",
  published: "Published",
  summary: "Summary",
  invalid_video: "Invalid Video",
  feature_games: "Featured Games",
  see_less: "See Less",
  see_all: "See All",
  open: "OPEN",
  red_rum: "Reception",
  red_rum_year: "July 29, 2023",
  red_rum_details: "Welcoming smiles, seamless check-ins, and 24/7 support — our front desk is here to guide, assist, and make your stay effortless from start to finish.",
  eleven_years_ago: "Maintenance",
  eleven_years_ago_year: "March 18, 2024",
  eleven_years_ago_details: "From quick fixes to major repairs, we keep everything running smoothly — ensuring safety, comfort, and reliability for every guest, every moment.",
  steel_saviour: "House Keeping",
  steel_saviour_date: "November 3, 2024",
  steel_saviour_details: "We ensure every room is spotless, welcoming, and restful — delivering comfort through cleanliness, so every guest feels right at home.",
  // about
  profile_name: "Valli Fragoso",
  linkedin_profile: "https://www.linkedin.com/in/vallifragoso/",
  founded_by: "Founded by",
  who_we_are: "Who We Are",
  our_vision: "Our Vision",
  award_recognition: "Awards & Recognition",
  wwr_moto: "“Innovating Fun, Delivering Excellence.”",
  wwr_content: "Our methodology transforms decades of luxury operational insights into a scientific service framework. This systematic approach makes exceptional guest experiences inevitable—not accidental—through perfectly synchronized housekeeping, maintenance, and reception protocols.",
  vision_content: "We aim to be the global benchmark in hospitality services, setting new standards in operational precision, guest experience, and integrated facility management. Our future is about redefining service excellence — connecting travelers to seamless stays through anticipatory care that shapes the future of hospitality.",
  // games
  search_game: "Search game",
  load_more: "Load More",
  game_info: "Game Info",
  game_type: "Game Type",
  features: "Features",
  categories: "Categories",
  sort_by: "Sort by",
  see_more: "See more",
  game_developed: "Happy Customers",
  game_developed_count: "50+",
  support: "Support",
  support_count: "24/7",
  //services
  ouer_service: "Professional Housekeeping, Maintenance & Reception Services",
  core_service: "Core Services",
  wcu: "Why Choose Us",
  wcu_details: "The measurable advantages that make our hotel services industry-leading",
  development_process: "Our Working Process",
  development_process_details: " A streamlined workflow from initial concept to successful launch",
  core_service_details: "Tailored hotel services to elevate every guest experience",
  ouer_service_details: "Delivering seamless hotel experiences — from check-in to upkeep and every detail in between.",
  parter_with_us: "Partner with Us",
  create_something: "Ready to Create Something Amazing?",
  create_something_details: "Partner with us to transform your hotel operations through precision housekeeping, proactive maintenance, and guest-centric reception services.",
  // contact section
  working_hours: "Working Hours",
  follow_us: "Follow Us",
  mon_fri: "Mon - Fri",
  sat: "Sat",
  sun: "Sun",
  closed: "Closed",
  find_us: "Find Us",
  get_in_touch: "Get In Touch",
  name_validation: "Name is required",
  email_validation: "Invalid email",
  subject_validation: "Subject is required",
  message_validation: "Message must be at least 10 characters",
  contact_success_message: "Data sent successfully!",
  submission_failed: "Submission failed",
  name: "Name",
  subject: "Subject",
  sending: "Sending",
  message: "Message",
  send_message: " Send",
  // news
  quick_links: "Quick Links",
  news_event: "News & Events",
  news_event_content: " Stay updated with the latest industry insights, game announcements events, and behind-the-scenes stories.",
  //footer
  subscribe: "Subscribe",
  contact_us: "Contact Us",
  newsletter: "Newsletter",
  subscription_email_sent_message: "Confirmation email sent. Please check your inbox.",
  join_us: "Join our community!",
  submit: "SUBMIT",
  meet_the_team: "Meet the team",
  service: "Services",
  carrer: "Careers",
  terms: "Terms of Service",
  cookie: "Cookie Preferences",
  privacy: "Privacy Policy",
  office_address: "Wijde Begijnestraat 1-3, 3512 AW Utrecht, Netherlands",
  contact_email: "sales@hoteleyes.com",
  copyright: "COPYRIGHT© 2025 HotelEyes, All Rights Reserved",
  // product
  show_more: "Read More",
  show_less: "Show less",
  general_info: "GENERAL INFORMATION",
  release_date: "Release Date",
  developer: "Provider",
  publisher: "Publisher",
  game: "Game",
  language: "Language",
  game_mode: "Game Modes",
  buy_now: "Buy now",
  volatility: "Volatility",
  min_bet: "Min. Bet",
  max_bet: "Max. Bet",
  hit_rate: "Hit Rate",
  max_win: "Max Win",
  pay_lines: "Lines",
  platform: "Platform",
  support_multilingual: "Multilingual Supported",
  maxWin: "Lines",
  reel_rows: "Reel x Rows",
  play_demo: "Play Demo",
  rtp: "RTP",
  cart_footer: "This game is approved by: ",
  more_for_this_game: "More for this game",
  full_controller_support: "Full Controller Support",
  other_by_commodore: "Other By ORORO",
  additional_information: "Additional Information",
  minimum: "MINIMUM",
  recommanded: "RECOMMENDED",
  age_info: " *Suitable for all ages. Includes optional in-game purchases.",
  // page not found
  go_back_home: "Go Back Home",
  page_not_found: "Ooops! Page not found.",
  page_not_found_details: "The page you are looking for doesn&apos;t exist or has been moved.",
  profil: "Profile",
  school: "School",
  home: "Home",
  dashboard: "Dashboard",
  welcome_fx: "Welcome to Ororo Web",
  invalid_email_password: "Invalid email or password",
  welcome: "WELCOME",
  remember_me: "Remember me",
  sign_up_now: "Sign up Now",
  no_account: "Don't have an account?",
  introduce_starcade: "Introducing Ororo",
  learn_more: "Learn More",
  invalid_email: "Invalid email format.",
  invalid_password: "Password must be at least 6 characters.",
  invalid_fields: "All fields are required.",
  password_not_matched: "Password & Confirm Password not matched.",
  account_create_mesage: "Account created successfully!",
  registration_failed_mesage: "Registration failed. Please try again.",
  first_name: "First Name",
  welcome_to: "WELCOME TO",
  reset_link: "Check your email for a reset link.",
  last_name: "Last Name",
  reset_password: "Reset Password",
  registration: "Registration",
  profile: "Profile",
  forgot_password: "Forgot Password",
  logout: "Sign out",
  password: "Password",
  new_password: "Enter new password",
  confirm_password: "Confirm password",
  enter_email: "Enter your email",
  settings: "Settings",
  continue: "Continue",
  cancle: "Cancle",
  email_address: "E-mail address",
  email: "Email",
  status: "Status",
  create_now: "Create Now",
  help: "Help",
  enter: "Enter",
  sign_up_image: "✨ Sign Up",
  sign_up: "Sign Up",
  about_me: "address",
  about_us: "About us",
  saving: "Saving",
  useful_link: "USEFUL LINKS",
  already_account: "Already have an account?",
  login: "Login",
  edit: "Edit",
  save: "Save",
  error_fetching_article: "Error fetching article:",
  about_starcade: "About Ororo",
  delete: "Delete",
  read_more: "Read more",
  read_more_symbol: "Read more →",
  details: "Details",
  first_last_name_validation: "First name and last name are required.",
  image_upload_failed: "Image upload failed. Please try again.",
  profile_update_success: "Profile updated successfully!",
  login_success: "Account login successfully!",
  password_update_success: "Password updated successfully!",
  image_upload_success: "image upload successfully!",
  company_phone: "+880 654 321 233",
  company_email: "contact@bugfinder.net",
  address: "ADDRESS",
  about_yourself: "Write something about yourself...",
  edit_profile: "Edit Profile",
  back_to_home: "Back To Home",
  no_data_found: "No data found.",
  unknown_error: "Something went wrong.Please contact with adminstrator",
  first_last_name_size_validation: "Name fields must be at least 2 characters long.",
  mailing_address: "457 Morningview, New York USA",
  context_error: "useUser must be used within a UserProvider.",
  browse_image: "📷 Browse Image",
  country: "Country",
  phone: "Phone",
  dob: "Date Of Birth",
  invalid_phone_number: "Invalid phone number",
  select_country_first: "Select country first",
  country_required: "Country is required for phone validation",
  characters: "Characters",
  change_avatar: "Change Avatar",
  update: "Update",
  about_me_validation: "Addrees must be lessthan 300 characters",
  profile_update_failed: "Profile update failed.",
  // user list
  user_list_description: "Manage and view all system users",
  search_placeholder: "Search users...",
  total_user: "Total Users",
  active_today: "Active Today",
  gender: "Gender",
  hotel_name: "Hotel Name"
};
class Helper {
  constructor() {
    // API Base URL (from environment variables)
    __publicField(this, "BASE_API", `${"http://localhost:6001/api"}`);
    __publicField(this, "BASE_WEBSOCKET", `${"http://localhost:6001/api"}`);
    // Axios instance with credentials enabled
    __publicField(this, "api", axios.create({
      baseURL: this.BASE_API,
      withCredentials: true
    }));
    __publicField(this, "navigation", [
      {
        name: Lang.home,
        href: "/",
        current: false
      },
      { name: Lang.about, href: "/about", current: false },
      { name: Lang.service, href: "/services", current: false },
      {
        name: Lang.contact,
        href: "/contact",
        current: false
      },
      /*  { name: Lang.games, href: "/games", current: false }, */
      { name: Lang.news, href: "/news", current: false }
    ]);
    __publicField(this, "validateEmail", (email) => {
      if (!/\S+@\S+\.\S+/.test(email)) {
        return false;
      }
      return true;
    });
    __publicField(this, "validateTextLength", (field, size, type = "<") => {
      if (type === "<" && field.length < size) {
        return false;
      } else if (type === ">" && field.length > size) {
        return false;
      } else if (type === "=" && field.length === size) {
        return false;
      }
      return true;
    });
    __publicField(this, "truncateName", (name, maxLength = 10) => {
      return name.length > maxLength ? name.substring(0, maxLength) + "..." : name;
    });
    __publicField(this, "handleClickRedirect", (name) => {
      window.location.href = name;
    });
    __publicField(this, "getYouTubeID", (url) => {
      const match = url.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
      );
      return match ? match[1] : null;
    });
    __publicField(this, "getValidURL", (videoUrl) => {
      const match = videoUrl.match(
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\/.+$/
      );
      return match;
    });
    __publicField(this, "getCurrentYear", () => {
      const year = (/* @__PURE__ */ new Date()).getFullYear();
      return year;
    });
    __publicField(this, "getTypeLabel", (type) => {
      switch (type) {
        case "blog":
          return "Blog";
        case "announcement":
          return "Announcement";
        case "event":
          return "Event";
        case "diary":
          return "Developer Diary";
        default:
          return "All News";
      }
    });
    __publicField(this, "getTypeColor", (type) => {
      switch (type) {
        case "blog":
          return "bg-blue-500";
        case "announcement":
          return "bg-pink-500";
        case "event":
          return "bg-purple-500";
        case "diary":
          return "bg-amber-500";
        default:
          return "bg-gray-500";
      }
    });
    /**
     * Extract Vimeo Video ID from URL
     */
    __publicField(this, "getVimeoID", (url) => {
      const match = url.match(/vimeo\.com\/(\d+)/);
      return match ? match[1] : null;
    });
    // mock data for on going tournamnest page
    __publicField(this, "mockTournaments", [
      {
        name: "Club Tournament",
        players: 3,
        created_by: 1,
        created_at: "4/28/2022, 8:25:00 AM",
        status: "expired"
      },
      {
        name: "Club Tournament",
        players: 3,
        created_by: 1,
        created_at: "5/3/2022, 8:38:00 AM",
        status: "expired"
      },
      {
        name: "Club Tournament",
        players: 3,
        created_by: 1,
        created_at: "5/5/2022, 4:58:00 PM",
        status: "expired"
      },
      {
        name: "HeadsUp Tournament",
        players: 3,
        created_by: 1,
        created_at: "5/6/2022, 12:18:00 AM",
        status: "expired"
      }
    ]);
    // mock data for game guide page
    __publicField(this, "howToPlayLink", "https://www.youtube.com/watch?v=8jFreGK27DA");
    __publicField(this, "ProTipsLink", "https://player.vimeo.com/video/76979871");
    __publicField(this, "getFAQ", [
      {
        q: "How can I earn rewards?",
        a: "Complete daily challenges & events."
      },
      {
        q: "Can I play with friends?",
        a: "Yes, invite friends for multiplayer mode."
      },
      {
        q: "Is there a ranking system?",
        a: "Yes, ranking is based on performance."
      }
    ]);
    __publicField(this, "getStepByStepGuide", [
      "🎯 Install the game & create an account",
      "🕹️ Complete the tutorial to understand controls",
      "🔥 Explore different game modes & strategies",
      "🏆 Join tournaments & challenge friends"
    ]);
    __publicField(this, "gameProTips", [
      "🚀 Use power-ups strategically",
      "🎭 Watch pro players to learn advanced moves",
      "🛠️ Customize controls for better gameplay",
      "💡 Study opponent strategies to improve"
    ]);
    __publicField(this, "slidesHorizental", [
      {
        image: "/images/slider/slider2.webp",
        title: Lang.millennium_runners,
        description: Lang.millennium_runners_content,
        upcoming: false,
        preOrder: false
      },
      {
        image: "/images/slider/slider1.webp",
        title: "All times hit",
        description: "Discover the future of gaming...",
        upcoming: true,
        preOrder: true
      },
      {
        image: "/images/slider/slider3.webp",
        title: "Explore Planets",
        description: "Speed through cities and planets...",
        upcoming: true,
        preOrder: true
      },
      {
        image: "/images/slider/slider2.webp",
        title: "This is you new experience.....",
        description: Lang.millennium_runners_content,
        upcoming: true,
        preOrder: true
      },
      {
        image: "/images/slider/slider1.webp",
        title: "Enjoy the season",
        description: "Discover the future of gaming...",
        upcoming: true,
        preOrder: true
      }
    ]);
    __publicField(this, "slidesVertical", [
      {
        image: "/images/slider/slider4.png",
        bgcolor: "#E62928"
      },
      {
        image: "/images/slider/slider5.png",
        bgcolor: "#E5632F"
      },
      {
        image: "/images/slider/slider5.png",
        bgcolor: "#D4C52F"
      },
      {
        image: "/images/slider/slider6.png",
        bgcolor: "#D4C52F"
      },
      {
        image: "/images/slider/slider7.png",
        bgcolor: "#D4C52F"
      }
    ]);
    __publicField(this, "gameSections", [
      {
        id: 1,
        title: Lang.steel_saviour,
        date: Lang.steel_saviour_date,
        description: Lang.steel_saviour_details,
        image: "/images/products/other-section/housekeeping.png"
      },
      {
        id: 2,
        title: Lang.eleven_years_ago,
        date: Lang.eleven_years_ago_year,
        description: Lang.eleven_years_ago_details,
        image: "/images/products/other-section/maintainence.png"
      },
      {
        id: 3,
        title: Lang.red_rum,
        date: Lang.red_rum_year,
        description: Lang.red_rum_details,
        image: "/images/products/other-section/reception.png"
      }
    ]);
    __publicField(this, "commodorian", [
      {
        id: 16,
        title: "Sid Meier’s CIVILIZATION",
        image: "/images/commodorian/civilization.png"
      },
      {
        id: 15,
        title: "Robocop",
        image: "/images/commodorian/robocop.png"
      },
      {
        id: 14,
        title: "XENON",
        image: "/images/commodorian/xenon.png"
      },
      {
        id: 13,
        title: "SANTORO",
        image: "/images/commodorian/santoro.png"
      },
      {
        id: 12,
        title: "Indiana Jones",
        image: "/images/commodorian/indiana.png"
      },
      {
        id: 11,
        title: "Turrican",
        image: "/images/commodorian/turrican.png"
      },
      {
        id: 22,
        title: "Sid Meier’s CIVILIZATION",
        image: "/images/commodorian/civilization.png"
      },
      {
        id: 21,
        title: "Robocop",
        image: "/images/commodorian/robocop.png"
      },
      {
        id: 20,
        title: "XENON",
        image: "/images/commodorian/xenon.png"
      },
      {
        id: 19,
        title: "SANTORO",
        image: "/images/commodorian/santoro.png"
      },
      {
        id: 18,
        title: "Indiana Jones",
        image: "/images/commodorian/indiana.png"
      },
      {
        id: 17,
        title: "Turrican",
        image: "/images/commodorian/turrican.png"
      },
      {
        id: 28,
        title: "Sid Meier’s CIVILIZATION",
        image: "/images/commodorian/civilization.png"
      },
      {
        id: 27,
        title: "Robocop",
        image: "/images/commodorian/robocop.png"
      },
      {
        id: 26,
        title: "XENON",
        image: "/images/commodorian/xenon.png"
      },
      {
        id: 25,
        title: "SANTORO",
        image: "/images/commodorian/santoro.png"
      },
      {
        id: 24,
        title: "Indiana Jones",
        image: "/images/commodorian/indiana.png"
      },
      {
        id: 23,
        title: "Turrican",
        image: "/images/commodorian/turrican.png"
      }
    ]);
    __publicField(this, "faqItems", [
      {
        id: 1,
        question: "How do I report a bug or give feedback on a game?",
        answer: "You can report bugs or feedback through the support section of the game or by contacting our support team directly.",
        color: "#EC2124"
      },
      {
        id: 2,
        question: "Can I access my game library on multiple devices?",
        answer: "Yes, you can access your Ororo library from any supported device by logging in with your account.",
        color: "#E5622F"
      },
      {
        id: 3,
        question: "Are Ororo games available on other platforms?",
        answer: "Most Ororo games are available on PC, mobile, and select consoles. Availability may vary.",
        color: "#D4C52F"
      },
      {
        id: 4,
        question: "How do I download and install the game?",
        answer: "You can download and install games directly from your Ororo dashboard after logging in.",
        color: "#5CAC58"
      }
    ]);
    __publicField(this, "productDetailsData", {
      title: "Millennium Runners",
      intro: [
        "The race of the millennium is about to begin.",
        "Millennium Runners is the ultimate anti-gravity racing experience: speed beyond all limits, adrenaline-fueled circuits and four racing teams ready for anything to win the Millennium Cup.",
        "In this remote future, where speed is synonymous with power and the racetrack is the battleground, only the best will join the legend. Take on adrenaline-pumping challenges, dominate corners with breathtaking manoeuvres, and make your mark on galactic racing history."
      ],
      featuresTitle: "Key Features",
      features: [
        {
          title: "Limitless Speed",
          description: "Thrilling top-speed experience with smooth, responsive controls."
        },
        {
          title: "Iconic Circuits",
          description: "Race across remote planets, vertical cities, and magnetic storms."
        },
        {
          title: "Legendary Teams",
          description: "Choose from four elite racing teams, each with unique technology and philosophy."
        }
      ],
      expanded: [
        "Born from the vision of self-made prodigy William Baxter, this company symbolizes the dream of becoming a racing legend. Through dedication, he built one of the most iconic firms in anti-gravity engineering.",
        "Apex Motors, the oldest major racing team, stands as a direct rival to Vortex Avionics. It fosters an elite image by selecting only top-tier athletes through a rigorous process.",
        "Retropulse Dynamics, a rising star from GRF’s outer worlds, aims to empower individuals against corporate exploitation. It’s the underdog pushing innovation in engine tech."
      ]
    });
    __publicField(this, "productCartDetails", {
      title: "Millennium Runners",
      price: "9,75 €",
      tags: ["Racing", "Sport", "Fights", "3D"],
      description: "The ultimate anti-gravity racing experience. Millennium Runners is an homage to classic arcade racing games. Speed through futuristic cities and planets in adrenaline-fueled competitions. Choose your team, conquer the Millennium Cup, and race your way into legend!",
      editions: ["STANDARD", "EXTENDED"],
      releaseDate: "18 Apr, 2025",
      developer: "Commodore Sinapsy",
      publisher: "Over The Game",
      language: "English (Audio, Interface)",
      mode: "Single-Player",
      controllerSupport: "Xbox Controllers"
    });
    __publicField(this, "productAddOns", [
      {
        id: 1,
        title: "Millennium Runners Soundtrack",
        subtitle: "Add-on",
        description: "Immerse yourself even deeper with the official game soundtrack. A collection of original tracks to relive every moment, anywhere.",
        price: "1,99 €",
        image: "/images/products/addon/bg.png"
      }
    ]);
    __publicField(this, "systemRequirements", {
      minimum: {
        OS: "Windows 10",
        Processor: "Intel Core i7-13700H\nAMD Ryzen 7 6800HS",
        Memory: "16 GB RAM",
        Graphics: "Intel Iris Xe Graphics G7 96\nAMD Radeon 680M",
        DirectX: "Version 11",
        Storage: "15 GB available space",
        "Visual Settings": "1080p at 30 FPS, low graphics settings,\nupscaler set to quality"
      },
      recommended: {
        OS: "Windows 11",
        Processor: "Intel Core i7-14650HX\nAMD Ryzen 9 7945HX",
        Memory: "32 GB RAM",
        Graphics: "Nvidia GeForce RTX 4060\nAMD Radeon RX 7700S",
        DirectX: "Version 12",
        Storage: "15 GB available space",
        "Visual Settings": "1080p at 60 FPS, high graphics settings,\nupscaler set to quality"
      }
    });
    __publicField(this, "otherSection", [
      {
        title: "Dragon's Lock",
        edition: "Standard Edition",
        price: "5,99 €",
        image: "/images/products/other-section/dragon.png"
      },
      {
        title: "Book Of Fairies",
        edition: "Book Of Fairies",
        price: "0,99 €",
        image: "/images/products/other-section/book.png"
      },
      {
        title: "Golden For the Year",
        edition: "Golden For the Year",
        price: "4,99 €",
        image: "/images/products/other-section/golden.png"
      },
      {
        title: "Cheers!",
        edition: "Standard Edition",
        price: "4,99 €",
        image: "/images/products/other-section/cheers.png"
      }
    ]);
    __publicField(this, "mockGameList", [
      {
        id: 1,
        name: "Touchdown Cash",
        img: "/images/games/mock.png",
        feature: "Bonus",
        type: "Slot",
        category: "Sports"
      },
      {
        id: 2,
        name: "Thor's Rage",
        img: "/images/games/mock.png",
        feature: "Jackpot",
        type: "Slot",
        category: "Mythology"
      },
      {
        id: 3,
        name: "Big Gains",
        img: "/images/games/mock.png",
        feature: "Free Spins",
        type: "Slot",
        category: "Money"
      },
      {
        id: 4,
        name: "Rise Of Cleopatra",
        img: "/images/games/mock.png",
        feature: "Bonus",
        type: "Slot",
        category: "Ancient"
      },
      {
        id: 5,
        name: "777 Diamond Strike",
        img: "/images/games/mock.png",
        feature: "Jackpot",
        type: "Slot",
        category: "Classic"
      },
      {
        id: 6,
        name: "Cash Goddess",
        img: "/images/games/mock.png",
        feature: "Free Spins",
        type: "Slot",
        category: "Fantasy"
      },
      {
        id: 7,
        name: "Miami Rise",
        img: "/images/games/mock.png",
        feature: "Bonus",
        type: "Slot",
        category: "Modern"
      },
      {
        id: 8,
        name: "Zillard King MegaWays™",
        img: "/images/games/mock.png",
        feature: "Jackpot",
        type: "Slot",
        category: "Beast"
      },
      {
        id: 9,
        name: "Jackrabbit Jackpots",
        img: "/images/games/mock.png",
        feature: "Free Spins",
        type: "Slot",
        category: "Wild West"
      },
      {
        id: 10,
        name: "Farmtastic",
        img: "/images/games/mock.png",
        feature: "Bonus",
        type: "Slot",
        category: "Animals"
      },
      // Repeat with varied data to simulate more
      {
        id: 11,
        name: "Viking Vault",
        img: "/images/games/mock.png",
        feature: "Bonus",
        type: "Slot",
        category: "Mythology"
      },
      {
        id: 12,
        name: "Jungle Jewels",
        img: "/images/games/mock.png",
        feature: "Free Spins",
        type: "Slot",
        category: "Adventure"
      },
      {
        id: 13,
        name: "Cosmic Cash",
        img: "/images/games/mock.png",
        feature: "Jackpot",
        type: "Slot",
        category: "Sci-Fi"
      },
      {
        id: 14,
        name: "Treasure Temple",
        img: "/images/games/mock.png",
        feature: "Bonus",
        type: "Slot",
        category: "Ancient"
      },
      {
        id: 15,
        name: "Speed Racer",
        img: "/images/games/mock.png",
        feature: "Free Spins",
        type: "Slot",
        category: "Racing"
      },
      {
        id: 16,
        name: "Lucky Lanterns",
        img: "/images/games/mock.png",
        feature: "Jackpot",
        type: "Slot",
        category: "Asian"
      },
      {
        id: 17,
        name: "Ghost Hunter",
        img: "/images/games/mock.png",
        feature: "Bonus",
        type: "Slot",
        category: "Horror"
      },
      {
        id: 18,
        name: "Mystic Forest",
        img: "/images/games/mock.png",
        feature: "Free Spins",
        type: "Slot",
        category: "Fantasy"
      },
      {
        id: 19,
        name: "Neon Nights",
        img: "/images/games/mock.png",
        feature: "Jackpot",
        type: "Slot",
        category: "Retro"
      },
      {
        id: 20,
        name: "Dragon Blaze",
        img: "/images/games/mock.png",
        feature: "Bonus",
        type: "Slot",
        category: "Mythology"
      },
      {
        id: 21,
        name: "Haunted Spins",
        img: "/images/games/mock.png",
        feature: "Free Spins",
        type: "Slot",
        category: "Horror"
      },
      {
        id: 22,
        name: "Crystal Cove",
        img: "/images/games/mock.png",
        feature: "Jackpot",
        type: "Slot",
        category: "Ocean"
      },
      {
        id: 23,
        name: "Gold Digger's Den",
        img: "/images/games/mock.png",
        feature: "Bonus",
        type: "Slot",
        category: "Mining"
      },
      {
        id: 24,
        name: "Ninja Clash",
        img: "/images/games/mock.png",
        feature: "Free Spins",
        type: "Slot",
        category: "Action"
      },
      {
        id: 25,
        name: "Robot Rampage",
        img: "/images/games/mock.png",
        feature: "Jackpot",
        type: "Slot",
        category: "Sci-Fi"
      },
      {
        id: 26,
        name: "Royal Riches",
        img: "/images/games/mock.png",
        feature: "Bonus",
        type: "Slot",
        category: "Royalty"
      },
      {
        id: 27,
        name: "Safari Spin",
        img: "/images/games/mock.png",
        feature: "Free Spins",
        type: "Slot",
        category: "Animals"
      },
      {
        id: 28,
        name: "Festival Frenzy",
        img: "/images/games/mock.png",
        feature: "Bonus",
        type: "Slot",
        category: "Festival"
      },
      {
        id: 29,
        name: "Alien Fortune",
        img: "/images/games/mock.png",
        feature: "Jackpot",
        type: "Slot",
        category: "Sci-Fi"
      },
      {
        id: 30,
        name: "Pirate Plunder",
        img: "/images/games/mock.png",
        feature: "Free Spins",
        type: "Slot",
        category: "Adventure"
      }
    ]);
    __publicField(this, "team", [
      {
        name: "LUIGI SIMONETTI",
        title: "SAMPLE DESIGNATION",
        image: "/images/male.png",
        bio: "Storyteller and design lead, passionate about immersive worlds."
      },
      {
        name: "VALLI FRAGOSO",
        title: "SAMPLE DESIGNATION",
        image: "/images/male.png",
        bio: "Visionary entrepreneur leading innovation in the gaming space."
      },
      {
        name: "STEFANO CIANFARELLI",
        title: "SAMPLE DESIGNATION",
        image: "/images/male.png",
        bio: "Tech wizard behind our smooth gameplay and architecture."
      },
      {
        name: "FRANCESCO COLANGELI",
        title: "SAMPLE DESIGNATION",
        image: "/images/male.png",
        bio: "Creative coder blending logic with imagination."
      },
      {
        name: "GIOVANNI CELAURO",
        title: "SAMPLE DESIGNATION",
        image: "/images/male.png",
        bio: "Pixel perfectionist, building worlds that feel alive."
      }
    ]);
    __publicField(this, "fadeUp", {
      hidden: { opacity: 0, y: 40 },
      visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.2,
          duration: 0.7,
          ease: "easeOut"
        }
      })
    });
    __publicField(this, "staggerContainer", {
      visible: {
        transition: {
          staggerChildren: 0.15
        }
      }
    });
    __publicField(this, "fadeIn", {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
      }
    });
    __publicField(this, "container", {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.2,
          delayChildren: 0.4
        }
      }
    });
    __publicField(this, "awards", [
      { src: "/images/awards/1.png", alt: "Game Award" },
      { src: "/images/awards/2.png", alt: "Top Studio" },
      { src: "/images/awards/3.png", alt: "Innovation Award" }
    ]);
    __publicField(this, "gamesFilterData", {
      features: ["Bonus", "Jackpot", "Free Spins"],
      types: ["Slot", "Table", "Live"],
      categories: ["Adventure", "Mythology", "Classic"],
      sortOptions: [
        { label: "Name A-Z", value: "name-asc" },
        { label: "Name Z-A", value: "name-desc" }
      ]
    });
    __publicField(this, "gameDetails", {
      gameName: "Rise Of Cleopatra",
      shortDescription: "Maecenas ac fermentum diam. Phasellus libero leo, lobortis sit amet mauris sit amet, semper dignissim libero. Nulla a maximus justo. Vivamus pharetra nisl odio, vel egestas orci dictum ut. Phasellus sit amet dignissim eros. Mauris in dui vitae diam semper eleifend.",
      description: "Maecenas ac fermentum diam. Phasellus libero leo, lobortis sit amet mauris sit amet, semper dignissim libero. Nulla a maximus justo. Vivamus pharetra nisl odio, vel egestas orci dictum ut. Phasellus sit amet dignissim eros. Mauris in dui vitae diam semper eleifend. Mauris cursus tortor eu viverra consequat. Nulla or enim, bibendu fringilla elementum.Aenean vitae nisi placerat, sagittis justo tempus, consequat neque. Aliquam tristique, felis ut efficitur mollis, mi erat scelerisque magna, a hendrerit purus magna sed urna. Nulla eu lorem iaculis, hendrerit erat nec, vulputate ipsum. Pellentesque nulla odio, feugiat sed arcu nec, vehicula rutrum tortor. Cras sit amet nunc ipsum. Nam semper eget velit quis varius. Vivamus eget nunc in metus venenatis aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas sem at massa ultrices, quis interdum ligula ultricies. Mauris suscipit varius sapien quis consequat. In hac habitasse platea dictumst.",
      provider: "ORORO",
      releaseDate: "2025‑07‑03",
      reels: 5,
      rows: 4,
      paylines: 20,
      volatility: "High",
      hitFrequency: "High",
      RTP: 95.69,
      minBet: 0.1,
      maxBet: 10,
      multiLanguage: true,
      maxWinMultiplier: 325,
      features: [
        "Jars & Scarab Wilds",
        "Remove Suits",
        "Random Wilds",
        "Multiplier",
        "Mega Wilds",
        "Free Spins",
        "Feature Buy"
      ],
      featureDescriptions: [
        {
          name: "Jars & Scarab Wilds",
          description: "Scarab Wilds land on reels 1, 3, 5 and fill jars to unlock four features progressively: Remove Suits (6 scarabs), Random Wilds (12), Multiplier (18), and Mega Wilds (24). Once unlocked, features may trigger randomly on future spins. Scarb wilds substitute for all paying symbols."
        },
        {
          name: "Remove Suits",
          description: "Removes all low-paying card suit symbols for one spin."
        },
        {
          name: "Random Wilds",
          description: "Adds a random number of Cleopatra Wilds on the reels."
        },
        {
          name: "Multiplier",
          description: "A sundial spins to reveal a multiplier (x2–x10); can stack if no win; applies in and out of Free Spins."
        },
        {
          name: "Mega Wilds",
          description: "Adds Cleopatra Wild Mega symbols (2x2 or 3x3)."
        },
        {
          name: "Free Spins",
          description: "3/4/5 scatters award 8/10/12 spins; additional scatters grant 4/5/6 spins; unlocked features carry into bonus."
        },
        {
          name: "Feature Buy",
          description: "Buy for 15× stake to unlock all base-game features."
        }
      ],
      license: [
        "Gambling Commission of Great Britain",
        "Malta Gambling Authority"
      ],
      platforms: ["Desktop", "Tablet", "Mobile"],
      gameImages: [
        /* {
          type: "video",
          src: "/videos/product/mr.mp4",
          poster: "/videos/product/thumbnail.png",
        }, */
        { type: "image", src: "/images/games/banner-1.png" },
        { type: "image", src: "/images/games/banner-2.png" },
        { type: "image", src: "/images/games/banner-3.png" },
        { type: "image", src: "/images/games/banner-4.png" },
        { type: "image", src: "/images/products/other-section/wonder.png" }
        /* { type: "image", src: "/images/products/product/image2.png" },
        { type: "image", src: "/images/products/product/image3.png" },
        { type: "image", src: "/images/products/product/image4.png" }, */
      ]
    });
    __publicField(this, "newsContent", [
      {
        id: 1,
        type: "blog",
        title: "The Future of Blockchain Gaming",
        excerpt: "Exploring how blockchain technology is revolutionizing the gaming industry and what it means for players.",
        date: "2023-10-15",
        category: "Industry Insights",
        author: "Alex Johnson",
        readTime: "5 min read",
        image: "/images/default-article1.png"
      },
      {
        id: 2,
        type: "announcement",
        title: "New Game Launch: Crypto Quest",
        excerpt: "We're excited to announce the launch of our newest blockchain-based RPG adventure game.",
        date: "2023-11-02",
        image: "/images/default-article2.png"
      },
      {
        id: 3,
        type: "event",
        title: "Join Us at Blockchain Expo 2023",
        excerpt: "We'll be showcasing our latest games and technologies at the biggest blockchain event of the year.",
        date: "2023-11-20",
        image: "/images/default-article3.png"
      },
      {
        id: 4,
        type: "diary",
        title: "Behind the Scenes: Developing Our NFT System",
        excerpt: "A deep dive into how we designed the NFT mechanics for our flagship game.",
        date: "2023-10-28",
        author: "Sarah Dev",
        readTime: "8 min read",
        image: "/images/default-article4.png"
      },
      {
        id: 5,
        type: "blog",
        title: "Top 5 Tips for New Crypto Gamers",
        excerpt: "Essential tips to help newcomers navigate the world of cryptocurrency gaming.",
        date: "2023-10-05",
        category: "Player Tips",
        readTime: "4 min read",
        image: "/images/default-article.png"
      },
      {
        id: 6,
        type: "announcement",
        title: "Partnership with Polygon Studios",
        excerpt: "We're proud to announce our new partnership to bring faster and cheaper transactions to our players.",
        date: "2023-11-15",
        image: "/images/default-article.png"
      }
    ]);
    __publicField(this, "coreServices", [
      {
        title: "Housekeeping",
        description: "Assign staff to meticulously clean rooms: make beds, sanitize bathrooms, and restock minibars. Complete minigames for vacuum trails or linen folding to earn sparkling cleanliness ratings and guest satisfaction boosts.",
        icon: "🎮"
      },
      {
        title: "Maintenance",
        description: "Dispatch engineers to fix leaks, electrical faults, and broken furniture. Race against time in pipe-repair minigames or wiring puzzles to avert disasters, minimize downtime, and protect hotel revenue.",
        icon: "🖌️"
      },
      {
        title: "Reception",
        description: "Manage check-ins, check-outs and guest requests. Complete minigames for efficient queue handling and issue resolution to boost satisfaction, earn tips, and ensure smooth hotel operations.",
        icon: "📱"
      }
    ]);
    __publicField(this, "processSteps", [
      {
        step: 1,
        title: "Service Definition",
        description: "Establishing standards for room cleaning protocols, maintenance response SLAs, and reception workflows"
      },
      {
        step: 2,
        title: "Operational Design",
        description: "Creating staff duty matrices, equipment layouts, and service interaction blueprints"
      },
      {
        step: 3,
        title: "Implementation",
        description: "Training teams, deploying cleaning systems, and activating maintenance response networks"
      },
      {
        step: 4,
        title: "Service Launch",
        description: "Quality verification through room inspections, emergency drills, and front-desk simulations"
      },
      {
        step: 5,
        title: "Continuous Optimization",
        description: "Staff retraining, equipment maintenance, and guest feedback integration"
      }
    ]);
    __publicField(this, "differentiators", [
      {
        title: "Service Innovation",
        description: "Proactive cleaning protocols, predictive maintenance systems, and streamlined check-in/out workflows that exceed industry standards"
      },
      {
        title: "Hospitality Technology",
        description: "Smart equipment for deep cleaning, IoT-enabled maintenance diagnostics, and cloud-based reception management systems"
      },
      {
        title: "Guest-Centric Philosophy",
        description: "Trained staff anticipating needs with personalized room preparations and responsive service recovery solutions"
      },
      {
        title: "Proven Operational Excellence",
        description: "Consistent 95%+ guest satisfaction scores and industry-leading 15-minute emergency response guarantees"
      }
    ]);
  }
  /**
   * 🔹 Fetch the authenticated user's data
   */
  async fetchUser() {
    try {
      const response = await this.api.get(`${this.BASE_API}/auth/me`);
      return response.data;
    } catch (error) {
      console.info("Failed to fetch user:", error);
      return null;
    }
  }
  // mock data for game tournamnest and Rules page
  getTournaments() {
    return [
      {
        type: "Knockout Tournament",
        rules: [
          "1v1 elimination format",
          "Each round lasts 1 day",
          "Drawdown above 5% = disqualified",
          "Top 8 move to finals"
        ]
      },
      {
        type: "Demo Duel",
        rules: [
          "Use demo accounts only",
          "No real money risked",
          "Winners receive funded accounts",
          "Leverage capped at 1:50"
        ]
      },
      {
        type: "Speed Trading Challenge",
        rules: [
          "15-minute trading windows",
          "Most profit wins",
          "One entry per day",
          "No bots or automation allowed"
        ]
      },
      {
        type: "Live Trading Marathon",
        rules: [
          "48-hour non-stop live trading",
          "Max 20 trades per account",
          "Leaderboard updates hourly",
          "Must record trading sessions"
        ]
      },
      {
        type: "Scalping Showdown",
        rules: [
          "Focus on fast in-and-out trades",
          "Max 1-minute hold per trade",
          "Spread control required",
          "Ranked on consistency"
        ]
      },
      {
        type: "Crypto Clash",
        rules: [
          "Only crypto pairs allowed",
          "Trade on BTC, ETH, SOL, and ADA",
          "Max leverage 1:20",
          "Daily resets, best 3 days count"
        ]
      }
    ];
  }
}
const { BASE_API } = new Helper();
async function fetchAuthUser() {
  try {
    const response = await fetch(`${BASE_API}/auth/me`, {
      credentials: "include"
    });
    if (!response.ok) {
      return null;
    }
    const userData = await response.json();
    return (userData == null ? void 0 : userData.user) || null;
  } catch (error) {
    return null;
  }
}
function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const helper2 = new Helper();
  useEffect(() => {
    async function fetchUserData() {
      const userData = await fetchAuthUser();
      setUser(userData);
      setLoading(false);
    }
    fetchUserData();
  }, []);
  async function logout() {
    try {
      await helper2.api.post(`${BASE_API}/auth/logout`);
      setUser(null);
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  return { user, logout, loading };
}
const UserContext = createContext(void 0);
function UserProvider({ children }) {
  const { user, logout, loading } = useAuth();
  const [currentUser, setUser] = useState(user);
  useEffect(() => {
    setUser(user);
  }, [user]);
  return /* @__PURE__ */ jsx(
    UserContext.Provider,
    {
      value: { user: currentUser, setUser, logout, loading },
      children
    }
  );
}
function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(Lang.context_error);
  }
  return context;
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      className: "bg-[#000f26] text-white",
      children: [/* @__PURE__ */ jsx(UserProvider, {
        children: /* @__PURE__ */ jsx(Outlet, {})
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  default: root
}, Symbol.toStringTag, { value: "Module" }));
const AuthLayout = withComponentProps(function AuthLayout2() {
  return /* @__PURE__ */ jsxs("div", {
    style: {
      backgroundImage: "url('/images/bg/bg-pattern.png')"
    },
    className: "text-white min-h-screen flex  bg-cover bg-center items-center justify-center",
    children: [/* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AuthLayout
}, Symbol.toStringTag, { value: "Module" }));
function meta$c({}) {
  return [{
    title: `${Lang.title} - ${Lang.login}`
  }, {
    name: "description",
    content: `${Lang.welcome_fx} - ${Lang.login}`
  }];
}
const loginSchema = z.object({
  email: z.string().email(Lang.email_validation),
  password: z.string().min(1, Lang.password_required)
});
const Login = withComponentProps(function Login2() {
  const {
    BASE_API: BASE_API2
  } = new Helper();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  useEffect(() => {
    const message = sessionStorage.getItem("success_message");
    if (message) {
      toast.success(message, {
        duration: 2e3
      });
      sessionStorage.removeItem("success_message");
    }
  }, []);
  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${BASE_API2}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || Lang.invalid_email_password);
      sessionStorage.setItem("success_message", Lang.login_success);
      window.location.href = "/dashboard";
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen flex items-center justify-center px-2",
    children: [/* @__PURE__ */ jsx(Toaster, {
      position: "top-right"
    }), /* @__PURE__ */ jsxs("div", {
      className: "bg-gray-800 min-w-md rounded-lg shadow-lg p-5 sm:p-5 lg:p-16",
      children: [/* @__PURE__ */ jsx("div", {
        className: "text-center mb-8",
        children: /* @__PURE__ */ jsx("a", {
          href: "/",
          children: /* @__PURE__ */ jsx("img", {
            src: "/images/logos/logo.svg",
            alt: "Logo",
            className: "mx-auto h-10 w-auto"
          })
        })
      }), /* @__PURE__ */ jsxs("form", {
        onSubmit: handleSubmit(onSubmit),
        className: "space-y-5",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("input", {
            type: "text",
            placeholder: Lang.email_address,
            ...register("email"),
            value: watch("email"),
            onChange: (e) => setValue("email", e.target.value),
            className: "w-full p-3 bg-gray-700 rounded-full text-sm text-white border border-gray-600 outline-none focus:border-[#D90479]"
          }), errors.email && /* @__PURE__ */ jsx("p", {
            className: "text-red-500 px-2 py-1 text-sm",
            children: errors.email.message
          })]
        }), /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("input", {
            type: "password",
            placeholder: Lang.password,
            ...register("password"),
            value: watch("password"),
            onChange: (e) => setValue("password", e.target.value),
            className: "w-full p-3 bg-gray-700 rounded-full text-sm text-white border border-gray-600 outline-none focus:border-[#D90479]"
          }), errors.password && /* @__PURE__ */ jsx("p", {
            className: "text-red-500 px-2 py-1 text-sm",
            children: errors.password.message
          })]
        }), /* @__PURE__ */ jsx("button", {
          type: "submit",
          disabled: isSubmitting,
          className: "w-full py-3 cursor-pointer text-sm bg-pink-600 hover:scale-[1.05] transition-transform text-white font-semibold rounded-full flex items-center justify-center",
          children: isSubmitting ? /* @__PURE__ */ jsx(FaSpinner, {
            className: "animate-spin text-xl"
          }) : "🔒 " + Lang.login
        }), /* @__PURE__ */ jsx("div", {
          className: "text-center",
          children: /* @__PURE__ */ jsxs("a", {
            href: "/forgot-password",
            className: "text-pink-500 hover:underline text-sm",
            children: [Lang.forgot_password, "?"]
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex justify-center gap-3 mt-4",
          children: [/* @__PURE__ */ jsx("a", {
            href: `${BASE_API2}/auth/facebook`,
            title: "Login with Facebook",
            children: /* @__PURE__ */ jsx(FaFacebook, {
              className: "text-gray-300 text-xl hover:scale-110 transition"
            })
          }), /* @__PURE__ */ jsx("a", {
            href: `${BASE_API2}/auth/google`,
            title: "Login with Google",
            children: /* @__PURE__ */ jsx(FaGoogle, {
              className: "text-gray-300 text-xl hover:scale-110 transition"
            })
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "text-center text-sm text-gray-400 mt-6",
          children: [Lang.no_account, " ", /* @__PURE__ */ jsx("a", {
            href: "/registration",
            className: "text-pink-500 hover:underline",
            children: Lang.sign_up_now
          })]
        })]
      })]
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Login,
  meta: meta$c
}, Symbol.toStringTag, { value: "Module" }));
const registerSchema = z.object({
  firstName: z.string().min(2, Lang.first_name_validation),
  lastName: z.string().min(2, Lang.last_name_validation),
  email: z.string().email(Lang.email_validation),
  password: z.string().min(6, Lang.password_validation)
});
const Registration = withComponentProps(function Register() {
  const {
    BASE_API: BASE_API2
  } = new Helper();
  const [countries, setCountries] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  });
  const onSubmit = async (formData) => {
    try {
      const response = await fetch(`${BASE_API2}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");
      sessionStorage.setItem("success_message", Lang.data_saved);
      window.location.href = "/login";
    } catch (err) {
      toast$1.error(err.message);
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen flex items-center justify-center px-2",
    children: [/* @__PURE__ */ jsx(Toaster, {
      position: "top-right"
    }), /* @__PURE__ */ jsxs("div", {
      className: "bg-gray-800 min-w-md rounded-lg shadow-lg p-5 sm:p-5 lg:p-16",
      children: [/* @__PURE__ */ jsx("div", {
        className: "text-center mb-6",
        children: /* @__PURE__ */ jsx("a", {
          href: "/",
          children: /* @__PURE__ */ jsx("img", {
            src: "/images/logos/logo.svg",
            alt: "Logo",
            className: "mx-auto h-9 w-auto"
          })
        })
      }), /* @__PURE__ */ jsxs("form", {
        onSubmit: handleSubmit(onSubmit),
        className: "space-y-5",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "mb-6",
          children: [/* @__PURE__ */ jsx("input", {
            type: "text",
            placeholder: Lang.first_name,
            ...register("firstName"),
            value: watch("firstName"),
            onChange: (e) => setValue("firstName", e.target.value),
            className: "w-full p-3 bg-gray-700 rounded-full text-sm text-white border border-gray-600 outline-none focus:border-[#D90479]"
          }), errors.firstName && /* @__PURE__ */ jsx("p", {
            className: "text-red-500 px-2 py-0.5 text-sm",
            children: errors.firstName.message
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mb-6",
          children: [/* @__PURE__ */ jsx("input", {
            type: "text",
            placeholder: Lang.last_name,
            ...register("lastName"),
            value: watch("lastName"),
            onChange: (e) => setValue("lastName", e.target.value),
            className: "w-full p-3 bg-gray-700 text-white text-sm rounded-full outline-none border border-gray-600 focus:border-[#D90479]"
          }), errors.lastName && /* @__PURE__ */ jsx("p", {
            className: "text-red-500 px-2 py-0.5 text-sm",
            children: errors.lastName.message
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mb-6",
          children: [/* @__PURE__ */ jsx("input", {
            type: "text",
            placeholder: Lang.email,
            ...register("email"),
            value: watch("email"),
            onChange: (e) => setValue("email", e.target.value),
            className: "w-full p-3 bg-gray-700 text-white text-sm rounded-full outline-none border border-gray-600 focus:border-[#D90479]"
          }), errors.email && /* @__PURE__ */ jsx("p", {
            className: "text-red-500 px-2 py-0.5 text-sm",
            children: errors.email.message
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mb-6",
          children: [/* @__PURE__ */ jsx("input", {
            type: "password",
            placeholder: Lang.password,
            ...register("password"),
            value: watch("password"),
            onChange: (e) => setValue("password", e.target.value),
            className: "w-full p-3 bg-gray-700 text-white text-sm rounded-full outline-none border border-gray-600 focus:border-[#D90479]"
          }), errors.password && /* @__PURE__ */ jsx("p", {
            className: "text-red-500 px-2 py-0.5 text-sm",
            children: errors.password.message
          })]
        }), /* @__PURE__ */ jsx("button", {
          type: "submit",
          disabled: isSubmitting,
          className: "w-full py-3 text-sm bg-pink-600 hover:scale-[1.05] text-white font-semibold rounded-full cursor-pointer mb-6 flex items-center justify-center",
          children: isSubmitting ? /* @__PURE__ */ jsx(FaSpinner, {
            className: "animate-spin text-xl"
          }) : Lang.sign_up_image
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex justify-center gap-4 mb-6",
        children: [/* @__PURE__ */ jsx("a", {
          href: `${BASE_API2}/auth/facebook`,
          title: "Login with Facebook",
          children: /* @__PURE__ */ jsx(FaFacebook, {
            className: "text-gray-300 text-xl cursor-pointer hover:scale-110 transition"
          })
        }), /* @__PURE__ */ jsx("a", {
          href: `${BASE_API2}/auth/google`,
          title: "Login with Google",
          children: /* @__PURE__ */ jsx(FaGoogle, {
            className: "text-gray-300 text-xl cursor-pointer hover:scale-110 transition"
          })
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "text-center mt-4",
        children: /* @__PURE__ */ jsxs("p", {
          className: "text-gray-400 text-sm",
          children: [Lang.already_account + " ", /* @__PURE__ */ jsx("a", {
            href: "/login",
            className: "text-pink-500 hover:underline",
            children: Lang.login
          })]
        })
      })]
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Registration
}, Symbol.toStringTag, { value: "Module" }));
function meta$b({}) {
  return [{
    title: Lang.title + " - " + Lang.forgot_password
  }, {
    name: "description",
    content: Lang.welcome_fx + " - " + Lang.forgot_password
  }];
}
const forgotPasswordSchema = z.object({
  email: z.email(Lang.invalid_email)
});
const ForgotPassword = withComponentProps(function ForgotPassword2() {
  const {
    BASE_API: BASE_API2
  } = new Helper();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
      isSubmitting
    },
    reset
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ""
    }
  });
  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${BASE_API2}/auth/forgot-password`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      toast.success(Lang.reset_link);
      reset();
    } catch (err) {
      toast.error(err.message);
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen flex items-center justify-center px-2",
    children: [/* @__PURE__ */ jsx(Toaster, {
      position: "top-right"
    }), /* @__PURE__ */ jsxs("div", {
      className: "bg-gray-800 min-w-md rounded-lg shadow-lg p-5 sm:p-5 lg:p-16",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "text-center mb-8",
        children: [/* @__PURE__ */ jsx("a", {
          href: "/",
          children: /* @__PURE__ */ jsx("img", {
            src: "/images/logos/logo.svg",
            alt: "Logo",
            className: "mx-auto h-10 w-auto"
          })
        }), /* @__PURE__ */ jsx("h1", {
          className: "text-white text-xl font-semibold mt-6",
          children: Lang.forgot_password
        })]
      }), /* @__PURE__ */ jsxs("form", {
        onSubmit: handleSubmit(onSubmit),
        className: "space-y-5",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("input", {
            type: "text",
            placeholder: Lang.enter_email,
            ...register("email"),
            value: watch("email"),
            onChange: (e) => setValue("email", e.target.value),
            className: "w-full p-3 bg-gray-700 rounded-full text-sm text-white border border-gray-600 focus:border-[#D90479] outline-none"
          }), errors.email && /* @__PURE__ */ jsx("p", {
            className: "text-red-500 px-2 py-1 text-sm",
            children: errors.email.message
          })]
        }), /* @__PURE__ */ jsx("button", {
          type: "submit",
          disabled: isSubmitting,
          className: "w-full py-3 cursor-pointer text-sm bg-[#D90479] hover:scale-[1.05] transition-transform text-white font-semibold rounded-full flex items-center justify-center",
          children: isSubmitting ? /* @__PURE__ */ jsx(FaSpinner, {
            className: "animate-spin text-xl"
          }) : Lang.continue
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "text-center mt-6",
        children: /* @__PURE__ */ jsx("a", {
          href: "/login",
          className: "text-pink-500 hover:underline text-sm",
          children: Lang.cancle
        })
      })]
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ForgotPassword,
  meta: meta$b
}, Symbol.toStringTag, { value: "Module" }));
function meta$a({}) {
  return [{
    title: Lang.title + " - " + Lang.reset_password
  }, {
    name: "description",
    content: Lang.welcome_fx + " - " + Lang.reset_password
  }];
}
const resetPasswordSchema = z.object({
  password: z.string().min(6, Lang.invalid_password),
  confirmPassword: z.string().min(6, Lang.invalid_password)
}).refine((data) => data.password === data.confirmPassword, {
  message: Lang.password_not_matched,
  path: ["confirmPassword"]
});
const ResetPassword = withComponentProps(function ResetPassword2() {
  const {
    token
  } = useParams();
  const navigate = useNavigate();
  const {
    BASE_API: BASE_API2
  } = new Helper();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  });
  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${BASE_API2}/auth/reset-password`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token,
          newPassword: data.password
        })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      sessionStorage.setItem("success_message", Lang.password_update_success);
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen flex items-center justify-center",
    children: [/* @__PURE__ */ jsx(Toaster, {
      position: "top-right"
    }), /* @__PURE__ */ jsx("div", {
      className: "bg-gray-800 min-w-md rounded-lg shadow-lg p-5 sm:p-5 lg:p-16",
      children: /* @__PURE__ */ jsxs("form", {
        onSubmit: handleSubmit(onSubmit),
        className: "space-y-5",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-8",
          children: [/* @__PURE__ */ jsx("a", {
            href: "/",
            children: /* @__PURE__ */ jsx("img", {
              src: "/images/logos/logo.svg",
              alt: "Logo",
              className: "mx-auto h-10 w-auto"
            })
          }), /* @__PURE__ */ jsx("h1", {
            className: "text-white text-xl font-semibold mt-6",
            children: Lang.reset_password
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mb-4",
          children: [/* @__PURE__ */ jsx("input", {
            type: "password",
            placeholder: Lang.new_password,
            ...register("password"),
            value: watch("password"),
            onChange: (e) => setValue("password", e.target.value),
            className: "w-full p-3 rounded-full bg-gray-700 text-sm text-white border border-gray-600 focus:border-[#D90479] outline-none"
          }), errors.password && /* @__PURE__ */ jsx("p", {
            className: "text-red-500 px-2 pt-1 text-sm",
            children: errors.password.message
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mb-4",
          children: [/* @__PURE__ */ jsx("input", {
            type: "password",
            placeholder: Lang.confirm_password,
            ...register("confirmPassword"),
            value: watch("confirmPassword"),
            onChange: (e) => setValue("confirmPassword", e.target.value),
            className: "w-full p-3 rounded-full bg-gray-700 text-sm text-white border border-gray-600 focus:border-[#D90479] outline-none"
          }), errors.confirmPassword && /* @__PURE__ */ jsx("p", {
            className: "text-red-500 px-2 pt-1 text-sm",
            children: errors.confirmPassword.message
          })]
        }), /* @__PURE__ */ jsx("button", {
          type: "submit",
          disabled: isSubmitting,
          className: "w-full py-3 cursor-pointer text-sm bg-[#D90479] hover:scale-[1.05] transition-transform text-white font-semibold rounded-full flex items-center justify-center",
          children: isSubmitting ? /* @__PURE__ */ jsx(FaSpinner, {
            className: "animate-spin text-xl"
          }) : Lang.continue
        })]
      })
    })]
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ResetPassword,
  meta: meta$a
}, Symbol.toStringTag, { value: "Module" }));
function Footer() {
  const { BASE_API: BASE_API2 } = new Helper();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubscribe = async () => {
    if (!email) return false;
    setLoading(true);
    try {
      const response = await fetch(`${BASE_API2}/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (response.ok) {
        toast$1.success(Lang.subscription_email_sent_message);
        setEmail("");
      } else {
        toast$1.error(data.message || Lang.unknown_error);
      }
    } catch (error) {
      toast$1.error(error.message || Lang.unknown_error);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("footer", { className: "bg-gradient-to-b from-[#0F172A] to-[#1A1A2E] pt-16 pb-8 border-t border-white/10", children: [
    /* @__PURE__ */ jsx(Toaster, { position: "top-right", reverseOrder: false }),
    /* @__PURE__ */ jsxs("div", { className: "box mx-auto px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-pink-600 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center text-xl mr-3", children: "🎮" }),
            /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400", children: Lang.title })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-white/70 text-sm leading-relaxed max-w-xs", children: "Delivering exceptional hotel experiences through meticulous housekeeping, expert maintenance, and thoughtful service design." }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "#",
                className: "w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-r from-pink-600 to-purple-600 transition-all",
                children: /* @__PURE__ */ jsx(FaFacebook, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "#",
                className: "w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-r from-pink-600 to-purple-600 transition-all",
                children: /* @__PURE__ */ jsx(FaInstagram, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "#",
                className: "w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-r from-pink-600 to-purple-600 transition-all",
                children: /* @__PURE__ */ jsx(FaLinkedin, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "#",
                className: "w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-r from-pink-600 to-purple-600 transition-all",
                children: /* @__PURE__ */ jsx(FaYoutube, { className: "w-5 h-5" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-6 text-pink-400", children: Lang.quick_links }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
              "a",
              {
                href: "/",
                className: "flex items-center text-white/80 hover:text-pink-400 transition group",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-pink-500 rounded-full mr-3 group-hover:scale-125 transition-transform" }),
                  Lang.home
                ]
              }
            ) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
              "a",
              {
                href: "/about",
                className: "flex items-center text-white/80 hover:text-pink-400 transition group",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-pink-500 rounded-full mr-3 group-hover:scale-125 transition-transform" }),
                  Lang.about
                ]
              }
            ) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
              "a",
              {
                href: "/news",
                className: "flex items-center text-white/80 hover:text-pink-400 transition group",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-pink-500 rounded-full mr-3 group-hover:scale-125 transition-transform" }),
                  Lang.blog
                ]
              }
            ) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
              "a",
              {
                href: "/contact",
                className: "flex items-center text-white/80 hover:text-pink-400 transition group",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-pink-500 rounded-full mr-3 group-hover:scale-125 transition-transform" }),
                  Lang.contact
                ]
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-6 text-pink-400", children: Lang.contact_us }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
              /* @__PURE__ */ jsx(FaMapMarkerAlt, { className: "text-pink-500 mt-1 mr-3 flex-shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: "text-white/80", children: "123 Game Street, Virtual City, VC 54321" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(FaPhone, { className: "text-pink-500 mr-3 flex-shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: "text-white/80", children: "+1 (555) 123-4567" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
              /* @__PURE__ */ jsx(FaEnvelope, { className: "text-pink-500 mt-1 mr-3 flex-shrink-0" }),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "mailto:info@example.com",
                  className: "text-white/80 hover:text-pink-400 transition",
                  children: Lang.contact_email
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-6 text-pink-400", children: Lang.newsletter }),
          /* @__PURE__ */ jsx("p", { className: "text-white/70 mb-4", children: "Subscribe to get updates on new special offers." }),
          /* @__PURE__ */ jsxs("div", { className: "flex", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                onChange: (e) => setEmail(e.target.value),
                value: email,
                placeholder: Lang.email,
                className: "bg-gray-800 border border-white/10 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-pink-500 w-full"
              }
            ),
            loading ? /* @__PURE__ */ jsx(FaSpinner, { className: "animate-spin ml-2 mt-2 text-xl" }) : /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleSubscribe,
                className: "cursor-pointer bg-gradient-to-r from-pink-600 to-purple-600 px-4 py-2 rounded-r-lg font-medium hover:opacity-90 transition-opacity",
                children: Lang.subscribe
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-px bg-gradient-to-r from-transparent via-pink-600/50 to-transparent my-8" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-white/60 text-sm", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          Lang.title,
          ". ",
          Lang.copyright
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-6", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "#",
              className: "text-white/60 hover:text-pink-400 transition text-sm",
              children: Lang.terms
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "#",
              className: "text-white/60 hover:text-pink-400 transition text-sm",
              children: Lang.privacy
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "#",
              className: "text-white/60 hover:text-pink-400 transition text-sm",
              children: Lang.cookie
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function TopMenuBar() {
  const helper2 = new Helper();
  const { user, logout, loading } = useUser();
  const [photo, setPhoto] = useState("");
  const location = useLocation();
  useEffect(() => {
    if (user == null ? void 0 : user.first_name) {
      setPhoto("images/male.png");
      if (user == null ? void 0 : user.photo_id) {
        setPhoto(
          `${helper2.BASE_API}/photos/${user == null ? void 0 : user.photo_id}/small` || "images/male.png"
        );
      }
    }
  }, [user]);
  return /* @__PURE__ */ jsx("nav", { className: "hidden md:flex w-full shadow-md", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1600px] mx-auto flex w-full items-center justify-between h-10", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsxs("a", { href: "/", children: [
      " ",
      /* @__PURE__ */ jsx(
        "img",
        {
          className: "h-9 w-auto",
          src: "/images/logos/logo.svg",
          alt: Lang.logo
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-3", children: helper2 == null ? void 0 : helper2.navigation.map((item, index) => {
      const isActive = location.pathname === item.href;
      return /* @__PURE__ */ jsx(
        "a",
        {
          href: item.href ?? "/",
          className: `text-md px-4 py-2 cursor-pointer rounded-md transition duration-150 ${isActive ? "text-[#d90479]" : "text-white hover:text-[#d90479]"}`,
          children: item.name
        },
        index
      );
    }) }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: photo ? /* @__PURE__ */ jsxs(Menu, { as: "div", className: "relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            alt: "User Profile",
            src: photo,
            className: "h-8 w-8 rounded-full"
          }
        ),
        /* @__PURE__ */ jsx(MenuButton, { className: "text-white text-sm cursor-pointer", children: helper2.truncateName(
          (user == null ? void 0 : user.first_name) + " " + (user == null ? void 0 : user.last_name)
        ) })
      ] }),
      /* @__PURE__ */ jsxs(MenuItems, { className: "absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 ring-1 ring-black/5 z-50", children: [
        /* @__PURE__ */ jsx(MenuItem, { children: /* @__PURE__ */ jsx(
          "a",
          {
            href: "/profile",
            className: "block px-2.5 py-1.5 text-sm text-white hover:bg-[#D90479]",
            children: Lang.profil
          }
        ) }),
        /* @__PURE__ */ jsx(MenuItem, { children: /* @__PURE__ */ jsx(
          "a",
          {
            href: "/user-list",
            className: "block px-2.5 py-1.5 text-sm text-white hover:bg-[#D90479]",
            children: Lang.user
          }
        ) }),
        /* @__PURE__ */ jsx(MenuItem, { children: /* @__PURE__ */ jsx(
          "a",
          {
            href: "#",
            onClick: logout,
            className: "block px-2.5 py-1.5 text-sm text-white hover:bg-[#D90479]",
            children: Lang.logout
          }
        ) })
      ] })
    ] }) : /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => helper2.handleClickRedirect("/login"),
        className: "w-11 h-11 rounded-full bg-[#d90479] flex items-center justify-center cursor-pointer",
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/images/icons/icon-account.svg",
            className: "w-4 h-4",
            alt: Lang.user
          }
        )
      }
    ) })
  ] }) });
}
const helper = new Helper();
function MobileNavMenu() {
  const [openIndex, setOpenIndex] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "w-full space-y-4 mt-0", children: /* @__PURE__ */ jsx("div", { className: "w-full space-y-2 mt-6", children: helper.navigation.map((item, index) => /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(
    "a",
    {
      href: item.href,
      onClick: () => {
        if (openIndex === index) {
          setOpenIndex(null);
        } else {
          setOpenIndex(index);
        }
      },
      className: "w-full text-left text-white px-4 py-2 rounded-md cursor-pointer hover:text-[#d90479] flex items-center justify-between",
      children: /* @__PURE__ */ jsx("span", { children: item.name })
    }
  ) }, index)) }) }) });
}
function MobileTopMenu() {
  const helper2 = new Helper();
  const { user, logout, loading } = useUser();
  const [photo, setPhoto] = useState("");
  useEffect(() => {
    if (user == null ? void 0 : user.first_name) {
      setPhoto("images/male.png");
      if (user == null ? void 0 : user.photo_id) {
        setPhoto(
          `${helper2.BASE_API}/photos/${user == null ? void 0 : user.photo_id}/small` || "images/male.png"
        );
      }
    }
  }, [user]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-6 mt-1", children: photo ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Menu, { as: "div", className: "relative flex  cursor-pointer", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          alt: "User Profile",
          src: photo,
          className: "h-8 w-8 rounded-full"
        }
      ),
      /* @__PURE__ */ jsx(MenuButton, { className: "text-white text-sm cursor-pointer", children: helper2.truncateName(
        (user == null ? void 0 : user.first_name) + " " + (user == null ? void 0 : user.last_name)
      ) })
    ] }),
    /* @__PURE__ */ jsxs(MenuItems, { className: "absolute mt-12  w-48 bg-[#002459] rounded-md shadow-lg py-1 ring-1 ring-black/5 z-50", children: [
      /* @__PURE__ */ jsx(MenuItem, { children: /* @__PURE__ */ jsx(
        "a",
        {
          href: "/profile",
          className: "block px-2.5 py-1.5 text-sm text-white hover:bg-gray-700",
          children: Lang.profil
        }
      ) }),
      /* @__PURE__ */ jsx(MenuItem, { children: /* @__PURE__ */ jsx(
        "a",
        {
          href: "#",
          onClick: logout,
          className: "block px-2.5 py-1.5 text-sm text-white hover:bg-gray-700",
          children: Lang.logout
        }
      ) })
    ] })
  ] }) }) : /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-full bg-[#002459] flex items-center justify-center cursor-pointer", children: /* @__PURE__ */ jsx(
    "img",
    {
      src: "/images/icons/icon-account.svg",
      className: "h-6 w-6",
      alt: Lang.user
    }
  ) }) }) });
}
function MobileMenu() {
  return /* @__PURE__ */ jsx(Disclosure, { as: "div", className: "md:hidden", children: ({ open }) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(DisclosureButton, { className: "inline-flex items-center justify-center p-2 focus:outline-none", children: [
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: Lang.open_main_menu }),
      open ? /* @__PURE__ */ jsx(
        XMarkIcon,
        {
          className: "h-6 w-6 text-white cursor-pointer",
          "aria-hidden": "true"
        }
      ) : /* @__PURE__ */ jsx(IoIosMenu, { className: "h-6 w-6 text-[#D90479] cursor-pointer" })
    ] }),
    /* @__PURE__ */ jsxs(DisclosurePanel, { className: "fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#0F172A] to-[#1A1A2E] px-6 py-2 flex flex-col space-y-6 min-h-screen overflow-y-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full flex justify-end", children: /* @__PURE__ */ jsx(DisclosureButton, { className: "p-2 text-white hover:text-gray-300", children: /* @__PURE__ */ jsx(XMarkIcon, { className: "h-6 w-6", "aria-hidden": "true" }) }) }),
      /* @__PURE__ */ jsx(MobileTopMenu, {}),
      /* @__PURE__ */ jsx(MobileNavMenu, {})
    ] })
  ] }) });
}
function Header() {
  return /* @__PURE__ */ jsxs(
    motion.header,
    {
      className: "sticky top-0 z-50 bg-gradient-to-b from-[#0F172A] to-[#1A1A2E] shadow-xl shadow-black/20 backdrop-blur-sm",
      initial: { y: -100 },
      animate: { y: 0 },
      transition: { duration: 0.5, ease: "easeOut" },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "md:hidden flex items-center justify-between py-3 px-4 relative", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-grow flex justify-center ml-12", children: /* @__PURE__ */ jsx(
            motion.img,
            {
              src: "/images/logos/logo.svg",
              alt: "Logo",
              className: "h-8 w-auto",
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 },
              transition: { delay: 0.2, duration: 0.4 }
            }
          ) }),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "absolute right-4",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.3 },
              children: /* @__PURE__ */ jsx(MobileMenu, {})
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsx(TopMenuBar, {}) })
      ]
    }
  );
}
const MainLayout = withComponentProps(function MainLayout2() {
  return /* @__PURE__ */ jsxs("div", {
    className: "\n    relative        \n    bg-cover bg-center\n    text-white\n    min-h-screen           \n  ",
    style: {
      backgroundImage: "url('/images/bg/bg-pattern.png')"
    },
    children: [/* @__PURE__ */ jsx("div", {
      className: "absolute inset-0 bg-gradient-to-br from-[#041d55]/5 via-[#031F50]/15 to-[#002459]/10"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute inset-0 backdrop-blur-sm bg-white/5"
    }), /* @__PURE__ */ jsxs("div", {
      className: "relative z-10 flex min-h-screen flex-col",
      children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsx("main", {
        className: "flex-1",
        children: /* @__PURE__ */ jsx(Outlet, {})
      }), /* @__PURE__ */ jsx(Footer, {})]
    }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MainLayout
}, Symbol.toStringTag, { value: "Module" }));
function CTA$1() {
  return /* @__PURE__ */ jsxs("section", { className: "relative py-24 text-white overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-10 left-10 w-40 h-40 rounded-full bg-purple-600/10 blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-20 right-20 w-60 h-60 rounded-full bg-pink-600/10 blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 right-1/4 w-20 h-20 rounded-full bg-blue-500/10 blur-xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:16px_16px]" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative max-w-4xl mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.8 },
          viewport: { once: true, margin: "-100px" },
          className: "mb-10",
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-4xl sm:text-4xl md:text-4xl font-bold mb-6  bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-pink-300", children: Lang.CTA_header }),
            /* @__PURE__ */ jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                transition: { delay: 0.2, duration: 0.8 },
                viewport: { once: true, margin: "-100px" },
                className: "text-gray-300 text-xl max-w-2xl mx-auto",
                children: Lang.CTA_content
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          whileInView: { opacity: 1, scale: 1 },
          transition: { delay: 0.4, duration: 0.5 },
          viewport: { once: true, margin: "-100px" },
          className: "flex flex-col sm:flex-row justify-center gap-4 mt-12",
          children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: "/contact",
              className: "relative inline-flex items-center justify-center group shadow-2xl hover:shadow-pink-500/20 transition-all",
              children: [
                /* @__PURE__ */ jsx("span", { className: "absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full group-hover:from-pink-500 group-hover:to-purple-500 transition-all" }),
                /* @__PURE__ */ jsx("span", { className: "absolute inset-0 rounded-full bg-gradient-to-r from-pink-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-all duration-300" }),
                /* @__PURE__ */ jsx("span", { className: "relative px-8 py-4 font-bold text-lg", children: Lang.contact })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "flex flex-wrap justify-center gap-10 mt-20",
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          transition: { delay: 0.6 },
          viewport: { once: true },
          children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold text-purple-400 mb-2", children: Lang.game_developed_count }),
              /* @__PURE__ */ jsx("div", { className: "text-white", children: Lang.game_developed })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold text-blue-400 mb-2", children: Lang.support_count }),
              /* @__PURE__ */ jsx("div", { className: "text-white", children: Lang.support })
            ] })
          ]
        }
      )
    ] })
  ] });
}
function FeatureGames() {
  const { gameSections } = new Helper();
  const gamePulseVariants = {
    initial: { opacity: 0, y: 30 },
    animate: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.2,
        duration: 0.6
      }
    }),
    pulse: {
      scale: [1, 1.01, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap box items-center lg:px-10 md:px-10 sm:px-2 gap-4 pt-10 mb-4", children: /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold mb-5 flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsx(IoDiamond, { className: "text-[#D90479] w-8 h-8" }),
      Lang.feature_games
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "relative box lg:px-10 md:px-10 sm:px-2", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8", children: gameSections.map((game, index) => /* @__PURE__ */ jsx(
      motion.div,
      {
        custom: index,
        initial: "initial",
        animate: ["animate", "pulse"],
        variants: gamePulseVariants,
        className: "relative  rounded-xl overflow-hidden shadow-lg hover:scale-[1.03] transition-transform",
        children: /* @__PURE__ */ jsx("section", { className: "text-white", children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "rounded-2xl bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E] overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-200",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "relative w-full h-52 sm:h-52 lg:h-56", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: game.image,
                    alt: game.title,
                    className: "w-full h-full object-cover"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute top-2 right-2 bg-opacity-10 p-1 rounded-full" }),
                /* @__PURE__ */ jsx("div", { className: "absolute top-2 right-2 bg-opacity-50 p-1 rounded-full z-10", children: /* @__PURE__ */ jsx(AiFillFire, { className: "w-5 h-5 text-[#D90479]" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "py-4 space-y-2 px-2", children: [
                /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: game.title }),
                /* @__PURE__ */ jsx("p", { className: "text-md text-gray-400 leading-snug", children: game.description }),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: "/game/1",
                    className: "mt-3 cursor-pointer px-4 py-1.5 border rounded-full border-[#D90479] text-white text-sm hover:bg-gradient-to-r from-pink-600 to-purple-600 hover:text-white transition",
                    children: Lang.open
                  }
                )
              ] })
            ]
          },
          game.id
        ) })
      },
      game.id
    )) }) })
  ] });
}
const { slidesVertical } = new Helper();
const slideVariants = {
  initial: { opacity: 0, scale: 1.05 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.8 } }
};
const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.2,
      duration: 0.5,
      ease: "easeOut"
    }
  }),
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};
function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [typedText, setTypedText] = useState("");
  const fullText = "From Repairs to Cleanliness — We Maintain, You Simply Relax.";
  const slideInterval = useRef(null);
  const [showCursor, setShowCursor] = useState(true);
  const nextSlide = () => setCurrent((prev) => prev === slidesVertical.length - 1 ? 0 : prev + 1);
  useEffect(() => {
    slideInterval.current = setInterval(nextSlide, 4e3);
    return () => clearInterval(slideInterval.current);
  }, []);
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(interval);
        setShowCursor(false);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "w-full h-[60vh] sm:h-[70vh] relative", children: /* @__PURE__ */ jsx("div", { className: "relative w-full h-full overflow-hidden", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
      motion.div,
      {
        variants: slideVariants,
        initial: "initial",
        animate: "animate",
        exit: "exit",
        className: "absolute inset-0 w-full h-full",
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: slidesVertical[current].image,
            alt: slidesVertical[current].title,
            className: "w-full h-full object-cover shadow-lg"
          }
        )
      },
      current
    ) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "relative box pt-10 pb-2 px-4 sm:px-6 lg:px-20", children: /* @__PURE__ */ jsxs(
      motion.h1,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 1 },
        className: "text-4xl sm:text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-pink-300 font-bold mb-6 text-center min-h-[3rem]",
        children: [
          typedText,
          showCursor && /* @__PURE__ */ jsx("span", { className: "animate-pulse", children: "|" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("section", { className: "relative py-2 box", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center items-center gap-4 sm:gap-6  mt-5 px-4", children: "/games,/services,/contact".split(",").map((path, i) => /* @__PURE__ */ jsx(
      motion.div,
      {
        custom: i,
        initial: "hidden",
        animate: ["visible", "pulse"],
        variants: buttonVariants,
        children: /* @__PURE__ */ jsx(
          Link,
          {
            to: path,
            className: "font-semibold bg-gradient-to-r from-pink-600 to-purple-600 px-5 py-2 text-sm sm:py-3 sm:text-base rounded-full hover:bg-white hover:text-black transition",
            children: i === 0 ? "Our Games" : i === 1 ? "Services" : "Contact Us"
          }
        )
      },
      path
    )) }) })
  ] });
}
function Section({ sections }) {
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 w-full h-full", children: sections.map((article) => {
    var _a;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: "rounded-xl bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E] overflow-hidden shadow-md hover:scale-[1.05] transition",
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: ((_a = article == null ? void 0 : article.photo) == null ? void 0 : _a.original) || "/images/default-article.png",
              alt: article.title,
              className: "h-60 w-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-2", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-white text-lg font-semibold truncate", children: article.title }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm line-clamp-3", children: article.description }),
            /* @__PURE__ */ jsx(
              Link,
              {
                to: `/blogs/${article.id}`,
                className: "inline-block text-sm text-[#D90479] font-medium hover:underline",
                children: Lang.read_more_symbol
              }
            )
          ] })
        ]
      },
      article.id
    );
  }) });
}
function Articles() {
  const itemsPerPage = 3;
  const [allArticles, setAllArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isSeeAll, setIsSeeAll] = useState(false);
  const totalPages = Math.ceil(allArticles.length / itemsPerPage);
  const visibleItems = isSeeAll ? allArticles : allArticles.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const BASE_API2 = new Helper().BASE_API;
        const res = await fetch(`${BASE_API2}/articles`);
        const data = await res.json();
        setAllArticles(data || []);
      } catch (err) {
        console.error(Lang.error_fetching_article, err);
      }
    };
    fetchArticles();
  }, []);
  return /* @__PURE__ */ jsxs("section", { className: "text-white box  py-10 xl:px-10 lg:px-10 md:px-10 sm:px-2", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold mb-5 flex gap-2", children: [
      " ",
      /* @__PURE__ */ jsx(FaBlogger, { className: "text-[#D90479] w-8 h-8" }),
      Lang.news
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 mb-4", children: [
      !isSeeAll && /* @__PURE__ */ jsxs("div", { className: "flex border border-white rounded-full overflow-hidden", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCurrentPage((prev) => Math.max(prev - 1, 0)),
            disabled: currentPage === 0,
            className: "px-4 py-2 hover:bg-white hover:text-black transition disabled:opacity-30",
            children: /* @__PURE__ */ jsx(ArrowLeftIcon, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1)),
            disabled: currentPage >= totalPages - 1,
            className: "px-4 py-2 hover:bg-white hover:text-black transition border-l border-white disabled:opacity-30",
            children: /* @__PURE__ */ jsx(ArrowRightIcon, { className: "w-5 h-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/news",
          className: " text-gray-200 rounded-full px-5 py-2 text-sm bg-gradient-to-r from-pink-600 to-purple-600 hover:scale-[1.05]",
          children: Lang.see_more
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative w-full min-h-[280px]", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 30, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -20, scale: 0.98 },
        transition: { duration: 0.5 },
        children: /* @__PURE__ */ jsx(Section, { sections: visibleItems })
      },
      isSeeAll ? "all" : currentPage
    ) }) })
  ] });
}
function meta$9({}) {
  return [{
    title: Lang.title + " | " + Lang.home
  }, {
    name: "description",
    content: Lang.welcome_fx + " - " + Lang.home
  }];
}
const Home = withComponentProps(function Home2() {
  const {
    gameSections
  } = new Helper();
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx(HeroSection, {}), /* @__PURE__ */ jsx(FeatureGames, {}), /* @__PURE__ */ jsx(Articles, {}), /* @__PURE__ */ jsx(CTA$1, {})]
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home,
  meta: meta$9
}, Symbol.toStringTag, { value: "Module" }));
const authLoader = async () => {
  try {
    const user = await fetchAuthUser();
    if (!user) {
      window.location.href = "/login";
    }
  } catch (error) {
    window.location.href = "/login";
  }
};
function meta$8({}) {
  return [{
    title: Lang.title + " - " + Lang.edit_profile
  }, {
    name: "description",
    content: Lang.welcome_fx + " - " + Lang.edit_profile
  }];
}
const EditProfile = withComponentProps(function EditProfile2() {
  const {
    user,
    setUser
  } = useUser();
  const [loading, setLoading] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const {
    BASE_API: BASE_API2,
    validateTextLength,
    validateEmail
  } = new Helper();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const fileInputRef = useRef(null);
  useEffect(() => {
    var _a, _b, _c, _d, _e;
    authLoader();
    if (user) {
      console.log(user);
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setEmail(user.email || "");
      setAboutMe(user.address || "");
      setGender(user.gender || "");
      setDob(((_a = user.date_of_birth) == null ? void 0 : _a.split("T")[0]) || "");
      setPhone(user.phone_number || "");
      setHotelName(user.hotel_name || "");
      setSelectedCountry({
        iso_code: (_b = user == null ? void 0 : user.country) == null ? void 0 : _b.iso_code,
        value: (_c = user == null ? void 0 : user.country) == null ? void 0 : _c.id,
        label: (_d = user == null ? void 0 : user.country) == null ? void 0 : _d.name,
        phone_code: (_e = user == null ? void 0 : user.country) == null ? void 0 : _e.phone_code
      });
      if (user == null ? void 0 : user.photo_id) {
        setProfileImage(`${BASE_API2}/photos/${user == null ? void 0 : user.photo_id}/small`);
      } else {
        setProfileImage("/images/male.png");
      }
    }
  }, [user]);
  useEffect(() => {
    if (user == null ? void 0 : user.country) {
      fetch(`${BASE_API2}/contact/countries/search?q=${user.country}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((res) => res.json()).then((data) => {
        const matched = data.find((c) => c.name === user.country);
        if (matched) {
          setSelectedCountry({
            iso_code: matched.iso_code,
            value: matched.id,
            label: matched.name,
            phone_code: matched.phone_code
          });
        }
      }).catch(console.error);
    }
  }, [user]);
  useEffect(() => {
    if (phone && (selectedCountry == null ? void 0 : selectedCountry.value)) {
      try {
        const phoneNumber = parsePhoneNumberFromString(phone, selectedCountry.iso_code);
        if (!phoneNumber || !phoneNumber.isValid()) {
          setPhoneError(Lang.invalid_phone_number);
        } else {
          setPhoneError("");
        }
      } catch (error2) {
        setPhoneError(Lang.invalid_phone_number);
      }
    } else if (phone) {
      setPhoneError(Lang.select_country_first);
    } else {
      setPhoneError("");
    }
  }, [phone, selectedCountry]);
  useEffect(() => {
    if ((selectedCountry == null ? void 0 : selectedCountry.iso_code) && phone) {
      const callingCode = `+${getCountryCallingCode(selectedCountry.iso_code)}`;
      if (!phone.startsWith(callingCode)) {
        setPhone("");
      }
    }
  }, [selectedCountry]);
  const loadCountryOptions = async (inputValue) => {
    if (!inputValue || inputValue.length < 1) return [];
    try {
      const res = await fetch(`${BASE_API2}/contact/countries/search?q=${encodeURIComponent(inputValue)}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      return data.map((country) => ({
        value: country.id,
        iso_code: country.iso_code,
        label: country.name,
        phone_code: country.phone_code
      }));
    } catch (error2) {
      console.error("Country search failed:", error2);
      return [];
    }
  };
  const handleFileSelect = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  const handleImageChange = async (event) => {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setIsLoadingImage(true);
    try {
      const res = await fetch(`${BASE_API2}/photos/upload`, {
        method: "POST",
        credentials: "include",
        body: formData
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.messaged);
      }
      const data = await res.json();
      setProfileImage(`${BASE_API2}/photos/${data == null ? void 0 : data.photo_id}`);
      setUser((prevUser) => prevUser ? {
        ...prevUser,
        photo_id: data == null ? void 0 : data.photo_id
      } : null);
      const updateRes = await fetch(`${BASE_API2}/auth/update-photo`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: user == null ? void 0 : user.id,
          photo_id: data == null ? void 0 : data.photo_id
        })
      });
      if (!updateRes.ok) throw new Error(Lang.profile_update_failed);
      toast.success(Lang.image_upload_success, {
        duration: 2e3
      });
    } catch (error2) {
      toast.error(error2.message || Lang.image_upload_failed, {
        duration: 2e3
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
    if (phone) {
      if (!(selectedCountry == null ? void 0 : selectedCountry.value)) {
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await fetch(`${BASE_API2}/auth/edit`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          address: aboutMe,
          gender,
          date_of_birth: new Date(dob),
          phone_number: phone,
          country_id: selectedCountry == null ? void 0 : selectedCountry.value,
          hotel_name: hotelName
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || Lang.profile_update_failed);
      setUser(data.user);
      toast.success(Lang.profile_update_success, {
        duration: 2e3
      });
    } catch (error2) {
      setError(error2.message);
      toast.error(error2.message);
    } finally {
      setLoading(false);
    }
  };
  const formatPhoneNumber = (value) => {
    if (!(selectedCountry == null ? void 0 : selectedCountry.value)) return value;
    try {
      const phoneNumber = parsePhoneNumberFromString(value, selectedCountry.iso_code);
      return (phoneNumber == null ? void 0 : phoneNumber.formatInternational()) || value;
    } catch (error2) {
      return value;
    }
  };
  if (!user) {
    return /* @__PURE__ */ jsx("div", {
      className: "flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-950",
      children: /* @__PURE__ */ jsx(motion.div, {
        animate: {
          rotate: 360
        },
        transition: {
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        },
        children: /* @__PURE__ */ jsx(FaSpinner, {
          className: "text-4xl text-pink-500"
        })
      })
    });
  }
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "rgba(31, 41, 55, 0.5)",
      borderColor: "#4b5563",
      minHeight: "44px",
      color: "white",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#ec4899"
      }
    }),
    input: (provided) => ({
      ...provided,
      color: "white"
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1f2937",
      border: "1px solid #4b5563",
      borderRadius: "8px",
      overflow: "hidden"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "rgba(236, 72, 153, 0.2)" : "transparent",
      color: state.isFocused ? "white" : "#d1d5db",
      padding: "12px 16px",
      "&:active": {
        backgroundColor: "rgba(236, 72, 153, 0.3)"
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white"
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9ca3af"
    })
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen box py-10 px-4",
    children: [/* @__PURE__ */ jsx(Toaster, {
      position: "top-right"
    }), /* @__PURE__ */ jsxs(motion.div, {
      initial: {
        opacity: 0,
        y: 20
      },
      animate: {
        opacity: 1,
        y: 0
      },
      transition: {
        duration: 0.5
      },
      className: "max-w-5xl mx-auto",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "text-center mb-10",
        children: [/* @__PURE__ */ jsx(motion.h1, {
          className: "text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 mb-4",
          initial: {
            opacity: 0
          },
          animate: {
            opacity: 1
          },
          transition: {
            delay: 0.2
          },
          children: Lang.edit_profile
        }), /* @__PURE__ */ jsx(motion.div, {
          className: "h-1 w-24 bg-gradient-to-r from-sky-500 to-pink-500 mx-auto rounded-full",
          initial: {
            width: 0
          },
          animate: {
            width: "6rem"
          },
          transition: {
            delay: 0.3,
            duration: 0.8
          }
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-white/10 overflow-hidden",
        children: [/* @__PURE__ */ jsx("div", {
          className: "relative p-8",
          children: /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col md:flex-row items-center gap-8",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "relative group",
              children: [/* @__PURE__ */ jsx("div", {
                className: "absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500"
              }), /* @__PURE__ */ jsx(motion.div, {
                whileHover: {
                  scale: 1.05
                },
                className: "relative",
                children: profileImage ? /* @__PURE__ */ jsx("img", {
                  src: profileImage,
                  alt: "User Avatar",
                  className: "w-32 h-32 rounded-full object-cover border-4 border-gray-800"
                }) : /* @__PURE__ */ jsx("div", {
                  className: "w-32 h-32 rounded-full bg-gray-700 border-4 border-gray-800 flex items-center justify-center",
                  children: /* @__PURE__ */ jsx(FaUser, {
                    className: "text-4xl text-gray-400"
                  })
                })
              }), /* @__PURE__ */ jsxs(motion.button, {
                onClick: handleFileSelect,
                whileHover: {
                  scale: 1.05
                },
                whileTap: {
                  scale: 0.95
                },
                className: "absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 rounded-full flex items-center gap-2",
                children: [isLoadingImage ? /* @__PURE__ */ jsx(FaSpinner, {
                  className: "animate-spin"
                }) : /* @__PURE__ */ jsx(FaUpload, {}), /* @__PURE__ */ jsx("span", {
                  className: "text-xs",
                  children: Lang.update
                })]
              }), /* @__PURE__ */ jsx("input", {
                type: "file",
                accept: "image/*",
                className: "hidden",
                name: "image",
                ref: fileInputRef,
                onChange: handleImageChange
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "text-center md:text-left",
              children: [/* @__PURE__ */ jsxs("h2", {
                className: "text-2xl font-bold text-white",
                children: [user.first_name, " ", user.last_name]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-pink-400",
                children: user.email
              })]
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "p-8 bg-gray-900/50 backdrop-blur-sm",
          children: /* @__PURE__ */ jsxs(motion.form, {
            onSubmit: handleSubmit,
            initial: {
              opacity: 0
            },
            animate: {
              opacity: 1
            },
            transition: {
              delay: 0.4
            },
            className: "space-y-6",
            children: [error && /* @__PURE__ */ jsx(motion.div, {
              className: "p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400",
              initial: {
                opacity: 0
              },
              animate: {
                opacity: 1
              },
              children: error
            }), /* @__PURE__ */ jsxs("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-6",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  className: "block text-gray-300 mb-2",
                  children: Lang.first_name
                }), /* @__PURE__ */ jsx("input", {
                  type: "text",
                  value: firstName,
                  onChange: (e) => setFirstName(e.target.value),
                  className: "w-full p-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500",
                  placeholder: Lang.first_name
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  className: "block text-gray-300 mb-2",
                  children: Lang.last_name
                }), /* @__PURE__ */ jsx("input", {
                  type: "text",
                  value: lastName,
                  onChange: (e) => setLastName(e.target.value),
                  className: "w-full p-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500",
                  placeholder: Lang.last_name
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  className: "block text-gray-300 mb-2",
                  children: "Gender"
                }), /* @__PURE__ */ jsxs("select", {
                  value: gender,
                  onChange: (e) => setGender(e.target.value),
                  className: "w-full p-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500",
                  children: [/* @__PURE__ */ jsx("option", {
                    value: "",
                    children: "Select Gender"
                  }), /* @__PURE__ */ jsx("option", {
                    value: "Male",
                    children: "Male"
                  }), /* @__PURE__ */ jsx("option", {
                    value: "Female",
                    children: "Female"
                  }), /* @__PURE__ */ jsx("option", {
                    value: "Other",
                    children: "Other"
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  className: "block text-gray-300 mb-2",
                  children: "Date of Birth"
                }), /* @__PURE__ */ jsx("input", {
                  type: "date",
                  value: dob,
                  onChange: (e) => setDob(e.target.value),
                  className: "w-full p-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  className: "block text-gray-300 mb-2",
                  children: "Hotel Name"
                }), /* @__PURE__ */ jsx("input", {
                  type: "text",
                  value: hotelName,
                  onChange: (e) => setHotelName(e.target.value),
                  className: "w-full p-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500",
                  placeholder: "Your hotel name"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  className: "block text-gray-300 mb-2",
                  children: "Country"
                }), /* @__PURE__ */ jsx(AsyncSelect, {
                  cacheOptions: true,
                  defaultOptions: true,
                  loadOptions: loadCountryOptions,
                  value: selectedCountry,
                  onChange: setSelectedCountry,
                  placeholder: "Search country...",
                  styles: customSelectStyles,
                  className: "react-select-container",
                  classNamePrefix: "react-select",
                  components: {
                    IndicatorSeparator: () => null
                  },
                  theme: (theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary: "#ec4899",
                      primary25: "rgba(236, 72, 153, 0.25)",
                      primary50: "rgba(236, 72, 153, 0.5)",
                      neutral0: "#1f2937",
                      neutral20: "#4b5563",
                      neutral30: "#ec4899",
                      neutral80: "white"
                    }
                  })
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  className: "block text-gray-300 mb-2",
                  children: "Phone Number"
                }), /* @__PURE__ */ jsx("div", {
                  className: "flex",
                  children: /* @__PURE__ */ jsx("input", {
                    type: "tel",
                    value: phone,
                    onChange: (e) => setPhone(formatPhoneNumber(e.target.value)),
                    className: "w-full p-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500",
                    placeholder: selectedCountry ? "Enter phone number" : "Select country first",
                    disabled: !selectedCountry
                  })
                }), phoneError && /* @__PURE__ */ jsx("p", {
                  className: "text-red-400 text-sm mt-1",
                  children: phoneError
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                className: "block text-gray-300 mb-2",
                children: Lang.about_me
              }), /* @__PURE__ */ jsx("textarea", {
                value: aboutMe,
                onChange: (e) => setAboutMe(e.target.value),
                className: "w-full p-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 min-h-[120px]",
                placeholder: Lang.about_yourself
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-right text-xs text-gray-500 mt-1",
                children: [aboutMe.length, "/300 ", Lang.characters]
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "pt-4",
              children: /* @__PURE__ */ jsx(motion.button, {
                type: "submit",
                disabled: loading,
                whileHover: {
                  scale: 1.02
                },
                whileTap: {
                  scale: 0.98
                },
                className: "w-full cursor-pointer md:w-auto bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-3 rounded-lg text-white font-medium shadow-lg hover:shadow-pink-500/20 disabled:opacity-70",
                children: loading ? /* @__PURE__ */ jsxs("span", {
                  className: "flex items-center justify-center gap-2",
                  children: [/* @__PURE__ */ jsx(FaSpinner, {
                    className: "animate-spin"
                  }), Lang.saving]
                }) : Lang.save
              })
            })]
          })
        })]
      })]
    })]
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditProfile,
  meta: meta$8
}, Symbol.toStringTag, { value: "Module" }));
function meta$7({}) {
  return [{
    title: Lang.title + " - " + Lang.dashboard
  }, {
    name: "description",
    content: Lang.welcome_fx + " - " + Lang.dashboard
  }];
}
const Dashboard = withComponentProps(function Dashboard2() {
  useEffect(() => {
    authLoader();
    const message = sessionStorage.getItem("success_message");
    if (message) {
      toast$1.success(sessionStorage.getItem("success_message"), {
        duration: 2e3
      });
      sessionStorage.removeItem("success_message");
    }
  }, []);
  return /* @__PURE__ */ jsxs("span", {
    className: "flex items-center  justify-center py-3 min-h-screen",
    children: [/* @__PURE__ */ jsx(Toaster, {
      position: "top-right",
      reverseOrder: false
    }), "welcome to user dashboard"]
  });
});
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard,
  meta: meta$7
}, Symbol.toStringTag, { value: "Module" }));
function Award() {
  const { fadeUp: fadeUp2, awards } = new Helper();
  return /* @__PURE__ */ jsxs("div", { className: "relative w-full mx-auto  px-6 py-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden -z-10 ", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/4 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-1/3 right-1/4 w-64 h-64 bg-pink-500/15 rounded-full blur-3xl" })
    ] }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        variants: fadeUp2,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-100px" },
        className: "text-center mb-16",
        children: [
          /* @__PURE__ */ jsx(
            motion.h2,
            {
              variants: fadeUp2,
              className: "text-4xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-pink-300 mb-4",
              children: Lang.award_recognition
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              variants: fadeUp2,
              custom: 0.3,
              className: "flex justify-center",
              children: /* @__PURE__ */ jsx("div", { className: "h-1 w-24 bg-gradient-to-r from-sky-500 to-pink-500 rounded-full" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid justify-items-center items-center max-w-5xl grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mx-auto", children: awards.map((award, index) => /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        transition: {
          delay: index * 0.1,
          duration: 0.5,
          type: "spring",
          stiffness: 100
        },
        viewport: { once: true, margin: "-50px" },
        className: "flex justify-center",
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "bg-gradient-to-br from-white/10 to-white/5 p-5 rounded-2xl shadow-lg border border-white/10 backdrop-blur-lg \n            hover:shadow-sky-500/20 hover:-translate-y-2 transition-all duration-300 w-[250px] h-40 flex items-center justify-center\n            relative overflow-hidden group",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-sky-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8),transparent_70%)] opacity-0 group-hover:opacity-20 transition-opacity duration-300" }),
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: award.src,
                  alt: award.alt,
                  className: "h-20 object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                }
              )
            ]
          }
        )
      },
      index
    )) }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: { delay: awards.length * 0.1 + 0.2 },
        className: "text-center mt-16 text-gray-400 italic",
        children: Lang.award_footnote
      }
    )
  ] });
}
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      when: "beforeChildren"
    }
  }
};
const cardItem = {
  hidden: {
    y: 40,
    opacity: 0,
    scale: 0.95
  },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};
function Team({ team }) {
  const { fadeUp: fadeUp2 } = new Helper();
  return /* @__PURE__ */ jsxs("section", { className: "px-4 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        variants: fadeUp2,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-100px" },
        className: "text-center mb-16",
        children: [
          /* @__PURE__ */ jsx(
            motion.h2,
            {
              variants: fadeUp2,
              className: "text-4xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-pink-300 mb-4",
              children: Lang.meet_the_team
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              variants: fadeUp2,
              custom: 0.3,
              className: "flex justify-center",
              children: /* @__PURE__ */ jsx("div", { className: "h-1 w-24 bg-gradient-to-r from-sky-500 to-pink-500 rounded-full" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        variants: container,
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8",
        children: team.map((member, i) => /* @__PURE__ */ jsx(
          motion.div,
          {
            variants: cardItem,
            custom: i * 0.2,
            whileHover: {
              y: -10,
              transition: { duration: 0.3 }
            },
            className: "group",
            children: /* @__PURE__ */ jsx("div", { className: "bg-pink-600/10 -800 rounded-2xl p-1 shadow-xl h-full", children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-900/80 rounded-xl p-6 h-full flex flex-col items-center backdrop-blur-sm border border-white/5 group-hover:border-pink-500/30 transition-all duration-300", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-3xl border border-white/10 shadow-2xl -z-10" }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E] -z-20" }),
              /* @__PURE__ */ jsx("div", { className: "absolute -inset-6 rounded-3xl bg-gradient-to-r from-pink-600/20 to-sky-700/20 blur-2xl opacity-40 -z-30" }),
              /* @__PURE__ */ jsxs("div", { className: "relative mb-5", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-purple-500 to-pink-600 rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500" }),
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: member.image,
                    alt: member.name,
                    width: 120,
                    height: 120,
                    className: "relative w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-gray-800 group-hover:border-pink-500 transition-colors duration-300"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "text-md font-bold text-white group-hover:text-pink-300 transition-colors", children: member.name }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-pink-400 mb-3", children: member.title }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-center text-sm md:text-base flex-grow", children: member.bio }),
              /* @__PURE__ */ jsx("div", { className: "mt-5 flex space-x-3", children: [1, 2, 3].map((i2) => /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border border-white/5 hover:bg-pink-500/10 hover:border-pink-500/30 transition-colors",
                  children: /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-gray-500 group-hover:bg-pink-400" })
                },
                i2
              )) })
            ] }) })
          },
          member.id
        ))
      }
    )
  ] });
}
function Vision$1() {
  const { fadeUp: fadeUp2, container: container2 } = new Helper();
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true, margin: "-100px" },
      variants: container2,
      className: "relative mx-auto w-full py-12 px-6 sm:px-8",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-[2rem] bg-gradient-to-br from-sky-600/20 via-transparent to-pink-600/30 opacity-50 blur-xl -z-10" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-[2rem] bg-[radial-gradient(#ffffff12_1px,transparent_1px)] bg-[length:24px_24px] -z-20 opacity-10" }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx(
            motion.h2,
            {
              variants: fadeUp2,
              className: "text-4xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-pink-300 mb-8",
              children: Lang.our_vision
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              variants: fadeUp2,
              custom: 0.5,
              className: "flex justify-center mb-10",
              children: /* @__PURE__ */ jsx("div", { className: "h-1 w-24 bg-gradient-to-r from-sky-500 to-pink-500 rounded-full" })
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              variants: fadeUp2,
              custom: 1,
              className: "text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto",
              children: Lang.vision_content
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "absolute -top-6 -right-6 w-24 h-24 rounded-full bg-sky-600/20 blur-3xl -z-10" }),
        /* @__PURE__ */ jsx("div", { className: "absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-pink-600/30 blur-3xl -z-10" })
      ]
    }
  );
}
function WhoWeAre() {
  const { fadeUp: fadeUp2, container: container2 } = new Helper();
  return /* @__PURE__ */ jsxs("section", { className: "relative py-8 overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden -z-10", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-1/3 right-1/3 w-80 h-80 bg-sky-600/10 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:16px_16px]" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full mx-auto px-4", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-100px" },
        variants: container2,
        className: "relative",
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-3xl border border-white/10 shadow-2xl -z-10" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E] -z-20" }),
          /* @__PURE__ */ jsx("div", { className: "absolute -inset-6 rounded-3xl bg-gradient-to-r from-pink-600/20 to-sky-700/20 blur-2xl opacity-40 -z-30" }),
          /* @__PURE__ */ jsx("div", { className: "py-16 px-6 md:px-12 lg:px-16", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-12 items-center", children: [
            /* @__PURE__ */ jsx(motion.div, { className: "flex-shrink-0", variants: fadeUp2, children: /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("div", { className: "w-64 h-64 rounded-full bg-gradient-to-r from-sky-500 to-pink-500 p-1", children: /* @__PURE__ */ jsx("div", { className: "w-full h-full rounded-full bg-gray-900 overflow-hidden flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "text-6xl", children: "👥" }) }) }) }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-grow", children: [
              /* @__PURE__ */ jsx(motion.div, { variants: fadeUp2, children: /* @__PURE__ */ jsx("div", { className: "inline-block bg-gradient-to-r from-pink-600 to-purple-600 text-white text-md font-semibold px-4 py-1.5 rounded-full mb-4", children: Lang.about }) }),
              /* @__PURE__ */ jsx(
                motion.h2,
                {
                  variants: fadeUp2,
                  className: "text-4xl md:text-3xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-400",
                  children: Lang.who_we_are
                }
              ),
              /* @__PURE__ */ jsx(
                motion.p,
                {
                  variants: fadeUp2,
                  custom: 1,
                  className: "text-lg text-gray-300 leading-relaxed mb-6",
                  children: Lang.wwr_content
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  variants: fadeUp2,
                  custom: 2,
                  className: "relative pl-6 border-l-2 border-pink-500",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute -left-1 top-0 w-3 h-3 rounded-full bg-pink-500" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl italic text-pink-300 font-medium", children: Lang.wwr_moto })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  className: "grid grid-cols-2 md:grid-cols-3 gap-4 mt-10",
                  variants: fadeUp2,
                  custom: 3,
                  children: [
                    { value: "50+", label: "Happy Customer" },
                    /* { value: "100K+", label: "Active Players" }, */
                    { value: "20+", label: "Team Members" },
                    { value: "10+", label: "Years Experience" }
                  ].map((stat, index) => /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "text-center p-4 bg-gradient-to-b from-gray-900/50 to-transparent rounded-xl border border-white/10",
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-pink-400", children: stat.value }),
                        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400 mt-1", children: stat.label })
                      ]
                    },
                    index
                  ))
                }
              )
            ] })
          ] }) })
        ]
      }
    ) })
  ] });
}
function ImageViewer({
  src,
  heightClass = "h-[60vh] sm:h-[70vh]"
}) {
  return /* @__PURE__ */ jsx("div", { className: `w-full ${heightClass} relative overflow-hidden`, children: /* @__PURE__ */ jsx(
    motion.img,
    {
      src,
      alt: "Banner",
      className: "w-full h-full object-cover shadow-lg",
      animate: {
        scale: [1, 1.05, 1]
      },
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  ) });
}
function meta$6({}) {
  return [{
    title: Lang.title + " | " + Lang.about
  }, {
    name: "description",
    content: Lang.welcome_fx + " - " + Lang.about
  }];
}
const About = withComponentProps(function About2() {
  const {
    team,
    fadeUp: fadeUp2,
    container: container2
  } = new Helper();
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(ImageViewer, {
      src: "/images/about/banner.png"
    }), /* @__PURE__ */ jsxs("section", {
      className: "text-white py-10 px-7 box relative overflow-hidden",
      children: [/* @__PURE__ */ jsx(WhoWeAre, {}), /* @__PURE__ */ jsx(Vision$1, {}), /* @__PURE__ */ jsx(Award, {}), /* @__PURE__ */ jsx(Team, {
        team
      })]
    })]
  });
});
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: About,
  meta: meta$6
}, Symbol.toStringTag, { value: "Module" }));
const contactSchema = z.object({
  name: z.string().min(2, Lang.name_validation),
  email: z.string().email(Lang.email_validation),
  subject: z.string().min(3, Lang.subject_validation),
  message: z.string().min(10, Lang.message_validation)
});
function AnimatedForm() {
  const { BASE_API: BASE_API2 } = new Helper();
  const containerVariants2 = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren"
      }
    }
  };
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });
  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${BASE_API2}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error(Lang.submission_failed);
      toast$1.success(Lang.contact_success_message);
      reset();
    } catch (err) {
      toast$1.error(Lang.submission_failed);
    }
  };
  return /* @__PURE__ */ jsxs(
    motion.form,
    {
      onSubmit: handleSubmit(onSubmit),
      className: "bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E]  rounded-2xl p-8 shadow-2xl border border-white/5 backdrop-blur-sm",
      initial: "hidden",
      animate: "visible",
      variants: containerVariants2,
      children: [
        /* @__PURE__ */ jsxs(motion.div, { variants: fadeUpVariants, className: "mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "name",
                ...register("name"),
                placeholder: " ",
                className: `w-full px-4 py-3  rounded-lg border ${errors.name ? "border-red-500" : "border-gray-700"} focus:outline-none focus:ring-2 focus:ring-pink-500 text-white peer`
              }
            ),
            /* @__PURE__ */ jsx(
              "label",
              {
                htmlFor: "name",
                className: "absolute left-4 top-3 text-gray-400 transition-all duration-300 \n                  peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs\n                  peer-placeholder-shown:text-base peer-focus:text-pink-400 -top-3 text-xs bg-gray-900 px-1",
                children: Lang.name
              }
            )
          ] }),
          errors.name && /* @__PURE__ */ jsx("p", { className: "text-red-400 text-sm mt-2", children: errors.name.message })
        ] }),
        /* @__PURE__ */ jsxs(motion.div, { variants: fadeUpVariants, className: "mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "email",
                type: "email",
                ...register("email"),
                placeholder: " ",
                className: `w-full px-4 py-3  rounded-lg border ${errors.email ? "border-red-500" : "border-gray-700"} focus:outline-none focus:ring-2 focus:ring-pink-500 text-white peer`
              }
            ),
            /* @__PURE__ */ jsx(
              "label",
              {
                htmlFor: "email",
                className: "absolute left-4 top-3 text-gray-400 transition-all duration-300 \n                  peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs\n                  peer-placeholder-shown:text-base peer-focus:text-pink-400 -top-3 text-xs bg-gray-900 px-1",
                children: Lang.email
              }
            )
          ] }),
          errors.email && /* @__PURE__ */ jsx("p", { className: "text-red-400 text-sm mt-2", children: errors.email.message })
        ] }),
        /* @__PURE__ */ jsxs(motion.div, { variants: fadeUpVariants, className: "mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "subject",
                ...register("subject"),
                placeholder: " ",
                className: `w-full px-4 py-3 rounded-lg border ${errors.subject ? "border-red-500" : "border-gray-700"} focus:outline-none focus:ring-2 focus:ring-pink-500 text-white peer`
              }
            ),
            /* @__PURE__ */ jsx(
              "label",
              {
                htmlFor: "subject",
                className: "absolute left-4 top-3 text-gray-400 transition-all duration-300 \n                  peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs\n                  peer-placeholder-shown:text-base peer-focus:text-pink-400 -top-3 text-xs bg-gray-900 px-1",
                children: Lang.subject
              }
            )
          ] }),
          errors.subject && /* @__PURE__ */ jsx("p", { className: "text-red-400 text-sm mt-2", children: errors.subject.message })
        ] }),
        /* @__PURE__ */ jsxs(motion.div, { variants: fadeUpVariants, className: "mb-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: "message",
                ...register("message"),
                placeholder: " ",
                rows: 5,
                className: `w-full px-4 py-3 rounded-lg border ${errors.message ? "border-red-500" : "border-gray-700"} focus:outline-none focus:ring-2 focus:ring-pink-500 text-white peer resize-none`
              }
            ),
            /* @__PURE__ */ jsx(
              "label",
              {
                htmlFor: "message",
                className: "absolute left-4 top-3 text-gray-400 transition-all duration-300 \n                  peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs\n                  peer-placeholder-shown:text-base peer-focus:text-pink-400 -top-3 text-xs bg-gray-900 px-1",
                children: Lang.message
              }
            )
          ] }),
          errors.message && /* @__PURE__ */ jsx("p", { className: "text-red-400 text-sm mt-2", children: errors.message.message })
        ] }),
        /* @__PURE__ */ jsxs(
          motion.button,
          {
            type: "submit",
            disabled: isSubmitting,
            variants: fadeUpVariants,
            whileHover: {
              scale: 1.03
            },
            whileTap: { scale: 0.98 },
            className: "w-full cursor-pointer bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-4 rounded-lg \n                        text-white font-bold text-lg disabled:opacity-70 relative overflow-hidden",
            children: [
              isSubmitting ? /* @__PURE__ */ jsxs(
                motion.span,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  className: "flex items-center justify-center gap-2",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "h-4 w-4 rounded-full border-2 border-t-transparent animate-spin" }),
                    Lang.sending
                  ]
                }
              ) : /* @__PURE__ */ jsx(motion.span, { initial: { opacity: 0 }, animate: { opacity: 1 }, children: Lang.send_message }),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  className: "absolute inset-0 bg-white opacity-0",
                  initial: { opacity: 0 },
                  whileHover: { opacity: 0.1, transition: { duration: 0.3 } }
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function Vision() {
  const { fadeUp: fadeUp2, container: container2 } = new Helper();
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: "bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E] rounded-2xl p-8 shadow-2xl border border-white/5 backdrop-blur-sm",
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6 },
      children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: Lang.get_in_touch }),
        /* @__PURE__ */ jsx("div", { className: "space-y-6", children: [1, 2, 3].map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-3 h-3 bg-pink-400 rounded-full" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "font-semibold text-white", children: [
              "Contact Method ",
              item
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 mt-1", children: "contact@example.com" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "+1 (555) 123-4567" })
          ] })
        ] }, item)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-semibold text-white mb-4", children: Lang.follow_us }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(
              motion.div,
              {
                whileHover: { y: -5 },
                className: "w-8 h-8 rounded-full flex items-center justify-center border border-white/5 hover:bg-pink-500/10 hover:border-pink-500/30 cursor-pointer",
                children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "#",
                    className: "w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-r from-pink-600 to-purple-600 transition-all",
                    children: /* @__PURE__ */ jsx(FaFacebook, { className: "w-8 h-8" })
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                whileHover: { y: -5 },
                className: "w-8 h-8 rounded-full flex items-center justify-center border border-white/5 hover:bg-pink-500/10 hover:border-pink-500/30 cursor-pointer",
                children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "#",
                    className: "w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-r from-pink-600 to-purple-600 transition-all",
                    children: /* @__PURE__ */ jsx(FaInstagram, { className: "w-8 h-8" })
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                whileHover: { y: -5 },
                className: "w-10 h-10 rounded-full flex items-center justify-center border border-white/5 hover:bg-pink-500/10 hover:border-pink-500/30 cursor-pointer",
                children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "#",
                    className: "w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-r from-pink-600 to-purple-600 transition-all",
                    children: /* @__PURE__ */ jsx(FaLinkedinIn, { className: "w-8 h-8" })
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                whileHover: { y: -5 },
                className: "w-8 h-8 flex items-center justify-center border border-white/5 hover:bg-pink-500/10 hover:border-pink-500/30 cursor-pointer",
                children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "#",
                    className: "w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center transition-all",
                    children: /* @__PURE__ */ jsx(FaYoutubeSquare, { className: "w-8 h-8" })
                  }
                )
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function ContactForm() {
  return /* @__PURE__ */ jsx("div", { className: "box py-10 px-10", children: /* @__PURE__ */ jsxs("div", { className: " mx-auto", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "text-center mb-16 relative",
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -top-10 -left-10 w-32 h-32 bg-pink-600/20 rounded-full blur-3xl" }),
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-5 -right-10 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl" }),
          /* @__PURE__ */ jsx(motion.h1, { className: "text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300 mb-4", children: Lang.contact_details }),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "h-1 w-24 bg-gradient-to-r from-blue-500 to-pink-500 mx-auto rounded-full",
              initial: { width: 0 },
              animate: { width: "6rem" },
              transition: { delay: 0.3, duration: 0.8 }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-start", children: [
      /* @__PURE__ */ jsx(Vision, {}),
      /* @__PURE__ */ jsx(AnimatedForm, {})
    ] })
  ] }) });
}
function Map() {
  return /* @__PURE__ */ jsxs("div", { className: "relative py-16 px-10 overflow-hidden box", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-20 left-10 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-10 right-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "mx-auto",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.8 },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
            /* @__PURE__ */ jsx(
              motion.h2,
              {
                className: "text-3xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 mb-4",
                initial: { y: -30, opacity: 0 },
                animate: { y: 0, opacity: 1 },
                transition: { duration: 0.6 },
                children: Lang.find_us
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "h-1 w-24 bg-gradient-to-r from-blue-500 to-pink-500 mx-auto rounded-full",
                initial: { width: 0 },
                animate: { width: "6rem" },
                transition: { delay: 0.3, duration: 0.8 }
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8 items-stretch", children: [
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                className: "w-full lg:w-2/3 h-[500px] rounded-2xl overflow-hidden shadow-2xl relative",
                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.7 },
                whileHover: { scale: 1.01 },
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl pointer-events-none" }),
                  /* @__PURE__ */ jsx(
                    "iframe",
                    {
                      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2218.1510550659586!2d5.119289576165273!3d52.0954435675763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c66f45c2d679e3%3A0x25dedc098a5a2bce!2sEye%20Hotel!5e1!3m2!1sen!2sit!4v1753642965517!5m2!1sen!2sit",
                      width: "100%",
                      height: "100%",
                      loading: "lazy",
                      className: "absolute inset-0",
                      style: { border: 0 },
                      allowFullScreen: true
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "w-full lg:w-1/3 rounded-2xl overflow-hidden",
                initial: { opacity: 0, x: 30 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.5, delay: 0.2 },
                children: /* @__PURE__ */ jsxs("div", { className: "h-full bg-gradient-to-br from-gray-800 to-gray-900 p-8 shadow-2xl border border-white/5 backdrop-blur-sm rounded-2xl flex flex-col", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsx(
                      motion.h2,
                      {
                        className: "text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 mb-6",
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        transition: { delay: 0.4 },
                        children: Lang.title
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
                        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center", children: /* @__PURE__ */ jsx(
                          "svg",
                          {
                            className: "w-6 h-6 text-pink-400",
                            fill: "currentColor",
                            viewBox: "0 0 20 20",
                            children: /* @__PURE__ */ jsx(
                              "path",
                              {
                                fillRule: "evenodd",
                                d: "M5.05 5.05a7 7 0 019.9 9.9l-4.242 4.243a1 1 0 01-1.415 0L5.05 14.95a7 7 0 010-9.9zm4.243 1.414a1.5 1.5 0 100 3 1.5 1.5 0 000-3z",
                                clipRule: "evenodd"
                              }
                            )
                          }
                        ) }),
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-white", children: Lang.address }),
                          /* @__PURE__ */ jsxs("p", { className: "text-gray-300 mt-2", children: [
                            "Wijde Begijnestraat 1-3,",
                            /* @__PURE__ */ jsx("br", {}),
                            "3512 AW Utrecht, Netherlands"
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
                        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center", children: /* @__PURE__ */ jsxs(
                          "svg",
                          {
                            className: "w-6 h-6 text-pink-400",
                            fill: "currentColor",
                            viewBox: "0 0 20 20",
                            children: [
                              /* @__PURE__ */ jsx("path", { d: "M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" }),
                              /* @__PURE__ */ jsx("path", { d: "M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" })
                            ]
                          }
                        ) }),
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-white", children: Lang.email }),
                          /* @__PURE__ */ jsx(
                            motion.a,
                            {
                              href: "mailto:info@company.com",
                              className: "text-pink-400 hover:text-pink-300 transition-colors block mt-2",
                              whileHover: { x: 5 },
                              children: Lang.contact_email
                            }
                          )
                        ] })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      className: "mt-10 pt-6 border-t border-white/10",
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      transition: { delay: 0.6 },
                      children: [
                        /* @__PURE__ */ jsxs("h3", { className: "font-semibold text-white mb-4", children: [
                          Lang.working_hours,
                          " :"
                        ] }),
                        /* @__PURE__ */ jsxs("p", { className: "text-gray-300", children: [
                          Lang.mon_fri,
                          ": 9:00 - 18:00",
                          /* @__PURE__ */ jsx("br", {}),
                          Lang.sat,
                          " - ",
                          Lang.sun,
                          ": ",
                          Lang.closed
                        ] })
                      ]
                    }
                  )
                ] })
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function meta$5({}) {
  return [{
    title: Lang.title + " - " + Lang.contact
  }, {
    name: "description",
    content: Lang.welcome_fx + " - " + Lang.contact
  }];
}
const Contact = withComponentProps(function Contact2() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(ImageViewer, {
      src: "/images/contact/banner.png"
    }), /* @__PURE__ */ jsx(ContactForm, {}), /* @__PURE__ */ jsx(Map, {})]
  });
});
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Contact,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
function CustomSelect({
  label,
  value,
  options,
  onChange
}) {
  const isObjectOptions = typeof options[0] === "object";
  const displayLabel = () => {
    if (value === "") return label;
    if (!isObjectOptions) return value;
    const found = options.find(
      (opt) => opt.value === value
    );
    return (found == null ? void 0 : found.label) || value;
  };
  return /* @__PURE__ */ jsx(Listbox, { value, onChange, children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs(Listbox.Button, { className: "relative w-40 cursor-pointer rounded bg-gray-800 py-2 pl-3 pr-10 text-left text-white focus:outline-none focus:ring-2 focus:ring-[#D90479]", children: [
      /* @__PURE__ */ jsx("span", { className: "block truncate", children: displayLabel() }),
      /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2", children: /* @__PURE__ */ jsx(
        ChevronUpDownIcon,
        {
          className: "h-5 w-5 text-gray-400",
          "aria-hidden": "true"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs(Listbox.Options, { className: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-gray-900 py-1 text-white shadow-lg ring-1 ring-black/10 focus:outline-none", children: [
      /* @__PURE__ */ jsx(
        Listbox.Option,
        {
          value: "",
          className: ({ active }) => `cursor-pointer select-none px-4 py-2 ${active ? "bg-[#D90479]" : ""}`,
          children: label
        }
      ),
      options.map((option) => {
        const val = typeof option === "string" ? option : option.value;
        const text = typeof option === "string" ? option : option.label;
        return /* @__PURE__ */ jsx(
          Listbox.Option,
          {
            value: val,
            className: ({ active }) => `cursor-pointer select-none px-4 py-2 ${active ? "bg-[#D90479]" : ""}`,
            children: text
          },
          val
        );
      })
    ] })
  ] }) });
}
function GameFilter({
  searchTerm,
  setSearchTerm,
  featureFilter,
  setFeatureFilter,
  typeFilter,
  setTypeFilter,
  categoryFilter,
  setCategoryFilter,
  sortOption,
  setSortOption
}) {
  const { gamesFilterData } = new Helper();
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-between items-center mb-6 gap-4", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        placeholder: Lang.search_game,
        value: searchTerm,
        onChange: (e) => setSearchTerm(e.target.value),
        className: "p-2 rounded bg-gray-800 text-white w-full sm:w-1/4 outline-none focus:ring-2 focus:ring-[#D90479]"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsx(
        CustomSelect,
        {
          label: Lang.features,
          value: featureFilter,
          options: gamesFilterData.features,
          onChange: setFeatureFilter
        }
      ),
      /* @__PURE__ */ jsx(
        CustomSelect,
        {
          label: Lang.game_type,
          value: typeFilter,
          options: gamesFilterData.types,
          onChange: setTypeFilter
        }
      ),
      /* @__PURE__ */ jsx(
        CustomSelect,
        {
          label: Lang.categories,
          value: categoryFilter,
          options: gamesFilterData.categories,
          onChange: setCategoryFilter
        }
      ),
      /* @__PURE__ */ jsx(
        CustomSelect,
        {
          label: Lang.sort_by,
          value: sortOption,
          options: gamesFilterData.sortOptions,
          onChange: setSortOption
        }
      )
    ] })
  ] });
}
function GamesGrid({
  games,
  visibleCount,
  loadMore,
  parentRef
}) {
  const visibleGames = games.slice(0, visibleCount);
  const defaultImage = "/images/games/mock.png";
  const gameImages = [
    "/images/products/other-section/dragon.png",
    "/images/products/other-section/golden.png",
    "/images/products/other-section/cheers.png",
    "/images/products/other-section/book.png",
    "/images/products/other-section/wonder.png",
    "/images/products/other-section/pirates.png"
  ];
  const imageUsageCount = {};
  gameImages.forEach((img) => imageUsageCount[img] = 0);
  const shuffledOnce = [...gameImages].sort(() => 0.5 - Math.random());
  const shuffledTwice = [...gameImages].sort(() => 0.5 - Math.random());
  const gameImageMap = {};
  let firstIndex = 0;
  let secondIndex = 0;
  visibleGames.forEach((game) => {
    let assignedImage = defaultImage;
    if (firstIndex < shuffledOnce.length) {
      assignedImage = shuffledOnce[firstIndex];
      imageUsageCount[assignedImage]++;
      firstIndex++;
    } else if (secondIndex < shuffledTwice.length) {
      const candidate = shuffledTwice[secondIndex];
      if (imageUsageCount[candidate] < 2) {
        assignedImage = candidate;
        imageUsageCount[candidate]++;
        secondIndex++;
      }
    }
    gameImageMap[game.id] = assignedImage;
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: parentRef,
        className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4",
        children: visibleGames.map((game, index) => {
          const imageToUse = gameImageMap[game.id];
          return /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.4, delay: index * 0.05 },
              className: "bg-gray-400/10 rounded-xl p-6 shadow-lg border border-white/10 hover:border-pink-500 hover:scale-105 transition duration-300",
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "relative h-60 w-full overflow-hidden rounded-xl bg-center bg-cover shadow-md",
                    style: {
                      backgroundImage: `url('${imageToUse}')`
                    },
                    children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-opacity-40" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    className: "text-white text-center py-2 font-bold text-base tracking-wide drop-shadow-lg",
                    initial: { opacity: 0, scale: 0.95, y: 10 },
                    animate: { opacity: 1, scale: 1, y: 0 },
                    transition: { duration: 0.5, ease: "easeOut" },
                    whileHover: {
                      scale: 1.05,
                      textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)"
                    },
                    children: game.name
                  }
                ),
                /* @__PURE__ */ jsx(motion.p, { className: "text-white text-center py-2 font-bold text-base tracking-wide drop-shadow-lg", children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `/game/${game.id}`,
                    className: "mt-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-1 lg:px-3 md:px-3 sm:px-1 py-1 rounded-md hover:scale-105 transition",
                    children: Lang.game_info
                  }
                ) })
              ]
            },
            game.id
          );
        })
      }
    ),
    visibleCount < games.length && /* @__PURE__ */ jsx("div", { className: "text-center mt-6", children: /* @__PURE__ */ jsx(
      motion.button,
      {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        onClick: loadMore,
        className: "bg-gradient-to-r from-pink-600 to-purple-600 px-5 py-2 rounded cursor-pointer transition",
        children: Lang.load_more
      }
    ) })
  ] });
}
function meta$4({}) {
  return [{
    title: Lang.title + " - " + Lang.games
  }, {
    name: "description",
    content: Lang.welcome_fx + " - " + Lang.games
  }];
}
const Games = withComponentProps(function Games2() {
  const [visibleCount, setVisibleCount] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const [featureFilter, setFeatureFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const parentRef = useRef(null);
  useEffect(() => {
    parentRef.current && autoAnimate(parentRef.current);
  }, [parentRef]);
  const {
    mockGameList,
    gamesFilterData
  } = new Helper();
  const filteredGames = mockGameList.filter((game) => game.name.toLowerCase().includes(searchTerm.toLowerCase())).filter((game) => featureFilter ? game.feature === featureFilter : true).filter((game) => typeFilter ? game.type === typeFilter : true).filter((game) => categoryFilter ? game.category === categoryFilter : true).sort((a, b) => {
    if (sortOption === "name-asc") return a.name.localeCompare(b.name);
    if (sortOption === "name-desc") return b.name.localeCompare(a.name);
    return 0;
  });
  filteredGames.slice(0, visibleCount);
  const loadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs("div", {
      className: "min-h-screen px-10 box text-white py-10",
      children: [/* @__PURE__ */ jsx(Toaster, {
        position: "top-right"
      }), /* @__PURE__ */ jsx(GameFilter, {
        searchTerm,
        setSearchTerm,
        featureFilter,
        setFeatureFilter,
        typeFilter,
        setTypeFilter,
        categoryFilter,
        setCategoryFilter,
        setSortOption,
        sortOption
      }), /* @__PURE__ */ jsx(GamesGrid, {
        games: filteredGames,
        visibleCount,
        loadMore,
        parentRef
      })]
    })
  });
});
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Games,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
function NewsFilter({
  activeFilter,
  setActiveFilter,
  fadeIn: fadeIn2,
  getTypeLabel
}) {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "flex flex-wrap justify-center gap-3 mb-12",
      variants: fadeIn2,
      children: ["all", "blog", "announcement", "event", "diary"].map(
        (type) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setActiveFilter(type),
            className: `px-5 py-2 rounded-full text-sm cursor-pointer font-medium transition-all ${activeFilter === type ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`,
            children: type === "all" ? "All News" : getTypeLabel(type)
          },
          type
        )
      )
    }
  );
}
function NewsGrid({
  items,
  fadeIn: fadeIn2,
  isLoading,
  activeFilter,
  getTypeLabel,
  getTypeColor
}) {
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500" }) });
  }
  if (!isLoading && items.length === 0) {
    return /* @__PURE__ */ jsxs(motion.div, { className: "text-center py-20", variants: fadeIn2, children: [
      /* @__PURE__ */ jsx("div", { className: "text-5xl mb-4", children: "📰" }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-2", children: "No content found" }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-400 max-w-md mx-auto", children: [
        "We couldn't find any",
        " ",
        activeFilter === "all" ? "content" : getTypeLabel(activeFilter),
        " ",
        "matching your criteria."
      ] })
    ] });
  }
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: items.map((item) => /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: "bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E] rounded-2xl overflow-hidden border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col",
      variants: fadeIn2,
      whileHover: { y: -10 },
      children: [
        item.image ? /* @__PURE__ */ jsx("div", { className: "h-48 bg-gray-800 overflow-hidden", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: item.image,
            alt: item.title,
            className: "w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          }
        ) }) : /* @__PURE__ */ jsx("div", { className: "h-48 flex items-center justify-center bg-gradient-to-br from-purple-900/30 to-pink-900/30", children: /* @__PURE__ */ jsx("div", { className: "text-5xl opacity-30", children: "🎮" }) }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 flex flex-col flex-grow", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-3", children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `${getTypeColor(
                  item.type
                )} text-white text-xs px-3 py-1 rounded-full`,
                children: getTypeLabel(item.type)
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: item.date })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-3", children: item.title }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-4 flex-grow", children: item.excerpt }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mt-auto pt-4 border-t border-white/10", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500", children: [
              item.category && /* @__PURE__ */ jsxs("span", { children: [
                item.category,
                " • "
              ] }),
              item.author && /* @__PURE__ */ jsxs("span", { children: [
                "By ",
                item.author
              ] }),
              item.readTime && /* @__PURE__ */ jsxs("span", { children: [
                " • ",
                item.readTime
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              Link,
              {
                to: `/blogs/${item.id}`,
                className: "inline-block text-sm text-pink-500 hover:text-pink-400 font-medium hover:underline",
                children: Lang.read_more_symbol
              }
            )
          ] })
        ] })
      ]
    },
    item.id
  )) });
}
function meta$3({}) {
  return [{
    title: Lang.title + " - " + Lang.news
  }, {
    name: "description",
    content: Lang.welcome_fx + " - " + Lang.news
  }];
}
const News = withComponentProps(function News2() {
  const {
    newsContent,
    fadeIn: fadeIn2,
    getTypeLabel,
    getTypeColor
  } = new Helper();
  const [activeFilter, setActiveFilter] = useState("all");
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setContent(newsContent);
      setIsLoading(false);
    }, 800);
  }, []);
  const filteredContent = activeFilter === "all" ? content : content.filter((item) => item.type === activeFilter);
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen box text-white py-10 px-10 sm:px-6 lg:px-10",
    children: [/* @__PURE__ */ jsx(Toaster, {
      position: "top-right",
      reverseOrder: false
    }), /* @__PURE__ */ jsxs(motion.div, {
      className: "text-center mb-16",
      initial: "hidden",
      animate: "visible",
      variants: fadeIn2,
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-pink-400",
        children: Lang.news_event
      }), /* @__PURE__ */ jsx("p", {
        className: "text-xl text-gray-300 max-w-3xl mx-auto",
        children: Lang.news_event_content
      })]
    }), /* @__PURE__ */ jsx(NewsFilter, {
      activeFilter,
      setActiveFilter,
      fadeIn: fadeIn2,
      getTypeLabel
    }), /* @__PURE__ */ jsx(NewsGrid, {
      items: filteredContent,
      fadeIn: fadeIn2,
      isLoading,
      activeFilter,
      getTypeLabel,
      getTypeColor
    })]
  });
});
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: News,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
function CTA() {
  const { fadeIn: fadeIn2 } = new Helper();
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "text-center",
      initial: "hidden",
      animate: "visible",
      variants: fadeIn2,
      children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E] rounded-2xl p-12 border border-white/10 shadow-2xl max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-pink-300", children: Lang.create_something }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-xl mb-10 max-w-2xl mx-auto", children: Lang.create_something_details }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/contact",
            className: "bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold sm:text-sm lg:text-lg md:text-lg py-4 px-10 rounded-full inline-block hover:scale-[1.03] transition-transform hover:shadow-xl",
            children: Lang.parter_with_us
          }
        )
      ] })
    }
  );
}
function CoreServices() {
  const { fadeIn: fadeIn2, staggerContainer, coreServices } = new Helper();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "text-center mb-20",
        initial: "hidden",
        animate: "visible",
        variants: fadeIn2,
        children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-pink-300 mb-8", children: Lang.ouer_service }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-300 max-w-3xl mx-auto", children: Lang.ouer_service_details })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "mb-28",
        initial: "hidden",
        animate: "visible",
        variants: staggerContainer,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-16", children: /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl", children: [
            /* @__PURE__ */ jsx(
              motion.h2,
              {
                className: "text-3xl font-bold mb-4 text-pink-400",
                variants: fadeIn2,
                children: Lang.core_service
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "h-1 w-24 bg-gradient-to-r from-sky-500 to-pink-500 mx-auto mb-8 rounded-full",
                variants: fadeIn2
              }
            ),
            /* @__PURE__ */ jsx(motion.p, { className: "text-gray-400 text-lg", variants: fadeIn2, children: Lang.core_service_details })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: coreServices.map((service, index) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: "bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E] p-8 rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col",
              variants: fadeIn2,
              whileHover: { y: -10 },
              children: [
                /* @__PURE__ */ jsx("div", { className: "text-5xl mb-6", children: service.icon }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4", children: service.title }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 flex-grow text-justify", children: service.description })
              ]
            },
            index
          )) })
        ]
      }
    )
  ] });
}
function Process() {
  const { fadeIn: fadeIn2, staggerContainer, processSteps } = new Helper();
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: "mb-28",
      initial: "hidden",
      animate: "visible",
      variants: staggerContainer,
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-16", children: /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl", children: [
          /* @__PURE__ */ jsx(
            motion.h2,
            {
              className: "text-3xl font-bold mb-4 text-pink-400",
              variants: fadeIn2,
              children: Lang.development_process
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "h-1 w-24 bg-gradient-to-r from-sky-500 to-pink-500 mx-auto mb-8 rounded-full",
              variants: fadeIn2
            }
          ),
          /* @__PURE__ */ jsx(motion.p, { className: "text-gray-400 text-lg", variants: fadeIn2, children: Lang.development_process_details })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-r from-sky-500 to-pink-500 hidden md:block" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-12 md:space-y-0", children: processSteps.map((step, index) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: "relative flex flex-col md:flex-row items-center",
              variants: fadeIn2,
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left md:ml-auto"}`,
                    children: /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: `bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E] p-6 rounded-2xl border border-white/10 shadow-xl ${index % 2 === 0 ? "md:mr-0" : "md:ml-0"}`,
                        children: [
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: "absolute top-0 -mt-4 left-1/2 transform -translate-x-1/2 md:left-auto md:transform-none md:-translate-x-0 w-8 h-8 rounded-full bg-gradient-to-r from-sky-500 to-pink-500 flex items-center justify-center text-white font-bold md:top-1/2 md:-mt-4 md:-translate-y-1/2",
                              style: index % 2 === 0 ? { right: "-4px", left: "auto" } : { left: "-4px" },
                              children: step.step
                            }
                          ),
                          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2 text-pink-200", children: step.title }),
                          /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: step.description })
                        ]
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-r from-sky-500 to-pink-500 flex items-center justify-center text-white font-bold mx-auto my-4 md:hidden", children: step.step }),
                index % 2 === 0 ? /* @__PURE__ */ jsx("div", { className: "hidden md:block md:w-1/2" }) : null
              ]
            },
            index
          )) })
        ] })
      ]
    }
  );
}
function WCU() {
  const { fadeIn: fadeIn2, staggerContainer, differentiators } = new Helper();
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: "mb-28",
      initial: "hidden",
      animate: "visible",
      variants: staggerContainer,
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-16", children: /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl", children: [
          /* @__PURE__ */ jsx(
            motion.h2,
            {
              className: "text-3xl font-bold mb-4 text-pink-400",
              variants: fadeIn2,
              children: Lang.wcu
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "h-1 w-24 bg-gradient-to-r from-sky-300 to-pink-300 mx-auto mb-8 rounded-full",
              variants: fadeIn2
            }
          ),
          /* @__PURE__ */ jsx(motion.p, { className: "text-gray-400 text-lg", variants: fadeIn2, children: Lang.wcu_details })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: differentiators.map((item, index) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: "bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E] p-8 rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col items-center text-center",
            variants: fadeIn2,
            whileHover: { y: -10 },
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-gradient-to-r from-sky-500 to-pink-500 flex items-center justify-center text-xl mb-6", children: index + 1 }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-3", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: item.description })
            ]
          },
          index
        )) })
      ]
    }
  );
}
function meta$2({}) {
  return [{
    title: Lang.title + " | " + Lang.service
  }, {
    name: "description",
    content: Lang.welcome_fx + " - " + Lang.service
  }];
}
const Services = withComponentProps(function Services2() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen text-white px-10 py-20 box sm:px-6 lg:px-8",
    children: [/* @__PURE__ */ jsx(CoreServices, {}), /* @__PURE__ */ jsx(Process, {}), /* @__PURE__ */ jsx(WCU, {}), /* @__PURE__ */ jsx(CTA, {})]
  });
});
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Services,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};
function AdditionalInformation({ gameDetails }) {
  var _a;
  const cleanedDateStr = ((_a = gameDetails.releaseDate) == null ? void 0 : _a.replace(/\u2011/g, "-")) || "";
  const parsedDate = new Date(cleanedDateStr);
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "mt-6 w-full mb-6",
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true },
      variants: { visible: { transition: { staggerChildren: 0.15 } } },
      children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          variants: fadeInUp,
          className: "bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E] rounded-2xl border border-white/10 shadow-2xl p-6 md:p-10",
          children: [
            /* @__PURE__ */ jsx(
              motion.h2,
              {
                className: "text-2xl font-bold mb-6 text-pink-400 tracking-wide",
                variants: fadeInUp,
                children: Lang.additional_information
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                className: "grid grid-cols-1 md:grid-cols-2 gap-8",
                variants: fadeInUp,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
                    /* @__PURE__ */ jsxs(motion.div, { variants: fadeInUp, children: [
                      /* @__PURE__ */ jsx("h4", { className: "text-pink-300 font-semibold mb-1", children: Lang.developer }),
                      /* @__PURE__ */ jsx("p", { className: "text-white/80", children: gameDetails.provider })
                    ] }),
                    /* @__PURE__ */ jsxs(motion.div, { variants: fadeInUp, children: [
                      /* @__PURE__ */ jsx("h4", { className: "text-pink-300 font-semibold mb-1", children: Lang.support_multilingual }),
                      /* @__PURE__ */ jsx("p", { className: "text-white/80", children: gameDetails.multiLanguage ? "Yes" : "No" })
                    ] }),
                    /* @__PURE__ */ jsxs(motion.div, { variants: fadeInUp, children: [
                      /* @__PURE__ */ jsx("h4", { className: "text-pink-300 font-semibold mb-1", children: Lang.release_date }),
                      /* @__PURE__ */ jsx("p", { className: "text-white/80", children: !isNaN(parsedDate.getTime()) ? format(parsedDate, "d MMMM yyyy") : "Unknown" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
                    /* @__PURE__ */ jsxs(motion.div, { variants: fadeInUp, children: [
                      /* @__PURE__ */ jsx("h4", { className: "text-pink-300 font-semibold mb-1", children: Lang.hit_rate }),
                      /* @__PURE__ */ jsx("p", { className: "text-white/80", children: gameDetails.hitFrequency })
                    ] }),
                    /* @__PURE__ */ jsxs(motion.div, { variants: fadeInUp, children: [
                      /* @__PURE__ */ jsx("h4", { className: "text-pink-300 font-semibold mb-1", children: Lang.max_bet }),
                      /* @__PURE__ */ jsx("p", { className: "text-white/80", children: gameDetails.maxBet })
                    ] }),
                    gameDetails.platforms && /* @__PURE__ */ jsxs(motion.div, { variants: fadeInUp, children: [
                      /* @__PURE__ */ jsx("h4", { className: "text-pink-300 font-semibold mb-1", children: Lang.platform }),
                      /* @__PURE__ */ jsx("p", { className: "text-white/80", children: gameDetails.platforms.join(", ") })
                    ] })
                  ] })
                ]
              }
            )
          ]
        }
      )
    }
  );
}
function OtherSection() {
  const { otherSection: games } = new Helper();
  return /* @__PURE__ */ jsxs("section", { className: "bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E] text-white px-6 py-10 rounded-2xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl text-pink-400 font-semibold", children: Lang.other_by_commodore }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/games",
          className: " text-gray-200 rounded-full px-5 py-1.5 text-sm bg-gradient-to-r from-pink-600 to-purple-600 hover:scale-[1.05]",
          children: Lang.see_more
        }
      )
    ] }),
    /* @__PURE__ */ jsx("hr", { className: "border-white/20 mb-6" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6", children: games.map((game, idx) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "rounded-xl overflow-hidden mb-2", children: /* @__PURE__ */ jsx("a", { href: "/", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: game.image,
          alt: game.title,
          className: "w-full h-52 object-cover"
        }
      ) }) }),
      /* @__PURE__ */ jsx("a", { href: "/game/1", children: /* @__PURE__ */ jsx("h3", { className: "font-semibold text-center text-white", children: game.title }) })
    ] }, idx)) })
  ] });
}
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};
function GameDetails({ gameDetails }) {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: "mt-16 backdrop-blur-md rounded-xl p-8",
      initial: "hidden",
      animate: "visible",
      variants: containerVariants,
      children: [
        /* @__PURE__ */ jsx(
          motion.hr,
          {
            className: "border-pink-500 w-1/2 mx-auto mb-6",
            variants: fadeUp
          }
        ),
        /* @__PURE__ */ jsxs(motion.div, { className: "space-y-6", variants: fadeUp, children: [
          /* @__PURE__ */ jsx(
            motion.h2,
            {
              className: "text-3xl font-extrabold text-center text-pink-400 tracking-wide",
              variants: fadeUp,
              children: gameDetails.gameName
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              className: "text-base text-white/80 leading-relaxed text-justify",
              variants: fadeUp,
              children: gameDetails.description
            }
          ),
          /* @__PURE__ */ jsxs(motion.div, { className: "mt-10", variants: fadeUp, children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold text-pink-500 mb-4", children: Lang.features }),
            /* @__PURE__ */ jsx(
              motion.ul,
              {
                className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-white/90",
                variants: fadeUp,
                children: gameDetails.featureDescriptions.map((item, idx) => /* @__PURE__ */ jsxs(
                  motion.li,
                  {
                    className: "bg-white/10 border border-white/10 rounded-lg p-4 hover:border-pink-500 hover:scale-[1.02] transition-all duration-300",
                    variants: fadeUp,
                    children: [
                      /* @__PURE__ */ jsx("strong", { className: "text-pink-400", children: item.name }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm mt-1 text-white/80 leading-snug", children: item.description })
                    ]
                  },
                  idx
                ))
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function GameSlider() {
  const { gameDetails } = new Helper();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionKey, setTransitionKey] = useState(Date.now());
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const thumbnailRef = useRef(null);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const autoScrollThumbRef = useRef(null);
  const scrollToThumb = (index) => {
    const container2 = thumbnailRef.current;
    const selected = container2 == null ? void 0 : container2.children[index];
    if (selected && container2) {
      const offset = selected.offsetLeft + selected.offsetWidth / 2 - container2.offsetWidth / 2;
      container2.scrollTo({ left: offset, behavior: "smooth" });
    }
  };
  useEffect(() => {
    scrollToThumb(currentIndex);
    setTransitionKey(Date.now());
    setIsVideoPlaying(false);
  }, [currentIndex]);
  useEffect(() => {
    startAutoScroll();
    startAutoScrollThumbs();
    return () => {
      stopAutoScroll();
      stopAutoScrollThumbs();
    };
  }, []);
  const startAutoScroll = () => {
    stopAutoScroll();
    intervalRef.current = setInterval(() => {
      const current = gameDetails.gameImages[currentIndex];
      const isVideo = current.type === "video";
      if (isVideo && isVideoPlaying) return;
      setCurrentIndex((prev) => (prev + 1) % gameDetails.gameImages.length);
    }, 5e3);
  };
  const stopAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  const startAutoScrollThumbs = () => {
    stopAutoScrollThumbs();
    autoScrollThumbRef.current = setInterval(() => {
      const container2 = thumbnailRef.current;
      if (!container2) return;
      container2.scrollLeft += 1;
      if (container2.scrollLeft + container2.offsetWidth >= container2.scrollWidth - 1) {
        container2.scrollLeft = 0;
      }
    }, 30);
  };
  const stopAutoScrollThumbs = () => {
    if (autoScrollThumbRef.current) clearInterval(autoScrollThumbRef.current);
  };
  const goToNext = () => {
    stopAutoScroll();
    setCurrentIndex((prev) => (prev + 1) % gameDetails.gameImages.length);
    startAutoScroll();
  };
  const goToPrevious = () => {
    stopAutoScroll();
    setCurrentIndex(
      (prev) => (prev - 1 + gameDetails.gameImages.length) % gameDetails.gameImages.length
    );
    startAutoScroll();
  };
  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };
  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    stopAutoScroll();
  };
  const handleVideoPauseOrEnd = () => {
    setIsVideoPlaying(false);
    startAutoScroll();
  };
  const renderMain = () => {
    const current = gameDetails.gameImages[currentIndex];
    if (current.type === "video") {
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "w-full aspect-video relative overflow-hidden border-1 bg-pink-500 rounded-xl",
          children: [
            /* @__PURE__ */ jsx(
              "video",
              {
                ref: videoRef,
                className: "w-full h-full object-cover",
                src: current.src,
                poster: current.poster,
                controls: isVideoPlaying,
                onPlay: handleVideoPlay,
                onPause: handleVideoPauseOrEnd,
                onEnded: handleVideoPauseOrEnd
              }
            ),
            !isVideoPlaying && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handlePlayClick,
                className: "absolute inset-0 flex items-center cursor-pointer justify-center bg-black/30 z-10",
                children: /* @__PURE__ */ jsx("div", { className: "bg-white/40 hover:bg-white/60 rounded-full p-4 transition", children: /* @__PURE__ */ jsx(FaPlay, { className: "text-white text-3xl" }) })
              }
            )
          ]
        },
        transitionKey
      );
    }
    return /* @__PURE__ */ jsx(
      "img",
      {
        src: current.src,
        alt: "Slide",
        className: "w-full aspect-video object-cover rounded-xl"
      },
      transitionKey
    );
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full text-white rounded-xl ", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-6", children: renderMain() }),
    /* @__PURE__ */ jsxs("div", { className: "relative flex items-center mx-1 min-h-[70px]", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "absolute cursor-pointer left-0 z-10 p-2 rounded-full bg-gray-600",
          onClick: goToPrevious,
          children: /* @__PURE__ */ jsx(FaChevronLeft, { className: "text-white w-6 h-6" })
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          ref: thumbnailRef,
          className: "flex items-center gap-4 overflow-x-auto no-scrollbar px-12 scroll-smooth w-full",
          children: gameDetails.gameImages.map((slide, idx) => /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                stopAutoScroll();
                setCurrentIndex(idx);
                startAutoScroll();
              },
              className: `relative rounded-md overflow-hidden border-2 shrink-0 ${idx === currentIndex ? "border-white" : "border-transparent"}`,
              children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: slide.type === "video" ? slide.poster : slide.src,
                    alt: "Thumb",
                    className: "w-28 h-16 object-cover"
                  }
                ),
                slide.type === "video" && /* @__PURE__ */ jsx(FaPlay, { className: "absolute top-1 left-1 text-white bg-black/50 rounded-full p-1 text-sm" })
              ]
            },
            idx
          ))
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "absolute right-0 z-10 p-2 cursor-pointer rounded-full mr-2 bg-gray-600",
          onClick: goToNext,
          children: /* @__PURE__ */ jsx(FaChevronRight, { className: "text-white w-6 h-6" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(GameDetails, { gameDetails })
  ] });
}
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};
function GameSummaryDetails({ gameDetails }) {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: "bg-gradient-to-br from-[#1A1A2E] via-[#22223B] to-[#1A1A2E] text-white p-6 md:p-8 rounded-2xl space-y-6  shadow-2xl border border-white/10",
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true },
      variants: { visible: { transition: { staggerChildren: 0.15 } } },
      children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "flex justify-between items-start",
            variants: fadeIn,
            children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-white/60 mb-1", children: [
                /* @__PURE__ */ jsx("a", { href: "/", className: "hover:text-pink-500 transition", children: Lang.home }),
                " ",
                "/",
                " ",
                /* @__PURE__ */ jsx("a", { href: "/", className: "hover:text-pink-500 transition", children: Lang.games })
              ] }),
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold leading-tight", children: gameDetails.gameName })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.p,
          {
            className: "text-white/70 text-sm leading-relaxed",
            variants: fadeIn,
            children: gameDetails.shortDescription
          }
        ),
        /* @__PURE__ */ jsx(motion.div, { variants: fadeIn, children: /* @__PURE__ */ jsx(
          Link,
          {
            to: "https://dev-games.ororogames.com/games/games/queenofthepiratecoast/index.html?gameCode=queenofthepiratecoast_92&language=en&playerId=player571613&currencyCode=GBP",
            className: "w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold px-10 text-center justify-center items-center flex text-sm py-2.5 rounded-full hover:scale-[1.03] transition transform duration-300",
            children: Lang.play_demo
          }
        ) }),
        /* @__PURE__ */ jsxs(motion.div, { className: "border-t border-white/10 pt-6", variants: fadeIn, children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4 text-pink-400", children: Lang.general_info }),
          /* @__PURE__ */ jsxs("ul", { className: "text-white/80 text-sm divide-y divide-white/10", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex justify-between py-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: Lang.pay_lines }),
              /* @__PURE__ */ jsx("span", { children: gameDetails.paylines })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex justify-between py-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: Lang.volatility }),
              /* @__PURE__ */ jsx("span", { children: gameDetails.volatility })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex justify-between py-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: Lang.rtp }),
              /* @__PURE__ */ jsx("span", { children: gameDetails.RTP })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex justify-between py-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: Lang.reel_rows }),
              /* @__PURE__ */ jsxs("span", { children: [
                gameDetails.reels,
                " x ",
                gameDetails.rows
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex justify-between py-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: Lang.min_bet }),
              /* @__PURE__ */ jsx("span", { children: gameDetails.minBet })
            ] }),
            gameDetails.maxWinMultiplier && /* @__PURE__ */ jsxs("li", { className: "flex justify-between py-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: Lang.max_win }),
              /* @__PURE__ */ jsxs("span", { children: [
                gameDetails.maxWinMultiplier,
                "x"
              ] })
            ] })
          ] })
        ] }),
        gameDetails.license && /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "text-white/60 text-xs font-medium mt-4",
            variants: fadeIn,
            children: /* @__PURE__ */ jsxs("p", { className: "text-gray-500", children: [
              Lang.cart_footer,
              " ",
              gameDetails.license.join(", ")
            ] })
          }
        )
      ]
    }
  );
}
function meta$1({}) {
  return [{
    title: Lang.title + " | " + Lang.game
  }, {
    name: "description",
    content: Lang.welcome_fx + " - " + Lang.game
  }];
}
const Game = withComponentProps(function Game2() {
  const {
    gameDetails
  } = new Helper();
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col-reverse box lg:flex-row lg:px-8 gap-4 py-2",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "w-full lg:w-[68%] space-y-4",
      children: [/* @__PURE__ */ jsx("div", {
        className: "box",
        children: /* @__PURE__ */ jsx(GameSlider, {})
      }), /* @__PURE__ */ jsx("div", {
        className: "box",
        children: /* @__PURE__ */ jsx(AdditionalInformation, {
          gameDetails
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "box",
        children: /* @__PURE__ */ jsx(OtherSection, {})
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "w-full lg:w-[32%]",
      children: /* @__PURE__ */ jsx("div", {
        className: "sticky lg:top-2",
        children: /* @__PURE__ */ jsx("div", {
          className: "box",
          children: /* @__PURE__ */ jsx(GameSummaryDetails, {
            gameDetails
          })
        })
      })
    })]
  });
});
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Game,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [{
    title: Lang.title + " - " + Lang.blog
  }, {
    name: "description",
    content: Lang.welcome_fx + " - " + Lang.blog
  }];
}
const Article = withComponentProps(function Article2() {
  var _a;
  const {
    articleId
  } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {
    BASE_API: BASE_API2,
    getYouTubeID,
    getVimeoID
  } = new Helper();
  useEffect(() => {
    if (!articleId) return;
    fetch(`${BASE_API2}/articles/${articleId}`).then((res) => {
      const data = res.json();
      if (!res.ok) throw new Error(data.message || Lang.blog_not_found);
      return data;
    }).then((data) => {
      setArticle(data);
      setLoading(false);
    }).catch((err) => {
      console.error(Lang.error_fetching_article, err);
      setError(true);
      setLoading(false);
    });
  }, [articleId]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", {
      className: "flex justify-center items-center min-h-screen",
      children: /* @__PURE__ */ jsx(FaSpinner, {
        className: "animate-spin text-gray-300 text-4xl"
      })
    });
  }
  if (error || !article) {
    return /* @__PURE__ */ jsxs("div", {
      className: "flex flex-col items-center justify-center min-h-screen text-white",
      children: [/* @__PURE__ */ jsx("h2", {
        className: "text-xl font-bold text-red-500",
        children: Lang.no_data_found
      }), /* @__PURE__ */ jsxs("button", {
        className: "mt-4 bg-gray-700 text-[#D90479] cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-600",
        onClick: () => navigate("/school"),
        children: ["← ", Lang.back_to_home]
      })]
    });
  }
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen text-white",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-4xl mx-auto p-6",
      children: [/* @__PURE__ */ jsxs("button", {
        className: "text-[#D90479] hover:underline flex cursor-pointer items-center",
        onClick: () => navigate("/"),
        children: [/* @__PURE__ */ jsx(FaArrowLeft, {
          className: "mr-2"
        }), " ", Lang.go_back_home]
      }), /* @__PURE__ */ jsx("img", {
        src: ((_a = article == null ? void 0 : article.photo) == null ? void 0 : _a.original) || "/images/default-article.png",
        alt: article == null ? void 0 : article.title,
        className: "w-full h-80 object-cover mt-4 rounded-lg"
      }), /* @__PURE__ */ jsx("h1", {
        className: "text-xl font-bold mt-4",
        children: article.title
      }), /* @__PURE__ */ jsxs("p", {
        className: "text-gray-400 text-sm mt-2",
        children: [Lang.published, ": ", new Date(article.created_at).toDateString()]
      }), /* @__PURE__ */ jsxs("div", {
        className: "mt-6 p-4 bg-gray-800 rounded-lg shadow-lg border-l-4 border-red-500",
        children: [/* @__PURE__ */ jsx("h3", {
          className: "text-md font-semibold underline text-red-400",
          children: Lang.summary
        }), /* @__PURE__ */ jsxs("p", {
          className: "mt-2 text-gray-300 text-sm leading-relaxed italic",
          children: ['"', article.description, '"']
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "mt-6 p-6 bg-gray-800 rounded-lg shadow-lg",
        children: [/* @__PURE__ */ jsx("h4", {
          className: "text-md font-bold underline text-white mb-4",
          children: Lang.details
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-300 text-sm leading-relaxed tracking-wide",
          children: article.content.split("\n").map((paragraph, index) => /* @__PURE__ */ jsx("span", {
            className: "block mb-4",
            children: paragraph
          }, index))
        })]
      }), article.video_url && /* @__PURE__ */ jsxs("div", {
        className: "mt-6",
        children: [/* @__PURE__ */ jsx("h3", {
          className: "text-lg font-semibold mb-2",
          children: Lang.watch_video
        }), /* @__PURE__ */ jsx("div", {
          className: "relative w-full h-64 md:h-96",
          children: article.video_url.includes("youtube.com") || article.video_url.includes("youtu.be") ? /* @__PURE__ */ jsx("iframe", {
            className: "w-full h-full rounded-lg",
            src: `https://www.youtube.com/embed/${getYouTubeID(article.video_url)}`,
            title: "YouTube Video",
            allowFullScreen: true
          }) : article.video_url.includes("vimeo.com") ? /* @__PURE__ */ jsx("iframe", {
            className: "w-full h-full rounded-lg",
            src: `https://player.vimeo.com/video/${getVimeoID(article.video_url)}`,
            title: "Vimeo Video",
            allowFullScreen: true
          }) : /* @__PURE__ */ jsx("p", {
            className: "text-gray-500",
            children: Lang.invalid_video
          })
        })]
      })]
    })
  });
});
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Article,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const UserList = withComponentProps(function UserList2() {
  const {
    user
  } = useUser();
  const {
    BASE_API: BASE_API2
  } = new Helper();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  useEffect(() => {
    authLoader();
  }, [user]);
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_API2}/auth/user-list?page=${page}&perPage=${perPage}&searchText=${searchText}`, {
        credentials: "include"
      });
      const data = await res.json();
      setUsers(data.user || []);
      setFilteredUsers(data.user || []);
      setTotalCount(data.user.totalCount || 0);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast$1.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [BASE_API2, page, perPage, searchText]);
  useEffect(() => {
    if (user == null ? void 0 : user.id) fetchUsers();
  }, [user, page, perPage, searchText, fetchUsers]);
  useEffect(() => {
    const filteredData = users.filter((user2) => `${user2.first_name} ${user2.last_name} ${user2.email} ${user2.date_of_birth} ${user2.phone_number} ${user2.gender} ${user2.hotel_name}`.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredUsers(filteredData);
  }, [searchText, users]);
  const handleEditClick = (user2) => {
    setEditingId(user2.id);
    setEditForm({
      first_name: user2.first_name,
      last_name: user2.last_name,
      email: user2.email,
      phone_number: user2.phone_number,
      address: user2.address
    });
  };
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };
  const handleSaveEdit = async () => {
    if (!editingId) return;
    try {
      setLoading(true);
      const res = await fetch(`${BASE_API2}/auth/update-user/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(editForm)
      });
      if (res.ok) {
        toast$1.success("User updated successfully");
        fetchUsers();
        setEditingId(null);
        setEditForm({});
      } else {
        const errorData = await res.json();
        toast$1.error(errorData.message || "Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast$1.error("Error updating user");
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteClick = (userId) => {
    setDeleteUserId(userId);
    setIsDeleteModalOpen(true);
  };
  const confirmDelete = async () => {
    if (!deleteUserId) return;
    try {
      setLoading(true);
      const res = await fetch(`${BASE_API2}/auth/delete-user/${deleteUserId}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (res.ok) {
        toast$1.success("User deleted successfully");
        fetchUsers();
      } else {
        const errorData = await res.json();
        toast$1.error(errorData.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast$1.error("Error deleting user");
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
      setDeleteUserId(null);
    }
  };
  const handleInputChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const columns = [{
    name: Lang.name,
    selector: (row) => row.first_name + " " + row.last_name,
    sortable: true,
    cell: (row) => editingId === row.id ? /* @__PURE__ */ jsx("input", {
      name: "first_name",
      value: editForm.first_name && row.last_name || "",
      onChange: handleInputChange,
      className: "w-full px-2 py-1 rounded bg-gray-700 border border-gray-600 text-white"
    }) : /* @__PURE__ */ jsxs("div", {
      className: "font-medium text-white",
      children: [row.first_name, " ", row.last_name]
    })
  }, {
    name: Lang.email,
    selector: (row) => row.email,
    sortable: true,
    cell: (row) => editingId === row.id ? /* @__PURE__ */ jsx("input", {
      name: "email",
      value: editForm.email || "",
      onChange: handleInputChange,
      className: "w-full px-2 py-1 rounded bg-gray-700 border border-gray-600 text-white"
    }) : /* @__PURE__ */ jsx("div", {
      className: "text-blue-300 hover:text-blue-200 transition-colors",
      children: row.email.toLowerCase()
    })
  }, {
    name: Lang.phone,
    selector: (row) => row.phone_number,
    sortable: true,
    cell: (row) => editingId === row.id ? /* @__PURE__ */ jsx("input", {
      name: "email",
      value: editForm.phone_number || "",
      onChange: handleInputChange,
      className: "w-full px-2 py-1 rounded bg-gray-700 border border-gray-600 text-white"
    }) : /* @__PURE__ */ jsx("div", {
      className: "text-blue-300 hover:text-blue-200 transition-colors",
      children: row.phone_number
    })
  }, {
    name: Lang.gender,
    selector: (row) => row.gender || "-",
    minWidth: "150px",
    cell: (row) => editingId === row.id ? /* @__PURE__ */ jsx("input", {
      name: "phone_number",
      value: editForm.gender || "",
      onChange: handleInputChange,
      className: "w-full px-2 py-1 rounded bg-gray-700 border border-gray-600 text-white"
    }) : row.gender || "-"
  }, {
    name: Lang.hotel_name,
    selector: (row) => row.hotel_name || "-",
    minWidth: "150px",
    cell: (row) => editingId === row.id ? /* @__PURE__ */ jsx("input", {
      name: "hotel_name",
      value: editForm.phone_number || "",
      onChange: handleInputChange,
      className: "w-full px-2 py-1 rounded bg-gray-700 border border-gray-600 text-white"
    }) : row.hotel_name || "-"
  }, {
    name: Lang.address,
    selector: (row) => row.address || "-",
    minWidth: "200px",
    cell: (row) => editingId === row.id ? /* @__PURE__ */ jsx("input", {
      name: "address",
      value: editForm.address || "",
      onChange: handleInputChange,
      className: "w-full px-2 py-1 rounded bg-gray-700 border border-gray-600 text-white"
    }) : row.address || "-"
  }, {
    name: Lang.create_now,
    selector: (row) => new Date(row.date_of_birth).toLocaleString(),
    sortable: true,
    cell: (row) => /* @__PURE__ */ jsxs("div", {
      className: "text-sm text-gray-300",
      children: [new Date(row.date_of_birth).toLocaleDateString(), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("span", {
        className: "text-xs",
        children: new Date(row.date_of_birth).toLocaleTimeString()
      })]
    })
  }, {
    name: "Actions",
    cell: (row) => /* @__PURE__ */ jsx("div", {
      className: "flex space-x-2",
      children: editingId === row.id ? /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx("button", {
          onClick: handleSaveEdit,
          className: "p-1.5 rounded-full bg-green-600 hover:bg-green-500 transition-colors",
          title: "Save",
          children: /* @__PURE__ */ jsx(FaSave, {
            className: "text-white text-sm"
          })
        }), /* @__PURE__ */ jsx("button", {
          onClick: handleCancelEdit,
          className: "p-1.5 rounded-full bg-gray-600 hover:bg-gray-500 transition-colors",
          title: "Cancel",
          children: /* @__PURE__ */ jsx(FaTimes, {
            className: "text-white text-sm"
          })
        })]
      }) : /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx("button", {
          onClick: () => handleEditClick(row),
          className: "p-1.5 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors",
          title: "Edit",
          children: /* @__PURE__ */ jsx(FaEdit, {
            className: "text-white text-sm"
          })
        }), /* @__PURE__ */ jsx("button", {
          onClick: () => handleDeleteClick(row.id),
          className: "p-1.5 rounded-full bg-red-600 hover:bg-red-500 transition-colors",
          title: "Delete",
          children: /* @__PURE__ */ jsx(FaTrash, {
            className: "text-white text-sm"
          })
        })]
      })
    }),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true
  }];
  if (!user) {
    return /* @__PURE__ */ jsx("div", {
      className: "flex justify-center items-center min-h-screen",
      children: /* @__PURE__ */ jsx(FaSpinner, {
        className: "animate-spin text-blue-500 text-4xl"
      })
    });
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "box text-white",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "mx-auto px-10 min-h-screen sm:px-6 lg:px-8 py-8",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "mb-6 md:mb-0",
          children: [/* @__PURE__ */ jsxs("h1", {
            className: "text-3xl font-bold flex items-center",
            children: [/* @__PURE__ */ jsx(FaUserAlt, {
              className: "mr-3 text-pink-400"
            }), Lang.user]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-gray-400 mt-2 text-md",
            children: Lang.user_list_description
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "relative w-full md:w-auto",
          children: [/* @__PURE__ */ jsx("div", {
            className: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",
            children: /* @__PURE__ */ jsx(FaSearch, {
              className: "text-gray-400"
            })
          }), /* @__PURE__ */ jsx("input", {
            type: "text",
            className: "w-full md:w-80 pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 text-white placeholder-gray-400 transition-all",
            placeholder: Lang.search_placeholder,
            value: searchText,
            onChange: (e) => setSearchText(e.target.value)
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "bg-gray-800 rounded-xl p-6 border-l-4 border-pink-500",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "text-gray-400 text-sm uppercase tracking-wider",
            children: Lang.total_user
          }), /* @__PURE__ */ jsx("p", {
            className: "text-3xl font-bold mt-2",
            children: totalCount
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "bg-gray-800 rounded-xl p-6 border-l-4 border-green-500",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "text-gray-400 text-sm uppercase tracking-wider",
            children: Lang.active_today
          }), /* @__PURE__ */ jsx("p", {
            className: "text-3xl font-bold mt-2",
            children: users.filter((u) => new Date(u.created_at) > new Date(Date.now() - 864e5)).length
          })]
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-gray-800/50 backdrop-blur-sm  rounded-2xl border border-gray-700 overflow-hidden shadow-xl",
        children: loading ? /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col items-center justify-center py-20",
          children: [/* @__PURE__ */ jsx(FaSpinner, {
            className: "animate-spin text-blue-500 text-4xl mb-4"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-gray-400",
            children: "Loading user data..."
          })]
        }) : /* @__PURE__ */ jsx(DataTable, {
          columns,
          data: filteredUsers,
          pagination: true,
          paginationServer: true,
          paginationTotalRows: totalCount,
          paginationDefaultPage: page,
          paginationPerPage: perPage,
          paginationRowsPerPageOptions: [10, 25, 50, 100],
          onChangePage: setPage,
          onChangeRowsPerPage: setPerPage,
          highlightOnHover: true,
          striped: true,
          theme: "dark",
          customStyles: {
            table: {
              style: {
                backgroundColor: "transparent"
              }
            },
            header: {
              style: {
                backgroundColor: "rgba(31, 41, 55, 0.7)",
                borderBottom: "1px solid rgba(55, 65, 81, 0.5)",
                fontSize: "0.9rem",
                color: "#9CA3AF",
                padding: "1rem",
                paddingLeft: "2rem"
              }
            },
            headRow: {
              style: {
                backgroundColor: "rgba(17, 24, 39, 0.8)",
                backdropFilter: "blur(4px)"
              }
            },
            headCells: {
              style: {
                paddingLeft: "1.5rem",
                paddingRight: "1.5rem",
                fontSize: "0.85rem",
                fontWeight: "600",
                color: "#D1D5DB",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }
            },
            cells: {
              style: {
                paddingLeft: "1.5rem",
                paddingRight: "1.5rem",
                paddingTop: "1rem",
                paddingBottom: "1rem"
              }
            },
            rows: {
              style: {
                backgroundColor: "rgba(31, 41, 55, 0.4)",
                color: "#F3F4F6",
                "&:hover": {
                  backgroundColor: "rgba(59, 130, 246, 0.15)"
                }
              },
              stripedStyle: {
                backgroundColor: "rgba(17, 24, 39, 0.4)"
              }
            },
            pagination: {
              style: {
                backgroundColor: "rgba(31, 41, 55, 0.5)",
                borderTop: "1px solid rgba(55, 65, 81, 0.5)",
                color: "#9CA3AF",
                padding: "1.5rem"
              },
              pageButtonsStyle: {
                color: "#9CA3AF",
                fill: "#9CA3AF",
                backgroundColor: "transparent",
                borderRadius: "0.375rem",
                height: "2.25rem",
                width: "2.25rem",
                padding: "0",
                margin: "0 3px",
                "&:disabled": {
                  cursor: "not-allowed",
                  opacity: 0.5
                },
                "&:hover:not(:disabled)": {
                  backgroundColor: "rgba(59, 130, 246, 0.2)"
                }
              }
            }
          },
          noDataComponent: /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col items-center justify-center py-16 px-4",
            children: [/* @__PURE__ */ jsx("div", {
              className: "bg-gray-800 rounded-full p-5 mb-4",
              children: /* @__PURE__ */ jsx(FaUserAlt, {
                className: "text-gray-400 text-4xl"
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-medium text-gray-200 mb-2",
              children: Lang.no_users_found || "No users found"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-500 text-center max-w-md",
              children: Lang.try_different_search || "Try adjusting your search or filter to find what you're looking for."
            })]
          })
        })
      })]
    }), isDeleteModalOpen && /* @__PURE__ */ jsx("div", {
      className: "fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4",
      children: /* @__PURE__ */ jsxs("div", {
        className: "bg-gray-800 rounded-xl max-w-md w-full p-6 border border-gray-700",
        children: [/* @__PURE__ */ jsx("h3", {
          className: "text-xl font-bold text-white mb-4",
          children: "Confirm Deletion"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-300 mb-6",
          children: "Are you sure you want to delete this user? This action cannot be undone."
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex justify-end space-x-4",
          children: [/* @__PURE__ */ jsx("button", {
            onClick: () => setIsDeleteModalOpen(false),
            className: "px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors text-white",
            children: "Cancel"
          }), /* @__PURE__ */ jsx("button", {
            onClick: confirmDelete,
            className: "px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition-colors text-white",
            disabled: loading,
            children: loading ? /* @__PURE__ */ jsx(FaSpinner, {
              className: "animate-spin mx-auto"
            }) : "Delete User"
          })]
        })]
      })
    })]
  });
});
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UserList
}, Symbol.toStringTag, { value: "Module" }));
const NotFound = withComponentProps(function NotFound2() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 text-white px-6",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "max-w-md text-center",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-9xl font-extrabold tracking-widest",
        children: "404"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-2xl md:text-3xl mt-4 font-semibold",
        children: Lang.page_not_found
      }), /* @__PURE__ */ jsx("p", {
        className: "mt-2 text-gray-300",
        children: Lang.page_not_found_details
      }), /* @__PURE__ */ jsx("button", {
        onClick: () => navigate("/"),
        className: "mt-8 inline-block bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-600 hover:text-white transition",
        children: Lang.go_back_home
      })]
    }), /* @__PURE__ */ jsxs("svg", {
      className: "mt-12 w-80 h-80 opacity-50 mx-auto",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 512 512",
      children: [/* @__PURE__ */ jsx("path", {
        fill: "currentColor",
        d: "M256 48C141.125 48 48 141.125 48 256s93.125 208 208 208 208-93.125 208-208S370.875 48 256 48zm0 368c-88.225 0-160-71.775-160-160 0-88.225 71.775-160 160-160 88.225 0 160 71.775 160 160 0 88.225-71.775 160-160 160z"
      }), /* @__PURE__ */ jsx("path", {
        fill: "currentColor",
        d: "M340.485 171.515l-128 128c-4.686 4.686-4.686 12.284 0 16.97 4.686 4.686 12.284 4.686 16.97 0l128-128c4.686-4.686 4.686-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0z"
      })]
    })]
  });
});
const route18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NotFound
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-B07NdAaK.js", "imports": ["/assets/chunk-HA7DTUK3-Cn8qSWCH.js", "/assets/index-CmQbyfg6.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-D_MNxfiY.js", "imports": ["/assets/chunk-HA7DTUK3-Cn8qSWCH.js", "/assets/index-CmQbyfg6.js", "/assets/with-props-DTX1ldRb.js", "/assets/userContext-nW-m7tGY.js", "/assets/lang-mZGjBYwh.js", "/assets/userAuth-D-rvgPl3.js", "/assets/helper-CR7ZVfzC.js"], "css": ["/assets/root-DUIdZkhv.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/layouts/AuthLayout": { "id": "routes/layouts/AuthLayout", "parentId": "root", "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/AuthLayout-Cdjxg6w3.js", "imports": ["/assets/with-props-DTX1ldRb.js", "/assets/chunk-HA7DTUK3-Cn8qSWCH.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/users/Login": { "id": "routes/users/Login", "parentId": "routes/layouts/AuthLayout", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/Login-EjQPzhd5.js", "imports": ["/assets/with-props-DTX1ldRb.js", "/assets/chunk-HA7DTUK3-Cn8qSWCH.js", "/assets/schemas-ssuNMdJ0.js", "/assets/index-CPtTDup7.js", "/assets/index-DVkn256j.js", "/assets/lang-mZGjBYwh.js", "/assets/helper-CR7ZVfzC.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/users/Registration": { "id": "routes/users/Registration", "parentId": "routes/layouts/AuthLayout", "path": "registration", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/Registration-8T8HeVDJ.js", "imports": ["/assets/with-props-DTX1ldRb.js", "/assets/chunk-HA7DTUK3-Cn8qSWCH.js", "/assets/schemas-ssuNMdJ0.js", "/assets/index-CPtTDup7.js", "/assets/index-DVkn256j.js", "/assets/lang-mZGjBYwh.js", "/assets/helper-CR7ZVfzC.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/users/ForgotPassword": { "id": "routes/users/ForgotPassword", "parentId": "routes/layouts/AuthLayout", "path": "forgot-password", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/ForgotPassword-_nVbmti-.js", "imports": ["/assets/with-props-DTX1ldRb.js", "/assets/chunk-HA7DTUK3-Cn8qSWCH.js", "/assets/schemas-ssuNMdJ0.js", "/assets/index-CPtTDup7.js", "/assets/index-DVkn256j.js", "/assets/lang-mZGjBYwh.js", "/assets/helper-CR7ZVfzC.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/users/ResetPassword": { "id": "routes/users/ResetPassword", "parentId": "routes/layouts/AuthLayout", "path": "reset-password/:token", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/ResetPassword-C2FClANb.js", "imports": ["/assets/with-props-DTX1ldRb.js", "/assets/chunk-HA7DTUK3-Cn8qSWCH.js", "/assets/schemas-ssuNMdJ0.js", "/assets/index-CPtTDup7.js", "/assets/index-DVkn256j.js", "/assets/lang-mZGjBYwh.js", "/assets/helper-CR7ZVfzC.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/layouts/MainLayout": { "id": "routes/layouts/MainLayout", "parentId": "root", "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/MainLayout-BBbaKJgL.js", "imports": ["/assets/with-props-DTX1ldRb.js", "/assets/chunk-HA7DTUK3-Cn8qSWCH.js", "/assets/index-CPtTDup7.js", "/assets/index-DVkn256j.js", "/assets/lang-mZGjBYwh.js", "/assets/helper-CR7ZVfzC.js", "/assets/userContext-nW-m7tGY.js", "/assets/use-text-value-B-Rwy2l9.js", "/assets/index-CmQbyfg6.js", "/assets/proxy-DPKEhcvA.js", "/assets/userAuth-D-rvgPl3.js", "/assets/floating-ui.dom-CV9eO6Wd.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/Home": { "id": "routes/Home", "parentId": "routes/layouts/MainLayout", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/Home-DCVkVQTe.js", "imports": ["/assets/with-props-DTX1ldRb.js", "/assets/chunk-HA7DTUK3-Cn8qSWCH.js", "/assets/lang-mZGjBYwh.js", "/assets/proxy-DPKEhcvA.js", "/assets/index-DVkn256j.js", "/assets/helper-CR7ZVfzC.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/users/EditProfile": { "id": "routes/users/EditProfile", "parentId": "routes/layouts/MainLayout", "path": "profile", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/EditProfile-3aPWe21F.js", "imports": ["/assets/with-props-DTX1ldRb.js", "/assets/chunk-HA7DTUK3-Cn8qSWCH.js", "/assets/index-CPtTDup7.js", "/assets/index-DVkn256j.js", "/assets/index-CmQbyfg6.js", "/assets/floating-ui.dom-CV9eO6Wd.js", "/assets/useAuthUser-DOHTuGIg.js", "/assets/lang-mZGjBYwh.js", "/assets/userContext-nW-m7tGY.js", "/assets/helper-CR7ZVfzC.js", "/assets/proxy-DPKEhcvA.js", "/assets/userAuth-D-rvgPl3.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/Dashboard": { "id": "routes/Dashboard", "parentId": "routes/layouts/MainLayout", "path": "dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/Dashboard-DM7pLHuP.js", "imports": ["/assets/with-props-DTX1ldRb.js", "/assets/chunk-HA7DTUK3-Cn8qSWCH.js", "/assets/index-CPtTDup7.js", "/assets/useAuthUser-DOHTuGIg.js", "/assets/lang-mZGjBYwh.js", "/assets/userAuth-D-rvgPl3.js", "/assets/helper-CR7ZVfzC.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/About": { "id": "routes/About", "parentId": "routes/layouts/MainLayout", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/About-CNDNwFl0.js", "imports": ["/assets/with-props-DTX1ldRb.js", "/assets/chunk-HA7DTUK3-Cn8qSWCH.js", "/assets/lang-mZGjBYwh.js", "/assets/helper-CR7ZVfzC.js", "/assets/proxy-DPKEhcvA.js", "/assets/ImageViewer-CGa7WSJ_.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/Contact": { "id": "routes/Contact", "parentId": "routes/layouts/MainLayout", "path": "contact", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/Contact-DoN1SVVj.js", "imports": ["/assets/with-props-DTX1ldRb.js", "/assets/chunk-HA7DTUK3-Cn8qSWCH.js", "/assets/ImageViewer-CGa7WSJ_.js", "/assets/lang-mZGjBYwh.js", "/assets/schemas-ssuNMdJ0.js", "/assets/index-CPtTDup7.js", "/assets/helper-CR7ZVfzC.js", "/assets/proxy-DPKEhcvA.js", "/assets/index-DVkn256j.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/Games": { "id": "routes/Games", "parentId": "routes/layouts/MainLayout", "path": "games", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/Games-Btfv8uR0.js", "imports": ["/assets/with-props-DTX1ldRb.js", "/assets/chunk-HA7DTUK3-Cn8qSWCH.js", "/assets/index-CPtTDup7.js", "/assets/lang-mZGjBYwh.js", "/assets/helper-CR7ZVfzC.js", "/assets/use-text-value-B-Rwy2l9.js", "/assets/index-CmQbyfg6.js", "/assets/proxy-DPKEhcvA.js", "/assets/floating-ui.dom-CV9eO6Wd.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/News": { "id": "routes/News", "parentId": "routes/layouts/MainLayout", "path": "news", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/News-CKDjyzpC.js", "imports": ["/assets/with-props-DTX1ldRb.js", "/assets/chunk-HA7DTUK3-Cn8qSWCH.js", "/assets/index-CPtTDup7.js", "/assets/proxy-DPKEhcvA.js", "/assets/lang-mZGjBYwh.js", "/assets/helper-CR7ZVfzC.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/Services": { "id": "routes/Services", "parentId": "routes/layouts/MainLayout", "path": "services", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/Services-c4U5RXlh.js", "imports": ["/assets/with-props-DTX1ldRb.js", "/assets/chunk-HA7DTUK3-Cn8qSWCH.js", "/assets/lang-mZGjBYwh.js", "/assets/helper-CR7ZVfzC.js", "/assets/proxy-DPKEhcvA.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "blocks/games/Game": { "id": "blocks/games/Game", "parentId": "routes/layouts/MainLayout", "path": "game/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/Game-DaZ6ZU_w.js", "imports": ["/assets/with-props-DTX1ldRb.js", "/assets/chunk-HA7DTUK3-Cn8qSWCH.js", "/assets/lang-mZGjBYwh.js", "/assets/proxy-DPKEhcvA.js", "/assets/helper-CR7ZVfzC.js", "/assets/index-DVkn256j.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "blocks/home/Article": { "id": "blocks/home/Article", "parentId": "routes/layouts/MainLayout", "path": "blogs/:articleId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/Article-BodAmUtQ.js", "imports": ["/assets/with-props-DTX1ldRb.js", "/assets/chunk-HA7DTUK3-Cn8qSWCH.js", "/assets/index-DVkn256j.js", "/assets/helper-CR7ZVfzC.js", "/assets/lang-mZGjBYwh.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/admin/UserList": { "id": "routes/admin/UserList", "parentId": "routes/layouts/MainLayout", "path": "user-list/", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/UserList-CTU-bie3.js", "imports": ["/assets/with-props-DTX1ldRb.js", "/assets/chunk-HA7DTUK3-Cn8qSWCH.js", "/assets/index-CPtTDup7.js", "/assets/index-DVkn256j.js", "/assets/useAuthUser-DOHTuGIg.js", "/assets/lang-mZGjBYwh.js", "/assets/userContext-nW-m7tGY.js", "/assets/helper-CR7ZVfzC.js", "/assets/userAuth-D-rvgPl3.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/NotFound": { "id": "routes/NotFound", "parentId": "root", "path": "*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/NotFound-6PABs8ve.js", "imports": ["/assets/with-props-DTX1ldRb.js", "/assets/chunk-HA7DTUK3-Cn8qSWCH.js", "/assets/lang-mZGjBYwh.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-266362d5.js", "version": "266362d5" };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/layouts/AuthLayout": {
    id: "routes/layouts/AuthLayout",
    parentId: "root",
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/users/Login": {
    id: "routes/users/Login",
    parentId: "routes/layouts/AuthLayout",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/users/Registration": {
    id: "routes/users/Registration",
    parentId: "routes/layouts/AuthLayout",
    path: "registration",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/users/ForgotPassword": {
    id: "routes/users/ForgotPassword",
    parentId: "routes/layouts/AuthLayout",
    path: "forgot-password",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/users/ResetPassword": {
    id: "routes/users/ResetPassword",
    parentId: "routes/layouts/AuthLayout",
    path: "reset-password/:token",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/layouts/MainLayout": {
    id: "routes/layouts/MainLayout",
    parentId: "root",
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/Home": {
    id: "routes/Home",
    parentId: "routes/layouts/MainLayout",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route7
  },
  "routes/users/EditProfile": {
    id: "routes/users/EditProfile",
    parentId: "routes/layouts/MainLayout",
    path: "profile",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/Dashboard": {
    id: "routes/Dashboard",
    parentId: "routes/layouts/MainLayout",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/About": {
    id: "routes/About",
    parentId: "routes/layouts/MainLayout",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/Contact": {
    id: "routes/Contact",
    parentId: "routes/layouts/MainLayout",
    path: "contact",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/Games": {
    id: "routes/Games",
    parentId: "routes/layouts/MainLayout",
    path: "games",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/News": {
    id: "routes/News",
    parentId: "routes/layouts/MainLayout",
    path: "news",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/Services": {
    id: "routes/Services",
    parentId: "routes/layouts/MainLayout",
    path: "services",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "blocks/games/Game": {
    id: "blocks/games/Game",
    parentId: "routes/layouts/MainLayout",
    path: "game/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "blocks/home/Article": {
    id: "blocks/home/Article",
    parentId: "routes/layouts/MainLayout",
    path: "blogs/:articleId",
    index: void 0,
    caseSensitive: void 0,
    module: route16
  },
  "routes/admin/UserList": {
    id: "routes/admin/UserList",
    parentId: "routes/layouts/MainLayout",
    path: "user-list/",
    index: void 0,
    caseSensitive: void 0,
    module: route17
  },
  "routes/NotFound": {
    id: "routes/NotFound",
    parentId: "root",
    path: "*",
    index: void 0,
    caseSensitive: void 0,
    module: route18
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
