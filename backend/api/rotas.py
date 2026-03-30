from fastapi import APIRouter, BackgroundTasks, HTTPException, Request
from api.models import *
from services.downloader import *
import os
from fastapi.responses import FileResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import asyncio

router = APIRouter()

limiter = Limiter(key_func=get_remote_address) #Para limitar as requisições por IP
download_limite = asyncio.Semaphore(50) #Limita o servidor para ter no maximo 50 downloads ao mesmo tempo

@router.post("/youtube")
async def Youtube_mandar_informacoes_video(requisicao: VideoRequest):
    link_recebido = requisicao.url
    informacoes_video = youtube_informacoes_video(link_recebido)
    return {
        "status": "Ok",
        "dados": informacoes_video
    }

@router.post("/baixar_video_youtube")
@limiter.limit("3/minute")
async def youtube_baixar_video(qualidade: VideoQuality, background_tasks: BackgroundTasks, request: Request):
    if download_limite._value == 0: #== 0 significa que tem 0 vagas na fila
        raise HTTPException(status_code=503, detail="Servidor lotado! Tente em 1 minuto.")
    async with download_limite:
        link_recebido = qualidade.url
        qualidade_video = qualidade.resolution
        caminho_video = youtube_baixar_videos(link_recebido, qualidade_video)
        if caminho_video and os.path.exists(caminho_video):
            print(os.path.basename(caminho_video))
            background_tasks.add_task(excluir_video,caminho_video) #Não pode colocar () na função porque se nao executa na hora
            return FileResponse(
                path=caminho_video, 
                filename=os.path.basename(caminho_video), # Pega só o nome do arquivo
                media_type='video/mp4'
            )
        raise HTTPException(
            status_code=400, 
            detail="Não foi possível baixar o vídeo. Verifique se o link do YouTube é válido ou se a qualidade escolhida está disponível."
        )
    
@router.post("/baixar_audio_youtube")
@limiter.limit("15/minute")
async def youtube_baixar_video(background_tasks: BackgroundTasks, request: Request, qualidade: AudioQuality):
    if download_limite._value == 0: #== 0 significa que tem 0 vagas na fila
        raise HTTPException(status_code=503, detail="Servidor lotado! Tente em 1 minuto.")
    async with download_limite:
        link_recebido = qualidade.url
        qualidade_audio = qualidade.quality_audio
        caminho_audio = youtube_baixar_audio(link_recebido, qualidade_audio)
        if caminho_audio and os.path.exists(caminho_audio):
            background_tasks.add_task(excluir_video,caminho_audio) #Não pode colocar () na função porque se nao executa na hora
            return FileResponse(
                path=caminho_audio, 
                filename=os.path.basename(caminho_audio), # Pega só o nome do arquivo
                media_type='audio/mpeg'
            )
        raise HTTPException(
            status_code=400, 
            detail="Não foi possível baixar o áudio. Verifique se o link do YouTube é válido ou se a qualidade escolhida está disponível."
        )

@router.post("/youtube_tamanho_qualidade")
async def youtube_mandar_tamanho(requisicao: VideoRequest):
     link_recebido = requisicao.url
     tamanhos = mandar_tamanho_resolucoes(link_recebido)
     return  tamanhos