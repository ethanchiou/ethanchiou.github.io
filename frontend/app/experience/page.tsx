'use client';

import { useEffect, useState } from 'react';
import ExperienceItem from '@/components/ExperienceItem';

interface Experience {
    id: number;
    company: string;
    role: string;
    period: string;
    description: string;
}

export default function ExperiencePage() {
    const [experience, setExperience] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/experience`);
                if (res.ok) {
                    const data = await res.json();
                    setExperience(data);
                }
            } catch (error) {
                console.error('Failed to fetch experience:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchExperience();
    }, []);

    return (
        <div className="py-10 px-8">
            <h1 className="text-4xl font-bold mb-12 tech-glow border-b border-gray-800 pb-4 inline-block">
                EXPERIENCE
            </h1>

            {loading ? (
                <div className="text-[#00f0ff] animate-pulse font-mono text-center py-20">LOADING CHRONICLES...</div>
            ) : (
                <div className="w-full">
                    {experience.map((exp) => (
                        <ExperienceItem
                            key={exp.id}
                            company={exp.company}
                            role={exp.role}
                            period={exp.period}
                            description={exp.description}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
