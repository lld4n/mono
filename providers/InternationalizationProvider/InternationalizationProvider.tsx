'use client';
import React from 'react';
import styles from './InternationalizationProvider.module.scss';
import { InternationalizationType } from '../../types/i18n';
import ru from '../../i18n/ru';
import en from '../../i18n/en';
import cooky from '../../utils/cooky';
import NoSSR from 'react-no-ssr';
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
  const [langIndex, setLangIndex] = React.useState<number>(
    Number(cooky.get('lang_mono')),
  );

  React.useEffect(() => {
    if (!langIndex) {
      setLangIndex(0);
    }
  }, []);

  React.useEffect(() => {
    cooky.set('lang_mono', langIndex);
  }, [langIndex]);

  return (
    <InternationalizationContext.Provider
      value={
        langIndex
          ? internationalizationList[langIndex].translate
          : internationalizationList[0].translate
      }
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
        <NoSSR>
          {langIndex
            ? internationalizationList[langIndex].abbreviation
            : internationalizationList[0].abbreviation}
        </NoSSR>
      </button>
    </InternationalizationContext.Provider>
  );
}
