import ImageAnalyzer from "@/src/components/features/ImageAnalyzer";

export default function Tool1Page() {
  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ImageAnalyzer 
        title="Görüntü Sınıflandırma Modeli" 
        description="FastAPI backend'ine bağlı, görüntüleri işleyip sınıflandıran yapay zeka aracı." 
      />
    </div>
  );
}