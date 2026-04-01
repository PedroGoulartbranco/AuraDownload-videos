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
    link_seguro, link_recebido = verificar_link_youtube(link_recebido)
    if link_seguro:
        informacoes_video = youtube_informacoes_video(link_recebido)
        return {
            "status": "Ok",
            "dados": informacoes_video
        }
    else:
        raise HTTPException(
            status_code=400, 
            detail="Link inválido, malicioso ou playlist não suportada."
        )

@router.post("/baixar_video_youtube")
@limiter.limit("3/minute")
async def youtube_baixar_video(qualidade: VideoQuality, background_tasks: BackgroundTasks, request: Request):
    if download_limite._value == 0: #== 0 significa que tem 0 vagas na fila
        raise HTTPException(status_code=503, detail="Servidor lotado! Tente em 1 minuto.")
    async with download_limite:
        link_recebido = qualidade.url
        qualidade_video = qualidade.resolution
        link_seguro, link_recebido = verificar_link_youtube(link_recebido)
        if link_seguro:
            try:
                caminho_video = youtube_baixar_videos(link_recebido, qualidade_video)
                if caminho_video and os.path.exists(caminho_video):
                    print(os.path.basename(caminho_video))
                    background_tasks.add_task(excluir_video,caminho_video) #Não pode colocar () na função porque se nao executa na hora
                    return FileResponse(
                        path=caminho_video, 
                        filename=os.path.basename(caminho_video), # Pega só o nome do arquivo
                        media_type='video/mp4'
                    )
                raise HTTPException( #caso de erro mesmo com a função dando certa
                    status_code=400, 
                    detail="Falha no dowload do arquivo"
                )
            except: #Caso de erro na função em geral por causa do link
                raise HTTPException(
                    status_code=400, 
                    detail="Não foi possível baixar o vídeo. Verifique se o link do YouTube é válido ou se a qualidade escolhida está disponível."
                )
        else: #Caso não seja seguro
            raise HTTPException(
            status_code=400, 
            detail="Link inválido, malicioso ou playlist não suportada."
        )
    
@router.post("/baixar_audio_youtube")
@limiter.limit("15/minute")
async def youtube_baixar_video(background_tasks: BackgroundTasks, request: Request, qualidade: AudioQuality):
    if download_limite._value == 0: #== 0 significa que tem 0 vagas na fila
        raise HTTPException(status_code=503, detail="Servidor lotado! Tente em 1 minuto.")
    async with download_limite:
        link_recebido = qualidade.url
        qualidade_audio = qualidade.quality_audio
        link_seguro, link_recebido = verificar_link_youtube(link_recebido)
        if link_seguro:
            try:
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
            except:
                raise HTTPException(
                    status_code=400, 
                    detail="Não foi possível baixar o áudio. Verifique se o link do YouTube é válido ou se a qualidade escolhida está disponível."
                )
        else: #Caso não seja seguro o link
            raise HTTPException(
            status_code=400, 
            detail="Link inválido, malicioso ou playlist não suportada."
        )

@router.post("/youtube_tamanho_qualidade")
async def youtube_mandar_tamanho(requisicao: VideoRequest):
     link_recebido = requisicao.url
     link_seguro, link_recebido = verificar_link_youtube(link_recebido)
     if link_seguro:
        try:
            tamanhos = mandar_tamanho_resolucoes(link_recebido)
            return  tamanhos
        except:
            raise HTTPException(
            status_code=400, 
            detail="Erro nos tamanhos do arquivo"
        )
     else:
        raise HTTPException(
            status_code=400, 
            detail="Link inválido, malicioso ou playlist não suportada."
        )

@router.post("/youtube_audio_tamanho")
async def youtube_audio_mandar_tamanho(requisicao: VideoRequest):
    link_recebido = requisicao.url
    link_seguro, link_recebido = verificar_link_youtube(link_recebido)
    if link_seguro:
        try:
            tamanhos = youtube_mandar_audio_tamanho(link_recebido)
            return tamanhos
        except:
            raise HTTPException(
            status_code=400, 
            detail="Erro nos tamanhos do arquivo"
            ) 
    else:
        raise HTTPException(
            status_code=400, 
            detail="Link inválido, malicioso ou playlist não suportada."
        )
@router.post("/tiktok")
async def tiktok_ver_informacoes(requisicao: VideoRequest):
    link_recebido = requisicao.url
    link_seguro, link_recebido = verificar_link_tiktok(link_recebido)
    if link_seguro:
        try:
            informacoes_video_tiktok = tiktok_informacoes_video(link_recebido)
            return informacoes_video_tiktok
        except:
            raise HTTPException(
            status_code=400, 
            detail="Erro na busca de informações no vídeo"
            )
    else:
        raise HTTPException(
            status_code=400, 
            detail="Link inválido ou malicioso."
        )

@router.post("/baixar_video_tiktok")
@limiter.limit("3/minute")
async def tiktok_baixar_video_rota(requisicao: VideoRequest, background_tasks: BackgroundTasks, request: Request):
    if download_limite._value == 0: #== 0 significa que tem 0 vagas na fila
        raise HTTPException(status_code=503, detail="Servidor lotado! Tente em 1 minuto.")
    async with download_limite:
        link_recebido = requisicao.url
        link_seguro, link_recebido = verificar_link_tiktok(link_recebido)
        if link_seguro:
            try:
                caminho_video = tiktok_baixar_videos(link_recebido)
                background_tasks.add_task(excluir_video,caminho_video) #Não pode colocar () na função porque se nao executa na hora
                return FileResponse(
                    path=caminho_video, 
                    filename=os.path.basename(caminho_video), # Pega só o nome do arquivo
                    media_type='video/mp4'
                )
            except:
                raise HTTPException(
                status_code=400, 
                detail="Erro no download."
                )
        else:
            raise HTTPException(
            status_code=400, 
            detail="Link inválido ou malicioso."
            )