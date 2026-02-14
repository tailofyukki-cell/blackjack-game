// Home Page - Blackjack Game
// Design: Cyberpunk Neon Casino - Main game interface with state management

import { useState, useEffect } from 'react';
import {
  createDeck,
  shuffleDeck,
  evaluateHand,
  determineWinner,
  shouldDealerHit,
  Card as CardType,
  Hand,
  GameState,
  GameResult,
} from '@/lib/blackjack';
import GameTable from '@/components/GameTable';
import GameControls from '@/components/GameControls';
import { motion } from 'framer-motion';

export default function Home() {
  const [deck, setDeck] = useState<CardType[]>([]);
  const [playerHand, setPlayerHand] = useState<Hand>({ cards: [], score: 0, isBust: false, isBlackjack: false });
  const [dealerHand, setDealerHand] = useState<Hand>({ cards: [], score: 0, isBust: false, isBlackjack: false });
  const [gameState, setGameState] = useState<GameState>('betting');
  const [gameResult, setGameResult] = useState<GameResult>(null);
  const [dealerRevealed, setDealerRevealed] = useState(false);
  
  // Statistics
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [pushes, setPushes] = useState(0);

  // Initialize deck
  useEffect(() => {
    const newDeck = shuffleDeck(createDeck());
    setDeck(newDeck);
  }, []);

  // Start new round
  const startNewRound = () => {
    let currentDeck = [...deck];
    
    // Reshuffle if deck is low
    if (currentDeck.length < 15) {
      currentDeck = shuffleDeck(createDeck());
    }

    // Deal initial cards
    const playerCards = [currentDeck.pop()!, currentDeck.pop()!];
    const dealerCards = [currentDeck.pop()!, currentDeck.pop()!];

    setDeck(currentDeck);
    setPlayerHand(evaluateHand(playerCards));
    setDealerHand(evaluateHand(dealerCards));
    setGameState('dealing');
    setGameResult(null);
    setDealerRevealed(false);

    // Transition to player turn after dealing animation
    setTimeout(() => {
      const pHand = evaluateHand(playerCards);
      const dHand = evaluateHand(dealerCards);
      
      // Check for immediate blackjacks
      if (pHand.isBlackjack || dHand.isBlackjack) {
        setDealerRevealed(true);
        const result = determineWinner(pHand, dHand);
        setGameResult(result);
        setGameState('result');
        updateStats(result);
      } else {
        setGameState('playerTurn');
      }
    }, 1500);
  };

  // Player hits
  const handleHit = () => {
    const currentDeck = [...deck];
    const newCard = currentDeck.pop()!;
    const newPlayerCards = [...playerHand.cards, newCard];
    const newPlayerHand = evaluateHand(newPlayerCards);

    setDeck(currentDeck);
    setPlayerHand(newPlayerHand);

    // Check for bust
    if (newPlayerHand.isBust) {
      setTimeout(() => {
        setDealerRevealed(true);
        setGameResult('lose');
        setGameState('result');
        updateStats('lose');
      }, 500);
    }
  };

  // Player stands
  const handleStand = () => {
    setGameState('dealerTurn');
    setDealerRevealed(true);
    
    // Dealer draws cards
    let currentDeck = [...deck];
    let currentDealerHand = { ...dealerHand };
    
    const dealerDrawInterval = setInterval(() => {
      if (shouldDealerHit(currentDealerHand)) {
        const newCard = currentDeck.pop()!;
        const newDealerCards = [...currentDealerHand.cards, newCard];
        currentDealerHand = evaluateHand(newDealerCards);
        setDealerHand(currentDealerHand);
        setDeck([...currentDeck]);
      } else {
        clearInterval(dealerDrawInterval);
        
        // Determine winner
        const result = determineWinner(playerHand, currentDealerHand);
        setGameResult(result);
        setGameState('result');
        updateStats(result);
      }
    }, 1000);
  };

  // Update statistics
  const updateStats = (result: GameResult) => {
    if (result === 'win') {
      setWins(w => w + 1);
    } else if (result === 'lose') {
      setLosses(l => l + 1);
    } else if (result === 'push') {
      setPushes(p => p + 1);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hexagon grid background */}
      <div className="fixed inset-0 hex-grid-bg pointer-events-none" />
      
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-6 sm:py-8 text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display neon-text-blue mb-2">
            BLACKJACK
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-medium tracking-wider">
            CYBERPUNK CASINO • 21
          </p>
        </motion.header>

        {/* Main Game Area */}
        <main className="flex-1 flex flex-col justify-center py-8 sm:py-12">
          {gameState === 'betting' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display text-foreground mb-4">
                  READY TO PLAY?
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground mb-8">
                  Beat the dealer. Get as close to 21 as possible without going over.
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startNewRound}
                className="
                  px-12 py-6 text-2xl sm:text-3xl font-display
                  neon-border-blue bg-primary/20 hover:bg-primary/30
                  neon-text-blue
                  transition-all duration-300
                  animate-pulse-glow
                "
              >
                START GAME
              </motion.button>
              
              {/* Rules */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 max-w-2xl mx-auto px-4"
              >
                <div className="neon-border-purple bg-card/30 backdrop-blur-sm p-6">
                  <h3 className="text-lg sm:text-xl font-display text-accent mb-4">RULES</h3>
                  <ul className="text-sm sm:text-base text-muted-foreground space-y-2 text-left">
                    <li>• Dealer stands on 17 (S17 rule)</li>
                    <li>• Blackjack = Ace + 10-value card (21 with 2 cards)</li>
                    <li>• Ace counts as 1 or 11 (whichever is better)</li>
                    <li>• Face cards (J, Q, K) count as 10</li>
                    <li>• Bust = over 21 (automatic loss)</li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <>
              <GameTable
                dealerHand={dealerHand}
                playerHand={playerHand}
                dealerRevealed={dealerRevealed}
                gameState={gameState}
              />
              
              <div className="mt-8 sm:mt-12">
                <GameControls
                  gameState={gameState}
                  gameResult={gameResult}
                  onHit={handleHit}
                  onStand={handleStand}
                  onNewRound={startNewRound}
                  wins={wins}
                  losses={losses}
                  pushes={pushes}
                />
              </div>
            </>
          )}
        </main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="py-4 text-center text-xs sm:text-sm text-muted-foreground"
        >
          <p>Built with React • Tailwind • Framer Motion</p>
        </motion.footer>
      </div>
    </div>
  );
}
