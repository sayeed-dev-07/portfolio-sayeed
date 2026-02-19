/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client'
import Navbar from "@/components/heroComponents/navbar";
import ProjectButton from "@/components/heroComponents/ProjectButton";
import BounceSvg from "@/components/normalComponents/BounceSvg";
import ImgSwap from "@/components/normalComponents/ImgSwap";
import RollingSvg from "@/components/normalComponents/NormalSvg";
import PhotoGallery from "@/components/normalComponents/PhotoGallery";

import ProjectsWrapper from "@/components/ProjectComponents/ProjectsWrapper";
import { useLenis } from "@/components/providers/LenisProvider";
import { galleryData } from "@/public/data/imgData";


import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";



import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger)

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const paralaxRef = useRef<HTMLDivElement | null>(null)
  const projectButtonnRef = useRef<HTMLDivElement | null>(null)
  const text1 = useRef<HTMLDivElement | null>(null)
  const text2 = useRef<HTMLDivElement | null>(null)
  const text3 = useRef<HTMLDivElement | null>(null)
  const [heroDone, setHeroDone] = useState(false)
  const bounceRef = useRef<HTMLDivElement | null>(null)
  const rollingSvgRef = useRef<HTMLDivElement | null>(null)
  const pcImgRef = useRef<HTMLDivElement | null>(null)
  const lenis = useLenis()

  useGSAP(() => {
    if (heroDone) {
      const secondaryTl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.5 } });

      secondaryTl.to(bounceRef.current, { right: 0 }, 0)
        .to(rollingSvgRef.current, { left: '5%' }, 0.1)
        .to(pcImgRef.current, { bottom: '10%' }, 0.2);
    }
  }, [heroDone])

  
  useGSAP(() => {
    document.fonts.ready.then(() => {
      const split1 = new SplitText(text1.current, { type: 'chars, lines', mask: 'lines' });
      const split3 = new SplitText(text3.current, { type: 'words, chars, lines', mask: 'lines' });
      const split2 = new SplitText(text2.current, { type: 'words, lines', mask: 'lines' });



      const tl = gsap.timeline({
        defaults: { ease: 'expo.out', duration: 1.2 },
        onComplete: () => {
          setHeroDone(true)
          document.body.style.overflow = '';
          lenis?.start()
        },
        onStart: () => {
          lenis?.stop(); // Stops scroll when intro starts
          document.body.style.overflow = 'show';
        }
      });

      tl.set([text1.current, text2.current, text3.current], { opacity: 1 });

      // ANIMATION SEQUENCE
      tl.from(split1.chars, {
        yPercent: 100,
        autoAlpha: 0,
        stagger: 0.03,
      }, "+=0.2")

        .from(split3.chars, {
          yPercent: 130,
          rotateX: -30, // Adds a 3D "leaning" feel
          transformOrigin: "0% 50% -50",
          stagger: 0.02,
          duration: 1.5,
        }, "-=0.8") // Overlap with text1

        .from(split2.words, {
          yPercent: 100,
          autoAlpha: 0,
          stagger: 0.02,
          duration: 1,
        }, "-=0.8")

        .to(projectButtonnRef.current, {
          y: 0,
          autoAlpha: 1,
        },
          "-=0.5");

      return () => {
        split1.revert();
        split2.revert();
        split3.revert();
      };
    })
  }, { scope: containerRef, dependencies: [lenis] });

  return (
    <div ref={containerRef} className="w-full z-0 bg-foreground  relative">
      {/* Decorative SVGs */}
      <div ref={bounceRef} className="fixed z-2  -right-[70%] bottom-[5%] sm:bottom-[20%] ">
        <BounceSvg />
      </div>
      <div ref={rollingSvgRef} className="fixed z-2 -left-[45%] top-[25%] ">
        <RollingSvg />
      </div>

      <Navbar navOpen={heroDone} />

      <div className="h-screen overflow-hidden text-background font-main uppercase flex items-center justify-center relative flex-col sm:px-4 px-2">
        <div className="sm:w-fit w-full flex gap-y-1.5 sm:gap-y-0 flex-col items-start ">



          <p ref={text1} className="opacity-0 font-semibold text-2xl sm:text-3xl md:text-4xl">
            Hi i am
          </p>



          <p ref={text3} className="opacity-0 sm:text-5xl text-4xl md:text-7xl font-extrabold">
            sayeed shorif
          </p>



          <p ref={text2} className="opacity-0 font-social text-sm text-start font-semibold lowercase ">
            A Front End Focused Web developer and Designer
          </p>


          <div ref={projectButtonnRef} className="mt-6 opacity-0 translate-y-full relative z-50 opacity-0" >
            <ProjectButton text="Projects" />
          </div>
        </div>

        <div ref={pcImgRef} className="absolute -bottom-[70%]">
          <ImgSwap link1="/img/pcimg1.webp" link2="/img/pcimg2.webp" />
        </div>
      </div>

      <div>
        <div id="ProjectSection" className="flex -mb-[100vh] min-h-screen relative z-5 flex-col">
          <div className="w-full h-[20vh]">
            <svg
              viewBox="0 0 1440 160"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <path
                d="
      M0,80
      C180,40 260,20 360,40
      C460,60 520,120 640,110
      C780,100 900,70 1040,60
      C1180,50 1280,60 1440,40
      L1440,160
      L0,160
      Z
    "
                fill="#84a98c"
              />
            </svg>

          </div>

          <ProjectsWrapper />
          <div className="-mt-4  w-full h-[20vh]">
            <svg className="w-full" xmlns="http://www.w3.org/2000/svg" viewBox="5 5 1405 107.1">
              <path d="M0,80
      C180,140 360,20 720,60
      C1080,100 1260,40 1440,60
      L1440,0
      L0,0
      Z"  fill="#85a98d" />
            </svg>
          </div>


        </div>
      </div>
      <div ref={paralaxRef} className="sticky top-0 left-0 gallery  z-1 w-full">
        <PhotoGallery images={galleryData} />
      </div>
      <div className="min-h-screen relative z-2 bg-amber-700 mt-[100vh]">

      </div>
    </div>
  );
}