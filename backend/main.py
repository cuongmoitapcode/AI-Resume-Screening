from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
from services.resume_processor import ResumeProcessor
from services.skill_analyzer import SkillAnalyzer
from models.schemas import AnalysisRequest, SkillGapResponse

app = FastAPI(title="Resume Screening API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

resume_processor = ResumeProcessor()
skill_analyzer = SkillAnalyzer()

@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    if not file.filename.endswith(('.pdf', '.docx')):
        raise HTTPException(400, "Only PDF and DOCX files supported")
    
    content = await file.read()
    text = resume_processor.extract_text(content, file.filename)
    
    return {"text": text, "filename": file.filename}

@app.post("/analyze-resume", response_model=SkillGapResponse)
async def analyze_resume(request: AnalysisRequest):
    skills = skill_analyzer.extract_skills(request.resume_text)
    job_skills = skill_analyzer.get_job_requirements(request.job_role)
    
    analysis = skill_analyzer.analyze_skill_gap(skills, job_skills)
    
    return SkillGapResponse(
        matched_skills=analysis["matched"],
        partial_skills=analysis["partial"], 
        missing_skills=analysis["missing"],
        match_percentage=analysis["match_percentage"],
        recommendations=analysis["recommendations"]
    )

@app.get("/job-roles")
async def get_job_roles():
    return skill_analyzer.get_available_roles()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)