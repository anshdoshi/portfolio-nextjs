import React from "react";
import ProjectCard from "../sub/ProjectCard";

const Projects = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-20"
      id="projects"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        My Projects
      </h1>
      <div className="h-full w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-10">
        <ProjectCard
          src="/project3.jpeg"
          title="Silverline Wholesale"
          link="https://silverlinewholesale.com/"
          // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
        <ProjectCard
          src="/project4.jpeg"
          title="Jumppoint"
          link="https://www.jumppoint.io/en/home"
          // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
        <ProjectCard
          src="/project1.jpeg"
          title="AZ India"
          link="https://www.azindia.com/"
          // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
        <ProjectCard
          src="/project2.jpeg"
          title="Beauty Salon Application"
          // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />

        <ProjectCard
          src="/project6.jpeg"
          title="Ansh Doshi Portfolio Website"
          // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
        <ProjectCard
          src="/project5.jpeg"
          title="All in One Distributions"
          // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      </div>
    </div>
  );
};

export default Projects;
