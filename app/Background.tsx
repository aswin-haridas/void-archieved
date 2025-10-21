"use client";
import React from "react";
import Silk from "../components/Silk.jsx";

export default function Background() {
  const time = Date.now();
  const numbers = Array.from({ length: 500 }, () => time);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none select-none overflow-hidden">
      <Silk
        speed={5}
        scale={1}
        color="#C3B1E1"
        noiseIntensity={1.5}
        rotation={0}
      />
    </div>
  );
}
