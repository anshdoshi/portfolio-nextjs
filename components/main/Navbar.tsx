"use client";

import { Socials } from "@/constants";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full h-[65px] fixed top-0 z-50 px-4 md:px-10 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-[#030014]/90 backdrop-blur-lg shadow-lg shadow-purple-500/10 border-purple-500/20"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto w-full h-full flex items-center justify-between">
        {/* Logo */}
        <a href="#about-me" className="flex items-center gap-3">
          <Image
            src="/ansh-logo.png"
            alt="logo"
            width={40}
            height={40}
            className="cursor-pointer"
          />
          <span className="font-heading font-bold text-white text-sm md:text-base tracking-wide">
            ANSH DOSHI
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div
            className={`flex items-center gap-6 px-6 py-2 rounded-full transition-all duration-300 ${
              isScrolled
                ? "bg-white/5 border border-white/10"
                : "bg-white/5 border border-white/10 backdrop-blur-sm"
            }`}
          >
            {["About me", "Skills", "Projects"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {Socials.map((social, index) => (
              <a
                key={index}
                href={social?.link || ""}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                <Image
                  src={social.src}
                  alt={social.name}
                  width={20}
                  height={20}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-white"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-[65px] left-0 w-full bg-[#030014]/95 backdrop-blur-lg border-t border-white/10">
          <div className="flex flex-col items-center py-6 gap-4">
            {["About me", "Skills", "Projects"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-gray-300 hover:text-white transition-colors py-2"
              >
                {item}
              </a>
            ))}
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/10">
              {Socials.map((social, index) => (
                <a
                  key={index}
                  href={social?.link || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-70 hover:opacity-100 transition-opacity"
                >
                  <Image
                    src={social.src}
                    alt={social.name}
                    width={24}
                    height={24}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
