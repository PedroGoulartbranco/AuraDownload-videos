from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def pagina_incial():
    return {
        "mensagem": "Seu viado",
        "status": "Tudo Okkk!"
    }

@router.get("/teste")
async def teste(url: str):
    return {
        "status": "online",
        "url": url,
        "mensagem": "Seu viado"
    }