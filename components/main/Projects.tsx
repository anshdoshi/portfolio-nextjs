"use client";

import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "../sub/ProjectCard";

const projects = [
  {
    src: "/autoswitch_ss.png",
    title: "AutoSwitch",
    link: "https://autoswitch.in",
  },
  {
    src: "/project3.jpeg",
    title: "Silverline Wholesale",
    link: "https://silverlinewholesale.com/",
  },
  {
    src: "/project4.jpeg",
    title: "Jumppoint",
    link: "https://www.jumppoint.io/en/home",
  },
  {
    src: "/project1.jpeg",
    title: "AZ India",
    link: "https://www.azindia.com/",
  },
  {
    src: "/project2.jpeg",
    title: "Beauty Salon Application",
  },
  {
    src: "/project6.jpeg",
    title: "Portfolio Website",
  },
  {
    src: "/project5.jpeg",
    title: "All in One Distributions",
  },
];

const Projects = () => {
  return (
    <section
      className="relative w-full py-16 md:py-24"
      id="projects"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight">
            My Projects
          </h2>
          <p className="mt-4 text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            A collection of projects I&apos;ve worked on, showcasing my skills in full-stack development
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <ProjectCard
                src={project.src}
                title={project.title}
                link={project.link}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
