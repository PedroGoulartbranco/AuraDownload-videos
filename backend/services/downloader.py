import yt_dlp
import os
import bleach

#Caminhos Absolutos para Não dar erro
PASTA_ATUAL = os.path.dirname(os.path.abspath(__file__))
PASTA_BACKEND = os.path.abspath(os.path.join(PASTA_ATUAL, ".."))
PASTA_DOWNLOADS = os.path.join(PASTA_BACKEND, "downloads")
CAMINHO_FFMPEG = os.path.join(PASTA_BACKEND, "ffmpeg.exe")

def youtube_informacoes_video(url):
    opcoes = {
        'quiet': True,           # Não enche o terminal de mensagens
        'no_warnings': True
    }
    
    with yt_dlp.YoutubeDL(opcoes) as ydl:
        informacoes = ydl.extract_info(url, download=False)
        # tamanho = informacoes.get('filesize') or informacoes.get('filesize_approx') or 0
        # tamanho = round(tamanho / (1024 * 1024), 2) # Converte Bytes para MB
        return {
            "titulo": informacoes.get('title'),
            "criador": informacoes.get('uploader'),
            "views": informacoes.get('view_count'),
            "likes": informacoes.get('like_count'),
            "duracao": informacoes.get("duration_string"),
            "resolucao": informacoes.get("resolution"),
            "thumbnail": informacoes.get("thumbnail"),
        }

def limpar_link_contra_scripts(url):
    url_limpa = bleach.clean(url, tags=[], attributes={}, strip=True) #Faz alimpeza
    return url_limpa
    
def verificar_link_youtube(url):
    url_limpa = limpar_link_contra_scripts(url)
    url_somente_video  = url_limpa.split('&')[0]
    opcoes = {
            'quiet': True,
            'no_warnings': True,
            'extract_flat': True, 
            'playlist_items': '1', 
            'noplaylist': True,    
        }
    try:
        with yt_dlp.YoutubeDL(opcoes) as ydl:
            informacoes = ydl.extract_info(url_somente_video, download=False)
            if not informacoes:
                return False, url_somente_video
            tipo = informacoes.get('_type', 'video')
            if tipo == "video":
                return True, url_somente_video
            return False, url_somente_video
    except:
        return False, url_somente_video
    
def youtube_baixar_videos(url, qualidade):
    os.makedirs(PASTA_DOWNLOADS, exist_ok=True) #Se a pasta nao existir ele cria
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
            informacoes = ydl.extract_info(url, download=True)
            caminho_final = ydl.prepare_filename(informacoes)
            return caminho_final#Manda o nome do caminho certo tudo já arrumado
    except Exception as e:
        return None
    
def mandar_tamanho_resolucoes(url):
    opcoes = {
        'quiet': True,      
        'no_warnings': True,
        'format': 'best',       
    }
    with yt_dlp.YoutubeDL(opcoes) as ydl:
        informacoes = ydl.extract_info(url, download=False)

        tamanhos_por_resolucao = {}
        duracao_segundos = informacoes.get('duration', 0)
        audio_estimado_mb = duracao_segundos * 0.018 #Estimativa que o gemini falou que é 0.015Mb por audio

        for formato in informacoes.get("formats"):
            altura = formato.get('height')
            tamanho = formato.get('filesize') or formato.get('filesize_approx') or 0

            #Filta só os que tem imagem e tamanho
            if altura and formato.get("vcodec") is not None and formato.get("vcodec") != 'none' and tamanho > 0:
                if int(altura) != 608 and int(altura) != 2160:
                    tamanho = tamanho / (1024 * 1024) #Tranformas em MB
                    tamanho = round(tamanho + audio_estimado_mb, 2)
                    tamanhos_por_resolucao[f"tamanho_{altura}"] = tamanho
    return tamanhos_por_resolucao

def youtube_mandar_audio_tamanho(url):
    opcoes = {
        'quiet': True,      
        'no_warnings': True,
        'format': 'best',       
    }
    lista_audios = {}
    with yt_dlp.YoutubeDL(opcoes) as ydl:
        informacoes = ydl.extract_info(url, download=False)
        duracao_video = informacoes.get('duration', 0)
        lista_qualidade_audio = [96, 128, 256, 320]
        for qualidade in lista_qualidade_audio:
            tamanho_audio = (qualidade * duracao_video) / (8 * 1024)
            tamanho_audio = round(tamanho_audio, 2)
            lista_audios[f"tamanho_{qualidade}"] = tamanho_audio
    print(lista_audios)
    return lista_audios
    
def excluir_video(caminho):
    if os.path.exists:
        os.remove(caminho)

def youtube_baixar_audio(url, qualidade):
    os.makedirs(PASTA_DOWNLOADS, exist_ok=True) #Se a pasta nao existir ele cria
    opcoes = {
    'format': 'bestaudio/best', # Pega o melhor que o YouTube tem (ex: 160kbps)
    'postprocessors': [{
    'key': 'FFmpegExtractAudio',
    'preferredcodec': 'mp3',
    'preferredquality': str(qualidade), # O FFmpeg transforma a qualidade aqui
    }],
    
    'outtmpl': os.path.join(PASTA_DOWNLOADS, '%(title)s.%(ext)s'),
    
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'mp3',
        'preferredquality': qualidade, 
    }],
    
    'ffmpeg_location': CAMINHO_FFMPEG,
    'restrictfilenames': True,
    'noplaylist': True,
    'quiet': False,
    }
    try:
        with yt_dlp.YoutubeDL(opcoes) as ydl:
            informacoes = ydl.extract_info(url, download=True)
            caminho_final = ydl.prepare_filename(informacoes)
            caminho_final = os.path.splitext(caminho_final)[0] + ".mp3"
            return caminho_final
    except Exception as e:
        return None
    
def tiktok_informacoes_video(url):
    opcoes = {
        'quiet': True,
        'no_warnings': True,
        'extract_flat': False, 
    }
    with yt_dlp.YoutubeDL(opcoes) as ydl:
        informacoes = ydl.extract_info(url, download=False)
        return {
            "titulo": informacoes.get('title') or informacoes.get('description'),
            "thumb": informacoes.get('thumbnail'),
            "views": informacoes.get('view_count'),
            "likes": informacoes.get('like_count'),
            "autor": informacoes.get('uploader') or informacoes.get('uploader_id'),
            "duracao": informacoes.get('duration'),
            "altura": informacoes.get('height'),
            "largura": informacoes.get('width')
        }
    
def tiktok_baixar_videos(url):
    os.makedirs(PASTA_DOWNLOADS, exist_ok=True) #Se a pasta nao existir ele cria
    opcoes = {
        'format': 'b',
        'outtmpl': os.path.join(PASTA_DOWNLOADS, '%(title)s.%(ext)s'),
        'quiet': True,
        'no_warnings': True,
    }
    with yt_dlp.YoutubeDL(opcoes) as ydl:
            info = ydl.extract_info(url, download=True)
            return ydl.prepare_filename(info)
    
def verificar_link_tiktok(url):
    link_limpado = limpar_link_contra_scripts(url)
    opcoes = {
        'quiet': True,
        'no_warnings': True,
        'extract_flat': False, 
    }
    try:
        with yt_dlp.YoutubeDL(opcoes) as ydl:
            informacoes = ydl.extract_info(url, download=False)
            if not informacoes:
                return False, link_limpado
            return True, link_limpado
    except:
        return False, link_limpado
