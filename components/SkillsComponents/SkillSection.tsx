'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImgSwap from '../normalComponents/ImgSwap';
import skillsData from '@/public/data/skillsData';

gsap.registerPlugin(ScrollTrigger);

type CategoryKey = keyof typeof skillsData;

const categories: { key: CategoryKey; label: string; kicker: string }[] = [
    { key: 'frontend', label: 'Frontend', kicker: 'UI playground' },
    { key: 'motion', label: 'Motion', kicker: 'Movement lab' },
    { key: 'creative', label: 'Creative', kicker: 'Design candy' },
    { key: 'engineering', label: 'Engineering', kicker: 'System mode' }
];

const categoryThemes: Record<
    CategoryKey,
    {
        panel: string;
        blob: string;
        chip: string;
        pill: string;
        pillText: string;
        meter: string;
        note: string;
        label: string;
        focus: string;
    }
> = {
    frontend: {
        panel: 'bg-gradient-to-br from-[#f8fdff] via-[#fff7ea] to-[#d9f4ff]',
        blob: 'bg-[#6bd2ff]',
        chip: 'bg-[#f2fbff]',
        pill: 'bg-[#d8f3ff]',
        pillText: 'text-[#0d647d]',
        meter: 'bg-[#0ea5e9]',
        note: 'Interfaces, spacing, and components that feel crisp, clear, and welcoming to touch.',
        label: 'UI Playground',
        focus: 'clean layouts and tactile feedback'
    },
    motion: {
        panel: 'bg-gradient-to-br from-[#fff6eb] via-[#fffaf4] to-[#ffe1bd]',
        blob: 'bg-[#ffae57]',
        chip: 'bg-[#fff8ef]',
        pill: 'bg-[#ffe6c9]',
        pillText: 'text-[#8f4a00]',
        meter: 'bg-[#f97316]',
        note: 'Motion is where I add rhythm, surprise, and softness so a page feels alive instead of stiff.',
        label: 'Movement Lab',
        focus: 'scroll stories and small joyful details'
    },
    creative: {
        panel: 'bg-gradient-to-br from-[#fff4f1] via-[#fffaf5] to-[#ffd9d3]',
        blob: 'bg-[#ff8b7c]',
        chip: 'bg-[#fff8f6]',
        pill: 'bg-[#ffe1db]',
        pillText: 'text-[#8b3a2f]',
        meter: 'bg-[#ef4444]',
        note: 'I enjoy shaping visual systems that feel expressive, balanced, and a little bit unexpected.',
        label: 'Design Candy',
        focus: 'composition, type, and visual personality'
    },
    engineering: {
        panel: 'bg-gradient-to-br from-[#f8fde8] via-[#fffef7] to-[#e3f3b5]',
        blob: 'bg-[#a4d65e]',
        chip: 'bg-[#fbfff0]',
        pill: 'bg-[#eaf7c8]',
        pillText: 'text-[#4c6f12]',
        meter: 'bg-[#65a30d]',
        note: 'Under the playful visuals, I still care a lot about structure, performance, and code that stays healthy.',
        label: 'System Mode',
        focus: 'solid foundations and thoughtful architecture'
    }
};

const stickerRotations = [0, -3, 2, -2, 3, -1, 1, -4];
const meterWidths = ['w-[88%]', 'w-[72%]', 'w-[82%]', 'w-[65%]', 'w-[76%]', 'w-[58%]', 'w-[70%]', 'w-[84%]'];
const skillTags = ['play', 'build', 'craft', 'polish'];
const skillNotes = [
    'Used to turn ideas into interactive screens.',
    'Helps me keep the experience smooth and expressive.',
    'A tool I reach for when details need more care.',
    'Part of the stack that keeps the UI feeling intentional.'
];

const SkillSection = () => {
    const [activeCategory, setActiveCategory] = useState<CategoryKey>('frontend');
    const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('frontend');
    const [isSwitching, setIsSwitching] = useState(false);

    const skillContainer = useRef<HTMLDivElement | null>(null);
    const imgSwapRef = useRef<HTMLDivElement | null>(null);
    
    const titleRef = useRef<HTMLDivElement | null>(null);
    const listWrapRef = useRef<HTMLDivElement | null>(null);
    const listRef = useRef<HTMLDivElement | null>(null);
    const accentBlobRef = useRef<HTMLDivElement | null>(null);
    const floatingRefs = useRef<(HTMLDivElement | null)[]>([]);
    const prevHeightRef = useRef<number>(0);

    const activeTheme = categoryThemes[activeCategory];
    const activeCategoryInfo = categories.find((item) => item.key === activeCategory);
    const activeSkills = skillsData[activeCategory];

    useGSAP(
        () => {
            gsap.fromTo(
                imgSwapRef.current,
                { opacity: 0, y: 50, scale: 0.75, rotate: -10 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotate: -4,
                    duration: 1.4,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: imgSwapRef.current,
                        start: 'clamp(top 92%)'
                    }
                }
            );

            

            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.3,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: 'top 85%'
                    }
                }
            );

            floatingRefs.current.forEach((shape, index) => {
                if (!shape) return;

                gsap.to(shape, {
                    y: index % 2 === 0 ? -18 : 18,
                    x: index === 1 ? 12 : -8,
                    rotate: index % 2 === 0 ? -8 : 8,
                    duration: 2.6 + index * 0.4,
                    ease: 'sine.inOut',
                    repeat: -1,
                    yoyo: true
                });
            });
        },
        { scope: skillContainer }
    );

    useGSAP(
        () => {
            const chips = gsap.utils.selector(listRef)('.skill-chip');

            gsap.fromTo(
                accentBlobRef.current,
                { x: 30, y: -20, scale: 0.7, rotate: -14, opacity: 0.55 },
                {
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: 0,
                    opacity: 0.92,
                    duration: 0.55,
                    ease: 'expo.out'
                }
            );

            gsap.fromTo(
                chips,
                {
                    y: 20,
                    opacity: 0,
                    scale: 0.97,
                    rotate: 1,
                    force3D: true
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    duration: 0.55,
                    ease: 'expo.out',
                    stagger: { amount: 0.16, from: 'start' },
                    onComplete: () => setIsSwitching(false)
                }
            );
        },
        { scope: listRef, dependencies: [activeCategory] }
    );

    useGSAP(
        () => {
            const wrap = listWrapRef.current;
            if (!wrap) return;
            const nextHeight = wrap.scrollHeight;

            gsap.fromTo(
                wrap,
                { height: prevHeightRef.current || nextHeight },
                {
                    height: nextHeight,
                    duration: 0.35,
                    ease: 'expo.inOut',
                    force3D: true,
                    onComplete: () => {
                        gsap.set(wrap, { height: 'auto' });
                    }
                }
            );
        },
        { dependencies: [activeCategory] }
    );

    const handleCategoryChange = (key: CategoryKey) => {
        if (key === selectedCategory || isSwitching) return;
        setSelectedCategory(key);
        setIsSwitching(true);
        prevHeightRef.current = listWrapRef.current?.offsetHeight ?? 0;
        const chips = gsap.utils.selector(listRef.current)('.skill-chip');

        gsap
            .timeline()
            .to(chips, {
                y: -10,
                opacity: 0,
                duration: 0.18,
                ease: 'power2.inOut',
                stagger: { amount: 0.08, from: 'start' }
            })
            .add(() => setActiveCategory(key));
    };

    return (
        <section
            ref={skillContainer}
            className="relative overflow-hidden bg-[#f4f5f4] px-6 pb-28 pt-[4.5rem] text-black selection:bg-black selection:text-white sm:px-12 md:px-20"
        >
            <div className="pointer-events-none absolute inset-0 opacity-30">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.12) 1px, transparent 0)',
                        backgroundSize: '24px 24px'
                    }}
                />
            </div>

            <div
                ref={(el) => {
                    floatingRefs.current[0] = el;
                }}
                className="pointer-events-none absolute left-[6%] top-32 h-14 w-14 rounded-[1.2rem] border-2 border-black/15 bg-white/60"
            />
            <div
                ref={(el) => {
                    floatingRefs.current[1] = el;
                }}
                className="pointer-events-none absolute right-[14%] top-52 h-10 w-24 rounded-full border-2 border-black/15 bg-white/70"
            />
            <div
                ref={(el) => {
                    floatingRefs.current[2] = el;
                }}
                className="pointer-events-none absolute bottom-20 left-[40%] h-[4.5rem] w-[4.5rem] rounded-full border-2 border-black/12 bg-white/45"
            />

            <div
                ref={imgSwapRef}
                className="absolute hidden lg:block right-2 top-6 z-10 translate-y-10 opacity-0 sm:right-[4%]"
            >
                <div className="rounded-[2rem] border-2 border-black bg-[#fff7cf] p-3 shadow-[7px_7px_0_0_rgba(0,0,0,0.88)]">
                    <ImgSwap link1="/svg/tech1.svg" link2="/svg/tech2.svg" />
                </div>
            </div>

            

            <div className="relative capitalize mx-auto flex  flex-col gap-10">
                <header
                    ref={titleRef}
                    className="relative z-20 flex flex-col gap-8 opacity-0 translate-y-10 lg:flex-row lg:items-end lg:justify-between"
                >
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-3 rounded-full border-2 border-black bg-[#fff2a8] px-4 py-2 text-[11px] font-social uppercase tracking-[0.3em] shadow-[4px_4px_0_0_rgba(0,0,0,0.88)]">
                            <span className="h-2.5 w-2.5 rounded-full bg-black" />
                            Skill Playground
                        </span>
                        <h2 className="mt-6 max-w-4xl font-futura sm:text-4xl text-3xl leading-none  lg:text-7xl md:text-5xl">
                            Skills and tech i know
                        </h2>
                    </div>

                    
                </header>

                <div className="relative z-20 flex flex-wrap gap-3">
                    {categories.map((cat) => {
                        const catTheme = categoryThemes[cat.key];
                        const isActive = selectedCategory === cat.key;

                        return (
                            <button
                                key={cat.key}
                                data-active={isActive}
                                onClick={() => handleCategoryChange(cat.key)}
                                className={`group relative overflow-hidden cursor-pointer rounded-full border-2 border-black px-4 py-3 text-left transition-all duration-200 ${
                                    isActive
                                        ? `${catTheme.pill} ${catTheme.pillText} -translate-y-1 shadow-[5px_5px_0_0_rgba(0,0,0,0.88)]`
                                        : 'bg-white/85 text-black/65 shadow-[0_0_0_0_rgba(0,0,0,0)] hover:-translate-y-1 hover:text-black hover:shadow-[5px_5px_0_0_rgba(0,0,0,0.88)]'
                                }`}
                            >
                                <span className="block text-[10px] font-social uppercase tracking-[0.3em]">
                                    {cat.kicker}
                                </span>
                                <span className="mt-1 block font-futura text-xl">{cat.label}</span>
                            </button>
                        );
                    })}
                </div>

                <div
                    className={`relative z-20 overflow-hidden rounded-[2.2rem] border-2 border-black px-5 py-6 shadow-[10px_10px_0_0_rgba(0,0,0,0.9)] sm:px-8 sm:py-8 ${activeTheme.panel}`}
                >
                    <div
                        ref={accentBlobRef}
                        className={`pointer-events-none absolute -right-10 top-0 h-44 w-44 rounded-full opacity-90 blur-[2px] ${activeTheme.blob}`}
                    />
                    <div className="pointer-events-none absolute inset-0 opacity-35">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage:
                                    'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)',
                                backgroundSize: '28px 28px'
                            }}
                        />
                    </div>

                    <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                        <div className="flex flex-col gap-4">
                            <div className="rounded-[1.9rem] border-2 border-black bg-white/78 p-6 shadow-[6px_6px_0_0_rgba(0,0,0,0.88)] backdrop-blur-[2px]">
                                <span
                                    className={`inline-flex rounded-full px-3 py-1 text-[10px] font-social uppercase tracking-[0.3em] ${activeTheme.pill} ${activeTheme.pillText}`}
                                >
                                    {activeTheme.label}
                                </span>
                                <h3 className="mt-5 font-futura text-4xl leading-none sm:text-5xl">
                                    {activeCategoryInfo?.label}
                                </h3>
                                <p className="mt-4 max-w-md text-sm leading-7 text-black/70 sm:text-base">
                                    {activeTheme.note}
                                </p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="rounded-[1.6rem] border-2 border-black bg-white/82 p-4 shadow-[5px_5px_0_0_rgba(0,0,0,0.88)]">
                                    <span className="text-[10px] font-social uppercase tracking-[0.3em] text-black/60">
                                        Tool count
                                    </span>
                                    <p className="mt-3 font-futura text-5xl leading-none">
                                        {activeSkills.length < 10 ? `0${activeSkills.length}` : activeSkills.length}
                                    </p>
                                </div>

                                <div className="rounded-[1.6rem] border-2 border-black bg-white/82 p-4 shadow-[5px_5px_0_0_rgba(0,0,0,0.88)]">
                                    <span className="text-[10px] font-social uppercase tracking-[0.3em] text-black/60">
                                        Focus
                                    </span>
                                    <p className="mt-3 text-sm font-medium leading-6 text-black/75">
                                        {activeTheme.focus}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div ref={listWrapRef} className="min-h-[24rem] ">
                            <div ref={listRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                {activeSkills.map((skill, idx) => {
                                    const isHeroChip = idx === 0;
                                    const rotation = stickerRotations[idx % stickerRotations.length];

                                    return (
                                        <div
                                            key={`${activeCategory}-${skill}`}
                                            className={`skill-chip ${isHeroChip ? 'sm:col-span-2 xl:col-span-2' : ''}`}
                                        >
                                            <div className="group h-full transition-transform duration-500 hover:-translate-y-2">
                                                <div
                                                    className={`relative flex h-full flex-col overflow-hidden rounded-[1.7rem] border-2 border-black p-5 shadow-[6px_6px_0_0_rgba(0,0,0,0.88)] ${activeTheme.chip}`}
                                                    style={{ transform: `rotate(${isHeroChip ? 0 : rotation}deg)` }}
                                                >
                                                    <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/55 via-transparent to-white/20" />
                                                    <div className="pointer-events-none absolute -right-5 -top-5 h-16 w-16 rounded-full border border-black/10 bg-white/50" />

                                                    <div className="relative z-10 flex h-full flex-col">
                                                        <div className="flex items-start justify-between gap-3">
                                                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-white text-xs font-semibold shadow-[2px_2px_0_0_rgba(0,0,0,0.76)]">
                                                                {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                                                            </span>

                                                            <span className="rounded-full border border-black/15 bg-white/75 px-3 py-1 text-[10px] font-social uppercase tracking-[0.28em] text-black/60">
                                                                {skillTags[idx % skillTags.length]}
                                                            </span>
                                                        </div>

                                                        <div className="mt-6 flex-1">
                                                            <p
                                                                className={`font-futura leading-none text-black ${
                                                                    isHeroChip ? 'text-3xl sm:text-4xl' : 'text-2xl'
                                                                }`}
                                                            >
                                                                {skill}
                                                            </p>
                                                            <p className="mt-3 max-w-[20rem] text-sm leading-6 text-black/65">
                                                                {skillNotes[idx % skillNotes.length]}
                                                            </p>
                                                        </div>

                                                        <div className="mt-6 flex items-center justify-between gap-4">
                                                            <span className="text-[10px] font-social uppercase tracking-[0.3em] text-black/55">
                                                                comfort level
                                                            </span>
                                                            <div className="h-3 w-[5.5rem] overflow-hidden rounded-full border border-black/15 bg-white/75">
                                                                <div
                                                                    className={`h-full rounded-full ${activeTheme.meter} ${meterWidths[idx % meterWidths.length]}`}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillSection;
