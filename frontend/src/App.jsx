import React, { useState } from 'react';
import ResumeUpload from './components/ResumeUpload';
import JobRoleSelector from './components/JobRoleSelector';
import AnalysisResults from './components/AnalysisResults';
import './App.css';

function App() {
  const [resumeText, setResumeText] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalysis = async () => {
    if (!resumeText || !selectedRole) return;
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume_text: resumeText,
          job_role: selectedRole
        })
      });
      
      const data = await response.json();
      setAnalysisData(data);
    } catch (error) {
      console.error('Analysis failed:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            AI Resume Screening & Skill Gap Analysis
          </h1>
          <p className="text-gray-600 mt-2">
            Upload your resume and discover skill gaps for your target role
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ResumeUpload onTextExtracted={setResumeText} />
            <JobRoleSelector 
              selectedRole={selectedRole}
              onRoleSelect={setSelectedRole}
            />
            
            <button
              onClick={handleAnalysis}
              disabled={!resumeText || !selectedRole || loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          </div>

          <div>
            {analysisData && (
              <AnalysisResults data={analysisData} jobRole={selectedRole} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;