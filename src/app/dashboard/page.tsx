import Link from "next/link";
import { 
  Activity, 
  Server, 
  Cpu, 
  Box, 
  ArrowRight, 
  CheckCircle2, 
  Clock,Layers,
  ScanSearch
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto w-full flex flex-col gap-10">
      
      {/*Metrics*/}
      <div className="flex flex-col gap-8 animate-reveal">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-100 mb-2">Proje Paneli</h1>
        </div>

        {/* Vizyon ve Odak Grid'i */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-panel p-5 rounded-2xl flex items-center gap-4 border border-white/5 bg-surface/30">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
              <Activity className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-textMuted mb-1">Ana Odak</p>
              <p className="font-semibold text-gray-200">Derin Öğrenme & MLOps</p>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl flex items-center gap-4 border border-white/5 bg-surface/30">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Layers className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-textMuted mb-1">Mimari Yaklaşım</p>
              <p className="font-semibold text-gray-200">Ölçeklenebilir & Modüler</p>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl flex items-center gap-4 border border-white/5 bg-surface/30">
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-xs text-textMuted mb-1">Geliştirme Standardı</p>
              <p className="font-semibold text-gray-200">Hizmete Hazır Sistemler</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ana Projeler Listesi */}
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-gray-200 animate-reveal delay-200">Modellerim</h2>
        
        {/* Proje Kartı 1 */}
        <div className="glass-panel rounded-3xl p-1 border border-white/5 group hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 animate-reveal delay-400 relative overflow-hidden">
          {/*glow*/}
          <div className="absolute top-0 right-0 w-96 h-full bg-linear-to-l from-accent/5 to-transparent pointer-events-none" />
          
          <div className="bg-surface/50 rounded-[22px] p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
            
            {/*icons*/}
            <div className="w-16 h-16 shrink-0 bg-background rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-accent/30 transition-colors duration-500">
              <Cpu className="w-8 h-8 text-textMuted group-hover:text-accent transition-colors duration-500" />
            </div>

            {/*contents*/}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold text-gray-100">Kıyafetinin rengini, stilini ve uyumunu saniyeler içinde analiz et</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3" /> Yayında
                </span>
              </div>
              <p className="text-textMuted leading-relaxed mb-4 max-w-2xl">
                FastAPI backendine bağlı, Keras tabanlı konvolüsyonel sinir ağları (CNN) kullanarak yüklenen görüntülerin özniteliklerini çıkaran ve yüksek doğrulukla analiz eden modelim.
                Bu model sayesinde tarzınızı uzman bir yapay zekanın detaylı metrikleriyle inceleyebilirsiniz.
              </p>
              
              {/*tags*/}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-lg bg-white/5 text-gray-300 text-xs font-medium border border-white/5">Keras</span>
                <span className="px-3 py-1 rounded-lg bg-white/5 text-gray-300 text-xs font-medium border border-white/5">FastAPI</span>
                <span className="px-3 py-1 rounded-lg bg-white/5 text-gray-300 text-xs font-medium border border-white/5">Python</span>
                <span className="px-3 py-1 rounded-lg bg-white/5 text-gray-300 text-xs font-medium border border-white/5">React</span>
              </div>
            </div>

            {/* Buttons*/}
            <Link href="/dashboard/tool-1" className="shrink-0 w-full md:w-auto flex items-center justify-center gap-2 bg-accent text-background px-6 py-3 rounded-xl font-medium hover:bg-orange-500 transition-colors duration-250">
              Modeli İncele
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Proje Kartı 2*/}
        <div className="glass-panel rounded-3xl p-1 border border-white/5 opacity-60 hover:opacity-100 transition-opacity duration-300 animate-reveal delay-600">
          <div className="bg-surface/50 rounded-[22px] p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
            
            <div className="w-16 h-16 shrink-0 bg-background rounded-2xl flex items-center justify-center border border-white/10">
              <Server className="w-8 h-8 text-textMuted" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-gray-100 text-opacity-80">Tensör İşleme Mimarisi</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-medium flex items-center gap-1.5">
                  <Clock className="w-3 h-3" /> Geliştiriliyor
                </span>
              </div>
              <p className="text-textMuted leading-relaxed max-w-2xl text-sm">
                PyTorch ortamında eğitilmiş modeller için GPU destekli çıkarım ve asenkron veri akışı sağlayacak yeni nesil pipeline modülü.
              </p>
            </div>

            <button disabled className="shrink-0 w-full md:w-auto px-6 py-3 rounded-xl font-medium bg-white/5 text-textMuted cursor-not-allowed border border-white/5">
              Yakında
            </button>
          </div>
        </div>
        {/* Proje Kartı 3 */}
        <div className="glass-panel rounded-3xl p-1 border border-white/5 opacity-60 hover:opacity-100 transition-opacity duration-300 animate-reveal delay-800">
          <div className="bg-surface/50 rounded-[22px] p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">

            <div className="w-16 h-16 shrink-0 bg-background rounded-2xl flex items-center justify-center border border-white/10">
              <ScanSearch className="w-8 h-8 text-textMuted" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-gray-100">Nesne Tespiti</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-medium flex items-center gap-1.5">
                  <Clock className="w-3 h-3" /> Geliştiriliyor
                </span>
              </div>
              <p className="text-textMuted leading-relaxed max-w-2xl text-sm mb-4">
                PyTorch tabanlı nesne tespit modeli. Görüntü içindeki nesneleri bounding box ile işaretler, sınıflandırır ve güven skorlarını raporlar.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-lg bg-white/5 text-gray-400 text-xs font-medium border border-white/10">PyTorch</span>
                <span className="px-3 py-1 rounded-lg bg-white/5 text-gray-400 text-xs font-medium border border-white/10">Computer Vision</span>
                <span className="px-3 py-1 rounded-lg bg-white/5 text-gray-400 text-xs font-medium border border-white/10">YOLO</span>
              </div>
            </div>

            <button disabled className="shrink-0 w-full md:w-auto px-6 py-3 rounded-xl font-medium bg-white/5 text-textMuted cursor-not-allowed border border-white/5">
              Yakında
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}