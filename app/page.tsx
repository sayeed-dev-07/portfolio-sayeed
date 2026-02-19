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
          <div className="-mt-4 w-full h-[40vh] md:h-[20vh]">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 160"
              preserveAspectRatio="none"
            >
              <path
                d="M0,80 C180,140 360,20 720,60 C1080,100 1260,40 1440,60 L1440,0 L0,0 Z"
                fill="#85a98d"
              />
            </svg>
          </div>


        </div>
      </div>
      <div ref={paralaxRef} className="sticky top-0 left-0 gallery  z-1 w-full">
        <PhotoGallery images={galleryData} />
      </div>

      {/* devider div  */}
      <div className="min-h-screen relative z-2  mt-[100vh]">
        <div>
          <svg
            viewBox="0 0 1440 160"
            preserveAspectRatio="none"
            className="w-full h-[20vh]"
          >
            <path
              d="
      M0,80
      L80,60 L140,90 L200,40 L260,100
      L320,30 L380,70 L440,20 L500,90
      L560,40 L620,70 L680,30 L740,80
      L800,40 L860,70 L920,50 L980,60
      L1040,40 L1100,70 L1160,30 L1220,80
      L1280,50 L1340,60 L1440,40
      L1440,160
      L0,160
      Z
    "
              fill="#e2d7a8"
            />
          </svg>

        </div>
        <div className="absolute -rotate-25  top-[1%]">

          <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="3600 6300 5200 2600"
            className="w-fit h-auto border block"
            preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,600.000000) scale(0.050000,-0.050000)" fill="#000000" stroke="none"> <path d="M3866 8983 c3 -18 11 -43 19 -55 8 -12 7 -29 -1 -37 -26 -26 -24 -473 2 -457 18 10 18 7 1 -15 -20 -25 -22 -524 -6 -1311 l2 -62 488 -2 489 -3 0 61 c0 43 -7 56 -25 45 -20 -11 -20 -8 -1 15 29 36 25 358 -4 358 -11 0 -9 8 4 16 29 18 25 147 -4 169 -13 9 -13 15 0 15 19 0 37 103 34 190 -5 121 -19 180 -42 175 -14 -4 -19 3 -12 15 7 11 20 16 28 11 9 -5 16 87 17 205 0 118 6 239 12 269 5 30 1 55 -10 55 -10 0 -12 11 -4 25 21 34 24 153 5 220 -8 30 -7 59 3 65 9 6 13 24 7 39 -18 45 -1009 39 -1002 -6z m662 -159 c43 -13 87 -17 98 -10 11 7 14 2 7 -9 -8 -12 5 -28 27 -35 22 -7 40 -19 40 -28 0 -8 14 -32 31 -53 18 -22 25 -25 17 -9 -8 17 -7 24 1 16 8 -7 17 -75 19 -151 5 -168 -65 -288 -204 -356 l-83 -40 57 -22 c50 -19 65 -15 113 26 71 60 89 61 32 1 -54 -59 -54 -73 5 -136 53 -57 71 -102 81 -208 4 -40 12 -78 19 -84 6 -7 2 -24 -11 -39 -12 -15 -14 -27 -4 -27 9 0 8 -7 -3 -15 -11 -8 -35 -48 -54 -88 -77 -167 -210 -213 -574 -197 l-229 10 -2 80 c-1 44 4 109 11 145 9 43 6 65 -9 65 -16 1 -16 5 -1 15 11 8 22 74 24 145 2 72 8 256 13 410 6 154 10 357 11 450 l0 170 245 -2 c135 -1 280 -12 323 -24z m133 -1473 c-62 -64 -199 -136 -171 -90 7 10 24 19 38 19 14 0 61 31 104 69 101 89 114 90 29 2z" /> <path d="M4259 8719 c-50 -30 -49 -513 1 -529 30 -9 52 -2 73 23 16 20 24 26 17 12 -22 -44 14 -27 71 33 162 170 20 574 -162 461z" /> <path d="M4215 8067 c-5 -9 -11 -145 -12 -302 l-3 -285 55 -2 c90 -4 112 3 159 54 88 96 92 392 5 478 -50 48 -187 87 -204 57z" /> <path d="M7600 8763 c-41 -40 -54 -70 -47 -100 16 -60 -10 -53 -75 19 -63 71 -174 88 -296 46 -54 -18 -76 -19 -87 -1 -8 13 -14 1 -12 -27 2 -47 -14 -230 -33 -378 -9 -66 -30 -112 -30 -65 0 13 -9 23 -20 23 -25 0 -27 -473 -2 -489 10 -6 23 0 28 14 5 14 16 -2 24 -35 20 -82 92 -235 105 -222 6 6 66 -20 133 -58 305 -170 585 -59 644 257 79 422 65 1003 -25 1025 -26 7 -47 19 -47 27 0 48 -204 20 -260 -36z m266 -58 c51 -262 -106 -1042 -223 -1103 -370 -195 -627 29 -564 492 12 86 24 241 27 344 8 227 38 268 192 258 l92 -6 -2 -140 c-1 -77 -9 -262 -18 -410 -14 -235 -12 -274 16 -297 41 -34 110 1 123 63 11 51 62 465 81 653 19 186 31 201 158 201 101 0 108 -3 118 -55z" /> <path d="M8369 8753 c-20 -107 -21 -1023 -2 -1358 l17 -295 123 0 c68 0 197 6 288 13 l166 13 -13 832 c-7 458 -17 836 -22 842 -4 5 -129 12 -276 17 l-267 7 -14 -71z m271 -163 l0 -130 60 0 c78 0 82 -55 5 -64 l-55 -6 1 -210 c2 -507 51 -935 73 -636 7 103 103 135 109 36 7 -120 -43 -180 -147 -180 -162 1 -155 -21 -166 514 -10 475 -10 476 -55 482 -61 9 -57 36 10 68 51 25 55 35 53 141 -2 113 -1 115 55 115 57 0 57 0 57 -130z" /> <path d="M5673 8605 l-337 -6 12 -94 c6 -52 17 -305 24 -563 l13 -467 253 13 c568 29 598 33 609 79 6 24 13 268 16 543 l6 500 -129 1 c-72 0 -282 -2 -467 -6z m364 -259 c245 -140 201 -520 -71 -617 -271 -97 -526 59 -525 321 2 293 322 452 596 296z" /> <path d="M5664 8339 c-173 -105 -159 -485 20 -581 132 -71 315 -8 377 129 138 304 -133 613 -397 452z" /> <path d="M2804 8541 c-36 -9 -106 -32 -155 -50 l-89 -34 0 -119 0 -118 136 0 136 0 19 65 c33 113 189 86 189 -33 0 -37 -22 -52 -135 -91 -319 -110 -396 -186 -381 -374 19 -223 218 -307 443 -186 l76 41 11 -42 c10 -38 23 -41 164 -36 l152 6 6 92 c4 64 -3 99 -25 117 -25 21 -31 76 -31 288 0 422 -157 566 -516 474z m236 -620 c0 -111 -156 -198 -208 -116 -30 47 1 93 99 149 90 51 109 45 109 -33z" /> <path d="M4725 6468 c-128 -61 -177 -72 -436 -96 -349 -34 -326 -16 -283 -221 19 -91 34 -251 34 -354 0 -149 10 -213 46 -307 l46 -118 119 5 c65 2 223 12 349 22 127 11 307 24 401 31 l171 13 104 472 c121 543 134 491 -149 567 -259 69 -224 70 -402 -14z m-288 -245 c-5 -40 9 -42 56 -4 94 73 256 49 294 -44 7 -18 15 -19 26 -3 31 42 145 88 216 88 162 0 181 -104 95 -500 l-38 -170 -75 -2 c-99 -3 -101 8 -44 268 54 253 45 301 -55 276 -76 -19 -123 -109 -163 -315 -38 -198 -63 -237 -150 -237 -72 0 -72 3 -16 284 23 117 37 228 30 245 -34 88 -196 -17 -221 -144 -6 -30 -21 -113 -34 -185 -32 -177 -47 -200 -125 -200 -37 0 -71 5 -77 10 -12 12 107 610 128 641 14 22 156 15 153 -8z" /> <path d="M6034 6379 c-610 -153 -458 -938 182 -939 306 0 540 226 371 359 -29 22 -42 41 -29 41 37 0 84 133 70 195 -58 262 -319 413 -594 344z m206 -249 c38 -45 9 -90 -58 -90 -72 0 -91 25 -62 80 25 47 85 52 120 10z m190 -350 c-66 -43 -207 -54 -271 -19 -79 42 -36 59 146 59 l185 0 -60 -40z" /> </g> </svg>
        </div>
        <div className="bg-[#e2d6a9] h-screen">

        </div>
        <div>
          <svg
            viewBox="0 0 1440 160"
            preserveAspectRatio="none"
            className="w-full h-[20vh]"
          >
            <path
              d="
      M0,0
      L80,20 L140,-10 L200,40 L260,-20
      L320,50 L380,10 L440,60 L500,-10
      L560,40 L620,10 L680,50 L740,0
      L800,40 L860,10 L920,30 L980,20
      L1040,40 L1100,10 L1160,50 L1220,0
      L1280,30 L1340,20 L1440,40
      L1440,0
      L0,0
      Z
    "
              fill="#e2d7a8"
            />
          </svg>

        </div>
      </div>
    </div>
  );
}