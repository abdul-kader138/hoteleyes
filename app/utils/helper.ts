import axios from "axios";
import Lang from "~/lang/lang";

interface Section {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
}

export class Helper {
  // API Base URL (from environment variables)
  BASE_API = `${import.meta.env.VITE_API_BASE_URL}`;
  BASE_WEBSOCKET = `${import.meta.env.VITE_WEBSOCKET_BASE_URL}`;

  // Axios instance with credentials enabled
  api = axios.create({
    baseURL: this.BASE_API,
    withCredentials: true,
  });

  navigation = [
    {
      name: Lang.home,
      href: "/",
      current: false
    },
    { name: Lang.about, href: "/about", current: false },
    { name: Lang.service, href: "#", current: false},
   
    {
      name: Lang.contact,
      href: "#",
      current: false
    },
     { name: Lang.games, href: "/games", current: false},
     { name: Lang.news, href: "#", current: false},
  ];

  validateEmail = (email: string) => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      return false;
    }
    return true;
  };

  validateTextLength = (field: string, size: number, type: string = "<") => {
    if (type === "<" && field.length < size) {
      return false;
    } else if (type === ">" && field.length > size) {
      return false;
    } else if (type === "=" && field.length === size) {
      return false;
    }
    return true;
  };

  truncateName = (name: string, maxLength: number = 10) => {
    return name.length > maxLength
      ? name.substring(0, maxLength) + "..."
      : name;
  };

  handleClickRedirect = (name: string) => {
    window.location.href = name;
  };

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

  getYouTubeID = (url: string): string | null => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };

  getValidURL = (videoUrl: string): any => {
    const match = videoUrl.match(
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\/.+$/
    );
    return match;
  };

  getCurrentYear = (): any => {
    const year = new Date().getFullYear();
    return year;
  };

  /**
   * Extract Vimeo Video ID from URL
   */
  getVimeoID = (url: string): string | null => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  };

  // mock data for on going tournamnest page
  mockTournaments = [
    {
      name: "Club Tournament",
      players: 3,
      created_by: 1,
      created_at: "4/28/2022, 8:25:00 AM",
      status: "expired",
    },
    {
      name: "Club Tournament",
      players: 3,
      created_by: 1,
      created_at: "5/3/2022, 8:38:00 AM",
      status: "expired",
    },
    {
      name: "Club Tournament",
      players: 3,
      created_by: 1,
      created_at: "5/5/2022, 4:58:00 PM",
      status: "expired",
    },
    {
      name: "HeadsUp Tournament",
      players: 3,
      created_by: 1,
      created_at: "5/6/2022, 12:18:00 AM",
      status: "expired",
    },
  ];

  // mock data for game tournamnest and Rules page

  getTournaments() {
    return [
      {
        type: "Knockout Tournament",
        rules: [
          "1v1 elimination format",
          "Each round lasts 1 day",
          "Drawdown above 5% = disqualified",
          "Top 8 move to finals",
        ],
      },
      {
        type: "Demo Duel",
        rules: [
          "Use demo accounts only",
          "No real money risked",
          "Winners receive funded accounts",
          "Leverage capped at 1:50",
        ],
      },
      {
        type: "Speed Trading Challenge",
        rules: [
          "15-minute trading windows",
          "Most profit wins",
          "One entry per day",
          "No bots or automation allowed",
        ],
      },
      {
        type: "Live Trading Marathon",
        rules: [
          "48-hour non-stop live trading",
          "Max 20 trades per account",
          "Leaderboard updates hourly",
          "Must record trading sessions",
        ],
      },
      {
        type: "Scalping Showdown",
        rules: [
          "Focus on fast in-and-out trades",
          "Max 1-minute hold per trade",
          "Spread control required",
          "Ranked on consistency",
        ],
      },
      {
        type: "Crypto Clash",
        rules: [
          "Only crypto pairs allowed",
          "Trade on BTC, ETH, SOL, and ADA",
          "Max leverage 1:20",
          "Daily resets, best 3 days count",
        ],
      },
    ];
  }

  // mock data for game guide page

  howToPlayLink = "https://www.youtube.com/watch?v=8jFreGK27DA";

  ProTipsLink = "https://player.vimeo.com/video/76979871";

  getFAQ = [
    {
      q: "How can I earn rewards?",
      a: "Complete daily challenges & events.",
    },
    {
      q: "Can I play with friends?",
      a: "Yes, invite friends for multiplayer mode.",
    },
    {
      q: "Is there a ranking system?",
      a: "Yes, ranking is based on performance.",
    },
  ];

  getStepByStepGuide = [
    "🎯 Install the game & create an account",
    "🕹️ Complete the tutorial to understand controls",
    "🔥 Explore different game modes & strategies",
    "🏆 Join tournaments & challenge friends",
  ];

  gameProTips = [
    "🚀 Use power-ups strategically",
    "🎭 Watch pro players to learn advanced moves",
    "🛠️ Customize controls for better gameplay",
    "💡 Study opponent strategies to improve",
  ];

  slidesHorizental = [
    {
      image: "/images/slider/slider2.webp",
      title: Lang.millennium_runners,
      description: Lang.millennium_runners_content,
      upcoming: false,
      preOrder: false,
    },
    {
      image: "/images/slider/slider1.webp",
      title: "All times hit",
      description: "Discover the future of gaming...",
      upcoming: true,
      preOrder: true,
    },
    {
      image: "/images/slider/slider3.webp",
      title: "Explore Planets",
      description: "Speed through cities and planets...",
      upcoming: true,
      preOrder: true,
    },
    {
      image: "/images/slider/slider2.webp",
      title: "This is you new experience.....",
      description: Lang.millennium_runners_content,
      upcoming: true,
      preOrder: true,
    },
    {
      image: "/images/slider/slider1.webp",
      title: "Enjoy the season",
      description: "Discover the future of gaming...",
      upcoming: true,
      preOrder: true,
    },
  ];

  slidesVertical = [
    {
      title: Lang.participate_beta,
      image: "/images/slider/beta-test.png",
      bgcolor: "#E62928",
    },
    {
      title: Lang.new_arrive,
      image: "/images/slider/new-title.png",
      bgcolor: "#E5632F",
    },
    {
      title: Lang.countdown,
      image: "/images/slider/countdown.png",
      bgcolor: "#D4C52F",
    },
    {
      title: Lang.community_discord,
      image: "/images/slider/discord.png",
      bgcolor: "#52A04D",
    },
    {
      title: Lang.new_aggrement,
      image: "/images/slider/update.png",
      bgcolor: "#3B98BC",
    },
  ];

  gameSections: Section[] = [
    {
      id: 1,
      title: Lang.steel_saviour,
      date: Lang.steel_saviour_date,
      description: Lang.steel_saviour_details,
      image: "/images/game-section/steel_savior.jpg",
    },
    {
      id: 2,
      title: Lang.eleven_years_ago,
      date: Lang.eleven_years_ago_year,
      description: Lang.eleven_years_ago_details,
      image: "/images/game-section/eleven_years_ago.jpg",
    },
    {
      id: 3,
      title: Lang.red_rum,
      date: Lang.red_rum_year,
      description: Lang.red_rum_details,
      image: "/images/game-section/redrum.png",
    },
  ];

  newsSection: Section[] = [
    {
      id: 1,
      title: Lang.commodore_industries,
      date: Lang.commodore_industries_year,
      description: Lang.commodore_industries_details,
      image: "/images/news-section/1.png",
    },
    {
      id: 2,
      title: Lang.significant_progress,
      date: Lang.significant_progress_year,
      description: Lang.significant_progress_details,
      image: "/images/news-section/2.png",
    },
    {
      id: 3,
      title: Lang.commodore_reviews,
      date: Lang.commodore_reviews_date,
      description: Lang.commodore_industries_details,
      image: "/images/news-section/3.png",
    },
    {
      id: 4,
      title: Lang.commodore_industries,
      date: Lang.commodore_industries_year,
      description: Lang.commodore_industries_details,
      image: "/images/news-section/1.png",
    },
    {
      id: 5,
      title: Lang.significant_progress,
      date: Lang.significant_progress_year,
      description: Lang.significant_progress_details,
      image: "/images/news-section/2.png",
    },
    {
      id: 6,
      title: Lang.commodore_reviews,
      date: Lang.commodore_reviews_date,
      description: Lang.commodore_industries_details,
      image: "/images/news-section/3.png",
    },
    {
      id: 7,
      title: Lang.commodore_industries,
      date: Lang.commodore_industries_year,
      description: Lang.commodore_industries_details,
      image: "/images/news-section/1.png",
    },
    {
      id: 8,
      title: Lang.significant_progress,
      date: Lang.significant_progress_year,
      description: Lang.significant_progress_details,
      image: "/images/news-section/2.png",
    },
    {
      id: 9,
      title: Lang.commodore_reviews,
      date: Lang.commodore_reviews_date,
      description: Lang.commodore_industries_details,
      image: "/images/news-section/3.png",
    },
  ];

  commodorian = [
    {
      id: 16,
      title: "Sid Meier’s CIVILIZATION",
      image: "/images/commodorian/civilization.png",
    },
    {
      id: 15,
      title: "Robocop",
      image: "/images/commodorian/robocop.png",
    },
    {
      id: 14,
      title: "XENON",
      image: "/images/commodorian/xenon.png",
    },

    {
      id: 13,
      title: "SANTORO",
      image: "/images/commodorian/santoro.png",
    },
    {
      id: 12,
      title: "Indiana Jones",
      image: "/images/commodorian/indiana.png",
    },
    {
      id: 11,
      title: "Turrican",
      image: "/images/commodorian/turrican.png",
    },

    {
      id: 22,
      title: "Sid Meier’s CIVILIZATION",
      image: "/images/commodorian/civilization.png",
    },
    {
      id: 21,
      title: "Robocop",
      image: "/images/commodorian/robocop.png",
    },
    {
      id: 20,
      title: "XENON",
      image: "/images/commodorian/xenon.png",
    },

    {
      id: 19,
      title: "SANTORO",
      image: "/images/commodorian/santoro.png",
    },
    {
      id: 18,
      title: "Indiana Jones",
      image: "/images/commodorian/indiana.png",
    },
    {
      id: 17,
      title: "Turrican",
      image: "/images/commodorian/turrican.png",
    },

    {
      id: 28,
      title: "Sid Meier’s CIVILIZATION",
      image: "/images/commodorian/civilization.png",
    },
    {
      id: 27,
      title: "Robocop",
      image: "/images/commodorian/robocop.png",
    },
    {
      id: 26,
      title: "XENON",
      image: "/images/commodorian/xenon.png",
    },

    {
      id: 25,
      title: "SANTORO",
      image: "/images/commodorian/santoro.png",
    },
    {
      id: 24,
      title: "Indiana Jones",
      image: "/images/commodorian/indiana.png",
    },
    {
      id: 23,
      title: "Turrican",
      image: "/images/commodorian/turrican.png",
    },
  ];

  faqItems = [
    {
      id: 1,
      question: "How do I report a bug or give feedback on a game?",
      answer:
        "You can report bugs or feedback through the support section of the game or by contacting our support team directly.",
      color: "#EC2124",
    },
    {
      id: 2,
      question: "Can I access my game library on multiple devices?",
      answer:
        "Yes, you can access your Ororo library from any supported device by logging in with your account.",
      color: "#E5622F",
    },
    {
      id: 3,
      question: "Are Ororo games available on other platforms?",
      answer:
        "Most Ororo games are available on PC, mobile, and select consoles. Availability may vary.",
      color: "#D4C52F",
    },
    {
      id: 4,
      question: "How do I download and install the game?",
      answer:
        "You can download and install games directly from your Ororo dashboard after logging in.",
      color: "#5CAC58",
    },
  ];

  productSlides = [
    {
      type: "video",
      src: "/videos/product/mr.mp4",
      poster: "/videos/product/thumbnail.png",
    },
    { type: "image", src: "/images/products/product/image1.png" },
    { type: "image", src: "/images/products/product/image2.png" },
    { type: "image", src: "/images/products/product/image3.png" },
    { type: "image", src: "/images/products/product/image4.png" },
  ];

  productDetailsData = {
    title: "Millennium Runners",
    intro: [
      "The race of the millennium is about to begin.",
      "Millennium Runners is the ultimate anti-gravity racing experience: speed beyond all limits, adrenaline-fueled circuits and four racing teams ready for anything to win the Millennium Cup.",
      "In this remote future, where speed is synonymous with power and the racetrack is the battleground, only the best will join the legend. Take on adrenaline-pumping challenges, dominate corners with breathtaking manoeuvres, and make your mark on galactic racing history.",
    ],
    featuresTitle: "Key Features",
    features: [
      {
        title: "Limitless Speed",
        description:
          "Thrilling top-speed experience with smooth, responsive controls.",
      },
      {
        title: "Iconic Circuits",
        description:
          "Race across remote planets, vertical cities, and magnetic storms.",
      },
      {
        title: "Legendary Teams",
        description:
          "Choose from four elite racing teams, each with unique technology and philosophy.",
      },
    ],
    expanded: [
      "Born from the vision of self-made prodigy William Baxter, this company symbolizes the dream of becoming a racing legend. Through dedication, he built one of the most iconic firms in anti-gravity engineering.",
      "Apex Motors, the oldest major racing team, stands as a direct rival to Vortex Avionics. It fosters an elite image by selecting only top-tier athletes through a rigorous process.",
      "Retropulse Dynamics, a rising star from GRF’s outer worlds, aims to empower individuals against corporate exploitation. It’s the underdog pushing innovation in engine tech.",
    ],
  };

  productCartDetails = {
    title: "Millennium Runners",
    price: "9,75 €",
    tags: ["Racing", "Sport", "Fights", "3D"],
    description:
      "The ultimate anti-gravity racing experience. Millennium Runners is an homage to classic arcade racing games. Speed through futuristic cities and planets in adrenaline-fueled competitions. Choose your team, conquer the Millennium Cup, and race your way into legend!",
    editions: ["STANDARD", "EXTENDED"],
    releaseDate: "18 Apr, 2025",
    developer: "Commodore Sinapsy",
    publisher: "Over The Game",
    language: "English (Audio, Interface)",
    mode: "Single-Player",
    controllerSupport: "Xbox Controllers",
  };

  productAddOns = [
    {
      id: 1,
      title: "Millennium Runners Soundtrack",
      subtitle: "Add-on",
      description:
        "Immerse yourself even deeper with the official game soundtrack. A collection of original tracks to relive every moment, anywhere.",
      price: "1,99 €",
      image: "/images/products/addon/bg.png",
    },
  ];

  systemRequirements = {
    minimum: {
      OS: "Windows 10",
      Processor: "Intel Core i7-13700H\nAMD Ryzen 7 6800HS",
      Memory: "16 GB RAM",
      Graphics: "Intel Iris Xe Graphics G7 96\nAMD Radeon 680M",
      DirectX: "Version 11",
      Storage: "15 GB available space",
      "Visual Settings":
        "1080p at 30 FPS, low graphics settings,\nupscaler set to quality",
    },
    recommended: {
      OS: "Windows 11",
      Processor: "Intel Core i7-14650HX\nAMD Ryzen 9 7945HX",
      Memory: "32 GB RAM",
      Graphics: "Nvidia GeForce RTX 4060\nAMD Radeon RX 7700S",
      DirectX: "Version 12",
      Storage: "15 GB available space",
      "Visual Settings":
        "1080p at 60 FPS, high graphics settings,\nupscaler set to quality",
    },
  };

  otherSection = [
    {
      title: "Steel Saviour",
      edition: "Standard Edition",
      price: "5,99 €",
      image: "/images/products/other-section/steel-saviour.png",
    },
    {
      title: "Red Rum",
      edition: "Standard Edition",
      price: "0,99 €",
      image: "/images/products/other-section/redrum.png",
    },
    {
      title: "11 Years Ago",
      edition: "Standard Edition",
      price: "4,99 €",
      image: "/images/products/other-section/11-years-ago.png",
    },
    {
      title: "Cheers!",
      edition: "Standard Edition",
      price: "4,99 €",
      image: "/images/products/other-section/cheers.png",
    },
  ];

  mockGameList = [
  {
    id: 1,
    name: "Touchdown Cash",
    img: "/images/games/mock.png",
    feature: "Bonus",
    type: "Slot",
    category: "Sports",
  },
  {
    id: 2,
    name: "Thor's Rage",
    img: "/images/games/mock.png",
    feature: "Jackpot",
    type: "Slot",
    category: "Mythology",
  },
  {
    id: 3,
    name: "Big Gains",
    img: "/images/games/mock.png",
    feature: "Free Spins",
    type: "Slot",
    category: "Money",
  },
  {
    id: 4,
    name: "Rise Of Cleopatra",
    img: "/images/games/mock.png",
    feature: "Bonus",
    type: "Slot",
    category: "Ancient",
  },
  {
    id: 5,
    name: "777 Diamond Strike",
    img: "/images/games/mock.png",
    feature: "Jackpot",
    type: "Slot",
    category: "Classic",
  },
  {
    id: 6,
    name: "Cash Goddess",
    img: "/images/games/mock.png",
    feature: "Free Spins",
    type: "Slot",
    category: "Fantasy",
  },
  {
    id: 7,
    name: "Miami Rise",
    img: "/images/games/mock.png",
    feature: "Bonus",
    type: "Slot",
    category: "Modern",
  },
  {
    id: 8,
    name: "Zillard King MegaWays™",
    img: "/images/games/mock.png",
    feature: "Jackpot",
    type: "Slot",
    category: "Beast",
  },
  {
    id: 9,
    name: "Jackrabbit Jackpots",
    img: "/images/games/mock.png",
    feature: "Free Spins",
    type: "Slot",
    category: "Wild West",
  },
  {
    id: 10,
    name: "Farmtastic",
    img: "/images/games/mock.png",
    feature: "Bonus",
    type: "Slot",
    category: "Animals",
  },

  // Repeat with varied data to simulate more
  {
    id: 11,
    name: "Viking Vault",
    img: "/images/games/mock.png",
    feature: "Bonus",
    type: "Slot",
    category: "Mythology",
  },
  {
    id: 12,
    name: "Jungle Jewels",
    img: "/images/games/mock.png",
    feature: "Free Spins",
    type: "Slot",
    category: "Adventure",
  },
  {
    id: 13,
    name: "Cosmic Cash",
    img: "/images/games/mock.png",
    feature: "Jackpot",
    type: "Slot",
    category: "Sci-Fi",
  },
  {
    id: 14,
    name: "Treasure Temple",
    img: "/images/games/mock.png",
    feature: "Bonus",
    type: "Slot",
    category: "Ancient",
  },
  {
    id: 15,
    name: "Speed Racer",
    img: "/images/games/mock.png",
    feature: "Free Spins",
    type: "Slot",
    category: "Racing",
  },
  {
    id: 16,
    name: "Lucky Lanterns",
    img: "/images/games/mock.png",
    feature: "Jackpot",
    type: "Slot",
    category: "Asian",
  },
  {
    id: 17,
    name: "Ghost Hunter",
    img: "/images/games/mock.png",
    feature: "Bonus",
    type: "Slot",
    category: "Horror",
  },
  {
    id: 18,
    name: "Mystic Forest",
    img: "/images/games/mock.png",
    feature: "Free Spins",
    type: "Slot",
    category: "Fantasy",
  },
  {
    id: 19,
    name: "Neon Nights",
    img: "/images/games/mock.png",
    feature: "Jackpot",
    type: "Slot",
    category: "Retro",
  },
  {
    id: 20,
    name: "Dragon Blaze",
    img: "/images/games/mock.png",
    feature: "Bonus",
    type: "Slot",
    category: "Mythology",
  },

  {
    id: 21,
    name: "Haunted Spins",
    img: "/images/games/mock.png",
    feature: "Free Spins",
    type: "Slot",
    category: "Horror",
  },
  {
    id: 22,
    name: "Crystal Cove",
    img: "/images/games/mock.png",
    feature: "Jackpot",
    type: "Slot",
    category: "Ocean",
  },
  {
    id: 23,
    name: "Gold Digger's Den",
    img: "/images/games/mock.png",
    feature: "Bonus",
    type: "Slot",
    category: "Mining",
  },
  {
    id: 24,
    name: "Ninja Clash",
    img: "/images/games/mock.png",
    feature: "Free Spins",
    type: "Slot",
    category: "Action",
  },
  {
    id: 25,
    name: "Robot Rampage",
    img: "/images/games/mock.png",
    feature: "Jackpot",
    type: "Slot",
    category: "Sci-Fi",
  },
  {
    id: 26,
    name: "Royal Riches",
    img: "/images/games/mock.png",
    feature: "Bonus",
    type: "Slot",
    category: "Royalty",
  },
  {
    id: 27,
    name: "Safari Spin",
    img: "/images/games/mock.png",
    feature: "Free Spins",
    type: "Slot",
    category: "Animals",
  },
  {
    id: 28,
    name: "Festival Frenzy",
    img: "/images/games/mock.png",
    feature: "Bonus",
    type: "Slot",
    category: "Festival",
  },
  {
    id: 29,
    name: "Alien Fortune",
    img: "/images/games/mock.png",
    feature: "Jackpot",
    type: "Slot",
    category: "Sci-Fi",
  },
  {
    id: 30,
    name: "Pirate Plunder",
    img: "/images/games/mock.png",
    feature: "Free Spins",
    type: "Slot",
    category: "Adventure",
  },
];
}
