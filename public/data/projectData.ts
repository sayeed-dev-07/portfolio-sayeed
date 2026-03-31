export interface ProjectType {
  id: number
  name: string
  tech: string[]
  live: string
  code: string
  img: string
}

export const projectData: ProjectType[] = [
  {
    id: 1,
    name: 'AniSearch',
    tech: [
      'React',
      'Next.js',
      'GSAP',
      'Framer Motion',
      'TanStack Query',
      'Lenis',
      'shadcn/ui',
      'TypeScript',
    ],
    live: 'https://anime-vault-nextjs-ts.vercel.app/',
    code: 'https://github.com/sayeed-dev-07/anime-vault-nextjs-ts.git',
    img: '/img/anisearch.PNG',
  },
  {
    id: 2,
    name: 'Sellora',
    tech: ['React', 'Next.js', 'GSAP', 'Framer Motion', 'TypeScript'],
    live: 'https://sellora-theta.vercel.app/',
    code: 'https://github.com/sayeed-dev-07/sellora.git',
    img: '/img/sellora.PNG',
  },
  {
    id: 3,
    name: 'Spylt',
    tech: ['React', 'Next.js', 'GSAP', 'Lenis', 'TypeScript'],
    live: 'https://spylt-navy.vercel.app/',
    code: 'https://github.com/sayeed-dev-07/spylt.git',
    img: '/img/spylt.PNG',
  },
  {
    id: 4,
    name: 'No Good Co.',
    tech: ['React', 'Next.js', 'GSAP', 'TypeScript'],
    live: 'https://no-good-co.vercel.app/',
    code: 'https://github.com/sayeed-dev-07/no-good-co.git',
    img: '/img/nogood.PNG',
  },
  {
    id: 5,
    name: 'Sheltr',
    tech: ['React', 'Next.js', 'GSAP', 'TypeScript'],
    live: 'https://sheltr-cyan.vercel.app/',
    code: 'https://github.com/sayeed-dev-07/sheltr.git',
    img: '/img/sheltr.PNG',
  },
  {
    id: 6,
    name: 'ZenManga',
    tech: [
      'React',
      'Framer Motion',
      'Swiper',
      'TanStack Query',
      'React Router',
    ],
    live: 'https://zenmanga.vercel.app/',
    code: 'https://github.com/sayeed-dev-07/zenmanga.git',
    img: '/img/zenmanga.PNG',
  },
]
