'use client';
import { VRButton, ARButton, XR, Controllers, Hands } from '@react-three/xr'
import { Canvas, MeshProps, useLoader } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ModelProps extends MeshProps {
  url: string
}

function Model({ url, ...props } : ModelProps) {
  const gltf : any = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} {...props} />
}


export default function Home() {
  return <>
    <VRButton />
      <Canvas>
        <XR>

          { /* Lighting */}
          <Environment background files={"./environment.hdr"} />
          <directionalLight
            position={[50,180,50]}
            color={0xFFFAd8}
            intensity={4.5}
            castShadow
            shadow-bias={-0.0001}
          />


          { /* Controls */}
          <OrbitControls makeDefault />
          <Controllers />
          <Hands />


          { /* Objects */}
          <gridHelper args={[100, 100]} />

          <Model url="./Monitor.gltf" scale={[2,2,2]} />
          

        </XR>
      </Canvas>
  </>
}
