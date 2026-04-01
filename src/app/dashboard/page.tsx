import Link from "next/link";
import { 
  ArrowRight, 
  Clock 
} from "lucide-react";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="relative w-full min-h-screen pb-20">
      
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/dashboardback.jpg"
          alt="Dashboard Background"
          fill
          className="object-cover object-center opacity-30"
          priority
        />
      </div>

      <div className="max-w-6xl mx-auto w-full flex flex-col gap-10 relative z-10 px-4 md:px-0 pt-8">
        
        {/* Metrics */}
        <div className="flex flex-col gap-8 animate-reveal">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-100 mb-2">Proje Paneli</h1>
          </div>

          {/* Vision Bar */}
          <div className="inline-flex items-center gap-0 px-7.5 h-15 bg-white/5 backdrop-blur-sm border border-white/[0.07] shadow-lg shadow-black/80 rounded-sm whitespace-nowrap overflow-hidden">
            <span className="text-accent font-mono text-[23px] mr-3.5">❯</span>
            <span
              className="text-[17px] font-semibold font-mono"
              style={{
                background: "linear-gradient(90deg, #f75f5f 0%, #f9964a 40%, #ffd44f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              çözüm odaklı
              <span style={{ WebkitTextFillColor: "rgba(255,255,255,0.15)", background: "none" }}> · </span>
              optimize
              <span style={{ WebkitTextFillColor: "rgba(255,255,255,0.15)", background: "none" }}> · </span>
              ölçeklenebilir
            </span>
            <span className="text-[17px] text-[#555] font-mono ml-3.5">AI teknolojileri</span>
          </div>
        </div>

        {/* Ana Projeler Listesi */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-gray-200 animate-reveal delay-200">Modellerim</h2>
          
          {/* Proje Kartı 1: Chroma */}
          <div className="rounded-sm border border-white/5 group hover:border-accent/30 shadow-lg shadow-black/80 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 animate-reveal delay-200 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-96 h-full bg-linear-to-r from-accent/7 to-transparent pointer-events-none"></div>
            
            <div className="rounded-sm flex flex-col md:flex-row relative z-10">
              
              {/* Sol metin */}
              <div className="md:w-[55%] p-6 md:p-8 flex flex-col min-w-0">
                {/* isim + badge + tag'ler */}
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <h3 className="text-xl font-bold text-gray-100">Chroma</h3>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-sm bg-accent/10 border border-accent/20 text-accent">v1.2</span>
                  <span className="px-2 py-0.5 rounded-sm bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>yayında
                  </span>
                  <div className="flex flex-wrap gap-1.5 ml-1">
                    <span className="px-2.5 py-0.5 rounded-sm bg-white/5 text-gray-400 text-xs font-medium border border-white/5">Keras</span>
                    <span className="px-2.5 py-0.5 rounded-sm bg-white/5 text-gray-400 text-xs font-medium border border-white/5">FastAPI</span>
                    <span className="px-2.5 py-0.5 rounded-sm bg-white/5 text-gray-400 text-xs font-medium border border-white/5">Python</span>
                    <span className="px-2.5 py-0.5 rounded-sm bg-white/5 text-gray-400 text-xs font-medium border border-white/5">React</span>
                  </div>
                </div>

                {/* Açıklama */}
                <p className="text-textMuted leading-relaxed flex-1 mb-4">
                  FastAPI backendine bağlı, Keras tabanlı konvolüsyonel sinir ağları (CNN) kullanarak yüklenen görüntülerin özniteliklerini çıkaran ve yüksek doğrulukla analiz eden modelim.
                  Bu model sayesinde tarzınızı uzman bir yapay zekanın detaylı metrikleriyle inceleyebilirsiniz.
                </p>

                {/* Buton */}
                <Link href="/dashboard/tool-1" className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-accent to-[#ffd44f] text-[#1a0808] px-5 py-2.5 rounded-sm font-semibold text-sm hover:opacity-90 transition-opacity duration-250">
                  Modeli İncele
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Sağ: inference sonucu */}
              <div className="md:w-[45%] shrink-0 border-t md:border-t-0 md:border-l border-white/5 relative overflow-hidden" style={{minHeight: "300px", background: "transparent"}}>
                <Image
                  src="/sample-output.jpg"
                  alt="örnek çıktı"
                  fill
                  className="object-cover object-center"
                />
              </div>

            </div>
          </div>

          {/* Proje Kartı 2: Tensör İşleme */}
          <div className="glass-panel rounded-sm p-1 border border-white/5 opacity-60 hover:opacity-100 transition-opacity duration-300 animate-reveal delay-600 backdrop-blur-md">
            <div className="bg-surface/50 rounded-sm p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-100 text-opacity-80">Tensör İşleme Mimarisi</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-medium flex items-center gap-1.5">
                    <Clock className="w-3 h-3" /> Geliştiriliyor
                  </span>
                </div>
                <p className="text-textMuted leading-relaxed max-w-2xl">
                  PyTorch ortamında eğitilmiş modeller için GPU destekli çıkarım ve asenkron veri akışı sağlayacak yeni nesil pipeline modülü.
                </p>
              </div>

              <button disabled className="shrink-0 w-full md:w-auto px-6 py-3 rounded-sm font-medium bg-white/5 text-textMuted cursor-not-allowed border border-white/5">
                Yakında
              </button>
            </div>
          </div>
          
          {/* Proje Kartı 3: Nesne Tespiti */}
          <div className="glass-panel rounded-sm p-1 border border-white/5 opacity-60 hover:opacity-100 transition-opacity duration-300 animate-reveal delay-800 backdrop-blur-md">
            <div className="bg-surface/50 rounded-sm p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-100">Nesne Tespiti</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-medium flex items-center gap-1.5">
                    <Clock className="w-3 h-3" /> Geliştiriliyor
                  </span>
                </div>
                <p className="text-textMuted leading-relaxed max-w-2xl">
                  PyTorch tabanlı nesne tespit modeli. Görüntü içindeki nesneleri bounding box ile işaretler, sınıflandırır ve güven skorlarını raporlar.
                </p>
              </div>

              <button disabled className="shrink-0 w-full md:w-auto px-6 py-3 rounded-sm font-medium bg-white/5 text-textMuted cursor-not-allowed border border-white/5">
                Yakında
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}