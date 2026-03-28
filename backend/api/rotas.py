from fastapi import APIRouter
from api.models import *
from services.downloader import *

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
   qualidade = qualidade.url
   return None