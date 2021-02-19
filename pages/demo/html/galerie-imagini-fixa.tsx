import React from 'react';
import Head from 'next/head';

import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import Demo from '~/components/demo';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import { LessonTip } from '~/components/lessons';
import LivePreviewDemo from '~/components/LivePreviewDemo';

export default function FixedGallery() {
  const title = 'O galerie de imagini în care fiecare ocupa 45% din lățimea disponibilă';

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
<div style="display: flex; flex-flow: row wrap; justify-content: space-between; align-items: flex-start;">
  <img 
    src="https://d3tycb976jpudc.cloudfront.net/demo-assets/body-of-water-and-trees.jpg"
    alt="Body of water and trees" 
    style="width: 45%; margin-bottom: 1em" />

  <img 
    src="https://d3tycb976jpudc.cloudfront.net/demo-assets/alpaca-portrait.jpg"
    alt="Alpaca portrait"
    style="width: 45%; margin-bottom: 1em" />

  <img 
    src="https://d3tycb976jpudc.cloudfront.net/demo-assets/lion-portrait.jpg"
    alt="Lion portrait" 
    style="width: 45%" />

  <img 
    src="https://d3tycb976jpudc.cloudfront.net/demo-assets/snow-capped-mountains.jpg"
    alt="Snow capped mountains" 
    style="width: 45%" />
    
</div>`}
          />
          <LessonTip icon={faQuestionCircle}>
            Atributul
            {' '}
            <strong>style</strong>
            {' '}
            este folosit pentru a stiliza elementele.
            {' '}
            Încă nu am ajuns la acel capitol deci nu-ți fă griji dacă nu înțelegi acel cod.
            <br />
            {' '}
            <br />
            Totuși va trebui să-l pui acolo pentru a obține același rezultat ca mai sus.
          </LessonTip>
        </Demo>
        <Footer />
      </>
    </>
  );
}
