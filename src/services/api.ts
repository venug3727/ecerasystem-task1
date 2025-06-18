import axios from 'axios';
import type { Job, JobFormData, Application, ApplicationFormData } from '../types/Job';

const API_BASE_URL = 'https://ecerasystem-task1-backend.vercel.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});




// Job API calls
export const jobsApi = {
  getAll: async (): Promise<Job[]> => {
    try {
      const response = await api.get('/jobs');
      // Transform backend data to frontend format
      return response.data.map((job: any) => ({
        id: job._id,
        title: job.title,
        description: job.description,
        location: job.location,
        salary: job.salary.toString(),
        companyName: job.company,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt,
      }));
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },

  getById: async (id: string): Promise<Job | null> => {
    try {
      const response = await api.get(`/jobs/${id}`);
      const job = response.data;
      // Transform backend data to frontend format
      return {
        id: job._id,
        title: job.title,
        description: job.description,
        location: job.location,
        salary: job.salary.toString(),
        companyName: job.company,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt,
      };
    } catch (error) {
      console.error('Error fetching job:', error);
      throw error;
    }
  },

  create: async (jobData: JobFormData): Promise<Job> => {
    try {
      // Transform frontend data to backend format
      const backendData = {
        title: jobData.title,
        description: jobData.description,
        location: jobData.location,
        salary: parseInt(jobData.salary.replace(/[^0-9]/g, '')),
        company: jobData.companyName,
      };
      
      const response = await api.post('/jobs', backendData);
      const job = response.data;
      
      // Transform backend response to frontend format
      return {
        id: job._id,
        title: job.title,
        description: job.description,
        location: job.location,
        salary: job.salary.toString(),
        companyName: job.company,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt,
      };
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  },

  update: async (id: string, jobData: JobFormData): Promise<Job> => {
    try {
      // Transform frontend data to backend format
      const backendData = {
        title: jobData.title,
        description: jobData.description,
        location: jobData.location,
        salary: parseInt(jobData.salary.replace(/[^0-9]/g, '')),
        company: jobData.companyName,
      };
      
      const response = await api.put(`/jobs/${id}`, backendData);
      const job = response.data;
      
      // Transform backend response to frontend format
      return {
        id: job._id,
        title: job.title,
        description: job.description,
        location: job.location,
        salary: job.salary.toString(),
        companyName: job.company,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt,
      };
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/jobs/${id}`);
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  },
};

// Application API calls
export const applicationsApi = {
  create: async (jobId: string, applicationData: ApplicationFormData): Promise<Application> => {
    try {
      // Transform frontend data to backend format
      const backendData = {
        userName: applicationData.applicantName,
        userEmail: applicationData.applicantEmail,
      };
      
      const response = await api.post(`/apply/${jobId}`, backendData);
      const application = response.data;
      
      // Transform backend response to frontend format
      return {
        id: application._id,
        jobId: application.jobId,
        applicantName: application.userName,
        applicantEmail: application.userEmail,
        status: application.status || 'applied',
        appliedAt: application.dateApplied,
      };
    } catch (error) {
      console.error('Error creating application:', error);
      throw error;
    }
  },

  getByJobId: async (jobId: string): Promise<Application[]> => {
    try {
      const response = await api.get(`/jobs/${jobId}/applications`);
      // Transform backend data to frontend format
      return response.data.map((app: any) => ({
        id: app._id,
        jobId: app.jobId,
        applicantName: app.userName,
        applicantEmail: app.userEmail,
        appliedAt: app.dateApplied,
      }));
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  },
};