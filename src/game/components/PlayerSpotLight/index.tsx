import { useRef } from "react";

import computePlayerMatPosition from "@/game/utils/computePlayerMatPosition";
import { animated, config, useSpring } from "@react-spring/three";
import { SpotLight } from "@react-three/drei";

interface Props {
  radius: number;
  playerCount: number;
  activePlayer: number;
}

const PlayerSpotLight = ({ radius, playerCount, activePlayer }: Props) => {
  const target = useRef<any>();
  /* TODO Fix transition from max index to 0 (it wrap around instead of reversing all the way back to 0) */
  const [{ angle }] = useSpring(
    () => ({ angle: activePlayer, config: config.slow }),
    [playerCount, activePlayer]
  );

  return (
    <>
      <SpotLight
        castShadow
        penumbra={0.2}
        radiusTop={0.1}
        radiusBottom={0.4}
        distance={4}
        angle={0.16}
        anglePower={10}
        attenuation={1}
        intensity={4}
        opacity={1}
        position={[0, 1, 0]}
        target={target.current}
      />
      <animated.group
        ref={target}
        position={angle.to((angle) => {
          const { x, z } = computePlayerMatPosition(radius, playerCount, angle);
          return [x, 0, z];
        })}
      />
    </>
  );
};

export default PlayerSpotLight;
