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
    // Initial state: Background tucked away below
    gsap.set(buttonBg.current, { yPercent: 101 });

    tl.current = gsap.timeline({ paused: true });

    tl.current
      .to(buttonBg.current, {
        yPercent: 0,
        duration: 0.4,
        ease: "power2", // Snappy slide up
      })
      .to(buttonText.current, {
        color: "#fff", // Adjust this to your foreground/brand color
        duration: 0.2
      }, "<");

  }, { scope: buttonWrapper });

  // HOVER IN: Squash down slightly to show "pressure"
  const hoverIn = contextSafe(() => {
    gsap.to(buttonWrapper.current, {
      scale: 0.96,
      duration: 0.3,
      ease: 'power3.out',
      overwrite: 'auto' // Prevents conflict with hoverOut
    });
    tl.current?.play();
  });

  // HOVER OUT: The "Bounce" happens here
  const hoverOut = contextSafe(() => {
    tl.current?.reverse();

    gsap.to(buttonWrapper.current, {
      scale: 1,
      duration: 1, 
      ease: 'elastic.out(1.4, 0.6)', 
      overwrite: 'auto'
    });
  });

  return (
    <div
      ref={buttonWrapper}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
      className="text-md cursor-pointer font-social font-semibold border-2 border-background relative overflow-hidden px-6 py-2 rounded-md inline-block group"
    >
      <div ref={buttonText} className="relative z-10 text-background transition-colors duration-300">
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