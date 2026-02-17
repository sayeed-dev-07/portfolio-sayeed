// Inside TechBox.tsx
export default function TechBox({ text }: { text: string }) {
  return (
    <span className="
        px-4 py-2 
        rounded-full 
        bg-gray-100/50 border border-gray-200 
        text-xs md:text-sm font-medium uppercase tracking-wider text-gray-600
        hover:bg-white hover:border-gray-300 hover:shadow-sm
        transition-all duration-300 cursor-default
    ">
      {text}
    </span>
  )
}