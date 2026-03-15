import Link from "next/link";
import { ArrowRight, Cpu, Network, Layers, Terminal, ScanSearch} from "lucide-react";
import Footer from "@/src/components/layout/Footer";
import Image from "next/image";
export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 px-4 pointer-events-none">
        <nav className="w-full flex items-center justify-between px-6 h-10 pointer-events-auto"
          style={{
            background: "rgba(33,33,33,0.38)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "0.5px solid rgba(255,255,255,0.08)",
            borderRadius: "6px",
          }}>
          <Link href="/" className="text-sm font-medium text-[#c8c4be] tracking-wide hover:text-white transition-colors duration-200">
            omer pirhasanoglu
          </Link>
          <div className="flex items-center">
            <Link
              href="https://github.com/omerfarukpirhasanoglu"
              target="_blank"
              className="text-xs text-[#777] hover:text-[#c8c4be] transition-colors duration-200 px-3 py-1"
            >
              GitHub
            </Link>
            <span className="text-[#3a3a3a] text-xs select-none">|</span>
            <Link
              href="https://www.linkedin.com/in/omer-pirhasanoglu"
              target="_blank"
              className="text-xs text-[#777] hover:text-[#c8c4be] transition-colors duration-200 px-3 py-1"
            >
              LinkedIn
            </Link>
            <span className="text-[#3a3a3a] text-xs select-none">|</span>
            <Link
              href="https://www.instagram.com/omerpirhasanoglu"
              target="_blank"
              className="text-xs text-[#777] hover:text-[#c8c4be] transition-colors duration-200 px-3 py-1"
            >
              Instagram
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center pt-40 pb-48 relative overflow-hidden">

        {/* Node Network Background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <svg width="100%" height="100%" viewBox="0 0 680 400" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="fireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f75f5f"/>
                <stop offset="50%" stopColor="#f9964a"/>
                <stop offset="100%" stopColor="#ffd44f"/>
              </linearGradient>
            </defs>
            <style>{`
              .e   { fill: none; stroke: url(#fireGrad); stroke-width: 0.7; opacity: 0.17; }
              .eg  { fill: none; stroke: #888; stroke-width: 0.6; opacity: 0.18; }
              .ef  { fill: none; stroke: #777; stroke-width: 0.5; opacity: 0.13; }
              .nd  { fill: url(#fireGrad); }
              .ns  { fill: #666; }
              .nf  { fill: #555; }
              .lbl { fill: #f9964a; font-family: ui-sans-serif, system-ui, sans-serif; font-size: 10px; opacity: 0.65; }
            `}</style>
            <g transform="scale(0.80) translate(82, 40)"></g>
            {/* FAR EDGE dim nodes */}
            <circle cx="28"  cy="32"  r="1.8" className="nf"/>
            <circle cx="72"  cy="8"   r="1.4" className="nf"/>
            <circle cx="630" cy="30"  r="1.8" className="nf"/>
            <circle cx="672" cy="62"  r="1.4" className="nf"/>
            <circle cx="6"   cy="325" r="1.8" className="nf"/>
            <circle cx="38"  cy="382" r="1.4" className="nf"/>
            <circle cx="658" cy="355" r="1.8" className="nf"/>
            <circle cx="618" cy="392" r="1.4" className="nf"/>
            <circle cx="348" cy="6"   r="1.4" className="nf"/>
            <circle cx="322" cy="398" r="1.4" className="nf"/>
            <circle cx="142" cy="18"  r="1.4" className="nf"/>
            <circle cx="534" cy="14"  r="1.4" className="nf"/>
            <circle cx="22"  cy="172" r="1.4" className="nf"/>
            <circle cx="660" cy="205" r="1.4" className="nf"/>

            {/* far edge lines */}
            <line x1="28"  y1="32"  x2="88"  y2="98"  className="ef"/>
            <line x1="72"  y1="8"   x2="88"  y2="98"  className="ef"/>
            <line x1="630" y1="30"  x2="578" y2="80"  className="ef"/>
            <line x1="672" y1="62"  x2="578" y2="80"  className="ef"/>
            <line x1="6"   y1="325" x2="78"  y2="304" className="ef"/>
            <line x1="38"  y1="382" x2="158" y2="368" className="ef"/>
            <line x1="658" y1="355" x2="582" y2="328" className="ef"/>
            <line x1="618" y1="392" x2="582" y2="328" className="ef"/>
            <line x1="348" y1="6"   x2="308" y2="64"  className="ef"/>
            <line x1="322" y1="398" x2="348" y2="328" className="ef"/>
            <line x1="142" y1="18"  x2="210" y2="58"  className="ef"/>
            <line x1="534" y1="14"  x2="478" y2="52"  className="ef"/>
            <line x1="22"  y1="172" x2="78"  y2="304" className="ef"/>
            <line x1="22"  y1="172" x2="88"  y2="98"  className="ef"/>
            <line x1="660" y1="205" x2="582" y2="328" className="ef"/>
            <line x1="660" y1="205" x2="578" y2="80"  className="ef"/>

            {/* MID RING */}
            <circle cx="88"  cy="98"  r="3.2" className="ns"/>
            <circle cx="210" cy="58"  r="2.8" className="ns"/>
            <circle cx="578" cy="80"  r="3.0" className="ns"/>
            <circle cx="478" cy="52"  r="2.6" className="ns"/>
            <circle cx="78"  cy="304" r="3.2" className="ns"/>
            <circle cx="158" cy="368" r="2.5" className="ns"/>
            <circle cx="582" cy="328" r="3.0" className="ns"/>
            <circle cx="498" cy="350" r="2.6" className="ns"/>
            <circle cx="308" cy="64"  r="2.8" className="ns"/>
            <circle cx="348" cy="328" r="2.8" className="ns"/>
            <circle cx="55"  cy="195" r="2.5" className="ns"/>
            <circle cx="624" cy="215" r="2.5" className="ns"/>
            <circle cx="132" cy="360" r="2.4" className="ns"/>
            <circle cx="548" cy="338" r="2.4" className="ns"/>

            {/* mid ring edges */}
            <line x1="88"  y1="98"  x2="210" y2="58"  className="eg"/>
            <line x1="210" y1="58"  x2="308" y2="64"  className="eg"/>
            <line x1="308" y1="64"  x2="478" y2="52"  className="eg"/>
            <line x1="478" y1="52"  x2="578" y2="80"  className="eg"/>
            <line x1="88"  y1="98"  x2="55"  y2="195" className="eg"/>
            <line x1="55"  y1="195" x2="78"  y2="304" className="eg"/>
            <line x1="78"  y1="304" x2="132" y2="360" className="eg"/>
            <line x1="132" y1="360" x2="158" y2="368" className="eg"/>
            <line x1="158" y1="368" x2="348" y2="328" className="eg"/>
            <line x1="348" y1="328" x2="498" y2="350" className="eg"/>
            <line x1="498" y1="350" x2="548" y2="338" className="eg"/>
            <line x1="548" y1="338" x2="582" y2="328" className="eg"/>
            <line x1="582" y1="328" x2="624" y2="215" className="eg"/>
            <line x1="624" y1="215" x2="578" y2="80"  className="eg"/>
            <line x1="210" y1="58"  x2="55"  y2="195" className="eg" opacity="0.10"/>
            <line x1="478" y1="52"  x2="624" y2="215" className="eg" opacity="0.10"/>
            <line x1="78"  y1="304" x2="158" y2="368" className="eg" opacity="0.10"/>
            <line x1="308" y1="64"  x2="348" y2="328" className="eg" opacity="0.08"/>
            <line x1="88"  y1="98"  x2="158" y2="368" className="eg" opacity="0.07"/>
            <line x1="578" y1="80"  x2="548" y2="338" className="eg" opacity="0.07"/>
            <line x1="210" y1="58"  x2="348" y2="328" className="eg" opacity="0.06"/>
            <line x1="478" y1="52"  x2="132" y2="360" className="eg" opacity="0.06"/>
            <line x1="55"  y1="195" x2="498" y2="350" className="eg" opacity="0.06"/>
            <line x1="624" y1="215" x2="158" y2="368" className="eg" opacity="0.06"/>

            {/* CORE NODES */}
            <circle cx="224" cy="108" r="5.2" className="nd" opacity="0.62"/>
            <circle cx="352" cy="82"  r="6.2" className="nd" opacity="0.72"/>
            <circle cx="458" cy="122" r="5.5" className="nd" opacity="0.65"/>
            <circle cx="158" cy="182" r="5.0" className="nd" opacity="0.58"/>
            <circle cx="518" cy="158" r="5.2" className="nd" opacity="0.60"/>
            <circle cx="108" cy="225" r="6.2" className="nd" opacity="0.74"/>
            <circle cx="572" cy="198" r="6.0" className="nd" opacity="0.72"/>
            <circle cx="186" cy="312" r="5.5" className="nd" opacity="0.64"/>
            <circle cx="358" cy="322" r="6.2" className="nd" opacity="0.72"/>
            <circle cx="468" cy="308" r="5.2" className="nd" opacity="0.62"/>
            <circle cx="148" cy="262" r="4.8" className="nd" opacity="0.56"/>
            <circle cx="534" cy="252" r="4.8" className="nd" opacity="0.56"/>

            {/* core edges accent */}
            <line x1="224" y1="108" x2="352" y2="82"  className="e"/>
            <line x1="352" y1="82"  x2="458" y2="122" className="e"/>
            <line x1="224" y1="108" x2="158" y2="182" className="e"/>
            <line x1="458" y1="122" x2="518" y2="158" className="e"/>
            <line x1="158" y1="182" x2="108" y2="225" className="e"/>
            <line x1="518" y1="158" x2="572" y2="198" className="e"/>
            <line x1="108" y1="225" x2="148" y2="262" className="e"/>
            <line x1="572" y1="198" x2="534" y2="252" className="e"/>
            <line x1="148" y1="262" x2="186" y2="312" className="e"/>
            <line x1="534" y1="252" x2="468" y2="308" className="e"/>
            <line x1="186" y1="312" x2="358" y2="322" className="e"/>
            <line x1="358" y1="322" x2="468" y2="308" className="e"/>
            <line x1="352" y1="82"  x2="108" y2="225" className="e" opacity="0.11"/>
            <line x1="352" y1="82"  x2="572" y2="198" className="e" opacity="0.11"/>
            <line x1="224" y1="108" x2="358" y2="322" className="e" opacity="0.08"/>
            <line x1="458" y1="122" x2="358" y2="322" className="e" opacity="0.08"/>
            <line x1="108" y1="225" x2="358" y2="322" className="e" opacity="0.10"/>
            <line x1="572" y1="198" x2="358" y2="322" className="e" opacity="0.10"/>
            <line x1="158" y1="182" x2="534" y2="252" className="e" opacity="0.08"/>
            <line x1="518" y1="158" x2="148" y2="262" className="e" opacity="0.08"/>
            <line x1="224" y1="108" x2="468" y2="308" className="e" opacity="0.07"/>
            <line x1="458" y1="122" x2="186" y2="312" className="e" opacity="0.07"/>
            <line x1="352" y1="82"  x2="186" y2="312" className="e" opacity="0.07"/>
            <line x1="352" y1="82"  x2="468" y2="308" className="e" opacity="0.07"/>

            {/* core–mid */}
            <line x1="88"  y1="98"  x2="224" y2="108" className="eg"/>
            <line x1="210" y1="58"  x2="224" y2="108" className="eg"/>
            <line x1="308" y1="64"  x2="352" y2="82"  className="eg"/>
            <line x1="478" y1="52"  x2="458" y2="122" className="eg"/>
            <line x1="578" y1="80"  x2="458" y2="122" className="eg"/>
            <line x1="55"  y1="195" x2="108" y2="225" className="eg"/>
            <line x1="78"  y1="304" x2="148" y2="262" className="eg"/>
            <line x1="78"  y1="304" x2="186" y2="312" className="eg"/>
            <line x1="158" y1="368" x2="186" y2="312" className="eg"/>
            <line x1="348" y1="328" x2="358" y2="322" className="eg"/>
            <line x1="498" y1="350" x2="468" y2="308" className="eg"/>
            <line x1="582" y1="328" x2="534" y2="252" className="eg"/>
            <line x1="624" y1="215" x2="572" y2="198" className="eg"/>
            <line x1="210" y1="58"  x2="78"  y2="304" className="eg" opacity="0.08"/>
            <line x1="478" y1="52"  x2="582" y2="328" className="eg" opacity="0.08"/>
            <line x1="88"  y1="98"  x2="348" y2="328" className="eg" opacity="0.07"/>
            <line x1="578" y1="80"  x2="132" y2="360" className="eg" opacity="0.07"/>
            <line x1="55"  y1="195" x2="498" y2="350" className="eg" opacity="0.07"/>
            <line x1="624" y1="215" x2="158" y2="368" className="eg" opacity="0.07"/>

            {/* GLOW */}
            <circle cx="352" cy="82"  r="24" fill="#f75f5f" opacity="0.055"/>
            <circle cx="108" cy="225" r="20" fill="#ffd44f" opacity="0.048"/>
            <circle cx="572" cy="198" r="20" fill="#f9964a" opacity="0.048"/>
            <circle cx="358" cy="322" r="22" fill="#f9964a" opacity="0.050"/>

            {/* PULSE */}
            <circle cx="352" cy="82" r="6.2" fill="#f75f5f">
              <animate attributeName="r"       values="6;22;6"    dur="4.0s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.6;0;0.6" dur="4.0s" repeatCount="indefinite"/>
            </circle>
            <circle cx="108" cy="225" r="6.2" fill="#f9964a">
              <animate attributeName="r"       values="6;19;6"    dur="4.9s" repeatCount="indefinite" begin="1.4s"/>
              <animate attributeName="opacity" values="0.5;0;0.5" dur="4.9s" repeatCount="indefinite" begin="1.4s"/>
            </circle>
            <circle cx="572" cy="198" r="6.0" fill="#ffd44f">
              <animate attributeName="r"       values="6;19;6"    dur="5.3s" repeatCount="indefinite" begin="0.7s"/>
              <animate attributeName="opacity" values="0.5;0;0.5" dur="5.3s" repeatCount="indefinite" begin="0.7s"/>
            </circle>
            <circle cx="358" cy="322" r="6.2" fill="#f9964a">
              <animate attributeName="r"       values="6;21;6"    dur="4.5s" repeatCount="indefinite" begin="2.1s"/>
              <animate attributeName="opacity" values="0.6;0;0.6" dur="4.5s" repeatCount="indefinite" begin="2.1s"/>
            </circle>
            <circle cx="224" cy="108" r="5.2" fill="#f75f5f">
              <animate attributeName="r"       values="5;16;5"    dur="5.8s" repeatCount="indefinite" begin="0.3s"/>
              <animate attributeName="opacity" values="0.4;0;0.4" dur="5.8s" repeatCount="indefinite" begin="0.3s"/>
            </circle>
            <circle cx="468" cy="308" r="5.2" fill="#ffd44f">
              <animate attributeName="r"       values="5;16;5"    dur="4.2s" repeatCount="indefinite" begin="3.1s"/>
              <animate attributeName="opacity" values="0.4;0;0.4" dur="4.2s" repeatCount="indefinite" begin="3.1s"/>
            </circle>

            {/* LABELS */}
            <text x="190" y="96"  textAnchor="middle" className="lbl">adam</text>
            <text x="352" y="65"  textAnchor="middle" className="lbl">∇loss</text>
            <text x="496" y="110" textAnchor="middle" className="lbl">ReLU</text>
            <text x="68"  y="220" textAnchor="middle" className="lbl">dropout</text>
            <text x="618" y="186" textAnchor="middle" className="lbl">ε=1e-8</text>
            <text x="165" y="326" textAnchor="middle" className="lbl">softmax</text>
            <text x="358" y="344" textAnchor="middle" className="lbl">λ=0.01</text>
            <text x="510" y="322" textAnchor="middle" className="lbl">τ=0.5</text>
          </svg>
        </div>
        
        <div className="relative z-10 flex flex-col items-center mt-8"></div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-black/5 text-accent text-sm mb-8 animate-reveal delay-200 relative z-10">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          AI & Sistem Mimarisi
        </div>
        
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent animate-reveal delay-400">
            Veriyi Anlama Dönüştür
          </h1>
        </div>
        <p className="max-w-2xl text-lg text-textMuted mb-10 leading-relaxed relative z-10 animate-reveal delay-600">
          Deep Learning - Computer Vision - GPU Inference 
        </p>
        <div className="animate-reveal delay-800 relative z-10">
          <Link href="/dashboard" className="group flex items-center gap-2 bg-linear-to-r from-accent to-[#ffd44f] text-[#1a0808] px-6 py-3 rounded-sm font-semibold hover:opacity-90 transition-colors duration-250 soft-ease">
            Projeleri Keşfet 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-250" />
          </Link>
        </div>
      </main>
      {/*About Me*/}
      <section className="px-6 py-24 relative z-10 animate-reveal delay-1000">

        {/* Arkaplan SVG */}
        <div className="absolute pointer-events-none" style={{zIndex: 0, inset: "-96px -100px"}}>
          <svg width="100%" height="100%" viewBox="0 0 680 440" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="aboutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f75f5f"/>
                <stop offset="50%" stopColor="#f9964a"/>
                <stop offset="100%" stopColor="#ffd44f"/>
              </linearGradient>
            </defs>
            <circle cx="18"  cy="42"  r="1.4" fill="#383838"/>
            <circle cx="648" cy="28"  r="1.6" fill="#383838"/>
            <circle cx="12"  cy="388" r="1.4" fill="#383838"/>
            <circle cx="662" cy="375" r="1.6" fill="#383838"/>
            <circle cx="355" cy="6"   r="1.4" fill="#383838"/>
            <circle cx="88"  cy="188" r="1.5" fill="#404040"/>
            <circle cx="592" cy="142" r="1.5" fill="#404040"/>
            <circle cx="44"  cy="312" r="1.4" fill="#383838"/>
            <circle cx="630" cy="298" r="1.5" fill="#404040"/>
            <circle cx="288" cy="402" r="1.4" fill="#383838"/>
            <circle cx="508" cy="12"  r="1.3" fill="#383838"/>
            <circle cx="142" cy="18"  r="1.4" fill="#383838"/>
            <circle cx="112" cy="72"  r="2.4" fill="#505050"/>
            <circle cx="248" cy="48"  r="2.2" fill="#4a4a4a"/>
            <circle cx="455" cy="38"  r="2.2" fill="#4a4a4a"/>
            <circle cx="572" cy="88"  r="2.4" fill="#505050"/>
            <circle cx="68"  cy="255" r="2.4" fill="#505050"/>
            <circle cx="618" cy="232" r="2.2" fill="#4a4a4a"/>
            <circle cx="105" cy="368" r="2.2" fill="#4a4a4a"/>
            <circle cx="188" cy="395" r="2.0" fill="#444"/>
            <circle cx="498" cy="388" r="2.2" fill="#4a4a4a"/>
            <circle cx="578" cy="348" r="2.4" fill="#505050"/>
            <circle cx="322" cy="58"  r="2.2" fill="#4a4a4a"/>
            <circle cx="158" cy="338" r="2.0" fill="#444"/>
            <circle cx="542" cy="318" r="2.0" fill="#444"/>
            <line x1="112" y1="72"  x2="248" y2="48"  stroke="#484848" strokeWidth="0.5" opacity="0.55"/>
            <line x1="248" y1="48"  x2="322" y2="58"  stroke="#484848" strokeWidth="0.5" opacity="0.5"/>
            <line x1="322" y1="58"  x2="455" y2="38"  stroke="#484848" strokeWidth="0.5" opacity="0.5"/>
            <line x1="455" y1="38"  x2="572" y2="88"  stroke="#484848" strokeWidth="0.5" opacity="0.55"/>
            <line x1="112" y1="72"  x2="68"  y2="255" stroke="#484848" strokeWidth="0.4" opacity="0.4"/>
            <line x1="572" y1="88"  x2="618" y2="232" stroke="#484848" strokeWidth="0.4" opacity="0.4"/>
            <line x1="68"  y1="255" x2="105" y2="368" stroke="#484848" strokeWidth="0.4" opacity="0.4"/>
            <line x1="618" y1="232" x2="578" y2="348" stroke="#484848" strokeWidth="0.4" opacity="0.4"/>
            <line x1="105" y1="368" x2="188" y2="395" stroke="#484848" strokeWidth="0.4" opacity="0.4"/>
            <line x1="188" y1="395" x2="498" y2="388" stroke="#484848" strokeWidth="0.4" opacity="0.4"/>
            <line x1="498" y1="388" x2="578" y2="348" stroke="#484848" strokeWidth="0.4" opacity="0.4"/>
            <line x1="248" y1="48"  x2="68"  y2="255" stroke="#484848" strokeWidth="0.4" opacity="0.25"/>
            <line x1="455" y1="38"  x2="618" y2="232" stroke="#484848" strokeWidth="0.4" opacity="0.25"/>
            <line x1="158" y1="338" x2="105" y2="368" stroke="#484848" strokeWidth="0.4" opacity="0.3"/>
            <line x1="542" y1="318" x2="578" y2="348" stroke="#484848" strokeWidth="0.4" opacity="0.3"/>
            <circle cx="205" cy="118" r="4.8" fill="url(#aboutGrad)" opacity="0.60"/>
            <circle cx="358" cy="82"  r="6.0" fill="url(#aboutGrad)" opacity="0.78"/>
            <circle cx="488" cy="135" r="4.5" fill="url(#aboutGrad)" opacity="0.62"/>
            <circle cx="148" cy="205" r="4.5" fill="url(#aboutGrad)" opacity="0.58"/>
            <circle cx="535" cy="188" r="5.0" fill="url(#aboutGrad)" opacity="0.68"/>
            <circle cx="115" cy="298" r="4.8" fill="url(#aboutGrad)" opacity="0.62"/>
            <circle cx="278" cy="252" r="5.5" fill="url(#aboutGrad)" opacity="0.75"/>
            <circle cx="435" cy="268" r="5.2" fill="url(#aboutGrad)" opacity="0.72"/>
            <circle cx="558" cy="302" r="4.5" fill="url(#aboutGrad)" opacity="0.60"/>
            <circle cx="195" cy="348" r="4.2" fill="url(#aboutGrad)" opacity="0.55"/>
            <circle cx="382" cy="335" r="5.5" fill="url(#aboutGrad)" opacity="0.74"/>
            <circle cx="505" cy="358" r="4.0" fill="url(#aboutGrad)" opacity="0.52"/>
            <line x1="205" y1="118" x2="358" y2="82"  stroke="url(#aboutGrad)" strokeWidth="0.7" opacity="0.2"/>
            <line x1="358" y1="82"  x2="488" y2="135" stroke="url(#aboutGrad)" strokeWidth="0.7" opacity="0.2"/>
            <line x1="205" y1="118" x2="148" y2="205" stroke="url(#aboutGrad)" strokeWidth="0.6" opacity="0.18"/>
            <line x1="488" y1="135" x2="535" y2="188" stroke="url(#aboutGrad)" strokeWidth="0.6" opacity="0.18"/>
            <line x1="148" y1="205" x2="115" y2="298" stroke="url(#aboutGrad)" strokeWidth="0.6" opacity="0.17"/>
            <line x1="535" y1="188" x2="558" y2="302" stroke="url(#aboutGrad)" strokeWidth="0.6" opacity="0.17"/>
            <line x1="278" y1="252" x2="435" y2="268" stroke="url(#aboutGrad)" strokeWidth="0.7" opacity="0.22"/>
            <line x1="115" y1="298" x2="195" y2="348" stroke="url(#aboutGrad)" strokeWidth="0.6" opacity="0.16"/>
            <line x1="195" y1="348" x2="382" y2="335" stroke="url(#aboutGrad)" strokeWidth="0.7" opacity="0.2"/>
            <line x1="382" y1="335" x2="505" y2="358" stroke="url(#aboutGrad)" strokeWidth="0.6" opacity="0.16"/>
            <line x1="505" y1="358" x2="558" y2="302" stroke="url(#aboutGrad)" strokeWidth="0.6" opacity="0.16"/>
            <line x1="358" y1="82"  x2="278" y2="252" stroke="url(#aboutGrad)" strokeWidth="0.7" opacity="0.14"/>
            <line x1="358" y1="82"  x2="435" y2="268" stroke="url(#aboutGrad)" strokeWidth="0.7" opacity="0.14"/>
            <line x1="148" y1="205" x2="278" y2="252" stroke="url(#aboutGrad)" strokeWidth="0.6" opacity="0.13"/>
            <line x1="535" y1="188" x2="435" y2="268" stroke="url(#aboutGrad)" strokeWidth="0.6" opacity="0.13"/>
            <line x1="278" y1="252" x2="382" y2="335" stroke="url(#aboutGrad)" strokeWidth="0.6" opacity="0.14"/>
            <line x1="435" y1="268" x2="382" y2="335" stroke="url(#aboutGrad)" strokeWidth="0.6" opacity="0.14"/>
            <line x1="205" y1="118" x2="278" y2="252" stroke="url(#aboutGrad)" strokeWidth="0.5" opacity="0.1"/>
            <line x1="488" y1="135" x2="435" y2="268" stroke="url(#aboutGrad)" strokeWidth="0.5" opacity="0.1"/>
            <line x1="112" y1="72"  x2="205" y2="118" stroke="#484848" strokeWidth="0.5" opacity="0.5"/>
            <line x1="248" y1="48"  x2="205" y2="118" stroke="#484848" strokeWidth="0.5" opacity="0.45"/>
            <line x1="322" y1="58"  x2="358" y2="82"  stroke="#484848" strokeWidth="0.5" opacity="0.5"/>
            <line x1="455" y1="38"  x2="488" y2="135" stroke="#484848" strokeWidth="0.5" opacity="0.45"/>
            <line x1="572" y1="88"  x2="488" y2="135" stroke="#484848" strokeWidth="0.5" opacity="0.5"/>
            <line x1="68"  y1="255" x2="148" y2="205" stroke="#484848" strokeWidth="0.5" opacity="0.45"/>
            <line x1="618" y1="232" x2="535" y2="188" stroke="#484848" strokeWidth="0.5" opacity="0.45"/>
            <line x1="68"  y1="255" x2="115" y2="298" stroke="#484848" strokeWidth="0.4" opacity="0.4"/>
            <line x1="105" y1="368" x2="195" y2="348" stroke="#484848" strokeWidth="0.4" opacity="0.4"/>
            <line x1="188" y1="395" x2="195" y2="348" stroke="#484848" strokeWidth="0.4" opacity="0.35"/>
            <line x1="498" y1="388" x2="505" y2="358" stroke="#484848" strokeWidth="0.4" opacity="0.4"/>
            <line x1="578" y1="348" x2="558" y2="302" stroke="#484848" strokeWidth="0.4" opacity="0.4"/>
            <line x1="158" y1="338" x2="115" y2="298" stroke="#484848" strokeWidth="0.4" opacity="0.35"/>
            <line x1="542" y1="318" x2="558" y2="302" stroke="#484848" strokeWidth="0.4" opacity="0.35"/>
            <circle cx="358" cy="82"  r="26" fill="#f75f5f" opacity="0.055"/>
            <circle cx="278" cy="252" r="22" fill="#f9964a" opacity="0.05"/>
            <circle cx="435" cy="268" r="20" fill="#ffd44f" opacity="0.05"/>
            <circle cx="382" cy="335" r="22" fill="#f9964a" opacity="0.05"/>
            <circle cx="358" cy="82" r="6" fill="#f75f5f">
              <animate attributeName="r"       values="6;24;6"    dur="4.0s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.6;0;0.6" dur="4.0s" repeatCount="indefinite"/>
            </circle>
            <circle cx="278" cy="252" r="5.5" fill="#f9964a">
              <animate attributeName="r"       values="5;20;5"    dur="5.1s" repeatCount="indefinite" begin="1.2s"/>
              <animate attributeName="opacity" values="0.55;0;0.55" dur="5.1s" repeatCount="indefinite" begin="1.2s"/>
            </circle>
            <circle cx="435" cy="268" r="5.2" fill="#ffd44f">
              <animate attributeName="r"       values="5;19;5"    dur="4.6s" repeatCount="indefinite" begin="0.6s"/>
              <animate attributeName="opacity" values="0.5;0;0.5" dur="4.6s" repeatCount="indefinite" begin="0.6s"/>
            </circle>
            <circle cx="382" cy="335" r="5.5" fill="#f9964a">
              <animate attributeName="r"       values="5;21;5"    dur="4.3s" repeatCount="indefinite" begin="2.4s"/>
              <animate attributeName="opacity" values="0.55;0;0.55" dur="4.3s" repeatCount="indefinite" begin="2.4s"/>
            </circle>
            <circle cx="205" cy="118" r="4.8" fill="#f75f5f">
              <animate attributeName="r"       values="4;15;4"    dur="5.8s" repeatCount="indefinite" begin="0.3s"/>
              <animate attributeName="opacity" values="0.4;0;0.4" dur="5.8s" repeatCount="indefinite" begin="0.3s"/>
            </circle>
            <circle cx="535" cy="188" r="5.0" fill="#ffd44f">
              <animate attributeName="r"       values="4;16;4"    dur="4.9s" repeatCount="indefinite" begin="3.2s"/>
              <animate attributeName="opacity" values="0.4;0;0.4" dur="4.9s" repeatCount="indefinite" begin="3.2s"/>
            </circle>
            <circle cx="115" cy="298" r="4.8" fill="#f75f5f">
              <animate attributeName="r"       values="4;14;4"    dur="6.2s" repeatCount="indefinite" begin="1.8s"/>
              <animate attributeName="opacity" values="0.35;0;0.35" dur="6.2s" repeatCount="indefinite" begin="1.8s"/>
            </circle>
            <circle cx="558" cy="302" r="4.5" fill="#ffd44f">
              <animate attributeName="r"       values="4;14;4"    dur="5.5s" repeatCount="indefinite" begin="4.0s"/>
              <animate attributeName="opacity" values="0.35;0;0.35" dur="5.5s" repeatCount="indefinite" begin="4.0s"/>
            </circle>
          </svg>
        </div>

        {/* Cam kart */}
        <div className="max-w-4xl mx-auto relative" style={{
          zIndex: 1,
          borderRadius: "6px",
          background: "rgba(33,33,33,0.85)",
          boxShadow: "0 0 0 0.5px rgba(255,255,255,0.08), 0 24px 48px rgba(0,0,0,0.4)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "0.5px solid rgba(255,255,255,0.08)",
        }}>
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-100">Sistem Mimarı & Geliştirici</h2>
                <p className="text-xl font-semibold mt-1" style={{
                  background: "linear-gradient(90deg, #f75f5f, #f9964a, #ffd44f)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Ömer Faruk Pirhasanoğlu
                </p>
              </div>
            </div>
            <div className="space-y-6 text-textMuted leading-relaxed text-lg">
              <Image src="/profile.png" alt="Ömer Faruk Pirhasanoğlu" width={90} height={90} style={{ borderRadius: "7%" }} />
              <p>
                Derin öğrenme ve bilgisayarla görme alanında uzmanlaşmakta olan 3. sınıf Bilgisayar Mühendisliği öğrencisiyim. Mimari tasarımdan bulut dağıtımına kadar uçtan uca üretim kalitesinde,
                olabildiğince optimize yapay zeka modelleri tasarlıyor, eğitiyor ve deploy ediyorum.
              </p>
              <p>
                Temel uzmanlık alanlarım: Keras & PyTorch · Transfer Learning · Çok Fazlı Eğitim · Hiperparametre Fine-Tuning · GPU Destekli Çıkarım (CUDA) · Bilgisayarla Görme · Özel Sinir Ağı Mimarileri
              </p>
              <p>
                Uçtan uca bir görüntü sınıflandırma sistemi geliştirip deploy ettim: ön işleme pipeline'ı → 2 fazlı transfer learning → Docker'lı AI-Backend → canlı bulut endpoint'i.
              </p>
              <p>
                Sıkıcı teknik laflar bir yana; bilgisayar denen ve mimarisine hayran olduğum bu çok havalı hesap makinesinin tabiri caizse "öğrenebiliyor" oluşu, içine doğduğum çağın en müthiş kırılma noktası gibi :D
                Dolayısı ile bu teknoloji ve insanımızın arasındaki pürüzler kaldırılmalı, AI okuryazarlığımız hem bireysel hem toplumsal ölçekte ilerleme kaydetmeli.
              </p>
              <p>Ben feedback panelini bitirene kadar öneriler için sosyal medya adreslerim aşağıda bulunuyor olacak.</p>
            </div>
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
            
            <Link href="/dashboard/tool-1" className="group glass-panel p-8 rounded-sm hover:-translate-y-2 hover:border-black/10 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 soft-ease flex flex-col">
              <div className="w-14 h-14 bg-surface rounded-sm flex items-center justify-center mb-6 border border-black/5 group-hover:border-accent/30 transition-colors">
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

            <Link href="/dashboard/tool-2" className="group glass-panel p-8 rounded-sm hover:-translate-y-2 hover:border-black/10 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 soft-ease flex flex-col">
              <div className="w-14 h-14 bg-surface rounded-sm flex items-center justify-center mb-6 border border-black/5 group-hover:border-accent/30 transition-colors">
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

            <Link href="/dashboard/tool-3" className="group glass-panel p-8 rounded-sm hover:-translate-y-2 hover:border-black/10 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 soft-ease flex flex-col">
              <div className="group glass-panel p-8 rounded-sm opacity-50 cursor-not-allowed flex flex-col">
                <div className="w-14 h-14 bg-surface rounded-sm flex items-center justify-center mb-6 border border-black/5">
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