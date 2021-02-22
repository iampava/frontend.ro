import React from 'react';
import Link from 'next/link';
import { timeAgo } from '../../../services/Utils';

import styles from './Notification.module.scss';

interface Props {
  _id: string;
  avatar: string;
  username: string;
  name: string;
  message: string;
  timestamp: number;
  url: string;
  isUnread: boolean;
  onMarkAsRead: (_id: string) => void
}

const Notification = ({
  _id,
  url,
  avatar,
  username,
  name,
  message,
  timestamp,
  isUnread,
  onMarkAsRead,
}: Props) => (
  <li
    className={`${styles.notification} ${isUnread ? styles['is--unread'] : ''}`}
    onClick={() => onMarkAsRead(_id)}
    role="presentation"
  >
    <Link href={url}>
      <a className="d-flex no-underline">
        <img
          width="32"
          height="32"
          src={avatar}
          alt={`${username} avatar`}
        />
        <div className="body">
          <p className="m-0">
            <span className={styles.user}>{name || username}</span>
            {message}
          </p>
          <time className="text-silver">{timeAgo(new Date(timestamp))}</time>
        </div>
      </a>
    </Link>
  </li>
);

export default Notification;
