import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import type { Job, Application } from '../types/Job';
import { jobsApi, applicationsApi } from '../services/api';
import { 
  CheckCircle, 
  Calendar, 
  User, 
  Mail, 
  Briefcase, 
  MapPin, 
  DollarSign,
  ArrowLeft,
  Clock,
  Building
} from 'lucide-react';

const ApplicationDetailsPage: React.FC = () => {
  const { jobId, applicationId } = useParams<{ jobId: string; applicationId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [job, setJob] = useState<Job | null>(null);
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (jobId) {
      loadData(jobId);
    }
  }, [jobId]);

  const loadData = async (jobId: string) => {
    try {
      setLoading(true);
      
      // Load job details
      const jobData = await jobsApi.getById(jobId);
      if (jobData) {
        setJob(jobData);
      }

      // If we have an applicationId, load application details
      if (applicationId) {
        const applications = await applicationsApi.getByJobId(jobId);
        const appData = applications.find(app => app.id === applicationId);
        if (appData) {
          setApplication(appData);
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load application details');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading application details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-red-500" />
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/jobs')}
            className="flex items-center text-indigo-600 hover:text-indigo-700 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </button>
          
          <div className="text-center">
            <div className="bg-emerald-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-emerald-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Application{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                Submitted Successfully!
              </span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Your application has been received and is being reviewed. Here are the details:
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Application Details */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4">
              <h2 className="text-white text-lg font-semibold">Application Details</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-emerald-600 mr-3" />
                  <div>
                    <span className="text-sm font-medium text-gray-500">Applicant Name</span>
                    <p className="text-gray-800 font-semibold">{application?.applicantName}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-emerald-600 mr-3" />
                  <div>
                    <span className="text-sm font-medium text-gray-500">Email Address</span>
                    <p className="text-gray-800 font-semibold">{application?.applicantEmail}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-emerald-600 mr-3" />
                  <div>
                    <span className="text-sm font-medium text-gray-500">Application Date</span>
                    <p className="text-gray-800 font-semibold">
                      {application?.appliedAt ? formatDate(application.appliedAt) : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-emerald-600 mr-3" />
                  <div>
                    <span className="text-sm font-medium text-gray-500">Application ID</span>
                    <p className="text-gray-800 font-mono text-sm">{application?.id}</p>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Status</span>
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                    Application Submitted
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4">
              <h2 className="text-white text-lg font-semibold">Job Details</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-indigo-600 mr-3" />
                  <div>
                    <span className="text-sm font-medium text-gray-500">Position</span>
                    <p className="text-gray-800 font-semibold">{job?.title}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Building className="h-5 w-5 text-indigo-600 mr-3" />
                  <div>
                    <span className="text-sm font-medium text-gray-500">Company</span>
                    <p className="text-gray-800 font-semibold">{job?.companyName}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-indigo-600 mr-3" />
                  <div>
                    <span className="text-sm font-medium text-gray-500">Location</span>
                    <p className="text-gray-800 font-semibold">{job?.location}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-indigo-600 mr-3" />
                  <div>
                    <span className="text-sm font-medium text-gray-500">Salary</span>
                    <p className="text-emerald-600 font-semibold">{job?.salary}</p>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500">Job Description</span>
                  <p className="text-gray-700 leading-relaxed mt-2">{job?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <h2 className="text-white text-lg font-semibold">What Happens Next?</h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Application Review</h3>
                <p className="text-gray-600 text-sm">Our team will review your application within 2-3 business days.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Interview Process</h3>
                <p className="text-gray-600 text-sm">If selected, we'll contact you to schedule an interview.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Final Decision</h3>
                <p className="text-gray-600 text-sm">We'll notify you of our final decision within 1-2 weeks.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/jobs')}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
          >
            Browse More Jobs
          </button>
          <button
            onClick={() => window.print()}
            className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
          >
            Print Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsPage; 