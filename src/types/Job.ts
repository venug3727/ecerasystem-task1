export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  companyName: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface JobFormData {
  title: string;
  description: string;
  location: string;
  salary: string;
  companyName: string;
}

export interface Application {
  id: string;
  jobId: string;
  applicantName: string;
  applicantEmail: string;
  status: 'applied' | 'reviewing' | 'accepted' | 'rejected';
  appliedAt?: string;
}

export interface ApplicationFormData {
  applicantName: string;
  applicantEmail: string;
}

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}