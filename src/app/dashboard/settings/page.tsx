"use client";

import { useState, useEffect } from "react";
import {
  Settings as SettingsIcon,
  Sliders,
  Save,
  Activity,
} from "lucide-react";
import { Button } from "@/src/components/ui/Button";

const THRESHOLD_OPTIONS = [
  {
    value: 60,
    label: "%60 Eşik",
    title: "Esnek Seçim",
    description: "Gürültülü verilerde toleranslı davranır. Deneysel tahminler için.",
  },
  {
    value: 80,
    label: "%80 Eşik", 
    title: "Genel Kullanım",
    description: "Genel kullanım için en dengeli yaklaşım.",
  },
  {
    value: 95,
    label: "%95 Eşik",
    title: "Yüksek Disiplinler İçin",
    description: "Sadece en emin olduğu sonuçları geçirir. Hassas modeller içindir.",
  },
] as const;

//Geçerli threshold değerleri için tip — 60, 80 veya 95 dışında bir değer girilemez
type ThresholdValue = typeof THRESHOLD_OPTIONS[number]["value"];

export default function SettingsPage() {
  const [threshold, setThreshold] = useState<ThresholdValue>(80);
  const [advancedMetrics, setAdvancedMetrics] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  //Sayfa yüklenince localStorage'dan oku
  useEffect(() => {
    const savedThreshold = localStorage.getItem("ai_threshold");
    const savedMetrics = localStorage.getItem("ai_advanced_metrics");

    if (savedThreshold) {
      const parsed = parseInt(savedThreshold) as ThresholdValue;
      // Geçersiz bir değer kaydedilmişse varsayılana dön
      if ([60, 80, 95].includes(parsed)) setThreshold(parsed);
    }
    if (savedMetrics === "true") setAdvancedMetrics(true);
  }, []);

  const handleSave = () => {
  
    localStorage.setItem("ai_threshold", threshold.toString());
    localStorage.setItem("ai_advanced_metrics", advancedMetrics.toString());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-8 animate-reveal">

      {/* Başlık */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-100 flex items-center gap-3 mb-2">
          <SettingsIcon className="w-8 h-8 text-accent" />
          Ayarlar
        </h1>
        <p className="text-textMuted">
          Derin öğrenme modellerinin karar sınırlarını ve telemetri detaylarını yapılandırabilirsiniz.
        </p>
      </div>

      <div className="flex flex-col gap-6">

        {/* Threshold Kartı */}
        <div className="glass-panel rounded-sm p-6 md:p-8 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
          <div className="flex items-center gap-4 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-200">Karar Güven Eşiği (Confidence Threshold)</h2>
              <p className="text-sm text-textMuted">Modelin kesin bir sınıflandırma yapabilmesi için gereken minimum olasılık değeri.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {THRESHOLD_OPTIONS.map((option) => (
              <div
                key={option.value}
                onClick={() => setThreshold(option.value)}
                className={`p-5 rounded-sm cursor-pointer transition-all duration-300 border ${
                  threshold === option.value
                    ? "bg-accent/10 border-accent/50 shadow-[0_0_15px_rgba(247,95,95,0.1)]"
                    : "bg-background/50 border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className={`font-semibold ${threshold === option.value ? "text-accent" : "text-gray-200"}`}>
                    {option.label}
                  </h3>
                  {threshold === option.value && (
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  )}
                </div>
                <p className="text-sm text-textMuted">{option.title}</p>
                <p className="text-xs text-textMuted/70 mt-3 leading-relaxed">{option.description}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-textMuted/80 bg-background/50 p-3 rounded-sm border border-white/5 mt-6">
            * Seçili eşiğin altındaki tahminler sistem tarafından "Belirsiz" olarak işaretlenir.
          </p>
        </div>

        {/* Telemetri Kartı */}
        <div className="glass-panel rounded-sm p-6 md:p-8 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors delay-200 animate-reveal">
          <div className="flex items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-200">Çıktı Telemetrisi</h2>
              <p className="text-sm text-textMuted">Analiz sonuç ekranında gösterilecek veri derinliğini belirler.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div
              onClick={() => setAdvancedMetrics(!advancedMetrics)}
              className={`flex items-start gap-4 p-5 rounded-sm border cursor-pointer transition-all duration-300 ${
                advancedMetrics ? "bg-accent/5 border-accent/30" : "bg-background/50 border-white/5 hover:border-white/10"
              }`}
            >
              <div className="mt-1">
                {advancedMetrics ? (
                  <div className="w-5 h-5 rounded-full text-accent flex items-center justify-center shadow-[0_0_10px_rgba(247,95,95,0.5)]">
                    <div className="w-2 h-2 bg-background rounded-full" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-textMuted" />
                )}
              </div>
              <div>
                <h3 className={`font-medium ${advancedMetrics ? "text-accent" : "text-gray-200"}`}>
                  Gelişmiş Metrikler (Advanced)
                </h3>
                <p className="text-sm text-textMuted mt-1 leading-relaxed">
                  Çıkarım süresi (ms), işlenen tensör boyutu (shape) ve olasılık dağılımı (Top-3 tahmin) gibi detaylı arka plan verilerini arayüzde gösterir.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-5 bg-background/30 rounded-sm border border-white/5 opacity-70">
              <div className="flex items-center gap-3">
                <Sliders className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-300">Tensör İşleme Hassasiyeti</p>
                  <p className="text-xs text-textMuted mt-0.5">FP32 (Standart Yüzer Nokta) - Değiştirilemez</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kaydet */}
        <div className="flex justify-end mt-4 delay-400 animate-reveal">
          <Button
            onClick={handleSave}
            className={`px-8 py-6 rounded-sm text-md flex items-center gap-2 transition-all duration-300 ${
              isSaved ? "bg-green-600 hover:bg-green-500 shadow-green-500/20" : "shadow-lg shadow-accent/20 hover:shadow-accent/40"
            }`}
          >
            {isSaved ? <Activity className="w-5 h-5" /> : <Save className="w-5 h-5" />}
            {isSaved ? "Ayarlar Güncellendi" : "Kaydet"}
          </Button>
        </div>

      </div>
    </div>
  );
}