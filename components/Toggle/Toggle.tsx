import React from 'react';
import sun from '../../assets/sun.svg';
import moon from '../../assets/moon.svg';
import Image from 'next/image';
import { inspect } from 'util';
import styles from './toggle.module.scss';
export default function Toggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: () => void;
}) {
  return (
    <div className={styles.block} onClick={onChange}>
      {value ? (
        <Image src={moon} alt={''} width={18} height={18} />
      ) : (
        <Image src={sun} alt={''} width={18} height={18} />
      )}
    </div>
  );
}
