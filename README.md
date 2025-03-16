

# Healthcare Translation Web App with Generative AI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![OpenRouter.ai](https://img.shields.io/badge/Powered%20by-OpenRouter.ai-blue)](https://openrouter.ai)

A real-time multilingual translation platform bridging communication gaps between patients and healthcare providers.


## 🌟 Features

- **Voice-to-Text Conversion**  
  Accurate speech recognition powered by Web Speech API
- **Real-Time Translation**  
  AI-powered medical terminology translation across 25+ languages
- **Dual Transcript Display**  
  Side-by-side view of original and translated text
- **Audio Playback**  
  Listen to translations in target language
- **Mobile-First Design**  
  Responsive interface for clinical and field use
- **Secure & HIPAA-Compliant**  
  Encrypted communications and data privacy controls

## 🛠️ Technologies

![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![OpenRouter.ai](https://img.shields.io/badge/OpenRouter.ai-000000?style=for-the-badge)
![Web Speech API](https://img.shields.io/badge/Web%20Speech%20API-4285F4?style=for-the-badge&logo=google)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker)

## 🚀 Installation

### Prerequisites
- Python 3.9+
- Node.js 16+
- OpenRouter API Key ([Get Key](https://openrouter.ai/keys))

### Backend Setup
```bash
# Clone repository
git clone https://github.com/yourusername/healthcare-translation-web-app.git
cd healthcare-translation-web-app/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/MacOS
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment
echo "OPENROUTER_API_KEY=your_api_key_here" > .env

# Start server
uvicorn main:app --reload --port 8000
```

### Frontend Setup
```bash
cd ../frontend
python -m http.server 8001
```
Access at: `http://localhost:8001`

## 🌍 Deployment (Northflank)

1. **Create Services**
   - Backend Service:
     - Build Context: `./backend`
     - Dockerfile: `Dockerfile`
     - Port: `8000`
     - Env: `OPENROUTER_API_KEY=your_key`
   - Frontend Service:
     - Build Context: `./frontend`
     - Dockerfile: `Dockerfile`
     - Port: `3000`
     - Env: `API_URL=${HEALTHCARE_BACKEND_URL}`

2. **Configure Networking**
   - Enable CORS in backend service
   - Verify service-to-service communication

## ⚙️ Configuration

### Environment Variables
```env
OPENROUTER_API_KEY=your_api_key_here
API_URL=https://your-backend-url.northflank.app
```

### Language Support
| Language      | Code | Language      | Code |
|---------------|------|---------------|------|
| English       | en   | Japanese      | ja   |
| Bengali       | bn   | Korean        | ko   |
| Spanish       | es   | Turkish       | tr   |
| French        | fr   | Italian       | it   |
| German        | de   | Dutch         | nl   |
| Hindi         | hi   | Polish        | pl   |
| Arabic        | ar   | Swedish       | sv   |
| Mandarin      | zh   | Tamil         | ta   |

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch  
   `git checkout -b feature/AmazingFeature`
3. Commit your Changes  
   `git commit -m 'Add some AmazingFeature'`
4. Push to the Branch  
   `git push origin feature/AmazingFeature`
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- [OpenRouter.ai](https://openrouter.ai) for advanced translation models
- [FastAPI](https://fastapi.tiangolo.com) for robust backend infrastructure
- Web Speech API team for voice recognition capabilities

---

**Clinical Communication Redefined**  
Empowering healthcare through AI-powered language solutions 🏥🌐