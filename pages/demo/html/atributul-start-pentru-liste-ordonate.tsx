import React from 'react';
import Head from 'next/head';

import Demo from '~/components/demo';
import LivePreviewDemo from '~/components/LivePreviewDemo';

import Header from '~/components/Header';
import Footer from '~/components/Footer';

export default function OrderedListsStart() {
  const title = 'Atributul \'start\' pentru liste ordonate';
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
            Putem opta să enumerăm elementele unei liste ordonate începând
            de la un anumit număr/literă folosindu-ne de atributul
            {' '}
            <strong className="formatted">start</strong>
            {' '}
            dând ca valoare numărul/litera de la care vrem să începem numărătoarea:
          </p>
          <LivePreviewDemo
            language="html"
            code={`
 <ol>
  <li> Pornește laptopul </li>
  <li> Deschide Visual Studio Code </li>
  <li> Începe să codezi </li>
</ol>
<p> După ce ai terminat nu uita să:</p>
<ol start="4">
  <li> Dai 'push' pe GitHub </li>
  <li> Arăți rezultatul prietenilor tăi! </li>
</ol>
`}
          />
        </Demo>
        <Footer />
      </>
    </>
  );
}
