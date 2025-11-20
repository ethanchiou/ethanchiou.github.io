'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import ExperienceItem from "@/components/ExperienceItem";

export default function Home() {
  const [bioText, setBioText] = useState("");
  const fullBio = " Full Stack Developer | Aspiring ML and Robotics Engineer\nSoftware Engineering @McMaster University ";
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [recentExperience, setRecentExperience] = useState([]);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullBio.length) {
        setBioText(fullBio.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`);
        const expRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/experience`);
        if (projectsRes.ok && expRes.ok) {
          const projects = await projectsRes.json();
          const experience = await expRes.json();
          setFeaturedProjects(projects.slice(0, 2)); // Show first 2 projects
          setRecentExperience(experience.slice(0, 2)); // Show first 2 experiences
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center w-full py-12">
        <div className="mb-12 relative w-full h-32 md:h-48">
          <Image
            src="/images/logo_ethanchiou_cursive.png"
            alt="EthanChiou"
            fill
            className="object-contain drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            priority
          />
        </div>

        <h2 className="text-xl md:text-2xl text-gray-400 mb-16 px-8 leading-relaxed h-16">
          <span className="text-[#ededed]">{bioText}</span>
          <span className="animate-pulse text-[#00f0ff]">_</span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-6 mb-24 w-full px-6 sm:px-0 sm:w-auto">
          <Link
            href="/projects"
            className="px-10 py-4 bg-[#00f0ff]/10 border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-all duration-300 font-bold tracking-wide shadow-[0_0_15px_rgba(0,240,255,0.1)] hover:shadow-[0_0_25px_rgba(0,240,255,0.3)]"
          >
            VIEW WORK
          </Link>
          <Link
            href="/experience"
            className="px-10 py-4 border border-gray-700 text-gray-300 hover:border-[#ededed] hover:text-[#ededed] transition-all duration-300 font-bold tracking-wide hover:shadow-[0_0_15px_rgba(237,237,237,0.1)]"
          >
            EXPERIENCE
          </Link>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 text-gray-500 font-mono text-sm w-full px-6">
          {/*Avalible on every device*/}
          <div>PYTHON</div>
          <div>PYTORCH</div>
          <div>REACT</div>
          <div>C++</div>
          <div>C</div>
          <div>JAVA</div>
          {/* On larger displays*/}
          <div className="hidden lg:block">NUMPY</div>
          <div className="hidden lg:block">LINUX</div>
          <div className="hidden lg:block">FASTAPI</div>
          <div className="hidden lg:block">EMBEDDED</div>
          <div className="hidden lg:block">SYSTEMS</div>
          <div className="hidden lg:block">GIT</div>
        </div>
      </div>

      {/* Projects im displaying on homepage */}
      <div className="w-full py-20 border-t border-gray-900/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
          <h2 className="text-2xl font- tech-glow">what ive been working on</h2>
          <Link href="/projects" className="text-[#00f0ff] hover:text-[#00ff9d] text-sm tracking-widest transition-colors">VIEW ALL &rarr;</Link>
        </div>
        <div className="grid grid-cols-1 gap-8">
          {featuredProjects.map((project: any) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={//To preserve \n
              <div style= {{whiteSpace: "pre-line"}}>
              {project.description}
              </div>
              }
              technologies={project.technologies}
              link={project.link}
            />
          ))}
        </div>
      </div>

      {/* Recent Experience */}
      <div className="w-full py-20 border-t border-gray-900/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
          <h2 className="text-2xl font-bold tech-glow">experience</h2>
          <Link href="/experience" className="text-[#00f0ff] hover:text-[#00ff9d] text-sm tracking-widest transition-colors">VIEW ALL &rarr;</Link>
        </div>
        <div className="space-y-8">
          {recentExperience.map((exp: any) => (
            <ExperienceItem
              key={exp.id}
              company={exp.company}
              role={exp.role}
              period={exp.period}
              description={//To preserve \n
                <div style= {{whiteSpace: "pre-line"}}>
                {exp.description}
                </div>
                }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
