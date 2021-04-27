import React from 'react';
import Link from 'next/link';

import styles from './ExercisePreview.module.scss';

function ExercisePreviewSkeleton() {
  return (
    <div className={`${styles['exercise-preview']} ${styles['is--skeleton']}`}>
      <header />
      <div className={styles.body}>
        <div />
        <div />
        <div />
        <br />
        <div />
        <div />
      </div>
      <footer className="text-right">
        <Link href="#">
          <a className="btn">{' '}</a>
        </Link>
      </footer>
    </div>
  );
}

export default ExercisePreviewSkeleton;
