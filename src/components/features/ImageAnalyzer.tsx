"use client";

import { useState } from "react";
import { UploadCloud, FileImage, Cpu, AlertCircle } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";

interface ImageAnalyzerProps {
  title: string;
  description: string;
}

export default function ImageAnalyzer({ title, description }: ImageAnalyzerProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Kullanıcı dosya seçtiğinde çalışan fonksiyon
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      setResult(null);
      // Ekranda göstermek için dosyanın geçici URL'si
      setPreviewUrl(URL.createObjectURL(file)); 
    }
  };

  // Fotoğrafı FastAPI sunucusuna gönderen fonksiyon
  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);

    // (FormData)
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // FastAPI sunucusuna POST isteği 
      const response = await fetch("http://localhost:8000/api/analyze-image", {
        method: "POST",
        body: formData,
        // DİKKAT: FormData kullanırken "Content-Type" header'ı manuel EKLENMEZ. Tarayıcı kendi halleder.
      });

      if (!response.ok) {
        throw new Error("Sunucu ile iletişim kurulamadı.");
      }

      //FastAPI sonucunu JSON olarak okuyoruz
      const data = await response.json();
      setResult(data);
      
    } catch (err: any) {
      setError(err.message || "Bilinmeyen bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      {/* Üst Başlık */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-100">{title}</h2>
        <p className="text-textMuted mt-1">{description}</p>
      </div>

      <Card className="flex flex-col gap-6 bg-surface/40">
        
        {/* Yükleme Alanı */}
        <div className="relative border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-accent/40 transition-colors duration-300 bg-background/50">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          
          {previewUrl ? (
            <div className="flex flex-col items-center gap-4 animate-in zoom-in-95 duration-300">
              <div className="w-32 h-32 relative rounded-lg overflow-hidden border border-white/10 shadow-lg">
                <img src={previewUrl} alt="Önizleme" className="w-full h-full object-cover" />
              </div>
              <p className="text-sm text-accent font-medium">{selectedFile?.name}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                <UploadCloud className="w-6 h-6 text-textMuted" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-200">Görüntü seçmek için tıklayın veya sürükleyin</p>
                <p className="text-xs text-textMuted mt-1">JPEG, PNG, WEBP (Max 5MB)</p>
              </div>
            </div>
          )}
        </div>

        {/* Aksiyon Butonu */}
        <div className="flex justify-end">
          <Button 
            onClick={handleAnalyze} 
            disabled={!selectedFile || isLoading}
            isLoading={isLoading}
          >
            <Cpu className="w-4 h-4 mr-2" />
            {isLoading ? "Görüntü İşleniyor..." : "Analiz Et"}
          </Button>
        </div>

        {/* Hata Mesajı */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm animate-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Sonuç Ekranı */}
        {result && (
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-4">
              <FileImage className="w-5 h-5 text-accent" />
              <h3 className="font-medium text-gray-200">Analiz Sonucu</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-background/50 rounded-lg border border-white/5">
                <p className="text-xs text-textMuted mb-1">Durum</p>
                <p className="font-medium text-green-400">{result.mesaj}</p>
              </div>
              <div className="p-3 bg-background/50 rounded-lg border border-white/5">
                <p className="text-xs text-textMuted mb-1">Dosya Boyutu</p>
                <p className="font-medium text-gray-200">{result.dosya_boyutu_mb} MB</p>
              </div>
              <div className="col-span-2 p-3 bg-accent/10 rounded-lg border border-accent/20">
                <p className="text-xs text-accent/80 mb-1">Yapay Zeka Tahmini</p>
                <p className="font-bold text-lg text-accent">{result.ai_tahmini}</p>
              </div>
            </div>
          </div>
        )}

      </Card>
    </div>
  );
}