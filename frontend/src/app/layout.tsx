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

// Configuração de SEO e Título da aba do navegador
export const metadata: Metadata = {
  title: "Aura Summarizer | Resumos Inteligentes",
  description: "Transforme vídeos do YouTube, TikTok e X em resumos e downloads instantâneos. Desenvolvido por Vitor Rovani e Pedro Goulart.",
  icons: {
    icon: "/favicon.ico", // Garante que o ícone da aba funcione
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /**
     * suppressHydrationWarning: Essencial para ignorar erros de extensões de 
     * navegador (como ColorZilla ou Bitwarden) que injetam código no HTML.
     * lang="pt-br": Define o idioma correto para evitar que o Chrome ofereça tradução.
     */
    <html
      lang="pt-br"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}