import React from 'react'

const Meteor = ({ skillName = "Skill", shadowColor = "#ff0000", width = 120, height = 100 }) => {
  // Calculate proportional dimensions for child elements
  const crater1Size = Math.min(width, height) * 0.125;
  const crater2Size = Math.min(width, height) * 0.166;
  const crater3Size = Math.min(width, height) * 0.066;
  
  return (
    <div className="flex items-center justify-center relative overflow-hidden">
      {/* Meteor - Realistic Space Rock */}
      <div className="relative">
        {/* Main meteor body - irregular shape */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            background: `
              linear-gradient(135deg, 
                #4a4a4a 0%, 
                #2d2d2d 25%, 
                #1a1a1a 50%, 
                #3d3d3d 75%, 
                #5a5a5a 100%
              )
            `,
            borderRadius: '45% 30% 60% 40%',
            boxShadow: `
              inset -10px -10px 20px rgba(0,0,0,0.8),
              inset 10px 10px 20px rgba(255,255,255,0.1),
              0 5px 15px rgba(0,0,0,0.5),
              0 0 30px ${shadowColor}
            `,
            transform: 'rotate(-15deg)'
          }}
        >
          {/* Skill name centered on meteor */}
          <div 
            className="absolute z-10 text-center font-bold"
            style={{
              color: 'white',
              textShadow: `0 0 5px ${shadowColor}, 0 0 10px ${shadowColor}`,
              fontSize: `${Math.min(width, height) * 0.2}px`,
              width: '100%',
              transform: 'rotate(15deg)'
            }}
          >
            {skillName}
          </div>

          {/* Crater impacts */}
          <div 
            className="absolute rounded-full"
            style={{
              top: `${height * 0.2}px`,
              left: `${width * 0.25}px`,
              width: `${crater1Size}px`,
              height: `${crater1Size * 0.8}px`,
              background: 'radial-gradient(circle, #000000 30%, #1a1a1a 70%)',
              borderRadius: '60% 40% 50% 45%',
              boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.9)'
            }}
          />
          
          <div 
            className="absolute rounded-full"
            style={{
              top: `${height * 0.55}px`,
              right: `${width * 0.2}px`,
              width: `${crater2Size}px`,
              height: `${crater2Size * 0.9}px`,
              background: 'radial-gradient(circle, #0d0d0d 20%, #2d2d2d 80%)',
              borderRadius: '55% 45% 60% 40%',
              boxShadow: 'inset 3px 3px 8px rgba(0,0,0,0.8)'
            }}
          />
          
          <div 
            className="absolute rounded-full"
            style={{
              top: `${height * 0.4}px`,
              left: `${width * 0.6}px`,
              width: `${crater3Size}px`,
              height: `${crater3Size}px`,
              background: 'radial-gradient(circle, #000000 40%, #1a1a1a 90%)',
              boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.9)'
            }}
          />

          {/* Surface texture and bumps */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              background: `
                radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 1px, transparent 2px),
                radial-gradient(circle at 70% 20%, rgba(0,0,0,0.3) 1px, transparent 2px),
                radial-gradient(circle at 40% 80%, rgba(255,255,255,0.08) 1px, transparent 2px),
                radial-gradient(circle at 85% 60%, rgba(0,0,0,0.2) 1px, transparent 2px),
                radial-gradient(circle at 15% 75%, rgba(255,255,255,0.05) 1px, transparent 2px)
              `,
              backgroundSize: '15px 15px, 12px 12px, 18px 18px, 10px 10px, 20px 20px',
              borderRadius: '45% 30% 60% 40%'
            }}
          />
          
          {/* Highlight edges */}
          <div 
            className="absolute"
            style={{
              top: `${height * 0.08}px`,
              left: `${width * 0.125}px`,
              width: `${width * 0.333}px`,
              height: `${height * 0.25}px`,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)',
              borderRadius: '60% 40% 50% 70%',
              filter: 'blur(2px)'
            }}
          />

          {/* Rough surface bumps */}
          <div 
            className="absolute rounded-full"
            style={{
              top: `${height * 0.25}px`,
              right: `${width * 0.375}px`,
              width: `${width * 0.05}px`,
              height: `${height * 0.08}px`,
              background: 'linear-gradient(45deg, #6a6a6a, #3a3a3a)',
              borderRadius: '50% 60% 40% 55%',
              boxShadow: '1px 1px 2px rgba(0,0,0,0.8)'
            }}
          />
          
          <div 
            className="absolute rounded-full"
            style={{
              bottom: `${height * 0.3}px`,
              left: `${width * 0.166}px`,
              width: `${width * 0.033}px`,
              height: `${height * 0.05}px`,
              background: 'linear-gradient(45deg, #5a5a5a, #2a2a2a)',
              borderRadius: '45% 55% 50% 60%',
              boxShadow: '1px 1px 2px rgba(0,0,0,0.7)'
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.4); 
          }
        }
      `}</style>
    </div>
  )
}

export default Meteor