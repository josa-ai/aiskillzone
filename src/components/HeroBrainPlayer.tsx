"use client";

import { Player } from "@remotion/player";
import { BrainAnimation } from "@/remotion/BrainAnimation";

export function HeroBrainPlayer() {
  return (
    <Player
      component={BrainAnimation}
      durationInFrames={600}
      fps={30}
      compositionWidth={800}
      compositionHeight={800}
      loop
      autoPlay
      controls={false}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "2rem",
        overflow: "hidden",
      }}
    />
  );
}
