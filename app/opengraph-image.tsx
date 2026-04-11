import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "radial-gradient(circle at top left, rgba(255, 140, 0, 0.45), transparent 34%), linear-gradient(135deg, #fff8ef 0%, #fff2dc 45%, #ffe3bd 100%)",
          color: "#171717",
          padding: "64px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            border: "1px solid rgba(23, 23, 23, 0.08)",
            borderRadius: "36px",
            padding: "56px",
            background: "rgba(255,255,255,0.78)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              fontSize: "30px",
              fontWeight: 700,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "58px",
                height: "58px",
                borderRadius: "18px",
                background: "#ff6a00",
                color: "#ffffff",
              }}
            >
              PC
            </div>
            <div>ForgePC</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "820px" }}>
            <div style={{ fontSize: "72px", fontWeight: 800, lineHeight: 1.02 }}>
              Кастомные ПК под реальные задачи
            </div>
            <div style={{ fontSize: "30px", lineHeight: 1.35, color: "#4b5563" }}>
              Игры, стриминг, монтаж, 3D, разработка и локальный ИИ. Каталог сборок, конфигуратор и точный
              подбор под задачи и бюджет.
            </div>
          </div>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", fontSize: "24px", color: "#374151" }}>
            {["Каталог сборок", "Конфигуратор", "Контакты", "Блог"].map((item) => (
              <div
                key={item}
                style={{
                  padding: "12px 20px",
                  borderRadius: "999px",
                  background: "rgba(255, 255, 255, 0.96)",
                  border: "1px solid rgba(23, 23, 23, 0.08)",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
