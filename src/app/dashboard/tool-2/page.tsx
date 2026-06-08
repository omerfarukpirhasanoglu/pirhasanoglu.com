"use client";

import { useState, useRef } from "react";
import { AlertCircle, ChevronDown, Upload, Download, FileText, Type, Scissors } from "lucide-react";
import { API_CONFIG } from "@/src/config/api";

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface ChunkInfo { index: number; text: string; n_sentences: number; start_sent: number; end_sent: number; }
interface BoundaryInfo { position: number; probability: number; }
interface ChunkResponse { chunks: ChunkInfo[]; boundaries: BoundaryInfo[]; n_chunks: number; n_sentences: number; threshold_used: number; processing_ms: number; language_detected: string; }
interface ChunkWithEmbedding extends ChunkInfo { embedding: number[]; }
interface FileChunkResponse { filename: string; file_type: string; chunks: ChunkWithEmbedding[]; boundaries: BoundaryInfo[]; n_chunks: number; n_sentences: number; threshold_used: number; processing_ms: number; language_detected: string; }

// ─── Changelog ────────────────────────────────────────────────────────────────

const CHANGELOG = [
  {
    version: "v1.1", date: "Mayıs 2025", current: true,
    items: [
      "Doğrudan doküman inputu desteği eklendi.",
      "Chunk çıktısıyla birlikte embedding üretimi sağlandı; çıktı RAG gibi downstream görevlerde hazır kullanılabiliyor.",
    ],
    meta: { f1: "0.494", threshold: "0.70" },
  },
  {
    version: "v1.0", date: "Mayıs 2025", current: false,
    items: [
      "mE5-small üzerine Cross-Sentence Attention mimarisi kuruldu.",
      "Wikipedia TR/EN ve OpenWebText'ten 52.000+ segment ile eğitildi.",
      "ONNX formatına export edilerek production'a deploy edildi.",
      "Sliding window inference ile uzun doküman desteği sağlandı.",
    ],
    meta: { f1: "0.494", threshold: "0.70" },
  },
];

const EXAMPLE_TEXTS = [
  {
    label: "Teknoloji (TR)",
    text: `Yapay zeka, insan zekasını taklit eden bilgisayar sistemlerini ifade eder. Bu sistemler öğrenme, problem çözme ve dil anlama gibi görevleri yerine getirebilir. Makine öğrenmesi, yapay zekanın en önemli alt dallarından biridir.\n\nYıldızlar ömürlerini tamamladıklarında kütleleri yeterliyse devasa bir süpernova yaşarlar. Bu patlama demir elementine kadar olan atomları oluşturabilir. Bu esnada atomların çekirdeğine uygulanan basınç ile birleşen proton ve elektronlar yoğun bir nötron yıldızını oluşturur. Eğer hala kütle yeterliyse tekrar çöküş yaşanır ve nötron yıldızı da patlar. İşte Altın ve Gümüş gibi ağır elementler de burada oluşur. Bu ikinci patlama sonrası artık elimizde bir karadelik vardır.\n\nİklim değişikliği, Dünya genelinde ciddi sonuçlar doğurmaktadır. Kutup buzulları erimekte, deniz seviyeleri yükselmektedir. Bilim insanları, emisyonların acilen azaltılması gerektiği konusunda hemfikirdir.`,
  },
  {
    label: "Bilim (EN)",
    text: `Quantum mechanics describes the behavior of matter at the atomic and subatomic scale. Unlike classical physics, quantum systems can exist in multiple states simultaneously. This principle, known as superposition, is fundamental to quantum computing.\n\nThe Renaissance was a cultural movement that began in Italy during the 14th century. It spread throughout Europe and marked the transition from the Middle Ages to modernity. Artists like Leonardo da Vinci and Michelangelo defined this era.\n\nArtificial intelligence refers to computer systems that mimic human intelligence. These systems can perform tasks such as learning, problem-solving, and language understanding. Machine learning is one of the most important subfields of artificial intelligence.`,
  },
];

// ─── Chunk Card ───────────────────────────────────────────────────────────────

function ChunkCard({ chunk, boundary, isLast, delay }: { chunk: ChunkInfo; boundary?: BoundaryInfo; isLast: boolean; delay: number; }) {
  const prob = boundary?.probability ?? 0;
  const probPercent = Math.round(prob * 100);

  return (
    <div style={{ animationDelay: `${delay}ms` }}>
      <div style={{ padding: "18px 0", borderTop: "0.5px solid rgba(23,20,42,0.10)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "9.5px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(90,65,155,0.55)" }}>
              Chunk {chunk.index + 1}
            </span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", padding: "1px 7px", borderRadius: "3px", background: "rgba(23,20,42,0.04)", border: "0.5px solid rgba(23,20,42,0.10)", color: "rgba(23,20,42,0.45)" }}>
              {chunk.n_sentences} cümle
            </span>
          </div>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "10.5px", color: "rgba(23,20,42,0.42)" }}>
            {chunk.start_sent}–{chunk.end_sent}
          </span>
        </div>
        <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "14.5px", color: "rgba(23,20,42,0.60)", lineHeight: 1.78 }}>
          {chunk.text}
        </p>
      </div>

      {!isLast && boundary && (
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "6px 0" }}>
          <div style={{ flex: 1, height: "0.5px", background: "rgba(23,20,42,0.42)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Scissors style={{ width: "11px", height: "11px", color: `rgba(90,65,155,${0.2 + prob * 0.6})` }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", color: "rgba(23,20,42,0.42)" }}>{probPercent}%</span>
          </div>
          <div style={{ flex: 1, height: "0.5px", background: "rgba(23,20,42,0.42)" }} />
        </div>
      )}
    </div>
  );
}

// ─── Result Panel ─────────────────────────────────────────────────────────────

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

  const getBoundary = (chunkIndex: number) =>
    result.boundaries.find(b => { const c = result.chunks[chunkIndex]; return b.position === c?.end_sent; });

  return (
    <div style={{ borderTop: "0.5px solid rgba(23,20,42,0.10)", paddingTop: "28px", display: "flex", flexDirection: "column", gap: "0" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "22px", color: "#17142a" }}>
            {result.n_chunks} anlamsal chunk
          </span>
          <div style={{ display: "flex", gap: "4px" }}>
            {result.boundaries.map((b, i) => (
              <div key={i} style={{ width: "5px", height: "5px", borderRadius: "50%", background: `rgba(90,65,155,${0.15 + b.probability * 0.70})` }} title={`%${Math.round(b.probability * 100)}`} />
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowTech(p => !p)}
          style={{ display: "flex", alignItems: "center", gap: "5px", background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <span style={{ fontFamily: "var(--font-body)", fontSize: "9.5px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(23,20,42,0.42)" }}>
            Teknik Detaylar
          </span>
          <ChevronDown style={{ width: "12px", height: "12px", color: "rgba(23,20,42,0.42)", transform: showTech ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
        </button>
      </div>

      {/* Teknik detaylar */}
      {showTech && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "20px" }}>
          {techItems.map(({ label, value }) => (
            <div key={label} style={{ padding: "12px 14px", background: "rgba(255,255,255,0.50)", border: "0.5px solid rgba(23,20,42,0.10)", borderRadius: "6px" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "9.5px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(23,20,42,0.42)", marginBottom: "4px" }}>{label}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 400, color: "rgba(23,20,42,0.65)" }}>{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Chunk listesi */}
      <div>
        {result.chunks.map((chunk, i) => (
          <ChunkCard key={chunk.index} chunk={chunk} boundary={getBoundary(i)} isLast={i === result.chunks.length - 1} delay={i * 60} />
        ))}
        <div style={{ borderTop: "0.5px solid rgba(23,20,42,0.10)", paddingTop: "16px", marginTop: "4px" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "rgba(23,20,42,0.42)" }}>
            mE5-small + Custom Transformer · Seam v1.1
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SeamPage() {
  const [mode, setMode] = useState<"text" | "file">("file");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);
  const [result, setResult] = useState<ChunkResponse | null>(null);
  const [fileResult, setFileResult] = useState<FileChunkResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChunk = async () => {
    if (!text.trim()) return;
    setIsLoading(true); setError(null); setResult(null);
    try {
      const url = `${API_CONFIG.CHUNKER_API_URL}${API_CONFIG.ENDPOINTS.CHUNK_TEXT}`;
      const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: text.trim() }) });
      if (!response.ok) { const err = await response.json().catch(() => ({})); throw new Error(err.detail ?? `Sunucu hatası: ${response.status}`); }
      setResult(await response.json());
    } catch (err: unknown) { setError(err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu."); }
    finally { setIsLoading(false); }
  };

  const handleFileChunk = async () => {
    if (!file) return;
    setIsLoading(true); setError(null); setFileResult(null);
    try {
      const formData = new FormData(); formData.append("file", file);
      const url = `${API_CONFIG.CHUNKER_API_URL}${API_CONFIG.ENDPOINTS.CHUNK_FILE}`;
      const response = await fetch(url, { method: "POST", body: formData });
      if (!response.ok) { const err = await response.json().catch(() => ({})); throw new Error(err.detail ?? `Sunucu hatası: ${response.status}`); }
      setFileResult(await response.json());
    } catch (err: unknown) { setError(err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu."); }
    finally { setIsLoading(false); }
  };

  const downloadJson = (data: FileChunkResponse) => {
    const blob = new Blob([JSON.stringify({ metadata: { filename: data.filename, n_chunks: data.n_chunks, n_sentences: data.n_sentences, language: data.language_detected, threshold: data.threshold_used, processing_ms: data.processing_ms, model: "intfloat/multilingual-e5-small", embedding_dim: 384 }, chunks: data.chunks.map(c => ({ index: c.index, text: c.text, n_sentences: c.n_sentences, embedding: c.embedding })) }, null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `${data.filename.replace(/\.[^.]+$/, "")}_chunks.json`; a.click();
  };

  const isOverLimit = text.length > 50000;

  const btnStyle = (active: boolean): React.CSSProperties => ({
    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "7px",
    padding: "9px 0", borderRadius: "5px", border: "none", cursor: "pointer",
    fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: active ? 500 : 400, letterSpacing: "0.02em",
    background: active ? "rgba(255,255,255,0.60)" : "transparent",
    color: active ? "rgba(23,20,42,0.70)" : "rgba(23,20,42,0.35)",
    transition: "all 0.15s",
  });

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "52px 40px 88px" }}>

      {/* Başlık */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "48px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 400, color: "#17142a", letterSpacing: "-0.01em", lineHeight: 1.1 }}>
              Seam
            </h1>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 500, padding: "2px 9px", borderRadius: "3px", background: "rgba(90,65,155,0.08)", color: "rgba(90,65,155,0.60)", letterSpacing: "0.03em" }}>
              v1.1
            </span>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 300, color: "rgba(23,20,42,0.42)", lineHeight: 1.70, maxWidth: "440px" }}>
            PyTorch Transformer. RAG pipeline'ları için bilgi kaybı olmaksızın anlamsal metin bölütleme.
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
        <div style={{ marginBottom: "32px" }}>
          {CHANGELOG.map((entry, i) => (
            <div key={entry.version} style={{ padding: "20px 0", borderTop: "0.5px solid rgba(23,20,42,0.10)", ...(i === CHANGELOG.length - 1 ? { borderBottom: "0.5px solid rgba(23,20,42,0.10)" } : {}) }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "18px", color: "#17142a" }}>{entry.version}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "rgba(23,20,42,0.42)" }}>{entry.date}</span>
                {entry.current && <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 500, padding: "1px 7px", borderRadius: "3px", background: "rgba(60,180,100,0.08)", color: "rgba(40,150,80,0.70)" }}>güncel</span>}
                <span style={{ marginLeft: "auto", fontFamily: "var(--font-body)", fontSize: "11px", color: "rgba(23,20,42,0.42)" }}>F1 {entry.meta.f1} · threshold {entry.meta.threshold}</span>
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

      {/* Tab */}
      <div style={{ display: "flex", background: "rgba(23,20,42,0.05)", border: "0.5px solid rgba(23,20,42,0.09)", borderRadius: "8px", padding: "3px", gap: "3px", marginBottom: "20px" }}>
        {(["file", "text"] as const).map(m => (
          <button key={m} onClick={() => { setMode(m); setResult(null); setFileResult(null); setError(null); }} style={btnStyle(mode === m)}>
            {m === "file" ? <FileText style={{ width: "13px", height: "13px" }} /> : <Type style={{ width: "13px", height: "13px" }} />}
            {m === "file" ? "Dosya" : "Metin"}
          </button>
        ))}
      </div>

      {/* Metin modu */}
      {mode === "text" && (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(23,20,42,0.42)" }}>Örnek:</span>
            {EXAMPLE_TEXTS.map(ex => (
              <button key={ex.label} onClick={() => { setText(ex.text); setResult(null); setError(null); textareaRef.current?.focus(); }}
                style={{ fontFamily: "var(--font-body)", fontSize: "11px", padding: "3px 10px", borderRadius: "3px", background: "rgba(255,255,255,0.40)", border: "0.5px solid rgba(23,20,42,0.10)", color: "rgba(23,20,42,0.40)", cursor: "pointer" }}>
                {ex.label}
              </button>
            ))}
          </div>

          <div style={{ position: "relative", marginBottom: "16px" }}>
            <textarea
              ref={textareaRef} value={text}
              onChange={e => { setText(e.target.value); setResult(null); setError(null); }}
              placeholder="Metni buraya yapıştırın…" rows={10}
              style={{ width: "100%", resize: "none", borderRadius: "8px", padding: "18px 20px", fontFamily: "var(--font-display)", fontStyle: text ? "italic" : "normal", fontSize: "14.5px", lineHeight: 1.78, color: "rgba(23,20,42,0.65)", background: "rgba(255,255,255,0.35)", border: `0.5px solid ${isOverLimit ? "rgba(200,50,50,0.30)" : "rgba(23,20,42,0.12)"}`, outline: "none", backdropFilter: "blur(8px)" }}
            />
            <span style={{ position: "absolute", bottom: "12px", right: "16px", fontFamily: "var(--font-body)", fontSize: "10.5px", color: isOverLimit ? "rgba(200,50,50,0.70)" : "rgba(23,20,42,0.42)" }}>
              {text.length.toLocaleString()} / 50.000
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            <button onClick={handleChunk} disabled={!text.trim() || isLoading || isOverLimit}
              style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 500, color: "rgba(23,20,42,0.70)", background: text.trim() && !isLoading && !isOverLimit ? "rgba(23,20,42,0.08)" : "rgba(23,20,42,0.04)", border: "0.5px solid rgba(23,20,42,0.14)", borderRadius: "100px", padding: "12px 40px", cursor: text.trim() && !isLoading && !isOverLimit ? "pointer" : "not-allowed", letterSpacing: "0.02em", backdropFilter: "blur(10px)" }}>
              {isLoading ? "Analiz Ediliyor…" : "Chunk'la"}
            </button>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 300, color: "rgba(23,20,42,0.50)", textAlign: "center" }}>Seam bir yapay zeka modelidir ve hata yapabilir.</p>
          </div>

          {error && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 18px", background: "rgba(220,50,50,0.06)", border: "0.5px solid rgba(220,50,50,0.18)", borderRadius: "6px", marginBottom: "20px" }}>
              <AlertCircle style={{ width: "16px", height: "16px", color: "rgba(200,50,50,0.70)", flexShrink: 0 }} />
              <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "rgba(200,50,50,0.80)" }}>{error}</p>
            </div>
          )}
          {result && <ResultPanel result={result} />}
        </>
      )}

      {/* Dosya modu */}
      {mode === "file" && (
        <>
          <input ref={fileInputRef} type="file" accept=".pdf,.docx" className="hidden"
            onChange={e => { const f = e.target.files?.[0] ?? null; setFile(f); setFileResult(null); setError(null); }} />

          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={e => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files?.[0]; if (f && (f.name.endsWith(".pdf") || f.name.endsWith(".docx"))) { setFile(f); setFileResult(null); setError(null); } }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", minHeight: "180px", borderRadius: "8px", border: `0.5px dashed ${isDragging ? "rgba(90,65,155,0.40)" : file ? "rgba(90,65,155,0.25)" : "rgba(23,20,42,0.12)"}`, background: isDragging ? "rgba(90,65,155,0.04)" : "rgba(255,255,255,0.30)", backdropFilter: "blur(8px)", cursor: "pointer", marginBottom: "16px", transition: "all 0.15s" }}
          >
            {file ? (
              <>
                <FileText style={{ width: "26px", height: "26px", color: "rgba(90,65,155,0.55)" }} />
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 500, color: "rgba(23,20,42,0.60)" }}>{file.name}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "rgba(23,20,42,0.42)", marginTop: "3px" }}>{(file.size / (1024 * 1024)).toFixed(2)} MB · {file.name.split(".").pop()?.toUpperCase()}</p>
                </div>
                <button onClick={e => { e.stopPropagation(); setFile(null); setFileResult(null); }}
                  style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "rgba(23,20,42,0.35)", background: "none", border: "0.5px solid rgba(23,20,42,0.12)", borderRadius: "100px", padding: "4px 12px", cursor: "pointer" }}>
                  Değiştir
                </button>
              </>
            ) : (
              <>
                <Upload style={{ width: "24px", height: "24px", color: "rgba(23,20,42,0.42)" }} />
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "13.5px", color: "rgba(23,20,42,0.42)" }}>PDF veya DOCX sürükle ya da tıkla</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "rgba(23,20,42,0.42)", marginTop: "4px" }}>Maks. 10 MB</p>
                </div>
              </>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            <button onClick={handleFileChunk} disabled={!file || isLoading}
              style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 500, color: "rgba(23,20,42,0.70)", background: file && !isLoading ? "rgba(23,20,42,0.08)" : "rgba(23,20,42,0.04)", border: "0.5px solid rgba(23,20,42,0.14)", borderRadius: "100px", padding: "12px 40px", cursor: file && !isLoading ? "pointer" : "not-allowed", letterSpacing: "0.02em", backdropFilter: "blur(10px)" }}>
              {isLoading ? "İşleniyor…" : "Analiz ve Embedding"}
            </button>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "rgba(23,20,42,0.42)" }}>Seam bir yapay zeka modelidir ve hata yapabilir.</p>
          </div>

          {error && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 18px", background: "rgba(220,50,50,0.06)", border: "0.5px solid rgba(220,50,50,0.18)", borderRadius: "6px", marginBottom: "20px" }}>
              <AlertCircle style={{ width: "16px", height: "16px", color: "rgba(200,50,50,0.70)", flexShrink: 0 }} />
              <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "rgba(200,50,50,0.80)" }}>{error}</p>
            </div>
          )}

          {fileResult && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderTop: "0.5px solid rgba(23,20,42,0.10)", marginBottom: "8px" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 500, color: "rgba(90,65,155,0.65)", letterSpacing: "0.04em", marginBottom: "3px" }}>RAG İÇİN HAZIR</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "rgba(23,20,42,0.35)" }}>{fileResult.n_chunks} chunk · {fileResult.n_sentences} cümle · 384-dim embedding</p>
                </div>
                <button onClick={() => downloadJson(fileResult)}
                  style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 500, color: "rgba(23,20,42,0.65)", background: "rgba(23,20,42,0.05)", border: "0.5px solid rgba(23,20,42,0.12)", borderRadius: "100px", padding: "8px 18px", cursor: "pointer" }}>
                  <Download style={{ width: "13px", height: "13px" }} />
                  JSON İndir
                </button>
              </div>
              <ResultPanel result={{ chunks: fileResult.chunks, boundaries: fileResult.boundaries, n_chunks: fileResult.n_chunks, n_sentences: fileResult.n_sentences, threshold_used: fileResult.threshold_used, processing_ms: fileResult.processing_ms, language_detected: fileResult.language_detected }} />
            </div>
          )}
        </>
      )}
    </div>
  );
}