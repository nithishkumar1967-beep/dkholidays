import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFB800",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.15)",
            borderRadius: 20,
            padding: "40px 80px",
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: "bold",
              color: "white",
              marginBottom: 20,
            }}
          >
            DK Holidays
          </div>
          <div
            style={{
              fontSize: 36,
              color: "white",
              opacity: 0.9,
              marginBottom: 10,
            }}
          >
            Best Travels in Coimbatore
          </div>
          <div
            style={{
              fontSize: 28,
              color: "white",
              opacity: 0.75,
            }}
          >
            Tours &amp; Travel Agency
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
