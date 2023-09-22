import { OrbitControls, Sky, SoftShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import useMockedState from "./debug/useMockedState";
import Game from "./game/components/Game";
import Menu from "./lobby/components/Menu";

function App() {
  const state = useMockedState();

  return (
    <>
      <div className="fixed inset-0">
        <Canvas shadows>
          <SoftShadows />
          <OrbitControls
            makeDefault
            maxDistance={1}
            maxPolarAngle={(Math.PI / 2) * 0.8}
          />
          <fog attach="fog" args={["#ebf0f2", 0, 5]} />
          <Sky
            distance={450000}
            sunPosition={[0, 1, 0]}
            inclination={0}
            azimuth={0.25}
          />
          <ambientLight />
          <pointLight position={[0, 1, 0]} castShadow />
          <Game state={state} />
        </Canvas>
      </div>
      {/* <Menu /> */}
    </>
  );
}

export default App;
