import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Moon as MoonIcon } from 'lucide-react';
import { calculateMoonPhase } from './utils/moonPhase';
import MoonPhase from './components/MoonPhase';
import MoonCalendar from './components/MoonCalendar';

function App() {
  const [view, setView] = useState<'today' | 'calendar'>('today');
  const [todaysMoonPhase, setTodaysMoonPhase] = useState(calculateMoonPhase(new Date()));

  useEffect(() => {
    // Update moon phase every minute to keep it current
    const interval = setInterval(() => {
      setTodaysMoonPhase(calculateMoonPhase(new Date()));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleViewChange = (newView: 'today' | 'calendar') => {
    setView(newView);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-black">
      {/* Background Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full opacity-60"></div>
        <div className="absolute top-40 left-1/4 w-1 h-1 bg-white rounded-full opacity-90"></div>
        <div className="absolute top-60 right-1/3 w-1 h-1 bg-white rounded-full opacity-70"></div>
        <div className="absolute bottom-40 left-1/3 w-1 h-1 bg-white rounded-full opacity-80"></div>
        <div className="absolute bottom-60 right-1/4 w-1 h-1 bg-white rounded-full opacity-60"></div>
        <div className="absolute top-1/3 left-10 w-1 h-1 bg-white rounded-full opacity-90"></div>
        <div className="absolute bottom-1/3 right-10 w-1 h-1 bg-white rounded-full opacity-70"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <MoonIcon className="w-8 h-8 text-yellow-400 mr-3" />
            <h1 className="text-5xl font-black text-white">
              Moon Phase Tracker
            </h1>
          </div>
          <p className="text-gray-300 font-bold text-xl">
            Track lunar cycles and phases
          </p>
        </header>

        {/* Navigation */}
        <nav className="flex justify-center mb-8">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-full p-2 border border-gray-700">
            <div className="flex space-x-1">
              <button
                onClick={() => handleViewChange('today')}
                className={`
                  px-6 py-3 rounded-full font-black text-sm transition-all duration-300
                  flex items-center space-x-2
                  ${view === 'today' 
                    ? 'bg-yellow-400 text-black shadow-lg' 
                    : 'text-white hover:bg-gray-800'
                  }
                `}
              >
                <MoonIcon className="w-4 h-4" />
                <span>Today</span>
              </button>
              
              <button
                onClick={() => handleViewChange('calendar')}
                className={`
                  px-6 py-3 rounded-full font-black text-sm transition-all duration-300
                  flex items-center space-x-2
                  ${view === 'calendar' 
                    ? 'bg-yellow-400 text-black shadow-lg' 
                    : 'text-white hover:bg-gray-800'
                  }
                `}
              >
                <Calendar className="w-4 h-4" />
                <span>Next 7 Days</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 px-6 pb-8">
          {view === 'today' ? (
            <div className="flex justify-center">
              <div className="max-w-md">
                <MoonPhase
                  moonPhase={todaysMoonPhase}
                  isToday={true}
                  size="large"
                />
              </div>
            </div>
          ) : (
            <MoonCalendar />
          )}
        </main>

        {/* Footer */}
        <footer className="text-center p-6">
          <p className="text-gray-400 font-bold text-sm">
            Moon phases calculated using astronomical data
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;