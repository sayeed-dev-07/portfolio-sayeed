'use client'
import Navbar from "@/components/heroComponents/navbar";
import ProjectButton from "@/components/heroComponents/ProjectButton";
import BounceSvg from "@/components/normalComponents/BounceSvg";
import ImgSwap from "@/components/normalComponents/ImgSwap";
import RollingSvg from "@/components/normalComponents/NormalSvg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP, SplitText)

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const projectButtonnRef = useRef<HTMLDivElement | null>(null)
  const text1 = useRef<HTMLDivElement | null>(null)
  const text2 = useRef<HTMLDivElement | null>(null)
  const text3 = useRef<HTMLDivElement | null>(null)
  const [heroDone, setHeroDone] = useState(false)
  const bounceRef = useRef<HTMLDivElement | null>(null)
  const rollingSvgRef = useRef<HTMLDivElement | null>(null)
  const pcImgRef = useRef<HTMLDivElement | null>(null)


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
      const split1 = new SplitText(text1.current, { type: 'chars, lines' , mask: 'lines'});
      const split3 = new SplitText(text3.current, { type: 'words, chars, lines', mask: 'lines' });
      const split2 = new SplitText(text2.current, { type: 'words, lines', mask:'lines' });

      const tl = gsap.timeline({
        defaults: { ease: 'expo.out', duration: 1.2 },
        onComplete: () => setHeroDone(true)
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

        .fromTo(projectButtonnRef.current, {
          y: 30,
          autoAlpha: 0,
          
        },{
          y:0,
          autoAlpha:1,
          duration: 0.4,
        },
         "-=0.3");

      return () => {
        split1.revert();
        split2.revert();
        split3.revert();
      };
    })
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full overflow-hidden bg-foreground min-h-screen relative">
      {/* Decorative SVGs */}
      <div ref={bounceRef} className="fixed -right-[70%] bottom-[5%] sm:bottom-[20%]">
        <BounceSvg />
      </div>
      <div ref={rollingSvgRef} className="fixed -left-[45%] top-[25%] ">
        <RollingSvg />
      </div>

      <Navbar navOpen={heroDone} />

      <div className="h-dvh overflow-hidden text-background font-main uppercase flex items-center justify-center relative flex-col sm:px-4 px-2">
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


          <div ref={projectButtonnRef} className="mt-6 relative z-50 opacity-0" >
            <ProjectButton text="Projects" />
          </div>
        </div>

        <div ref={pcImgRef} className="absolute -bottom-[70%]">
          <ImgSwap />
        </div>
      </div>

      <div className="min-h-[100vh]" />
    </div>
  );
}