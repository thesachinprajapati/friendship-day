import React, { useState, useEffect } from 'react';
import MemoryGame from './components/MemoryGame';
import SpinningWheel from './components/SpinningWheel';
import Confetti from './components/Confetti';
import WelcomeAnimation from './components/WelcomeAnimation';
import { Heart, Sparkles, Gamepad2, Zap } from 'lucide-react';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeGame, setActiveGame] = useState<'memory' | 'wheel'>('memory');
  const [memoryGameCompleted, setMemoryGameCompleted] = useState(false);
  const [wheelGameCompleted, setWheelGameCompleted] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (memoryGameCompleted && wheelGameCompleted && !showFinalMessage) {
      setShowFinalMessage(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [memoryGameCompleted, wheelGameCompleted, showFinalMessage]);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  if (showWelcome) {
    return <WelcomeAnimation onComplete={handleWelcomeComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 font-poppins">
      {showConfetti && <Confetti />}
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4 animate-bounce drop-shadow-lg">
            Friendship Celebration
          </h1>
          <div className="flex items-center justify-center gap-3 text-xl md:text-2xl">
            <Heart className="text-pink-500 animate-pulse drop-shadow-md" size={28} />
            <span className="text-purple-700 font-bold bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              Best Friends Forever
            </span>
            <Sparkles className="text-yellow-500 animate-pulse drop-shadow-md" size={28} />
          </div>
        </div>

        {/* Game Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveGame('memory')}
                className={`flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeGame === 'memory'
                    ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg transform scale-105'
                    : 'text-purple-700 hover:bg-white/50'
                }`}
              >
                <Gamepad2 size={20} />
                <span>Memory Game</span>
                {memoryGameCompleted && (
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                )}
              </button>
              
              <button
                onClick={() => setActiveGame('wheel')}
                className={`flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeGame === 'wheel'
                    ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg transform scale-105'
                    : 'text-purple-700 hover:bg-white/50'
                }`}
              >
                <Zap size={20} />
                <span>Friendship Wheel</span>
                {wheelGameCompleted && (
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-4">
            <div className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-500 shadow-md ${
              memoryGameCompleted 
                ? 'bg-green-200 text-green-800 animate-pulse' 
                : 'bg-white/60 text-gray-600 backdrop-blur-sm'
            }`}>
              <span className={`w-3 h-3 rounded-full transition-all duration-300 ${
                memoryGameCompleted ? 'bg-green-500 animate-bounce' : 'bg-gray-300'
              }`}></span>
              <span className="font-medium text-sm">Memory Complete</span>
            </div>
            <div className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-500 shadow-md ${
              wheelGameCompleted 
                ? 'bg-green-200 text-green-800 animate-pulse' 
                : 'bg-white/60 text-gray-600 backdrop-blur-sm'
            }`}>
              <span className={`w-3 h-3 rounded-full transition-all duration-300 ${
                wheelGameCompleted ? 'bg-green-500 animate-bounce' : 'bg-gray-300'
              }`}></span>
              <span className="font-medium text-sm">Wheel Complete</span>
            </div>
          </div>
        </div>

        {/* Game Content */}
        <div className="max-w-4xl mx-auto mb-8">
          {activeGame === 'memory' ? (
            <MemoryGame onComplete={() => setMemoryGameCompleted(true)} />
          ) : (
            <SpinningWheel onComplete={() => setWheelGameCompleted(true)} />
          )}
        </div>

        {/* Final Message */}
        {showFinalMessage && (
          <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl p-10 text-center shadow-2xl animate-bounce border-4 border-pink-200">
            <div className="text-8xl mb-6 animate-bounce">🎉</div>
            <h2 className="text-4xl font-bold text-purple-700 mb-6">
              Congratulations, Amazing Friend!
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed font-medium">
              You've completed both friendship challenges! Your friendship is truly special - 
              filled with memories, laughter, and endless support. Thank you for being such 
              an incredible friend. Here's to many more adventures together! 💕
            </p>
            <div className="flex justify-center gap-6">
              <Heart className="text-red-500 animate-pulse drop-shadow-md" size={32} />
              <Sparkles className="text-yellow-500 animate-pulse drop-shadow-md" size={32} />
              <Heart className="text-pink-500 animate-pulse drop-shadow-md" size={32} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;