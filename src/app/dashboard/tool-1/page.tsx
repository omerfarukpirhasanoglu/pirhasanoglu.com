"use client";

import { useState, useEffect, useRef } from "react";
import { UploadCloud, AlertCircle, ChevronDown } from "lucide-react";
import { API_CONFIG } from "@/src/config/api";

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface DigerOlasilik { stil: string; guven_yuzdesi: number; }
interface StilSonucu { tahmin: string; guven: number; diger_olasiliklar: DigerOlasilik[]; }
interface DominantRenk { rgb: number[]; yuzde: number; isim: string; notr: boolean; }
interface GenelIstatistikler { ort_doygunluk: number; ort_parlaklik: number; renk_cesitliligi: number; notr_oran: number; }
interface UyumAnalizi { tur: string; aciklama: string; skor: number; }
interface RenkAnalizi { dominant_colors: DominantRenk[]; genel_istatistikler: GenelIstatistikler; uyum_analizi: UyumAnalizi; stil_tahmini: string; }
interface AnalysisResult { status: string; dosya_boyutu_mb: number; cikarim_suresi_ms: number; stil: StilSonucu; renk_analizi: RenkAnalizi; }

// ─── Changelog ────────────────────────────────────────────────────────────────

const CHANGELOG = [
  {
    version: "v1.2", date: "Mart 2025", current: true,
    items: [
      "ONNX formatına geçildi — boyut %80 azaldı, çıkarım süresi dramatik şekilde kısaldı.",
      "Çok daha detaylı renk/ton analizi ve yapıcı geri dönüşler eklendi.",
      "Train pipeline güncellenerek daha yüksek doğruluk için yeniden eğitildi.",
    ],
    meta: { accuracy: "93.85%", epochs: "20", inference: "−7500ms" },
  },
  {
    version: "v1.1", date: "Mart 2025", current: false,
    items: [
      "Veri seti kaynaklı sınıf yanlılığı sorunu giderildi.",
      "Preprocessing yükü GPU'ya kaydırılarak CPU darboğazı çözüldü.",
      "Dominant palet çıkarımı ~%13 iyileştirildi.",
    ],
    meta: { accuracy: "87.9%", epochs: "20", inference: "−6000ms" },
  },
  {
    version: "v1.0", date: "Şubat 2025", current: false,
    items: [
      "İlk CNN mimarisi kuruldu.",
      "2 fazlı transfer learning pipeline'ı uygulandı.",
      "Renk analizi ve dominant palet çıkarımı eklendi.",
    ],
    meta: { accuracy: "87.9%", epochs: "20", inference: "~8100ms" },
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function rgbToCss(rgb: number[]) { return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`; }

function useTypewriter(text: string, trigger: boolean, speed = 18) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!trigger || !text) return;
    const timeout = setTimeout(() => {
      if (timerRef.current) clearInterval(timerRef.current);
      setDisplayed(""); setDone(false);
      let i = 0;
      timerRef.current = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(timerRef.current!); setDone(true); }
      }, speed);
    }, 300);
    return () => clearTimeout(timeout);
  }, [trigger, text]);

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);
  return { displayed, done };
}

// ─── Result Panel ─────────────────────────────────────────────────────────────

function ResultPanel({ result }: { result: AnalysisResult }) {
  const [showTech, setShowTech] = useState(false);
  const { displayed, done } = useTypewriter(result.renk_analizi.uyum_analizi.aciklama, true);

  const s: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "11px", fontWeight: 500,
    letterSpacing: "0.14em", textTransform: "uppercase",
    color: "rgba(23,20,42,0.42)", marginBottom: "10px",
  };

  const techItems = [
    { label: "Çıkarım", value: `${result.cikarim_suresi_ms} ms` },
    { label: "Dosya", value: `${result.dosya_boyutu_mb} MB` },
    { label: "Doygunluk", value: `%${result.renk_analizi.genel_istatistikler.ort_doygunluk}` },
    { label: "Parlaklık", value: `%${result.renk_analizi.genel_istatistikler.ort_parlaklik}` },
    { label: "Çeşitlilik", value: `${result.renk_analizi.genel_istatistikler.renk_cesitliligi}` },
    { label: "Nötr Oran", value: `%${result.renk_analizi.genel_istatistikler.notr_oran}` },
  ];

  return (
    <div style={{ borderTop: "0.5px solid rgba(23,20,42,0.10)", paddingTop: "28px", display: "flex", flexDirection: "column", gap: "28px" }}>

      {/* Renk şeridi */}
      <div style={{ height: "6px", borderRadius: "3px", overflow: "hidden", display: "flex" }}>
        {result.renk_analizi.dominant_colors.map((r, i) => (
          <div key={i} style={{ flex: r.yuzde, background: rgbToCss(r.rgb) }} />
        ))}
      </div>

      {/* İki sütun — Stil + Uyum */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>

        {/* Stil tahmini */}
        <div>
          <p style={s}>Stil Tahmini</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 400, color: "#17142a", letterSpacing: "-0.01em", lineHeight: 1.1, marginBottom: "6px" }}>
            {result.stil.tahmin}
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 300, color: "rgba(23,20,42,0.40)", marginBottom: "20px" }}>
            {result.renk_analizi.stil_tahmini} · %{result.stil.guven} güven
          </p>

          <p style={{ ...s, marginBottom: "12px" }}>Diğer Olasılıklar</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {result.stil.diger_olasiliklar.map((item) => (
              <div key={item.stil} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 0", borderTop: "0.5px solid rgba(23,20,42,0.10)" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 400, color: "rgba(23,20,42,0.45)", minWidth: "90px" }}>{item.stil}</span>
                <div style={{ flex: 1, height: "2px", background: "rgba(23,20,42,0.07)", borderRadius: "1px", overflow: "hidden" }}>
                  <div style={{ width: `${item.guven_yuzdesi}%`, height: "100%", background: "rgba(90,65,155,0.35)", borderRadius: "1px" }} />
                </div>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "rgba(23,20,42,0.42)", minWidth: "28px", textAlign: "right" }}>%{item.guven_yuzdesi}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Uyum + Palet */}
        <div>
          <p style={s}>Uyum Skoru</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "4px" }}>
            <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 400, color: "#17142a", lineHeight: 1 }}>
              {result.renk_analizi.uyum_analizi.skor}
            </span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "rgba(23,20,42,0.42)" }}>/ 100</span>
          </div>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 500, padding: "2px 9px", borderRadius: "3px", background: "rgba(90,65,155,0.08)", color: "rgba(90,65,155,0.60)", display: "inline-block", marginBottom: "20px", letterSpacing: "0.04em" }}>
            {result.renk_analizi.uyum_analizi.tur}
          </span>

          <p style={s}>Dominant Palet</p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {result.renk_analizi.dominant_colors.map((r, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: rgbToCss(r.rgb), border: "0.5px solid rgba(23,20,42,0.10)" }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", color: "rgba(23,20,42,0.42)" }}>%{r.yuzde}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analiz yorumu */}
      <div>
        <p style={s}>Analiz Yorumu</p>
        <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "15px", color: "rgba(23,20,42,0.55)", lineHeight: 1.80, borderLeft: "1.5px solid rgba(90,65,155,0.25)", paddingLeft: "16px" }}>
          {displayed}
          {!done && <span style={{ display: "inline-block", width: "1px", height: "14px", background: "rgba(90,65,155,0.50)", marginLeft: "2px", verticalAlign: "middle", animation: "pulse 1s infinite" }} />}
        </p>
      </div>

      {/* Teknik detaylar */}
      <div>
        <button
          onClick={() => setShowTech(p => !p)}
          style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", cursor: "pointer", padding: "0", marginBottom: showTech ? "14px" : "0" }}
        >
          <p style={{ ...s, marginBottom: 0 }}>Teknik Detaylar</p>
          <ChevronDown style={{ width: "12px", height: "12px", color: "rgba(23,20,42,0.42)", transform: showTech ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
        </button>
        {showTech && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
            {techItems.map(({ label, value }) => (
              <div key={label} style={{ padding: "12px 14px", background: "rgba(255,255,255,0.50)", border: "0.5px solid rgba(23,20,42,0.10)", borderRadius: "6px" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "9.5px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(23,20,42,0.42)", marginBottom: "4px" }}>{label}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 400, color: "rgba(23,20,42,0.65)" }}>{value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ChromaPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showChangelog, setShowChangelog] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setSelectedFile(file); setError(null); setResult(null); setPreviewUrl(URL.createObjectURL(file)); }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setIsLoading(true); setError(null);
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const url = `${API_CONFIG.CHROMA_API_URL}${API_CONFIG.ENDPOINTS.ANALYZE_IMAGE}`;
      const response = await fetch(url, { method: "POST", body: formData });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.detail ?? `Sunucu hatası: ${response.status}`);
      setResult(data as AnalysisResult);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu.");
    } finally { setIsLoading(false); }
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)", fontSize: "9.5px", fontWeight: 500,
    letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(23,20,42,0.42)",
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "52px 40px 88px" }}>

      {/* Başlık */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "48px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 400, color: "#17142a", letterSpacing: "-0.01em", lineHeight: 1.1 }}>
              Chroma
            </h1>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 500, padding: "2px 9px", borderRadius: "3px", background: "rgba(90,65,155,0.08)", color: "rgba(90,65,155,0.60)", letterSpacing: "0.03em" }}>
              v1.2
            </span>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 300, color: "rgba(23,20,42,0.42)", lineHeight: 1.70, maxWidth: "440px" }}>
            Keras tabanlı CNN. Görüntü sınıflandırma ve stil analizi,
            transfer learning ile optimize edilmiş.
          </p>
        </div>

        <button
          onClick={() => setShowChangelog(p => !p)}
          style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 500, color: showChangelog ? "rgba(23,20,42,0.60)" : "rgba(23,20,42,0.38)", background: "rgba(23,20,42,0.05)", border: "0.5px solid rgba(23,20,42,0.12)", borderRadius: "100px", padding: "8px 18px", cursor: "pointer", letterSpacing: "0.02em" }}
        >
          Sürüm Geçmişi
        </button>
      </div>

      {/* Changelog */}
      {showChangelog && (
        <div style={{ marginBottom: "32px", display: "flex", flexDirection: "column", gap: "0" }}>
          {CHANGELOG.map((entry, i) => (
            <div key={entry.version} style={{ padding: "20px 0", borderTop: "0.5px solid rgba(23,20,42,0.10)", ...(i === CHANGELOG.length - 1 ? { borderBottom: "0.5px solid rgba(23,20,42,0.10)" } : {}) }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "18px", color: "#17142a" }}>{entry.version}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "rgba(23,20,42,0.42)" }}>{entry.date}</span>
                {entry.current && <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 500, padding: "1px 7px", borderRadius: "3px", background: "rgba(60,180,100,0.08)", color: "rgba(40,150,80,0.70)" }}>güncel</span>}
                <span style={{ marginLeft: "auto", fontFamily: "var(--font-body)", fontSize: "11px", color: "rgba(23,20,42,0.42)" }}>acc {entry.meta.accuracy} · {entry.meta.epochs} epoch · {entry.meta.inference}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {entry.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", gap: "10px" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "12.5px", color: "rgba(23,20,42,0.42)", flexShrink: 0 }}>—</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "12.5px", fontWeight: 300, color: "rgba(23,20,42,0.45)", lineHeight: 1.65 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload alanı */}
      <div style={{ position: "relative", border: "0.5px dashed rgba(23,20,42,0.16)", borderRadius: "8px", padding: "40px 24px", textAlign: "center", marginBottom: "20px", background: "rgba(255,255,255,0.30)", backdropFilter: "blur(8px)" }}>
        <input type="file" accept="image/*" onChange={handleFileChange} style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", zIndex: 10 }} />
        {previewUrl ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "120px", height: "120px", borderRadius: "6px", overflow: "hidden", border: "0.5px solid rgba(23,20,42,0.10)" }}>
              <img src={previewUrl} alt="Önizleme" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "rgba(90,65,155,0.60)", fontWeight: 500 }}>{selectedFile?.name}</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <UploadCloud style={{ width: "28px", height: "28px", color: "rgba(23,20,42,0.22)" }} />
            <p style={{ fontFamily: "var(--font-body)", fontSize: "13.5px", fontWeight: 400, color: "rgba(23,20,42,0.45)" }}>Görüntü seçmek için tıklayın veya sürükleyin</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "rgba(23,20,42,0.42)" }}>JPEG · PNG · WEBP · Max 5MB</p>
          </div>
        )}
      </div>

      {/* Analiz butonu */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", marginBottom: "28px" }}>
        <button
          onClick={handleAnalyze}
          disabled={!selectedFile || isLoading}
          style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 500, color: "rgba(23,20,42,0.70)", background: selectedFile && !isLoading ? "rgba(23,20,42,0.08)" : "rgba(23,20,42,0.04)", border: "0.5px solid rgba(23,20,42,0.14)", borderRadius: "100px", padding: "12px 40px", cursor: selectedFile && !isLoading ? "pointer" : "not-allowed", letterSpacing: "0.02em", backdropFilter: "blur(10px)", transition: "background 0.2s" }}
        >
          {isLoading ? "Analiz Ediliyor…" : "Analiz Et"}
        </button>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "rgba(23,20,42,0.42)", textAlign: "center" }}>
          Chroma bir yapay zeka modelidir ve hata yapabilir.
        </p>
      </div>

      {/* Hata */}
      {error && (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 18px", background: "rgba(220,50,50,0.06)", border: "0.5px solid rgba(220,50,50,0.18)", borderRadius: "6px", marginBottom: "20px" }}>
          <AlertCircle style={{ width: "16px", height: "16px", color: "rgba(200,50,50,0.70)", flexShrink: 0 }} />
          <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "rgba(200,50,50,0.80)" }}>{error}</p>
        </div>
      )}

      {/* Sonuç */}
      {result && <ResultPanel result={result} />}
    </div>
  );
}