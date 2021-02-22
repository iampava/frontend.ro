import React, { useState, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import { RootState } from '~/redux/root.reducer';

import { useOutsideClick } from '~/services/Hooks';
import NotificationTooltip from '~/components/notification-tooltip/NotificationTooltip';

import styles from './AccountNotificationsTooltip.module.scss';

function AccountNotificationsTooltip({ user }: ConnectedProps<typeof connector>) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleToolip = () => setIsOpen(!isOpen);

  useOutsideClick(ref, () => setIsOpen(false));

  return (
    <div ref={ref} className={styles['account-notifications-tooltip']}>
      <button type="button" onClick={toggleToolip} className="outline-none border-none">
        <FontAwesomeIcon width="16" icon={faBell} />
        {user.notifications.unreadCount > 0 && (
          <span className={`${styles['unread-badge']} text-white text-center text-xs`}>
            {user.notifications.unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <NotificationTooltip />
      )}
    </div>
  );
}

function mapStateToProps(state: RootState) {
  return {
    user: state.user,
  };
}

const connector = connect(mapStateToProps);

export default connector(AccountNotificationsTooltip);
