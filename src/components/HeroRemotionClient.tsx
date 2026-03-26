"use client";

import { Player } from "@remotion/player";
import { HeroAnimationComp } from "@/remotion/HeroAnimation";

export function HeroRemotionClient() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    >
      <Player
        component={HeroAnimationComp}
        durationInFrames={300}
        fps={30}
        compositionWidth={1920}
        compositionHeight={1080}
        loop
        autoPlay
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        controls={false}
      />
    </div>
  );
}
