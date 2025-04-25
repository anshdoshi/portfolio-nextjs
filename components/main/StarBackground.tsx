// "use client";

// import React, { useState, useRef, Suspense } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Points, PointMaterial, Preload } from "@react-three/drei";
// // @ts-ignore
// import * as random from "maath/random/dist/maath-random.esm";

// const StarBackground = (props: any) => {
//   const ref: any = useRef();
//   const [sphere] = useState(() =>
//     random.inSphere(new Float32Array(5000), { radius: 1.2 })
//   );

//   useFrame((state, delta) => {
//     ref.current.rotation.x -= delta/10;
//     ref.current.rotation.y -= delta/15;
//   })


//   return (
//     <group rotation={[0,0, Math.PI / 4]}>
//         <Points
//         ref={ref}
//         positions={sphere}
//         stride={3}
//         frustumCulled
//         {...props}
//         >
//             <PointMaterial
//                 transparent
//                 color="$fff"
//                 size={0.002}
//                 sizeAttenuation={true}
//                 dethWrite={false}
//             />
//         </Points>
//     </group>
//   )
// };

// const StarsCanvas = () => (
//     // <div className="w-full h-auto fixed inset-0 z-[20]">
//     //     <Canvas 
//     //     camera={{position: [0, 0, 1]}} 
//     //     >
//     //     <Suspense fallback={null}>
//     //         <StarBackground />
//     //     </Suspense>
//     //     </Canvas>
//     // </div>
//     <></>
// )

// export default StarsCanvas;

"use client";

import React, {
  useState,
  useRef,
  useEffect,
  Suspense,
  useState as useReactState,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

const StarBackground = (props: any) => {
  const ref: any = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  const [isMobile, setIsMobile] = useReactState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Call once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) return <></>; // No canvas on mobile

  return (
    <div
      className="w-full h-auto fixed inset-0 z-[20]"
      style={{ pointerEvents: "none" }} // ✅ No blocking from div
    >
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ pointerEvents: "none" }} // ✅ No blocking from Canvas itself
        gl={{ preserveDrawingBuffer: true }} // ✅ Stable drawing, no flicker
      >
        <Suspense fallback={null}>
          <StarBackground />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
