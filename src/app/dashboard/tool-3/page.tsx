import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Tool3Page() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        padding: "0 clamp(2rem, 7vw, 6rem)",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 400,
          color: "#17142a",
          letterSpacing: "-0.01em",
          lineHeight: 1.1,
        }}
      >
        Yakında
      </h1>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "15px",
          fontWeight: 300,
          color: "rgba(23,20,42,0.50)",
          lineHeight: 1.75,
          maxWidth: "360px",
        }}
      >
        Bu proje hakkında bilgi vermek için henüz erken.
        Hazır olduğunda burada olacak.
      </p>

      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "10.5px",
          fontWeight: 500,
          padding: "3px 12px",
          borderRadius: "100px",
          border: "0.5px solid rgba(23,20,42,0.14)",
          color: "rgba(23,20,42,0.45)",
          letterSpacing: "0.04em",
        }}
      >
        Geliştiriliyor
      </span>

      <Link
        href="/dashboard"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontFamily: "var(--font-body)",
          fontSize: "13px",
          fontWeight: 400,
          color: "rgba(23,20,42,0.45)",
          textDecoration: "none",
          marginTop: "8px",
        }}
      >
        <ArrowLeft style={{ width: "14px", height: "14px" }} />
        Panele Dön
      </Link>
    </div>
  );
}
