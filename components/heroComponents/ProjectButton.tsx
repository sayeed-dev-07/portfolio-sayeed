/* eslint-disable react-hooks/refs */
'use client'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

const ProjectButton = ({ text }: { text: string }) => {
  const buttonText = useRef<HTMLDivElement | null>(null);
  const buttonBg = useRef<HTMLDivElement | null>(null);
  const buttonWrapper = useRef<HTMLDivElement | null>(null);
  const tl = useRef<GSAPTimeline | null>(null);

  const { contextSafe } = useGSAP(() => {

    // initial state
    gsap.set(buttonBg.current, { yPercent: 100 });

    tl.current = gsap.timeline({ paused: true });

    tl.current
      .to(buttonBg.current, {
        yPercent: 0,
        duration: 0.35,
        ease: "power2.out",
        transformOrigin: 'center'
      })
      .to(buttonText.current, {
        color: "#fff",
        duration: 0.2
      }, "<0.1");

  }, { scope: buttonWrapper });

  const hoverIn = contextSafe(() => {
    tl.current?.play();
  });

  const hoverOut = contextSafe(() => {
    tl.current?.timeScale(1.2).reverse();
  });

  return (
    <div
      ref={buttonWrapper}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
      className="text-md cursor-pointer font-social font-semibold border-2 relative overflow-hidden px-3 py-1.5 rounded-xs"
    >
      <div ref={buttonText} className="relative z-10 text-background">
        {text}
      </div>

      {/* sliding background */}
      <div
        ref={buttonBg}
        className="absolute inset-0 bg-background z-0"
      />
    </div>
  );
};

export default ProjectButton;
