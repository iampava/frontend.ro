import React from 'react';
import Head from 'next/head';

import Demo from '~/components/demo';
import LivePreviewDemo from '~/components/LivePreviewDemo';

import Header from '~/components/Header';
import Footer from '~/components/Footer';

export default function DescriptionLists() {
  const title = 'Liste de descrieri';

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
            Întâlnite mai rar decât listele ordonate sau cele neordonate, pe acestea le folosim
            când vrem să definim termeni sau să asociem perechi nume/descriere.
          </p>
          <LivePreviewDemo
            language="html"
            code={`
<dl>
  <dt> HTML </dt>
  <dd> Hyper Text Markup Language </dd>

  <dt> CSS </dt>
  <dd> Cascading Style Sheets </dd>
</dl>
                   
`}
          />
        </Demo>
        <Footer />
      </>
    </>
  );
}
