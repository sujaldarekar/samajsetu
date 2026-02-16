/**
 * Loading Spinner Component
 * Shows while data is being fetched from server
 */

import { useLanguage } from '../i18n/LanguageContext';

const LoadingSpinner = () => {
  const { t } = useLanguage();
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="text-center">
        <div className="inline-block">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-background border-t-primary"></div>
        </div>
        <p className="mt-6 text-lg font-semibold text-dark">
          ⏳ {t('loading.title')}
        </p>
        <p className="mt-2 text-sm text-light">
          {t('loading.subtitle')}
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
