// Card Component
// Design: Cyberpunk Neon Casino - Glowing neon-bordered cards with holographic effects

import { Card as CardType, getCardColor } from '@/lib/blackjack';
import { motion } from 'framer-motion';

interface CardProps {
  card?: CardType;
  faceDown?: boolean;
  delay?: number;
}

export default function Card({ card, faceDown = false, delay = 0 }: CardProps) {
  const isRed = card ? getCardColor(card.suit) === 'red' : false;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -50, rotateY: 180 }}
      animate={{ opacity: 1, y: 0, rotateY: faceDown ? 180 : 0 }}
      transition={{ 
        duration: 0.5, 
        delay,
        type: 'spring',
        stiffness: 100
      }}
      className="relative w-20 h-28 sm:w-24 sm:h-32 md:w-28 md:h-40"
      style={{ perspective: '1000px' }}
    >
      <div 
        className={`
          absolute inset-0 rounded-sm
          ${faceDown ? 'neon-border-purple' : 'neon-border-blue'}
          bg-gradient-to-br from-card/90 to-card/70
          backdrop-blur-sm
          transition-all duration-300
          hover:scale-105
        `}
        style={{
          transformStyle: 'preserve-3d',
          transform: faceDown ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {faceDown ? (
          // Card back
          <div className="w-full h-full flex items-center justify-center p-2">
            <div className="w-full h-full border-2 border-accent/30 rounded-sm relative overflow-hidden">
              <div className="absolute inset-0 hex-grid-bg opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-accent rotate-45 neon-glow-purple" />
              </div>
            </div>
          </div>
        ) : (
          // Card front
          <div className="w-full h-full flex flex-col items-center justify-between p-2 sm:p-3">
            <div className={`text-2xl sm:text-3xl md:text-4xl font-bold font-number ${isRed ? 'neon-text-pink' : 'text-foreground'}`}>
              {card?.rank}
            </div>
            <div className={`text-3xl sm:text-4xl md:text-5xl ${isRed ? 'neon-text-pink' : 'neon-text-blue'}`}>
              {card?.suit}
            </div>
            <div className={`text-2xl sm:text-3xl md:text-4xl font-bold font-number ${isRed ? 'neon-text-pink' : 'text-foreground'}`}>
              {card?.rank}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
