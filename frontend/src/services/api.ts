// src/services/api.ts
const BACKEND_URL = "http://26.44.44.119:8000";

/**
 * 1. Busca informações do vídeo (Título, Thumbnail, Views, etc)
 * Usado na primeira etapa assim que o link é colado.
 */
export async function sendLinkToBackend(url: string, endpoint: string) {
  try {
    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url }),
    });

    if (!response.ok) throw new Error("Erro na resposta do servidor");

    const data = await response.json();
    
    // Retorna a sub-chave 'dados' se o Pedro enviou assim, senão o objeto todo
    return data.dados ? data.dados : data;
  } catch (error) {
    console.error("Erro na chamada API:", error);
    throw error;
  }
}

/**
 * 2. Faz o download real do arquivo (Blob)
 * Chamado quando você clica no botão "BAIXAR AGORA"
 */
export async function downloadYoutubeVideo(url: string, resolution: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/baixar_video_youtube`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: url,
        resolution: resolution.replace("p", "") // Envia "1080" em vez de "1080p"
      }),
    });

    if (!response.ok) throw new Error("Erro ao baixar o vídeo do servidor");

    // Retorna o arquivo bruto (binário) para o navegador processar o download
    return await response.blob();
  } catch (error) {
    console.error("Erro no download:", error);
    throw error;
  }
}