import React, { useState } from 'react';

const ResumeUpload = ({ onTextExtracted }) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file) => {
    if (!file || !file.name.match(/\.(pdf|docx)$/i)) {
      alert('Please upload a PDF or DOCX file');
      return;
    }

    setUploading(true);
    setFileName(file.name);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/upload-resume', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      onTextExtracted(data.text);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    }
    
    setUploading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold mb-4">Upload Resume</h2>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleChange}
          className="hidden"
          id="resume-upload"
        />
        
        <label htmlFor="resume-upload" className="cursor-pointer">
          <div className="text-gray-600">
            {uploading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="ml-2">Processing...</span>
              </div>
            ) : fileName ? (
              <div className="text-green-600">
                <div className="text-2xl mb-2">✓</div>
                <div>Uploaded: {fileName}</div>
              </div>
            ) : (
              <div>
                <div className="text-4xl mb-4">📄</div>
                <div className="text-lg font-medium">Drop your resume here</div>
                <div className="text-sm text-gray-500 mt-2">
                  or click to browse (PDF, DOCX)
                </div>
              </div>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

export default ResumeUpload;