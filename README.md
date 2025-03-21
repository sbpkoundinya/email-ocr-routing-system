# Email Classifier with OCR - Web App

This project is a complete email classification system with OCR functionality, designed to process emails (with or without attachments), classify them into categories and sub-categories, and decide whether to prioritize email body or attachment text. It then extracts key information and notifies the appropriate personnel.

## 🔧 Features
- Classifies emails using ML model with confidence & probability scores
- Supports attachments: PDFs, images (JPG, PNG)
- OCR processing from attachments using Tesseract
- Priority decision logic: decides between body or attachments
- Information extraction from prioritized text
- Fullstack app: React Frontend + FastAPI Backend

## Sequence Diagram
<img width="842" alt="image" src="https://github.com/user-attachments/assets/17bb3e9a-ae44-4a66-ab7a-8d1b2a982606" />


## 🖼️ Frontend (React)
- Upload email body and attachments via UI
- View classification, routing, and extracted information

## ⚙️ Backend (FastAPI)
- `/classify` endpoint handles classification and OCR
- Includes modular structure for classifier, OCR, priority logic, info extractor

## 🚀 Run Instructions

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup (Requires Node.js + React)
- Use `App.jsx` inside your React app structure (e.g., Vite, Create React App)
- Integrate using TailwindCSS and shadcn/ui

## 📂 Folder Structure
```
frontend/
  App.jsx
backend/
  main.py
  classifier.py
  ocr_module.py
  priority_decider.py
  info_extractor.py
  requirements.txt
```

## 📬 Output Format (from API)
```json
{
  "routing": "body",
  "confidence": 90,
  "probability": 0.91,
  "extracted_info": {
    "Dates": ["2025-03-22"],
    "Entities": ["Sample Co."]
  }
}
```

## ☁️ Deployment
- Backend can be deployed to Azure App Service.
- Frontend can be hosted on GitHub Pages, Vercel, or Azure Static Web Apps.

---
© 2025 Email Classifier System - Built for intelligent email automation.
