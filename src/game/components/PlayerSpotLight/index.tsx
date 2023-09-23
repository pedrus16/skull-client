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
  const [{ pos }] = useSpring(() => {
    const { x, z } = computePlayerMatPosition(
      radius,
      playerCount,
      activePlayer
    );

    return { pos: [x, 0, z], config: config.gentle };
  }, [playerCount, activePlayer]);

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
      <animated.mesh ref={target} position={pos} />
    </>
  );
};

export default PlayerSpotLight;
