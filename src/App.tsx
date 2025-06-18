import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './contexts/UserContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AllJobsPage from './pages/AllJobsPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
import ApplyPage from './pages/ApplyPage';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ApplicationDetailsPage from './pages/ApplicationDetailsPage';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; requireAdmin?: boolean }> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { isAuthenticated, isAdmin } = useUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/jobs" replace />;
  }

  return <>{children}</>;
};

function AppContent() {
  const { isAuthenticated } = useUser();

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/jobs" element={
          <ProtectedRoute>
            <AllJobsPage />
          </ProtectedRoute>
        } />
        <Route path="/apply/:id" element={
          <ProtectedRoute>
            <ApplyPage />
          </ProtectedRoute>
        } />
        <Route path="/jobs/:jobId/applications/:applicationId" element={
          <ProtectedRoute>
            <ApplicationDetailsPage />
          </ProtectedRoute>
        } />
        
        {/* Admin Only Routes */}
        <Route path="/add-job" element={
          <ProtectedRoute requireAdmin>
            <AddJobPage />
          </ProtectedRoute>
        } />
        <Route path="/edit-job/:id" element={
          <ProtectedRoute requireAdmin>
            <EditJobPage />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin>
            <AdminDashboardPage />
          </ProtectedRoute>
        } />
        
        {/* Redirect to login if not authenticated */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

export default App;