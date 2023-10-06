import { create } from "zustand";

type CardType = "rose" | "skull";
type CardState = "in_hand" | "placed" | "revealed";

interface Card {
  type: CardType | "unknown";
  state: CardState;
  place: () => void;
  discard: () => void;
  reveal: () => "rose" | "skull";
}

interface Player {
  cards: Card[];
}

interface GameState {
  players: Player[];
  activePlayer: number | "all";
  setActivePlayer: (activePlayer: number | "all") => void;
}

const useGameStore = create<GameState>()((set) => ({
  players: [],
  activePlayer: "all",
  setActivePlayer: (activePlayer: number | "all") => set({ activePlayer }),
}));

export default useGameStore;
