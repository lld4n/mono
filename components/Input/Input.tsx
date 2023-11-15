import React from 'react';
import styles from './input.module.scss';
type Input = {
  type: string;
  placeholder: string;
};
export default function Input({ type, placeholder }: Input) {
  return (
    <input type={type} placeholder={placeholder} className={styles.input} />
  );
}
