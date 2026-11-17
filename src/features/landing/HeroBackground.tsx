// Clouds drift across the sky in two rows above the landscape. Their spread is
// set by the negative margins, which start each cloud somewhere off screen.
const clouds = [
  [
    { src: "/cloud1.svg", size: "w-[20vw]", offset: "-ml-[50vw]", animation: "animate-float-3" },
    { src: "/cloud1.svg", size: "w-[25vw]", offset: "-ml-[90vw]", animation: "animate-float-2" },
    { src: "/cloud1.svg", size: "w-[25vw]", offset: "-ml-[50vw]", animation: "animate-float-3", flip: true },
    { src: "/cloud1.svg", size: "w-[25vw]", offset: "", animation: "animate-float-1" },
    { src: "/cloud2.svg", size: "w-[15vw]", offset: "ml-[20vw]", animation: "animate-float-4" },
  ],
  [
    { src: "/cloud1.svg", size: "w-[25vw]", offset: "ml-[90vw]", animation: "animate-float-5", flip: true },
    { src: "/cloud1.svg", size: "w-[15vw]", offset: "-ml-[30vw]", animation: "animate-float-1" },
    { src: "/cloud2.svg", size: "w-[10vw]", offset: "ml-[60vw]", animation: "animate-float-5" },
    { src: "/cloud2.svg", size: "w-[15vw]", offset: "", animation: "animate-float-2" },
    { src: "/cloud2.svg", size: "w-[10vw]", offset: "-ml-[30vw]", animation: "animate-float-3" },
  ],
];

export function HeroBackground() {
  return (
    <div
      aria-hidden
      className="relative z-10 flex h-[90vh] min-h-[60ch] flex-col justify-end bg-hero brightness-75 saturate-[0.8]"
    >
      {clouds.map((row, i) => (
        <div
          key={i}
          className={`absolute z-10 w-full overflow-x-hidden opacity-75 ${i === 0 ? "top-0" : "top-10"}`}
        >
          {row.map((cloud, j) => (
            <img
              key={j}
              src={cloud.src}
              alt=""
              className={`block h-12 ${cloud.size} ${cloud.offset} ${cloud.animation} ${cloud.flip ? "rotate-180" : ""}`}
            />
          ))}
        </div>
      ))}
      <div className="relative aspect-[1.83] h-full w-full overflow-x-hidden">
        <img
          src="/landing-bg.svg"
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
