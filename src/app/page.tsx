'use client';
import { VRButton, XR, Controllers, Hands } from '@react-three/xr'
import { Canvas, MeshProps, useLoader } from '@react-three/fiber'
import { Environment, OrbitControls, TransformControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TileableFloor, TileableRoof } from './components/TileablePlane';
import { useState } from 'react';

interface ModelProps extends MeshProps {
  src: string
}

// Load GLTF Model
const Model = ({ src, castShadow, receiveShadow, ...props } : ModelProps) => {

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

  const [selected, setSelected] = useState(null);
  const [ mode, setMode ] = useState('translate');

  document.addEventListener("keypress", (e) => {
      switch ( e.key ) {
          case "r": setMode("rotate"); break;
          case "t": setMode("translate"); break;
          case "s": setMode("scale"); break;
      }
  })

  return <>
    <VRButton />
    <Canvas shadows onPointerMissed={() => setSelected(null)}>
      <XR>

        {/* Toggleable Transform Controls */ /* @ts-ignore */}
        { (selected != null) && <TransformControls translationSnap={0.1} scaleSnap={0.1} rotationSnap={0.1} mode={mode} onMouseUp={e => detailObject(e?.target.object)} object={selected} /> }

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

        {/* @ts-ignore */}
        <Model onClick={e => setSelected(e.eventObject)} src="./Monitor.gltf" scale={[2,2,2]} position={[0,0.5,0]} castShadow receiveShadow/>

        <TileableRoof src='./RoofTile.jpg' position={[0,2.4,0]} repeat={[4,4]} scale={4} castShadow/>
        <TileableFloor src='./OfficeFloor.jpg' repeat={[3,3]} scale={4} receiveShadow />

      </XR>
    </Canvas>
  </>
}

// Log the position, rotation, and scale of an object
function detailObject( {position, rotation, scale} : any ) {
  console.log(
`Transformation:
position={[${position.x.toFixed(1)}, ${position.y.toFixed(1)}, ${position.z.toFixed(1)}]}
rotation={[${rotation._x.toFixed(1)}, ${rotation._y.toFixed(1)}, ${rotation._z.toFixed(1)}]}
scale={[${scale.x.toFixed(1)}, ${scale.y.toFixed(1)}, ${scale.z.toFixed(1)}]}`);
}