const BACKEND_URL = "http://26.44.44.119:8000";

export async function sendLinkToBackend(url: string, endpoint: string) {
  try {
    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url }), // Formato exato solicitado
    });

    if (!response.ok) {
      throw new Error("Erro na resposta do servidor");
    }

    const data = await response.json();
    
    // Retorna os dados dentro da chave 'dados' se existir, senão o objeto todo
    return data.dados ? data.dados : data;
  } catch (error) {
    console.error("Erro na chamada API:", error);
    throw error;
  }
}