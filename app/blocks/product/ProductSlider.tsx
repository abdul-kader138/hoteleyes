import { useState, useRef, useEffect } from "react";
import { FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Helper } from "~/utils/helper";
import ProductDetails from "./ProductDetails";

export default function ProductSlider() {
  const { productSlides } = new Helper();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionKey, setTransitionKey] = useState(Date.now());
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const autoScrollThumbRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToThumb = (index: number) => {
    const container = thumbnailRef.current;
    const selected = container?.children[index] as HTMLElement;
    if (selected && container) {
      const offset =
        selected.offsetLeft +
        selected.offsetWidth / 2 -
        container.offsetWidth / 2;
      container.scrollTo({ left: offset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToThumb(currentIndex);
    setTransitionKey(Date.now());
    setIsVideoPlaying(false); // reset on slide change
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
      const current = productSlides[currentIndex];
      const isVideo = current.type === "video";

      if (isVideo && isVideoPlaying) return; // Skip while playing video

      setCurrentIndex((prev) => (prev + 1) % productSlides.length);
    }, 5000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const startAutoScrollThumbs = () => {
    stopAutoScrollThumbs();
    autoScrollThumbRef.current = setInterval(() => {
      const container = thumbnailRef.current;
      if (!container) return;
      container.scrollLeft += 1;
      if (
        container.scrollLeft + container.offsetWidth >=
        container.scrollWidth - 1
      ) {
        container.scrollLeft = 0;
      }
    }, 30);
  };

  const stopAutoScrollThumbs = () => {
    if (autoScrollThumbRef.current) clearInterval(autoScrollThumbRef.current);
  };

  const goToNext = () => {
    stopAutoScroll();
    setCurrentIndex((prev) => (prev + 1) % productSlides.length);
    startAutoScroll();
  };

  const goToPrevious = () => {
    stopAutoScroll();
    setCurrentIndex(
      (prev) => (prev - 1 + productSlides.length) % productSlides.length
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
    const current = productSlides[currentIndex];
    if (current.type === "video") {
      return (
        <div
          key={transitionKey}
          className="w-full aspect-video relative overflow-hidden border-1 border-[#002459] rounded-3xl"
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={current.src}
            poster={current.poster}
            controls={isVideoPlaying}
            onPlay={handleVideoPlay}
            onPause={handleVideoPauseOrEnd}
            onEnded={handleVideoPauseOrEnd}
          />
          {!isVideoPlaying && (
            <button
              onClick={handlePlayClick}
              className="absolute inset-0 flex items-center cursor-pointer justify-center bg-black/30 z-10"
            >
              <div className="bg-white/40 hover:bg-white/60 rounded-full p-4 transition">
                <FaPlay className="text-white text-3xl" />
              </div>
            </button>
          )}
        </div>
      );
    }

    return (
      <img
        key={transitionKey}
        src={current.src}
        alt="Slide"
        className="w-full aspect-video object-cover rounded-xl"
      />
    );
  };

  return (
    <div className="w-full text-white rounded-xl">
      {/* Main Slide */}
      <div className="mb-6">{renderMain()}</div>

      {/* Thumbnails Carousel */}
      <div className="relative flex items-center mx-1 min-h-[70px]">
        <button
          className="absolute cursor-pointer left-0 z-10 p-2 rounded-full bg-gray-600"
          onClick={goToPrevious}
        >
          <FaChevronLeft className="text-white w-6 h-6" />
        </button>

        <div
          ref={thumbnailRef}
          className="flex items-center gap-4 overflow-x-auto no-scrollbar px-12 scroll-smooth w-full"
        >
          {productSlides.map((slide, idx) => (
            <button
              key={idx}
              onClick={() => {
                stopAutoScroll();
                setCurrentIndex(idx);
                startAutoScroll();
              }}
              className={`relative rounded-md overflow-hidden border-2 shrink-0 ${
                idx === currentIndex ? "border-white" : "border-transparent"
              }`}
            >
              <img
                src={slide.type === "video" ? slide.poster : slide.src}
                alt="Thumb"
                className="w-28 h-16 object-cover"
              />
              {slide.type === "video" && (
                <FaPlay className="absolute top-1 left-1 text-white bg-black/50 rounded-full p-1 text-sm" />
              )}
            </button>
          ))}
        </div>

        <button
          className="absolute right-0 z-10 p-2 cursor-pointer rounded-full mr-2 bg-gray-600"
          onClick={goToNext}
        >
          <FaChevronRight className="text-white w-6 h-6" />
        </button>
      </div>

      <ProductDetails />
    </div>
  );
}
