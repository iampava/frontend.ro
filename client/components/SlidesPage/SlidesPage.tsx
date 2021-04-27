import React from 'react';
import PageContainer from '~/components/PageContainer';
import SlidesLink from './SlidesLink/SlidesLink';

import styles from './SlidesPage.module.scss';

function SlidesPage() {
  return (
    <PageContainer className={styles['events-page']}>
      <h1>Slide-uri</h1>
      <p className="mb-4">
        Mai jos găsești slide-urile folosite în toate trainingurile noastre
      </p>
      <SlidesLink
        id="git-incepatori"
        created={1618825556676}
        thumb={`${process.env.CLOUDFRONT_PUBLIC}/slides/git-incepatori/cover.png`}
        href={`${process.env.CLOUDFRONT_PUBLIC}/slides/git-incepatori/index.html`}
        title="Git & GitHub începători"
        description="Hai să descoperim și să punem în practică cele mai importante concepte și comenzi din Git & GitHub."
      />
    </PageContainer>
  );
}

export default SlidesPage;
