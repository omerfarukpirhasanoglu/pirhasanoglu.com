import { Clock, Cpu, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Tool2Page() {
  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">

        {/* Başlık */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-100">
            Tensör İşleme Mimarisi
          </h2>
          <p className="text-textMuted mt-1">
            PyTorch ortamında eğitilmiş modeller için GPU destekli çıkarım ve asenkron FastAPI köprüsü.
          </p>
        </div>

        {/* Yapım aşamasında kartı */}
        <div className="glass-panel rounded-2xl p-12 border border-white/5 flex flex-col items-center justify-center text-center gap-6">
          
          <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center border border-white/10">
            <Cpu className="w-8 h-8 text-textMuted" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-400">Geliştirme Aşamasında</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-200">Bu araç henüz hazır değil</h3>
            <p className="text-textMuted text-sm max-w-md leading-relaxed">
              PyTorch modelinin GPU inference pipeline'ı ve FastAPI entegrasyonu üzerinde çalışıyorum.
              Tamamlandığında burada yayınlanacak.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-textMuted hover:text-accent transition-colors duration-250"
          >
            <ArrowLeft className="w-4 h-4" />
            Panele Dön
          </Link>

        </div>
      </div>
    </div>
  );
}