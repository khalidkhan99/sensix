import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';
import { ToastProvider } from '@/components/ToastProvider';
import RegisterSW from '@/components/RegisterSW';

export const metadata: Metadata = {
  title: 'SensiX — Free Fire Sensitivity Generator & Presets',
  description:
    'Calibrate your optimal Free Fire sensitivity settings, one-tap headshot drag baselines, and fire button size tailored to your phone model, screen, and playstyle.',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  keywords: [
    'Free Fire sensitivity',
    'Free Fire headshot sensitivity',
    'best sensitivity for Free Fire',
    'one-tap headshot settings',
    'SensiX Free Fire',
    'fire button size FF',
  ],
  authors: [{ name: 'SensiX Community' }],
};

export const viewport: Viewport = {
  themeColor: '#07070b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#07070b] text-[#f4f4f7] antialiased selection:bg-[#ff6a00]/30 selection:text-white">
        {/* Ambient Radial Background Glows */}
        <div className="glow-orange-top" aria-hidden="true" />
        <div className="glow-orange-bottom" aria-hidden="true" />
        
        {/* Subtle 44px Gaming Grid */}
        <div className="fixed inset-0 bg-gaming-grid pointer-events-none opacity-40 z-0" aria-hidden="true" />

        <ToastProvider>
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
              {children}
            </main>
            <Footer />
            <BottomNav />
            <RegisterSW />
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
