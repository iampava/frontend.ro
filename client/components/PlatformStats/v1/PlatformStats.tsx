import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import CounterCard from './CounterCard/CounterCard';

import styles from './PlatformStats.module.scss';

interface Props {
  stats: Stats[]
}
interface Stats {
  icon: IconProp;
  counter: number;
  description: string;
}
export default function PlatformStats({ stats }: Props) {
  return (
    <div className={styles['platform-stats']}>
      <section>
        <ul className="d-flex justify-content-evenly align-items-center">
          {stats.map((stat) => (
            <li key={stat.description}>
              <CounterCard icon={stat.icon} counter={stat.counter} description={stat.description} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
