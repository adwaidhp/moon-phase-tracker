export interface MoonPhase {
  phase: number; // 0-1 where 0 is new moon, 0.5 is full moon
  phaseName: string;
  illumination: number; // 0-100 percentage
  date: Date;
}

export function calculateMoonPhase(date: Date): MoonPhase {
  // Known new moon date: January 6, 2000, 18:14 UTC
  const knownNewMoon = new Date(2000, 0, 6, 18, 14, 0);
  const lunarCycle = 29.53058867; // days
  
  // Calculate days since known new moon
  const daysSinceNew = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  
  // Calculate current phase (0-1)
  const phase = (daysSinceNew % lunarCycle) / lunarCycle;
  
  // Normalize to 0-1
  const normalizedPhase = phase >= 0 ? phase : phase + 1;
  
  // Determine phase name and illumination
  const { phaseName, illumination } = getPhaseDetails(normalizedPhase);
  
  return {
    phase: normalizedPhase,
    phaseName,
    illumination,
    date
  };
}

function getPhaseDetails(phase: number): { phaseName: string; illumination: number } {
  // Convert phase to 0-8 scale for easier calculation
  const phaseIndex = phase * 8;
  
  let phaseName: string;
  let illumination: number;
  
  if (phaseIndex < 0.5) {
    phaseName = "New Moon";
    illumination = 0;
  } else if (phaseIndex < 1.5) {
    phaseName = "Waxing Crescent";
    illumination = Math.round((phaseIndex / 2) * 100);
  } else if (phaseIndex < 2.5) {
    phaseName = "First Quarter";
    illumination = 50;
  } else if (phaseIndex < 3.5) {
    phaseName = "Waxing Gibbous";
    illumination = Math.round(50 + ((phaseIndex - 2) / 2) * 50);
  } else if (phaseIndex < 4.5) {
    phaseName = "Full Moon";
    illumination = 100;
  } else if (phaseIndex < 5.5) {
    phaseName = "Waning Gibbous";
    illumination = Math.round(100 - ((phaseIndex - 4) / 2) * 50);
  } else if (phaseIndex < 6.5) {
    phaseName = "Last Quarter";
    illumination = 50;
  } else if (phaseIndex < 7.5) {
    phaseName = "Waning Crescent";
    illumination = Math.round(50 - ((phaseIndex - 6) / 2) * 50);
  } else {
    phaseName = "New Moon";
    illumination = Math.round((8 - phaseIndex) / 2 * 100);
  }
  
  return { phaseName, illumination: Math.max(0, Math.min(100, illumination)) };
}

export function getMoonIcon(phase: number): string {
  const phaseIndex = phase * 8;
  
  if (phaseIndex < 0.5 || phaseIndex >= 7.5) {
    return "moon"; // New Moon
  } else if (phaseIndex < 1.5) {
    return "moon"; // Waxing Crescent
  } else if (phaseIndex < 2.5) {
    return "moon"; // First Quarter
  } else if (phaseIndex < 3.5) {
    return "moon"; // Waxing Gibbous
  } else if (phaseIndex < 4.5) {
    return "moon"; // Full Moon
  } else if (phaseIndex < 5.5) {
    return "moon"; // Waning Gibbous
  } else if (phaseIndex < 6.5) {
    return "moon"; // Last Quarter
  } else {
    return "moon"; // Waning Crescent
  }
}

export function getNext7Days(): Date[] {
  const today = new Date();
  const days: Date[] = [];
  
  for (let i = 1; i <= 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push(date);
  }
  
  return days;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}