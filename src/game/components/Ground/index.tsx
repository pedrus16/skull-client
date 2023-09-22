import { MeshProps } from "@react-three/fiber";

const Ground = (props: MeshProps) => {
  return (
    <mesh {...props}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </mesh>
  );
};

export default Ground;
