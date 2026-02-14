// GameTable Component
// Design: Cyberpunk Neon Casino - Main game area with asymmetric diagonal layout

import { Hand } from '@/lib/blackjack';
import Card from './Card';
import { motion } from 'framer-motion';

interface GameTableProps {
  dealerHand: Hand;
  playerHand: Hand;
  dealerRevealed: boolean;
  gameState: string;
}

export default function GameTable({ dealerHand, playerHand, dealerRevealed, gameState }: GameTableProps) {
  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      {/* Dealer Area */}
      <div className="mb-12 sm:mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-4"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display neon-text-pink mb-2">
            DEALER
          </h2>
          {dealerRevealed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-block px-4 py-2 neon-border-pink bg-card/50 backdrop-blur-sm"
            >
              <span className="text-2xl sm:text-3xl md:text-4xl font-number neon-text-pink">
                {dealerHand.score}
              </span>
            </motion.div>
          )}
        </motion.div>
        
        <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
          {dealerHand.cards.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              faceDown={!dealerRevealed && index === 1}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>

      {/* Diagonal separator line */}
      <div className="relative h-1 my-8 sm:my-12 md:my-16 overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent neon-glow-blue"
          style={{ 
            transform: 'skewY(-2deg)',
            transformOrigin: 'left'
          }}
        />
      </div>

      {/* Player Area */}
      <div className="mt-12 sm:mt-16 md:mt-20">
        <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap mb-4">
          {playerHand.cards.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              delay={index * 0.2 + 0.4}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
            className="inline-block px-4 py-2 neon-border-blue bg-card/50 backdrop-blur-sm mb-2"
          >
            <span className="text-2xl sm:text-3xl md:text-4xl font-number neon-text-blue">
              {playerHand.score}
            </span>
          </motion.div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display text-foreground">
            PLAYER
          </h2>
        </motion.div>
      </div>

      {/* Status messages */}
      {playerHand.isBust && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        >
          <div className="px-8 py-4 neon-border-pink bg-destructive/20 backdrop-blur-md">
            <p className="text-3xl sm:text-4xl md:text-5xl font-display neon-text-pink">
              BUST!
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
