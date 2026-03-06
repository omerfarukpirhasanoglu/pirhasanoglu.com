import Link from "next/link";
import { ArrowRight, Cpu, Network, Layers, Terminal, ScanSearch, Clock } from "lucide-react";
import Footer from "@/src/components/layout/Footer";
import Image from "next/image";
export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center pt-20 pb-32 relative">
        
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-200 h-150 pointer-events-none z-0 animate-reveal"
          style={{
            background: 'radial-gradient(circle, rgba(0, 0, 22, 0.05) 7%, rgba(255, 161, 22, 0.60) 45%, transparent 80%)',
          }}
        />  

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-white/5 text-accent text-sm mb-8 animate-reveal delay-200 relative z-10">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          AI & Sistem Mimarisi
        </div>
        
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-linear-to-br from-white to-gray-400 bg-clip-text text-transparent animate-reveal delay-400">
            Veriyi Anlama Dönüştür
          </h1>
        </div>
        <p className="max-w-2xl text-lg text-textMuted mb-10 leading-relaxed relative z-10 animate-reveal delay-600">
          Deep Learning - Neural Networks - GPU Inference 
        </p>
        <div className="animate-reveal delay-800 relative z-10">
          <Link href="/dashboard" className="group flex items-center gap-2 bg-linear-to-br from-white to-gray-400 text-background px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors duration-250 soft-ease">
            Projeleri Keşfet 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-250" />
          </Link>
        </div>
      </main>
      {/*About Me*/}
      <section className="px-6 py-24 relative z-10 animate-reveal delay-1000">
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-8 md:p-12 
            border border-white/5 relative overflow-hidden group 
            transition-all duration-700 soft-ease
            hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/7">
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center border border-white/10 group-hover:border-accent/20 transition-colors duration-500">
              <Terminal className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Sistem Mimarı & Geliştirici</h2>
          </div>
          
          <div className="space-y-6 text-textMuted leading-relaxed text-lg">
            
            <Image src="/profile.png" alt="Ömer Faruk Pirhasanoğlu" width={90} height={90} style={{ borderRadius: "7%" }} />
            <h3 className="text-xl font-semibold text-white">Ömer Faruk PİRHASANOĞLU</h3>
            <p>
              Bilgisayar Mühendisliği 3.Sınıf öğrencisiyim. Yapıcı, Çözüm odaklı ve olabildiğince optimize AI teknolojileri geliştiriyorum.
            </p>
            <p>
              Keras API ile ANN, CNN, RNN, LSTM, GAN, RBFN, ResNets, DQL ve Transformers sinir ağı türleri ile modeller kurdum ve eğittim. PyTorch ile GPU destekli çıkarım (inference) ve FastAPI köprüsü geliştirdim.
            </p>
            <p>
              Projelerimde, veri ön işleme, model eğitimi, hiperparametre optimizasyonu ve üretim ortamına dağıtım süreçlerini kapsayan uçtan uca yapay zeka çözümleri sunmaktayım.
            </p>
            <p>
              Sıkıcı teknik laflar bir yana; bilgisayar denen ve mimarisine hayran olduğum bu çok havalı hesap makinesinin tabiri caizse "öğrenebiliyor" oluşu, içine doğduğum çağın en müthiş kırılma noktası gibi :D
              Dolayısı ile bu teknoloji ve insanımızın arasındaki pürüzler kaldırılmalı, AI okuryazarlığımız hem bireysel hem toplumsal ölçekte ilerleme kaydetmeli.
            </p>
            <p>
              Takdir edersiniz ki ben de geliştirdiğim sistemlerin ulaşılabilir olmasını misyon edindim ve bu platformu inşa ettim.
            </p>
            <p>Ben feedback panelini bitirene kadar öneriler için sosyal medya adreslerim aşağıda bulunuyor olacak.</p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="px-6 py-24 bg-surface/30 border-t border-white/5 relative overflow-hidden">
        {/*glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-accent/5 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/*header*/}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Yapay Zeka Araçları</h2>
            <p className="text-textMuted max-w-xl mx-auto">
              Kapsamlı veri setleriyle eğitilmiş sinir ağları ve üretim ortamına hazır, API destekli sistem mimarileri.
            </p>
          </div>
          
          {/*Grid*/}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            <Link href="/dashboard/tool-1" className="group glass-panel p-8 rounded-2xl hover:-translate-y-2 hover:border-white/10 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 soft-ease flex flex-col">
              <div className="w-14 h-14 bg-surface rounded-xl flex items-center justify-center mb-6 border border-white/5 group-hover:border-accent/30 transition-colors">
                <Cpu className="w-6 h-6 text-gray-400 group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-xl font-medium mb-3">Görüntü Sınıflandırma</h3>
              <p className="text-textMuted text-sm mb-8 flex-1 leading-relaxed">
                Keras tabanlı konvolüsyonel sinir ağları (CNN) kullanarak yüklenen görüntülerin özniteliklerini çıkarır ve yüksek doğrulukla analiz eder.
              </p>
              <div className="text-accent text-sm font-medium flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                Model ile Etkileşime Geç <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link href="/dashboard/tool-2" className="group glass-panel p-8 rounded-2xl hover:-translate-y-2 hover:border-white/10 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 soft-ease flex flex-col">
              <div className="w-14 h-14 bg-surface rounded-xl flex items-center justify-center mb-6 border border-white/5 group-hover:border-accent/30 transition-colors">
                <Network className="w-6 h-6 text-gray-400 group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-xl font-medium mb-3">Tensör İşleme Mimarisi</h3>
              <p className="text-textMuted text-sm mb-8 flex-1 leading-relaxed">
                PyTorch ortamında eğitilmiş modeller için GPU destekli çıkarım (inference) ve asenkron FastAPI köprüsü.
              </p>
              <div className="text-accent text-sm font-medium flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                İncele <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link href="/dashboard/tool-3" className="group glass-panel p-8 rounded-2xl hover:-translate-y-2 hover:border-white/10 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 soft-ease flex flex-col">
              <div className="group glass-panel p-8 rounded-2xl opacity-50 cursor-not-allowed flex flex-col">
                <div className="w-14 h-14 bg-surface rounded-xl flex items-center justify-center mb-6 border border-white/5">
                  <ScanSearch className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium mb-3">Nesne Tespiti</h3>
                <p className="text-textMuted text-sm mb-8 flex-1 leading-relaxed">
                  PyTorch tabanlı model ile görüntü içindeki nesneleri tespit eder, bounding box ile işaretler ve güven skorlarını raporlar.
                </p>
                <div className="text-gray-500 text-sm font-medium flex items-center gap-1">
                  Yakında <span className="ml-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs">Geliştiriliyor</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}