import { 
  Settings as SettingsIcon, 
  Cpu, 
  Network, 
  Shield, 
  Zap, 
  Save 
} from "lucide-react";
import { Button } from "@/src/components/ui/Button";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-8 animate-reveal">
      
      {/* Üst Başlık */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-100 flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-accent" />
          Sistem Ayarları
        </h1>
        <p className="text-textMuted mt-2">
          API köprüsü, donanım ivmelendirmesi ve arayüz tercihlerini buradan yapılandırabilirsin.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* API Konfigürasyon Kartı */}
        <div className="glass-panel rounded-2xl p-6 md:p-8 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center border border-white/10">
              <Network className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-200">API Köprüsü Bağlantısı</h2>
              <p className="text-sm text-textMuted">FastAPI sunucusunun iletişim kuracağı uç noktalar.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-300">Ana Sunucu URL</label>
              <input 
                type="text" 
                defaultValue="http://localhost:8000" 
                className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all font-mono text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-300">Zaman Aşımı (Timeout)</label>
              <select className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-accent/50 transition-all appearance-none">
                <option value="30">30 Saniye (Standart)</option>
                <option value="60">60 Saniye (Büyük tensör modelleri için)</option>
                <option value="120">120 Saniye</option>
              </select>
            </div>
          </div>
        </div>

        {/* Donanım ve Model Kartı */}
        <div className="glass-panel rounded-2xl p-6 md:p-8 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors delay-200 animate-reveal">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center border border-white/10">
              <Cpu className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-200">Çıkarım (Inference) Motoru</h2>
              <p className="text-sm text-textMuted">Derin öğrenme modellerinin donanım kullanım tercihleri.</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Toggle Switch Simülasyonu */}
            <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-amber-400" />
                <div>
                  <p className="font-medium text-gray-200">GPU Hızlandırması (CUDA)</p>
                  <p className="text-xs text-textMuted mt-0.5">PyTorch ve Keras modellerinde NVIDIA tensör çekirdeklerini kullanır.</p>
                </div>
              </div>
              {/* Açık/Kapalı Switch */}
              <div className="w-12 h-6 bg-accent/20 rounded-full relative cursor-pointer border border-accent/30 flex items-center p-1">
                <div className="w-4 h-4 bg-accent rounded-full absolute right-1 shadow-[0_0_10px_rgba(255,161,22,0.5)]"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-400" />
                <div>
                  <p className="font-medium text-gray-200">Güvenli Mod (Strict Typing)</p>
                  <p className="text-xs text-textMuted mt-0.5">Gelen veri setlerinin boyutlarını işleme öncesi katı bir şekilde doğrular.</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-surface rounded-full relative cursor-pointer border border-white/10 flex items-center p-1">
                <div className="w-4 h-4 bg-gray-400 rounded-full absolute left-1"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Kaydet Butonu */}
        <div className="flex justify-end mt-4 delay-400 animate-reveal">
          <Button className="px-8 py-6 rounded-xl text-md flex items-center gap-2 shadow-lg shadow-accent/20 hover:shadow-accent/40">
            <Save className="w-5 h-5" />
            Sistem Tercihlerini Kaydet
          </Button>
        </div>

      </div>
    </div>
  );
}