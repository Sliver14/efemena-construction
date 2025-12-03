"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Home() {
const router = useRouter();
  const slides = [
    {
      type: "image",
      url: "/projects/WhatsApp Image 2025-11-30 at 09.16.17_916e2234.jpg",
      title: "ENGINEERING WITH PURPOSE",
      subtitle: "Creating durable structures for generations.",
    },
    {
      type: "image",
      url: "/projects/WhatsApp Image 2025-11-30 at 09.20.42_0f11f8f1.jpg",
      title: "STRONG FOUNDATIONS, STRONG FUTURES",
      subtitle: "Precision. Reliability. Innovation.",
    },
    {
      type: "image",
      url: "/projects/WhatsApp Image 2025-11-30 at 09.20.44_3da46350.jpg",
      title: "BUILDING AFRICA'S LANDMARK PROJECTS",
      subtitle: "Trusted for over 90 years.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTextContent, setShowTextContent] = useState(true); // Controls text animation

  // Refs for background slide movement
  const previousIndexRef = useRef(0);
  const slideRefs = useRef([]);

  // Transition constants
  const SLIDE_DURATION = 1000; // Background slide time
  const TEXT_TRANSITION_DURATION = 700; // Text element slide in time

  const changeSlide = (newIndex, direction) => {
    if (isAnimating || newIndex === currentIndex) return;

    setIsAnimating(true);
    previousIndexRef.current = currentIndex;

    // 1. Start Text Exit Animation (Text slides out quickly)
    setShowTextContent(false);

    // 2. Wait for text exit, then trigger background slide
    // Start background slide halfway through text exit for smoother overlap
    setTimeout(() => {
        performSlideTransition(newIndex, direction);
    }, TEXT_TRANSITION_DURATION / 2); 
  };

  const performSlideTransition = (newIndex, dir) => {
    const currentEl = slideRefs.current[newIndex];
    const prevEl = slideRefs.current[previousIndexRef.current];

    if (currentEl && prevEl) {
      // --- Setup Phase ---
      currentEl.style.transition = 'none';
      prevEl.style.transition = 'none';

      // Incoming slide starts off-screen
      currentEl.style.transform = `translateX(${dir * 100}%)`;
      currentEl.style.zIndex = 2;
      currentEl.style.opacity = 1;

      // Outgoing slide is centered
      prevEl.style.transform = 'translateX(0%)';
      prevEl.style.zIndex = 1;
      
      // Force Reflow
      currentEl.offsetHeight; 

      // --- Animation Phase ---
      const transitionStyle = `transform ${SLIDE_DURATION}ms cubic-bezier(0.4, 0.0, 0.2, 1)`;
      currentEl.style.transition = transitionStyle;
      prevEl.style.transition = transitionStyle;

      // Move to Final Positions
      currentEl.style.transform = 'translateX(0%)';
      prevEl.style.transform = `translateX(${dir * -100}%)`;

      // Update State immediately to show new content
      setCurrentIndex(newIndex);

      // --- Cleanup Phase ---
      setTimeout(() => {
        // 1. Re-enable incoming text animation (triggers slide-in)
        setShowTextContent(true);

        // 2. Finish animation state
        setIsAnimating(false);
        
        // 3. Reset styles for non-active slides
        slideRefs.current.forEach((el, idx) => {
          if (idx !== newIndex && el) {
            el.style.zIndex = 0;
            el.style.opacity = 0;
            el.style.transition = 'none';
            el.style.transform = 'translateX(0)';
          }
        });
      }, SLIDE_DURATION);
    }
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    changeSlide(newIndex, 1);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    changeSlide(newIndex, -1);
  };

  // 🕒 Auto-slide (Runs continuously)
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, isAnimating]);

  const active = slides[currentIndex];

  // Utility classes for staggered text entry/exit
  const textExitClass = 'opacity-0';
  const titleExitTransform = 'translate-x-[-100px]'; // Exit left
  const ctaExitTransform = 'translate-x-[100px]';   // Exit right

  const titleEntryTransform = 'translate-x-0';
  const ctaEntryTransform = 'translate-x-0';
  const textEntryOpacity = 'opacity-100';

  const titleClass = `transition-all duration-${TEXT_TRANSITION_DURATION} ease-out transform ${
      showTextContent ? `${textEntryOpacity} ${titleEntryTransform}` : `${textExitClass} ${titleExitTransform}`
  }`;

  const ctaClass = `transition-all duration-${TEXT_TRANSITION_DURATION} ease-out transform ${
      showTextContent ? `${textEntryOpacity} ${ctaEntryTransform}` : `${textExitClass} ${ctaExitTransform}`
  }`;
  
  // Adjusted timing for staggered entry
  const titleDelay = '100ms';
  const ctaDelay = '300ms';


  return (
    <div className="relative flex font-sans uppercase flex-col w-screen min-h-screen overflow-hidden bg-black text-white">
      
      {/* Background Slides Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            ref={(el) => (slideRefs.current[index] = el)}
            className="absolute inset-0 bg-cover bg-center w-full h-full will-change-transform"
            style={{ 
              backgroundImage: `url('${slide.url}')`,
              opacity: index === 0 ? 1 : 0, 
              zIndex: index === currentIndex ? 2 : 0,
              transform: 'translateX(0)' 
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ))}
      </div>

      {/* HERO CONTENT - Centered and Responsive */}
      <div className="
        relative z-10 flex flex-col 
        h-screen 
        justify-center 
        w-full 
        px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 
        pointer-events-none
      ">

        <div className="
          flex flex-col 
          max-w-4xl 
          pointer-events-auto
          text-center md:text-left
        ">

          {/* Title + Subtitle */}
          <div
            className={titleClass}
            style={{ transitionDelay: showTextContent ? titleDelay : '0ms' }}
          >
            <h1 className="
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
              font-bold 
              drop-shadow-2xl 
              leading-tight
              tracking-tight
            ">
              {active.title}
            </h1>

            <p className="
              mt-3 
              text-base sm:text-lg md:text-xl lg:text-2xl 
              text-gray-200 
              font-light 
              tracking-wide
            ">
              {active.subtitle}
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 sm:gap-6 mt-10 ${ctaClass}`}
            style={{ transitionDelay: showTextContent ? ctaDelay : '0ms' }}
          >
            <button className="
              px-8 py-4 
              bg-[#543e36] text-white 
              text-xs sm:text-sm 
              font-bold tracking-widest 
              shadow-lg 
              hover:bg-white hover:text-[#543e36] 
              transition-colors duration-300
            ">
              CONTACT
            </button>

            <button 
              onClick={() => router.push('/projects')}
              className="
                px-8 py-4 
                border border-white 
                text-white 
                text-xs sm:text-sm
                font-bold tracking-widest 
                hover:bg-white hover:text-[#543e36] 
                transition-colors duration-300
              "
            >
              VIEW OUR PROJECTS
            </button>
          </div>

        </div>
      </div>


      {/* ARROWS */}
      <button
        onClick={prevSlide}
        disabled={isAnimating}
        // Using Unicode arrows as requested
        className="absolute left-0 top-1/2 -translate-y-1/2 text-white/60 text-5xl px-5 py-12 bg-black/40 transition-all z-20 cursor-pointer disabled:opacity-30"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg> {/* Left Arrow */}
      </button>

      <button
        onClick={nextSlide}
        disabled={isAnimating}
        // Using Unicode arrows as requested
        className="absolute right-0 top-1/2 -translate-y-1/2 text-white/60 text-5xl px-5 py-12 bg-black/40 transition-all z-20 cursor-pointer disabled:opacity-30"
      >
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg> {/* Right Arrow */}
      </button>

      {/* INDICATORS */}
      <div className="absolute bottom-12 w-full flex justify-center gap-4 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            disabled={isAnimating}
            onClick={() => {
                const dir = index > currentIndex ? 1 : -1;
                changeSlide(index, dir);
            }}
            className={`h-1 transition-all duration-500 rounded-full ${
              currentIndex === index
                ? "w-12 bg-[#543e36]"
                : "w-6 bg-white/40 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}