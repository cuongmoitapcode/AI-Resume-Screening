import re
from typing import List, Dict, Set
from difflib import SequenceMatcher

class SkillAnalyzer:
    def __init__(self):
        self.job_requirements = {
            "Frontend Developer": [
                "JavaScript", "React", "HTML", "CSS", "TypeScript", "Vue.js", 
                "Angular", "Sass", "Webpack", "Git", "Responsive Design"
            ],
            "Backend Developer": [
                "Python", "Java", "Node.js", "SQL", "MongoDB", "PostgreSQL",
                "REST API", "Docker", "AWS", "Git", "Express.js"
            ],
            "Data Analyst": [
                "Python", "SQL", "Excel", "Tableau", "Power BI", "Pandas",
                "NumPy", "Statistics", "Data Visualization", "R"
            ],
            "Data Scientist": [
                "Python", "Machine Learning", "TensorFlow", "PyTorch", "SQL",
                "Statistics", "Pandas", "NumPy", "Scikit-learn", "Deep Learning"
            ],
            "Software Engineer": [
                "Python", "Java", "JavaScript", "Git", "SQL", "Algorithms",
                "Data Structures", "System Design", "Testing", "Agile"
            ]
        }
        
        self.skill_variations = {
            "js": "JavaScript", "javascript": "JavaScript",
            "react.js": "React", "reactjs": "React",
            "node": "Node.js", "nodejs": "Node.js",
            "postgres": "PostgreSQL", "postgresql": "PostgreSQL",
            "ml": "Machine Learning", "ai": "Machine Learning",
            "tf": "TensorFlow", "tensorflow": "TensorFlow",
            "vue.js": "Vue.js", "express.js": "Express.js",
            "rest api": "REST API", "scikit-learn": "Scikit-learn"
        }

    def extract_skills(self, text: str) -> List[str]:
        text_lower = text.lower()
        skills = set()
        
        # All possible skills to search for
        all_skills = [
            'python', 'java', 'javascript', 'react', 'angular', 'vue', 'vue.js',
            'node.js', 'nodejs', 'html', 'css', 'typescript', 'sass', 'webpack',
            'git', 'sql', 'mongodb', 'postgresql', 'mysql', 'redis', 'rest api',
            'docker', 'aws', 'azure', 'express.js', 'pandas', 'numpy', 'tableau',
            'power bi', 'excel', 'statistics', 'r', 'machine learning', 'tensorflow',
            'pytorch', 'scikit-learn', 'deep learning', 'algorithms', 'data structures',
            'system design', 'testing', 'agile', 'responsive design'
        ]
        
        # Find skills in text
        for skill in all_skills:
            if skill in text_lower:
                normalized = self.skill_variations.get(skill, skill)
                skills.add(normalized.title())
        
        return list(skills)

    def analyze_skill_gap(self, resume_skills: List[str], job_skills: List[str]) -> Dict:
        resume_set = {skill.lower() for skill in resume_skills}
        job_set = {skill.lower() for skill in job_skills}
        
        matched = []
        partial = []
        missing = []
        
        for job_skill in job_skills:
            job_lower = job_skill.lower()
            
            if job_lower in resume_set:
                matched.append(job_skill)
            else:
                # Check for partial matches
                found_partial = False
                for resume_skill in resume_skills:
                    similarity = SequenceMatcher(None, resume_skill.lower(), job_lower).ratio()
                    if similarity > 0.7:
                        partial.append(job_skill)
                        found_partial = True
                        break
                
                if not found_partial:
                    missing.append(job_skill)
        
        match_percentage = (len(matched) + len(partial) * 0.5) / len(job_skills) * 100
        
        recommendations = self._generate_recommendations(missing[:3])
        
        return {
            "matched": matched,
            "partial": partial,
            "missing": missing,
            "match_percentage": round(match_percentage, 1),
            "recommendations": recommendations
        }

    def _generate_recommendations(self, missing_skills: List[str]) -> List[Dict[str, str]]:
        resources = {
            "JavaScript": "Learn modern JS fundamentals and ES6+ features",
            "React": "Build projects with React hooks and component patterns",
            "Python": "Practice with data structures and web frameworks",
            "SQL": "Master joins, subqueries, and database design",
            "Machine Learning": "Start with scikit-learn and basic algorithms"
        }
        
        return [
            {"skill": skill, "recommendation": resources.get(skill, f"Learn {skill} fundamentals")}
            for skill in missing_skills
        ]

    def get_job_requirements(self, job_role: str) -> List[str]:
        return self.job_requirements.get(job_role, [])
    
    def get_available_roles(self) -> List[str]:
        return list(self.job_requirements.keys())