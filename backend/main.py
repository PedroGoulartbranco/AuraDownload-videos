from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.rotas import router, limiter
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
import shutil
import sys

app = FastAPI()

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(router)

def verificar_ffmpeg_no_projeto():
    # Verifica se o executável do FFmpeg está acessível no sistema ou na pasta do projeto, ele percorre o caminho do executavel
    if shutil.which("ffmpeg") is None: 
        print("\n" + "-"*50)
        print("ERRO: FFmpeg não encontrado no sistema.")
        print("Certifique-se de que o ffmpeg.exe está na pasta do backend")
        print("-"*50 + "\n")
    else:
        print("FFMPEG está pronto")

if __name__ == "__main__":
    verificar_ffmpeg_no_projeto()
    import uvicorn #Biblioteca que faz a ligação do codigo com a web
    uvicorn.run(app, host="0.0.0.0", port=8000)