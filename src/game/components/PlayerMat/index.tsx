import { Box, Cylinder, TransformControls } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

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
      <group position={[0.15, 0, 0]}>
        <Card position={[0.025, 0, -0.075]} />
        <Card position={[0, 0, -0.025]} rotation={[0.05, 0, 0]} />
        <Card position={[0, 0, 0.025]} rotation={[0.05, 0, 0]} />
        <Card position={[0.025, 0, 0.075]} rotation={[0.05, 0, 0]} />
      </group>
    </group>
  );
};

export default PlayerMat;
