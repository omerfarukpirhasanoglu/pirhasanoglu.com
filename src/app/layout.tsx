import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ömer Faruk Pirhasanoğlu & Proje Vitrini",
  description: "Derin öğrenme, bilgisayarla görme ve NLP alanlarında uçtan uca yapay zeka teknolojileri.",
  icons: { icon: '/icon.svg' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="relative">
        {children}
      </body>
    </html>
  );
}
