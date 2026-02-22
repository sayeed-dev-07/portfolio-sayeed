'use client'
import Image from 'next/image';
import React, { useRef } from 'react';
import ImgSwap from '../normalComponents/ImgSwap';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

const SkillSection = () => {
    const skillContainer = useRef<HTMLDivElement | null>(null)
    const imgSwapRef = useRef<HTMLDivElement | null>(null)
    const titleRef = useRef<HTMLDivElement | null>(null)

    useGSAP(()=>{
        gsap.to(imgSwapRef.current, {
            scale:1,
            duration:0.7,
            ease:'power2.out',
            scrollTrigger: {
                trigger: imgSwapRef.current,
                start: 'clamp(top 85%)'
            }
        })
        gsap.to(titleRef.current, {
            scale:1,
            duration:0.7,
            ease:'power2.out',
            scrollTrigger: {
                trigger: titleRef.current,
                start: 'clamp(top 85%)'
            }
        })
    },{scope: skillContainer})

    return (
        <div ref={skillContainer} className='px-4 sm:px-2 min-h-screen relative'>

            <div ref={imgSwapRef} className='absolute sm:right-[5%] left-[30%] sm:left-auto -top-[20%] sm:-top-[5%] scale-0'>
                <ImgSwap link1='/svg/tech1.svg' link2='/svg/tech2.svg'/>
            </div>

            <div ref={titleRef} className='w-fit scale-20'>
                <p className='font-main text-black text-7xl uppercase'>tech</p>
                <div className='w-full relative h-2.5'>
                    <Image alt='lineImg' src={'/svg/line.svg'} fill/>
                </div>
            </div>
        </div>
    );
};

export default SkillSection;