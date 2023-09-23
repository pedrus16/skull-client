import { button, buttonGroup, folder, useControls } from "leva";
import { useMemo, useState } from "react";

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

  useControls("General", {
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

  const playersControls = useMemo(() => {
    const controls: Record<string, unknown> = {};
    state.players.forEach((player, index) => {
      controls[`Player #${index + 1}`] = folder({
        [`#${index + 1} 1`]: buttonGroup({
          "Place Card": () => {},
          "Reveal Rose": () => {},
          "Reveal Skull": () => {},
        }),
        [`#${index + 1} 2`]: buttonGroup({
          Pass: () => {},
          Discard: () => {},
          Reset: () => {},
        }),
        [`#${index + 1} Bid`]: {
          value: 0,
          min: 0,
          max: state.players.length * 4,
          step: 1,
        },
      });
    });

    return controls;
  }, [state.players]);

  useControls(
    "Players Controls",
    {
      ...playersControls,
    },
    [state.players]
  );

  return state;
};

export default useMockedState;
