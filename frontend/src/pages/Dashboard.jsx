/**
 * Citizen Dashboard
 * Main hub for citizens to manage complaints
 */

import { Link } from 'react-router-dom';
import authService from '../services/authService';

const Dashboard = () => {
  const currentUser = authService.getCurrentUser();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-blue-700 text-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold mb-4">
            👋 Welcome, {currentUser?.name}!
          </h1>
          <p className="text-lg opacity-90">
            You can submit complaints and track their status from this dashboard.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-8 mb-12">
          {/* My Complaints Card */}
          <Link
            to="/my-complaints"
            className="bg-primary hover:bg-blue-700 text-white rounded-lg shadow-lg p-8 transition transform hover:scale-105"
          >
            <div className="text-5xl mb-4">📋</div>
            <h2 className="text-2xl font-bold mb-2">My Complaints</h2>
            <p className="text-sm">
              View all your submitted complaints and their status
            </p>
            <div className="mt-4 font-bold">
              View All →
            </div>
          </Link>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* How to File */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-secondary">
            <h3 className="text-xl font-bold text-dark mb-4">📌 How to File</h3>
            <ol className="space-y-3 text-sm text-dark list-decimal list-inside">
              <li>Click "Submit New Complaint"</li>
              <li>Fill in complaint details</li>
              <li>Upload a clear photo</li>
              <li>Submit and get confirmation</li>
            </ol>
          </div>

          {/* What We Solve */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-accent">
            <h3 className="text-xl font-bold text-dark mb-4">✅ We Accept</h3>
            <ul className="space-y-2 text-sm text-dark">
              <li>🔊 Noise Pollution Issues</li>
              <li>🗑️ Garbage & Cleanliness</li>
              <li>💧 Water Supply Problems</li>
              <li>+ More coming soon</li>
            </ul>
          </div>

          {/* Important Info */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
            <h3 className="text-xl font-bold text-dark mb-4">ℹ️ Important</h3>
            <ul className="space-y-2 text-sm text-dark">
              <li>✓ All complaints are confidential</li>
              <li>✓ We resolve within 30 days</li>
              <li>✓ You'll get email updates</li>
              <li>✓ Available 24/7</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
