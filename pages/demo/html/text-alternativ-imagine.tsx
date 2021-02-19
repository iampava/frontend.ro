import React from 'react';
import Head from 'next/head';

import Demo from '~/components/demo';
import LivePreviewDemo from '~/components/LivePreviewDemo';

import Header from '~/components/Header';
import Footer from '~/components/Footer';

export default function MissingImage() {
  const title = 'O imagine care nu a putut fi încărcată';
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
          {/* <DemoPreview>
            <img
              src="https://d3tycb976jpudc.cloudfront.net/demo-assets/wrong-image-path.jpg"
              alt="Golden retriever biting blue ball"
            />
          </DemoPreview>
          <Highlight
            className="my-5"
            language="html"
            code={`
<img
  src="https://d3tycb976jpudc.cloudfront.net/demo-assets/wrong-image-path.jpg"
  alt="Golden retriever biting blue ball"
/>`}
          /> */}
          <LivePreviewDemo
            code={`
<img
src="https://d3tycb976jpudc.cloudfront.net/demo-assets/wrong-image-path.jpg"
alt="Golden retriever biting blue ball"
/>
            `}
            language="html"
          />
        </Demo>
        <Footer />
      </>
    </>
  );
}
