import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI & Sistem Mimarisi | Portfolyo",
  description: "Yapay zeka modelleri ve modern sistem mimarisi araçları.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      {/*relative*/}
      <body className={`${inter.className} bg-background text-gray-100 antialiased min-h-screen flex flex-col relative`}>
        
        {/* Noise Overlay */}
        <div 
          className="fixed inset-0 z-50 pointer-events-none"
          style={{
            opacity: "0.4",
            mixBlendMode: "overlay", // Arka planla kaynaşması için
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter 
            id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.60' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect 
            width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            filter: "contrast(150%) brightness(100%)", // Dokuyu keskinleştirme
          }}
        />

        {children}
      </body>
    </html>
  );
}