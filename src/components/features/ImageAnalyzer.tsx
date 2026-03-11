"use client";

import { useState } from "react";
import { UploadCloud, Cpu, AlertCircle, Sparkles, Clock, HardDrive, ChevronDown, ChevronUp } from "lucide-react";
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

// Güven skoruna göre renk — yüksekse yeşil, düşükse sarı/kırmızı
function getGuvenRengi(guven: number): string {
  if (guven >= 75) return "text-green-400";
  if (guven >= 50) return "text-amber-400";
  return "text-red-400";
}

//  RGB dizisini CSS renk stringine çevir
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
    <div className="max-w-3xl mx-auto flex flex-col gap-6">

      {/* Başlık */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-100 flex items-center gap-3">
          {title}
          {titleBadge && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent">
              {titleBadge}
            </span>
          )}
        </h2>
        <p className="text-textMuted mt-1">{description}</p>
      </div>

      <Card className="flex flex-col gap-6 bg-surface/40">

        {/* Yükleme Alanı */}
        <div className="relative border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-accent/40 transition-colors duration-300 bg-background/50">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          {previewUrl ? (
            <div className="flex flex-col items-center gap-4 animate-in zoom-in-95 duration-300">
              <div className="w-32 h-32 relative rounded-lg overflow-hidden border border-white/10 shadow-lg">
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
        <div className="flex justify-end">
          <Button
            onClick={handleAnalyze}
            disabled={!selectedFile || isLoading}
            isLoading={isLoading}
          >
            <Cpu className="w-4 h-4 mr-2" />
            {isLoading ? "Analiz Ediliyor..." : "Analiz Et"}
          </Button>
        </div>

        {/* Hata */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm animate-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Sonuç Ekranı */}
        {result && (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Ana Stil Tahmini */}
            <div className="p-6 bg-accent/5 border border-accent/20 rounded-xl">
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

              {/* Güven çubuğu */}
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-700"
                  style={{ width: `${result.stil.guven}%` }}
                />
              </div>

              {/* Diğer olasılıklar */}
              {result.stil.diger_olasiliklar.length > 0 && (
                <div className="mt-4 flex flex-col gap-2">
                  <p className="text-xs text-textMuted mb-1">Diğer olasılıklar</p>
                  {result.stil.diger_olasiliklar.map((item) => (
                    <div key={item.stil} className="flex items-center gap-3">
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white/20 rounded-full"
                          style={{ width: `${item.guven_yuzdesi}%` }}
                        />
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
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl flex flex-col gap-6">

              {/* Dominant Renkler */}
              <div>
                <h3 className="font-semibold text-gray-200 mb-4">Dominant Renkler</h3>
                <div className="flex gap-3">
                  {result.renk_analizi.dominant_colors.map((renk, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full h-14 rounded-lg border border-white/10 shadow-lg"
                        style={{ backgroundColor: rgbToCss(renk.rgb) }}
                      />
                      <p className="text-xs text-gray-300 font-medium text-center">{renk.isim}</p>
                      <p className="text-xs text-textMuted">%{renk.yuzde}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Renk Uyumu — ana sahne */}
              <div className="pt-4 border-t border-white/5">
                <p className="text-xs text-textMuted uppercase tracking-widest mb-4">Renk Uyumu</p>

                <div className="flex items-center gap-6">

                  {/* Skor dairesi */}
                  <div className="relative w-24 h-24 shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      {/* Arka plan halkası */}
                      <circle
                        cx="50" cy="50" r="40"
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="10"
                      />
                      {/* Skor halkası — skora göre doluluk */}
                      <circle
                        cx="50" cy="50" r="40"
                        fill="none"
                        stroke={
                          result.renk_analizi.genel_istatistikler.uyum_skoru >= 75
                            ? "rgb(74, 222, 128)"   // yeşil
                            : result.renk_analizi.genel_istatistikler.uyum_skoru >= 50
                            ? "rgb(251, 191, 36)"   // sarı
                            : "rgb(248, 113, 113)"  // kırmızı
                        }
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - result.renk_analizi.genel_istatistikler.uyum_skoru / 100)}`}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    {/* Ortadaki skor yazısı */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-gray-100">
                        {result.renk_analizi.genel_istatistikler.uyum_skoru}
                      </span>
                      <span className="text-xs text-textMuted">/100</span>
                    </div>
                  </div>

                  {/* Sağ taraf — not ve yorum */}
                  <div className="flex flex-col gap-2">
                    <p className={`text-lg font-bold ${
                      result.renk_analizi.genel_istatistikler.uyum_skoru >= 75
                        ? "text-green-400"
                        : result.renk_analizi.genel_istatistikler.uyum_skoru >= 50
                        ? "text-amber-400"
                        : "text-red-400"
                    }`}>
                      {result.renk_analizi.genel_istatistikler.uyum_notu}
                    </p>
                    {/* Skora göre dinamik moda yorumu */}
                    <p className="text-sm text-textMuted leading-relaxed">
                      {result.renk_analizi.genel_istatistikler.uyum_skoru >= 75
                        ? "Seçtiğin renkler birbiriyle mükemmel bir ahenk içinde."
                        : result.renk_analizi.genel_istatistikler.uyum_skoru >= 50
                        ? "Renkler tam anlamıyla uyumlu olmasa da küçük dokunuşlarla çok daha güçlü bir kombin elde edebilirsin."
                        : "Renkler arasında fazla kontrast farkı var. Cesur bir tercih ama dikkatli kombinlemek gerekiyor."
                      }
                    </p>
                  </div>
                </div>

                {/* Renk paleti şeridi*/}
                <div
                  className="mt-5 h-2 rounded-full w-full"
                  style={{
                    background: `linear-gradient(to right, ${
                      result.renk_analizi.dominant_colors
                        .map((r) => rgbToCss(r.rgb))
                        .join(", ")
                    })`
                  }}
                />
              </div>

            </div>

            {/* açılır/kapanır panel */}
            <div className="border border-white/5 rounded-xl overflow-hidden">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full flex items-center justify-between p-4 text-sm text-textMuted hover:text-gray-200 hover:bg-white/5 transition-colors duration-200"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent"/>
                  <span>Teknik Detaylar</span>
                </div>
                {showDetails
                  ? <ChevronUp className="w-4 h-4" />
                  : <ChevronDown className="w-4 h-4" />
                }
              </button>

              {showDetails && (
                <div className="px-4 pb-4 grid grid-cols-2 gap-3 animate-in slide-in-from-top-2 duration-200">
                  <div className="p-3 bg-background/50 rounded-lg border border-white/5">
                    <p className="text-xs text-textMuted mb-1">Çıkarım Süresi</p>
                    <p className="font-medium text-gray-200">{result.cikarim_suresi_ms} ms</p>
                  </div>
                  <div className="p-3 bg-background/50 rounded-lg border border-white/5">
                    <p className="text-xs text-textMuted mb-1">Dosya Boyutu</p>
                    <p className="font-medium text-gray-200">{result.dosya_boyutu_mb} MB</p>
                  </div>
                  <div className="p-3 bg-background/50 rounded-lg border border-white/5">
                    <p className="text-xs text-textMuted mb-1">Ort. Doygunluk</p>
                    <p className="font-medium text-gray-200">{result.renk_analizi.genel_istatistikler.ort_doygunluk}</p>
                  </div>
                  <div className="p-3 bg-background/50 rounded-lg border border-white/5">
                    <p className="text-xs text-textMuted mb-1">Ort. Parlaklık</p>
                    <p className="font-medium text-gray-200">{result.renk_analizi.genel_istatistikler.ort_parlaklik}</p>
                  </div>
                  <div className="col-span-2 p-3 bg-background/50 rounded-lg border border-white/5">
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
  );
}