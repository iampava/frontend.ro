import React from 'react';
import Head from 'next/head';

import Demo from '~/components/demo';
import LivePreviewDemo from '~/components/LivePreviewDemo';

import Header from '~/components/Header';
import Footer from '~/components/Footer';

export default function UnorderedLists() {
  const title = 'Liste neordonate';
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
            Utilizată cînd un set de elemente poate fi folosite în orice
            ordine, ca în lista de cumpărături de mai jos.
          </p>

          <LivePreviewDemo
            language="html"
            code={`
<ul>
  <li> pâine </li>
  <li> cafea </li>
  <li> lapte </li>
  <li> unt </li>
</ul>     
`}
          />
        </Demo>
        <Footer />
      </>
    </>
  );
}
