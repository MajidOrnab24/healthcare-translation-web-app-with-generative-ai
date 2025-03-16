from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

LANGUAGE_MAPPING = {
    "english": "en",
    "bengali": "bn",
    "spanish": "es",
    "french": "fr",
    "german": "de",
    "hindi": "hi",
    "arabic": "ar",
    "mandarin": "zh",
    "russian": "ru",
    "portuguese": "pt",
    "japanese": "ja",
    "korean": "ko",
    "turkish": "tr",
    "italian": "it",
    "dutch": "nl",
    "polish": "pl",
    "swedish": "sv",
    "tamil": "ta",
    "telugu": "te",
    "urdu": "ur",
    "gujarati": "gu",
    "marathi": "mr",
    "punjabi": "pa",
    "malayalam": "ml",
    "vietnamese": "vi"
}

class TranslationRequest(BaseModel):
    text: str
    source_lang: str
    target_lang: str

@app.post("/translate")
async def translate_text(request: TranslationRequest):
    try:
        if not request.text.strip():
            return {"translation": ""}
        if len(request.text) > 500:
            raise HTTPException(status_code=400, detail="Text too long (max 500 characters)")

        headers = {
            "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",  # Key from env
            "Content-Type": "application/json"
                }
        
        payload = {
            "model": "deepseek/deepseek-chat:free",
            "messages": [
                {
                "role": "system",
                "content": f"Translate this medical text from {request.source_lang} to {request.target_lang}. Return only the pure translation without any formatting, boxes, quotes, or special characters. Example: Input 'Hello' → Output 'Hola' not '\"Hola\"'."
                },
                {
                    "role": "user",
                    "content": request.text
                }
            ],
            "temperature": 0.3
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                json=payload,
                headers=headers
            )
            
            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail="Translation failed")
                
            translation = response.json()["choices"][0]["message"]["content"]
            return {"translation": translation.strip()}
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)