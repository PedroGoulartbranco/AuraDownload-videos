from pydantic import BaseModel
from typing import Literal

# Esta classe define o formato do JSON que o Frontend (deve enviar
class VideoRequest(BaseModel):
    """
        Representa a requisição enviada pelo frontend.
        Contém apenas a URL do vídeo para ser processada, apenas recebe em string
    """
    url: str #Só recebe se estiver url e se for formato de string

class VideoQuality(BaseModel):
    url: str
    resolution: Literal["144", "240","360", "480","720", "1080", "1440"] #O literal faz só aceitar nesses modelos
