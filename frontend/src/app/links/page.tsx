'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import CreateLinkForm from '../components/CreateLinkForm';
import LinkList from '../components/LinkList';
import { Layers, ArrowLeft, PlusCircle } from 'lucide-react';

export default function LinksPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreated = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  return (
    <div className="flex-1 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800/80">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-indigo-400 transition-colors mb-2"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Link Management
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Shorten URLs, track real-time analytics, and generate QR codes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Add Form Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3 px-1">
            <PlusCircle className="h-4 w-4 text-indigo-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Create New Short Link
            </h2>
          </div>
          <CreateLinkForm onCreated={handleCreated} />
        </div>

        {/* Links List with Analytics & Search */}
        <div>
          <LinkList refreshKey={refreshKey} showStats={true} />
        </div>
      </div>
    </div>
  );
}
