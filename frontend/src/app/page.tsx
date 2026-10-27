import Link from 'next/link';
import CreateLinkForm from './components/CreateLinkForm';
import { 
  Zap, 
  BarChart3, 
  QrCode, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Share2, 
  Layers, 
  CheckCircle2,
  MousePointerClick
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col justify-between">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300 shadow-sm backdrop-blur-md mb-6 hover:border-indigo-500/50 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
            <span>Version 2.0</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Instant QR Codes & Click Tracking</span>
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            Transform Long Links Into{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-300 bg-clip-text text-transparent">
              Smart & Powerful
            </span>{' '}
            Short URLs
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Create branded, memorable links in seconds. Comes with real-time visitor tracking, instant downloadable QR codes, and lightning-fast redirects.
          </p>

          {/* Interactive URL Shortener Box */}
          <div className="mt-10 max-w-2xl mx-auto">
            <CreateLinkForm />
          </div>

          {/* Secondary Action */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/links"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group"
            >
              <span>Go to your Link Management Dashboard</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="border-t border-slate-800/80 bg-slate-950/40 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Packed with everything you need
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400">
              Modern engineering designed for seamless link management and actionable insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl hover:border-indigo-500/40 transition-all group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">Instant 302 Redirects</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Powered by Laravel 12 with sub-millisecond response times for snappy user experience.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl hover:border-cyan-500/40 transition-all group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                <QrCode className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">Instant QR Code Generator</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Download high-resolution QR codes in PNG format for print, flyers, or digital campaigns.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl hover:border-violet-500/40 transition-all group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 group-hover:bg-violet-500/20 transition-colors">
                <MousePointerClick className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">Real-Time Click Tracking</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Every visit is tracked automatically so you always know which links perform the best.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl hover:border-emerald-500/40 transition-all group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">Link Management & Search</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Search, sort, filter, and delete links anytime with your personal management panel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Step Workflow */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Shorten links in 3 simple steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="relative p-6 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white mb-4">
                1
              </div>
              <h4 className="text-base font-semibold text-white">Paste Long Link</h4>
              <p className="mt-2 text-xs text-slate-400">
                Paste any web URL into the box. Even without http, we automatically format it.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-cyan-600 font-bold text-white mb-4">
                2
              </div>
              <h4 className="text-base font-semibold text-white">Generate & Customize</h4>
              <p className="mt-2 text-xs text-slate-400">
                Receive a 6-character shortcode instantly with a matching QR Code ready to copy.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 font-bold text-white mb-4">
                3
              </div>
              <h4 className="text-base font-semibold text-white">Share & Track</h4>
              <p className="mt-2 text-xs text-slate-400">
                Share anywhere and watch real-time clicks update directly on your dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/60 via-slate-900/80 to-cyan-950/60 p-8 sm:p-12 text-center shadow-2xl backdrop-blur-xl">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Ready to manage your short links?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300">
                Access your links, check click counts, and generate QR codes in one centralized dashboard.
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  href="/links"
                  className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all"
                >
                  <Layers className="h-4 w-4" />
                  <span>Open Links Dashboard</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
