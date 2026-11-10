import { ImageResponse } from "next/og";

export const alt = "Gabriel Pimentel, Desenvolvedor Full-Stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// As mesmas cores dos tokens do tema escuro em globals.css.
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 96,
        background: "#050a18",
        color: "#f5f8ff",
      }}
    >
      <div style={{ fontSize: 28, color: "#60a5fa" }}>
        {"// a volta ao mundo"}
      </div>
      <div style={{ fontSize: 104, fontWeight: 800, marginTop: 16 }}>
        Gabriel Pimentel
      </div>
      <div style={{ display: "flex", fontSize: 48, marginTop: 8 }}>
        Desenvolvedor
        <span style={{ color: "#60a5fa", marginLeft: 14 }}>Full-Stack</span>
      </div>
      <div style={{ fontSize: 30, color: "#9fb0d0", marginTop: 40 }}>
        Do banco de dados à interface · Brasília
      </div>
    </div>,
    size,
  );
}
