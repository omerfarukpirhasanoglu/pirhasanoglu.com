import Link from "next/link";
import { Github, Linkedin, Instagram} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 bg-background py-8 mt-auto z-10 relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="text-gray-200 font-semibold tracking-tight">AI & Sistem Mimarisi</span>
          <p className="text-sm text-textMuted">
            © {currentYear} Tüm hakları saklıdır.
          </p>
        </div>

        <div className="flex items-center gap-5 text-textMuted">
          <Link href="https://github.com/omerfarukpirhasanoglu" target="_blank" className="hover:text-accent transition-colors duration-250">
            <Github className="w-5 h-5" />
          </Link>
          <Link href="https://www.linkedin.com/in/omer-pirhasanoglu" target="_blank" className="hover:text-accent transition-colors duration-250">
            <Linkedin className="w-5 h-5" />
          </Link>
          <Link href="https://www.instagram.com/omerpirhasanoglu" target="_blank" className="hover:text-accent transition-colors duration-250">
            <Instagram className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </footer>
  );
}