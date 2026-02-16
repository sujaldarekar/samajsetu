/**
 * Home Page
 * Landing page showing SAMAJSETU overview and features
 * Entry point for new users
 */

import { Link } from 'react-router-dom';
import authService from '../services/authService';
import { useLanguage } from '../i18n/LanguageContext';

const Home = () => {
  const currentUser = authService.getCurrentUser();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            🌉 {t('home.heroTitle')}
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('home.heroDescription')}
          </p>
          {!currentUser ? (
            <div className="flex justify-center gap-4">
              <Link
                to="/register"
                className="bg-secondary hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition"
              >
                {t('home.getStarted')}
              </Link>
              <Link
                to="/login"
                className="bg-white hover:bg-gray-100 text-primary px-8 py-3 rounded-lg font-bold text-lg transition"
              >
                {t('home.signIn')}
              </Link>
            </div>
          ) : (
            <Link
              to={currentUser.role === 'admin' ? '/admin' : '/dashboard'}
              className="bg-secondary hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg inline-block transition"
            >
              {t('home.goToDashboard')}
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">{t('home.whyTitle')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-3 text-dark">{t('home.featureFastTitle')}</h3>
              <p className="text-light">
                {t('home.featureFastDesc')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition text-center">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-2xl font-bold mb-3 text-dark">{t('home.featureTrackTitle')}</h3>
              <p className="text-light">
                {t('home.featureTrackDesc')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition text-center">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-2xl font-bold mb-3 text-dark">{t('home.featureSecureTitle')}</h3>
              <p className="text-light">
                {t('home.featureSecureDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">{t('home.howTitle')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold text-dark mb-2">{t('home.stepRegisterTitle')}</h3>
              <p className="text-sm text-light">
                {t('home.stepRegisterDesc')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold text-dark mb-2">{t('home.stepSubmitTitle')}</h3>
              <p className="text-sm text-light">
                {t('home.stepSubmitDesc')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold text-dark mb-2">{t('home.stepTrackTitle')}</h3>
              <p className="text-sm text-light">
                {t('home.stepTrackDesc')}
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-bold text-dark mb-2">{t('home.stepResolvedTitle')}</h3>
              <p className="text-sm text-light">
                {t('home.stepResolvedDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">{t('home.categoriesTitle')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Noise */}
            <div className="bg-yellow-50 p-8 rounded-lg border-2 border-yellow-200">
              <div className="text-6xl mb-4">🔊</div>
              <h3 className="text-2xl font-bold text-dark mb-3">{t('home.catNoiseTitle')}</h3>
              <ul className="text-sm text-dark space-y-2">
                <li>✓ {t('home.catNoiseItem1')}</li>
                <li>✓ {t('home.catNoiseItem2')}</li>
                <li>✓ {t('home.catNoiseItem3')}</li>
              </ul>
            </div>

            {/* Garbage */}
            <div className="bg-green-50 p-8 rounded-lg border-2 border-secondary">
              <div className="text-6xl mb-4">🗑️</div>
              <h3 className="text-2xl font-bold text-dark mb-3">{t('home.catGarbageTitle')}</h3>
              <ul className="text-sm text-dark space-y-2">
                <li>✓ {t('home.catGarbageItem1')}</li>
                <li>✓ {t('home.catGarbageItem2')}</li>
                <li>✓ {t('home.catGarbageItem3')}</li>
              </ul>
            </div>

            {/* Water */}
            <div className="bg-blue-50 p-8 rounded-lg border-2 border-blue-200">
              <div className="text-6xl mb-4">💧</div>
              <h3 className="text-2xl font-bold text-dark mb-3">{t('home.catWaterTitle')}</h3>
              <ul className="text-sm text-dark space-y-2">
                <li>✓ {t('home.catWaterItem1')}</li>
                <li>✓ {t('home.catWaterItem2')}</li>
                <li>✓ {t('home.catWaterItem3')}</li>
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
              <p className="text-lg">{t('home.statsActiveCitizens')}</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold mb-2">5,000+</h3>
              <p className="text-lg">{t('home.statsIssuesResolved')}</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold mb-2">95%</h3>
              <p className="text-lg">{t('home.statsResolutionRate')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
