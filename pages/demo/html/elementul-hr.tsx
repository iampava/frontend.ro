import React from 'react';
import Head from 'next/head';

import Demo from '~/components/demo';
import LivePreviewDemo from '~/components/LivePreviewDemo';

import Header from '~/components/Header';
import Footer from '~/components/Footer';

export default function HorizontalLine() {
  const title = 'Elementul <hr> adaugă o linie de separare';
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
            Elementul
            {' '}
            <strong className="formatted">
              {'<hr>'}
            </strong>
            {' '}
            (horizontal line)
            este un separator între
            secțiuni/elemente din pagină.
            .
          </p>
          <LivePreviewDemo
            language="html"
            code={`
<p> O primă regulă în această casă: Întotdeauna zîmbește! </p>
<hr>
<p> A doua regulă: Vino cu prăjituri! </p>
`}
          />
        </Demo>
        <Footer />
      </>
    </>
  );
}
