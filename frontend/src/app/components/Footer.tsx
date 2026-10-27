import Link from 'next/link';
import { Link2, Heart, Shield, Zap, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Link2 className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">
                MinifyURL <span className="text-xs font-normal text-slate-500">— Modern Link Management</span>
              </p>
              <p className="text-xs text-slate-500">
                Powered by Laravel 12 API & Next.js 16 with instant click tracking
              </p>
            </div>
          </div>

          {/* Badges / Tech */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-slate-400 font-mono">
              <Zap className="h-3 w-3 text-amber-400" />
              Next.js 16
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-slate-400 font-mono">
              <Shield className="h-3 w-3 text-red-400" />
              Laravel 12
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-slate-400 font-mono">
              <Sparkles className="h-3 w-3 text-cyan-400" />
              Tailwind 4
            </span>
          </div>

          {/* Copyright */}
          <div className="text-xs text-slate-500 text-center md:text-right">
            <p>© {new Date().getFullYear()} MinifyURL. All rights reserved.</p>
            <p className="mt-0.5">Fast • Secure • Open-Source</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
