/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './LandingAdBanner.module.scss';

/**
 * Show a banner with info about our next training.
 *
 * Whether you've see it or not is saved in
 * localStorage via the `adId` key.
 */
function LandingAdBanner({ adId }: { adId: string }) {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const didShow = localStorage.getItem(adId);

    if (!didShow) {
      setShow(true);
    }
  }, []);

  useEffect(() => {
    if (show) {
      setTimeout(() => setVisible(true), 1000);
    }
  }, [show]);

  if (!show) {
    return null;
  }

  const didVisit = () => localStorage.setItem(adId, 'true');

  return (
    <div className={`
      ${styles['landing-ad-banner']} 
      ${visible ? styles['landing-ad-banner--visible'] : ''} 
      d-flex justify-content-center align-items-center
    `}
    >
      <FontAwesomeIcon className="mr-2" icon={faBell} width={24} height={24} />
      <p className="mr-2">
        În weekend organizăm din nou trainingul despre Git & GitHub.
      </p>
      <Link href="/evenimente/git-incepatori">
        <a onClick={didVisit}>
          Vrei să participi?
        </a>
      </Link>
    </div>
  );
}

export default LandingAdBanner;
