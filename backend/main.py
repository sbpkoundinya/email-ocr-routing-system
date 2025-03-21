from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from classifier import EmailClassifier
from priority_decider import decide_priority
from info_extractor import extract_info
from ocr_module import extract_text_from_pdf, extract_text_from_image

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
classifier = EmailClassifier()

@app.post("/classify")
async def classify_email(email_body: str = Form(...), attachments: list[UploadFile] = File([])):
    attachment_texts = []
    for file in attachments:
        content = await file.read()
        if file.filename.endswith(".pdf"):
            text = extract_text_from_pdf(content)
        elif file.filename.lower().endswith(("jpg", "jpeg", "png")):
            text = extract_text_from_image(content)
        else:
            text = ""
        attachment_texts.append(text)

    routing, confidence, probability = decide_priority(email_body, attachment_texts)
    important_text = email_body if routing == "body" else " ".join(attachment_texts)
    extracted_info = extract_info(important_text)
    return JSONResponse({ "routing": routing, "confidence": confidence, "probability": probability, "extracted_info": extracted_info })