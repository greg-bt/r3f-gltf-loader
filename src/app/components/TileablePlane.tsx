import { MeshProps, useLoader } from "@react-three/fiber";
import * as THREE from "three";

interface TileablePlaneProps extends MeshProps {
    src: string;
    repeat: [number, number];
}

const TileablePlane = (  { src, repeat, ...props } : TileablePlaneProps ) => {

    const colorMap = useLoader(THREE.TextureLoader, src)
    colorMap.wrapS = THREE.RepeatWrapping;
    colorMap.wrapT = THREE.RepeatWrapping;
    colorMap.repeat.set(repeat[0], repeat[1]);

    return (
            <mesh receiveShadow  {...props}>
                <planeGeometry />
                <meshStandardMaterial map={colorMap} roughness={1} metalness={0} />
            </mesh>
    );
}

export const TileableFloor = ( props : TileablePlaneProps ) => <TileablePlane {...props} rotation={[-Math.PI / 2, 0, 0]} />
export const TileableRoof = ( props : TileablePlaneProps ) => <TileablePlane {...props} rotation={[Math.PI / 2, 0, 0]} />