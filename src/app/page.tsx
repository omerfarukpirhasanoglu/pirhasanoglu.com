import Link from "next/link";
import Footer from "@/src/components/layout/Footer";

const NAV_LINKS = [
  { label: "GitHub",    href: "https://github.com/omerfarukpirhasanoglu" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/omer-pirhasanoglu" },
  { label: "Instagram", href: "https://www.instagram.com/omerpirhasanoglu" },
];

const TECH_COLS = [
  {
    label: "Model & Mimari",
    items: "Keras, PyTorch\nCNN, Transformer Architecture\nTransfer Learning, Fine-Tuning\nRegularization, Text Segmentation",
  },
  {
    label: "Altyapı & Araçlar",
    items: "FastAPI, Docker, Git\nONNX Runtime, Python\nAI Backend",
  },
];

const PROJECTS = [
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
];

export default function LandingPage() {
  return (
    <div className="relative z-10 min-h-screen flex flex-col">

      {/* ── NAV ── */}
      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(2rem, 7vw, 6rem)",
          height: "68px",
          transition: "color 0.25s ease",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-nav)",
            fontSize: "19px",
            fontWeight: 400,
            color: "rgba(23,20,42,0.58)",
            letterSpacing: "0.01em",
            textDecoration: "none",
          }}
        >
          
        </Link>

        <nav style={{ display: "flex", gap: "36px" }}>
          {NAV_LINKS.map((item) => (
            <Link
              className="nav-link"
              key={item.label}
              href={item.href}
              target="_blank"
              style={{
                fontFamily: "var(--font-nav)",
                fontSize: "19px",
                fontWeight: 400,
                color: "rgba(23,20,42,0.38)",
                letterSpacing: "0.01em",
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
          padding: "68px clamp(2rem, 7vw, 6rem) 0",
          minHeight: "100svh",
          position: "relative",
        }}
      >
        {/* Scroll hint */}
        <div
          className="reveal reveal-5"
          style={{
            position: "absolute",
            bottom: "32px",
            right: "clamp(2rem, 7vw, 6rem)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div style={{
            width: "1px",
            height: "48px",
            background: "linear-gradient(to bottom, rgba(23,20,42,0.42), transparent)",
          }} />
          <span style={{
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(23,20,42,0.42)",
            writingMode: "vertical-rl" as const,
          }}>
            scroll
          </span>
        </div>
        {/* Eyebrow */}
        <div
          className="reveal reveal-1"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "15px",
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(90,65,155,0.60)",
            marginBottom: "22px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >

          Deep Learning · Computer Vision · NLP· Agentic AI
        </div>

        {/* Title */}
        <h1
          className="reveal reveal-2"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "clamp(3.6rem, 9vw, 7.5rem)",
            fontWeight: 400,
            lineHeight: 1.04,
            color: "#17142a",
            maxWidth: "820px",
            marginBottom: "28px",
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
            fontSize: "16px",
            fontWeight: 300,
            color: "rgba(23,20,42,0.45)",
            lineHeight: 1.75,
            maxWidth: "420px",
            marginBottom: "40px",
          }}
        >
          Derin öğrenmenin veriyi anlama gücünü, LLM'lerin bağlamsal yorumlama yetenekleriyle birleştiriyorum.
        </p>

        {/* CTA */}
        <div className="reveal reveal-4">
          <Link
            className="cta-btn"
            href="/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              fontWeight: 500,
              color: "rgba(23,20,42,0.70)",
              background: "rgba(23,20,42,0.08)",
              border: "0.5px solid rgba(23,20,42,0.42)",
              borderRadius: "100px",
              padding: "13px 30px",
              letterSpacing: "0.02em",
              textDecoration: "none",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
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
          padding: "80px clamp(2rem, 7vw, 6rem) 72px",
          borderTop: "0.5px solid rgba(23,20,42,0.10)",
        }}
      >
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "18px",
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(23,20,42,0.42)",
          marginBottom: "32px",
        }}>
          Hakkımda
        </p>

        <div className="about-grid">
          {/* Sol  metin */}
          <div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.7rem, 3vw, 2.4rem)",
              fontWeight: 600,
              color: "#17142a",
              marginBottom: "20px",
              letterSpacing: "-0.01em",
              lineHeight: 1.12,
            }}>
              Ömer Faruk Pirhasanoğlu
            </h2>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              fontWeight: 300,
              color: "rgba(23,20,42,0.48)",
              lineHeight: 1.82,
              maxWidth: "480px",
            }}>
              Derin öğrenme, bilgisayarla görme, doğal dil işleme ve Agentic workflow 
              alanlarında uzmanlaşmakta olan 4. sınıf Bilgisayar Mühendisliği öğrencisiyim.
              Kısıtlı donanım kaynaklarıyla verimli model eğitimi ve ölçülebilir
              performans kazanımı sağlayan mimariler geliştirme konusunda pratik
              deneyim sahibiyim. Geliştirdiğim custom DL/ML modelinin hem 
              birbirleri ile hem de LLM'ler ile iletişim kurup görev dizilerini yerine 
              getirebildiği ekosistemler inşa ediyorum. Bu sayede deterministik DL/ML
              algoritmalarının gücünü, LLM'lerin bağlamsal yorumlama yetenekleriyle birleştirerek
              yapay zekanın en güçlü iki kolunu bir araya getiren çözümler üretiyorum.
            </p>
          </div>

          <div className="tech-grid">
            {TECH_COLS.map((col) => (
              <div key={col.label}>
                <p className="tech-label" style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(90,65,155,0.50)",
                  marginBottom: "10px",
                }}>
                  {col.label}
                </p>
                {col.items.split("\n").map((line, i) => (
                  <p className="tech-col" key={i} style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    fontWeight: 300,
                    color: "rgba(23,20,42,0.55)",
                    lineHeight: 1.85,
                  }}>
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section style={{
        position: "relative",
        zIndex: 10,
        padding: "0 clamp(2rem, 7vw, 6rem) 88px",
        borderTop: "0.5px solid rgba(23,20,42,0.10)",
      }}>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(23,20,42,0.42)",
          paddingTop: "32px",
          marginBottom: "0",
        }}>
          Yapay Zeka Araçları
        </p>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {PROJECTS.map((project, i) => (
            <Link
              key={i}
              href={project.href}
              className="project-row"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "18px 0",
                borderTop: "0.5px solid rgba(23,20,42,0.10)",
                borderBottom: i === PROJECTS.length - 1
                  ? "0.5px solid rgba(23,20,42,0.10)"
                  : undefined,
                textDecoration: "none",
                gap: "0",
              }}
            >
              {/* İsim */}
              <span className="proj-name" style={{
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                fontWeight: 500,
                color: project.live ? "#17142a" : "rgba(23,20,42,0.42)",
                minWidth: "120px",
              }}>
                {project.name}
              </span>

              {/* Versiyon / durum */}
              {project.version ? (
                <span style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10.5px",
                  fontWeight: 500,
                  padding: "3px 9px",
                  borderRadius: "3px",
                  background: "rgba(90,65,155,0.08)",
                  color: "rgba(90,65,155,0.65)",
                  marginRight: "22px",
                  letterSpacing: "0.03em",
                  whiteSpace: "nowrap",
                }}>
                  {project.version}
                </span>
              ) : (
                <span style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10.5px",
                  fontWeight: 400,
                  padding: "3px 9px",
                  borderRadius: "3px",
                  background: "rgba(23,20,42,0.08)",
                  color: "rgba(23,20,42,0.42)",
                  marginRight: "22px",
                  whiteSpace: "nowrap",
                }}>
                  geliştiriliyor
                </span>
              )}

              {/* Tag'ler */}
              <div style={{ display: "flex", flex: 1, flexWrap: "wrap" }}>
                {project.tags.map((tag, j) => (
                  <span key={j} style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    fontWeight: 300,
                    color: "rgba(23,20,42,0.42)",
                  }}>
                    {tag}
                    {j < project.tags.length - 1 && (
                      <span style={{ margin: "0 7px", color: "rgba(23,20,42,0.42)" }}>·</span>
                    )}
                  </span>
                ))}
              </div>

              {/* Ok */}
              <span className="proj-arrow" style={{
                fontFamily: "var(--font-body)",
                fontSize: "16px",
                color: project.live
                  ? "rgba(90,65,155,0.38)"
                  : "rgba(23,20,42,0.42)",
                marginLeft: "auto",
                paddingLeft: "16px",
              }}>
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
