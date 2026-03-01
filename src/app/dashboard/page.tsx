import { LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="w-16 h-16 bg-surface border border-white/5 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
        <LayoutDashboard className="w-8 h-8 text-accent" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-4">Sistem Kontrol Paneli</h1>
      <p className="text-textMuted max-w-md mx-auto leading-relaxed">
        Sol taraftaki menüyü kullanarak geliştirdiğimiz yapay zeka modellerine ve analiz araçlarına erişebilirsin.
      </p>
    </div>
  );
}