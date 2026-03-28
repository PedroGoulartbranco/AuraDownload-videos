from pydantic import BaseModel

# Esta classe define o formato do JSON que o Frontend (deve enviar
class VideoRequest(BaseModel):
    """
        Representa a requisição enviada pelo frontend.
        Contém apenas a URL do vídeo para ser processada, apenas recebe em string
    """
    url: str #Só recebe se estiver url e se for formato de string