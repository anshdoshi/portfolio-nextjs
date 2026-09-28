import { ImageResponse } from "next/og";
import { person, stats } from "@/content/profile";

export const alt = `${person.name} — ${person.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: "72px 80px",
          background: "#09090D",
          color: "#EDECF4",
          fontFamily: "sans-serif",
          backgroundImage:
            "linear-gradient(rgba(236,234,228,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(236,234,228,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#A3A1B5" }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: "#A78BFA" }} />
          {person.name} · {person.title}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 88, lineHeight: 1.02, letterSpacing: -3, fontWeight: 600 }}>
          <span>I build the systems</span>
          <span style={{ color: "#A78BFA" }}>products trust.</span>
        </div>
        <div style={{ display: "flex", gap: 56, fontSize: 26, color: "#A3A1B5" }}>
          {stats.slice(0, 3).map((s) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 44, color: "#EDECF4", fontWeight: 600 }}>{s.value}</span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
