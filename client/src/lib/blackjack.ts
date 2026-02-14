// Blackjack Game Logic
// Design: Cyberpunk Neon Casino - Core game mechanics

export type Suit = '♠' | '♥' | '♦' | '♣';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Card {
  suit: Suit;
  rank: Rank;
  id: string;
}

export interface Hand {
  cards: Card[];
  score: number;
  isBust: boolean;
  isBlackjack: boolean;
}

export type GameState = 'betting' | 'dealing' | 'playerTurn' | 'dealerTurn' | 'result';
export type GameResult = 'win' | 'lose' | 'push' | null;

const SUITS: Suit[] = ['♠', '♥', '♦', '♣'];
const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Create a standard 52-card deck
export function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({
        suit,
        rank,
        id: `${suit}${rank}-${Math.random().toString(36).substr(2, 9)}`,
      });
    }
  }
  return deck;
}

// Shuffle deck using Fisher-Yates algorithm
export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Calculate hand value
// Ace is 11 if it doesn't cause bust, otherwise 1
export function calculateHandValue(cards: Card[]): number {
  let sum = 0;
  let aces = 0;

  for (const card of cards) {
    if (card.rank === 'A') {
      aces += 1;
      sum += 11;
    } else if (['J', 'Q', 'K'].includes(card.rank)) {
      sum += 10;
    } else {
      sum += parseInt(card.rank);
    }
  }

  // Adjust for aces
  while (sum > 21 && aces > 0) {
    sum -= 10;
    aces -= 1;
  }

  return sum;
}

// Evaluate hand
export function evaluateHand(cards: Card[]): Hand {
  const score = calculateHandValue(cards);
  const isBust = score > 21;
  const isBlackjack = cards.length === 2 && score === 21;

  return {
    cards,
    score,
    isBust,
    isBlackjack,
  };
}

// Determine game result
export function determineWinner(playerHand: Hand, dealerHand: Hand): GameResult {
  // Player bust
  if (playerHand.isBust) {
    return 'lose';
  }

  // Dealer bust
  if (dealerHand.isBust) {
    return 'win';
  }

  // Both have blackjack
  if (playerHand.isBlackjack && dealerHand.isBlackjack) {
    return 'push';
  }

  // Player blackjack
  if (playerHand.isBlackjack) {
    return 'win';
  }

  // Dealer blackjack
  if (dealerHand.isBlackjack) {
    return 'lose';
  }

  // Compare scores
  if (playerHand.score > dealerHand.score) {
    return 'win';
  } else if (playerHand.score < dealerHand.score) {
    return 'lose';
  } else {
    return 'push';
  }
}

// Dealer should hit on 16 or less, stand on 17 or more (S17 rule)
export function shouldDealerHit(hand: Hand): boolean {
  return hand.score < 17;
}

// Get card display value for UI
export function getCardDisplayValue(rank: Rank): string {
  return rank;
}

// Get card color based on suit
export function getCardColor(suit: Suit): 'red' | 'black' {
  return suit === '♥' || suit === '♦' ? 'red' : 'black';
}
