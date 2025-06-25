from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import pandas as pd
import tempfile
from model_logic import run_sbs

app = FastAPI()

# Enable CORS (for React/Next.js frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/upload/")
async def upload_dataset(
    file: UploadFile,
    model: str = Form(...),
    target_column: str = Form(...),
    k: int = Form(...)
):
    df = pd.read_csv(file.file)
    reduced_df, selected_features = run_sbs(df, target_column, model, k)

    temp = tempfile.NamedTemporaryFile(delete=False, suffix=".csv")
    reduced_df.to_csv(temp.name, index=False)
    return FileResponse(temp.name, filename="reduced_dataset.csv")
