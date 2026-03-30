// src/services/api.ts
const BACKEND_URL = "http://26.44.44.119:8000";

/**
 * 1. Busca informações básicas do vídeo (Título, Thumbnail, etc.)
 * Chamada na Etapa 1 assim que o link é colado.
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

    // Retorna 'dados' se existir, senão o objeto completo
    return data.dados ? data.dados : data;
  } catch (error) {
    console.error("Erro na chamada API (Info):", error);
    throw error;
  }
}

/**
 * 2. Busca os tamanhos reais de cada resolução disponível
 * Rota: /youtube_tamanho_qualidade
 */
export async function fetchYoutubeResolutions(url: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/youtube_tamanho_qualidade`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url }),
    });

    if (!response.ok) throw new Error("Erro ao buscar resoluções do vídeo");

    const data = await response.json();

    // Retorna o dicionário de resoluções (ex: {"1080": "120MB", ...})
    return data.dados ? data.dados : data;
  } catch (error) {
    console.error("Erro na chamada API (Resoluções):", error);
    throw error;
  }
}

/**
 * 3. Faz o download real do arquivo (Blob)
 * Chamada na Etapa Final ao clicar em "Baixar Agora"
 */
export async function downloadYoutubeVideo(url: string, resolution: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/baixar_video_youtube`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: url,
        resolution: resolution.replace("p", "") // Garante que mande apenas "1080"
      }),
    });

    if (!response.ok) throw new Error("Erro ao baixar o vídeo do servidor");

    // Retorna o arquivo bruto (Blob) para o navegador salvar
    return await response.blob();
  } catch (error) {
    console.error("Erro no download:", error);
    throw error;
  }
}