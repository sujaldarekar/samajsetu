/**
 * Register Page
 * Allows new users to create an account
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import { useLanguage } from '../i18n/LanguageContext';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { t } = useLanguage();

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
      if (!formData.name || !formData.email || !formData.password) {
        throw new Error(t('errors.allFieldsRequired'));
      }

      if (formData.password.length < 6) {
        throw new Error(t('errors.passwordMinLength'));
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error(t('errors.passwordsDoNotMatch'));
      }

      // Call register API
      await authService.register(
        formData.name,
        formData.email,
        formData.password
      );

      // Redirect to dashboard after successful registration
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || t('errors.registrationFailed'));
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
            🌉 {t('register.joinTitle')}
          </h1>
          <p className="text-center text-light mb-8">
            {t('register.subtitle')}
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                {t('register.fullName')}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('register.fullNamePlaceholder')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                {t('register.emailLabel')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('register.emailPlaceholder')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                {t('register.passwordLabel')}
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
              <p className="text-xs text-light mt-1">
                {t('register.passwordHint')}
              </p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                {t('register.confirmPassword')}
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition disabled:opacity-50"
            >
              {loading ? `⏳ ${t('register.creatingAccount')}` : `✅ ${t('register.createAccount')}`}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-light">
              {t('register.haveAccount')}{' '}
              <Link to="/login" className="text-primary hover:text-blue-700 font-semibold">
                {t('register.loginHere')}
              </Link>
            </p>
          </div>

          {/* Terms */}
          <div className="text-center mt-4 text-xs text-light">
            <p>
              {t('register.termsPrefix')}{' '}
              <a href="#" className="text-primary hover:underline">
                {t('register.termsLink')}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
