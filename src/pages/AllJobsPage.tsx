import React, { useState, useEffect } from 'react';
import type { Job } from '../types/Job';
import { jobsApi } from '../services/api';
import { useUser } from '../contexts/UserContext';
import JobCard from '../components/JobCard';
import { Search, Filter, Briefcase } from 'lucide-react';

const AllJobsPage: React.FC = () => {
  const { isAdmin } = useUser();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadJobs();
    loadAppliedJobs();
  }, []);

  useEffect(() => {
    // Filter jobs based on search term and applied status
    let filtered = jobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // For regular users, hide jobs they've already applied for
    if (!isAdmin) {
      filtered = filtered.filter(job => !appliedJobs.has(job.id));
    }

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, appliedJobs, isAdmin]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const fetchedJobs = await jobsApi.getAll();
      setJobs(fetchedJobs);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAppliedJobs = () => {
    const applied = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    setAppliedJobs(new Set(applied));
  };

  const handleDeleteJob = async (id: string) => {
    try {
      await jobsApi.delete(id);
      setJobs(jobs.filter(job => job.id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {isAdmin ? 'All ' : 'Available '}
            <span className="bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent">
              Opportunities
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {isAdmin 
              ? 'Manage all job postings and view applications.'
              : 'Discover your next career move from our curated list of job opportunities.'
            }
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by job title, company, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2 text-gray-600">
            <Briefcase className="h-5 w-5" />
            <span className="font-medium">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
            </span>
            {!isAdmin && appliedJobs.size > 0 && (
              <span className="text-sm text-gray-500">
                ({appliedJobs.size} applied)
              </span>
            )}
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms.' 
                : isAdmin 
                  ? 'No jobs posted yet.' 
                  : 'No available jobs at the moment.'
              }
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} onDelete={handleDeleteJob} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllJobsPage;