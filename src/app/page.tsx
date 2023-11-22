'use client';
import { VRButton, ARButton, XR, Controllers, Hands } from '@react-three/xr'
import { Canvas, MeshProps, useLoader } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TileableFloor, TileableRoof } from './components/TileablePlane';

interface ModelProps extends MeshProps {
  src: string
}

function Model({ src, castShadow, receiveShadow, ...props } : ModelProps) {

  const gltf : any = useLoader(GLTFLoader, src);

  // Traverse model's meshes to set shadow casting
  gltf.scene.traverse( ( node : any ) => {
      if ( node.isMesh ) {
        node.castShadow = castShadow;
        node.receiveShadow = receiveShadow;
      }
  })

  return <primitive object={gltf.scene} {...props} />

}


export default function Home() {
  return <>
    <VRButton />
      <Canvas shadows>
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

          <Model src="./Monitor.gltf" scale={[2,2,2]} position={[0,0.5,0]} castShadow receiveShadow/>

          <TileableRoof src='./RoofTile.jpg' position={[0,2.4,0]} repeat={[4,4]} scale={4} castShadow/>
          <TileableFloor src='./OfficeFloor.jpg' repeat={[3,3]} scale={4} receiveShadow />

        </XR>
      </Canvas>
  </>
}
