import Image from "next/image";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#000" }}>
      {/* Image — full width on mobile, center third on sm+ */}
      <div className="absolute top-0 bottom-0 left-0 right-0 sm:left-[33.33%] sm:right-auto sm:w-[33.33%]">
        <Image
          src="/site-landing.avif"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />

        {/* Fade left edge into black */}
        <div
          className="hidden sm:block absolute inset-y-0 left-0 w-24 pointer-events-none"
          style={{ background: "linear-gradient(to right, #000, transparent)" }}
        />

        {/* Fade right edge into black */}
        <div
          className="hidden sm:block absolute inset-y-0 right-0 w-24 pointer-events-none"
          style={{ background: "linear-gradient(to left, #000, transparent)" }}
        />
      </div>

      {/* Bottom fade to blend with page */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85) 100%)",
        }}
      />
    </div>
  );
}
