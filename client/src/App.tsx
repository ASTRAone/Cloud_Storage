import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@hooks/useAuth';
import { useInitialization } from '@hooks/useInitialization';

import { AppRouter } from '@components/AppRouter';
import { Toast } from '@components/Toast/Toast';

import { useAppSelector } from '@store/hooks';
import { getSelectedLanguage } from '@store/settings/data';

export const App: React.FC = () => {
  const { i18n } = useTranslation();
  const language = useAppSelector(getSelectedLanguage);
  console.log(language);

  useInitialization();
  useAuth();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <>
      <AppRouter />
      <Toast position="top-right" />
    </>
  );
};
