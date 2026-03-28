import yt_dlp
import os

file_download = "./downloads" 

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
    
def youtube_baixar_video_alta_qualidade(url, qualidade):
    os.makedirs(file_download, exist_ok=True) #Se a pasta nao existir ele cria
    opcoes = {
        'format': f'bestvideo[height<={qualidade}]+bestaudio/best[height<={qualidade}]',
        'outtmpl': os.path.join(file_download, '%(title)s.%(ext)s'),
        'merge_output_format': 'mp4',
        'ffmpeg_location': './ffmpeg.exe',
    }
    try:
        with yt_dlp.YoutubeDL(opcoes) as ydl:
            print("Começou")
            informacoes = ydl.extract_info(url, download=True)
            return ydl.prepare_filename(informacoes) #Manda o nome do caminho certo tudo já arrumado
    except Exception as e:
        return None
    
def youtuber_baixar_video(url, qualidade):
    os.makedirs(file_download, exist_ok=True) #Se a pasta nao existir ele cria
    opcoes = {
        'format': f'bestvideo[height<={qualidade}]+bestaudio/best[height<={qualidade}]',
        'outtmpl': os.path.join(file_download, '%(title)s.%(ext)s'),
        'merge_output_format': 'mp4',
    }