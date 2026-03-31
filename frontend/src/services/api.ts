// src/services/api.ts
const BACKEND_URL = "http://26.44.44.119:8000";

export async function sendLinkToBackend(url: string, endpoint: string) {
  try {
    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url }),
    });

    if (!response.ok) throw new Error("Erro na resposta do servidor");

    const data = await response.json();

    return data.dados ? data.dados : data;
  } catch (error) {
    console.error("Erro na chamada API (Info):", error);
    throw error;
  }
}

export async function fetchYoutubeResolutions(url: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/youtube_tamanho_qualidade`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url }),
    });

    if (!response.ok) throw new Error("Erro ao buscar resoluções do vídeo");

    const data = await response.json();

    return data.dados ? data.dados : data;
  } catch (error) {
    console.error("Erro na chamada API (Resoluções):", error);
    throw error;
  }
}

export async function downloadYoutubeVideo(url: string, resolution: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/baixar_video_youtube`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: url,
        resolution: resolution.replace("p", "")
      }),
    });

    if (!response.ok) throw new Error("Erro ao baixar o vídeo do servidor");

    return await response.blob();
  } catch (error) {
    console.error("Erro no download de vídeo:", error);
    throw error;
  }
}

export async function fetchYoutubeAudioQualities(url: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/youtube_audio_tamanho`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url }),
    });
    if (!response.ok) throw new Error("Erro ao buscar qualidades de áudio");
    const data = await response.json();
    return data.dados ? data.dados : data;
  } catch (error) {
    console.error("Erro API Áudio:", error);
    throw error;
  }
}

export async function downloadYoutubeAudio(url: string, quality: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/baixar_audio_youtube`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: url,
        quality_audio: quality  
      }),
    });
    if (!response.ok) throw new Error("Erro no download de áudio");
    return await response.blob();
  } catch (error) {
    console.error("Erro no download de áudio:", error);
    throw error;
  }
}