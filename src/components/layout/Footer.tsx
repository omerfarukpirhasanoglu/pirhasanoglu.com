import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 10,
        borderTop: "0.5px solid rgba(25,22,46,0.10)",
        padding: "20px clamp(2rem, 8vw, 7rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "13px",
          fontWeight: 400,
          color: "rgba(25, 22, 46, 0.42)",
        }}
      >
        © {year} · AI & Sistem Mimarisi
      </span>

      <div style={{ display: "flex", gap: "20px" }}>
        {[
          { label: "GitHub", href: "https://github.com/omerfarukpirhasanoglu" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/omer-pirhasanoglu" },
          { label: "Instagram", href: "https://www.instagram.com/omerpirhasanoglu" },
        ].map((item) => (
          <Link
            className="footer-link"
            key={item.label}
            href={item.href}
            target="_blank"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              fontWeight: 400,
              color: "rgba(25, 22, 46, 0.42)",
              textDecoration: "none",
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
