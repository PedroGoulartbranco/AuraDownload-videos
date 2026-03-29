from fastapi import APIRouter, BackgroundTasks
from api.models import *
from services.downloader import *
import os
from fastapi.responses import FileResponse

router = APIRouter()

@router.get("/")
async def teste():
    return {
        "mensagem": "Seu gay"
    }

@router.post("/youtube")
async def Youtube_mandar_informacoes_video(requisicao: VideoRequest):
    link_recebido = requisicao.url
    informacoes_video = youtube_informacoes_video(link_recebido)
    return {
        "status": "Ok",
        "dados": informacoes_video
    }

@router.post("/baixar_video_youtube")
async def youtube_baixar_video(qualidade: VideoQuality):
    link_recebido = qualidade.url
    qualidade = qualidade.resolution
    caminho_video = youtube_baixar_videos(link_recebido, qualidade)
    if caminho_video and os.path.exists(caminho_video):
        print(os.path.basename(caminho_video))
        BackgroundTasks.add_task(excluir_video,caminho_video) #Não pode colocar () na função porque se nao executa na hora
        return FileResponse(
            path=caminho_video, 
            filename=os.path.basename(caminho_video), # Pega só o nome do arquivo
            media_type='video/mp4'
        )
    return {"erro": "Não foi possível baixar o vídeo. Verifique o link ou a qualidade."}