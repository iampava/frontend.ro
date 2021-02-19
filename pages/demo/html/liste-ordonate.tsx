import React from 'react';
import Head from 'next/head';

import Demo from '~/components/demo';
import LivePreviewDemo from '~/components/LivePreviewDemo';

import Header from '~/components/Header';
import Footer from '~/components/Footer';

export default function OrderedLists() {
  const title = ' Liste ordonate';
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
            Așa cum sugerează și numele lor, ordinea elementelor din cadrul
            acestora este importantă.
          </p>

          <LivePreviewDemo
            language="html"
            code={`
<ol>
  <li> Cumpără ingredientele necesare </li>
  <li> Amestecă ingredientele </li>
  <li> Pune amestecul într-un vas de gătit </li>
  <li> Coace în cuptor prăjitura timp de o oră </li>
  <li> Scoate prăjitura din cuptor </li>
</ol>          
`}
          />
        </Demo>
        <Footer />
      </>
    </>
  );
}
