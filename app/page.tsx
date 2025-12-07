"use client";

import Image from "next/image";
import Hero from "../components/hero";
import Header from "@/components/header";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const featuredProjects = [
    {
      title: "Modern Bungalow",
      description:
        "Construction of a modern 10-story office tower with advanced cladding.",
      imageSrc: "/projects/IMG-20251202-WA0006.jpg",
    },
    {
      title: "Premium Modern Smart-Home",
      description:
        "Full design and construction of twin luxury residential skyscrapers.",
      imageSrc: "/projects/IMG-20251130-WA0006.jpg",
    },
    {
      title: "Urban Hotel",
      description:
        "Built-to-suit logistics warehouse, covering over 50,000 square meters.",
      imageSrc:
        "/projects/WhatsApp Image 2025-11-30 at 09.20.45_56083dca.jpg",
    },
    {
      title: "Highway Bypass",
      description:
        "Civil engineering project involving 15km of road and bridge construction.",
      imageSrc:
        "/projects/WhatsApp Image 2025-11-30 at 09.20.49_219bac9d.jpg",
    },
    {
      title: "University Hall",
      description:
        "Construction of a state-of-the-art auditorium and lecture hall complex.",
      imageSrc:
        "/projects/WhatsApp Image 2025-11-30 at 09.24.30_d8cf2518.jpg",
    },
    {
      title: "Commercial Retail Center",
      description:
        "Development of a multi-level shopping and retail facility in Abuja.",
      imageSrc:
        "/projects/WhatsApp Image 2025-11-30 at 09.16.17_916e2234.jpg",
    },
    {
      title: "Hospital Extension",
      description:
        "Addition of a new wing to an existing hospital, specializing in facade installation.",
      imageSrc:
        "/projects/WhatsApp Image 2025-11-30 at 09.20.42_0f11f8f1.jpg",
    },
    {
      title: "Cladding Refurbishment",
      description:
        "Complete overhaul of exterior aluminium cladding on an older high-rise.",
      imageSrc:
        "/projects/WhatsApp Image 2025-11-30 at 09.20.44_3da46350.jpg",
    },
  ];

  return (
    <div className="flex flex-col bg-[#ececec] min-h-screen w-full">

      {/* Header */}
      <Header />

      {/* Hero */}
      <Hero />

      <div className="flex flex-col gap-5 md:gap-20 w-full">

        {/* ABOUT SECTION */}
        <div
          id="about"
          className="
            bg-white w-full 
            px-6 sm:px-10 md:px-16 lg:px-24 xl:px-40 
            py-16 
            flex flex-col lg:flex-row items-center gap-10 lg:gap-20
        "
        >
          {/* Left Content */}
          <div className="flex flex-col items-start text-black gap-5 w-full">
            <div className="relative group w-full">
              <h1 className="text-[#543e36] text-3xl font-medium md:text-4xl">About</h1>
              <div className="absolute bottom-0 left-0 h-px bg-[#543e36]/50 w-1/2"></div>
            </div>

            <h2 className="text-base md:text-lg leading-relaxed">
              Efemena Construction & Cladding Ltd is a leading building and civil 
              engineering contracting firm in Nigeria, recognized for its strong heritage, 
              professional expertise, and unwavering commitment to service excellence.
            </h2>

            {/* <div className="relative group">
              <button className="text-lg md:text-xl font-bold">
                Learn more
              </button>
              <div className="absolute bottom-0 left-0 h-0.5 w-1/4 bg-black group-hover:w-full transition-all duration-300"></div>
            </div> */}
          </div>

          {/* Right Image */}
          <div className="w-full relative">
            <Image
              src="/IMG-20251019-WA0041.jpg"
              alt="efemena"
              width={1400}
              height={1400}
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>

        {/* SERVICES SECTION */}
        <div
          id="services"
          className="
            bg-white w-full 
            px-6 sm:px-10 md:px-16 lg:px-24 xl:px-40 
            py-16 
            flex flex-col lg:flex-row items-center gap-10 lg:gap-20
        "
        >
          {/* Image */}
          <div className="w-full relative">
            <Image
              src="/projects/WhatsApp Image 2025-11-30 at 09.11.17_fff1a717.jpg"
              alt="services"
              width={1400}
              height={1400}
              className="w-full h-auto rounded-md"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col items-start text-black gap-5 w-full">
            <div className="relative group w-full">
              <h1 className="text-[#543e36] font-medium text-3xl md:text-4xl">
                Our Services
              </h1>
              <div className="absolute bottom-0 left-0 h-px bg-[#543e36]/50 w-1/2"></div>
            </div>

            <h2 className="text-base md:text-lg leading-relaxed">
              Efemena Construction & Cladding Ltd delivers top-tier building
              and civil engineering services backed by unparalleled expertise.
            </h2>

            {["Construction", "Cladding", "Renovation"].map((service) => (
              <div className="relative group" key={service}>
                <button className="text-xl font-medium">{service}</button>
                <div className="absolute bottom-0 left-0 h-0.5 w-1/4 bg-black group-hover:w-full transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURED PROJECTS */}
        <div
          className="
            w-full bg-white 
            py-20 
            px-6 sm:px-10 md:px-16 lg:px-24 xl:px-40 
            flex flex-col gap-10
        "
        >
          <h1 className="text-[#543e36] text-3xl md:text-4xl font-semibold border-b border-[#543e36]/20 pb-4">
            Featured Projects
          </h1>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {featuredProjects.map((project, index) => (
              <div
                key={index}
                className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4 flex flex-col gap-2">
                  <h2 className="text-lg text-black font-bold">{project.title}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="flex justify-center">
            <button
              onClick={() => router.push("/projects")}
              className="px-8 py-4 bg-[#543e36] text-white text-sm font-bold tracking-widest shadow-lg hover:bg-white hover:text-[#543e36] transition-colors duration-300"
            >
              VIEW ALL PROJECTS
            </button>
          </div>
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
                CONTACT US
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
    </div>
  );
}
