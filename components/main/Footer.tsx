import React from "react";
import { RxGithubLogo } from "react-icons/rx";
import { FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="w-full bg-transparent text-gray-200 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-around gap-10 mb-10">
          {/* Community Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-heading font-semibold text-base text-white mb-4">
              Community
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.linkedin.com/in/anshdoshi10/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors"
              >
                <FaLinkedin className="text-base" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/anshdoshi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors"
              >
                <RxGithubLogo className="text-base" />
                <span>GitHub</span>
              </a>
              <a
                href="https://leetcode.com/u/anshdoshi2305/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors"
              >
                <SiLeetcode className="text-base" />
                <span>LeetCode</span>
              </a>
            </div>
          </div>

          {/* About Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-heading font-semibold text-base text-white mb-4">
              About
            </h3>
            <div className="flex flex-col gap-3">
              <span className="text-sm text-gray-400">Become Sponsor</span>
              <span className="text-sm text-gray-400">Learning about me</span>
              <a
                href="mailto:doshiansh10@gmail.com"
                className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
              >
                doshiansh10@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-gray-800">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Ansh Doshi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
