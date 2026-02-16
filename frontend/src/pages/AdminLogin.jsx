import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import { useLanguage } from '../i18n/LanguageContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
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
    setLoading(true);

    try {
      await authService.loginAdmin(formData.email, formData.password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || t('errors.loginFailed'));
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
          <p className="text-gray-600">{t('adminLogin.portalTitle')}</p>
          <p className="text-sm text-orange-600 font-semibold mt-2">
            🔒 {t('adminLogin.authorizedOnly')}
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-orange-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t('adminLogin.title')}
          </h2>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              ❌ {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                📧 {t('adminLogin.emailLabel')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('adminLogin.emailPlaceholder')}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                🔐 {t('adminLogin.passwordLabel')}
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50"
            >
              {loading ? `⏳ ${t('adminLogin.loggingIn')}` : `✓ ${t('adminLogin.loginButton')}`}
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-gray-600 mt-6">
            {t('adminLogin.noAccount')}{' '}
            <Link to="/admin/register" className="text-orange-600 hover:underline font-semibold">
              {t('adminLogin.registerHere')}
            </Link>
          </p>

          {/* User Portal Link */}
          <p className="text-center text-gray-600 mt-4 pt-4 border-t">
            {t('adminLogin.citizenPrompt')}{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-semibold">
              {t('adminLogin.citizenPortal')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
