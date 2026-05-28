import Link from "next/link";

export default function DashboardPage() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 clamp(2rem, 5vw, 5rem)",
      }}
    >
      {/* Başlık */}
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
          fontWeight: 400,
          color: "#17142a",
          letterSpacing: "-0.01em",
          lineHeight: 1.1,
          marginBottom: "clamp(2.5rem, 5vh, 4rem)",
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
          flex: "0 0 auto",
        }}
      >
        {/* Chroma */}
        <Link
          href="/dashboard/tool-1"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "clamp(1.5rem, 3vh, 2.5rem) clamp(2rem, 4vw, 3.5rem) clamp(1.5rem, 3vh, 2.5rem) 0",
            borderRight: "0.5px solid rgba(23,20,42,0.08)",
            borderTop: "0.5px solid rgba(23,20,42,0.08)",
            textDecoration: "none",
            minHeight: "clamp(260px, 38vh, 380px)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
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
                fontSize: "clamp(13px, 1.2vw, 15px)",
                fontWeight: 300,
                color: "rgba(23,20,42,0.42)",
                lineHeight: 1.78,
              }}
            >
              Keras tabanlı CNN. Görüntü sınıflandırma ve stil analizi,
              transfer learning ile optimize edilmiş.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "32px" }}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: 300,
                color: "rgba(23,20,42,0.28)",
                lineHeight: 1.90,
              }}
            >
              Keras · CNN<br />
              Transfer Learning · FastAPI
            </p>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "10.5px",
                fontWeight: 500,
                padding: "3px 10px",
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
                fontSize: "12.5px",
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
            padding: "clamp(1.5rem, 3vh, 2.5rem) clamp(2rem, 4vw, 3.5rem)",
            borderRight: "0.5px solid rgba(23,20,42,0.08)",
            borderTop: "0.5px solid rgba(23,20,42,0.08)",
            textDecoration: "none",
            minHeight: "clamp(260px, 38vh, 380px)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
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
                fontSize: "clamp(13px, 1.2vw, 15px)",
                fontWeight: 300,
                color: "rgba(23,20,42,0.42)",
                lineHeight: 1.78,
              }}
            >
              PyTorch Transformer. RAG pipeline'ları için bilgi kaybı
              olmaksızın anlamsal metin bölütleme.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "32px" }}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: 300,
                color: "rgba(23,20,42,0.28)",
                lineHeight: 1.90,
              }}
            >
              PyTorch · Transformers<br />
              NLP · RAG
            </p>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "10.5px",
                fontWeight: 500,
                padding: "3px 10px",
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
                fontSize: "12.5px",
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
            padding: "clamp(1.5rem, 3vh, 2.5rem) 0 clamp(1.5rem, 3vh, 2.5rem) clamp(2rem, 4vw, 3.5rem)",
            borderTop: "0.5px solid rgba(23,20,42,0.08)",
            opacity: 0.28,
            minHeight: "clamp(260px, 38vh, 380px)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
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
                fontSize: "clamp(13px, 1.2vw, 15px)",
                fontWeight: 300,
                color: "rgba(23,20,42,0.42)",
                lineHeight: 1.78,
              }}
            >
              Bu proje hakkında bilgi vermek için henüz erken.
            </p>
          </div>

          <div style={{ paddingTop: "32px" }}>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "10.5px",
                fontWeight: 500,
                padding: "3px 10px",
                borderRadius: "3px",
                background: "rgba(23,20,42,0.04)",
                color: "rgba(23,20,42,0.30)",
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
