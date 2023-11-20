import styles from './Spin.module.scss';
import React, { useEffect, useRef } from 'react';

export default function Spin({ currentValue }: { currentValue: number[] }) {
  const ref1 = useRef<HTMLDivElement | null>(null);
  const ref2 = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref1.current && ref2.current) {
      ref1.current?.scroll({
        top: (currentValue[0] - 1) * 80,
        left: 0,
        behavior: 'smooth',
      });
      ref2.current?.scroll({
        top: (currentValue[1] - 1) * 80,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <div className={styles['spin']}>
      <div className={styles['spin__item']} ref={ref1}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
          >
            <rect width="80" height="80" rx="10" fill="white" />
            <rect x="35" y="35" width="10" height="10" rx="5" fill="black" />
          </svg>
        </div>

        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
          >
            <rect width="80" height="80" rx="10" fill="white" />
            <rect x="10" y="10" width="10" height="10" rx="5" fill="black" />
            <rect x="60" y="60" width="10" height="10" rx="5" fill="black" />
          </svg>
        </div>

        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
          >
            <rect width="80" height="80" rx="10" fill="white" />
            <rect x="10" y="10" width="10" height="10" rx="5" fill="black" />
            <rect x="35" y="35" width="10" height="10" rx="5" fill="black" />
            <rect x="60" y="60" width="10" height="10" rx="5" fill="black" />
          </svg>
        </div>

        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
          >
            <rect width="80" height="80" rx="10" fill="white" />
            <rect x="10" y="10" width="10" height="10" rx="5" fill="black" />
            <rect x="10" y="60" width="10" height="10" rx="5" fill="black" />
            <rect x="60" y="60" width="10" height="10" rx="5" fill="black" />
            <rect x="60" y="10" width="10" height="10" rx="5" fill="black" />
          </svg>
        </div>

        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
          >
            <rect width="80" height="80" rx="10" fill="white" />
            <rect x="10" y="10" width="10" height="10" rx="5" fill="black" />
            <rect x="35" y="35" width="10" height="10" rx="5" fill="black" />
            <rect x="10" y="60" width="10" height="10" rx="5" fill="black" />
            <rect x="60" y="60" width="10" height="10" rx="5" fill="black" />
            <rect x="60" y="10" width="10" height="10" rx="5" fill="black" />
          </svg>
        </div>

        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
          >
            <rect width="80" height="80" rx="10" fill="white" />
            <rect x="10" y="10" width="10" height="10" rx="5" fill="black" />
            <rect x="10" y="35" width="10" height="10" rx="5" fill="black" />
            <rect x="10" y="60" width="10" height="10" rx="5" fill="black" />
            <rect x="60" y="35" width="10" height="10" rx="5" fill="black" />
            <rect x="60" y="60" width="10" height="10" rx="5" fill="black" />
            <rect x="60" y="10" width="10" height="10" rx="5" fill="black" />
          </svg>
        </div>
      </div>
      <div className={styles['spin__item']} ref={ref2}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
          >
            <rect width="80" height="80" rx="10" fill="white" />
            <rect x="35" y="35" width="10" height="10" rx="5" fill="black" />
          </svg>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
          >
            <rect width="80" height="80" rx="10" fill="white" />
            <rect x="10" y="10" width="10" height="10" rx="5" fill="black" />
            <rect x="60" y="60" width="10" height="10" rx="5" fill="black" />
          </svg>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
          >
            <rect width="80" height="80" rx="10" fill="white" />
            <rect x="10" y="10" width="10" height="10" rx="5" fill="black" />
            <rect x="35" y="35" width="10" height="10" rx="5" fill="black" />
            <rect x="60" y="60" width="10" height="10" rx="5" fill="black" />
          </svg>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
          >
            <rect width="80" height="80" rx="10" fill="white" />
            <rect x="10" y="10" width="10" height="10" rx="5" fill="black" />
            <rect x="10" y="60" width="10" height="10" rx="5" fill="black" />
            <rect x="60" y="60" width="10" height="10" rx="5" fill="black" />
            <rect x="60" y="10" width="10" height="10" rx="5" fill="black" />
          </svg>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
          >
            <rect width="80" height="80" rx="10" fill="white" />
            <rect x="10" y="10" width="10" height="10" rx="5" fill="black" />
            <rect x="35" y="35" width="10" height="10" rx="5" fill="black" />
            <rect x="10" y="60" width="10" height="10" rx="5" fill="black" />
            <rect x="60" y="60" width="10" height="10" rx="5" fill="black" />
            <rect x="60" y="10" width="10" height="10" rx="5" fill="black" />
          </svg>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
          >
            <rect width="80" height="80" rx="10" fill="white" />
            <rect x="10" y="10" width="10" height="10" rx="5" fill="black" />
            <rect x="10" y="35" width="10" height="10" rx="5" fill="black" />
            <rect x="10" y="60" width="10" height="10" rx="5" fill="black" />
            <rect x="60" y="35" width="10" height="10" rx="5" fill="black" />
            <rect x="60" y="60" width="10" height="10" rx="5" fill="black" />
            <rect x="60" y="10" width="10" height="10" rx="5" fill="black" />
          </svg>
        </div>
      </div>
    </div>
  );
}
