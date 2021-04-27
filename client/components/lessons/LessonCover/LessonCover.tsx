import React, { PropsWithChildren, useEffect, useRef } from 'react';
import noop from 'lodash/noop';
import styles from './LessonCover.module.scss';

// TS missed `ResizeObserver` definitions: https://github.com/Microsoft/TypeScript/issues/28502
declare let ResizeObserver: any;

export default function LessonCover(
  {
    resizeOffset,
    children,
  }: PropsWithChildren<{ resizeOffset?: number }>,
) {
  const coverRef = useRef(null);

  useEffect(() => {
    if (resizeOffset) {
      const resizeObserver = new ResizeObserver(([entry]) => {
        const viewBox = coverRef.current.querySelector('svg').getAttribute('viewBox').split(' ');

        if (entry.contentRect.width < 400) {
          coverRef.current.querySelector('svg').setAttribute('viewBox', [resizeOffset, viewBox.slice(1)].join(' '));
        } else {
          coverRef.current.querySelector('svg').setAttribute('viewBox', [0, viewBox.slice(1)].join(' '));
        }
      });

      resizeObserver.observe(coverRef.current);

      return () => resizeObserver.disconnect();
    }
    return noop;
  }, []);

  return (
    <figure ref={coverRef} className={styles['lesson-cover']}>
      <div>
        {children}
      </div>
    </figure>

  );
}
