"use client"
import React from 'react'
import Header from '@/components/header'
import { MapPin, Phone, Mail, MessageCircle, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

function Page() {
  return (
    <div className="min-h-screen flex font-alilato flex-col">
      <Header />

      {/* HERO */}
      <div
        className="relative w-full h-[60vh] bg-cover bg-center flex flex-col items-start justify-center px-8 md:px-20"
        style={{ backgroundImage: "url('/projects/IMG-20251130-WA0004.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">CONTACT US</h1>
          {/* <p className="text-lg md:text-xl opacity-90">We'd love to hear from you. Get in touch today!</p> */}
        </div>
      </div>

      {/* CONTACT SECTION */}
      <div className="flex-1 bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Get in Touch</h2>
              <p className="text-gray-600 leading-relaxed">
                Have a project in mind? Need cladding or construction services? 
                Reach out to us — we&apos;re here to help bring your vision to life.
              </p>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4">
                <div className="bg-amber-700 text-white p-3 rounded-lg">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Office Address</h3>
                  <p className="text-gray-600">
                    No. 12 Airport Road,<br />
                    Effurun, Warri,<br />
                    Delta State, Nigeria
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="bg-amber-700 text-white p-3 rounded-lg">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Phone</h3>
                  <p className="text-gray-600">
                    <a href="tel:+2348037865432" className="hover:text-amber-700 transition">+234 803 786 5432</a><br />
                    <a href="tel:+2348123456789" className="hover:text-amber-700 transition">+234 812 345 6789</a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="bg-amber-700 text-white p-3 rounded-lg">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <a href="mailto:info@efemenaconstruction.com" className="text-gray-600 hover:text-amber-700 transition">
                    info@efemenaconstruction.com
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex gap-4">
                <div className="bg-green-600 text-white p-3 rounded-lg">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">WhatsApp</h3>
                  <a
                    href="https://wa.me/2348037865432?text=Hello!%20I'm%20interested%20in%20your%20construction%20services"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-green-600 transition font-medium"
                  >
                    Chat with us on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-6">
              <h3 className="font-semibold text-gray-800 mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="https://facebook.com/efemenaconstruction" target="_blank" rel="noopener noreferrer"
                  className="bg-amber-700 text-white p-3 rounded-full hover:bg-amber-800 transition">
                  <Facebook size={20} />
                </a>
                <a href="https://instagram.com/efemenaconstruction" target="_blank" rel="noopener noreferrer"
                  className="bg-amber-700 text-white p-3 rounded-full hover:bg-amber-800 transition">
                  <Instagram size={20} />
                </a>
                <a href="https://linkedin.com/company/efemena-construction" target="_blank" rel="noopener noreferrer"
                  className="bg-amber-700 text-white p-3 rounded-full hover:bg-amber-800 transition">
                  <Linkedin size={20} />
                </a>
                <a href="https://twitter.com/efemena_const" target="_blank" rel="noopener noreferrer"
                  className="bg-amber-700 text-white p-3 rounded-full hover:bg-amber-800 transition">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Optional: Contact Form (you can add later) */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
            <form className="space-y-6">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-700" required />
              <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-700" required />
              <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-700" />
              <textarea placeholder="Your Message" rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-700" required></textarea>
              <button type="submit" className="w-full bg-amber-700 text-white font-semibold py-4 rounded-lg hover:bg-amber-800 transition">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-[#543e36] text-white py-8 text-center">
        <p className="text-sm opacity-80">© 2025 Efemena Construction & Cladding. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Page