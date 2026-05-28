import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div
      style={{
        maxWidth: "860px",
        margin: "0 auto",
        padding: "48px 32px 80px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "48px" }}>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "9.5px",
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(25,22,46,0.22)",
            marginBottom: "10px",
          }}
        >
          Panel
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            fontWeight: 600,
            color: "#19162e",
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
            marginBottom: "10px",
          }}
        >
          Yapay Zeka Araçları
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "13.5px",
            fontWeight: 300,
            color: "rgba(25,22,46,0.42)",
            lineHeight: 1.70,
          }}
        >
          Çözüm odaklı · optimize · ölçeklenebilir
        </p>
      </div>

      {/* Project cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>

        {/* Chroma */}
        <div
          style={{
            background: "rgba(255,255,255,0.50)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "0.5px solid rgba(25,22,46,0.08)",
            borderRadius: "10px",
            overflow: "hidden",
            display: "flex",
            marginBottom: "12px",
          }}
        >
          <div style={{ flex: 1, padding: "28px 28px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", flexWrap: "wrap" }}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "#19162e",
                  letterSpacing: "-0.01em",
                }}
              >
                Chroma
              </h2>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: 500,
                  padding: "2px 8px",
                  borderRadius: "3px",
                  background: "rgba(100,80,160,0.08)",
                  color: "rgba(100,80,160,0.65)",
                  letterSpacing: "0.03em",
                }}
              >
                v1.2
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: 500,
                  padding: "2px 8px",
                  borderRadius: "3px",
                  background: "rgba(60,180,100,0.08)",
                  color: "rgba(40,150,80,0.75)",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(40,150,80,0.70)", display: "inline-block" }} />
                yayında
              </span>
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                {["Keras", "CNN", "Python", "FastAPI"].map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "10px",
                      padding: "2px 8px",
                      borderRadius: "3px",
                      border: "0.5px solid rgba(25,22,46,0.10)",
                      color: "rgba(25,22,46,0.32)",
                      background: "rgba(255,255,255,0.30)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                fontWeight: 300,
                color: "rgba(25,22,46,0.45)",
                lineHeight: 1.75,
                marginBottom: "20px",
              }}
            >
              FastAPI backendine bağlı, Keras tabanlı konvolüsyonel sinir ağları kullanarak
              yüklenen görüntülerin özniteliklerini çıkaran ve yüksek doğrulukla analiz eden modelim.
              Tarzınızı uzman bir yapay zekanın detaylı metrikleriyle inceleyebilirsiniz.
            </p>
            <Link
              href="/dashboard/tool-1"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: 500,
                color: "rgba(25,22,46,0.65)",
                background: "rgba(25,22,46,0.07)",
                border: "0.5px solid rgba(25,22,46,0.14)",
                borderRadius: "100px",
                padding: "9px 20px",
                textDecoration: "none",
              }}
            >
              Modeli İncele
              <ArrowRight style={{ width: "12px", height: "12px" }} />
            </Link>
          </div>
          <div
            style={{
              width: "280px",
              flexShrink: 0,
              position: "relative",
              borderLeft: "0.5px solid rgba(25,22,46,0.06)",
            }}
          >
            <Image src="/Chroma.png" alt="Chroma" fill style={{ objectFit: "cover" }} />
          </div>
        </div>

        {/* Seam */}
        <div
          style={{
            background: "rgba(255,255,255,0.50)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "0.5px solid rgba(25,22,46,0.08)",
            borderRadius: "10px",
            overflow: "hidden",
            display: "flex",
            marginBottom: "12px",
          }}
        >
          <div style={{ flex: 1, padding: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", flexWrap: "wrap" }}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "#19162e",
                  letterSpacing: "-0.01em",
                }}
              >
                Seam
              </h2>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: 500,
                  padding: "2px 8px",
                  borderRadius: "3px",
                  background: "rgba(100,80,160,0.08)",
                  color: "rgba(100,80,160,0.65)",
                  letterSpacing: "0.03em",
                }}
              >
                v1.1
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: 500,
                  padding: "2px 8px",
                  borderRadius: "3px",
                  background: "rgba(60,180,100,0.08)",
                  color: "rgba(40,150,80,0.75)",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(40,150,80,0.70)", display: "inline-block" }} />
                yayında
              </span>
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                {["PyTorch", "Transformers", "Python", "FastAPI"].map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "10px",
                      padding: "2px 8px",
                      borderRadius: "3px",
                      border: "0.5px solid rgba(25,22,46,0.10)",
                      color: "rgba(25,22,46,0.32)",
                      background: "rgba(255,255,255,0.30)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                fontWeight: 300,
                color: "rgba(25,22,46,0.45)",
                lineHeight: 1.75,
                marginBottom: "20px",
              }}
            >
              PyTorch ile geliştirdiğim, mE5-small base encoderın üzerine kendi kurduğum
              Cross Sentence Attention mekanizmalı Transformer modelim. RAG dokümanlarının
              chunking problemini bilgi kaybı olmaksızın çözüyor.
            </p>
            <Link
              href="/dashboard/tool-2"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: 500,
                color: "rgba(25,22,46,0.65)",
                background: "rgba(25,22,46,0.07)",
                border: "0.5px solid rgba(25,22,46,0.14)",
                borderRadius: "100px",
                padding: "9px 20px",
                textDecoration: "none",
              }}
            >
              Modeli İncele
              <ArrowRight style={{ width: "12px", height: "12px" }} />
            </Link>
          </div>
          <div
            style={{
              width: "280px",
              flexShrink: 0,
              position: "relative",
              borderLeft: "0.5px solid rgba(25,22,46,0.06)",
            }}
          >
            <Image src="/Chunker.png" alt="Seam" fill style={{ objectFit: "cover" }} />
          </div>
        </div>

        {/* Yakında */}
        <div
          style={{
            background: "rgba(255,255,255,0.28)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "0.5px solid rgba(25,22,46,0.06)",
            borderRadius: "10px",
            padding: "24px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: 0.60,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "#19162e",
                }}
              >
                Yakında
              </h3>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  padding: "2px 8px",
                  borderRadius: "100px",
                  border: "0.5px solid rgba(25,22,46,0.10)",
                  color: "rgba(25,22,46,0.30)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Clock style={{ width: "10px", height: "10px" }} />
                Geliştiriliyor
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                fontWeight: 300,
                color: "rgba(25,22,46,0.35)",
              }}
            >
              Bu proje hakkında bilgi vermek için henüz erken.
            </p>
          </div>
          <button
            disabled
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              fontWeight: 400,
              color: "rgba(25,22,46,0.22)",
              background: "rgba(25,22,46,0.04)",
              border: "0.5px solid rgba(25,22,46,0.08)",
              borderRadius: "100px",
              padding: "9px 20px",
              cursor: "not-allowed",
            }}
          >
            Yakında
          </button>
        </div>

      </div>
    </div>
  );
}
