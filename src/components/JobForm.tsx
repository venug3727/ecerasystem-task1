import React, { useState, useEffect } from 'react';
import type{ JobFormData } from '../types/Job';
import { Briefcase, MapPin, DollarSign, Building, FileText } from 'lucide-react';

interface JobFormProps {
  initialData?: JobFormData;
  onSubmit: (data: JobFormData) => void;
  isLoading?: boolean;
  submitText?: string;
}

const JobForm: React.FC<JobFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
  submitText = 'Submit',
}) => {
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    description: '',
    location: '',
    salary: '',
    companyName: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const inputClassName = "w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white";
  const labelClassName = "block text-sm font-medium text-gray-800 mb-2";

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Title */}
        <div>
          <label htmlFor="title" className={labelClassName}>
            Job Title
          </label>
          <div className="relative">
            <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={inputClassName}
              placeholder="e.g. Senior Frontend Developer"
              required
            />
          </div>
        </div>

        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className={labelClassName}>
            Company Name
          </label>
          <div className="relative">
            <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className={inputClassName}
              placeholder="e.g. TechCorp Inc."
              required
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className={labelClassName}>
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={inputClassName}
              placeholder="e.g. San Francisco, CA"
              required
            />
          </div>
        </div>

        {/* Salary */}
        <div>
          <label htmlFor="salary" className={labelClassName}>
            Salary Range
          </label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className={inputClassName}
              placeholder="e.g. $120,000 - $150,000"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className={labelClassName}>
            Job Description
          </label>
          <div className="relative">
            <FileText className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white resize-vertical"
              placeholder="Describe the job responsibilities, requirements, and benefits..."
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-indigo-700 hover:to-indigo-800 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              submitText
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;