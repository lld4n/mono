import React from 'react';
import styles from './Copy.module.scss';
import { InternationalizationContext } from '../../providers/InternationalizationProvider/InternationalizationProvider';
export default function Copy({ value }: { value: string }) {
  const [text, setText] = React.useState<string>(value);
  const i18n = React.useContext(InternationalizationContext);
  const handle = () => {
    navigator.clipboard.writeText(value).then(() => {
      setText(i18n.copy);
      setTimeout(() => {
        setText(value);
      }, 2000);
    });
  };
  return (
    <button
      className={text === value ? styles.button : styles.copied}
      onClick={handle}
    >
      <span>{text}</span>
      {text === value ? (
        <svg
          width="15"
          height="16"
          viewBox="0 0 15 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.svg}
        >
          <path
            d="M5 5H2.5C1.39543 5 0.5 5.89543 0.5 7V13C0.5 14.1046 1.39543 15 2.5 15H8.5C9.60457 15 10.5 14.1046 10.5 13V10.5"
            stroke="black"
          />
          <rect x="4.5" y="1" width="10" height="10" rx="2" stroke="black" />
        </svg>
      ) : (
        <svg
          width="14"
          height="10"
          viewBox="0 0 14 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 5L5 9L13 1"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
