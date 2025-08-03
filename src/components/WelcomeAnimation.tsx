import React, { useEffect, useState } from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';

interface WelcomeAnimationProps {
  onComplete: () => void;
}

const WelcomeAnimation: React.FC<WelcomeAnimationProps> = ({ onComplete }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    // Show message after 0.5s
    const messageTimer = setTimeout(() => {
      setShowMessage(true);
    }, 500);

    // Show hearts after 1s
    const heartsTimer = setTimeout(() => {
      setShowHearts(true);
    }, 1000);

    // Complete animation after 2s
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(messageTimer);
      clearTimeout(heartsTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-300 flex items-center justify-center z-50">
      {/* Floating Hearts Background */}
      {showHearts && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-pink-400 text-2xl animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              💕
            </div>
          ))}
        </div>
      )}

      {/* Welcome Message */}
      <div className={`text-center transform transition-all duration-1000 ${
        showMessage ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
      }`}>
        <div className="flex items-center justify-center gap-4 mb-6">
          <Heart className="text-pink-500 animate-pulse" size={48} />
          <Sparkles className="text-yellow-400 animate-spin" size={48} />
          <Star className="text-purple-500 animate-pulse" size={48} />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 animate-bounce drop-shadow-2xl">
          Happy
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-purple-200 mb-6 animate-pulse">
          Friendship Day!
        </h2>
        
        <div className="flex items-center justify-center gap-4">
          <Heart className="text-red-400 animate-pulse" size={32} />
          <span className="text-white text-xl font-medium bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm">
            Pinki ji
          </span>
          <Heart className="text-red-400 animate-pulse" size={32} />
        </div>
      </div>

      {/* Loading Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-2 text-white">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          <span className="text-lg font-medium">Loading celebration...</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeAnimation;