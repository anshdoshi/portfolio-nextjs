import { ImageResponse } from "next/og";
import { person } from "@/content/profile";

export const alt = `${person.name} — ${person.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const techStack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Tailwind",
];

const statsRow = [
  { value: "4+", label: "Years of Experience" },
  { value: "10+", label: "Systems Shipped" },
  { value: "Full-Stack", label: "Frontend · Backend · Infra" },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px 68px",
          background: "#09090D",
          color: "#EDECF4",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
          backgroundImage:
            "linear-gradient(rgba(236,234,228,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(236,234,228,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      >
        {/* Purple ambient glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        {/* Subtle glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -60,
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Top row: name + title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#A78BFA",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: 18,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#A3A1B5",
                fontWeight: 500,
              }}
            >
              {person.name}
            </span>
            <span style={{ color: "#3D3B52", fontSize: 18 }}>·</span>
            <span
              style={{
                fontSize: 18,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#6B6885",
                fontWeight: 400,
              }}
            >
              {person.title}
            </span>
          </div>

          {/* Tech chips top-right */}
          <div style={{ display: "flex", gap: 8 }}>
            {techStack.map((tech) => (
              <div
                key={tech}
                style={{
                  padding: "5px 12px",
                  borderRadius: 20,
                  background: "rgba(167,139,250,0.10)",
                  border: "1px solid rgba(167,139,250,0.22)",
                  fontSize: 13,
                  color: "#C4B5FD",
                  letterSpacing: "0.04em",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Main headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: 1.0,
            letterSpacing: "-2px",
          }}
        >
          <span
            style={{
              fontSize: 92,
              fontWeight: 600,
              color: "#EDECF4",
            }}
          >
            I build the systems
          </span>
          <span
            style={{
              fontSize: 92,
              fontWeight: 600,
              color: "#A78BFA",
            }}
          >
            products trust.
          </span>
        </div>

        {/* Bottom row: stats */}
        <div
          style={{
            display: "flex",
            gap: 0,
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 56 }}>
            {statsRow.map((s) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <span
                  style={{
                    fontSize: 42,
                    fontWeight: 700,
                    color: "#EDECF4",
                    letterSpacing: "-1px",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontSize: 18,
                    color: "#6B6885",
                    letterSpacing: "0.02em",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Domain tags */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
            {["Identity & SSO", "Search & AI", "REST APIs & Queues"].map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#6B6885",
                  fontSize: 15,
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "#A78BFA",
                    display: "flex",
                  }}
                />
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
