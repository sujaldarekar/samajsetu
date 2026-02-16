import { createContext, useContext, useMemo, useState } from 'react';
import translations from './translations';

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key
});

const LANGUAGE_STORAGE_KEY = 'samajsetu_language';

const formatText = (text, vars = {}) =>
  text.replace(/\{(\w+)\}/g, (match, key) => (
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : match
  ));

const getTranslationValue = (language, key) => {
  const keys = key.split('.');
  const findValue = (obj) => keys.reduce((acc, k) => (acc ? acc[k] : undefined), obj);
  return findValue(translations[language]) ?? findValue(translations.en);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return saved || 'en';
  });

  const setLanguage = (nextLanguage) => {
    setLanguageState(nextLanguage);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  };

  const t = (key, vars) => {
    const value = getTranslationValue(language, key);
    if (typeof value === 'string') {
      return formatText(value, vars);
    }
    return value ?? key;
  };

  const contextValue = useMemo(() => ({ language, setLanguage, t }), [language]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
