/**
 * Citizen Dashboard
 * Main hub for citizens to manage complaints
 */

import { Link } from 'react-router-dom';
import authService from '../services/authService';
import { useLanguage } from '../i18n/LanguageContext';

const Dashboard = () => {
  const currentUser = authService.getCurrentUser();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-blue-700 text-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold mb-4">
            👋 {t('dashboard.welcome', { name: currentUser?.name || '' })}
          </h1>
          <p className="text-lg opacity-90">
            {t('dashboard.subtitle')}
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
            <h2 className="text-2xl font-bold mb-2">{t('dashboard.myComplaintsTitle')}</h2>
            <p className="text-sm">
              {t('dashboard.myComplaintsDesc')}
            </p>
            <div className="mt-4 font-bold">
              {t('dashboard.viewAll')} →
            </div>
          </Link>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* How to File */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-secondary">
            <h3 className="text-xl font-bold text-dark mb-4">📌 {t('dashboard.howToFile')}</h3>
            <ol className="space-y-3 text-sm text-dark list-decimal list-inside">
              <li>{t('dashboard.step1')}</li>
              <li>{t('dashboard.step2')}</li>
              <li>{t('dashboard.step3')}</li>
              <li>{t('dashboard.step4')}</li>
            </ol>
          </div>

          {/* What We Solve */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-accent">
            <h3 className="text-xl font-bold text-dark mb-4">✅ {t('dashboard.weAccept')}</h3>
            <ul className="space-y-2 text-sm text-dark">
              <li>🔊 {t('dashboard.acceptNoise')}</li>
              <li>🗑️ {t('dashboard.acceptGarbage')}</li>
              <li>💧 {t('dashboard.acceptWater')}</li>
              <li>{t('dashboard.acceptMore')}</li>
            </ul>
          </div>

          {/* Important Info */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
            <h3 className="text-xl font-bold text-dark mb-4">ℹ️ {t('dashboard.important')}</h3>
            <ul className="space-y-2 text-sm text-dark">
              <li>✓ {t('dashboard.important1')}</li>
              <li>✓ {t('dashboard.important2')}</li>
              <li>✓ {t('dashboard.important3')}</li>
              <li>✓ {t('dashboard.important4')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
