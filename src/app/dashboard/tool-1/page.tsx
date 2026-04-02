import ImageAnalyzer from "@/src/components/features/ImageAnalyzer";
import Image from "next/image";

export default function Tool1Page() {
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
        <ImageAnalyzer
          title="Chroma"
          titleBadge="v1.2"
          description="Kıyafetinizi yapay zeka ile görün. Stil, renk uyumu ve moda puanı hakkında anında geri bildirim alın."
        />
      </div>

    </div>
  );
}
