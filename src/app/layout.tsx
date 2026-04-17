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
            opacity: 0.15,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '400px 400px',
            mixBlendMode: 'overlay',
          }}
        />

        {children}
      </body>
    </html>
  );
}