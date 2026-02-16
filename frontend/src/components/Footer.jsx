/**
 * Footer Component
 * Shown at bottom of every page
 */

import { useLanguage } from '../i18n/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-dark text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-3">🌉 {t('footer.about')}</h3>
            <p className="text-sm text-light leading-relaxed">
              {t('footer.aboutText')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-3">{t('footer.quickLinks')}</h3>
            <ul className="text-sm text-light space-y-2">
              <li>
                <a href="#" className="hover:text-white transition">
                  📖 {t('footer.aboutUs')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  📞 {t('footer.contact')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  🔒 {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  ⚖️ {t('footer.terms')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold mb-3">{t('footer.contactSupport')}</h3>
            <p className="text-sm text-light space-y-2">
              <div>📧 support@samajsetu.gov</div>
              <div>📞 1800-COMPLAINTS</div>
              <div>🕒 {t('footer.available')}</div>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="text-light hover:text-white transition">
              {t('footer.socialFacebook')}
            </a>
            <a href="#" className="text-light hover:text-white transition">
              {t('footer.socialTwitter')}
            </a>
            <a href="#" className="text-light hover:text-white transition">
              {t('footer.socialLinkedIn')}
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-light">
            <p>
              {t('footer.copyright')}<br />
              <span className="text-xs">
                {t('footer.builtWith')}
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
