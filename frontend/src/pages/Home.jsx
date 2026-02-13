/**
 * Home Page
 * Landing page showing SAMAJSETU overview and features
 * Entry point for new users
 */

import { Link } from 'react-router-dom';
import authService from '../services/authService';

const Home = () => {
  const currentUser = authService.getCurrentUser();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            🌉 Welcome to SAMAJSETU
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Your voice matters! Report social service issues instantly and track resolution in real-time.
            Bridging the gap between citizens and government.
          </p>
          {!currentUser ? (
            <div className="flex justify-center gap-4">
              <Link
                to="/register"
                className="bg-secondary hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="bg-white hover:bg-gray-100 text-primary px-8 py-3 rounded-lg font-bold text-lg transition"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <Link
              to={currentUser.role === 'admin' ? '/admin' : '/dashboard'}
              className="bg-secondary hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg inline-block transition"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why SAMAJSETU?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-3 text-dark">Fast & Easy</h3>
              <p className="text-light">
                Submit complaints in just 2 minutes with photo proof. No complex paperwork needed.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition text-center">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-2xl font-bold mb-3 text-dark">Track Anytime</h3>
              <p className="text-light">
                Check complaint status 24/7. Get real-time updates on resolution progress.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition text-center">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-2xl font-bold mb-3 text-dark">Secure & Private</h3>
              <p className="text-light">
                Your data is encrypted and safe. Only authorized officials access your information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold text-dark mb-2">Register</h3>
              <p className="text-sm text-light">
                Create your account in seconds with email and password
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold text-dark mb-2">Submit</h3>
              <p className="text-sm text-light">
                File a complaint with photo proof and location details
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold text-dark mb-2">Track</h3>
              <p className="text-sm text-light">
                Monitor status as officials work on your complaint
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-bold text-dark mb-2">Resolved</h3>
              <p className="text-sm text-light">
                Issue resolved and marked complete in system
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">We Accept Complaints About</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Noise */}
            <div className="bg-yellow-50 p-8 rounded-lg border-2 border-yellow-200">
              <div className="text-6xl mb-4">🔊</div>
              <h3 className="text-2xl font-bold text-dark mb-3">Noise Pollution</h3>
              <ul className="text-sm text-dark space-y-2">
                <li>✓ Construction noise</li>
                <li>✓ Loudspeaker misuse</li>
                <li>✓ Traffic noise</li>
              </ul>
            </div>

            {/* Garbage */}
            <div className="bg-green-50 p-8 rounded-lg border-2 border-secondary">
              <div className="text-6xl mb-4">🗑️</div>
              <h3 className="text-2xl font-bold text-dark mb-3">Garbage & Cleanliness</h3>
              <ul className="text-sm text-dark space-y-2">
                <li>✓ Uncleaned streets</li>
                <li>✓ Garbage dumping</li>
                <li>✓ Sanitation issues</li>
              </ul>
            </div>

            {/* Water */}
            <div className="bg-blue-50 p-8 rounded-lg border-2 border-blue-200">
              <div className="text-6xl mb-4">💧</div>
              <h3 className="text-2xl font-bold text-dark mb-3">Water Supply</h3>
              <ul className="text-sm text-dark space-y-2">
                <li>✓ No water supply</li>
                <li>✓ Water contamination</li>
                <li>✓ Pipe leaks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-5xl font-bold mb-2">10,000+</h3>
              <p className="text-lg">Active Citizens</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold mb-2">5,000+</h3>
              <p className="text-lg">Issues Resolved</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold mb-2">95%</h3>
              <p className="text-lg">Resolution Rate</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
