import ImageAnalyzer from "@/src/components/features/ImageAnalyzer";

export default function Tool1Page() {
  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ImageAnalyzer 
        title="Chroma" 
        description="Kıyafetinizi yapay zeka ile görün. Stil, renk uyumu ve moda puanı hakkında anında geri bildirim alın." 
      />
    </div>
  );
}