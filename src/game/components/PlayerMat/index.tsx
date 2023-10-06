import { RefObject, useEffect, useRef, useState } from "react";
import { Euler as EulerThree, Group, Vector3 as Vector3Three } from "three";

import { Box, Cylinder } from "@react-three/drei";
import { Euler, GroupProps, Vector3 } from "@react-three/fiber";

const Card = (props: GroupProps) => {
  return (
    <group {...props}>
      <Cylinder
        args={[0.04, 0.04, 0.003]}
        position={[0, 0.0015, 0]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial color="brown" />
      </Cylinder>
    </group>
  );
};

const useTransforms = (): [
  RefObject<Group>,
  { transforms: { position: Vector3; rotation: Euler }[] }
] => {
  const handRef = useRef<Group>(null);
  const [transforms, setTransforms] = useState<
    { position: Vector3; rotation: Euler }[]
  >([]);

  useEffect(() => {
    if (!handRef.current) return;

    console.log(handRef.current.children);

    setTransforms(
      handRef.current.children.map(({ position, rotation }) => ({
        position: new Vector3Three().addVectors(
          handRef.current!.position,
          position
        ),
        rotation,
      }))
    );
  }, [handRef]);

  return [handRef, { transforms }];
};

const PlayerMat = (props: GroupProps) => {
  const cardsRef = useRef<Group>(null);
  const [handRef, { transforms: handTransforms }] = useTransforms();
  const [pileRef, { transforms: pileTransforms }] = useTransforms();

  return (
    <group {...props}>
      <Box
        args={[0.1, 0.003, 0.1]}
        position={[0, 0.0015, 0]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial color="brown" />
      </Box>

      <group ref={handRef} position={[0.15, 0, 0]}>
        <object3D position={[0.025, 0, -0.075]} />
        <object3D position={[0, 0, -0.025]} rotation={[0.05, 0, 0]} />
        <object3D position={[0, 0, 0.025]} rotation={[0.05, 0, 0]} />
        <object3D position={[0.025, 0, 0.075]} rotation={[0.05, 0, 0]} />
      </group>

      <group ref={pileRef} position={[0, 0, 0]}>
        <object3D position={[0, 0.003, 0]} />
        <object3D position={[0, 0.006, 0]} />
        <object3D position={[0, 0.009, 0]} />
        <object3D position={[0, 0.012, 0]} />
      </group>

      <group ref={cardsRef}>
        <Card {...handTransforms[0]} />
        <Card {...handTransforms[1]} />
        <Card {...handTransforms[2]} />
        <Card {...handTransforms[3]} />
      </group>
    </group>
  );
};

export default PlayerMat;
