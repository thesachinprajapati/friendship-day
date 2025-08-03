import React, { useState, useEffect } from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface Card {
  id: number;
  emoji: string;
  message: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryGameProps {
  onComplete: () => void;
}

const cardPairs = [
  { emoji: '🤝', message: 'True friendship is built on trust and understanding!' },
  { emoji: '🎉', message: 'Every moment with you is worth celebrating!' },
  { emoji: '💕', message: 'Our friendship fills my heart with joy!' },
  { emoji: '🌟', message: 'You shine bright and make everything better!' },
  { emoji: '🎈', message: 'Life is more fun with a friend like you!' },
  { emoji: '🎁', message: 'Your friendship is the best gift I could ask for!' },
];

const MemoryGame: React.FC<MemoryGameProps> = ({ onComplete }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [matchedMessage, setMatchedMessage] = useState('');
  const [showMatchMessage, setShowMatchMessage] = useState(false);
  const [matchedCardIds, setMatchedCardIds] = useState<number[]>([]);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const gameCards: Card[] = [];
    cardPairs.forEach((pair, index) => {
      // Create two cards for each pair
      gameCards.push({
        id: index * 2,
        emoji: pair.emoji,
        message: pair.message,
        isFlipped: false,
        isMatched: false,
      });
      gameCards.push({
        id: index * 2 + 1,
        emoji: pair.emoji,
        message: pair.message,
        isFlipped: false,
        isMatched: false,
      });
    });
    
    // Shuffle the cards
    setCards(gameCards.sort(() => Math.random() - 0.5));
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2 || cards[cardId].isFlipped || cards[cardId].isMatched || gameCompleted) {
      return;
    }

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards[firstId];
      const secondCard = newCards[secondId];

      if (firstCard.emoji === secondCard.emoji) {
        // Match found!
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[firstId].isMatched = true;
          updatedCards[secondId].isMatched = true;
          setCards(updatedCards);
          setMatchedPairs(prev => prev + 1);
          
          // Show message over the matched cards
          setMatchedMessage(firstCard.message);
          setMatchedCardIds([firstId, secondId]);
          setShowMatchMessage(true);
          
          // Hide message after 4 seconds
          setTimeout(() => {
            setShowMatchMessage(false);
            setMatchedCardIds([]);
          }, 4000);
          
          setFlippedCards([]);
          
          if (matchedPairs + 1 === cardPairs.length) {
            setTimeout(() => {
              setGameCompleted(true);
              onComplete();
            }, 4000); // Wait for message to disappear before showing completion
          }
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[firstId].isFlipped = false;
          updatedCards[secondId].isFlipped = false;
          setCards(updatedCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setMatchedPairs(0);
    setGameCompleted(false);
    setFlippedCards([]);
    setShowMatchMessage(false);
    setMatchedCardIds([]);
    setMatchedMessage('');
    initializeGame();
  };

  if (gameCompleted) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
        <div className="text-center">
          <div className="text-6xl mb-6 animate-bounce">🎊</div>
          <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4">
            Memory Game Complete!
          </h2>
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="text-pink-500 animate-pulse" size={24} />
              <Sparkles className="text-purple-500 animate-pulse" size={24} />
              <Heart className="text-pink-500 animate-pulse" size={24} />
            </div>
            <p className="text-purple-700 font-medium text-lg leading-relaxed">
              Amazing work! You've unlocked all the beautiful friendship messages. 
              Each match revealed how special our friendship truly is. Thank you for 
              being such a wonderful friend! 💝
            </p>
          </div>
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-8 py-3 rounded-full font-bold hover:from-pink-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-2">
          Memory Match 💝
        </h2>
        <p className="text-gray-600">Find matching emoji pairs to reveal friendship messages!</p>
        <div className="mt-3">
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
            Matches: {matchedPairs}/6
          </span>
        </div>
      </div>

      {/* Game Board */}
      <div className="relative">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-6">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`aspect-square rounded-xl cursor-pointer transform transition-all duration-700 hover:scale-105 relative ${
                card.isMatched ? 'animate-pulse' : ''
              } ${gameCompleted ? 'pointer-events-none' : ''}`}
              onClick={() => handleCardClick(index)}
              style={{ perspective: '1000px' }}
            >
              <div className={`w-full h-full relative preserve-3d transition-transform duration-700 ${
                card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
              }`}>
                {/* Card Back */}
                <div className="absolute inset-0 backface-hidden rounded-xl bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center shadow-lg">
                  <div className="text-2xl animate-pulse">💫</div>
                </div>
                
                {/* Card Front */}
                <div className={`absolute inset-0 backface-hidden rounded-xl flex items-center justify-center rotate-y-180 shadow-lg ${
                  card.isMatched 
                    ? 'bg-gradient-to-br from-green-100 to-green-200 ring-2 ring-green-400' 
                    : 'bg-gradient-to-br from-white to-gray-50'
                }`}>
                  <div className={`text-3xl ${card.isMatched ? 'animate-bounce' : ''}`}>
                    {card.emoji}
                  </div>
                </div>
              </div>

              {/* Message Overlay for Matched Cards */}
              {showMatchMessage && matchedCardIds.includes(index) && (
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/95 to-orange-200/95 backdrop-blur-sm rounded-xl flex items-center justify-center z-10 animate-bounce border-2 border-yellow-400 shadow-2xl">
                  <div className="text-center p-2">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Sparkles className="text-orange-500 animate-pulse" size={16} />
                      <Heart className="text-pink-500 animate-pulse" size={16} />
                    </div>
                    <p className="text-orange-700 font-bold text-xs leading-tight">
                      {matchedMessage}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;