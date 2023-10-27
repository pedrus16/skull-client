import { ClientGameState } from "@/bindings/ClientGameState";
import computePlayerMatPosition from "@/game/utils/computePlayerMatPosition";

import Ground from "../Ground";
import PlayerMat from "../PlayerMat";
import PlayerSpotLight from "../PlayerSpotLight";

interface Props {
  state: ClientGameState;
}

const Game = ({ state }: Props) => {
  const radius = 0.5;

  return (
    <group>
      <Ground position={[0, 0, 0]} />
      {state.players.map((player, index) => {
        const { x, z, angle } = computePlayerMatPosition(
          radius,
          state.players.length,
          index
        );
        return (
          <PlayerMat
            key={index}
            position={[x, 0.0001, z]}
            rotation={[0, angle, 0]}
            placedCards={player.placed_cards}
            revealedCards={player.revealed || 0}
          />
        );
      })}
      <PlayerSpotLight
        radius={radius}
        playerCount={state.players.length}
        activePlayer={state.active_player}
      />
    </group>
  );
};

export default Game;
