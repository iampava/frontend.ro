import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Demo from '~/components/demo';
import LivePreviewDemo from '~/components/LivePreviewDemo';

export default function HugeImageLoading() {
  const title = 'Încărcarea greoaie a unei imagini 4K';

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
          <p>
            Încărcarea unei imagini uriașe - 2+MB - pe o conexiune înceată.
          </p>
          <p>
            {' '}
            Deschide
            {' '}
            <Link href="/intro/devtools">
              <a>
                panoul Network din DevTools
              </a>
            </Link>
            {' '}
            și încetinește conexiunea, iar apoi refreshuiește pagina.
          </p>
          <LivePreviewDemo
            language="html"
            code={`
<img 
  src="https://d3tycb976jpudc.cloudfront.net/demo-assets/red_bycicle__high.jpg" 
  style="max-width: 100%" 
  alt="Red bycicle wheel" 
/>`}
          />
        </Demo>
        <Footer />
      </>
    </>
  );
}
