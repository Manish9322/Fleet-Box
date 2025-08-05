"use client";

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import ReduxProvider from '../components/ReduxProvider';

export const metadata: Metadata = {
  title: 'Fleet-Box',
  description: 'Manage your fleet with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ReduxProvider>
          {children}
        </ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
}
