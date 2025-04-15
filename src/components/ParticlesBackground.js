"use client";
import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    console.log("Particles Init:", engine);
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      className="absolute inset-0 -z-10" // Ensure it is in the background
      init={particlesInit}
      options={{
        background: {
          color: "#000000",
        },
        fullScreen: {
          enable: true, // Ensures it covers the entire screen
          zIndex: -10,  // Puts it behind other elements
        },
        particles: {
          number: {
            value: 50,
          },
          size: {
            value: 3,
          },
          move: {
            enable: true,
            speed: 2,
          },
          links: {
            enable: true,
            color: "#ffffff",
          },
        },
      }}
    />
  );
}
