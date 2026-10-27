import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MinifyURL — Fast, Trackable & Beautiful URL Shortener',
  description:
    'Shorten long links, generate instant QR codes, and monitor click analytics with real-time performance tracking.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#070a12] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 relative overflow-x-hidden">
        {/* Background Ambient Glow Orbs */}
        <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-cyan-500/15 blur-[140px] pointer-events-none -z-10 rounded-full" />
        <div className="fixed bottom-0 right-0 w-[500px] h-[300px] bg-indigo-900/10 blur-[130px] pointer-events-none -z-10 rounded-full" />

        {/* Global Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 flex flex-col">{children}</main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
