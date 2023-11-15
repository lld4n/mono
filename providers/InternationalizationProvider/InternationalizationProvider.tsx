'use client';
import React from 'react';
import styles from './InternationalizationProvider.module.scss';
import { InternationalizationType } from '../../types/i18n';
import ru from '../../i18n/ru';
import en from '../../i18n/en';
export const InternationalizationContext =
  React.createContext<InternationalizationType>(en);

const internationalizationList: {
  translate: InternationalizationType;
  abbreviation: string;
}[] = [
  { translate: en, abbreviation: 'EN' },
  { translate: ru, abbreviation: 'RU' },
];
export default function InternationalizationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [langIndex, setLangIndex] = React.useState<number>(0);
  React.useEffect(() => {
    if (localStorage.getItem('lang')) {
      setLangIndex(Number(localStorage.getItem('lang')));
    } else {
      setLangIndex(0);
      localStorage.setItem('lang', String(0));
    }
  }, []);

  return (
    <InternationalizationContext.Provider
      value={internationalizationList[langIndex].translate}
    >
      {children}
      <button
        className={styles.button}
        onClick={() => {
          if (langIndex + 1 >= internationalizationList.length) {
            setLangIndex(0);
          } else {
            setLangIndex((prev) => prev + 1);
          }
        }}
      >
        {internationalizationList[langIndex].abbreviation}
      </button>
    </InternationalizationContext.Provider>
  );
}
