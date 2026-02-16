/**
 * Login Page
 * Allows existing users to sign in
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import { useLanguage } from '../i18n/LanguageContext';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate inputs
      if (!formData.email || !formData.password) {
        throw new Error(t('errors.requiredEmailPassword'));
      }

      // Call login API
      const response = await authService.login(
        formData.email,
        formData.password
      );

      // Redirect based on role
      if (response.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || t('errors.loginFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-dark mb-2">
            🌉 {t('login.welcomeBack')}
          </h1>
          <p className="text-center text-light mb-8">
            {t('login.signInSubtitle')}
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              ❌ {error}
            </div>
          )}

          {/* Demo Credentials */}
          <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6 text-sm">
            <p className="font-semibold text-primary mb-2">📌 {t('login.demoCredentials')}</p>
            <p className="text-dark"><strong>{t('login.demoCitizen')}</strong> citizen@example.com / password123</p>
            <p className="text-dark"><strong>{t('login.demoAdmin')}</strong> admin@example.com / admin123</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                {t('login.emailLabel')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('login.emailPlaceholder')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                {t('login.passwordLabel')}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-primary"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-dark">
                {t('login.rememberMe')}
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition disabled:opacity-50"
            >
              {loading ? `⏳ ${t('login.signingIn')}` : `✅ ${t('login.signInButton')}`}
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-light">
              {t('login.noAccount')}{' '}
              <Link to="/register" className="text-primary hover:text-blue-700 font-semibold">
                {t('login.registerHere')}
              </Link>
            </p>
          </div>

          {/* Forgot Password Link */}
          <div className="text-center mt-4">
            <a href="#" className="text-sm text-primary hover:text-blue-700">
              {t('login.forgotPassword')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
