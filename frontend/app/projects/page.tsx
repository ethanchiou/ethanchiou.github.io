'use client';

import { useEffect, useState } from 'react';
import ProjectCard from '@/components/ProjectCard';

interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    link: string;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`);
                if (res.ok) {
                    const data = await res.json();
                    setProjects(data);
                    setFilteredProjects(data);
                }
            } catch (error) {
                console.error('Failed to fetch projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        const results = projects.filter(project =>
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredProjects(results);
    }, [searchTerm, projects]);

    return (
        <div className="py-10 px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-800 pb-4">
                <h1 className="text-4xl font-bold tech-glow">
                    PROJECTS
                </h1>
                <div className="relative w-full md:w-80">
                    <input
                        type="text"
                        placeholder="search for a project, technology, or framework"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-black/50 border border-gray-700 text-[#ededed] px-5 py-3 w-full focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                        🔍
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="text-[#00f0ff] animate-pulse font-mono text-center py-20">LOADING SYSTEM DATA...</div>
            ) : (
                <div className="grid grid-cols-1 gap-12">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                title={project.title}
                                description={project.description}
                                technologies={project.technologies}
                                link={project.link}
                            />
                        ))
                    ) : (
                        <div className="text-gray-500 text-center py-20 font-mono">NO PROJECTS FOUND MATCHING QUERY</div>
                    )}
                </div>
            )}
        </div>
    );
}
