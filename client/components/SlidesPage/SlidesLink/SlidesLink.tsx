import Link from 'next/link';
import React from 'react';
import { format } from 'date-fns';

import styles from './SlidesLink.module.scss';

interface Props {
  id: string;
  href?: string;
  title: string;
  thumb: string;
  description: string;
  created: number;
  views?: number;
}

function SlidesLink({
  id, href, title, description, thumb, created, views,
}: Props) {
  return (
    <Link href={href ?? `/slides/${id}`}>
      <a target="_blank" className={styles['slides-link']}>
        <img width="256" height="256" src={thumb} alt={`${title} slides thumb`} />
        <div
          className="img"
          style={{
            backgroundImage: `url(${thumb})`,
          }}
        />
        <section>
          <div>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
          <div className="footer">
            <p>
              {format((new Date(created)), 'dd MMMM yyyy')}
              {views ? (
                <span>
                  {' '}
                  |
                  {views}
                  {' '}
                  views
                </span>
              ) : null}
            </p>
            <div className="btn btn--light">
              See slides
            </div>
          </div>
        </section>
      </a>
    </Link>
  );
}

export default SlidesLink;
