import Link from "next/link";
import { ArrowRight, Cpu, Network, Layers, Terminal, ScanSearch, Clock } from "lucide-react";
import Footer from "@/src/components/layout/Footer";
import Image from "next/image";
export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center pt-20 pb-32 relative overflow-hidden">

        {/* Node Network Background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <svg width="100%" height="100%" viewBox="0 0 680 340" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <style>{`
              .e   { fill: none; stroke: #c47d2a; stroke-width: 0.7; opacity: 0.17; }
              .eg  { fill: none; stroke: #888; stroke-width: 0.6; opacity: 0.18; }
              .ef  { fill: none; stroke: #777; stroke-width: 0.5; opacity: 0.13; }
              .nd  { fill: #c47d2a; }
              .ns  { fill: #666; }
              .nf  { fill: #555; }
              .lbl { fill: #b87428; font-family: ui-sans-serif, system-ui, sans-serif; font-size: 10px; opacity: 0.65; }
            `}</style>

            {/* FAR EDGE */}
            <circle cx="28"  cy="22"  r="1.8" className="nf"/>
            <circle cx="72"  cy="6"   r="1.4" className="nf"/>
            <circle cx="630" cy="20"  r="1.8" className="nf"/>
            <circle cx="672" cy="48"  r="1.4" className="nf"/>
            <circle cx="6"   cy="268" r="1.8" className="nf"/>
            <circle cx="38"  cy="318" r="1.4" className="nf"/>
            <circle cx="658" cy="295" r="1.8" className="nf"/>
            <circle cx="618" cy="330" r="1.4" className="nf"/>
            <circle cx="348" cy="4"   r="1.4" className="nf"/>
            <circle cx="322" cy="334" r="1.4" className="nf"/>
            <circle cx="142" cy="14"  r="1.4" className="nf"/>
            <circle cx="534" cy="10"  r="1.4" className="nf"/>
            <circle cx="22"  cy="140" r="1.4" className="nf"/>
            <circle cx="660" cy="168" r="1.4" className="nf"/>

            <line x1="28"  y1="22"  x2="88"  y2="76"  className="ef"/>
            <line x1="72"  y1="6"   x2="88"  y2="76"  className="ef"/>
            <line x1="630" y1="20"  x2="578" y2="62"  className="ef"/>
            <line x1="672" y1="48"  x2="578" y2="62"  className="ef"/>
            <line x1="6"   y1="268" x2="78"  y2="252" className="ef"/>
            <line x1="38"  y1="318" x2="158" y2="308" className="ef"/>
            <line x1="658" y1="295" x2="582" y2="274" className="ef"/>
            <line x1="618" y1="330" x2="582" y2="274" className="ef"/>
            <line x1="348" y1="4"   x2="308" y2="50"  className="ef"/>
            <line x1="322" y1="334" x2="348" y2="274" className="ef"/>
            <line x1="142" y1="14"  x2="210" y2="44"  className="ef"/>
            <line x1="534" y1="10"  x2="478" y2="38"  className="ef"/>
            <line x1="22"  y1="140" x2="78"  y2="252" className="ef"/>
            <line x1="22"  y1="140" x2="88"  y2="76"  className="ef"/>
            <line x1="660" y1="168" x2="582" y2="274" className="ef"/>
            <line x1="660" y1="168" x2="578" y2="62"  className="ef"/>

            {/* MID RING */}
            <circle cx="88"  cy="76"  r="3.2" className="ns"/>
            <circle cx="210" cy="44"  r="2.8" className="ns"/>
            <circle cx="578" cy="62"  r="3.0" className="ns"/>
            <circle cx="478" cy="38"  r="2.6" className="ns"/>
            <circle cx="78"  cy="252" r="3.2" className="ns"/>
            <circle cx="158" cy="308" r="2.5" className="ns"/>
            <circle cx="582" cy="274" r="3.0" className="ns"/>
            <circle cx="498" cy="294" r="2.6" className="ns"/>
            <circle cx="308" cy="50"  r="2.8" className="ns"/>
            <circle cx="348" cy="274" r="2.8" className="ns"/>
            <circle cx="55"  cy="160" r="2.5" className="ns"/>
            <circle cx="624" cy="178" r="2.5" className="ns"/>
            <circle cx="132" cy="302" r="2.4" className="ns"/>
            <circle cx="548" cy="282" r="2.4" className="ns"/>

            <line x1="88"  y1="76"  x2="210" y2="44"  className="eg"/>
            <line x1="210" y1="44"  x2="308" y2="50"  className="eg"/>
            <line x1="308" y1="50"  x2="478" y2="38"  className="eg"/>
            <line x1="478" y1="38"  x2="578" y2="62"  className="eg"/>
            <line x1="88"  y1="76"  x2="55"  y2="160" className="eg"/>
            <line x1="55"  y1="160" x2="78"  y2="252" className="eg"/>
            <line x1="78"  y1="252" x2="132" y2="302" className="eg"/>
            <line x1="132" y1="302" x2="158" y2="308" className="eg"/>
            <line x1="158" y1="308" x2="348" y2="274" className="eg"/>
            <line x1="348" y1="274" x2="498" y2="294" className="eg"/>
            <line x1="498" y1="294" x2="548" y2="282" className="eg"/>
            <line x1="548" y1="282" x2="582" y2="274" className="eg"/>
            <line x1="582" y1="274" x2="624" y2="178" className="eg"/>
            <line x1="624" y1="178" x2="578" y2="62"  className="eg"/>
            <line x1="210" y1="44"  x2="55"  y2="160" className="eg" opacity="0.10"/>
            <line x1="478" y1="38"  x2="624" y2="178" className="eg" opacity="0.10"/>
            <line x1="78"  y1="252" x2="158" y2="308" className="eg" opacity="0.10"/>
            <line x1="308" y1="50"  x2="348" y2="274" className="eg" opacity="0.08"/>
            <line x1="88"  y1="76"  x2="158" y2="308" className="eg" opacity="0.07"/>
            <line x1="578" y1="62"  x2="548" y2="282" className="eg" opacity="0.07"/>
            <line x1="55"  y1="160" x2="498" y2="294" className="eg" opacity="0.06"/>
            <line x1="624" y1="178" x2="158" y2="308" className="eg" opacity="0.06"/>

            {/* CORE NODES */}
            <circle cx="224" cy="88"  r="5.2" className="nd" opacity="0.62"/>
            <circle cx="352" cy="65"  r="6.2" className="nd" opacity="0.72"/>
            <circle cx="458" cy="98"  r="5.5" className="nd" opacity="0.65"/>
            <circle cx="158" cy="148" r="5.0" className="nd" opacity="0.58"/>
            <circle cx="518" cy="128" r="5.2" className="nd" opacity="0.60"/>
            <circle cx="108" cy="188" r="6.2" className="nd" opacity="0.74"/>
            <circle cx="572" cy="164" r="6.0" className="nd" opacity="0.72"/>
            <circle cx="186" cy="262" r="5.5" className="nd" opacity="0.64"/>
            <circle cx="358" cy="272" r="6.2" className="nd" opacity="0.72"/>
            <circle cx="468" cy="258" r="5.2" className="nd" opacity="0.62"/>
            <circle cx="148" cy="222" r="4.8" className="nd" opacity="0.56"/>
            <circle cx="534" cy="212" r="4.8" className="nd" opacity="0.56"/>

            <line x1="224" y1="88"  x2="352" y2="65"  className="e"/>
            <line x1="352" y1="65"  x2="458" y2="98"  className="e"/>
            <line x1="224" y1="88"  x2="158" y2="148" className="e"/>
            <line x1="458" y1="98"  x2="518" y2="128" className="e"/>
            <line x1="158" y1="148" x2="108" y2="188" className="e"/>
            <line x1="518" y1="128" x2="572" y2="164" className="e"/>
            <line x1="108" y1="188" x2="148" y2="222" className="e"/>
            <line x1="572" y1="164" x2="534" y2="212" className="e"/>
            <line x1="148" y1="222" x2="186" y2="262" className="e"/>
            <line x1="534" y1="212" x2="468" y2="258" className="e"/>
            <line x1="186" y1="262" x2="358" y2="272" className="e"/>
            <line x1="358" y1="272" x2="468" y2="258" className="e"/>
            <line x1="352" y1="65"  x2="108" y2="188" className="e" opacity="0.11"/>
            <line x1="352" y1="65"  x2="572" y2="164" className="e" opacity="0.11"/>
            <line x1="224" y1="88"  x2="358" y2="272" className="e" opacity="0.08"/>
            <line x1="458" y1="98"  x2="358" y2="272" className="e" opacity="0.08"/>
            <line x1="108" y1="188" x2="358" y2="272" className="e" opacity="0.10"/>
            <line x1="572" y1="164" x2="358" y2="272" className="e" opacity="0.10"/>
            <line x1="158" y1="148" x2="534" y2="212" className="e" opacity="0.08"/>
            <line x1="518" y1="128" x2="148" y2="222" className="e" opacity="0.08"/>
            <line x1="224" y1="88"  x2="468" y2="258" className="e" opacity="0.07"/>
            <line x1="458" y1="98"  x2="186" y2="262" className="e" opacity="0.07"/>

            <line x1="88"  y1="76"  x2="224" y2="88"  className="eg"/>
            <line x1="210" y1="44"  x2="224" y2="88"  className="eg"/>
            <line x1="308" y1="50"  x2="352" y2="65"  className="eg"/>
            <line x1="478" y1="38"  x2="458" y2="98"  className="eg"/>
            <line x1="578" y1="62"  x2="458" y2="98"  className="eg"/>
            <line x1="55"  y1="160" x2="108" y2="188" className="eg"/>
            <line x1="78"  y1="252" x2="148" y2="222" className="eg"/>
            <line x1="78"  y1="252" x2="186" y2="262" className="eg"/>
            <line x1="158" y1="308" x2="186" y2="262" className="eg"/>
            <line x1="348" y1="274" x2="358" y2="272" className="eg"/>
            <line x1="498" y1="294" x2="468" y2="258" className="eg"/>
            <line x1="582" y1="274" x2="534" y2="212" className="eg"/>
            <line x1="624" y1="178" x2="572" y2="164" className="eg"/>
            <line x1="210" y1="44"  x2="78"  y2="252" className="eg" opacity="0.08"/>
            <line x1="478" y1="38"  x2="582" y2="274" className="eg" opacity="0.08"/>
            <line x1="55"  y1="160" x2="498" y2="294" className="eg" opacity="0.07"/>
            <line x1="624" y1="178" x2="158" y2="308" className="eg" opacity="0.07"/>

            {/* GLOW */}
            <circle cx="352" cy="65"  r="24" fill="#c47d2a" opacity="0.055"/>
            <circle cx="108" cy="188" r="20" fill="#c47d2a" opacity="0.048"/>
            <circle cx="572" cy="164" r="20" fill="#c47d2a" opacity="0.048"/>
            <circle cx="358" cy="272" r="22" fill="#c47d2a" opacity="0.050"/>

            {/* PULSE */}
            <circle cx="352" cy="65" r="6.2" fill="#c47d2a">
              <animate attributeName="r"       values="6;22;6"    dur="4.0s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.6;0;0.6" dur="4.0s" repeatCount="indefinite"/>
            </circle>
            <circle cx="108" cy="188" r="6.2" fill="#c47d2a">
              <animate attributeName="r"       values="6;19;6"    dur="4.9s" repeatCount="indefinite" begin="1.4s"/>
              <animate attributeName="opacity" values="0.5;0;0.5" dur="4.9s" repeatCount="indefinite" begin="1.4s"/>
            </circle>
            <circle cx="572" cy="164" r="6.0" fill="#c47d2a">
              <animate attributeName="r"       values="6;19;6"    dur="5.3s" repeatCount="indefinite" begin="0.7s"/>
              <animate attributeName="opacity" values="0.5;0;0.5" dur="5.3s" repeatCount="indefinite" begin="0.7s"/>
            </circle>
            <circle cx="358" cy="272" r="6.2" fill="#c47d2a">
              <animate attributeName="r"       values="6;21;6"    dur="4.5s" repeatCount="indefinite" begin="2.1s"/>
              <animate attributeName="opacity" values="0.6;0;0.6" dur="4.5s" repeatCount="indefinite" begin="2.1s"/>
            </circle>

            {/* LABELS */}
            <text x="190" y="76"  textAnchor="middle" className="lbl">adam</text>
            <text x="352" y="48"  textAnchor="middle" className="lbl">∇loss</text>
            <text x="496" y="86"  textAnchor="middle" className="lbl">ReLU</text>
            <text x="68"  y="183" textAnchor="middle" className="lbl">dropout</text>
            <text x="618" y="152" textAnchor="middle" className="lbl">ε=1e-8</text>
            <text x="165" y="278" textAnchor="middle" className="lbl">softmax</text>
            <text x="358" y="292" textAnchor="middle" className="lbl">λ=0.01</text>
            <text x="510" y="272" textAnchor="middle" className="lbl">τ=0.5</text>
          </svg>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-black/5 text-accent text-sm mb-8 animate-reveal delay-200 relative z-10">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          AI & Sistem Mimarisi
        </div>
        
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-stone-900 animate-reveal delay-400">
            Veriyi Anlama Dönüştür
          </h1>
        </div>
        <p className="max-w-2xl text-lg text-textMuted mb-10 leading-relaxed relative z-10 animate-reveal delay-600">
          Deep Learning - Computer Vision - GPU Inference 
        </p>
        <div className="animate-reveal delay-800 relative z-10">
          <Link href="/dashboard" className="group flex items-center gap-2 bg-stone-800 text-[#e8e4df] px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors duration-250 soft-ease">
            Projeleri Keşfet 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-250" />
          </Link>
        </div>
      </main>
      {/*About Me*/}
      <section className="px-6 py-24 relative z-10 animate-reveal delay-1000">
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-8 md:p-12 
            border border-black/5 relative overflow-hidden group 
            transition-all duration-700 soft-ease
            hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/7">
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center border border-black/10 group-hover:border-accent/20 transition-colors duration-500">
              <Terminal className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Sistem Mimarı & Geliştirici</h2>
          </div>
          
          <div className="space-y-6 text-textMuted leading-relaxed text-lg">
            
            <Image src="/profile.png" alt="Ömer Faruk Pirhasanoğlu" width={90} height={90} style={{ borderRadius: "7%" }} />
            <h3 className="text-xl font-semibold text-stone-900">Ömer Faruk PİRHASANOĞLU</h3>
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
      <section className="px-6 py-24 bg-surface/50 border-t border-black/5 relative overflow-hidden">
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
            
            <Link href="/dashboard/tool-1" className="group glass-panel p-8 rounded-2xl hover:-translate-y-2 hover:border-black/10 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 soft-ease flex flex-col">
              <div className="w-14 h-14 bg-surface rounded-xl flex items-center justify-center mb-6 border border-black/5 group-hover:border-accent/30 transition-colors">
                <Cpu className="w-6 h-6 text-gray-400 group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-xl font-medium mb-3">Görüntü Sınıflandırma - Stil Analizi</h3>
              <p className="text-textMuted text-sm mb-8 flex-1 leading-relaxed">
                Keras kullanılarak eğitilmiş Convolutional Neural Network modelim. Yüklenen görüntülerin her bir pikselini özenle analiz eder.
              </p>
              <div className="text-accent text-sm font-medium flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                Model ile Etkileşime Geç <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link href="/dashboard/tool-2" className="group glass-panel p-8 rounded-2xl hover:-translate-y-2 hover:border-black/10 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 soft-ease flex flex-col">
              <div className="w-14 h-14 bg-surface rounded-xl flex items-center justify-center mb-6 border border-black/5 group-hover:border-accent/30 transition-colors">
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

            <Link href="/dashboard/tool-3" className="group glass-panel p-8 rounded-2xl hover:-translate-y-2 hover:border-black/10 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 soft-ease flex flex-col">
              <div className="group glass-panel p-8 rounded-2xl opacity-50 cursor-not-allowed flex flex-col">
                <div className="w-14 h-14 bg-surface rounded-xl flex items-center justify-center mb-6 border border-black/5">
                  <ScanSearch className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium mb-3">Nesne Tespiti</h3>
                <p className="text-textMuted text-sm mb-8 flex-1 leading-relaxed">
                  PyTorch tabanlı model ile görüntü içindeki nesneleri tespit eder, bounding box ile işaretler ve güven skorlarını raporlar.
                </p>
                <div className="text-gray-500 text-sm font-medium flex items-center gap-1">
                  Yakında <span className="ml-1 px-2 py-0.5 rounded-full bg-white/5 border border-black/10 text-xs">Geliştiriliyor</span>
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