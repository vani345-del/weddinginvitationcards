import { cn } from "@/lib/utils";

interface StatItemProps {
  value: string;
  label: string;
  className?: string;
}

function StatItem({ value, label, className }: StatItemProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center space-y-2", className)}>
      <span className="font-serif text-3xl md:text-4xl text-gold font-light tracking-wide">
        {value}
      </span>
      <span className="font-sans text-[9px] md:text-[10px] text-gold/60 tracking-[0.2em] uppercase font-medium">
        {label}
      </span>
    </div>
  );
}

export default function StatsBanner() {
  return (
    <section className="relative w-full bg-[#0A0A0A] border-y border-gold/20 py-8 md:py-10 z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Desktop Layout (hidden on mobile/tablet) */}
        <div className="hidden md:flex items-center justify-between">
          <StatItem value="12+" label="US States Served" className="flex-1" />
          <div className="w-[1px] h-10 bg-gold/15" />
          <StatItem value="3–5" label="Days to Go Live" className="flex-1" />
          <div className="w-[1px] h-10 bg-gold/15" />
          <StatItem value="$199" label="Starting Price" className="flex-1" />
          <div className="w-[1px] h-10 bg-gold/15" />
          <StatItem value="1 yr" label="Hosting Included" className="flex-1" />
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="grid grid-cols-2 gap-y-12 md:hidden">
          <StatItem value="12+" label="US States Served" />
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gold/15 -ml-px" />
            <StatItem value="3–5" label="Days to Go Live" />
          </div>
          <div className="relative">
            <div className="absolute left-4 right-4 top-[-24px] h-[1px] bg-gold/15" />
            <StatItem value="$199" label="Starting Price" />
          </div>
          <div className="relative">
            <div className="absolute left-4 right-4 top-[-24px] h-[1px] bg-gold/15" />
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gold/15 -ml-px" />
            <StatItem value="1 yr" label="Hosting Included" />
          </div>
        </div>

      </div>
    </section>
  );
}
