import { motion } from "framer-motion";

interface ImageViewerProps {
  src: string;
  heightClass?: string; // Optional, default provided
}

export default function ImageViewer({
  src,
  heightClass = "h-[60vh] sm:h-[70vh]",
}: ImageViewerProps) {
  return (
    <div className={`w-full ${heightClass} relative overflow-hidden`}>
      <motion.img
        src={src}
        alt="Banner"
        className="w-full h-full object-cover shadow-lg"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
