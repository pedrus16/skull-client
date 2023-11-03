import { Suspense } from "react";

import { OrbitControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";

import useMockedState from "./debug/useMockedState";
import Game from "./game/components/Game";
import Menu from "./lobby/components/Menu";

function App() {
  const state = useMockedState();

  return (
    <>
      <div className="fixed inset-0">
        <Canvas shadows>
          <Suspense>
            <Physics
              gravity={[0, -1, 0]}
              interpolate={false}
              colliders={false}
              debug
            >
              <OrbitControls
                makeDefault
                maxDistance={2}
                maxPolarAngle={(Math.PI / 2) * 0.8}
              />
              {/* <fog attach="fog" args={["#ebf0f2", 0, 5]} /> */}
              <Sky
                distance={450000}
                sunPosition={[0, 1, 0]}
                inclination={0}
                azimuth={0.25}
              />
              <ambientLight intensity={0.5} />
              <directionalLight
                intensity={1.5}
                position={[0, 1, 0]}
                castShadow
              />
              <Game state={state} />
            </Physics>
          </Suspense>
        </Canvas>
        <div className="fixed top-2 left-2 bg-white/20 rounded overflow-y-auto max-h-[calc(100%-1rem)] p-2">
          <pre className="text-xs max-w-xs">
            {JSON.stringify(state, null, 2)}
          </pre>
        </div>
      </div>
      {/* <Menu /> */}
    </>
  );
}

export default App;
