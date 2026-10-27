'use client';

import { useMemo } from 'react';
import type { Link as LinkType } from '../types';
import { Layers, MousePointerClick, TrendingUp, Sparkles } from 'lucide-react';

interface Props {
  links: LinkType[];
}

export default function StatsOverview({ links }: Props) {
  const stats = useMemo(() => {
    const totalLinks = links.length;
    const totalClicks = links.reduce((sum, item) => sum + (item.clicks || 0), 0);
    const avgClicks = totalLinks > 0 ? (totalClicks / totalLinks).toFixed(1) : '0';
    const topLink = links.reduce<LinkType | null>((prev, curr) => {
      if (!prev) return curr;
      return (curr.clicks || 0) > (prev.clicks || 0) ? curr : prev;
    }, null);

    return { totalLinks, totalClicks, avgClicks, topLink };
  }, [links]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
      {/* Total Links Card */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-xl shadow-lg transition-all hover:border-slate-700">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Total Links</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Layers className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {stats.totalLinks}
          </span>
          <span className="text-[11px] text-slate-400 font-medium">active</span>
        </div>
      </div>

      {/* Total Clicks Card */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-xl shadow-lg transition-all hover:border-slate-700">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Total Visits</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <MousePointerClick className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {stats.totalClicks}
          </span>
          <span className="text-[11px] text-emerald-400 font-medium">real-time</span>
        </div>
      </div>

      {/* Avg Clicks Card */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-xl shadow-lg transition-all hover:border-slate-700">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Avg Clicks</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20">
            <TrendingUp className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {stats.avgClicks}
          </span>
          <span className="text-[11px] text-slate-400 font-medium">per link</span>
        </div>
      </div>

      {/* Top Performer Card */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-xl shadow-lg transition-all hover:border-slate-700">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Top Shortcode</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Sparkles className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2 truncate">
          <span className="text-xl sm:text-2xl font-mono font-bold text-amber-400">
            {stats.topLink ? `/${stats.topLink.short_code}` : '—'}
          </span>
          {stats.topLink && (
            <span className="text-[11px] text-slate-400 font-medium">
              ({stats.topLink.clicks} clicks)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
