"use client";

import { useState, useRef } from "react";
import { AlertCircle, Scissors, ChevronDown } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";
import { API_CONFIG } from "@/src/config/api";

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface ChunkInfo {
  index: number;
  text: string;
  n_sentences: number;
  start_sent: number;
  end_sent: number;
}

interface BoundaryInfo {
  position: number;
  probability: number;
}

interface ChunkResponse {
  chunks: ChunkInfo[];
  boundaries: BoundaryInfo[];
  n_chunks: number;
  n_sentences: number;
  threshold_used: number;
  processing_ms: number;
  language_detected: string;
}

interface SmartChunkerProps {
  title: string;
  titleBadge?: string;
  description: string;
}

// ─── Örnek metinler ───────────────────────────────────────────────────────────

const EXAMPLE_TEXTS = [
  {
    label: "Teknoloji (TR)",
    text: `Yapay zeka, insan zekasını taklit eden bilgisayar sistemlerini ifade eder. Bu sistemler öğrenme, problem çözme ve dil anlama gibi görevleri yerine getirebilir. Makine öğrenmesi, yapay zekanın en önemli alt dallarından biridir.

Osmanlı İmparatorluğu, 1299 yılında Osman Bey tarafından kuruldu. Altı yüz yılı aşkın bir süre boyunca üç kıtaya yayıldı. İstanbul'un 1453'te fethiyle birlikte dünya tarihin en önemli güçlerinden biri hâline geldi.

İklim değişikliği, dünya genelinde ciddi sonuçlar doğurmaktadır. Kutup buzulları erimekte, deniz seviyeleri yükselmektedir. Bilim insanları, emisyonların acilen azaltılması gerektiği konusunda hemfikirdir.`,
  },
  {
    label: "Bilim (EN)",
    text: `Quantum mechanics describes the behavior of matter at the atomic and subatomic scale. Unlike classical physics, quantum systems can exist in multiple states simultaneously. This principle, known as superposition, is fundamental to quantum computing.

The Renaissance was a cultural movement that began in Italy during the 14th century. It spread throughout Europe and marked the transition from the Middle Ages to modernity. Artists like Leonardo da Vinci and Michelangelo defined this era.

Climate science relies on complex models to predict future temperature changes. Data from satellites, ocean buoys, and weather stations feed into these models. The Intergovernmental Panel on Climate Change synthesizes this research globally.`,
  },
];

// ─── Chunk Kartı ──────────────────────────────────────────────────────────────

function ChunkCard({
  chunk,
  boundary,
  isLast,
  delay,
}: {
  chunk: ChunkInfo;
  boundary?: BoundaryInfo;
  isLast: boolean;
  delay: number;
}) {
  const prob = boundary?.probability ?? 0;
  const probPercent = Math.round(prob * 100);

  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-3 duration-500"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "backwards" }}
    >
      {/* Chunk kutusu */}
      <div
        className="relative rounded-sm overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "0.5px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Sol gradient çizgi */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[2px]"
          style={{
            background: "linear-gradient(180deg, #f75f5f, #ffd44f)",
            opacity: 0.6 + chunk.index * 0.05,
          }}
        />

        <div className="pl-5 pr-5 py-4">
          {/* Chunk header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <span
                className="font-mono text-[11px] tracking-[0.22em] uppercase"
                style={{
                  background: "linear-gradient(90deg, #f75f5f, #ffd44f)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Chunk {chunk.index + 1}
              </span>
              <span
                className="font-mono text-[10px] px-1.5 py-0.5 rounded-sm"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "0.5px solid rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                {chunk.n_sentences} cümle
              </span>
            </div>

            <span className="font-mono text-[11px]" style={{ color: "rgba(255,255,255,0.2)" }}>
              {chunk.start_sent}–{chunk.end_sent}
            </span>
          </div>

          {/* Chunk metni */}
          <p
            className="text-[14.5px] leading-[1.75]"
            style={{
              color: "rgba(255,255,255,0.62)",
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
            }}
          >
            {chunk.text}
          </p>
        </div>
      </div>

      {/* Boundary göstergesi — son chunk değilse */}
      {!isLast && boundary && (
        <div className="flex items-center gap-3 py-2 px-1">
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
          <div className="flex items-center gap-2">
            <Scissors
              className="w-3 h-3"
              style={{
                color: `rgba(247, 95, 95, ${0.3 + prob * 0.7})`,
              }}
            />
            <div className="flex items-center gap-1.5">
              <div
                className="rounded-full"
                style={{
                  width: `${Math.max(24, probPercent * 0.8)}px`,
                  height: "2px",
                  background: `linear-gradient(90deg, #f75f5f ${probPercent}%, rgba(255,255,255,0.08) ${probPercent}%)`,
                }}
              />
              <span className="font-mono text-[10px]" style={{ color: "rgba(255,255,255,0.22)" }}>
                {probPercent}%
              </span>
            </div>
          </div>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
        </div>
      )}
    </div>
  );
}

// ─── Sonuç Paneli ─────────────────────────────────────────────────────────────

function ResultPanel({ result }: { result: ChunkResponse }) {
  const [showTech, setShowTech] = useState(false);

  const techItems = [
    { label: "İşlem", value: `${result.processing_ms} ms` },
    { label: "Cümle", value: `${result.n_sentences}` },
    { label: "Chunk", value: `${result.n_chunks}` },
    { label: "Threshold", value: result.threshold_used.toFixed(2) },
    { label: "Dil", value: result.language_detected.toUpperCase() },
    { label: "Sınır", value: `${result.boundaries.length}` },
  ];

  // Her chunk için boundary bul
  const getBoundary = (chunkIndex: number) =>
    result.boundaries.find((b) => {
      const chunk = result.chunks[chunkIndex];
      return b.position === chunk?.end_sent;
    });

  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-4 duration-500 rounded-sm overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "0.5px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Header şerit */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}
      >
        <span
          className="font-mono text-[13px] tracking-[0.22em] uppercase"
          style={{
            background: "linear-gradient(90deg, #f75f5f, #ffd44f)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {result.n_chunks} Anlamsal Chunk
        </span>

        {/* Probability ısı haritası */}
        <div className="flex items-center gap-1">
          {result.boundaries.map((b, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: "6px",
                height: "6px",
                background: `rgba(247, 95, 95, ${0.2 + b.probability * 0.8})`,
              }}
              title={`Sınır ${i + 1}: ${Math.round(b.probability * 100)}%`}
            />
          ))}
        </div>
      </div>

      {/* Chunk listesi */}
      <div className="px-6 py-5 flex flex-col gap-0">
        {result.chunks.map((chunk, i) => (
          <ChunkCard
            key={chunk.index}
            chunk={chunk}
            boundary={getBoundary(i)}
            isLast={i === result.chunks.length - 1}
            delay={i * 80}
          />
        ))}
      </div>

      {/* Teknik Detaylar Toggle */}
      <button
        onClick={() => setShowTech((p) => !p)}
        className="w-full flex items-center justify-between px-6 py-4 transition-colors duration-200 hover:bg-white/2"
        style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}
      >
        <span
          className="font-mono text-[13px] tracking-[0.2em] uppercase"
          style={{
            background: "linear-gradient(90deg, #f75f5f, #ffd44f)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Teknik Detaylar
        </span>
        <ChevronDown
          className="w-4 h-4 text-white/25 transition-transform duration-250"
          style={{ transform: showTech ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {showTech && (
        <div className="grid grid-cols-3 gap-2.5 px-6 pb-5 animate-in slide-in-from-top-2 duration-200">
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

      {/* Footer */}
      <div
        className="flex items-center gap-5 px-6 py-4"
        style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/28">Model</span>
          <span className="font-mono text-[13px] text-white/42">mE5-small + CSA</span>
        </div>
        <div style={{ width: "0.5px", height: "28px", background: "rgba(255,255,255,0.07)" }} />
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/28">Format</span>
          <span className="font-mono text-[13px] text-white/42">ONNX Runtime</span>
        </div>
        <div style={{ width: "0.5px", height: "28px", background: "rgba(255,255,255,0.07)" }} />
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/28">Dil</span>
          <span className="font-mono text-[13px] text-white/42">TR · EN</span>
        </div>
      </div>
    </div>
  );
}

// ─── Ana Bileşen ──────────────────────────────────────────────────────────────

export default function SmartChunker({ title, titleBadge, description }: SmartChunkerProps) {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ChunkResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChunk = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CHUNK_TEXT}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim() }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.detail ?? `Sunucu hatası: ${response.status}`);
      }

      const data: ChunkResponse = await response.json();
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadExample = (exampleText: string) => {
    setText(exampleText);
    setResult(null);
    setError(null);
    textareaRef.current?.focus();
  };

  const charCount = text.length;
  const isOverLimit = charCount > 50000;

  return (
    <div className="w-full flex flex-col gap-6">

      {/* Başlık */}
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
      </div>

      {/* Ana layout */}
      <div className="flex flex-col gap-4">
        <Card className="flex flex-col gap-5 bg-surface/40">

          {/* Örnek metinler */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/25 mr-1">
              Örnek:
            </span>
            {EXAMPLE_TEXTS.map((ex) => (
              <button
                key={ex.label}
                onClick={() => loadExample(ex.text)}
                className="font-mono text-[11px] px-2.5 py-1 rounded-sm transition-all duration-200 hover:bg-white/8"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "0.5px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                {ex.label}
              </button>
            ))}
          </div>

          {/* Metin girişi */}
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setResult(null);
                setError(null);
              }}
              placeholder="Metni buraya yapıştırın..."
              rows={10}
              className="w-full resize-none rounded-sm px-5 py-4 text-[14.5px] leading-[1.8] transition-all duration-200 focus:outline-none placeholder:text-white/15"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `0.5px solid ${isOverLimit ? "rgba(247,95,95,0.4)" : "rgba(255,255,255,0.08)"}`,
                color: "rgba(255,255,255,0.72)",
                fontFamily: "'Playfair Display', serif",
                fontStyle: text ? "italic" : "normal",
              }}
            />

            {/* Karakter sayacı */}
            <div className="absolute bottom-3 right-4">
              <span
                className="font-mono text-[11px]"
                style={{ color: isOverLimit ? "#f75f5f" : "rgba(255,255,255,0.18)" }}
              >
                {charCount.toLocaleString()} / 50.000
              </span>
            </div>
          </div>

          {/* Analiz butonu */}
          <div className="flex justify-center">
            <Button
              onClick={handleChunk}
              disabled={!text.trim() || isLoading || isOverLimit}
              isLoading={isLoading}
              className="px-20 min-w-50"
            >
              {isLoading ? "Analiz Ediliyor..." : "Chunk'la"}
            </Button>
          </div>

          {/* Hata */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-sm flex items-center gap-3 text-red-400 text-sm animate-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Sonuç */}
          {result && <ResultPanel result={result} />}

        </Card>
      </div>
    </div>
  );
}
