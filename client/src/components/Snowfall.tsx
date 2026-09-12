import { useMemo } from "react";

export function Snowfall() {
  const flakes = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 101}%`,
        size: `${3 + (i % 4)}px`,
        duration: `${10 + (i % 9)}s`,
        delay: `${-(i % 12)}s`,
        drift: `${-30 + ((i * 17) % 61)}px`,
        opacity: 0.15 + (i % 5) * 0.06,
      })),
    [],
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className="absolute top-[-12px] rounded-full bg-white blur-[0.2px]"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animation: `portfolio-snow ${flake.duration} linear infinite`,
            animationDelay: flake.delay,
            ["--snow-drift" as string]: flake.drift,
          }}
        />
      ))}
    </div>
  );
}
