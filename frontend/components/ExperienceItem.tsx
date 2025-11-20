import React from 'react';

interface ExperienceProps {
    company: string;
    role: string;
    period: string;
    description: React.ReactNode;// Allows string or JSX so that I can keep \n whitespace
}

const ExperienceItem: React.FC<ExperienceProps> = ({ company, role, period, description }) => {
    return (
        <div className="relative pl-10 pb-16 border-l-2 border-[rgba(0,240,255,0.3)] last:pb-0">
            <div className="absolute left-[-6px] top-0 w-3 h-3 bg-[#00f0ff] rounded-full shadow-[0_0_15px_#00f0ff]"></div>
            <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h3 className="text-xl font-bold text-[#ededed]">{company}</h3>
                <span className="text-sm text-[#00f0ff] font-mono">{period}</span>
            </div>
            <div className="text-[#00ff9d] mb-4 font-medium text-lg">{role}</div>
            <p className="text-gray-400 leading-relaxed text-base pr-4">{description}</p>
        </div>
    );
};

export default ExperienceItem;
