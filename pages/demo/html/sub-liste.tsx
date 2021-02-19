import React from 'react';
import Head from 'next/head';

import Demo from '~/components/demo';
import LivePreviewDemo from '~/components/LivePreviewDemo';

import Header from '~/components/Header';
import Footer from '~/components/Footer';

export default function NestingLists() {
  const title = 'Sub-liste';
  return (
    <>
      <Head>
        <title>{title} | FrontEnd.ro</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Header demoPage />
        <Demo title={title}>
          <p>
            O listă poate conține o altă listă. Acest lucru este extrem de util
            dacă vrem să reprezentăm un meniu de navigare pe mai multe nivele:
          </p>

          <LivePreviewDemo
            code={`
<ul>
  <li>
    FrontEnd
    <ol>
      <li> HTML </li>
      <li> CSS </li>
      <li> JavaScript </li>
    </ol>
  </li>
  <li> Back-end </li>
  <li> Mobile development </li>
</ul>
            `}
            language="html"
          />
        </Demo>
        <Footer />
      </>
    </>
  );
}
