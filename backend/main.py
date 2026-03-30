from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.rotas import router, limiter
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

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

if __name__ == "__main__":
    import uvicorn #Biblioteca que faz a ligação do codigo com a web
    uvicorn.run(app, host="0.0.0.0", port=8000)