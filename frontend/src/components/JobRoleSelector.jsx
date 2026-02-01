import React, { useState, useEffect } from 'react';

const JobRoleSelector = ({ selectedRole, onRoleSelect }) => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/job-roles')
      .then(res => res.json())
      .then(data => setRoles(data))
      .catch(err => console.error('Failed to load roles:', err));
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold mb-4">Select Target Job Role</h2>
      
      <div className="grid grid-cols-1 gap-3">
        {roles.map((role) => (
          <label
            key={role}
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedRole === role
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="jobRole"
              value={role}
              checked={selectedRole === role}
              onChange={(e) => onRoleSelect(e.target.value)}
              className="mr-3"
            />
            <div>
              <div className="font-medium">{role}</div>
              <div className="text-sm text-gray-500">
                {getRoleDescription(role)}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

const getRoleDescription = (role) => {
  const descriptions = {
    'Frontend Developer': 'UI/UX development with modern frameworks',
    'Backend Developer': 'Server-side development and APIs',
    'Data Analyst': 'Data analysis and business intelligence',
    'Data Scientist': 'Machine learning and predictive analytics',
    'Software Engineer': 'Full-stack software development'
  };
  return descriptions[role] || '';
};

export default JobRoleSelector;