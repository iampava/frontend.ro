import React, { useEffect, useRef } from 'react';
import styles from './IframeDemo.module.scss';

interface Props {
  sourceCode: string;
}

export default function IframeDemo({ sourceCode }: Props) {
  const iframeRef = useRef(null);

  useEffect(() => {
    let doc = iframeRef.current.contentDocument;

    doc.head.innerHTML = `<style> 
      img {
        max-width: 100%; 
        max-height: 100%; 
        border-radius: 0.5em
      };
</style>`;

    doc.body.innerHTML = sourceCode;
    doc.body.style.margin = 0;

    const refresh = () => {
      let bodyHeight = doc.body.offsetHeight;
      iframeRef.current.style.height = `${bodyHeight}px`;
    };

    let images = [...doc.body.querySelectorAll('img')];
    images.forEach((img) => {
      img.addEventListener('load', refresh);
    });

    let videos = [...doc.body.querySelectorAll('video')];
    videos.forEach((video) => {
      video.addEventListener('load', refresh);
    });

    refresh();
  }, [sourceCode]);

  return (
    <iframe
      frameBorder="0"
      ref={iframeRef}
      title="iframe"
      className={styles.iframe}
    />
  );
}
