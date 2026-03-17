"use client";

import { useState } from "react";
import { UploadCloud, AlertCircle, Sparkles, Clock, ChevronDown, ChevronUp, History } from "lucide-react";
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
}

interface GenelIstatistikler {
  ort_doygunluk: number;
  ort_parlaklik: number;
  renk_cesitliligi: number;
  uyum_skoru: number;
  uyum_notu: string;
}

interface RenkAnalizi {
  dominant_colors: DominantRenk[];
  genel_istatistikler: GenelIstatistikler;
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
    version: "v1.1",
    date: "Mart2025",
    current: true,
    items: [
      "Chroma'nın veri seti kaynaklı, belirli sınıflara meyletme sorunu çözüldü",
      "Augmentation ve normalization yükü GPU ya kaydırılarak CPU darboğazı giderildi",
      "Dominant palet çıkarımı ~%20 oranında iyileştirildi",
      "Backend tarafı optimize edilerek yanıt süresi yaklaşık %25 azaltıldı",
    ],
    meta: { accuracy: "-%", epochs: "20", inference: "-6000ms" },
  },
  {
    version: "v1.0",
    date: "Şubat 2025",
    current: false,
    items: [
      "İlk CNN mimarisi kuruldu",
      "Veri ön işleme ve augmentation pipeline'ı eklendi",
      "2 fazlı transfer learning pipeline'ı uygulanarak eğitildi",
      "Her faz için özel parametrelerle fine tuning uygulandı",
      "Renk analizi ve dominant palet çıkarımı eklendi",
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
          className="shrink-0 flex justify-end gap-3 px-4 py-2 rounded-sm text-sm font-mono transition-all duration-200 text-[#1a0808] font-semibold"
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
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Ana Stil Tahmini */}
                <div className="p-6 bg-accent/5 border border-accent/20 rounded-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-accent" />
                    <h3 className="font-semibold text-gray-200">Stil Tahmini</h3>
                  </div>
                  <div className="flex items-end justify-between mb-3">
                    <p className="text-3xl font-bold text-accent">{result.stil.tahmin}</p>
                    <p className={`text-2xl font-bold ${getGuvenRengi(result.stil.guven)}`}>
                      %{result.stil.guven}
                    </p>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-accent to-[#ffd44f] rounded-full transition-all duration-700"
                      style={{ width: `${result.stil.guven}%` }}
                    />
                  </div>
                  {result.stil.diger_olasiliklar.length > 0 && (
                    <div className="mt-4 flex flex-col gap-2">
                      <p className="text-xs text-textMuted mb-1">Diğer olasılıklar</p>
                      {result.stil.diger_olasiliklar.map((item) => (
                        <div key={item.stil} className="flex items-center gap-3">
                          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-white/20 rounded-full" style={{ width: `${item.guven_yuzdesi}%` }} />
                          </div>
                          <span className="text-xs text-textMuted shrink-0 w-24 text-right">
                            {item.stil} %{item.guven_yuzdesi}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Dominant Renkler + Renk Uyumu */}
                <div className="p-6 bg-white/5 border border-white/10 rounded-sm flex flex-col gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-200 mb-4">Dominant Renkler</h3>
                    <div className="flex gap-3">
                      {result.renk_analizi.dominant_colors.map((renk, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full h-14 rounded-sm border border-white/10 shadow-lg" style={{ backgroundColor: rgbToCss(renk.rgb) }} />
                          <p className="text-xs text-gray-200">%{renk.yuzde}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-xs text-textMuted uppercase tracking-widest mb-4">Renk Uyumu</p>
                    <div className="flex items-center gap-6">
                      <div className="relative w-24 h-24 shrink-0">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                          <circle
                            cx="50" cy="50" r="40" fill="none"
                            stroke={result.renk_analizi.genel_istatistikler.uyum_skoru >= 75 ? "rgb(74, 222, 128)" : result.renk_analizi.genel_istatistikler.uyum_skoru >= 50 ? "rgb(251, 191, 36)" : "rgb(248, 113, 113)"}
                            strokeWidth="10" strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - result.renk_analizi.genel_istatistikler.uyum_skoru / 100)}`}
                            className="transition-all duration-1000"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-bold text-gray-100">{result.renk_analizi.genel_istatistikler.uyum_skoru}</span>
                          <span className="text-xs text-textMuted">/100</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className={`text-lg font-bold ${result.renk_analizi.genel_istatistikler.uyum_skoru >= 75 ? "text-green-400" : result.renk_analizi.genel_istatistikler.uyum_skoru >= 50 ? "text-accent" : "text-red-400"}`}>
                          {result.renk_analizi.genel_istatistikler.uyum_notu}
                        </p>
                        <p className="text-sm text-textMuted leading-relaxed">
                          {result.renk_analizi.genel_istatistikler.uyum_skoru >= 75
                            ? "Seçtiğin renkler birbiriyle mükemmel bir ahenk içinde."
                            : result.renk_analizi.genel_istatistikler.uyum_skoru >= 50
                            ? "Renkler tam anlamıyla uyumlu olmasa da küçük dokunuşlarla çok daha güçlü bir kombin elde edebilirsin."
                            : "Renkler arasında fazla kontrast farkı var. Cesur bir tercih ama dikkatli kombinlemek gerekiyor."}
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 h-2 rounded-full w-full" style={{ background: `linear-gradient(to right, ${result.renk_analizi.dominant_colors.map((r) => rgbToCss(r.rgb)).join(", ")})` }} />
                  </div>
                </div>

                {/* Teknik Detaylar */}
                <div className="border border-white/5 rounded-sm overflow-hidden">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full flex items-center justify-between p-4 text-sm text-textMuted hover:text-gray-200 hover:bg-white/5 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent" />
                      <span>Teknik Detaylar</span>
                    </div>
                    {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {showDetails && (
                    <div className="px-4 pb-4 grid grid-cols-2 gap-3 animate-in slide-in-from-top-2 duration-200">
                      <div className="p-3 bg-background/50 rounded-sm border border-white/5">
                        <p className="text-xs text-textMuted mb-1">Çıkarım Süresi</p>
                        <p className="font-medium text-gray-200">{result.cikarim_suresi_ms} ms</p>
                      </div>
                      <div className="p-3 bg-background/50 rounded-sm border border-white/5">
                        <p className="text-xs text-textMuted mb-1">Dosya Boyutu</p>
                        <p className="font-medium text-gray-200">{result.dosya_boyutu_mb} MB</p>
                      </div>
                      <div className="p-3 bg-background/50 rounded-sm border border-white/5">
                        <p className="text-xs text-textMuted mb-1">Ort. Doygunluk</p>
                        <p className="font-medium text-gray-200">{result.renk_analizi.genel_istatistikler.ort_doygunluk}</p>
                      </div>
                      <div className="p-3 bg-background/50 rounded-sm border border-white/5">
                        <p className="text-xs text-textMuted mb-1">Ort. Parlaklık</p>
                        <p className="font-medium text-gray-200">{result.renk_analizi.genel_istatistikler.ort_parlaklik}</p>
                      </div>
                      <div className="col-span-2 p-3 bg-background/50 rounded-sm border border-white/5">
                        <p className="text-xs text-textMuted mb-1">Renk Çeşitliliği</p>
                        <p className="font-medium text-gray-200">{result.renk_analizi.genel_istatistikler.renk_cesitliligi}</p>
                      </div>
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
