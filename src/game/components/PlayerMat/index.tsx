import { Box, Cylinder } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";

const PlayerMat = (props: MeshProps) => {
  return (
    <mesh {...props} receiveShadow castShadow>
      <Box
        args={[0.1, 0.003, 0.1]}
        position={[0, 0.0015, 0]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial color="brown" />
      </Box>
      <Cylinder
        args={[0.04, 0.04, 0.003]}
        position={[0.1, 0.0015, 0]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial color="brown" />
      </Cylinder>
    </mesh>
  );
};

export default PlayerMat;
