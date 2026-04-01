"use client";

import { useState } from "react";
import { UploadCloud, AlertCircle, Sparkles, Clock, ChevronDown, ChevronUp, History, Fingerprint, Activity, Terminal } from "lucide-react";
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

function getSkorRengi(skor: number): string {
  if (skor >= 80) return "#4ade80"; // green-400
  if (skor >= 65) return "#facc15"; // yellow-400
  return "#f87171"; // red-400
}

function rgbToCss(rgb: number[]): string {
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function rgbToHex(rgb: number[]): string {
  return "#" + rgb.map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
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
          <Card className="flex flex-col gap-6 bg-surface/40 backdrop-blur-sm border-white/5">

            {/* Yükleme Alanı */}
            <div className="relative border-2 border-dashed border-white/10 rounded-sm p-8 text-center hover:border-accent/40 transition-colors duration-300 bg-background/50 group">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              {previewUrl ? (
                <div className="flex flex-col items-center gap-4 animate-in zoom-in-95 duration-300">
                  <div className="w-32 h-32 relative rounded-sm overflow-hidden border border-white/10 shadow-xl group-hover:shadow-accent/10 transition-shadow">
                    <img src={previewUrl} alt="Önizleme" className="w-full h-full object-cover" />
                    {/* Tarama çizgisi efekti */}
                    {isLoading && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-accent/80 shadow-[0_0_10px_#f75f5f] animate-[scan_2s_ease-in-out_infinite]" />
                    )}
                  </div>
                  <p className="text-sm text-accent font-medium font-mono">{selectedFile?.name}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-white/5 rounded-sm flex items-center justify-center border border-white/5 group-hover:border-accent/30 transition-colors">
                    <UploadCloud className="w-6 h-6 text-textMuted group-hover:text-accent transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-200">Görüntü seçmek için tıklayın veya sürükleyin</p>
                    <p className="text-xs text-textMuted mt-1 font-mono uppercase tracking-wider">JPEG, PNG, WEBP (Max 5MB)</p>
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
                className="px-20 min-w-50 font-semibold tracking-wide"
              >
                {isLoading ? "VERİ İŞLENİYOR..." : "ANALİZİ BAŞLAT"}
              </Button>
            </div>

            {/* Hata */}
            {error && (
              <div className="p-4 bg-red-500/10 border-l-2 border-red-500 rounded-r-sm flex items-center gap-3 text-red-400 text-sm animate-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="font-mono">{error}</p>
              </div>
            )}

            {/* YENİ NESİL ÇIKTI EKRANI */}
            {result && (
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* STİL TAHMİNİ (Sol Kart) */}
                  <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="flex items-center gap-2 mb-6">
                      <Fingerprint className="w-4 h-4 text-accent" />
                      <h3 className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-widest">Sınıflandırma Ağacı</h3>
                    </div>
                    
                    <div className="flex items-end justify-between mb-4">
                      <p className="text-2xl font-bold text-gray-100 tracking-tight">{result.stil.tahmin}</p>
                      <div className="text-right">
                        <p className={`text-xl font-mono font-bold ${getGuvenRengi(result.stil.guven)}`}>
                          {result.stil.guven.toFixed(1)}%
                        </p>
                        <p className="text-[10px] text-textMuted uppercase tracking-wider">Güven Skoru</p>
                      </div>
                    </div>
                    
                    {/* Dijital İlerleme Çubuğu */}
                    <div className="w-full h-1.5 bg-black/40 rounded-sm overflow-hidden flex gap-0.5">
                      <div
                        className="h-full bg-accent relative"
                        style={{ width: `${result.stil.guven}%`, boxShadow: "0 0 10px rgba(247, 95, 95, 0.4)" }}
                      >
                         <div className="absolute right-0 top-0 w-2 h-full bg-white/50" />
                      </div>
                    </div>

                    {/* Diğer Olasılıklar Segmenti */}
                    {result.stil.diger_olasiliklar.length > 0 && (
                      <div className="mt-6 flex flex-col gap-3 pt-4 border-t border-white/5">
                        <p className="text-[10px] text-textMuted font-mono uppercase tracking-widest">Sekonder Tahminler</p>
                        {result.stil.diger_olasiliklar.map((item) => (
                          <div key={item.stil} className="flex items-center gap-3">
                            <span className="text-xs text-gray-300 shrink-0 w-24 truncate">{item.stil}</span>
                            <div className="flex-1 h-1 bg-black/40 flex gap-0.5">
                              <div className="h-full bg-white/20" style={{ width: `${item.guven_yuzdesi}%` }} />
                            </div>
                            <span className="text-xs font-mono text-textMuted w-12 text-right">
                              {item.guven_yuzdesi.toFixed(1)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* UYUM ANALİZİ SKORU (Sağ Kart - HUD Gauge) */}
                  <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-sm flex flex-col items-center justify-center relative">
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-gray-400" />
                      <h3 className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-widest">Renk Uyumu</h3>
                    </div>

                    <div className="relative w-36 h-36 mt-4 flex items-center justify-center">
                      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90 filter drop-shadow-xl">
                        {/* Kesik Kesik Arkaplan Yörüngesi (Segmented Track) */}
                        <circle 
                          cx="60" cy="60" r="50" 
                          fill="none" 
                          stroke="rgba(255,255,255,0.05)" 
                          strokeWidth="6" 
                          strokeDasharray="4 4" 
                        />
                        {/* Ana Skor Kadranı */}
                        <circle
                          cx="60" cy="60" r="50" 
                          fill="none"
                          stroke={getSkorRengi(result.renk_analizi.uyum_analizi.skor)}
                          strokeWidth="6" 
                          strokeLinecap="butt"
                          strokeDasharray={`${2 * Math.PI * 50}`}
                          strokeDashoffset={`${2 * Math.PI * 50 * (1 - result.renk_analizi.uyum_analizi.skor / 100)}`}
                          className="transition-all duration-1500 ease-out"
                          style={{ filter: `drop-shadow(0 0 6px ${getSkorRengi(result.renk_analizi.uyum_analizi.skor)}80)` }}
                        />
                      </svg>
                      {/* Merkez Veri */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-mono font-bold text-gray-100 tracking-tighter">
                          {result.renk_analizi.uyum_analizi.skor}
                        </span>
                        <span className="text-[10px] font-mono text-textMuted uppercase tracking-widest mt-1">/ 100</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <span className="inline-block px-3 py-1 rounded-sm bg-black/40 border border-white/5 text-xs font-mono font-semibold text-gray-200">
                        {result.renk_analizi.uyum_analizi.tur}
                      </span>
                    </div>
                  </div>
                </div>

                {/* SİSTEM İÇGÖRÜLERİ (Log Paneli) */}
                <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-sm p-6 relative overflow-hidden">
                  {/* Sol taraftaki dekoratif barkod/çizgi */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-accent/80 via-accent/20 to-transparent" />
                  
                  <div className="flex items-center gap-2 mb-4 pl-2">
                    <Terminal className="w-4 h-4 text-accent" />
                    <h3 className="text-xs font-mono font-semibold text-accent uppercase tracking-widest">Model İçgörü Raporu</h3>
                  </div>

                  <div className="pl-4 border-l border-white/10 flex flex-col gap-5">
                    {/* Sezon Yorumu */}
                    <div>
                      <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1.5">Tespit Edilen Karakteristik</p>
                      <p className="text-sm text-gray-200 font-medium">"{result.renk_analizi.stil_tahmini}"</p>
                    </div>
                    
                    {/* Analiz Yorumu */}
                    <div>
                      <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1.5">Algoritmik Değerlendirme</p>
                      <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
                        {result.renk_analizi.uyum_analizi.aciklama}
                      </p>
                    </div>
                  </div>
                </div>

                {/* DOMİNANT RENK TERMİNALİ */}
                <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-sm">
                  <h3 className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-widest mb-5">Çıkarılan Vektörel Palet</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {result.renk_analizi.dominant_colors.map((renk, index) => (
                      <div key={index} className="flex flex-col bg-black/30 border border-white/5 rounded-sm p-2 group hover:border-white/20 transition-colors">
                        <div
                          className="w-full h-12 rounded-sm border shadow-inner mb-3 relative"
                          style={{
                            backgroundColor: rgbToCss(renk.rgb),
                            borderColor: renk.notr ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.1)",
                          }}
                        >
                          {renk.notr && (
                            <div className="absolute right-1 top-1">
                              <span className="px-1.5 py-0.5 bg-black/50 backdrop-blur-md rounded-sm text-[8px] text-white/70 font-mono uppercase tracking-widest border border-white/10">Nötr</span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <p className="text-xs text-gray-200 font-medium truncate" title={renk.isim}>{renk.isim}</p>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-[10px] font-mono text-textMuted uppercase">{rgbToHex(renk.rgb)}</p>
                            <p className="text-[10px] font-mono text-accent">{renk.yuzde.toFixed(1)}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TEKNİK DETAYLAR METRİKLERİ */}
                <div className="border border-white/10 rounded-sm bg-black/40 overflow-hidden">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full flex items-center justify-between p-4 text-xs font-mono font-semibold tracking-widest uppercase text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent" />
                      <span>İşlem Metrikleri</span>
                    </div>
                    {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  
                  {showDetails && (
                    <div className="px-4 pb-4 grid grid-cols-2 md:grid-cols-3 gap-3 animate-in slide-in-from-top-2 duration-200">
                      {[
                        { label: "Çıkarım Süresi", val: `${result.cikarim_suresi_ms} ms` },
                        { label: "Dosya Boyutu", val: `${result.dosya_boyutu_mb} MB` },
                        { label: "Ort. Doygunluk", val: `%${result.renk_analizi.genel_istatistikler.ort_doygunluk}` },
                        { label: "Ort. Parlaklık", val: `%${result.renk_analizi.genel_istatistikler.ort_parlaklik}` },
                        { label: "Renk Varyansı", val: result.renk_analizi.genel_istatistikler.renk_cesitliligi },
                        { label: "Nötr Renk Oranı", val: `%${result.renk_analizi.genel_istatistikler.notr_oran}` },
                      ].map((stat, idx) => (
                        <div key={idx} className="p-3 bg-white/5 rounded-sm border border-white/5 flex flex-col gap-1">
                          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{stat.label}</p>
                          <p className="text-sm font-mono text-gray-200">{stat.val}</p>
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
          <div className={`w-72 transition-transform duration-300 border border-white/[0.07] rounded-sm bg-surface/40 backdrop-blur-md ${showChangelog ? "translate-x-0" : "translate-x-full"}`}>

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
            <div className="overflow-y-auto custom-scrollbar" style={{ maxHeight: "calc(100vh - 200px)" }}>
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
                    <span className="text-xs text-[#666] font-mono">{entry.date}</span>
                    {entry.current && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-accent/10 border border-accent/20 text-accent font-mono uppercase tracking-wider">
                        Active
                      </span>
                    )}
                  </div>

                  {/* Değişiklik maddeleri */}
                  <div className="flex flex-col gap-1.5 mb-3">
                    {entry.items.map((item, j) => (
                      <div key={j} className="flex items-start gap-2 text-xs text-gray-400 leading-relaxed">
                        <span className="text-accent/50 mt-0.5 shrink-0 font-mono">{'>'}</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Teknik metrikler */}
                  <div className="flex gap-3 flex-wrap pt-2 border-t border-white/4">
                    <span className="text-[10px] font-mono text-gray-500">
                      acc: <span className="text-gray-300">{entry.meta.accuracy}</span>
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">
                      epochs: <span className="text-gray-300">{entry.meta.epochs}</span>
                    </span>
                    {entry.meta.inference && (
                      <span className="text-[10px] font-mono text-gray-500">
                        inf: <span className="text-gray-300">{entry.meta.inference}</span>
                      </span>
                    )}
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
      
      {/* Tarama efekti için ufak bir CSS animasyon tanımı */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />
    </div>
  );
}