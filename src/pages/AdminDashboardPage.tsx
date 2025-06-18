import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Job, Application } from '../types/Job';
import { jobsApi, applicationsApi } from '../services/api';
import { 
  Plus, 
  Briefcase, 
  Users, 
  Trash2, 
  Edit, 
  Eye,
  Building,
  MapPin,
  DollarSign,
  Calendar,
  Mail
} from 'lucide-react';

const AdminDashboardPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [jobsData, allApplications] = await Promise.all([
        jobsApi.getAll(),
        loadAllApplications()
      ]);
      setJobs(jobsData);
      setApplications(allApplications);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAllApplications = async (): Promise<Application[]> => {
    try {
      const jobsData = await jobsApi.getAll();
      const allApplications: Application[] = [];
      
      for (const job of jobsData) {
        try {
          const jobApplications = await applicationsApi.getByJobId(job.id);
          allApplications.push(...jobApplications);
        } catch (error) {
          console.error(`Error loading applications for job ${job.id}:`, error);
        }
      }
      
      return allApplications;
    } catch (error) {
      console.error('Error loading all applications:', error);
      return [];
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      try {
        await jobsApi.delete(jobId);
        setJobs(jobs.filter(job => job.id !== jobId));
        // Also remove applications for this job
        setApplications(applications.filter(app => app.jobId !== jobId));
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('Failed to delete job');
      }
    }
  };

  const getJobById = (jobId: string) => {
    return jobs.find(job => job.id === jobId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Admin{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-gray-600 text-lg">
            Manage jobs and view applications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-indigo-100 rounded-full p-3 mr-4">
                <Briefcase className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Jobs</p>
                <p className="text-2xl font-bold text-gray-800">{jobs.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-emerald-100 rounded-full p-3 mr-4">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Applications</p>
                <p className="text-2xl font-bold text-gray-800">{applications.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Actions</p>
                <Link
                  to="/add-job"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Add New Job
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('jobs')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'jobs'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Jobs ({jobs.length})
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'applications'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Applications ({applications.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'jobs' ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">All Jobs</h3>
                  <Link
                    to="/add-job"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Job
                  </Link>
                </div>

                <div className="grid gap-6">
                  {jobs.map(job => (
                    <div key={job.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center">
                              <Building className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-gray-600">{job.companyName}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-gray-600">{job.location}</span>
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-emerald-600 font-medium">{job.salary}</span>
                            </div>
                          </div>
                          <p className="text-gray-700 line-clamp-2">{job.description}</p>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Link
                            to={`/edit-job/${job.id}`}
                            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            title="Edit Job"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDeleteJob(job.id)}
                            className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                            title="Delete Job"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">All Applications</h3>
                
                <div className="grid gap-6">
                  {applications.map(application => {
                    const job = getJobById(application.jobId);
                    return (
                      <div key={application.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-lg font-semibold text-gray-800">
                                {application.applicantName}
                              </h4>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                (application.status || 'applied') === 'applied' ? 'bg-blue-100 text-blue-800' :
                                (application.status || 'applied') === 'reviewing' ? 'bg-yellow-100 text-yellow-800' :
                                (application.status || 'applied') === 'accepted' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {(application.status || 'applied').charAt(0).toUpperCase() + (application.status || 'applied').slice(1)}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">{application.applicantEmail}</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">
                                  {application.appliedAt ? formatDate(application.appliedAt) : 'N/A'}
                                </span>
                              </div>
                            </div>
                            
                            {job && (
                              <div className="bg-white rounded-lg p-4 border border-gray-200">
                                <h5 className="font-medium text-gray-800 mb-2">Applied for:</h5>
                                <p className="text-gray-700">{job.title} at {job.companyName}</p>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex space-x-2 ml-4">
                            <Link
                              to={`/jobs/${application.jobId}/applications/${application.id}`}
                              className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage; 