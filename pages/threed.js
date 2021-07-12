import { Suspense, useEffect, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  Html,
  useProgress,
  Environment,
  OrbitControls,
  ContactShadows,
  Plane,
  PerspectiveCamera,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
// import glb from "../public/models/glb/astronaut.glb";
// import draco from "./models/glb/scene5_draco.glb";

import gsap from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Model = () => {
  const gltf = useLoader(GLTFLoader, "./models/DamagedHelmet.gltf");
  // const gltf = useLoader(GLTFLoader, "./models/scene.gltf");
  // const gltf = useLoader(GLTFLoader, "./models/glb/astronaut.glb");
  // const gltf = useLoader(GLTFLoader, "./models/glb/bb.glb");
  // const gltf = useLoader(GLTFLoader, "./models/glb/cv.glb");
  // const gltf = useLoader(GLTFLoader, "./models/glb/mmw.glb");
  // const gltf = useLoader(GLTFLoader, "./models/glb/om.glb");
  // const gltf = useLoader(GLTFLoader, "./models/glb/car.glb");

  // const gltf = useLoader(
  //   GLTFLoader,
  // "https://fullstackbootstrap.s3.us-east-2.amazonaws.com/car.glb"
  // "https://fullstackbootstrap.s3.us-east-2.amazonaws.com/bb.glb"
  // "https://fullstackbootstrap.s3.us-east-2.amazonaws.com/cv.glb"
  // "https://fullstackbootstrap.s3.us-east-2.amazonaws.com/mmw.glb"
  // "https://fullstackbootstrap.s3.us-east-2.amazonaws.com/om.glb"
  // );

  // const gltf = useLoader(DRACOLoader, "./models/glb/scene5_draco.glb");

  //!!  scroll
  gltf.scene.rotation.y = -20;
  gltf.scene.position.y = 1.3;

  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      console.log(child);
      // object.scale.set(0.5, 0.5, 0.5);
    }
  });

  gsap.to(gltf.scene.rotation, {
    scrollTrigger: {
      // trigger: "#trigger",
      start: "top top",
      end: "bottom top",
      scrub: true,
      toggleActions: "restart pause resume pause",
    },
    y: Math.PI,
  });

  return <primitive castShadow receiveShadow object={gltf.scene} scale={1.5} />;
};

function Loader() {
  const { progress } = useProgress();
  return <Html center>{Math.ceil(progress)} % loaded</Html>;
}

export default function threeD() {
  const myCamera = useRef();

  return (
    <div>
      <div style={{ height: "100vh" }}>Hello</div>
      <Canvas shadowMap camera={{ position: [-3, 2, 3], fov: 90 }}>
        <Suspense fallback={<Loader />}>
          {/* <PerspectiveCamera ref={myCamera} position={[0,-1, 0]}> */}
          {/* </PerspectiveCamera> */}
          {/* <Environment preset="night" background /> */}

          <ambientLight intensity={0} />

          <directionalLight
            intensity={0.5}
            castShadow={true}
            shadow-mapSize-height={1024}
            shadow-mapSize-width={1024}
          />
          <fog attach="fog" args={["white", 0, 40]} />

          <group>
            <Model />
            <Plane
              args={[1000, 1000]}
              rotation={[-Math.PI / 2, 0, 0]}
              receiveShadow
              castShadow
            >
              <meshPhongMaterial attach="material" color="grey" />
            </Plane>
            <shadowMaterial transparent opacity={0.2} />
          </group>
          <OrbitControls
            // camera={myCamera.current}
            // autoRotate
            enablePan={false}
            enableZoom={false}
            enableDamping
            dampingFactor={0.02}
          />
        </Suspense>
      </Canvas>
      <div style={{ height: "100vh" }}>Hello</div>
      <div style={{ height: "100vh" }}>Hello</div>
    </div>
  );
}
