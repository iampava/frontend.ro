import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSpinner } from '@fortawesome/free-solid-svg-icons';
import {
  loadNotificationsSuccess,
  markNotificationAsRead,
  markNotificationAsUnread,
  markAllAsRead,
} from '../../redux/user/user.actions';
import UserService from '../../services/User.service';

import NotificationSkeleton from './notification/NotificationSkeleton';
import { RootState } from '~/redux/root.reducer';
import SweetAlertService from '~/services/sweet-alert/SweetAlert.service';
import Notification from './notification/Notification';

import styles from './NotificationTooltip.module.scss';

interface State {
  loading: boolean;
  isOpen: boolean;
}

class NotificationsTooltip extends React.Component<
  ConnectedProps<typeof connector>,
  State
  > {
  hiddenRef: React.RefObject<HTMLLIElement>;

  private observer: IntersectionObserver;

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      /** at this point isOpen is true so we can see the notifications when we enter the page */
      isOpen: true,
    };

    this.hiddenRef = React.createRef();
  }

  componentDidMount() {
    const { user } = this.props;
    const { notifications } = user;

    if (!notifications.end) {
      this.initIntersectionObserver();
    }
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;

    if (prevProps.user.notifications.end !== user.notifications.end && user.notifications.end) {
      this.observer.disconnect();
    }

    if (prevProps.user.notifications.end !== user.notifications.end && !user.notifications.end) {
      this.initIntersectionObserver();
    }
  }

  componentWillUnmount() {
    const { user } = this.props;
    const { notifications } = user;

    if (!notifications.end) {
      this.observer.disconnect();
    }
  }

  initIntersectionObserver = () => {
    const options = {
      threshold: 0.3,
    };
    this.observer = new IntersectionObserver(this.loadMore, options);
    this.observer.observe(this.hiddenRef.current);
  };

  loadMore = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.loadNextPage();
      }
    });
  };

  loadNextPage = async () => {
    const { user, dispatch } = this.props;
    const { notifications } = user;
    this.setState({ loading: true });

    try {
      const newNotifications = await UserService.getNotifications(notifications.page);
      dispatch(loadNotificationsSuccess(newNotifications));
    } catch (err) {
      SweetAlertService.toast({ type: 'error', text: err });
    } finally {
      this.setState({ loading: false });
    }
  };

  markAsRead = async (id) => {
    const { user } = this.props;
    const { notifications } = user;
    const { dispatch } = this.props;

    if (notifications.list.find((n) => n._id === id).isUnread) {
      try {
        dispatch(markNotificationAsRead(id));
        await UserService.markAsRead(id);
      } catch (err) {
        dispatch(markNotificationAsUnread(id));
      }
    }
  };

  markAllAsRead = async () => {
    const { dispatch } = this.props;

    try {
      dispatch(markAllAsRead());
      await UserService.markAllAsRead();
    } catch (err) {
      SweetAlertService.toast({ type: 'error', text: err });
    }
  };

  render() {
    const { user } = this.props;
    const { loading, isOpen } = this.state;

    const notifications = user.notifications.list || [];

    return (
      <div className={`${styles['notification-tooltip']}`}>
        <div className={styles.icon}>
          <FontAwesomeIcon width="16" icon={loading ? faSpinner : faBell} />
        </div>
        {isOpen && (
          <ul className={styles.notifications}>
            <li className="text-right">
              <button
                type="button"
                className={`${styles['mark-all-as-read-btn']} outline-none d-inline-block border-none`}
                onClick={this.markAllAsRead}
              >
                Mark all as read
              </button>
            </li>
            {notifications.map((notificationProps) => (
              <Notification
                {...notificationProps}
                key={notificationProps._id}
                onMarkAsRead={() => this.markAsRead(notificationProps._id)}
              />
            ))}
            {loading && (
              <>
                <NotificationSkeleton />
                <NotificationSkeleton />
                <NotificationSkeleton />
                <NotificationSkeleton />
                <NotificationSkeleton />
              </>
            )}
            <li className="invisible" ref={this.hiddenRef} />
          </ul>
        )}
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    user: state.user,
  };
}

const connector = connect(mapStateToProps);

export default connector(NotificationsTooltip);
