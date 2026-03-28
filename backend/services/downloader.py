import yt_dlp
import os

def youtube_informacoes_video(url):
    opcoes = {
        'quiet': True,           # Não enche o terminal de mensagens
        'no_warnings': True,
        'format': 'best',        # Simula que vai pegar o melhor formato
    }

    with yt_dlp.YoutubeDL(opcoes) as ydl:
        informacoes = ydl.extract_info(url, download=False)

        return {
            "titulo": informacoes.get('title'),
            "criador": informacoes.get('uploader'),
            "views": informacoes.get('view_count'),
            "likes": informacoes.get('like_count'),
            "duracao": informacoes.get("duration_string"),
            "resolucao": informacoes.get("resolution"),
            "thumbnail": informacoes.get("thumbnail")
        }
    
def youtube_baixar_mp4():
    file_download = "./dowloads"
    