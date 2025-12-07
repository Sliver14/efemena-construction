"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";
import Header from "@/components/header";
import Footer from "@/components/footer";
// import MediaContent from "./MediaContent"; // <-- keep your MediaContent component in a separate file or same file

// ──────────────────────────────────────────────────────────────
// MediaContent: Handles Image + Video with Hover (Desktop) & Play Button (Mobile)
// ──────────────────────────────────────────────────────────────
// ──────────────────────────────────────────────────────────────
// MediaContent – Now preserves REAL image/video height (Pinterest style)
// ──────────────────────────────────────────────────────────────
// ──────────────────────────────────────────────────────────────
// MediaContent – Perfect aspect ratio, auto poster, no stretch
// ──────────────────────────────────────────────────────────────
interface Project {
  title: string;
  category: string;
  imageSrc: string;
  videoSrc?: string;
}

const MediaContent = ({ project }: { project: Project }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasLoadedMetadata, setHasLoadedMetadata] = useState(false);

  const isTouchDevice = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  // Toggle play/pause (mobile)
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  // Desktop hover play
  useEffect(() => {
    if (!videoRef.current || isTouchDevice) return;

    if (isHovered) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered, isTouchDevice]);

  // When video metadata loads → we know real aspect ratio
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => setHasLoadedMetadata(true);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => video.removeEventListener("loadedmetadata", handleLoadedMetadata);
  }, []);

  // ─── CASE 1: Just an image ───
  if (!project.videoSrc) {
    return (
      <div className="relative w-full overflow-hidden rounded-lg">
        <Image
          src={project.imageSrc}
          alt={project.title}
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
          style={{ display: "block" }}
        />
      </div>
    );
  }

  // ─── CASE 2: Video + Auto Poster ───
  return (
    <div
      className="relative w-full overflow-hidden rounded-lg group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video is the source of truth for aspect ratio */}
      <video
        ref={videoRef}
        src={project.videoSrc}
        poster={project.imageSrc} // ← still use your nice poster image
        className="w-full h-auto block object-cover"
        loop
        muted
        playsInline
        preload="metadata"
        style={{ display: hasLoadedMetadata || isPlaying ? "block" : "none" }}
      />

      {/* Fallback: Show poster image until video knows its size */}
      {!hasLoadedMetadata && !isPlaying && (
        <div className="w-full">
          <Image
            src={project.imageSrc}
            alt={project.title}
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            style={{ display: "block" }}
          />
        </div>
      )}

      {/* Play button overlay (mobile or not playing) */}
      {(isTouchDevice || !isPlaying) && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer z-10"
          onClick={togglePlay}
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white/95 rounded-full flex items-center justify-center shadow-2xl hover:bg-white transition-all duration-200">
            {isPlaying && isTouchDevice ? (
              <svg className="w-8 h-8 text-[#543e36]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-8 h-8 md:w-10 md:h-10 text-[#543e36] ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ──────────────────────────────────────────────────────────────
// Main Page Component
// ──────────────────────────────────────────────────────────────
const allProjects: Project[] = [
  { title: "Luxury Residential Building", category: "Residential", imageSrc: "/projects/IMG-20251130-WA0007.jpg" },
  { title: "Modern Duplex (Video Tour)", category: "Residential", imageSrc: "/projects/res2.jpg", videoSrc: "/projects/VID-20251130-WA0001.mp4" },
  { title: "5-Star Hotel Renovation", category: "Hotel", imageSrc: "/projects/IMG-20251130-WA0002.jpg" },
  { title: "Suite Interior Upgrade (Time-lapse)", category: "Hotel", imageSrc: "/projects/hotel2.jpg", videoSrc: "/projects/VID-20251130-WA0002.mp4" },
  { title: "Estate Development Phase 1", category: "Construction", imageSrc: "/projects/IMG-20251130-WA0005.jpg" },
  { title: "Cladding Installation", category: "Cladding", imageSrc: "/projects/IMG-20251130-WA0006.jpg" },
  { title: "Warehouse Construction", category: "Construction", imageSrc: "/projects/IMG-20251130-WA0008.jpg" },
  { title: "Mall Interior Cladding", category: "Cladding", imageSrc: "/projects/IMG-20251130-WA0009.jpg" },
  { title: "Apartment Renovation", category: "Renovation", imageSrc: "/projects/IMG-20251202-WA0006.jpg" },
  { title: "Hospital Renovation", category: "Renovation", imageSrc: "/projects/WhatsApp Image 2025-11-30 at 09.11.17_fff1a717.jpg" },
  { title: "Luxury Residential Building", category: "Residential", imageSrc: "/projects/WhatsApp Image 2025-11-30 at 09.16.17_916e2234.jpg" },
  { title: "Modern Duplex (Video Tour)", category: "Residential", imageSrc: "/projects/res2.jpg", videoSrc: "/projects/VID-20251130-WA0009.mp4" },
  { title: "5-Star Hotel Renovation", category: "Hotel", imageSrc: "/projects/WhatsApp Image 2025-11-30 at 09.20.42_0f11f8f1.jpg" },
  { title: "Suite Interior Upgrade (Time-lapse)", category: "Hotel", imageSrc: "/projects/hotel2.jpg", videoSrc: "/projects/VID-20251130-WA0011.mp4" },
  { title: "Suite Interior Upgrade (Time-lapse)", category: "Hotel", imageSrc: "/projects/hotel2.jpg", videoSrc: "/projects/VID-20251130-WA0012.mp4" },
  { title: "Suite Interior Upgrade (Time-lapse)", category: "Hotel", imageSrc: "/projects/hotel2.jpg", videoSrc: "/projects/WhatsApp Video 2025-11-30 at 09.22.59_5b0facec.mp4" },
  { title: "Suite Interior Upgrade (Time-lapse)", category: "Hotel", imageSrc: "/projects/hotel2.jpg", videoSrc: "/projects/WhatsApp Video 2025-11-30 at 09.22.59_abe6d118.mp4" },
  { title: "Suite Interior Upgrade (Time-lapse)", category: "Hotel", imageSrc: "/projects/hotel2.jpg", videoSrc: "/projects/WhatsApp Video 2025-11-30 at 10.03.48_02a845f5.mp4" },
  { title: "Suite Interior Upgrade (Time-lapse)", category: "Hotel", imageSrc: "/projects/hotel2.jpg", videoSrc: "/projects/WhatsApp Video 2025-11-30 at 10.11.27_6d1b53ac.mp4" },
  { title: "Suite Interior Upgrade (Time-lapse)", category: "Hotel", imageSrc: "/projects/hotel2.jpg", videoSrc: "/projects/WhatsApp Video 2025-11-30 at 10.12.35_4d4a98bf.mp4" },
  { title: "Suite Interior Upgrade (Time-lapse)", category: "Hotel", imageSrc: "/projects/hotel2.jpg", videoSrc: "/projects/WhatsApp Video 2025-11-30 at 10.48.41_9d428b51.mp4" },
  { title: "Suite Interior Upgrade (Time-lapse)", category: "Hotel", imageSrc: "/projects/hotel2.jpg", videoSrc: "/projects/WhatsApp Video 2025-11-30 at 12.49.28_1c6654e9.mp4" },
  { title: "Suite Interior Upgrade (Time-lapse)", category: "Hotel", imageSrc: "/projects/hotel2.jpg", videoSrc: "/projects/WhatsApp Video 2025-11-30 at 13.03.10_247c082b.mp4" },
  { title: "Suite Interior Upgrade (Time-lapse)", category: "Hotel", imageSrc: "/projects/hotel2.jpg", videoSrc: "/projects/WhatsApp Video 2025-11-30 at 13.04.25_4d3d264d.mp4" },
  { title: "Estate Development Phase 1", category: "Construction", imageSrc: "/projects/WhatsApp Image 2025-11-30 at 09.20.44_3da46350.jpg" },
  { title: "Cladding Installation", category: "Cladding", imageSrc: "/projects/WhatsApp Image 2025-11-30 at 09.20.45_56083dca.jpg" },
  { title: "Warehouse Construction", category: "Construction", imageSrc: "/projects/WhatsApp Image 2025-11-30 at 09.20.49_219bac9d.jpg" },
  { title: "Mall Interior Cladding", category: "Cladding", imageSrc: "/projects/WhatsApp Image 2025-11-30 at 09.24.30_d8cf2518.jpg" },
  { title: "Apartment Renovation", category: "Renovation", imageSrc: "/projects/IMG-20251202-WA0006.jpg" },
  { title: "Hospital Renovation", category: "Renovation", imageSrc: "/projects/WhatsApp Image 2025-11-30 at 09.11.17_fff1a717.jpg" },
];

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const categories = ["ALL", "Residential", "Hotel", "Construction", "Cladding", "Renovation"];
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const ITEMS_PER_LOAD = 12;

  const filteredProjects = React.useMemo(() => {
    return activeCategory === "ALL"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Load initial chunk
  useEffect(() => {
    setVisibleProjects(filteredProjects.slice(0, ITEMS_PER_LOAD));
    setHasMore(filteredProjects.length > ITEMS_PER_LOAD);
  }, [filteredProjects]);

  const loadMore = useCallback(() => {
    if (!hasMore) return;

    const currentLength = visibleProjects.length;
    const more = filteredProjects.slice(currentLength, currentLength + ITEMS_PER_LOAD);

    if (more.length === 0) {
      setHasMore(false);
      return;
    }

    setVisibleProjects((prev) => [...prev, ...more]);
    setHasMore(currentLength + more.length < filteredProjects.length);
  }, [visibleProjects, filteredProjects, hasMore]);

  // Infinite scroll observer
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadMore, hasMore]
  );

  // Breakpoints for responsive columns (exactly like Pinterest)
  const breakpointColumns = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="bg-white">
      <Header />

      {/* HERO */}
      <div
        className="relative w-full h-[60vh] bg-cover bg-center flex flex-col items-start justify-center px-8 md:px-20"
        style={{ backgroundImage: "url('/projects/IMG-20251130-WA0004.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <h1 className="relative z-10 text-white text-3xl md:text-5xl font-bold">OUR PROJECTS</h1>
      </div>

      {/* PROJECTS SECTION */}
      <div className="w-full px-6 md:px-20 py-16">
        <h2 className="text-2xl md:text-4xl font-bold text-[#543e36] mb-10">FEATURED PROJECTS</h2>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-6 mb-12 text-black/60 font-normal">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                // Reset on category change
                setVisibleProjects([]);
                setHasMore(true);
              }}
              className={`transition ${activeCategory === cat ? "text-[#543e36] font-medium underline" : "hover:text-[#543e36]"}`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Masonry Grid – Real aspect ratios + Overlap feel */}
        <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-6 w-auto"
        columnClassName="pl-6 bg-clip-padding"
        >
        {visibleProjects.map((project, index) => {
            const isLast = index === visibleProjects.length - 1;

            return (
            <div
                key={`${project.title}-${index}`}
                ref={isLast ? lastItemRef : null}
                className="mb-8 group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
                <MediaContent project={project} />

                {/* Caption */}
                <div className="absolute inset-x-0 bottom-0 p-5 text-white bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none z-20">
                <p className="text-sm uppercase font-semibold opacity-80">{project.category}</p>
                <p className="text-base md:text-md font-medium mt-1 leading-snug">{project.title}</p>
                </div>
            </div>
            );
        })}
        </Masonry>

        {/* Loading state */}
        {hasMore && (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-[#543e36] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* {!hasMore && visibleProjects.length > 0 && (
          <p className="text-center py-12 text-gray-500">You’ve reached the end!</p>
        )} */}
      </div>

        {/* CONTACT SECTION */}
        <div className="w-full">
          <div
            className="
              relative h-[50vh] md:h-[60vh] 
              bg-cover bg-center 
              flex flex-col items-center justify-center 
              px-6
            "
            style={{
              backgroundImage:
                "url('/projects/IMG-20251130-WA0008.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative z-10 max-w-5xl flex flex-col items-center gap-6">
              <h1 className="text-white text-base sm:text-lg md:text-2xl text-center leading-relaxed">
                Whether it be a project of small or large scale, private or
                commercial, we have the resources and knowledge to deliver
                unmatched quality.
              </h1>

              <button
                onClick={() => router.push("/contact-us")}
                className="px-10 py-4 bg-[#543e36] text-white text-sm font-bold tracking-widest hover:bg-white hover:text-[#543e36] transition-colors duration-300"
              >
                START YOUR PROJECT
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="w-full bg-[#543e36] text-white py-6 text-center">
            <p className="text-sm opacity-80">
              © 2025 Efemena Construction & Cladding. All rights reserved.
            </p>
          </div>
        </div>
    </div>
  );
}