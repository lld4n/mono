'use client';
import React from 'react';
import styles from './Loading.module.scss';
import { motion } from 'framer-motion';
import { InternationalizationContext } from '../../providers/InternationalizationProvider/InternationalizationProvider';

const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: 'rgba(255, 255, 255, 0)',
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: 'rgba(255, 255, 255, 1)',
  },
};
export default function Loading() {
  const i18n = React.useContext(InternationalizationContext);
  return (
    <div className={styles.loading}>
      <motion.svg
        width="574"
        height="200"
        viewBox="0 0 574 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M564.017 0H9.98261C4.46937 0 0 4.47715 0 10V190C0 195.523 4.46937 200 9.98261 200H564.017C569.531 200 574 195.523 574 190V10C574 4.47715 569.531 0 564.017 0Z"
          fill="#F01E24"
        />
        <motion.path
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 1, ease: 'easeInOut' },
            fill: { duration: 1, ease: [1, 0, 0.8, 1] },
          }}
          d="M59.8957 50.5H69.8783C75.1146 50.5 79.3609 54.7525 79.3609 60V140C79.3609 145.248 75.1146 149.5 69.8783 149.5H59.8957C54.6594 149.5 50.4131 145.248 50.4131 140V60C50.4131 54.7525 54.6594 50.5 59.8957 50.5Z"
          fill="white"
          stroke="white"
        />
        <motion.path
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 1, ease: 'easeInOut' },
            fill: { duration: 1, ease: [1, 0, 0.8, 1] },
          }}
          d="M94.8347 60.5H104.817C110.054 60.5 114.3 64.7525 114.3 70V100C114.3 105.248 110.054 109.5 104.817 109.5H94.8347C89.5984 109.5 85.3521 105.248 85.3521 100V70C85.3521 64.7525 89.5984 60.5 94.8347 60.5Z"
          fill="white"
          stroke="white"
        />
        <motion.path
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 1, ease: 'easeInOut' },
            fill: { duration: 1, ease: [1, 0, 0.8, 1] },
          }}
          d="M129.774 50.5H139.756C144.993 50.5 149.239 54.7525 149.239 60V140C149.239 145.248 144.993 149.5 139.756 149.5H129.774C124.538 149.5 120.291 145.248 120.291 140V60C120.291 54.7525 124.538 50.5 129.774 50.5Z"
          fill="white"
          stroke="white"
        />
        <motion.path
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 1, ease: 'easeInOut' },
            fill: { duration: 1, ease: [1, 0, 0.8, 1] },
          }}
          d="M264.539 52.5H184.678C180.543 52.5 177.191 55.8579 177.191 60V140C177.191 144.142 180.543 147.5 184.678 147.5H264.539C268.674 147.5 272.026 144.142 272.026 140V60C272.026 55.8579 268.674 52.5 264.539 52.5Z"
          fill="white"
          stroke="white"
        />
        <motion.path
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 1, ease: 'easeInOut' },
            fill: { duration: 1, ease: [1, 0, 0.8, 1] },
          }}
          d="M309.461 50.5H319.443C324.68 50.5 328.926 54.7525 328.926 60V140C328.926 145.248 324.68 149.5 319.443 149.5H309.461C304.225 149.5 299.978 145.248 299.978 140V60C299.978 54.7525 304.225 50.5 309.461 50.5Z"
          fill="white"
          stroke="white"
        />
        <motion.path
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 1, ease: 'easeInOut' },
            fill: { duration: 1, ease: [1, 0, 0.8, 1] },
          }}
          d="M344.4 75.5H354.383C359.619 75.5 363.865 79.7525 363.865 85V115C363.865 120.248 359.619 124.5 354.383 124.5H344.4C339.164 124.5 334.917 120.248 334.917 115V85C334.917 79.7525 339.164 75.5 344.4 75.5Z"
          fill="white"
          stroke="white"
        />
        <motion.path
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 1, ease: 'easeInOut' },
            fill: { duration: 1, ease: [1, 0, 0.8, 1] },
          }}
          d="M379.339 50.5H389.322C394.558 50.5 398.804 54.7525 398.804 60V140C398.804 145.248 394.558 149.5 389.322 149.5H379.339C374.103 149.5 369.856 145.248 369.856 140V60C369.856 54.7525 374.103 50.5 379.339 50.5Z"
          fill="white"
          stroke="white"
        />
        <motion.path
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 1, ease: 'easeInOut' },
            fill: { duration: 1, ease: [1, 0, 0.8, 1] },
          }}
          d="M434.243 50.5H514.104C519.34 50.5 523.587 54.7525 523.587 60V140C523.587 145.248 519.34 149.5 514.104 149.5H434.243C429.007 149.5 424.761 145.248 424.761 140V60C424.761 54.7525 429.007 50.5 434.243 50.5Z"
          fill="white"
          stroke="white"
        />
      </motion.svg>
      <span>{i18n.loading}</span>
    </div>
  );
}
