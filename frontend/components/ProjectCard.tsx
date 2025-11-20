import React from 'react';

interface ProjectProps {
    title: string;
    description: React.ReactNode; // Allows string or JSX so that I can keep \n whitespace
    technologies: string[];
    link: string;
}

const ProjectCard: React.FC<ProjectProps> = ({ title, description, technologies, link }) => {
    return (
        <div className="p-8 border border-[rgba(0,240,255,0.2)] bg-zinc-900/80 hover:bg-zinc-800/80 transition-all duration-300 group rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]">
            <h3 className="text-2xl font-bold mb-4 text-[#00f0ff] group-hover:text-[#00ff9d] transition-colors">
                {title}
            </h3>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">{description}</p>
            <div className="flex flex-wrap gap-3 mb-6">
                {technologies.map((tech) => (
                    <span key={tech} className="text-sm px-3 py-1 border border-gray-600 text-gray-300 rounded-full bg-black/30">
                        {tech}
                    </span>
                ))}
            </div>
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[#00f0ff] hover:text-[#00ff9d] font-bold tracking-wide border-b border-[#00f0ff] hover:border-[#00ff9d] pb-1 transition-colors"
            >
                VIEW PROJECT &rarr;
            </a>
        </div>
    );
};

export default ProjectCard;
