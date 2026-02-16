'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { projectData } from '@/public/data/projectData'
import ProjectCard from './ProjectCard'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function ScrollSection() {
    const container = useRef<HTMLDivElement>(null)
    const pillNamesRef = useRef<(HTMLSpanElement | null)[]>([])
    const pillContainersRef = useRef<(HTMLDivElement | null)[]>([])
    const [activeIndex, setActiveIndex] = useState(0)

    const indexChange = (index: number) => {
        setActiveIndex(index)
    }

    // 1. Handle the Pinning
    useGSAP(() => {
        ScrollTrigger.create({
            trigger: container.current,
            start: 'top top',
            end: 'bottom bottom',
            pin: '.left-content',
            pinSpacing: false,
            
        })
    }, { scope: container })

    // 2. Animate Pills based on activeIndex change
    useGSAP(() => {
        projectData.forEach((_, i) => {
            const pill = pillContainersRef.current[i]
            const name = pillNamesRef.current[i]
            const isActive = i === activeIndex

            if (!pill || !name) return

            // Create a timeline for each pill for smooth transition
            const tl = gsap.timeline({ defaults: { duration: 0.4, ease: 'none' } })

            if (isActive) {
                tl.to(pill, { 
                    backgroundColor: '#FFFFFF', // Matches your photo (white bg)
                    color: '#000000',           // Dark text
                }, 0)
                .to(name, { 
                    width: 'auto', 
                    opacity: 1, 
                    marginLeft: 8,
                    paddingRight: 4 
                }, 0)
            } else {
                tl.to(pill, { 
                    backgroundColor: 'transparent', // Outline look
                    color: '#FFFFFF', 
                }, 0)
                .to(name, { 
                    width: 0, 
                    opacity: 0, 
                    marginLeft: 0,
                    paddingRight: 0 
                }, 0)
            }
        })
    }, [activeIndex]) // 👈 This triggers the animation whenever activeIndex updates

    return (
        <section ref={container} className="flex -mt-3 bg-[#85a98d] flex-row w-full relative">

            {/* LEFT SIDE: Pinned Navigation */}
            <div className="left-content w-1/3 h-screen flex flex-col justify-center px-10  gap-y-6">
            <p className='uppercase font-main text-5xl'>Projects</p>
                <div className="flex flex-wrap gap-x-4 gap-y-3">
                    {projectData.map((item, index) => (
                        <div 
                            key={item.id} 
                            ref={(el) => { pillContainersRef.current[index] = el }}
                            className="flex px-4 py-2 rounded-full border border-white items-center justify-start overflow-hidden whitespace-nowrap"
                        >
                            <span className="font-medium">0{index + 1}</span>
                            <span 
                                ref={(el) => { pillNamesRef.current[index] = el }}
                                className="overflow-hidden whitespace-nowrap opacity-0 w-0 block pointer-events-none"
                            >
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT SIDE: Scrollable Cards */}
            <div className="w-2/3 flex flex-col overflow-hidden">
                {projectData.map((item) => (
                    <div key={item.id} className="h-screen flex items-center justify-center">
                        <ProjectCard 
                            data={item}  
                            func={indexChange} 
                        />
                    </div>
                ))}
            </div>

        </section>
    )
}