import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const AnalysisResults = ({ data, jobRole }) => {
  const { matched_skills, partial_skills, missing_skills, match_percentage, recommendations } = data;

  const doughnutData = {
    labels: ['Matched', 'Partial', 'Missing'],
    datasets: [{
      data: [matched_skills.length, partial_skills.length, missing_skills.length],
      backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
      borderWidth: 0,
    }]
  };

  const barData = {
    labels: ['Matched Skills', 'Partial Skills', 'Missing Skills'],
    datasets: [{
      label: 'Number of Skills',
      data: [matched_skills.length, partial_skills.length, missing_skills.length],
      backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold mb-6">Analysis Results for {jobRole}</h2>
      
      {/* Match Percentage */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">{match_percentage}%</div>
          <div className="text-gray-600">Overall Match</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Skill Distribution</h3>
          <Doughnut data={doughnutData} options={chartOptions} />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-3">Skill Breakdown</h3>
          <Bar data={barData} options={chartOptions} />
        </div>
      </div>

      {/* Skill Lists */}
      <div className="space-y-4">
        <SkillSection
          title="✅ Matched Skills"
          skills={matched_skills}
          color="green"
        />
        
        {partial_skills.length > 0 && (
          <SkillSection
            title="⚠️ Partial Skills"
            skills={partial_skills}
            color="yellow"
          />
        )}
        
        <SkillSection
          title="❌ Missing Skills"
          skills={missing_skills}
          color="red"
        />
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-3">🎯 Learning Recommendations</h3>
          <div className="space-y-2">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start">
                <div className="font-medium text-blue-600 mr-2">{rec.skill}:</div>
                <div className="text-gray-700">{rec.recommendation}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SkillSection = ({ title, skills, color }) => {
  const colorClasses = {
    green: 'bg-green-50 border-green-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    red: 'bg-red-50 border-red-200'
  };

  return (
    <div className={`p-4 rounded-lg border ${colorClasses[color]}`}>
      <h3 className="font-medium mb-2">{title} ({skills.length})</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-white rounded-full text-sm border"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnalysisResults;