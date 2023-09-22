import { ClientGameState } from "@/bindings/ClientGameState";
import { Circle } from "@react-three/drei";

import Ground from "../Ground";
import PlayerMat from "../PlayerMat";

function computePlayerPosition(radius: number, total: number, index: number) {
  const ratio = index / total;
  return {
    x: Math.cos(Math.PI * 2 * ratio) * radius,
    z: Math.sin(Math.PI * 2 * ratio) * radius,
    angle: -Math.PI * 2 * ratio,
  };
}

interface Props {
  state: ClientGameState;
}

const Game = ({ state }: Props) => {
  const radius = 0.5;
  return (
    <mesh receiveShadow castShadow>
      <Ground position={[0, 0, 0]} receiveShadow castShadow />;
      {state.players.map((player, index) => {
        const { x, z, angle } = computePlayerPosition(
          radius,
          state.players.length,
          index
        );
        return (
          <PlayerMat
            key={index}
            position={[x, 0, z]}
            rotation={[0, angle, 0]}
          />
        );
      })}
    </mesh>
  );
};

export default Game;
