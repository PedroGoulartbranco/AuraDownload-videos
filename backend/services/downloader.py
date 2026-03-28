import yt_dlp

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
            "criador": informacoes.get('uploader')
        }