cd backend
start uvicorn main:app --reload
timeout /t 5 /nobreak
cd ..\frontend
start python -m http.server 8001
