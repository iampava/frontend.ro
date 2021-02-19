import React from 'react';
import Head from 'next/head';

import Demo from '~/components/demo';
import LivePreviewDemo from '~/components/LivePreviewDemo';

import Header from '~/components/Header';
import Footer from '~/components/Footer';

export default function BasicImage() {
  const title = 'O simplă imagine';

  return (
    <>
      <Head>
        <title>
          {title}
          {' '}
          | DEMO - FrontEnd.ro
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Header demoPage />
        <Demo title={title}>
          <LivePreviewDemo
            language="html"
            code={`
<img
  src="https://d3tycb976jpudc.cloudfront.net/demo-assets/golden-retriever-and-ball.jpg"
  alt="Golden retriever biting blue ball"
/>`}
          />
        </Demo>
        <Footer />
      </>
    </>
  );
}
