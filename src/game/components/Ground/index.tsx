import { GroupProps } from "@react-three/fiber";
import { HeightfieldCollider, RigidBody } from "@react-three/rapier";

const Ground = (props: GroupProps) => {
  return (
    <group {...props}>
      <RigidBody>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#9EDE73" />
        </mesh>
        <HeightfieldCollider
          args={[1, 1, [0, 0, 0, 0], { x: 20, y: 1, z: 20 }]}
        />
      </RigidBody>
    </group>
  );
};

export default Ground;
