import { useControls } from "leva";
import { useState } from "react";

import { ClientGameState } from "@/bindings/ClientGameState";

const useMockedState = () => {
  const [state, setState] = useState<ClientGameState>({
    active_player: 0,
    own_skull: "InHand",
    phase: "Preparation",
    players: [
      {
        id: 0,
        hand: 4,
        placed_cards: 0,
        wins: 0,
        bid: null,
        pass: null,
        revealed: null,
      },
      {
        id: 1,
        hand: 4,
        placed_cards: 0,
        wins: 0,
        bid: null,
        pass: null,
        revealed: null,
      },
      {
        id: 2,
        hand: 4,
        placed_cards: 0,
        wins: 0,
        bid: null,
        pass: null,
        revealed: null,
      },
    ],
  });

  // const state = useControls({ name: "World", aNumber: 0 });

  return state;
};

export default useMockedState;
