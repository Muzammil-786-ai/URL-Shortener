'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import type { Link as LinkType } from '../types';
import { getLinks, deleteLink } from '../lib/api';
import LinkCard from './LinkCard';
import StatsOverview from './StatsOverview';
import { Search, ArrowUpDown, RefreshCw, Link2, Filter } from 'lucide-react';

interface Props {
  refreshKey?: number;
  showStats?: boolean;
}

export default function LinkList({ refreshKey = 0, showStats = true }: Props) {
  const [links, setLinks] = useState<LinkType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'clicks' | 'oldest'>('newest');

  const fetchLinks = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getLinks();
      setLinks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load links');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks, refreshKey]);

  async function handleDelete(id: number) {
    try {
      await deleteLink(id);
      setLinks((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete link');
    }
  }

  // Filter & Sort Links
  const filteredAndSortedLinks = useMemo(() => {
    let result = [...links];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.short_code.toLowerCase().includes(q) ||
          item.original_url.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'clicks') {
        return (b.clicks || 0) - (a.clicks || 0);
      }
      if (sortBy === 'oldest') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      // default: newest
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return result;
  }, [links, searchQuery, sortBy]);

  // Loading Skeleton
  if (loading) {
    return (
      <div className="space-y-4 py-4">
        <div className="h-24 w-full animate-pulse rounded-2xl bg-slate-900/60 border border-slate-800" />
        <div className="h-24 w-full animate-pulse rounded-2xl bg-slate-900/60 border border-slate-800" />
        <div className="h-24 w-full animate-pulse rounded-2xl bg-slate-900/60 border border-slate-800" />
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="rounded-2xl border border-red-900/50 bg-red-950/20 p-8 text-center backdrop-blur-xl">
        <p className="text-red-400 font-medium">{error}</p>
        <button
          onClick={fetchLinks}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  // Completely Empty State
  if (links.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-900/30 p-12 text-center backdrop-blur-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
          <Link2 className="h-7 w-7" />
        </div>
        <h3 className="text-lg font-bold text-white">No shortened links yet</h3>
        <p className="mt-1 text-sm text-slate-400 max-w-sm mx-auto">
          Paste your long URLs above to generate clean, short, and trackable links in seconds.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Metrics Banner */}
      {showStats && <StatsOverview links={links} />}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by URL or shortcode..."
            className="w-full rounded-xl bg-slate-900/80 border border-slate-800 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none rounded-xl bg-slate-900/80 border border-slate-800 py-2.5 pl-3.5 pr-8 text-xs sm:text-sm font-medium text-slate-300 outline-none hover:border-slate-700 cursor-pointer focus:border-indigo-500"
            >
              <option value="newest">Latest Created</option>
              <option value="clicks">Most Clicks</option>
              <option value="oldest">Oldest Created</option>
            </select>
            <ArrowUpDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          </div>

          {/* Refresh Button */}
          <button
            onClick={fetchLinks}
            title="Refresh links"
            className="rounded-xl border border-slate-800 bg-slate-900/80 p-2.5 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Showing count */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Showing <strong className="text-white">{filteredAndSortedLinks.length}</strong> of{' '}
          <strong className="text-white">{links.length}</strong> links
        </span>
        {searchQuery && (
          <span className="italic text-slate-400">Filtered by &quot;{searchQuery}&quot;</span>
        )}
      </div>

      {/* Links List or No match */}
      {filteredAndSortedLinks.length === 0 ? (
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-8 text-center text-slate-400">
          <p className="text-sm">No links matched your search term &quot;{searchQuery}&quot;</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-2 text-xs text-indigo-400 hover:underline"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAndSortedLinks.map((link) => (
            <LinkCard key={link.id} link={link} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
