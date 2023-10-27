import { produce } from "immer";
import { buttonGroup, folder, useControls } from "leva";
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

  useControls(
    "General",
    {
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
        max: state.players.length - 1,
        step: 1,
        onChange(value) {
          setState((prev) =>
            produce(prev, (draft) => {
              draft.active_player = value;
            })
          );
        },
      },
    },
    [state.players.length]
  );

  const playersControls = useMemo(() => {
    const controls: Record<string, unknown> = {};
    state.players.forEach((player, index) => {
      controls[`Player #${index + 1}`] = folder({
        [`#${index + 1} 1`]: buttonGroup({
          "Place Card": () => {
            setState((prev) =>
              produce(prev, (draft) => {
                draft.players[index].placed_cards += 1;
              })
            );
          },
          "Reveal Rose": () => {
            setState((prev) =>
              produce(prev, (draft) => {
                draft.players[index].revealed =
                  (draft.players[index].revealed || 0) + 1;
              })
            );
          },
          "Reveal Skull": () => {
            setState((prev) =>
              produce(prev, (draft) => {
                draft.players[index].revealed =
                  (draft.players[index].revealed || 0) + 1;
              })
            );
          },
        }),
        [`#${index + 1} 2`]: buttonGroup({
          Pass: () => {},
          Discard: () => {
            setState((prev) => {
              if (prev.players[index].hand === 0) return prev;

              return produce(prev, (draft) => {
                draft.players[index].hand -= 1;
              });
            });
          },
          Reset: () => {
            setState((prev) =>
              produce(prev, (draft) => {
                draft.players[index].placed_cards = 0;
              })
            );
          },
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
