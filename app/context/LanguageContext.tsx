import React, { createContext, useContext, useState, ReactNode } from 'react';
import en from '../translations/en.json';
import es from '../translations/es.json';

interface Translations {
  createUser: string;
  editUser: string;
  name: string;
  lastName: string;
  age: string;
  phone: string;
  email: string;
  save: string;
  submit: string;
  noUsersFound: string;
  users: string;
  [key: string]: string; 
}

const translations: { [key: string]: Translations } = { en, es };

type Language = 'en' | 'es';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: keyof Translations) => {
    return translations[language]?.[key] || key.toString();
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
