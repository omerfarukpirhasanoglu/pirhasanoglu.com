import Sidebar from "@/src/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">

      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-accent/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="p-8 md:p-10 max-w-7xl mx-auto min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}