// GameControls Component
// Design: Cyberpunk Neon Casino - Electric pulse buttons with glow effects

import { Button } from '@/components/ui/button';
import { GameResult, GameState } from '@/lib/blackjack';
import { motion } from 'framer-motion';

interface GameControlsProps {
  gameState: GameState;
  gameResult: GameResult;
  onHit: () => void;
  onStand: () => void;
  onNewRound: () => void;
  wins: number;
  losses: number;
  pushes: number;
}

export default function GameControls({
  gameState,
  gameResult,
  onHit,
  onStand,
  onNewRound,
  wins,
  losses,
  pushes,
}: GameControlsProps) {
  const getResultMessage = () => {
    switch (gameResult) {
      case 'win':
        return 'YOU WIN!';
      case 'lose':
        return 'YOU LOSE';
      case 'push':
        return 'PUSH';
      default:
        return '';
    }
  };

  const getResultColor = () => {
    switch (gameResult) {
      case 'win':
        return 'neon-text-blue';
      case 'lose':
        return 'neon-text-pink';
      case 'push':
        return 'text-muted-foreground';
      default:
        return '';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Result Display */}
      {gameResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-block px-8 py-4 neon-border-blue bg-card/50 backdrop-blur-md">
            <h2 className={`text-4xl sm:text-5xl md:text-6xl font-display ${getResultColor()}`}>
              {getResultMessage()}
            </h2>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 sm:gap-6 mb-8 flex-wrap">
        {gameState === 'playerTurn' && (
          <>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onHit}
                size="lg"
                className="
                  px-8 py-6 text-xl sm:text-2xl font-display
                  neon-border-blue bg-primary/20 hover:bg-primary/30
                  neon-text-blue
                  transition-all duration-300
                  animate-pulse-glow
                "
              >
                HIT
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onStand}
                size="lg"
                className="
                  px-8 py-6 text-xl sm:text-2xl font-display
                  neon-border-pink bg-secondary/20 hover:bg-secondary/30
                  neon-text-pink
                  transition-all duration-300
                "
              >
                STAND
              </Button>
            </motion.div>
          </>
        )}

        {gameState === 'result' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={onNewRound}
              size="lg"
              className="
                px-8 py-6 text-xl sm:text-2xl font-display
                neon-border-purple bg-accent/20 hover:bg-accent/30
                text-foreground
                transition-all duration-300
                neon-glow-purple
              "
            >
              NEW ROUND
            </Button>
          </motion.div>
        )}
      </div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center gap-4 sm:gap-8 text-center flex-wrap"
      >
        <div className="px-4 py-2 neon-border-blue bg-card/30 backdrop-blur-sm">
          <div className="text-xs sm:text-sm text-muted-foreground mb-1">WINS</div>
          <div className="text-2xl sm:text-3xl font-number neon-text-blue">{wins}</div>
        </div>
        
        <div className="px-4 py-2 neon-border-pink bg-card/30 backdrop-blur-sm">
          <div className="text-xs sm:text-sm text-muted-foreground mb-1">LOSSES</div>
          <div className="text-2xl sm:text-3xl font-number neon-text-pink">{losses}</div>
        </div>
        
        <div className="px-4 py-2 border-2 border-muted bg-card/30 backdrop-blur-sm">
          <div className="text-xs sm:text-sm text-muted-foreground mb-1">PUSHES</div>
          <div className="text-2xl sm:text-3xl font-number text-muted-foreground">{pushes}</div>
        </div>
        
        <div className="px-4 py-2 neon-border-purple bg-card/30 backdrop-blur-sm">
          <div className="text-xs sm:text-sm text-muted-foreground mb-1">WIN RATE</div>
          <div className="text-2xl sm:text-3xl font-number text-accent">
            {wins + losses > 0 ? Math.round((wins / (wins + losses)) * 100) : 0}%
          </div>
        </div>
      </motion.div>

      {/* Game State Indicator */}
      {gameState === 'dealing' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8"
        >
          <p className="text-lg sm:text-xl text-muted-foreground">Dealing cards...</p>
        </motion.div>
      )}
      
      {gameState === 'dealerTurn' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8"
        >
          <p className="text-lg sm:text-xl neon-text-pink">Dealer's turn...</p>
        </motion.div>
      )}
    </div>
  );
}
