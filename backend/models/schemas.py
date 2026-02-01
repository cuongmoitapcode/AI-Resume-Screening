from pydantic import BaseModel
from typing import List, Dict

class AnalysisRequest(BaseModel):
    resume_text: str
    job_role: str

class SkillGapResponse(BaseModel):
    matched_skills: List[str]
    partial_skills: List[str]
    missing_skills: List[str]
    match_percentage: float
    recommendations: List[Dict[str, str]]