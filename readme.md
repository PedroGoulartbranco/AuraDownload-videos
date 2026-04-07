# ⚡ FluxMedia

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

*FluxMedia* is a high-performance, secure, and modern web application built to download media from YouTube and TikTok seamlessly. Designed with a premium user interface and a robust decoupled architecture, it allows users to extract watermark-free videos and high-quality audio in multiple resolutions.

---

## 🚀 Key Features

*   *Multi-Platform Support:* 
    *   YouTube: Download video in resolutions up to 4K and audio in high-fidelity MP3 (up to 320kbps).
    *   TikTok: Extract videos completely watermark-free with instant processing.
*   *Premium UI/UX:* A highly polished, responsive interface built with Next.js and Framer Motion, featuring dynamic themes that adapt based on the platform.
*   *Lazy Loading Intelligence:* Smart data fetching that prioritizes instant visual feedback (thumbnails/titles) while processing heavy metadata in the background.
*   *Advanced Security Architecture:*
    *   Anti-XSS: Input sanitization implemented using bleach.
    *   Clickjacking Protection: Strict HTTP headers (X-Frame-Options, CSP) to prevent malicious framing.
    *   Blob-based Downloads: Secure client-side file handling using temporary Blob URLs.

---

## 🛠️ Tech Stack

### Frontend
*   *Framework:* Next.js 15 (App Router)
*   *Styling:* Tailwind CSS
*   *Animations:* Framer Motion
*   *Icons:* Lucide React

### Backend
*   *Framework:* FastAPI (Python)
*   *Media Extraction:* yt-dlp
*   *Processing:* FFmpeg (Codecs: H.264 / AAC)
*   *Security:* Bleach, SlowAPI (Rate Limiting)

---

## ⚠️ Infrastructure & Deploy Note

During development, we identified technical constraints for hosting this engine on free cloud tiers (such as **Render** or **Vercel**):

* **IP Reputation:** Cloud datacenters are frequently flagged by streaming platforms (YouTube/TikTok), leading to "Bot Detection" challenges and sign-in requirements.
* **Media Processing:** High-quality merging and transcoding via **FFmpeg** require CPU and RAM resources that often exceed free-tier limits.
* **Recommendation:** This project is optimized for **Local Execution** or servers with **Residential Proxies** to ensure 100% extraction success and performance.

---

## 🏁 Getting Started

### Prerequisites
- *Node.js* (v18 or higher)
- *Python* (3.10 or higher)
- *FFmpeg:* Must be installed and added to your system's PATH.

### Installation & Running

#### 1. Clone the repository

```bash
git clone https://github.com/PedroGoulartbranco/AuraDownload-videos
cd FluxMedia
```

#### 2. Setup Backend (Python)

```bash
cd backend
python -m venv venv
```
### Activate virtual environment:

#### Windows:

```bash
.\venv\Scripts\activate
```

#### Mac/Linux:

```bash
source venv/bin/activate
```

#### Install dependencies

```bash
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### 3. Setup Frontend (Next.js)

```bash
cd ../frontend
```
```bash
npm install
npm run dev
```
The application will be available at http://localhost:3000.

---

## 🔒 Security Highlights

FluxMedia is fortified against common web vulnerabilities using industry-standard practices:

* **XSS Protection:** All user inputs and URLs are strictly sanitized using `bleach` before reaching the extraction logic.
* **Iframe Protection:** Middleware injections of `X-Frame-Options: DENY` and `Content-Security-Policy` prevent Clickjacking attacks.
* **Codec Standardization:** The backend forces conversion to **H.264 (AVC)** and **AAC** to ensure maximum compatibility and avoid "black screen" errors on modern players.

---

## 👨‍💻 Authors

This project was engineered and developed by:

| Name | Role | Profile |
| :--- | :--- | :--- |
| **Vitor Rovani Marcelino** | Lead Frontend & UX/UI Designer | [GitHub](https://github.com/VitorRovaniMarcelino) |
| **Pedro Goulart Branco** | Lead Backend & Systems Architect | [GitHub](https://github.com/PedroGoulartbranco) |

---

<p align="center">
  <b>FluxMedia © 2026</b>
</p>
