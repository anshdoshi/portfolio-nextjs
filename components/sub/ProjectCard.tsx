"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

interface Props {
  src: string;
  title: string;
  description?: string;
  link?: string;
}

const ProjectCard = ({ src, title, description = "", link = "" }: Props) => {
  const CardWrapper = link ? motion.a : motion.div;

  return (
    <CardWrapper
      href={link || undefined}
      target={link ? "_blank" : undefined}
      rel={link ? "noopener noreferrer" : undefined}
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1a2e]/80 to-[#16213e]/80 backdrop-blur-sm cursor-pointer"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-80" />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* External Link Icon */}
        {link && (
          <div className="absolute top-3 right-3 p-2 rounded-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-white line-clamp-1">
            {title}
          </h3>
          {link && (
            <span className="text-xs text-purple-400/70 hidden sm:block">
              View
            </span>
          )}
        </div>

        {description && (
          <p className="mt-2 text-sm text-gray-400 line-clamp-2">{description}</p>
        )}

        {/* Bottom Accent Line */}
        <div className="mt-3 h-[2px] w-0 bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-500" />
      </div>

      {/* Card Border Glow on Hover */}
      <div className="absolute inset-0 rounded-xl border border-purple-500/0 group-hover:border-purple-500/50 transition-all duration-300 pointer-events-none" />
    </CardWrapper>
  );
};

export default ProjectCard;
