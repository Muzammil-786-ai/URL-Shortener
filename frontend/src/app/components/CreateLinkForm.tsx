'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';
import { createLink } from '../lib/api';
import type { Link as LinkType } from '../types';
import { 
  Link2, 
  Sparkles, 
  ClipboardPaste, 
  Check, 
  Copy, 
  QrCode, 
  ExternalLink, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import QrCodeModal from './QrCodeModal';

interface Props {
  onCreated?: (newLink?: LinkType) => void;
  className?: string;
  compact?: boolean;
}

const SHORT_BASE = process.env.NEXT_PUBLIC_SHORT_BASE || 'http://localhost:8000';

export default function CreateLinkForm({ onCreated, className = '', compact = false }: Props) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastCreated, setLastCreated] = useState<LinkType | null>(null);
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  // Auto clean URL: adds https:// if missing
  const cleanUrl = (input: string) => {
    let trimmed = input.trim();
    if (trimmed && !/^https?:\/\//i.test(trimmed)) {
      trimmed = 'https://' + trimmed;
    }
    return trimmed;
  };

  // Get detected domain name for chip
  const getDomain = (input: string) => {
    try {
      const parsed = new URL(cleanUrl(input));
      return parsed.hostname;
    } catch {
      return null;
    }
  };

  const domain = url ? getDomain(url) : null;

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        setError('');
      }
    } catch {
      // Clipboard access denied or unsupported
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const formatted = cleanUrl(url);

    if (!formatted || formatted === 'https://') {
      setError('Please enter a valid URL');
      return;
    }

    try {
      new URL(formatted);
    } catch {
      setError('Please enter a valid URL (e.g. https://example.com)');
      return;
    }

    try {
      setLoading(true);
      const newLink = await createLink({ original_url: formatted });
      setLastCreated(newLink);
      setUrl('');
      
      // Fire confetti effect
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#6366f1', '#06b6d4', '#10b981', '#f59e0b']
        });
      } catch {
        // Ignored if confetti canvas fails
      }

      if (onCreated) {
        onCreated(newLink);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong while shortening URL');
    } finally {
      setLoading(false);
    }
  }

  const handleCopyShortUrl = () => {
    if (!lastCreated) return;
    const shortUrl = `${SHORT_BASE}/${lastCreated.short_code}`;
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Shortener Box */}
      <div className="relative rounded-3xl border border-slate-800 bg-slate-900/80 p-2 sm:p-3 backdrop-blur-xl shadow-2xl shadow-indigo-950/40">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          {/* Input field with icon & paste button */}
          <div className="relative flex-1 flex items-center">
            <div className="pointer-events-none absolute left-4 flex items-center text-slate-500">
              <Link2 className="h-5 w-5 text-indigo-400" />
            </div>

            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError('');
              }}
              placeholder="Paste your long link here (e.g. https://github.com/...)"
              className="w-full rounded-2xl bg-slate-950/70 border border-slate-800/90 py-3.5 pl-11 pr-24 text-sm sm:text-base text-white placeholder-slate-500 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />

            {/* Paste Button inside input */}
            <div className="absolute right-3 flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePaste}
                title="Paste from clipboard"
                className="flex items-center gap-1 rounded-xl bg-slate-800/80 border border-slate-700/60 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <ClipboardPaste className="h-3.5 w-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Paste</span>
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:brightness-110 transition-all duration-200 disabled:opacity-50 sm:w-auto"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Shortening...</span>
              </>
            ) : (
              <>
                <span>Shorten URL</span>
                <Sparkles className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Domain preview badge */}
        {domain && (
          <div className="mt-2.5 px-3 flex items-center gap-2 text-xs text-slate-400">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400"></span>
            <span>Target Host: <strong className="font-mono text-slate-300">{domain}</strong></span>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mt-2.5 flex items-center gap-2 px-3 text-xs text-red-400 bg-red-950/30 border border-red-900/50 py-2 rounded-xl">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Success Result Card */}
      {lastCreated && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 sm:p-5 backdrop-blur-xl animate-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                  ✓
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Ready to share!
                </span>
              </div>
              <p className="mt-1 font-mono text-base sm:text-lg font-bold text-white truncate">
                {SHORT_BASE}/{lastCreated.short_code}
              </p>
              <p className="text-xs text-slate-400 truncate mt-0.5">
                Target: {lastCreated.original_url}
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={handleCopyShortUrl}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-500 transition-all"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>

              <button
                onClick={() => setShowQrModal(true)}
                className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
              >
                <QrCode className="h-4 w-4 text-indigo-400" />
                <span>QR Code</span>
              </button>

              <a
                href={`${SHORT_BASE}/${lastCreated.short_code}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Visit</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal for newly created link */}
      {lastCreated && (
        <QrCodeModal
          isOpen={showQrModal}
          onClose={() => setShowQrModal(false)}
          url={`${SHORT_BASE}/${lastCreated.short_code}`}
          shortCode={lastCreated.short_code}
        />
      )}
    </div>
  );
}
