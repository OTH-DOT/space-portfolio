import React from 'react';

interface SkillCardProps {
  color?: string;
  imgSrc: string;
  label: string;
  desc: string;
  classes?: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ 
  color, 
  imgSrc, 
  label, 
  desc, 
  classes 
}) => {
  return (
    <div 
      style={{ '--skill-color': color } as React.CSSProperties}
      className={`skill flex items-center gap-3 ring-2 ring-inset ring-zinc-50/10 rounded-2xl p-3 hover:active focus:active active:active transition-colors group ${classes || ''}`}
    >
      <figure className='flex items-center justify-center bg-zinc-700/50 rounded-lg overflow-hidden w-12 h-12 p-2 group-hover:bg-zinc-900 transition-colors'>
        <img 
          src={imgSrc} 
          alt={label}
          width={32}
          height={32}  
        />
      </figure>

      <div>
        <h3>{label}</h3>
        <p className="text-zinc-400 text-sm">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default SkillCard;