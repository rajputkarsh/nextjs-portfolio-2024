import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";

export default function App() {
  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
}
