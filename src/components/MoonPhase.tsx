import React from 'react';
import { Moon } from 'lucide-react';
import { MoonPhase as MoonPhaseType } from '../utils/moonPhase';

interface MoonPhaseProps {
  moonPhase: MoonPhaseType;
  isToday?: boolean;
  size?: 'small' | 'large';
}

export default function MoonPhase({ moonPhase, isToday = false, size = 'large' }: MoonPhaseProps) {
  const getMoonComponent = () => {
    const { phase, illumination } = moonPhase;
    const phaseIndex = phase * 8;
    
    // Create a visual representation of the moon phase
    const moonSize = size === 'large' ? 'w-24 h-24' : 'w-16 h-16';
    const containerClass = `${moonSize} relative flex items-center justify-center`;
    
    // Different visual states based on phase
    if (phaseIndex < 0.5 || phaseIndex >= 7.5) {
      // New Moon - dark
      return (
        <div className={containerClass}>
          <div className={`${moonSize} bg-gray-800 rounded-full border-2 border-gray-600`}></div>
        </div>
      );
    } else if (phaseIndex < 2) {
      // Waxing Crescent
      return (
        <div className={containerClass}>
          <div className={`${moonSize} bg-gray-800 rounded-full border-2 border-gray-600 relative overflow-hidden`}>
            <div 
              className="absolute top-0 right-0 bg-yellow-100 h-full rounded-full"
              style={{ width: `${illumination}%` }}
            ></div>
          </div>
        </div>
      );
    } else if (phaseIndex < 3) {
      // First Quarter
      return (
        <div className={containerClass}>
          <div className={`${moonSize} bg-gray-800 rounded-full border-2 border-gray-600 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 bg-yellow-100 w-1/2 h-full"></div>
          </div>
        </div>
      );
    } else if (phaseIndex < 4) {
      // Waxing Gibbous
      return (
        <div className={containerClass}>
          <div className={`${moonSize} bg-gray-800 rounded-full border-2 border-gray-600 relative overflow-hidden`}>
            <div 
              className="absolute top-0 right-0 bg-yellow-100 h-full rounded-full"
              style={{ width: `${illumination}%` }}
            ></div>
          </div>
        </div>
      );
    } else if (phaseIndex < 5) {
      // Full Moon
      return (
        <div className={containerClass}>
          <div className={`${moonSize} bg-yellow-100 rounded-full border-2 border-yellow-300`}></div>
        </div>
      );
    } else if (phaseIndex < 6) {
      // Waning Gibbous
      return (
        <div className={containerClass}>
          <div className={`${moonSize} bg-gray-800 rounded-full border-2 border-gray-600 relative overflow-hidden`}>
            <div 
              className="absolute top-0 left-0 bg-yellow-100 h-full rounded-full"
              style={{ width: `${illumination}%` }}
            ></div>
          </div>
        </div>
      );
    } else if (phaseIndex < 7) {
      // Last Quarter
      return (
        <div className={containerClass}>
          <div className={`${moonSize} bg-gray-800 rounded-full border-2 border-gray-600 relative overflow-hidden`}>
            <div className="absolute top-0 left-0 bg-yellow-100 w-1/2 h-full"></div>
          </div>
        </div>
      );
    } else {
      // Waning Crescent
      return (
        <div className={containerClass}>
          <div className={`${moonSize} bg-gray-800 rounded-full border-2 border-gray-600 relative overflow-hidden`}>
            <div 
              className="absolute top-0 left-0 bg-yellow-100 h-full rounded-full"
              style={{ width: `${illumination}%` }}
            ></div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={`
      bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 
      ${isToday ? 'border-2 border-yellow-400 shadow-lg shadow-yellow-400/20' : 'border border-gray-700'}
      transition-all duration-300 hover:scale-105 hover:shadow-xl
      ${size === 'small' ? 'p-4' : 'p-6'}
    `}>
      <div className="flex flex-col items-center text-center space-y-4">
        {getMoonComponent()}
        
        <div className="space-y-2">
          <h3 className={`font-black text-white ${size === 'large' ? 'text-2xl' : 'text-lg'}`}>
            {moonPhase.phaseName}
          </h3>
          
          <div className="space-y-1">
            <p className={`text-gray-300 font-bold ${size === 'large' ? 'text-base' : 'text-sm'}`}>
              {moonPhase.date.toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            
            <p className={`text-yellow-400 font-bold ${size === 'large' ? 'text-sm' : 'text-xs'}`}>
              {moonPhase.illumination}% illuminated
            </p>
          </div>
          
          {isToday && (
            <div className="inline-block bg-yellow-400 text-black px-3 py-1 rounded-full font-black text-xs">
              TODAY
            </div>
          )}
        </div>
      </div>
    </div>
  );
}