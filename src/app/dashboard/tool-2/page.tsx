import SmartChunker from "@/src/components/features/SmartChunker";
import Image from "next/image";

export default function Tool2Page() {
  return (
    <div className="relative w-full min-h-screen pb-20">

      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/dashboardback.png"
          alt="Background"
          fill
          className="object-cover object-center opacity-30"
          priority
        />
      </div>

      <div className="relative z-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SmartChunker
          title="Nexus"
          titleBadge="v1.0"
          description="Metni anlamsal bölümlere ayıran RAG chunking motoru. Cümleler arası geçişleri öğrenerek sabit boyut yerine içeriğe duyarlı chunk'lar üretir."
        />
      </div>

    </div>
  );
}
