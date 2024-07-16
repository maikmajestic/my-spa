import React from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import styles from './languageSwitcher.module.scss';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'en' | 'es');
  };

  return (
    <div className={styles.languageSwitcher}>
      <label htmlFor="language-select">{t('language')}: </label>
      <select id="language-select" value={language} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
