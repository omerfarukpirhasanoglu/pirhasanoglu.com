import Link from "next/link";

export default function DashboardPage() {
  return (
    <div
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "52px 40px 88px",
      }}
    >
      {/* Başlık */}
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
          fontWeight: 400,
          color: "#17142a",
          letterSpacing: "-0.01em",
          lineHeight: 1.1,
          marginBottom: "48px",
        }}
      >
        Geliştirdiğim Modeller
      </h1>

      {/* Dikey sütunlar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "0",
          minHeight: "280px",
        }}
      >
        {/* Chroma */}
        <Link
          href="/dashboard/tool-1"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "0 32px 0 0",
            borderRight: "0.5px solid rgba(23,20,42,0.08)",
            textDecoration: "none",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "28px",
                fontWeight: 400,
                color: "#17142a",
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
              }}
            >
              Chroma
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                fontWeight: 300,
                color: "rgba(23,20,42,0.42)",
                lineHeight: 1.75,
              }}
            >
              Keras tabanlı CNN. Görüntü sınıflandırma ve stil analizi,
              transfer learning ile optimize edilmiş.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "24px" }}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: 300,
                color: "rgba(23,20,42,0.28)",
                lineHeight: 1.85,
              }}
            >
              Keras · CNN<br />
              Transfer Learning · FastAPI
            </p>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                fontWeight: 500,
                padding: "2px 9px",
                borderRadius: "3px",
                background: "rgba(90,65,155,0.08)",
                color: "rgba(90,65,155,0.60)",
                width: "fit-content",
              }}
            >
              v1.2 · yayında
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11.5px",
                fontWeight: 500,
                color: "rgba(90,65,155,0.42)",
              }}
            >
              İncele →
            </span>
          </div>
        </Link>

        {/* Seam */}
        <Link
          href="/dashboard/tool-2"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "0 32px 0 32px",
            borderRight: "0.5px solid rgba(23,20,42,0.08)",
            textDecoration: "none",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "28px",
                fontWeight: 400,
                color: "#17142a",
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
              }}
            >
              Seam
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                fontWeight: 300,
                color: "rgba(23,20,42,0.42)",
                lineHeight: 1.75,
              }}
            >
              PyTorch Transformer. RAG pipeline'ları için bilgi kaybı
              olmaksızın anlamsal metin bölütleme.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "24px" }}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: 300,
                color: "rgba(23,20,42,0.28)",
                lineHeight: 1.85,
              }}
            >
              PyTorch · Transformers<br />
              NLP · RAG
            </p>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                fontWeight: 500,
                padding: "2px 9px",
                borderRadius: "3px",
                background: "rgba(90,65,155,0.08)",
                color: "rgba(90,65,155,0.60)",
                width: "fit-content",
              }}
            >
              v1.1 · yayında
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11.5px",
                fontWeight: 500,
                color: "rgba(90,65,155,0.42)",
              }}
            >
              İncele →
            </span>
          </div>
        </Link>

        {/* Yakında */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "0 0 0 32px",
            opacity: 0.28,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "28px",
                fontWeight: 400,
                color: "#17142a",
                letterSpacing: "-0.01em",
              }}
            >
              ———
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                fontWeight: 300,
                color: "rgba(23,20,42,0.42)",
                lineHeight: 1.75,
              }}
            >
              Bu proje hakkında bilgi vermek için henüz erken.
            </p>
          </div>

          <div style={{ paddingTop: "24px" }}>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                fontWeight: 500,
                padding: "2px 9px",
                borderRadius: "3px",
                background: "rgba(23,20,42,0.04)",
                color: "rgba(23,20,42,0.30)",
                width: "fit-content",
                display: "inline-block",
              }}
            >
              geliştiriliyor
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
