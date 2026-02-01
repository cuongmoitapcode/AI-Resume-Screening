import requests
import json

# Test the API endpoints
BASE_URL = "http://localhost:8000"

def test_job_roles():
    response = requests.get(f"{BASE_URL}/job-roles")
    print("Job Roles:", response.json())

def test_analyze_resume():
    sample_text = """
    John Doe - Software Developer
    Skills: JavaScript, React, Python, SQL, Git, HTML, CSS
    Experience with Node.js, MongoDB, and REST APIs
    """
    
    data = {
        "resume_text": sample_text,
        "job_role": "Frontend Developer"
    }
    
    response = requests.post(f"{BASE_URL}/analyze-resume", json=data)
    result = response.json()
    
    print("\nAnalysis Results:")
    print(f"Match Percentage: {result['match_percentage']}%")
    print(f"Matched Skills: {result['matched_skills']}")
    print(f"Missing Skills: {result['missing_skills']}")
    print(f"Recommendations: {result['recommendations']}")

if __name__ == "__main__":
    try:
        test_job_roles()
        test_analyze_resume()
    except requests.exceptions.ConnectionError:
        print("Error: Make sure the backend server is running on port 8000")