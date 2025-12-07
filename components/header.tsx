import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Simple SVG Icons for Menu and Close
const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  // Define navigation links
  const navLinks = [
    { href: "/", label: "Home" }, // Changed / to #home for internal linking compatibility
    { href: "/#about", label: "About Us" },
    { href: "/#services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false); // Close menu on navigation
    // Use standard window navigation instead of Next.js router
    router.push(href);
  }
  
  // Handles the logo click for navigation to home
  const handleLogoClick = () => {
    router.push("/");
  }

  return (
    <header className="w-full shadow-lg">
      {/* Top Section: Logo + Social Icons */}
      <div className="flex bg-white px-6 md:px-20 pt-10 pb-5 justify-between items-center">
        
        {/* Logo + Text */}
        <div 
          className="flex items-center gap-5"
        >
          {/* Using PlaceholderImage component */}
          <Image
            src="/IMG-20251019-WA0041.jpg"
            alt="efemena-logo"
            width={128} // Corresponds to md:w-32 (128px)
            height={48} //  Adjust height as needed for aspect ratio
            className="w-16 sm:w-20 md:w-32 h-auto cursor-pointer"
            onClick={handleLogoClick}
          />
          <h1 className="hidden md:block text-black text-xl md:text-2xl font-extrabold tracking-tight">
            EFEMENA CONSTRUCTION
          </h1>
        </div>

        {/* Social Icons (Adjusted size for better mobile target) */}
        <div className="flex gap-4 sm:gap-6">
          {/* Use standard <a> tag instead of Next.js Link */}
          <a 
          href="https://wa.me/2349159256954?text=Hello!%20I%20am%20interested%20in%20your%20services" 
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp">
            {/* Using placeholder for social icons */}
            <Image
              src="/whatsapp-svgrepo-com.svg"
              alt="whatsapp"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </a>
          {/* Use standard <a> tag instead of Next.js Link */}
          <a 
          target="_blank"
          href="https://www.instagram.com/godsfavourgeorge20" aria-label="Instagram">
            <Image
              src="/instagram-logo.svg"
              alt="instagram"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </a>
        </div>
      </div>

      {/* Bottom Nav Section (Desktop/Mobile Toggle Bar) */}
      <div className="flex justify-end bg-[#543e36] text-white h-16 items-center px-6 md:px-28 md:justify-between relative z-10">
        
        {/* Certified Text (Visible on Desktop) */}
        <p className="hidden md:block text-sm font-light">
          Registraion Number : 8337588
        </p>

        {/* Hamburger/Close Button (Visible on Mobile/Tablet) */}
        <button
          className="md:hidden p-2 rounded-md bg-opacity-10 hover:bg-opacity-20 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? (
            <CloseIcon className="w-6 h-6 text-white" />
          ) : (
            <MenuIcon className="w-6 h-6 text-white" />
          )}
        </button>

        {/* Desktop Navigation Links (Hidden on Mobile/Tablet) */}
        <nav className="hidden md:block">
          <ul className="flex gap-6 md:gap-10 text-white uppercase font-light tracking-wide">
            {navLinks.map(link => (
              <li key={link.href}>
                {/* Use standard <a> tag instead of Next.js Link */}
                <a 
                  href={link.href} 
                  className="hover:text-amber-300 transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      

        {/* Mobile Menu Overlay */}
        <div
        className={`md:hidden fixed top-0 right-0 w-full h-full bg-[#543e36] bg-opacity-95 backdrop-blur-sm z-40 
            transition-transform duration-300 ease-in-out 
            ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
        {/* Header with Close Button */}
        <div className="flex justify-end p-6">
            <button 
            onClick={() => setIsMenuOpen(false)} 
            aria-label="Close navigation menu"
            >
            <CloseIcon className="w-7 h-7 text-white" />
            </button>
        </div>

        {/* Menu Items */}
        <div className="px-6 mt-10">
            <ul className="flex flex-col gap-8 text-white uppercase font-semibold text-xl">
            {navLinks.map(link => (
                <li key={link.href}>
                <button
                    onClick={() => handleLinkClick(link.href)}
                    className="w-full text-left py-2 border-b border-white/20 flex justify-center hover:text-amber-300 transition-colors duration-200"
                >
                    {link.label}
                </button>
                </li>
            ))}

            {/* Registration Text */}
            <li className="mt-10 text-xs font-light text-white/70">
                <p>REGISTRATION:</p>
                <p>8337588</p>
            </li>
            </ul>
        </div>
        </div>

    </header>
  );
}