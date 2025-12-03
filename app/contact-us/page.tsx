"use client";
import React from "react";
import Header from "@/components/header";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

// ----------------------
// CONTACT DETAIL ITEM
// ----------------------
const ContactDetail = ({ icon: Icon, title, content, link }) => (
  <div className="flex items-start p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
    <div
      className={`shrink-0 p-3 rounded-full ${
        title === "WhatsApp"
          ? "bg-[#543e36] text-white"
          : "bg-[#543e36] text-white"
      }`}
    >
      <Icon size={24} />
    </div>
    <div className="ml-5">
      <h3 className="text-xl font-semibold text-gray-900 mb-1">{title}</h3>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-[#543e36] transition font-medium block"
        >
          {content}
        </a>
      ) : (
        <div className="text-gray-600 space-y-1 text-sm">
          {Array.isArray(content)
            ? content.map((line, index) => <p key={index}>{line}</p>)
            : content}
        </div>
      )}
    </div>
  </div>
);

// ----------------------
// SOCIAL ICON ITEM
// Supports both: icon OR image
// ----------------------
const SocialIcon = ({ icon: Icon, href, image }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-12 h-12 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full 
               hover:bg-[#543e36] hover:text-white transition-all duration-300 transform hover:scale-105"
  >
    {image ? (
      <Image
        src={image}
        alt="Social Icon"
        width={22}
        height={22}
        className="object-contain"
      />
    ) : (
      <Icon size={22} />
    )}
  </a>
);

function Page() {
  // CONTACT DATA
  const contactData = [
    {
      icon: MapPin,
      title: "Location",
      content: ["Sapele,", "Delta State, Nigeria"],
    },
    {
      icon: Phone,
      title: "Phone",
      content: [
        <a key="phone1" href="tel:+2349159256954" className="block">
          +234 915 925 6954
        </a>,
        // <a key="phone2" href="tel:+2348123456789" className="block">
        //   +234 812 345 6789
        // </a>,
      ],
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@efemenaconstruction.com",
      link: "mailto:info@efemenaconstruction.com",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      content: "Chat instantly with our team",
      link:
        "https://wa.me/2349159256954?text=Hello!%20I%20would%20like%20to%20make%20an%20enquiry",
    },
  ];

  // SOCIAL MEDIA LINKS
  const socialData = [
    { icon: Facebook, href: "https://facebook.com/efemenaconstruction" },
    { icon: Instagram, href: "https://instagram.com/efemenaconstruction" },
    // { icon: Linkedin, href: "https://linkedin.com/company/efemena-construction" },
    // { icon: Twitter, href: "https://twitter.com/efemena_const" },
    { image: "/tik-tok.png", href: "https://tiktok.com/@efemenaconstruction" }, // TikTok (Local Image)
  ];

  return (
    <div className="min-h-screen flex font-alilato flex-col bg-gray-50">
      <Header />

      {/* HERO SECTION */}
      <div
        className="relative w-full h-[50vh] bg-cover bg-center flex flex-col items-start justify-center px-6 sm:px-12 lg:px-20 shadow-md"
        style={{ backgroundImage: "url('/projects/IMG-20251130-WA0004.jpg')" }}
      >
        <div className="absolute inset-0 bg-gray-900/70" />
        <div className="relative z-10 text-white">
          <p className="text-md md:text-lg font-medium text-amber-300 mb-2 uppercase tracking-widest">
            Connect with Us
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold">CONTACT US</h1>
        </div>
      </div>

      {/* MAIN CONTACT SECTION */}
      <div className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Intro */}
          <div className="text-center mb-12 lg:mb-20">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              We're Ready to Build Your Vision
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Whether you need consultation, cladding installation, or detailed
              project planning, our team is here to assist you instantly.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* CONTACT CARDS */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
              {contactData.map((data, index) => (
                <ContactDetail key={index} {...data} />
              ))}
            </div>

            {/* CTA BOX */}
            <div className="lg:col-span-1 flex flex-col justify-between bg-[#543e36] text-white shadow-2xl rounded-2xl p-8 md:p-10">
              <div>
                <h3 className="text-3xl font-bold mb-4">Start a Project</h3>
                <p className="text-white mb-8 leading-relaxed">
                  The fastest way to reach us is through WhatsApp. Click below
                  to chat now and get a quick quote or set up a consultation.
                </p>
              </div>

              <a
                href="https://wa.me/2349159256954?text=Hello!%20I%20am%20interested%20in%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-white text-[#543e36] font-extrabold py-4 px-6 rounded-full text-lg hover:bg-gray-100 transition-all shadow-xl"
              >
                {/* <MessageCircle size={24} className="text-green-500" /> */}
                Contact Us Now
              </a>
            </div>
          </div>

          {/* SOCIAL MEDIA */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Follow Our Journey
            </h3>
            <div className="flex justify-center gap-6">
              {socialData.map((social, index) => (
                <SocialIcon key={index} {...social} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="w-full bg-[#543e36] text-white py-6 text-center shadow-inner">
        <p className="text-sm opacity-70">
          © 2025 Efemena Construction & Cladding. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Page;
