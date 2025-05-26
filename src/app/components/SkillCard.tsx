import React from 'react';

interface SkillCardProps {
  color?: string;
  imgSrc: string;
  label: string;
  desc: string;
  classes?: string;
  isActive?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
}
const SkillCard: React.FC<SkillCardProps> = ({
  color,
  imgSrc,
  label,
  desc,
  classes,
  isActive = false,
  onHover,
  onLeave
}) => {
  return (
    <div
      style={{ '--skill-color': color } as React.CSSProperties}
      className={`skill flex items-center gap-3 ring-2 ring-inset ring-zinc-50/10 rounded-2xl p-3 transition-all duration-300 group ${classes || ''} ${
        isActive 
          ? 'skill-active' 
          : 'hover:skill-hover'
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <figure className={`flex items-center justify-center rounded-lg overflow-hidden w-12 h-12 p-2 transition-colors duration-300 ${
        isActive 
          ? 'bg-black' 
          : 'bg-zinc-700/50 group-hover:bg-zinc-900'
      }`}>
        <img
          src={imgSrc}
          alt={label}
          width={32}
          height={32}
        />
      </figure>
      
      <div>
        <h3 className={`transition-colors duration-300 ${
          isActive ? 'text-black font-bold' : 'text-white'
        }`}>
          {label}
        </h3>
        <p className={`text-sm transition-colors duration-300 ${
          isActive ? 'text-black' : 'text-zinc-400'
        }`}>
          {desc}
        </p>
      </div>
    </div>
  );
};

export default SkillCard;