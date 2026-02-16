'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react';
import Pikachu from '../normalComponents/pikachu';
import { BsGithub } from 'react-icons/bs';
import { FaCode } from 'react-icons/fa';
import { VscOpenPreview } from 'react-icons/vsc';

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface dataProp {
    id: number;
    name: string;
    tech: never[];
    live: string;
    code: string;
    img: string;
    color: string;
}

const ProjectCard = ({ data, func }: { data: dataProp, func: (index: number) => void }) => {
    const boxContainer = useRef<HTMLDivElement | null>(null)
    const cardRef = useRef<HTMLDivElement | null>(null) // 1. New ref for the inner card
    const tl = useRef<GSAPTimeline | null>(null)
    const svgRef = useRef<HTMLDivElement | null>(null)
    useGSAP(() => {
        tl.current = gsap.timeline({ paused: true, force3D: true })
        tl.current.to(svgRef.current, {
            top: '-50',
            duration: 0.4,
            ease: 'power2.out'
        })
        // Trigger for the index change (Logic side)
        ScrollTrigger.create({
            trigger: boxContainer.current,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => func(data.id - 1),
            onEnterBack: () => func(data.id - 1),
        })


        gsap.from(cardRef.current, {
            scale: 0.8,
            rotate: 20,
            opacity: 0,
            scrollTrigger: {
                trigger: boxContainer.current,
                start: 'top bottom',           // Starts when top of container hits bottom of screen
                end: 'top center',             // Finishes when top of container hits middle
                scrub: true,
            }
        })

    }, { scope: boxContainer })


    const hoverIn = () => {
        if (!tl.current) {
            return
        }
        tl.current.play()
    }
    const hoverOut = () => {
        if (!tl.current) {
            return
        }
        tl.current.reverse()
    }


    return (
        // The trigger: remains a stable 100vh block in the scroll flow
        <div ref={boxContainer} className='h-screen w-full flex items-center justify-center overflow-hidden'>
            {/* The animation target: the actual visual card */}
            <div onMouseEnter={hoverIn}
                onMouseLeave={hoverOut}
                ref={cardRef}
                className={`h-[80%]  w-[80%] relative shrink-0 rounded-3xl shadow-2xl `}
            >
                {/* Card Content */}
                <div className='w-full rounded-3xl h-full relative z-10 p-12 inset-0 bg-white'>
                    <div className='text-background font-semibold text-4xl w-full flex items-center justify-between'>
                        <VscOpenPreview className='cursor-pointer '/>
                        <FaCode className='cursor-pointer ' />
                    </div>
                </div>


                <div ref={svgRef} className='absolute top-20 right-[10%] z-0 will-change-transform'>
                    <svg

                        viewBox="0 0 600 600"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-20 aspect-square" // Adjusted width for visibility
                        style={{ overflow: 'visible' }}

                    >
                        {/* FACE */}
                        <circle cx={300} cy={300} r={260} fill="#fe5f55" />

                        {/* EYES GROUP */}
                        <g className="eyes">

                            {/* LEFT EYE */}
                            <g className="eye-left" transform="translate(210 260)">
                                {/* Open State */}
                                <g className="eye-open">
                                    <circle className="eyeball" cx={0} cy={0} r={45} fill="#e6e6e6" />
                                    <circle className="pupil" cx={10} cy={-5} r={18} fill="#222" />
                                </g>
                                {/* Closed State (Curved Line) */}
                                <path
                                    className="eye-closed"
                                    d="M -35 5 Q 0 25 35 5"
                                    fill="none"
                                    stroke="#0f4c85"
                                    strokeWidth="20"
                                    strokeLinecap="round"
                                    opacity="0"
                                />
                            </g>

                            {/* RIGHT EYE */}
                            <g className="eye-right" transform="translate(360 260)">
                                {/* Open State */}
                                <g className="eye-open">
                                    <circle className="eyeball" cx={0} cy={0} r={45} fill="#e6e6e6" />
                                    <circle className="pupil" cx={10} cy={-5} r={18} fill="#222" />
                                </g>
                                {/* Closed State (Curved Line) */}
                                <path
                                    className="eye-closed"
                                    d="M -35 5 Q 0 25 35 5"
                                    fill="none"
                                    stroke="#0f4c85"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    opacity="0"
                                />
                            </g>

                        </g>
                    </svg>
                </div>
            </div>

        </div>
    );
};

export default ProjectCard;