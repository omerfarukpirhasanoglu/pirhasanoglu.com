import Link from "next/link";
import Footer from "@/src/components/layout/Footer";

export default function LandingPage() {
  return (
    <div className="relative z-10 min-h-screen flex flex-col">

      {/* ── NAV ── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-14 h-16">
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            fontWeight: 500,
            color: "rgba(25,22,46,0.60)",
            letterSpacing: "0.01em",
            textDecoration: "none",
          }}
        >
          omer faruk pirhasanoglu
        </Link>

        <nav style={{ display: "flex", gap: "28px" }}>
          {[
            { label: "GitHub", href: "https://github.com/omerfarukpirhasanoglu" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/omer-pirhasanoglu" },
            { label: "Instagram", href: "https://www.instagram.com/omerpirhasanoglu" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target="_blank"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: 400,
                color: "rgba(25,22,46,0.32)",
                letterSpacing: "0.02em",
                textDecoration: "none",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* ── HERO ── */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 clamp(2rem, 8vw, 7rem)",
          minHeight: "100svh",
        }}
      >
        {/* Eyebrow */}
        <div
          className="reveal reveal-1"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(100,80,160,0.58)",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ display: "inline-block", width: "18px", height: "1px", background: "rgba(100,80,160,0.35)" }} />
          Deep Learning · Computer Vision · NLP
        </div>

        {/* Title */}
        <h1
          className="reveal reveal-2"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            fontWeight: 600,
            lineHeight: 1.06,
            color: "#19162e",
            maxWidth: "700px",
            marginBottom: "24px",
            letterSpacing: "-0.01em",
          }}
        >
          "Attention" is all<br />you need.
        </h1>

        {/* Subtitle */}
        <p
          className="reveal reveal-3"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            fontWeight: 300,
            color: "rgba(25,22,46,0.45)",
            lineHeight: 1.75,
            maxWidth: "400px",
            marginBottom: "36px",
          }}
        >
          Mimari tasarımdan bulut dağıtımına kadar<br />
          uçtan uca yapay zeka modelleri tasarlıyor,<br />
          eğitiyor ve deploy ediyorum.
        </p>

        {/* CTA */}
        <div className="reveal reveal-4">
          <Link
            href="/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontFamily: "var(--font-body)",
              fontSize: "12.5px",
              fontWeight: 500,
              color: "rgba(25,22,46,0.72)",
              background: "rgba(25,22,46,0.08)",
              border: "0.5px solid rgba(25,22,46,0.18)",
              borderRadius: "100px",
              padding: "11px 26px",
              letterSpacing: "0.02em",
              textDecoration: "none",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              transition: "background 0.2s, border-color 0.2s",
            }}
          >
            Projeleri Keşfet
          </Link>
        </div>
      </main>

      {/* ── ABOUT ── */}
      <section
        style={{
          position: "relative",
          zIndex: 10,
          padding: "72px clamp(2rem, 8vw, 7rem) 64px",
          borderTop: "0.5px solid rgba(25,22,46,0.08)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "9.5px",
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(25,22,46,0.22)",
            marginBottom: "28px",
          }}
        >
          Hakkımda
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* Sol — metin */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                fontWeight: 600,
                color: "#19162e",
                marginBottom: "16px",
                letterSpacing: "-0.01em",
                lineHeight: 1.15,
              }}
            >
              Ömer Faruk Pirhasanoğlu
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13.5px",
                fontWeight: 300,
                color: "rgba(25,22,46,0.48)",
                lineHeight: 1.80,
                maxWidth: "420px",
              }}
            >
              Derin öğrenme, bilgisayarla görme ve doğal dil işleme alanlarında
              uzmanlaşmakta olan 3. sınıf Bilgisayar Mühendisliği öğrencisiyim.
              Kısıtlı donanım kaynaklarıyla verimli model eğitimi ve ölçülebilir
              performans kazanımı sağlayan mimariler geliştirme konusunda pratik
              deneyim sahibiyim.
            </p>
          </div>

          {/* Sağ — tag'ler */}
          <div style={{ paddingTop: "4px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
              {[
                "Keras", "PyTorch", "CNN", "Transformer Architecture",
                "Transfer Learning", "Fine-Tuning", "FastAPI", "Docker",
                "ONNX Runtime", "Python", "NLP", "Computer Vision",
              ].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    fontWeight: 400,
                    color: "rgba(25,22,46,0.40)",
                    background: "rgba(255,255,255,0.38)",
                    border: "0.5px solid rgba(25,22,46,0.10)",
                    borderRadius: "4px",
                    padding: "4px 10px",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section
        style={{
          position: "relative",
          zIndex: 10,
          padding: "0 clamp(2rem, 8vw, 7rem) 80px",
          borderTop: "0.5px solid rgba(25,22,46,0.08)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "9.5px",
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(25,22,46,0.22)",
            marginBottom: "0",
            paddingTop: "28px",
          }}
        >
          Yapay Zeka Araçları
        </p>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {[
            {
              name: "Chroma",
              version: "v1.2",
              tags: ["Keras", "CNN", "Transfer Learning", "Görüntü Sınıflandırma"],
              href: "/dashboard/tool-1",
              live: true,
            },
            {
              name: "Seam",
              version: "v1.1",
              tags: ["PyTorch", "Transformers", "NLP", "RAG"],
              href: "/dashboard/tool-2",
              live: true,
            },
            {
              name: "———",
              version: null,
              tags: [],
              href: "/dashboard/tool-3",
              live: false,
            },
          ].map((project, i) => (
            <Link
              key={i}
              href={project.href}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "16px 0",
                borderTop: "0.5px solid rgba(25,22,46,0.08)",
                textDecoration: "none",
                gap: "0",
                ...(i === 2 ? { borderBottom: "0.5px solid rgba(25,22,46,0.08)" } : {}),
              }}
            >
              {/* İsim */}
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13.5px",
                  fontWeight: 500,
                  color: project.live ? "#19162e" : "rgba(25,22,46,0.25)",
                  minWidth: "110px",
                }}
              >
                {project.name}
              </span>

              {/* Versiyon badge */}
              {project.version ? (
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    fontWeight: 500,
                    padding: "2px 8px",
                    borderRadius: "3px",
                    background: "rgba(100,80,160,0.08)",
                    color: "rgba(100,80,160,0.65)",
                    marginRight: "20px",
                    letterSpacing: "0.03em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {project.version}
                </span>
              ) : (
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    fontWeight: 400,
                    padding: "2px 8px",
                    borderRadius: "3px",
                    background: "rgba(25,22,46,0.04)",
                    color: "rgba(25,22,46,0.22)",
                    marginRight: "20px",
                    letterSpacing: "0.03em",
                    whiteSpace: "nowrap",
                  }}
                >
                  geliştiriliyor
                </span>
              )}

              {/* Tag'ler */}
              <div style={{ display: "flex", gap: "0", flex: 1 }}>
                {project.tags.map((tag, j) => (
                  <span
                    key={j}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "11px",
                      fontWeight: 300,
                      color: "rgba(25,22,46,0.30)",
                    }}
                  >
                    {tag}{j < project.tags.length - 1 ? <span style={{ margin: "0 6px", color: "rgba(25,22,46,0.14)" }}> · </span> : null}
                  </span>
                ))}
              </div>

              {/* Ok */}
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  color: project.live ? "rgba(100,80,160,0.40)" : "rgba(25,22,46,0.12)",
                  marginLeft: "auto",
                  paddingLeft: "16px",
                }}
              >
                {project.live ? "→" : "…"}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
