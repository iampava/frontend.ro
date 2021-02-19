import React from 'react';
import Head from 'next/head';

import Demo from '~/components/demo';
import LivePreviewDemo from '~/components/LivePreviewDemo';

import Header from '~/components/Header';
import Footer from '~/components/Footer';

export default function LineBreak() {
  const title = 'Elementul <br> pentru a adăuga o linie nouă';
  return (
    <>
      <Head>
        <title>
          {title}
          {' '}
          | FrontEnd.ro
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Header demoPage />
        <Demo title={title}>
          <p>
            Dând
            {' '}
            <span className="formatted">Enter</span>
            {' '}
            într-un paragraf
            nu forțează textul pe o nouă linie.
            Pentru a obține acest rezultat putem crea un nou paragraf, sau să
            folosim elementul
            {' '}
            <strong className="formatted">{'<br>'}</strong>
            .
          </p>
          <LivePreviewDemo
            language="html"
            code={`
<p>
  Azi am codat împreună cu <br>
  Alex, <br>
  Diana și <br>
  Antonia.
</p>
`}
          />
        </Demo>
        <Footer />
      </>
    </>
  );
}
