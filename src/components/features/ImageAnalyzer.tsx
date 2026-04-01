"use client";

import { useState } from "react";
import { UploadCloud, AlertCircle, Clock, ChevronDown, ChevronUp, History } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";
import { API_CONFIG } from "@/src/config/api";

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

const CHANGELOG = [
  {
    version: "v1.2",
    date: "Mart2025",
    current: true,
    items: [
      "Chroma artık .keras formatı yerine onnx formatında, doğruluğu değişmeksizin boyutu %80 azaldı.",
      "Model onnx sayesinde büyük bağımlılılarından kurtuldu ve çıkarım süresi dramatik şekilde kısaldı.",
      "Çok daha detaylı renk/ton analizi ve yapıcı geri dönüşler eklendi.",
      "Train pipeline güncellenerek daha yüksek doğruluk hedefi için yeniden eğitildi.",
    ],
    meta: { accuracy: "93.85%", epochs: "20", inference: "-1500ms" },
  },
  {
    version: "v1.1",
    date: "Mart2025",
    current: false,
    items: [
      "Chroma'nın veri seti kaynaklı, belirli sınıflara meyletme sorunu çözüldü.",
      "Preprocessing yükü GPU ya kaydırılarak CPU darboğazı giderildi.",
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
      "İlk CNN mimarisi kuruldu",
      "Veri ön işleme ve augmentation pipeline'ı eklendi.",
      "2 fazlı transfer learning pipeline'ı uygulanarak eğitildi.",
      "Her faz için özel parametrelerle fine tuning uygulandı.",
      "Renk analizi ve dominant palet çıkarımı eklendi.",
    ],
    meta: { accuracy: "87.9%", epochs: "20", inference: "~8100ms" },
  },
];

function getGuvenRengi(guven: number): string {
  if (guven >= 75) return "text-green-400";
  if (guven >= 50) return "text-[#f75f5f]";
  return "text-red-400";
}

function rgbToCss(rgb: number[]): string {
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

export default function ImageAnalyzer({ title, titleBadge, description }: ImageAnalyzerProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      setResult(null);
      setShowDetails(false);
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

      if (!response.ok) {
        throw new Error(`Sunucu hatası: ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      setResult(data);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Bilinmeyen bir hata oluştu.");
      }
    } finally {
      setIsLoading(false);
    }
  };

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

        {/* Changelog toggle butonu */}
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
          <span className={`transition-transform duration-200 ${showChangelog ? "rotate-180" : ""}`}>▾</span>
        </button>
      </div>

      {/* Ana layout */}
      <div className="flex gap-4 items-start overflow-hidden">

        {/* Analiz alanı */}
        <div className="flex-1 min-w-0">
          <Card className="flex flex-col gap-6 bg-surface/40">

            {/* Yükleme Alanı */}
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
                    <p className="text-sm font-medium text-gray-200">Görüntü seçmek için tıklayın veya sürükleyin</p>
                    <p className="text-xs text-textMuted mt-1">JPEG, PNG, WEBP (Max 5MB)</p>
                  </div>
                </div>
              )}
            </div>

            {/* Buton */}
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

            {/* Sonuç */}
            {result && (
              <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* STİL BLOĞU */}
                <div className="relative overflow-hidden rounded-sm border border-white/8 bg-white/3">
                  {/* Arka plan accent şeridi */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0.75"
                    style={{ background: "linear-gradient(180deg, #f75f5f, #ffd44f)" }}
                  />
                  <div className="pl-5 pr-5 pt-5 pb-5">
                    {/* Üst satır*/}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-white/30">Stil Tahmini</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-white/30">güven</span>
                        <span
                          className="text-xs font-mono font-semibold tabular-nums"
                          style={{
                            color: result.stil.guven >= 75 ? "#4ade80" : result.stil.guven >= 50 ? "#f75f5f" : "#f87171"
                          }}
                        >
                          %{result.stil.guven}
                        </span>
                      </div>
                    </div>

                    {/* Stil adı */}
                    <p className="text-2xl font-bold tracking-tight text-white mb-3">{result.stil.tahmin}</p>

                    {/* Güven barı */}
                    <div className="relative h-0.5 w-full bg-white/8 rounded-full overflow-hidden mb-4">
                      <div
                        className="absolute left-0 top-0 bottom-0 rounded-full transition-all duration-700"
                        style={{
                          width: `${result.stil.guven}%`,
                          background: result.stil.guven >= 75
                            ? "linear-gradient(90deg, #f75f5f, #ffd44f)"
                            : result.stil.guven >= 50
                            ? "linear-gradient(90deg, #ffd44f, #f75f5f)"
                            : "#f87171",
                        }}
                      />
                    </div>

                    {/* Diğer olasılıklar */}
                    {result.stil.diger_olasiliklar.length > 0 && (
                      <div className="flex flex-col gap-2">
                        {result.stil.diger_olasiliklar.map((item) => (
                          <div key={item.stil} className="flex items-center gap-3">
                            <span className="text-[11px] text-white/40 w-24 shrink-0">{item.stil}</span>
                            <div className="flex-1 h-px bg-white/6 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-white/20 rounded-full"
                                style={{ width: `${item.guven_yuzdesi}%` }}
                              />
                            </div>
                            <span className="text-[11px] font-mono text-white/30 shrink-0">%{item.guven_yuzdesi}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* PALET + UYUM BLOĞU */}
                <div className="rounded-sm border border-white/8 bg-white/3 overflow-hidden">

                  {/*Palet şeridi*/}
                  <div className="flex h-16">
                    {result.renk_analizi.dominant_colors.map((renk, index) => (
                      <div
                        key={index}
                        className="relative flex-1 group cursor-default"
                        style={{ backgroundColor: rgbToCss(renk.rgb), flexBasis: `${renk.yuzde}%` }}
                      >
                        {/* Hover tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 rounded bg-black/80 text-[10px] font-mono text-white/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-10">
                          {renk.isim} · %{renk.yuzde}
                        </div>
                        {renk.notr && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[8px] tracking-widest text-white/20 font-mono uppercase">nötr</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Palet isim etiketi */}
                  <div className="px-5 pt-3 pb-1 flex gap-2 flex-wrap">
                    {result.renk_analizi.dominant_colors.map((renk, index) => (
                      <div key={index} className="flex items-center gap-1.5">
                        <div
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: rgbToCss(renk.rgb) }}
                        />
                        <span className="text-[10px] text-white/35 font-mono capitalize">{renk.isim}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mx-5 my-4 h-px bg-white/6" />

                  {/*Uyum skoru*/}
                  <div className="px-5 pb-5">
                    <div className="flex items-start gap-5">

                      {/*Skor göstergesi*/}
                      <div className="shrink-0 flex flex-col items-center gap-1">
                        <div
                          className="relative w-16 h-16 flex items-center justify-center rounded-sm"
                          style={{
                            background: result.renk_analizi.uyum_analizi.skor >= 80
                              ? "rgba(74,222,128,0.08)"
                              : result.renk_analizi.uyum_analizi.skor >= 65
                              ? "rgba(247,95,95,0.08)"
                              : "rgba(248,113,113,0.08)",
                            border: `1px solid ${
                              result.renk_analizi.uyum_analizi.skor >= 80
                                ? "rgba(74,222,128,0.25)"
                                : result.renk_analizi.uyum_analizi.skor >= 65
                                ? "rgba(247,95,95,0.25)"
                                : "rgba(248,113,113,0.25)"
                            }`,
                          }}
                        >
                          {/* Köşe süslemeleri */}
                          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l"
                            style={{ borderColor: result.renk_analizi.uyum_analizi.skor >= 80 ? "rgba(74,222,128,0.6)" : result.renk_analizi.uyum_analizi.skor >= 65 ? "rgba(247,95,95,0.6)" : "rgba(248,113,113,0.6)" }}
                          />
                          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r"
                            style={{ borderColor: result.renk_analizi.uyum_analizi.skor >= 80 ? "rgba(74,222,128,0.6)" : result.renk_analizi.uyum_analizi.skor >= 65 ? "rgba(247,95,95,0.6)" : "rgba(248,113,113,0.6)" }}
                          />
                          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l"
                            style={{ borderColor: result.renk_analizi.uyum_analizi.skor >= 80 ? "rgba(74,222,128,0.6)" : result.renk_analizi.uyum_analizi.skor >= 65 ? "rgba(247,95,95,0.6)" : "rgba(248,113,113,0.6)" }}
                          />
                          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r"
                            style={{ borderColor: result.renk_analizi.uyum_analizi.skor >= 80 ? "rgba(74,222,128,0.6)" : result.renk_analizi.uyum_analizi.skor >= 65 ? "rgba(247,95,95,0.6)" : "rgba(248,113,113,0.6)" }}
                          />
                          <span
                            className="text-2xl font-bold tabular-nums leading-none"
                            style={{
                              color: result.renk_analizi.uyum_analizi.skor >= 80
                                ? "#4ade80"
                                : result.renk_analizi.uyum_analizi.skor >= 65
                                ? "#f75f5f"
                                : "#f87171",
                            }}
                          >
                            {result.renk_analizi.uyum_analizi.skor}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-white/20 tracking-widest">/100</span>
                      </div>

                      {/* Sağ taraf: tür + çizgi + açıklama */}
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="text-[10px] font-mono tracking-[0.15em] uppercase"
                            style={{
                              color: result.renk_analizi.uyum_analizi.skor >= 80
                                ? "#4ade80"
                                : result.renk_analizi.uyum_analizi.skor >= 65
                                ? "#f75f5f"
                                : "#f87171",
                            }}
                          >
                            {result.renk_analizi.uyum_analizi.tur}
                          </span>
                          <div className="flex-1 h-px bg-white/6" />
                        </div>
                        <p className="text-[13px] text-white/55 leading-relaxed">
                          {result.renk_analizi.uyum_analizi.aciklama}
                        </p>
                      </div>
                    </div>

                    {/* Sezon şeridi */}
                    <div className="mt-4 flex items-center gap-3">
                      <span className="text-[9px] font-mono tracking-[0.18em] uppercase text-white/20 shrink-0">Sezon</span>
                      <div className="flex-1 h-px bg-white/6" />
                      <span className="text-[12px] text-white/45 text-right max-w-[75%] leading-snug">
                        {result.renk_analizi.stil_tahmini}
                      </span>
                    </div>
                  </div>
                </div>

                {/* TEKNİK DETAYLAR */}
                <div className="rounded-sm border border-white/6 overflow-hidden">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full flex items-center justify-between px-4 py-3 text-white/25 hover:text-white/50 hover:bg-white/3 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-mono tracking-widest uppercase">Teknik</span>
                    </div>
                    <span className="text-[10px] font-mono">{showDetails ? "−" : "+"}</span>
                  </button>
                  {showDetails && (
                    <div className="px-4 pb-4 grid grid-cols-3 gap-2 animate-in slide-in-from-top-2 duration-200">
                      {[
                        { label: "Çıkarım", value: `${result.cikarim_suresi_ms} ms` },
                        { label: "Dosya", value: `${result.dosya_boyutu_mb} MB` },
                        { label: "Doygunluk", value: `%${result.renk_analizi.genel_istatistikler.ort_doygunluk}` },
                        { label: "Parlaklık", value: `%${result.renk_analizi.genel_istatistikler.ort_parlaklik}` },
                        { label: "Çeşitlilik", value: `${result.renk_analizi.genel_istatistikler.renk_cesitliligi}` },
                        { label: "Nötr", value: `%${result.renk_analizi.genel_istatistikler.notr_oran}` },
                      ].map(({ label, value }) => (
                        <div key={label} className="p-2.5 rounded-sm border border-white/5 bg-white/2">
                          <p className="text-[9px] font-mono tracking-widest uppercase text-white/20 mb-1">{label}</p>
                          <p className="text-[12px] font-mono text-white/60">{value}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

          </Card>
        </div>

        {/* Changelog panel */}
        <div className={`shrink-0 transition-all duration-300 ${showChangelog ? "w-72 opacity-100" : "w-0 opacity-0 pointer-events-none"}`} style={{overflow: "hidden"}}>
          <div className={`w-72 transition-transform duration-300 border border-white/[0.07] rounded-sm bg-surface/40 ${showChangelog ? "translate-x-0" : "translate-x-full"}`}>

            {/* Panel başlık */}
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

            {/* Girişler */}
            <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
              {CHANGELOG.map((entry, i) => (
                <div key={entry.version} className={`px-4 py-4 ${i < CHANGELOG.length - 1 ? "border-b border-white/4" : ""}`}>

                  {/* Versiyon + tarih + güncel badge */}
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

                  {/* Değişiklik maddeleri */}
                  <div className="flex flex-col gap-1.5 mb-3">
                    {entry.items.map((item, j) => (
                      <div key={j} className="flex items-start gap-2 text-xs text-[#666] leading-relaxed">
                        <span className="text-[#333] mt-0.5 shrink-0">—</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Teknik metrikler */}
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
