'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import React, { useRef } from 'react';

import { FaExternalLinkAlt } from 'react-icons/fa';
import { VscGithubInverted } from 'react-icons/vsc';
import TechBox from './TechBox';

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface dataProp {
    id: number;
    name: string;
    tech: string[];
    live: string;
    code: string;
    img: string;
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
                start: 'top bottom',           
                end: 'top center',             
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
        <div ref={boxContainer} className='h-screen w-full flex md:items-center items-center mt-20 md:mt-0 justify-center overflow-hidden'>
            {/* The animation target: the actual visual card */}
            <div onMouseEnter={hoverIn}
                onMouseLeave={hoverOut}
                ref={cardRef}
                className={`w-[90%] md:w-[80%] lg:w-[70%] max-w-4xl relative shrink-0 rounded-3xl md:shadow-2xl `}
            >
                {/* Card Content */}
                <div className='w-full rounded-3xl h-full relative z-10  inset-0 bg-white'>
                    <div className='w-full p-3 md:p-4 pb-0'>
                    <div className='relative w-full aspect-video  overflow-hidden rounded-3xl shadow-inner bg-gray-100'>
                        <Image 
                            alt={data.name} 
                            src={data.img} 
                            fill 
                            className='object-cover object-top transition-transform duration-700 ease-in-out group-hover:scale-105' 
                        />
                        
                        {/* Overlay Gradient for depth */}
                        <div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                    </div>
                </div>
                    <div className='w-[95%] py-[5%] md:py-[2%] mx-auto flex flex-col md:gap-y-7 gap-y-4'>
                        <div className='flex  items-center justify-between gap-4'>
                        <h2 className='text-3xl md:text-4xl font-main font-bold text-gray-900 tracking-tight'>
                            {data.name}
                        </h2>

                        <div className='flex items-center gap-3'>
                            <a 
                                href={data.code} 
                                target='_blank' 
                                rel="noreferrer"
                                className='flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm'
                                title="View Code"
                            >
                                <VscGithubInverted size={20} />
                            </a>
                            <a 
                                href={data.live} 
                                target='_blank' 
                                rel="noreferrer"
                                className='flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-[#df4020] hover:text-white hover:border-[#df4020] transition-all duration-300 shadow-sm'
                                title="Live Preview"
                            >
                                <FaExternalLinkAlt size={18} />
                            </a>
                        </div>
                    </div>
                        <div className='dot border-2 border-dashed border-[#d7d2d1]'></div>
                        <div className='flex flex-wrap gap-x-2 gap-y-2'>
                            {
                                data.tech.map((itemName, idx) => {
                                    return <TechBox key={data.name + idx} text={itemName} />
                                })
                            }
                        </div>
                    </div>
                </div>


                <div ref={svgRef} className={`absolute top-20 ${data.id % 2 === 0 ? 'right-[10%]' : 'right-[60%] md:right-[80%]'} z-0 will-change-transform`}>
                    <svg

                        viewBox="0 0 600 600"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-20 aspect-square" // Adjusted width for visibility
                        style={{ overflow: 'visible' }}

                    >
                        {/* FACE */}
                        <circle cx={300} cy={300} r={260} className={data.id % 2 === 0 ? 'fill-[#00b4d8]' : 'fill-[#df4020]'} />

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