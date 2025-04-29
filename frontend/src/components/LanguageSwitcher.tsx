import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'mr', label: 'मराठी' }
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium text-gray-600">{t('footer.language')}</p>
      <div className="flex flex-wrap gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={`px-2 py-1 text-xs rounded ${
              i18n.language === lang.code
                ? 'bg-[#4F7942] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => changeLanguage(lang.code)}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher; 