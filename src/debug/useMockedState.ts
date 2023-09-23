import { useControls } from "leva";
import { useState } from "react";

import { ClientGameState } from "@/bindings/ClientGameState";

function buildPlayers(count: number) {
  return [...Array(count).keys()].map((index) => ({
    id: index,
    hand: 4,
    placed_cards: 0,
    wins: 0,
    bid: null,
    pass: null,
    revealed: null,
  }));
}

const useMockedState = () => {
  const [state, setState] = useState<ClientGameState>({
    active_player: 0,
    own_skull: "InHand",
    phase: "Preparation",
    players: buildPlayers(3),
  });

  useControls({
    Players: {
      value: 4,
      min: 3,
      max: 12,
      step: 1,
      onChange(value) {
        setState({
          active_player: 0,
          own_skull: "InHand",
          phase: "Preparation",
          players: buildPlayers(value),
        });
      },
    },
    "Active Player": {
      value: 0,
      min: 0,
      max: 12,
      step: 1,
      onChange(value) {
        setState((prev) => ({
          ...prev,
          active_player: value,
        }));
      },
    },
  });

  return state;
};

export default useMockedState;
