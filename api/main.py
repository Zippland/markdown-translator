from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import StreamingResponse
import openai
import os

app = FastAPI()

@app.post("/api/translate")
async def translate(file: UploadFile = File(...), password: str = Form(...)):
    correct_password = os.getenv("TRANSLATION_PASSWORD")
    if password != correct_password:
        raise HTTPException(status_code=401, detail="Unauthorized")

    content = await file.read()
    text = content.decode("utf-8")

    response = openai.Completion.create(
        engine="gpt-4o",
        prompt=f"Translate the following markdown content to Chinese:\n\n{text}",
        max_tokens=4096
    )

    translated_text = response.choices[0].text.strip()

    return StreamingResponse(
        iter([translated_text.encode("utf-8")]),
        media_type="text/markdown",
        headers={"Content-Disposition": f"attachment; filename=translated_{file.filename}"}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
