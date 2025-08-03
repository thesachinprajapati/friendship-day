import React, { useState, useRef } from 'react';
import { Sparkles, Star } from 'lucide-react';

interface SpinningWheelProps {
  onComplete: () => void;
}

const challenges = [
  "Share a favorite memory together! 💭",
  "Send a virtual hug! 🤗",
  "Recreate a silly selfie! 📸",
  "Write a friendship haiku! 🌸",
  "Do a happy dance! 💃",
  "Share your favorite joke! 😂"
];

const wheelColors = [
  'from-pink-400 to-pink-500',
  'from-purple-400 to-purple-500',
  'from-blue-400 to-blue-500',
  'from-green-400 to-green-500',
  'from-yellow-400 to-yellow-500',
  'from-red-400 to-red-500'
];

const SpinningWheel: React.FC<SpinningWheelProps> = ({ onComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState('');
  const [rotation, setRotation] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showChallengeMessage, setShowChallengeMessage] = useState(false);
  const [isWheelAnimating, setIsWheelAnimating] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setIsWheelAnimating(true);
    setCurrentChallenge('');
    setShowChallengeMessage(false);

    // Random rotation between 1800 and 3600 degrees (5-10 full rotations)
    const spinAmount = 1800 + Math.random() * 1800;
    const newRotation = rotation + spinAmount;
    setRotation(newRotation);

    // Calculate which segment we land on (360 degrees / 6 segments = 60 degrees per segment)
    const segmentAngle = 360 / challenges.length;
    const normalizedRotation = newRotation % 360;
    const segmentIndex = Math.floor((360 - normalizedRotation + segmentAngle / 2) / segmentAngle) % challenges.length;

    setTimeout(() => {
      setIsSpinning(false);
      setIsWheelAnimating(false);
      setCurrentChallenge(challenges[segmentIndex]);
      setShowChallengeMessage(true);
    }, 4000);
  };

  const completeChallenge = () => {
    if (currentChallenge && !completedChallenges.includes(currentChallenge)) {
      const newCompleted = [...completedChallenges, currentChallenge];
      setCompletedChallenges(newCompleted);
      setShowChallengeMessage(false); // Hide message when completed
      
      if (newCompleted.length >= 3) { // Complete after 3 challenges
        setGameCompleted(true);
        onComplete();
      }
    }
  };

  const resetGame = () => {
    setCompletedChallenges([]);
    setGameCompleted(false);
    setCurrentChallenge('');
    setShowChallengeMessage(false);
    setRotation(0);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-2">
          Friendship Wheel 🎡
        </h2>
        <p className="text-gray-600">Spin the wheel for friendship challenges!</p>
        <div className="mt-3">
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
            Completed: {completedChallenges.length}/3
          </span>
        </div>
      </div>

      {/* Spinning Wheel */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-4">
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 z-10">
            <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-purple-600 drop-shadow-lg"></div>
          </div>
          
          {/* Wheel */}
          <div
            ref={wheelRef}
            className={`w-72 h-72 rounded-full relative overflow-hidden shadow-2xl transition-transform ease-out ${
              isWheelAnimating ? 'duration-4000' : 'duration-1000'
            }`}
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {challenges.map((challenge, index) => {
              const angle = (360 / challenges.length) * index;
              return (
                <div
                  key={index}
                  className={`absolute w-1/2 h-1/2 origin-bottom-right bg-gradient-to-r ${wheelColors[index]}`}
                  style={{
                    transform: `rotate(${angle}deg)`,
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  }}
                >
                  <div 
                    className="absolute top-6 right-10 text-white text-sm font-bold transform -rotate-90 drop-shadow-md"
                    style={{ transform: `rotate(${-angle + 30}deg)`, transformOrigin: 'center' }}
                  >
                    {index + 1}
                  </div>
                </div>
              );
            })}
            
            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full border-4 border-purple-600 flex items-center justify-center shadow-lg">
              <Star className="text-purple-600 w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Spin Button */}
        <button
          onClick={spinWheel}
          disabled={isSpinning || gameCompleted}
          className={`px-10 py-4 rounded-full font-bold text-white text-xl transition-all duration-300 transform hover:scale-105 ${
            isSpinning || gameCompleted
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl animate-pulse'
          }`}
        >
          {isSpinning ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Spinning...
            </div>
          ) : (
            'SPIN THE WHEEL!'
          )}
        </button>
      </div>

      {/* Current Challenge - Only disappears when Complete button is clicked */}
      {showChallengeMessage && currentChallenge && (
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6 text-center mb-4 animate-bounce shadow-lg border-2 border-yellow-300">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="text-orange-500 animate-pulse" size={24} />
            <Star className="text-yellow-500 animate-pulse" size={24} />
            <Sparkles className="text-orange-500 animate-pulse" size={24} />
          </div>
          <h3 className="text-lg font-bold text-orange-700 mb-2">Your Challenge:</h3>
          <p className="text-orange-600 mb-4 text-lg font-medium">{currentChallenge}</p>
          {!completedChallenges.includes(currentChallenge) && (
            <button
              onClick={completeChallenge}
              className="bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-3 rounded-full font-bold hover:from-green-500 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Challenge Complete! ✅
            </button>
          )}
        </div>
      )}

      {/* Game Status */}
      {gameCompleted && (
        <div className="text-center">
          <div className="text-5xl mb-3 animate-bounce">🎉</div>
          <h3 className="text-xl font-bold text-green-600 mb-3">Wheel Challenge Complete!</h3>
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-8 py-3 rounded-full font-bold hover:from-pink-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Spin Again
          </button>
        </div>
      )}

      {/* Completed Challenges */}
      {completedChallenges.length > 0 && (
        <div className="mt-4">
          <h4 className="text-base font-bold text-purple-700 mb-3">Completed Challenges:</h4>
          <div className="space-y-2">
            {completedChallenges.map((challenge, index) => (
              <div key={index} className="text-sm text-green-600 flex items-center gap-2 bg-green-50 p-2 rounded-lg">
                <span className="text-green-500 text-lg">✅</span>
                {challenge}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpinningWheel;