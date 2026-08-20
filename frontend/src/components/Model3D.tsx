import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';

export interface Model3DProps {
  url: string;
  position: [number, number, number];
}

/** Loads a GLTF/GLB asset and creates an independent scene instance for it. */
export function Model3D({ url, position }: Model3DProps) {
  const { scene } = useGLTF(url);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  return <primitive object={clonedScene} position={position} />;
}
