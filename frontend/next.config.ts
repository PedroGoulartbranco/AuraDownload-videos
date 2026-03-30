/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    appIsrStatus: false, // Esconde o indicador de ISR
    buildActivity: false, // Esconde o ícone de carregamento/build
  },
};

export default nextConfig;