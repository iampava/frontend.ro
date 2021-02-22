import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { connect, ConnectedProps } from 'react-redux';
import styles from './Header.module.scss';
import AccountTooltip from './AccountTooltip/AccountTooltip';
import AccountNotificationsTooltip from './AccountNotificationsTooltip/AccountNotificationsTooltip';

import { RootState } from '~/redux/root.reducer';

interface Props {
  href?: string
  demoPage?: boolean
  onMenuClick?: () => void
}

function Header({
  href = '/',
  demoPage,
  onMenuClick,
  isLoggedIn,
} : ConnectedProps<typeof connector> & Props) {
  return (
    <header className={styles.header}>
      <div className="d-flex align-items-center h-100">
        {onMenuClick && (
        <button type="button" onClick={onMenuClick} className={`header__menu-btn btn--transparent ${styles.menu}`}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        ) }
        <Link href={href}>
          <a className={styles.logo}>
            <img src="/logo.png" alt="FrontEnd.ro logo" />
          </a>
        </Link>
        {demoPage && (
        <p
          className={`${styles['demo-label']} text-white mx-5 text-bold`}
        >
          DEMO
        </p>
        )}
      </div>
      {isLoggedIn ? (
        <div className="d-flex align-items-center justify-content-between">
          <AccountNotificationsTooltip />
          <AccountTooltip />
        </div>
      ) : null}
    </header>
  );
}

function mapStateToProps(state: RootState) {
  return {
    isLoggedIn: !!state.user.info,
  };
}

const connector = connect(mapStateToProps);

export default connector(Header);
