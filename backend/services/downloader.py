import yt_dlp
import os

PASTA_ATUAL = os.path.dirname(os.path.abspath(__file__))
PASTA_BACKEND = os.path.abspath(os.path.join(PASTA_ATUAL, ".."))
PASTA_DOWNLOADS = os.path.join(PASTA_BACKEND, "downloads")
CAMINHO_FFMPEG = os.path.join(PASTA_BACKEND, "ffmpeg.exe")

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
    
def youtube_baixar_videos(url, qualidade):
    os.makedirs(PASTA_DOWNLOADS, exist_ok=True) #Se a pasta nao existir ele cria
    print(qualidade)
    opcoes = {

        'format': f'bestvideo[height<={qualidade}][ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
        
        'outtmpl': os.path.join(PASTA_DOWNLOADS, '%(title)s.%(ext)s'),
        'merge_output_format': 'mp4',
        'ffmpeg_location': CAMINHO_FFMPEG,
        
        # Evita erros com emojis, aspas e espaços que bugam o FFmpeg no Windows
        'restrictfilenames': True, 
        'noplaylist': True,
        'quiet': False, # Importante para você ver o log no terminal
        'verbose': True
    }
    try:
        with yt_dlp.YoutubeDL(opcoes) as ydl:
            print("Começou")
            informacoes = ydl.extract_info(url, download=True)
            caminho_final = ydl.prepare_filename(informacoes)
            return caminho_final#Manda o nome do caminho certo tudo já arrumado
    except Exception as e:
        return None