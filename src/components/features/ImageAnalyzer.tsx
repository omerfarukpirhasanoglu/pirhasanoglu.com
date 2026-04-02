"use client";

import { useState, useEffect, useRef } from "react";
import { UploadCloud, AlertCircle, History } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";
import { API_CONFIG } from "@/src/config/api";

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface DigerOlasilik {
  stil: string;
  guven_yuzdesi: number;
}

interface StilSonucu {
  tahmin: string;
  guven: number;
  diger_olasiliklar: DigerOlasilik[];
}

interface DominantRenk {
  rgb: number[];
  yuzde: number;
  isim: string;
  notr: boolean;
}

interface GenelIstatistikler {
  ort_doygunluk: number;
  ort_parlaklik: number;
  renk_cesitliligi: number;
  notr_oran: number;
}

interface UyumAnalizi {
  tur: string;
  aciklama: string;
  skor: number;
}

interface RenkAnalizi {
  dominant_colors: DominantRenk[];
  genel_istatistikler: GenelIstatistikler;
  uyum_analizi: UyumAnalizi;
  stil_tahmini: string;
}

interface AnalysisResult {
  status: string;
  dosya_boyutu_mb: number;
  cikarim_suresi_ms: number;
  stil: StilSonucu;
  renk_analizi: RenkAnalizi;
}

interface ImageAnalyzerProps {
  title: string;
  titleBadge?: string;
  description: string;
}

// ─── Changelog ────────────────────────────────────────────────────────────────

const CHANGELOG = [
  {
    version: "v1.2",
    date: "Mart 2025",
    current: true,
    items: [
      "Chroma artık .keras formatı yerine onnx formatında, doğruluğu değişmeksizin boyutu %80 azaldı.",
      "Model onnx sayesinde büyük bağımlılıklarından kurtuldu ve çıkarım süresi dramatik şekilde kısaldı.",
      "Çok daha detaylı renk/ton analizi ve yapıcı geri dönüşler eklendi.",
      "Train pipeline güncellenerek daha yüksek doğruluk hedefi için yeniden eğitildi.",
    ],
    meta: { accuracy: "93.85%", epochs: "20", inference: "-1500ms" },
  },
  {
    version: "v1.1",
    date: "Mart 2025",
    current: false,
    items: [
      "Chroma'nın veri seti kaynaklı, belirli sınıflara meyletme sorunu çözüldü.",
      "Preprocessing yükü GPU'ya kaydırılarak CPU darboğazı giderildi.",
      "Dominant palet çıkarımı ~%13 oranında iyileştirildi.",
      "Backend tarafı optimize edilerek yanıt süresi yaklaşık %25 azaltıldı.",
    ],
    meta: { accuracy: "87.9%", epochs: "20", inference: "-6000ms" },
  },
  {
    version: "v1.0",
    date: "Şubat 2025",
    current: false,
    items: [
      "İlk CNN mimarisi kuruldu.",
      "Veri ön işleme ve augmentation pipeline'ı eklendi.",
      "2 fazlı transfer learning pipeline'ı uygulanarak eğitildi.",
      "Her faz için özel parametrelerle fine tuning uygulandı.",
      "Renk analizi ve dominant palet çıkarımı eklendi.",
    ],
    meta: { accuracy: "87.9%", epochs: "20", inference: "~8100ms" },
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function rgbToCss(rgb: number[]): string {
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

// ─── Typewriter Hook ──────────────────────────────────────────────────────────

function useTypewriter(text: string, trigger: boolean, speed = 22) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setDisplayed("");
    setDone(false);
    let i = 0;
    timerRef.current = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timerRef.current!);
        setDone(true);
      }
    }, speed);
  };

  useEffect(() => {
    if (trigger && text) {
      const timeout = setTimeout(start, 400);
      return () => clearTimeout(timeout);
    }
  }, [trigger, text]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return { displayed, done, restart: start };
}

// ─── Result Panel ─────────────────────────────────────────────────────────────

function ResultPanel({ result }: { result: AnalysisResult }) {
  const [showTech, setShowTech] = useState(false);
  const { displayed, done, restart } = useTypewriter(
    result.renk_analizi.uyum_analizi.aciklama,
    true
  );

  const techItems = [
    { label: "Çıkarım", value: `${result.cikarim_suresi_ms} ms` },
    { label: "Dosya", value: `${result.dosya_boyutu_mb} MB` },
    { label: "Doygunluk", value: `%${result.renk_analizi.genel_istatistikler.ort_doygunluk}` },
    { label: "Parlaklık", value: `%${result.renk_analizi.genel_istatistikler.ort_parlaklik}` },
    { label: "Çeşitlilik", value: `${result.renk_analizi.genel_istatistikler.renk_cesitliligi}` },
    { label: "Nötr", value: `%${result.renk_analizi.genel_istatistikler.notr_oran}` },
  ];

  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-4 duration-500 rounded-sm overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "0.5px solid rgba(255,255,255,0.09)",
      }}
    >
      {/* Dominant renk palet şeridi */}
      <div className="flex" style={{ height: "6px" }}>
        {result.renk_analizi.dominant_colors.map((renk, i) => (
          <div
            key={i}
            style={{
              flex: renk.yuzde,
              backgroundColor: rgbToCss(renk.rgb),
            }}
          />
        ))}
      </div>

      <div className="flex">

        {/* ── Sol Kolon ── */}
        <div
          className="flex flex-col p-7"
          style={{
            flex: "1.15",
            borderRight: "0.5px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Stil tahmini başlık */}
          <span
            className="font-mono text-[11px] tracking-[0.2em] uppercase mb-2"
            style={{
              background: "linear-gradient(90deg, #f75f5f, #ffd44f)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Stil Tahmini
          </span>

          {/* Stil adı + güven */}
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <p
              className="text-[38px] font-bold text-white leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {result.stil.tahmin}
            </p>
            <div className="flex flex-col items-end pt-2 shrink-0">
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/25 mb-1">
                güven
              </span>
              <span
                className="font-mono text-2xl font-medium"
                style={{
                  background: "linear-gradient(90deg, #f75f5f, #ffd44f)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                %{result.stil.guven}
              </span>
            </div>
          </div>

          <p
            className="text-[15px] text-white/30 mb-5"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
            }}
          >
            {result.renk_analizi.stil_tahmini}
          </p>

          {/* Divider */}
          <div style={{ height: "0.5px", background: "rgba(255,255,255,0.06)", margin: "0 0 16px" }} />

          {/* Diğer olasılıklar */}
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/28 mb-3">
            Diğer Olasılıklar
          </span>
          <div className="flex flex-col">
            {result.stil.diger_olasiliklar.map((item) => (
              <div
                key={item.stil}
                className="flex items-center gap-3 py-2"
                style={{ borderBottom: "0.5px solid rgba(255,255,255,0.05)" }}
              >
                <span className="font-mono text-[13px] text-white/38 w-24 shrink-0">
                  {item.stil}
                </span>
                <div
                  className="flex-1 rounded-full overflow-hidden"
                  style={{ height: "2px", background: "rgba(255,255,255,0.07)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.guven_yuzdesi}%`,
                      background: "rgba(255,255,255,0.22)",
                    }}
                  />
                </div>
                <span className="font-mono text-[12px] text-white/28 w-8 text-right shrink-0">
                  %{item.guven_yuzdesi}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Sağ Kolon ── */}
        <div className="flex flex-col p-7" style={{ flex: "1" }}>

          {/* Uyum skoru başlık */}
          <span
            className="font-mono text-[11px] tracking-[0.2em] uppercase mb-2"
            style={{
              background: "linear-gradient(90deg, #f75f5f, #ffd44f)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Uyum Skoru
          </span>

          {/* Skor */}
          <div className="flex items-baseline gap-2 mb-2">
            <span
              className="font-bold text-white leading-none"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "68px" }}
            >
              {result.renk_analizi.uyum_analizi.skor}
            </span>
            <span className="font-mono text-sm text-white/22">/ 100</span>
          </div>

          {/* Uyum türü badge */}
          <div
            className="inline-block self-start mb-5 px-3 py-1 rounded-sm"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "0.5px solid rgba(247,95,95,0.3)",
            }}
          >
            <span
              className="font-mono text-[12px] tracking-widest"
              style={{
                background: "linear-gradient(90deg, #f75f5f, #ffd44f)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {result.renk_analizi.uyum_analizi.tur.toUpperCase()}
            </span>
          </div>

          {/* Divider */}
          <div style={{ height: "0.5px", background: "rgba(255,255,255,0.06)", margin: "0 0 16px" }} />

          {/* Dominant palet başlık */}
          <span
            className="font-mono text-[11px] tracking-[0.2em] uppercase mb-3"
            style={{
              background: "linear-gradient(90deg, #f75f5f, #ffd44f)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Dominant Palet
          </span>

          {/* Swatchlar */}
          <div className="flex gap-4 flex-wrap">
            {result.renk_analizi.dominant_colors.map((renk, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div
                  className="w-9 h-9 rounded-full shrink-0"
                  style={{
                    backgroundColor: rgbToCss(renk.rgb),
                    border: "0.5px solid rgba(255,255,255,0.12)",
                  }}
                />
                <span className="font-mono text-[11px] text-white/28 text-center leading-tight max-w-13">
                  {renk.isim}
                </span>
                <span className="font-mono text-[11px] text-white/22">
                  %{renk.yuzde}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Analiz Yorumu ── */}
      <div className="px-7 pb-6">
        <div
          style={{ height: "0.5px", background: "rgba(255,255,255,0.06)", margin: "0 0 14px" }}
        />
        <div className="flex items-center justify-between mb-3">
          <span
            className="font-mono text-[11px] tracking-[0.2em] uppercase"
            style={{
              background: "linear-gradient(90deg, #f75f5f, #ffd44f)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Analiz Yorumu
          </span>
          <button
            onClick={restart}
            className="font-mono text-[11px] tracking-[0.15em] uppercase text-white/22 hover:text-white/50 transition-colors duration-200 px-3 py-1.5 rounded-sm"
            style={{ border: "0.5px solid rgba(255,255,255,0.09)" }}
          >
            ↺ tekrar oynat
          </button>
        </div>

        {/* Typewriter kutusu */}
        <div
          className="relative overflow-hidden rounded-sm px-5 py-4"
          style={{
            background: "rgba(255,255,255,0.025)",
            borderLeft: "2px solid #f75f5f",
            borderRight: "2px solid #ffd44f",
          }}
        >
          <div
            className="absolute inset-y-0 left-0 w-36 pointer-events-none"
            style={{ background: "linear-gradient(90deg, rgba(247,95,95,0.11), transparent)" }}
          />
          <div
            className="absolute inset-y-0 right-0 w-36 pointer-events-none"
            style={{ background: "linear-gradient(270deg, rgba(255,212,79,0.09), transparent)" }}
          />
          <p
            className="relative z-10 text-[15px] text-white/52 leading-[1.8] italic"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {displayed}
            {!done && (
              <span
                className="inline-block w-px h-3.75 ml-px align-middle animate-pulse"
                style={{ background: "#ffd44f" }}
              />
            )}
          </p>
        </div>
      </div>

      {/* ── Teknik Detaylar Toggle ── */}
      <button
        onClick={() => setShowTech((p) => !p)}
        className="w-full flex items-center justify-between px-7 py-4 transition-colors duration-200 hover:bg-white/2"
        style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}
      >
        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/28">
          Teknik Detaylar
        </span>
        <span
          className="text-[13px] text-white/25 transition-transform duration-250"
          style={{ transform: showTech ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block" }}
        >
          ▾
        </span>
      </button>

      {showTech && (
        <div className="grid grid-cols-3 gap-2.5 px-7 pb-5 animate-in slide-in-from-top-2 duration-200">
          {techItems.map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col gap-1.5 rounded-sm p-3.5"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "0.5px solid rgba(255,255,255,0.07)",
              }}
            >
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/28">
                {label}
              </span>
              <span className="font-mono text-[15px] text-white/60">{value}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Footer ── */}
      <div
        className="flex items-center gap-5 px-7 py-4"
        style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/28">Sezon</span>
          <span className="font-mono text-[15px] text-white/42">
            {result.renk_analizi.stil_tahmini}
          </span>
        </div>
        <div style={{ width: "0.5px", height: "28px", background: "rgba(255,255,255,0.07)" }} />
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/28">Model</span>
          <span className="font-mono text-[15px] text-white/42">Chroma v1.2</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ImageAnalyzer({ title, titleBadge, description }: ImageAnalyzerProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showChangelog, setShowChangelog] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      setResult(null);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ANALYZE_IMAGE}`;
      const response = await fetch(url, { method: "POST", body: formData });
      if (!response.ok) throw new Error(`Sunucu hatası: ${response.status}`);
      const data: AnalysisResult = await response.json();
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">

      {/* ── Başlık ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-100 flex items-center gap-3">
            {title}
            {titleBadge && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-sm bg-accent/10 border border-accent/20 text-accent">
                {titleBadge}
              </span>
            )}
          </h2>
          <p className="text-textMuted mt-1">{description}</p>
        </div>

        <button
          onClick={() => setShowChangelog(!showChangelog)}
          className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-mono transition-all duration-200 text-[#1a0808] font-semibold"
          style={{
            background: "linear-gradient(135deg, #f75f5f, #ffd44f)",
            opacity: showChangelog ? 0.75 : 1,
          }}
        >
          <History className="w-3.5 h-3.5" />
          ChangeLog
          <span className={`transition-transform duration-200 ${showChangelog ? "rotate-180" : ""}`}>
            ▾
          </span>
        </button>
      </div>

      {/* ── Ana layout ── */}
      <div className="flex gap-4 items-start overflow-hidden">

        {/* Analiz alanı */}
        <div className="flex-1 min-w-0">
          <Card className="flex flex-col gap-6 bg-surface/40">

            {/* Yükleme alanı */}
            <div className="relative border-2 border-dashed border-white/10 rounded-sm p-8 text-center hover:border-accent/40 transition-colors duration-300 bg-background/50">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              {previewUrl ? (
                <div className="flex flex-col items-center gap-4 animate-in zoom-in-95 duration-300">
                  <div className="w-32 h-32 relative rounded-sm overflow-hidden border border-white/10 shadow-lg">
                    <img src={previewUrl} alt="Önizleme" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-sm text-accent font-medium">{selectedFile?.name}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                    <UploadCloud className="w-6 h-6 text-textMuted" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-200">
                      Görüntü seçmek için tıklayın veya sürükleyin
                    </p>
                    <p className="text-xs text-textMuted mt-1">JPEG, PNG, WEBP (Max 5MB)</p>
                  </div>
                </div>
              )}
            </div>

            {/* Analiz butonu */}
            <div className="flex justify-center">
              <Button
                onClick={handleAnalyze}
                disabled={!selectedFile || isLoading}
                isLoading={isLoading}
                className="px-20 min-w-50"
              >
                {isLoading ? "Analiz Ediliyor..." : "Analiz Et"}
              </Button>
            </div>

            {/* Hata */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-sm flex items-center gap-3 text-red-400 text-sm animate-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Sonuç paneli */}
            {result && <ResultPanel result={result} />}

          </Card>
        </div>

        {/* ── Changelog paneli ── */}
        <div
          className={`shrink-0 transition-all duration-300 ${showChangelog ? "w-72 opacity-100" : "w-0 opacity-0 pointer-events-none"}`}
          style={{ overflow: "hidden" }}
        >
          <div
            className={`w-72 transition-transform duration-300 border border-white/[0.07] rounded-sm bg-surface/40 ${showChangelog ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="px-4 py-3 border-b border-white/6 flex items-center gap-2">
              <span
                className="text-xs font-mono tracking-widest uppercase"
                style={{
                  background: "linear-gradient(90deg, #f75f5f, #ffd44f)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Sürüm Geçmişi
              </span>
            </div>

            <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
              {CHANGELOG.map((entry, i) => (
                <div
                  key={entry.version}
                  className={`px-4 py-4 ${i < CHANGELOG.length - 1 ? "border-b border-white/4" : ""}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-sm font-semibold font-mono"
                      style={{
                        background: "linear-gradient(90deg, #f75f5f, #ffd44f)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {entry.version}
                    </span>
                    <span className="text-xs text-[#444] font-mono">{entry.date}</span>
                    {entry.current && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-green-500/8 border border-green-500/20 text-green-400">
                        güncel
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5 mb-3">
                    {entry.items.map((item, j) => (
                      <div key={j} className="flex items-start gap-2 text-xs text-[#666] leading-relaxed">
                        <span className="text-[#333] mt-0.5 shrink-0">—</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 flex-wrap pt-2 border-t border-white/4">
                    <span className="text-[10px] font-mono text-[#444]">
                      acc: <span className="text-accent">{entry.meta.accuracy}</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#444]">
                      epochs: <span className="text-accent">{entry.meta.epochs}</span>
                    </span>
                    {entry.meta.inference && (
                      <span className="text-[10px] font-mono text-[#444]">
                        inference: <span className="text-accent">{entry.meta.inference}</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
