import React from 'react';
import Head from 'next/head';

import Demo from '~/components/demo';
import LivePreviewDemo from '~/components/LivePreviewDemo';

import Header from '~/components/Header';
import Footer from '~/components/Footer';

export default function Quotes() {
  const title = 'Citate';
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
            Putem folosi
            {' '}
            <strong className="formatted">{'<blockquote>'}</strong>
            {' '}
            sau
            {' '}
            <strong className="formatted">{'<q>'}</strong>
            {' '}
            pentru a marca citate.
          </p>
          <LivePreviewDemo
            language="html"
            code={`
<blockquote
 cite="https://en.wikipedia.org/wiki/A_journey_of_a_thousand_miles_begins_with_a_single_step"
>
  <p> Călătoria de 1000 mile începe cu un singur pas. </p>
</blockquote>

<hr />

<p>
  După cum a spus Roosevelt,
  <q cite="https://www.goodreads.com/quotes/10002-it-is-hard-to-fail-but-it-is-worse-never">
    It is hard to fail, but it is worse never to have tried to succeed.
  </q>
</p>`}
          />
        </Demo>
        <Footer />
      </>
    </>
  );
}
