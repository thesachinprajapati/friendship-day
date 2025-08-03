import React from 'react';

const Confetti: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          <div
            className={`w-2 h-2 ${
              ['bg-pink-400', 'bg-purple-400', 'bg-yellow-400', 'bg-green-400', 'bg-blue-400', 'bg-red-400'][
                Math.floor(Math.random() * 6)
              ]
            } transform rotate-45`}
            style={{
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        </div>
      ))}
      
      {/* Heart confetti */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`heart-${i}`}
          className="absolute text-pink-500 animate-confetti text-lg"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${4 + Math.random() * 2}s`,
          }}
        >
          💕
        </div>
      ))}
    </div>
  );
};

export default Confetti;