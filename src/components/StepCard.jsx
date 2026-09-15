import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Users,
  Sparkles,
  Layers,
  ShieldCheck,
  HeartHandshake,
  Target,
  PenTool,
  Camera,
  Image,
  SunMedium,
  Compass,
  MoonStar,
  MessageCircle,
  Calendar,
  Home,
  PhoneCall,
  LayoutTemplate,
  SlidersHorizontal,
  Network,
  Star,
  Globe,
  Box,
  Zap,
  Building2,
  Boxes,
  Check
} from 'lucide-react';

const ICON_MAP = {
  User,
  Users,
  Sparkles,
  Layers,
  ShieldCheck,
  HeartHandshake,
  Target,
  PenTool,
  Camera,
  Image,
  SunMedium,
  Compass,
  MoonStar,
  MessageCircle,
  Calendar,
  Home,
  PhoneCall,
  LayoutTemplate,
  SlidersHorizontal,
  Network,
  Star,
  Globe,
  Box,
  Zap,
  Building2,
  Boxes
};

export default function StepCard({
  option,
  isSelected,
  onSelect,
  isHeroVisualStep,
  isDesignStyleStep,
  isMultiSelect = true
}) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, mouseX: 50, mouseY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Dynamic Lucide Icon
  const IconComponent = ICON_MAP[option.icon] || Sparkles;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7; // Max tilt 7 deg
    const rotateY = ((x - centerX) / centerX) * 7;

    const mouseXPercent = (x / rect.width) * 100;
    const mouseYPercent = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, mouseX: mouseXPercent, mouseY: mouseYPercent });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, mouseX: 50, mouseY: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
      }}
      whileTap={{ scale: 0.98 }}
      className={`group relative rounded-3xl p-6 sm:p-7 cursor-pointer transition-all duration-300 overflow-hidden flex flex-col justify-between h-full ${
        isSelected
          ? 'bg-gradient-to-b from-gold/[0.08] via-white/[0.02] to-obsidian border-gold/60 ring-1 ring-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.15)]'
          : 'luxury-glass hover:border-white/20 hover:bg-white/[0.04]'
      }`}
    >
      {/* Dynamic Cursor Border Spotlight / Shimmer */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered || isSelected ? 1 : 0,
          background: `radial-gradient(circle 280px at ${tilt.mouseX}% ${tilt.mouseY}%, ${
            isSelected ? 'rgba(212, 175, 55, 0.16)' : 'rgba(255, 255, 255, 0.08)'
          }, transparent 80%)`,
        }}
      />

      {/* Top Header: Architectural Icon (Left) & Selection Indicator (Right) */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-5">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              isSelected
                ? 'bg-gradient-to-br from-gold to-gold-bronze text-obsidian shadow-[0_0_18px_rgba(212,175,55,0.45)]'
                : 'bg-white/[0.04] text-gold-light border border-white/10 group-hover:border-gold/40 group-hover:bg-white/[0.06]'
            }`}
          >
            <IconComponent className="w-4.5 h-4.5" />
          </div>

          {/* Interactive Checkbox / Radio State */}
          {isMultiSelect ? (
            <div
              className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all duration-300 ${
                isSelected
                  ? 'border-gold bg-gold text-obsidian shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                  : 'border-white/20 group-hover:border-gold/50 bg-white/[0.02]'
              }`}
            >
              {isSelected && <Check className="w-3.5 h-3.5 text-obsidian stroke-[3]" />}
            </div>
          ) : (
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                isSelected
                  ? 'border-gold bg-gold/20 shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                  : 'border-white/20 group-hover:border-gold/50 bg-white/[0.02]'
              }`}
            >
              {isSelected && <div className="w-2 h-2 rounded-full bg-gold animate-pulse shadow-[0_0_6px_rgba(212,175,55,1)]" />}
            </div>
          )}
        </div>

        {/* Visual Mockups if Step 4 (Design Language) */}
        {isDesignStyleStep && (
          <div className="my-3.5 space-y-2">
            {option.image && (
              <div className="rounded-2xl overflow-hidden border border-white/10 h-24 relative group/img bg-black/40">
                <img
                  src={option.image}
                  alt={option.title}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/75 via-transparent to-transparent pointer-events-none" />
              </div>
            )}

            {/* Color Swatch Bar */}
            {option.palette && (
              <div className="p-2 rounded-xl bg-black/40 border border-white/10 flex items-center gap-1.5">
                {option.palette.map((color, cIdx) => (
                  <div
                    key={cIdx}
                    className="h-2 flex-1 rounded-full border border-white/10"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Visual Mockups if Step 3 (Hero Visual) */}
        {isHeroVisualStep && option.image && (
          <div className="my-3.5 rounded-2xl overflow-hidden border border-white/10 h-32 relative group/img bg-black/40">
            <img
              src={option.image}
              alt={option.title}
              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-mono tracking-widest text-gold uppercase shadow-sm">
              {option.preview === 'portrait' ? 'Portre Kadrajı' : 'Mimari Başyapıt'}
            </div>
          </div>
        )}

        {/* Title Focus */}
        <h3 className="font-serif text-lg sm:text-xl text-architectural-white font-medium mb-2 group-hover:text-gold-light transition-colors leading-snug">
          {option.title}
        </h3>

        {/* Optional Quote / Manifesto */}
        {option.quote && (
          <p className="text-xs font-serif italic text-gold/90 mb-2.5 leading-relaxed pl-3 border-l-2 border-gold/40 py-0.5 bg-gold/[0.02] rounded-r">
            {option.quote}
          </p>
        )}

        {/* Description Focus */}
        <p className="text-xs sm:text-[13px] text-architectural-muted font-light leading-relaxed">
          {option.desc}
        </p>
      </div>
    </motion.div>
  );
}
