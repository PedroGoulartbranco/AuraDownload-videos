import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flux Media | Download de Vídeos e Áudios",
  description: "A plataforma mais rápida para baixar vídeos e áudios do YouTube e TikTok em alta qualidade. Desenvolvido por Vitor Rovani e Pedro Goulart.",
  icons: {
    icon: "/favicon.ico", 
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body 
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}