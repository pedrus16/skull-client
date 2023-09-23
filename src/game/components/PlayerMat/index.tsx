import { Box, Cylinder } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

const PlayerMat = (props: GroupProps) => {
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
      <Cylinder
        args={[0.04, 0.04, 0.003]}
        position={[0.1, 0.0015, 0]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial color="brown" />
      </Cylinder>
    </group>
  );
};

export default PlayerMat;
