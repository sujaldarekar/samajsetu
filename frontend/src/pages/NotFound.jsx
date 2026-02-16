/**
 * 404 Not Found Page
 * Shown when user visits non-existent route
 */

import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

const NotFound = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-4xl font-bold text-dark mb-4">{t('notFound.title')}</h2>
        <p className="text-lg text-light mb-8 max-w-md">
          {t('notFound.subtitle')}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/"
            className="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition"
          >
            🏠 {t('notFound.home')}
          </Link>
          <Link
            to="/dashboard"
            className="bg-secondary hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition"
          >
            📊 {t('notFound.dashboard')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
