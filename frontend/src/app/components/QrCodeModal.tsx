'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { X, Download, Copy, Check, QrCode as QrIcon, ExternalLink } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  shortCode: string;
}

export default function QrCodeModal({ isOpen, onClose, url, shortCode }: Props) {
  const [dataUrl, setDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && url) {
      QRCode.toDataURL(url, {
        width: 320,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      })
        .then((data) => setDataUrl(data))
        .catch((err) => console.error('QR code generation failed', err));
    }
  }, [isOpen, url]);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownload = () => {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `qr-${shortCode}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-indigo-500/10 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
          <QrIcon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-bold text-white">QR Code</h3>
        <p className="text-xs text-slate-400 mt-1 truncate">
          Scan to visit <span className="font-mono text-indigo-400">/{shortCode}</span>
        </p>

        {/* QR Code Container */}
        <div className="my-5 flex justify-center">
          <div className="rounded-xl bg-white p-3 shadow-inner shadow-black/10">
            {dataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={dataUrl}
                alt={`QR code for ${url}`}
                className="h-56 w-56 rounded-lg object-contain"
              />
            ) : (
              <div className="flex h-56 w-56 items-center justify-center text-slate-400 text-sm">
                Generating...
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            onClick={handleDownload}
            disabled={!dataUrl}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-all"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
