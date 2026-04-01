// src/services/api.ts
const BACKEND_URL = "http://26.44.44.119:8000";

export async function sendLinkToBackend(url: string, endpoint: string) {
  const response = await fetch(`${BACKEND_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: url }),
  });
  if (!response.ok) throw new Error("Erro na resposta do servidor");
  const data = await response.json();
  return data.dados ? data.dados : data;
}

export async function fetchYoutubeResolutions(url: string) {
  const response = await fetch(`${BACKEND_URL}/youtube_tamanho_qualidade`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: url }),
  });
  const data = await response.json();
  return data.dados ? data.dados : data;
}

export async function fetchYoutubeAudioQualities(url: string) {
  const response = await fetch(`${BACKEND_URL}/youtube_audio_qualidade`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: url }),
  });
  const data = await response.json();
  return data.dados ? data.dados : data;
}

// DOWNLOAD VÍDEO (AJUSTADO PARA TIKTOK)
export async function downloadVideo(url: string, res: string, platform: string) {
  const isYoutube = platform === 'youtube';
  const endpoint = isYoutube ? '/baixar_video_youtube' : '/baixar_video_tiktok';
  
  // Criamos o body dinamicamente
  const bodyData = isYoutube 
    ? { url, resolution: res.replace("p", "") } // YouTube envia link + resolução
    : { url };                                  // TikTok envia APENAS o link

  const response = await fetch(`${BACKEND_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
  });

  if (!response.ok) throw new Error("Erro no download do vídeo");
  return await response.blob();
}

// DOWNLOAD ÁUDIO (AJUSTADO PARA TIKTOK)
export async function downloadAudio(url: string, quality: string, platform: string) {
  const isYoutube = platform === 'youtube';
  const endpoint = isYoutube ? '/baixar_audio_youtube' : '/baixar_audio_tiktok';

  // Criamos o body dinamicamente
  const bodyData = isYoutube 
    ? { url, quality_audio: quality }
    : { url };                       

  const response = await fetch(`${BACKEND_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
  });

  if (!response.ok) throw new Error("Erro no download do áudio");
  return await response.blob();
}