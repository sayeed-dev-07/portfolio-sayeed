import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const educationData = [
    {
        id: 1,
        title: "Diploma in Computer Science Technology",
        organization: "Rangpur Polytechnic Institute",
        duration: "2022 — 2025",
        description: "Built strong fundamentals in software engineering, data structures, algorithms and problem solving",
        status: "Completed",
    },
    {
        id: 2,
        title: "Frontend Developer Intern",
        organization: "Bd Calling It.",
        duration: "Aug 2025 — Nov 2025",
        description: "Developed and maintained responsive user interfaces using React and TailwindCSS.",
        status: "Internship",
    },
    {
        id: 3,
        title: "Full-Stack Course",
        organization: "The Odin Project",
        duration: "Ongoing",
        description: "Currently following a full-stack open-source curriculum 'THE ODIN PROJECT' while strengthening problem-solving skills, clean code practices, and modern web development fundamentals.",
        status: "Ongoing",
    },
];

const getStatusBadge = (status: string) => {
    switch (status) {
        case "Completed":
            return "bg-emerald-100 text-emerald-700 border-emerald-200";
        case "Internship":
            return "bg-blue-100 text-blue-700 border-blue-200";
        case "Ongoing":
            return "bg-indigo-100 text-indigo-700 border-indigo-200";
        default:
            return "bg-gray-100 text-gray-700 border-gray-200";
    }
};

export default function EducationSection() {
    const sectionRef = useRef(null);
    const lineRef = useRef(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        // 1. Draw the vertical line as you scroll
        gsap.fromTo(
            lineRef.current,
            { scaleY: 0 },
            {
                scaleY: 1,
                ease: "none",
                force3D: true,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "clamp(top 90%)", // Line starts drawing when section top hits center of viewport
                    end: "clamp(bottom 90%)", // Finishes drawing at bottom
                    scrub: true,
                },
            }
        );

        // 2. Animate Dots and Cards in sync with the line
        cardsRef.current.forEach((card, index) => {
            const dot = dotsRef.current[index];

            // Pop the dot in and reverse on scroll back
            gsap.fromTo(
                dot,
                { scale: 0 },
                {
                    scale: 1,
                    duration: 0.4,
                    ease: "back.out(2)",
                    force3D: true,
                    scrollTrigger: {
                        trigger: card,
                        start: "clamp(top 90%)",

                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Scale the card in and reverse on scroll back
            gsap.fromTo(
                card,
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out",
                    force3D: true,
                    scrollTrigger: {
                        trigger: card,
                        start: "clamp(top 90%)",
                        // play on enter, reverse on leave back
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="py-24 bg-[#e3d7a9] text-gray-900 overflow-hidden relative"
        >
            {/* SVG Filter for Hand-drawn Border Effect */}
            <svg className="w-0 h-0 absolute pointer-events-none">
                <filter id="sketchy-border">
                    <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
                </filter>
            </svg>

            <div className="max-w-5xl mx-auto px-6">
                <header className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-futura mb-3 text-black">
                        Education & Training
                    </h2>
                    <p className="max-w-xl mx-auto text-gray-800 font-medium">
                        My academic background, professional experience, and continuous journey of learning.
                    </p>
                </header>

                <div className="relative">
                    {/* Vertical Timeline Line */}
                    <div
                        ref={lineRef}
                        className="absolute will-change-transform top-0 bottom-0 left-5.75 md:left-1/2 w-0.5 bg-black md:-translate-x-1/2 origin-top"
                    />

                    {educationData.map((item, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <div
                                key={item.id}
                                ref={(el) => { cardsRef.current[index] = el; }}
                                className={`relative flex items-start md:justify-between w-full mb-12 last:mb-0 ${isEven ? "md:flex-row-reverse" : "md:flex-row"
                                    }`}
                            >
                                {/* Timeline Dot */}
                                <div
                                    ref={(el) => { dotsRef.current[index] = el; }}
                                    className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-black top-7 -translate-x-1/2 z-10 ring-4 ring-[#e3d7a9]"
                                />

                                <div className="hidden md:block w-[45%]" />

                                {/* Card Container */}
                                <div className="w-full md:w-[45%] pl-14 md:pl-0 mt-2 md:mt-0">
                                    <div className="group relative p-6 rounded-xl bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out z-10">

                                        {/* Hand-Drawn Border Layer overlay */}
                                        <div
                                            className="absolute inset-0 border-[3px] border-black rounded-xl pointer-events-none"
                                            style={{ filter: "url(#sketchy-border)" }}
                                        />

                                        {/* Card Content */}
                                        <div className="relative z-10">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full border ${getStatusBadge(
                                                        item.status
                                                    )}`}
                                                >
                                                    {item.status}
                                                </span>
                                                <span className="text-sm font-medium text-gray-500">
                                                    {item.duration}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold mb-1 tracking-tight text-black">
                                                {item.title}
                                            </h3>
                                            <h4 className="text-sm font-bold text-indigo-600 mb-4">
                                                {item.organization}
                                            </h4>

                                            <p className="text-sm leading-relaxed text-gray-600 font-medium">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}