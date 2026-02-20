'use client'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';


gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function AboutMe() {

    const imgContainerRef = useRef<HTMLDivElement | null>(null)
    const aboutMeContainer = useRef<HTMLDivElement | null>(null)
    const threeDotRef = useRef<HTMLDivElement | null>(null)

    useGSAP(()=>{

        gsap.to(imgContainerRef.current,{
            scrollTrigger: {
                trigger: imgContainerRef.current,
                start: 'top 85%',

            },
            duration:0.5,
            x:0,
            opacity:1,
            ease:'power2.out'
        })
        gsap.to(threeDotRef.current,{

        })

    }, {scope: aboutMeContainer})

  return (
    <div ref={aboutMeContainer} className='flex overflow-hidden md:flex-row flex-col-reverse pt-[13vh] md:pt-[30vh] items-start font-main justify-around text-4xl text-background'>
      <div className='text-start flex w-[500px] h-full  flex-col gap-y-5'>
        <p className='uppercase'>Sayeed Shorif</p>
        <p className='font-outfit text-2xl'>I’m an enthusiastic front-end developer driven by curiosity, constant learning, and the excitement of solving complex problems. I approach development like visual storytelling — blending motion, structure, and emotion into interfaces that feel alive rather than static. I enjoy breaking challenges into smaller pieces, experimenting beyond the ordinary, and turning ideas into thoughtful, interactive experiences that reflect both creativity and technical precision.
</p>
      </div>

      {/* The Frame Container */}
      <div ref={imgContainerRef} 
        className='relative translate-x-full w-[90%] opacity-0  max-w-[400px] md:max-w-full md:w-[400px] lg:w-[450px] aspect-[4/5] bg-contain bg-no-repeat flex items-center justify-center'
        style={{ backgroundImage: "url('/img/box.webp')" }}
      >

        <div ref={threeDotRef} className='absolute -top-[15%] -right-[15%] '>
            <Image 
            src='/img/threeDot.webp' 
            alt='Sayeed Shorif' 
            width={100} 
            height={100} 
            className='h-[100px] w-[100px] object-cover'
           
          />
        </div>
        {/* The Inner Image with Clip Path applied */}
        <div className="w-[85%]  h-[85%] overflow-hidden">
          <Image 
            src='/img/me.png' 
            alt='Sayeed Shorif' 
            width={400} 
            height={500} 
            className='w-full rounded-xl h-full object-cover'
           
          />
        </div>

        
        
      </div>
    </div>
  );
}