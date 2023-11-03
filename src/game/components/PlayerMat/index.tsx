import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import {
  CubicBezierCurve3,
  Euler,
  Group,
  MathUtils,
  Object3D,
  Object3DEventMap,
  Vector3,
} from "three";

import { animated, easings, useSprings } from "@react-spring/three";
import { Box, Cylinder } from "@react-three/drei";
import { GroupProps, Vector3 as FiberVector3 } from "@react-three/fiber";
import { CylinderCollider } from "@react-three/rapier";

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
      <CylinderCollider args={[0.0015, 0.04]} />
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

    setTransforms(
      handRef.current.children.map(({ position, rotation }) => ({
        position: new Vector3().addVectors(handRef.current!.position, position),
        rotation,
      }))
    );
  }, [handRef]);

  return [handRef, { transforms }];
};

const PlayerMat = (
  props: {
    revealPosition: FiberVector3;
    placedCards: number;
    revealedCards: number;
  } & GroupProps
) => {
  const rootRef = useRef<Group<Object3DEventMap>>(null);
  const cardsRef = useRef<Group>(null);
  const [handRef, { transforms: handTransforms }] = useTransforms();
  const [pileRef, { transforms: pileTransforms }] = useTransforms();

  const curves = useMemo(() => {
    return handTransforms.map(({ position }, index) => {
      const start = position.clone();
      const end = pileTransforms[index].position.clone();
      return new CubicBezierCurve3(
        start,
        new Vector3(0, 0.05, 0).add(start),
        new Vector3(0, 0.05, 0).add(end),
        end
      );
    });
  }, [handTransforms, pileTransforms]);

  const centerRef = useRef<Object3D>(null);
  const revealCurve = useMemo(() => {
    const start = new Vector3();
    const end = rootRef.current?.worldToLocal(new Vector3()) || new Vector3();

    return new CubicBezierCurve3(
      start,
      new Vector3(0, 0.05, 0).add(start),
      new Vector3(0, 0.05, 0).add(end),
      end
    );
  }, [props.revealPosition]);

  const [springs] = useSprings(
    4,
    (index) => ({
      t:
        3 - index < props.revealedCards ? 2 : index < props.placedCards ? 1 : 0,
      config: { easing: easings.easeOutCubic, duration: 600 },
    }),
    [props.placedCards, props.revealedCards, handTransforms, pileTransforms]
  );

  return (
    <group ref={rootRef} {...props}>
      <Box
        args={[0.1, 0.003, 0.1]}
        position={[0, 0.0015, 0]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial color="red" />
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

      <object3D ref={centerRef} position={[3, 0, 0]} />

      <group ref={cardsRef}>
        {springs.map((spring, index) => {
          const from = handTransforms[index]?.rotation || new Euler();
          const to = pileTransforms[index]?.rotation || new Euler();

          return (
            <animated.mesh
              key={index}
              position={spring.t.to((t) => {
                if (t <= 1) {
                  return curves[index]?.getPoint(t).toArray();
                }

                return revealCurve.getPoint(t - 1).toArray();
              })}
              rotation-x={spring.t.to((t) => MathUtils.lerp(from.x, to.x, t))}
              rotation-y={spring.t.to((t) => MathUtils.lerp(from.y, to.y, t))}
              rotation-z={spring.t.to((t) => MathUtils.lerp(from.z, to.z, t))}
            >
              <Card />
            </animated.mesh>
          );
        })}
      </group>
    </group>
  );
};

export default PlayerMat;
