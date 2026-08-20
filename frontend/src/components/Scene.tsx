import { Canvas } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { Suspense } from 'react';
import { Model3D } from './Model3D';

export interface PlacedItem {
  id: string;
  position: [number, number, number];
  modelUrl: string;
}

interface SceneProps {
  width: number;
  length: number;
  items: PlacedItem[];
  onGroundClick: (position: [number, number, number]) => void;
}

export const Scene = ({ width, length, items, onGroundClick }: SceneProps) => {
  const handleGroundClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();

    const { x, z } = event.point;
    onGroundClick([x, 0.75, z]);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        {/* Источники света */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {/* Управление камерой мышкой (вращение, зум) */}
        <OrbitControls makeDefault />

        {/* Сетка участка */}
        <Grid args={[width, length]} sectionSize={1} cellSize={0.5} />

        {/* Земля/Плитка участка */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.01, 0]}
          onClick={handleGroundClick}
        >
          <planeGeometry args={[width, length]} />
          <meshStandardMaterial color="#4a4a4a" />
        </mesh>

        <Suspense fallback={null}>
          {items.map((item) => (
            <Model3D
              key={item.id}
              url={item.modelUrl}
              position={item.position}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};
