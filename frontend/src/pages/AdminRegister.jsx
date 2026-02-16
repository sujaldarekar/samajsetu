import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import { useLanguage } from '../i18n/LanguageContext';

const AdminRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    registrationCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useLanguage();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (!formData.name || !formData.email || !formData.password || !formData.registrationCode) {
      setError(t('errors.fillAllFields'));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t('errors.passwordsDoNotMatch'));
      return;
    }

    if (formData.password.length < 6) {
      setError(t('errors.passwordMinLength'));
      return;
    }

    setLoading(true);

    try {
      await authService.registerAdmin(
        formData.name,
        formData.email,
        formData.password,
        formData.registrationCode
      );
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || t('errors.adminRegistrationFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">👑</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            SAMAJSETU
          </h1>
          <p className="text-gray-600">{t('adminRegister.portalTitle')}</p>
          <p className="text-sm text-orange-600 font-semibold mt-2">
            🔒 {t('adminRegister.authorizedOnly')}
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-orange-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t('adminRegister.title')}
          </h2>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              ❌ {error}
            </div>
          )}

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                👤 {t('adminRegister.fullNameLabel')}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('adminRegister.fullNamePlaceholder')}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                📧 {t('adminRegister.emailLabel')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('adminRegister.emailPlaceholder')}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                🔐 {t('adminRegister.passwordLabel')}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                🔐 {t('adminRegister.confirmPasswordLabel')}
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Registration Code */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                🔑 {t('adminRegister.registrationCodeLabel')}
              </label>
              <input
                type="password"
                name="registrationCode"
                value={formData.registrationCode}
                onChange={handleChange}
                placeholder={t('adminRegister.registrationCodePlaceholder')}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                {t('adminRegister.registrationCodeHelp')}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50"
            >
              {loading ? `⏳ ${t('adminRegister.creatingAccount')}` : `✓ ${t('adminRegister.createButton')}`}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-6">
            {t('adminRegister.haveAccount')}{' '}
            <Link to="/admin/login" className="text-orange-600 hover:underline font-semibold">
              {t('adminRegister.loginHere')}
            </Link>
          </p>

          {/* User Portal Link */}
          <p className="text-center text-gray-600 mt-4 pt-4 border-t">
            {t('adminRegister.citizenPrompt')}{' '}
            <Link to="/register" className="text-blue-600 hover:underline font-semibold">
              {t('adminRegister.citizenPortal')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
