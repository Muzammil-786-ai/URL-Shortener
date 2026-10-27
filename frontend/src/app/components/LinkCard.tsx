'use client';

import { useState } from 'react';
import type { Link as LinkType } from '../types';
import { 
  Copy, 
  Check, 
  Trash2, 
  ExternalLink, 
  QrCode, 
  Share2, 
  MousePointerClick, 
  Calendar,
  Globe,
  AlertTriangle
} from 'lucide-react';
import QrCodeModal from './QrCodeModal';

const SHORT_BASE = process.env.NEXT_PUBLIC_SHORT_BASE || 'http://localhost:8000';

interface Props {
  link: LinkType;
  onDelete: (id: number) => void;
}

export default function LinkCard({ link, onDelete }: Props) {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const shortUrl = `${SHORT_BASE}/${link.short_code}`;

  // Domain extraction for favicon
  let domain = '';
  try {
    domain = new URL(link.original_url).hostname;
  } catch {
    domain = '';
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Short URL: ${link.short_code}`,
          url: shortUrl,
        });
      } catch {
        // User cancelled share
      }
    } else {
      handleCopy();
    }
  };

  const handleDeleteClick = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 4000);
      return;
    }

    try {
      setDeleting(true);
      await onDelete(link.id);
    } finally {
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  const formattedDate = new Date(link.created_at).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <>
      <div className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-xl transition-all duration-200 hover:border-slate-700 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-indigo-500/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Main Info */}
          <div className="flex items-start gap-3.5 min-w-0 flex-1">
            {/* Favicon or Globe */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800/90 border border-slate-700/60 p-2 text-slate-400">
              {domain ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
                  alt=""
                  className="h-5 w-5 rounded-sm object-contain"
                  onError={(e) => {
                    // Fallback to globe icon
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <Globe className="h-5 w-5 text-slate-400" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              {/* Short Link + External Visit */}
              <div className="flex items-center gap-2">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-base sm:text-lg font-bold text-indigo-400 hover:text-indigo-300 transition-colors truncate"
                >
                  {shortUrl}
                </a>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open link"
                  className="text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Original Long Link */}
              <p 
                className="mt-1 text-xs sm:text-sm text-slate-400 truncate max-w-xl font-normal"
                title={link.original_url}
              >
                {link.original_url}
              </p>

              {/* Meta: Clicks & Creation Date */}
              <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 text-cyan-300 font-medium">
                  <MousePointerClick className="h-3 w-3" />
                  <span>{link.clicks} {link.clicks === 1 ? 'click' : 'clicks'}</span>
                </span>

                <span className="inline-flex items-center gap-1 text-slate-400">
                  <Calendar className="h-3 w-3" />
                  <span>{formattedDate}</span>
                </span>

                {domain && (
                  <span className="hidden md:inline-flex items-center gap-1 text-slate-400 font-mono text-[11px]">
                    <Globe className="h-3 w-3" />
                    <span>{domain}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              title="Copy to clipboard"
              className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                copied
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/30'
                  : 'border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            {/* QR Code Button */}
            <button
              onClick={() => setShowQr(true)}
              title="View QR Code"
              className="rounded-xl border border-slate-700 bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
            >
              <QrCode className="h-3.5 w-3.5" />
            </button>

            {/* Native Share Button */}
            <button
              onClick={handleShare}
              title="Share URL"
              className="rounded-xl border border-slate-700 bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
            >
              <Share2 className="h-3.5 w-3.5" />
            </button>

            {/* Delete Button with Confirmation State */}
            <button
              onClick={handleDeleteClick}
              disabled={deleting}
              title={confirmDelete ? 'Click again to confirm delete' : 'Delete link'}
              className={`flex items-center gap-1 rounded-xl px-2.5 py-2 text-xs font-medium transition-all ${
                confirmDelete
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'border border-red-950/60 bg-red-950/20 text-red-400 hover:bg-red-900/40 hover:text-red-300'
              }`}
            >
              {confirmDelete ? (
                <>
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>Confirm?</span>
                </>
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      <QrCodeModal
        isOpen={showQr}
        onClose={() => setShowQr(false)}
        url={shortUrl}
        shortCode={link.short_code}
      />
    </>
  );
}
