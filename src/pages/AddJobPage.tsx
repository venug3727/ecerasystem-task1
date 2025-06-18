import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { JobFormData } from '../types/Job';
import { jobsApi } from '../services/api';
import JobForm from '../components/JobForm';
import { Plus, CheckCircle } from 'lucide-react';

const AddJobPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (formData: JobFormData) => {
    try {
      setIsLoading(true);
      await jobsApi.create(formData);
      
      // Show success message
      setShowSuccess(true);
      
      // Navigate to jobs page after a short delay
      setTimeout(() => {
        navigate('/jobs');
      }, 2000);
    } catch (error) {
      console.error('Error creating job:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-emerald-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Job Posted Successfully!</h2>
          <p className="text-gray-600">Redirecting you to all jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-4 rounded-full w-16 h-16 mx-auto mb-6">
            <Plus className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Post a New{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent">
              Job Opening
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Fill out the details below to post your job opening and attract the best candidates.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-6">
            <h2 className="text-white text-xl font-semibold">Job Details</h2>
            <p className="text-indigo-100">Please provide accurate information to attract qualified candidates.</p>
          </div>
          <div className="p-8">
            <JobForm 
              onSubmit={handleSubmit} 
              isLoading={isLoading}
              submitText="Post Job"
            />
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50">
          <h3 className="font-semibold text-gray-800 mb-3">Tips for a Great Job Posting:</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Be specific about the role and responsibilities</li>
            <li>• Include required skills and qualifications</li>
            <li>• Mention company culture and benefits</li>
            <li>• Use clear, professional language</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddJobPage;