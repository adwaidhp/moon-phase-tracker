import React from 'react';
import { getNext7Days, calculateMoonPhase, formatDate } from '../utils/moonPhase';
import MoonPhase from './MoonPhase';

export default function MoonCalendar() {
  const next7Days = getNext7Days();
  const moonPhases = next7Days.map(date => calculateMoonPhase(date));

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-black text-white mb-2">
          Next 7 Days
        </h2>
        <p className="text-gray-300 font-bold text-lg">
          Upcoming moon phases
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {moonPhases.map((moonPhase, index) => (
          <MoonPhase
            key={index}
            moonPhase={moonPhase}
            size="small"
          />
        ))}
      </div>
    </div>
  );
}