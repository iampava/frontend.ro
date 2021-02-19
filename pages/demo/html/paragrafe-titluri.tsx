import React from 'react';
import Head from 'next/head';

import Demo from '~/components/demo';
import LivePreviewDemo from '~/components/LivePreviewDemo';

import Header from '~/components/Header';
import Footer from '~/components/Footer';

export default function ParagraphsAndHeadings() {
  const title = 'Paragrafe și Heading-uri';
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
          <p> Atât paragrafele cât și heading-urile sunt afișate începând cu o nouă linie. </p>
          <LivePreviewDemo
            language="html"
            code={`
<h1> Heading #1 </h1>
<p> Eu sunt pe o nouă linie </p>
<h2> Și eu! </h2>
<p> Nu zău?! </p>
`}
          />
        </Demo>
        <Footer />
      </>
    </>
  );
}
