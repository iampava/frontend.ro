import React from 'react';
import Head from 'next/head';

import Demo from '~/components/demo';
import LivePreviewDemo from '~/components/LivePreviewDemo';

import Header from '~/components/Header';
import Footer from '~/components/Footer';

export default function OrderedListsType() {
  const title = 'Atributul \'type\' pentru liste ordonate';

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
            Dacă vrem ca enumerarea elementelor din listă să se facă cu un
            anumit tip de cifră sau cu litere, ne putem folosi de atributul
            {' '}
            <strong>type</strong>
            :
          </p>
          <LivePreviewDemo
            language="html"
            code={`
<ol type="I">
  <li> Pornește laptopul </li>
  <li> Deschide Visual Studio Code </li>
  <li> Începe să codezi </li>
</ol>        
`}
          />
          <p>
            Acesta acceptă și alte valori:
          </p>
          <ul className="with--bullets">
            <li className="mb-4">
              <strong className="formatted">1</strong>
              {' '}
              – pentru enumerare cu
              {' '}
              cifre arabe
            </li>
            <li className="mb-4">
              <strong className="formatted">i</strong>
              {' '}
              – pentru enumerare cifre romane mici
            </li>
            <li>
              <strong className="formatted">a</strong>
              {' '}
              sau
              {' '}
              <strong className="formatted">A</strong>
              {' '}
              – pentru enumerare cu litere mici, respectiv mari
            </li>
          </ul>
        </Demo>
        <Footer />
      </>
    </>
  );
}
