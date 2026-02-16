'use client'
import Navbar from "@/components/heroComponents/navbar";
import BounceSvg from "@/components/normalComponents/BounceSvg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// Make sure you have access to SplitText (Premium Plugin)
import { SplitText } from "gsap/SplitText"; 
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP, SplitText)

export default function Home() {

  const containerRef = useRef<HTMLDivElement | null>(null) 
  const text1 = useRef<HTMLDivElement | null>(null)
  const text2 = useRef<HTMLDivElement | null>(null)
  const [heroDone, setHeroDone] = useState(false)
  const bounceRef = useRef<HTMLDivElement | null>(null)

  useGSAP(()=>{
    if (heroDone) {
      gsap.to(bounceRef.current, {
        right:0,
        duration:1,
        ease:'power2'
      })
    }
  }, [heroDone])
  useGSAP(() => {
    
    document.fonts.ready.then(() => {
      
      const split1 = new SplitText(text1.current, { type: 'chars, lines' });
      const split2 = new SplitText(text2.current, { type: 'chars, lines, words' });

     
      const tl = gsap.timeline();

      tl.fromTo(split1.chars, {
          opacity: 0, 
          autoAlpha: 0,
          
      }, {
          y: 0,
          autoAlpha: 1,
          duration: 1, 
          stagger: 0.05,
          ease: 'power3.out', 
          delay: 0.5,
          onComplete: ()=> setHeroDone(true)
      })
      
      .fromTo(split2.words, {
          y: 10,
          autoAlpha: 0,
      }, {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.1,
          ease:'bounce'
      },'-=0.6'); 

      return () => {
            split1.revert();
            split2.revert();
             tl.kill();
        };
    })
     
  }, { scope: containerRef }); // Add scope for better cleanup

  return (
    // Add the ref to the main wrapper
    <div ref={containerRef} className="w-full overflow-hidden bg-foreground min-h-screen relative">
      <div ref={bounceRef} className="fixed -right-[70%] bottom-[5%] sm:bottom-[20%]">
        <BounceSvg />
      </div>
      
      <div>
        <Navbar navOpen={heroDone} />
      </div>

      <div className="h-dvh text-background font-main uppercase flex items-center justify-center flex-col sm:px-4 px-2">
        <div className="sm:w-fit w-full flex gap-y-1.5 sm:gap-y-0 flex-col items-start ">
          {/* Ensure fonts are loaded or fallback is similar size */}
          <p ref={text1} className="sm:text-5xl text-4xl md:text-7xl font-bold">
            Hi i am sayeed shorif
          </p>
          <p ref={text2} className="font-social text-sm text-start font-semibold">
            A Front End Focused Web developer and Designer
          </p>
        </div>
        
      </div>
      <div className="min-h-[200vh] bg-sky-300">

        </div>
    </div>
  );
}