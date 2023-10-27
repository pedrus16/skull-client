import { GroupProps, MeshProps } from "@react-three/fiber";

const Ground = (props: GroupProps) => {
  return (
    <group {...props}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#9EDE73" />
      </mesh>
    </group>
  );
};

export default Ground;
