import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Job } from '../types/Job';
import { useUser } from '../contexts/UserContext';
import { MapPin, DollarSign, Building, Edit, Trash2, Send, CheckCircle } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onDelete?: (id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onDelete }) => {
  const { isAdmin } = useUser();
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    // Check if user has applied for this job
    const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    setHasApplied(appliedJobs.includes(job.id));
  }, [job.id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      onDelete?.(job.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 group overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
              {job.title}
            </h3>
            <div className="flex items-center text-gray-600 mb-2">
              <Building className="h-4 w-4 mr-2" />
              <span className="font-medium">{job.companyName}</span>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-emerald-600 font-semibold">
            <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{job.salary}</span>
          </div>
          <p className="text-gray-700 line-clamp-3 leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          {isAdmin ? (
            // Admin actions
            <>
              <Link
                to={`/edit-job/${job.id}`}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </>
          ) : (
            // User actions
            <>
              {hasApplied ? (
                <div className="flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Already Applied
                </div>
              ) : (
                <Link
                  to={`/apply/${job.id}`}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Apply
                </Link>
              )}
            </>
          )}
        </div>
      </div>

      {/* Date Footer */}
      {job.createdAt && (
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Posted on {new Date(job.createdAt).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default JobCard;