import React from 'react';
import Head from 'next/head';

import Demo from '~/components/demo';
import LivePreviewDemo from '~/components/LivePreviewDemo';

import Header from '~/components/Header';
import Footer from '~/components/Footer';

export default function OrderedListsReversed() {
  const title = 'Atributul \'reversed\' pentru liste ordonate';

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
          <p />

          <LivePreviewDemo
            language="html"
            code={`
<ol reversed type="A">
  <li> Pornește laptopul </li>
  <li> Deschide Visual Studio Code </li>
  <li> Începe să codezi </li>
</ol>  
`}
          />
        </Demo>
        <Footer />
      </>
    </>
  );
}
