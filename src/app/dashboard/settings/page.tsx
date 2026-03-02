"use client";

import { useState, useEffect } from "react";
import { 
  Settings as SettingsIcon, 
  Sliders, 
  Eye, 
  Target, 
  Save, 
  Activity
} from "lucide-react";
import { Button } from "@/src/components/ui/Button";

export default function SettingsPage() {
  //state yönetimi 
  const [threshold, setThreshold] = useState(75);
  const [advancedMetrics, setAdvancedMetrics] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    // Burada ayarlar localStorage'a kaydedilir
    if (typeof window !== "undefined") {
      localStorage.setItem("ai_threshold", threshold.toString());
      localStorage.setItem("ai_advanced_metrics", advancedMetrics.toString());
    }
    setTimeout(() => setIsSaved(false), 2000);
  };

  // Update state when page loads to reflect saved settings
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedThreshold = localStorage.getItem("ai_threshold");
      const savedMetrics = localStorage.getItem("ai_advanced_metrics");
      if (savedThreshold) setThreshold(parseInt(savedThreshold));
      if (savedMetrics === "true") setAdvancedMetrics(true);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-8 animate-reveal">
      
      {/*head*/}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-100 flex items-center gap-3 mb-2">
          <SettingsIcon className="w-8 h-8 text-accent" />
          Model & Çıkarım Ayarları
        </h1>
        <p className="text-textMuted">
          Derin öğrenme modellerinin karar sınırlarını ve arayüz telemetri detaylarını yapılandırabilirsiniz.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        
        {/*Threshold state*/}
        <div className="glass-panel rounded-2xl p-6 md:p-8 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center border border-white/10">
              <Target className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-200">Karar Güven Eşiği (Confidence Threshold)</h2>
              <p className="text-sm text-textMuted">Modelin kesin bir analiz yapabilmesi için gereken minimum olasılık değeri.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <label className="text-sm font-medium text-gray-300">Minimum Doğruluk Oranı</label>
                <span className="text-2xl font-bold text-accent">%{threshold}</span>
              </div>
              
              <input 
                type="range" 
                min="50" 
                max="99" 
                value={threshold}
                onChange={(e) => setThreshold(parseInt(e.target.value))}
                className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-accent border border-white/5"
              />
              
              <div className="flex justify-between text-xs text-textMuted">
                <span>%60 (Esnek Çıkarım)</span>
                <span>%95 (Emin Çıkarım)</span>
              </div>
              
            </div>
          </div>
        </div>

        {/* Telemetri ve Görüntüleme Kartı */}
        <div className="glass-panel rounded-2xl p-6 md:p-8 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors delay-200 animate-reveal">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center border border-white/10">
              <Eye className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-200">Çıktı Telemetrisi</h2>
              <p className="text-sm text-textMuted">Analiz sonuç ekranında gösterilecek veri derinliğini belirler.</p>
            </div>
          </div>

          <div className="space-y-4">
            
            <div 
              onClick={() => setAdvancedMetrics(!advancedMetrics)}
              className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all duration-300 ${
                advancedMetrics ? "bg-accent/5 border-accent/30" : "bg-background/50 border-white/5 hover:border-white/10"
              }`}
            >
              <div className="mt-1">
                {advancedMetrics ? (
                  <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center shadow-[0_0_10px_rgba(255,161,22,0.5)]">
                    <div className="w-2 h-2 bg-background rounded-full"></div>
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-textMuted"></div>
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

            {/*FP16/FP32*/}
            <div className="flex items-center justify-between p-5 bg-background/30 rounded-xl border border-white/5 opacity-70">
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

        {/*SAVE*/}
        <div className="flex justify-end mt-4 delay-400 animate-reveal">
          <Button 
            onClick={handleSave}
            className={`px-8 py-6 rounded-xl text-md flex items-center gap-2 transition-all duration-300 ${
              isSaved ? "bg-green-600 hover:bg-green-500 shadow-green-500/20" : "shadow-lg shadow-accent/20 hover:shadow-accent/40"
            }`}
          >
            {isSaved ? <Activity className="w-5 h-5" /> : <Save className="w-5 h-5" />}
            {isSaved ? "Parametreler Güncellendi" : "Model Parametrelerini Kaydet"}
          </Button>
        </div>

      </div>
    </div>
  );
}