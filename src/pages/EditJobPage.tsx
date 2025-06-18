import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Job, JobFormData } from '../types/Job';
import { jobsApi } from '../services/api';
import JobForm from '../components/JobForm';
import { Edit, CheckCircle, AlertCircle } from 'lucide-react';

const EditJobPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadJob(id);
    }
  }, [id]);

  const loadJob = async (jobId: string) => {
    try {
      setLoading(true);
      const jobData = await jobsApi.getById(jobId);
      if (jobData) {
        setJob(jobData);
      } else {
        setError('Job not found');
      }
    } catch (error) {
      console.error('Error loading job:', error);
      setError('Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: JobFormData) => {
    if (!id) return;

    try {
      setIsSubmitting(true);
      await jobsApi.update(id, formData);
      
      // Show success message
      setShowSuccess(true);
      
      // Navigate to jobs page after a short delay
      setTimeout(() => {
        navigate('/jobs');
      }, 2000);
    } catch (error) {
      console.error('Error updating job:', error);
      setError('Failed to update job');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/jobs')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-emerald-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Job Updated Successfully!</h2>
          <p className="text-gray-600">Redirecting you to all jobs...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return null;
  }

  const initialData: JobFormData = {
    title: job.title,
    description: job.description,
    location: job.location,
    salary: job.salary,
    companyName: job.companyName,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-4 rounded-full w-16 h-16 mx-auto mb-6">
            <Edit className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Edit{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent">
              Job Posting
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Update the job details to ensure you attract the right candidates.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-6">
            <h2 className="text-white text-xl font-semibold">Update Job Details</h2>
            <p className="text-indigo-100">Modify the information below to update your job posting.</p>
          </div>
          <div className="p-8">
            <JobForm 
              initialData={initialData}
              onSubmit={handleSubmit} 
              isLoading={isSubmitting}
              submitText="Update Job"
            />
          </div>
        </div>

        {/* Current Job Info */}
        <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50">
          <h3 className="font-semibold text-gray-800 mb-3">Currently Editing:</h3>
          <div className="text-gray-600">
            <p><strong>Job:</strong> {job.title}</p>
            <p><strong>Company:</strong> {job.companyName}</p>
            <p><strong>Location:</strong> {job.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditJobPage;