import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#000",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "80px 100px",
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: 120,
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: "-3px",
        }}
      >
        Review
      </div>
      <div
        style={{
          color: "white",
          fontSize: 120,
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: "-3px",
        }}
      >
        Links
      </div>
      <div
        style={{
          color: "#888",
          fontSize: 30,
          marginTop: 32,
        }}
      >
        언어 장벽 없이 시작하는 샤오홍슈, 도우인, 따종디엔핑 마케팅
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
